const Controller = require('../../../base/baseController');

class menuService extends Controller {
    get dao() {
        return this.ctx.service.admin.authority.dao.menuDao;
    }
    /**
    * 保存
    * @param {json} body 
    */
    async save(body) {
        if (0 == body.parent_id) {
            body.level = 1;
            body.parent_path = '';
        } else {
            let status = await this.get(body.parent_id);
            body.level = status.data.level + 1;
            body.parent_path = (status.data.parent_path ? `${status.data.parent_path},` : ``) + status.data.id;
        }

        const result = await this.dao.insert(body);
        await this.app.cache.set('updateMenusTime', new Date());
        await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
        return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
    }

    /**
	 * 查询
	 */
    async select(body) {
        const result = await this.dao.select(body);
        return this.st.success('', result);
    }
    /**
     * 获取父级菜单，排除当前编辑的菜单
     * @param {*} id 
     */
    async getParentMenu(id) {
        return await this.dao.getParentMenu(id);
    }

    /**
	 * 根据id获取
	 * @param {String} id 
	 */
    async get(id) {
        const menu = await this.dao.get(id);
        return this.st.success('', menu);
    }

    /**
	 * 修改
	 * @param {json} body 
	 */
    async update(body) {
        if (0 == body.parent_id) {
            body.level = 1;
            body.parent_path = '';
        } else {
            let status = await this.get(body.parent_id);
            body.level = status.data.level + 1;
            body.parent_path = (status.data.parent_path ? `${status.data.parent_path},` : ``) + status.data.id;
        }
        const result = await this.dao.update(body);
        await this.app.cache.set("updateMenusTime", new Date());
        await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
        return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
    }

	/**
	 * 删除
	 * @param {json} body 
	 */
    async destroy(body) {
        if (!body.id) {
            return this.st.error('请选择要删除的记录！', body);
        } else {
            body.del = 1;
            const result = await this.dao.update(body);
            await this.app.cache.set("updateMenusTime", new Date());
            await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
            return (0 < result.affectedRows) ? this.st.success('删除成功', result) : this.st.error('删除失败', result);
        }
    }
	/**
	 * 启用
	 * @param {json} body 
	 */
    async enabled(body) {
        if (!body.id) {
            return this.st.error('请选择要启用的记录！', body);
        } else {
            body.status = 1;
            const result = await this.dao.update(body);
            await this.app.cache.set("updateMenusTime", new Date());
            await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
            return (0 < result.affectedRows) ? this.st.success('启用成功', result) : this.st.error('启用失败', result);
        }
    }
	/**
	 * 禁用
	 * @param {json} body 
	 */
    async disable(body) {
        if (!body.id) {
            return this.st.error('请选择要禁用的记录！', body);
        } else {
            body.status = 2;
            const result = await this.dao.update(body);
            await this.app.cache.set("updateMenusTime", new Date());
            await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
            return (0 < result.affectedRows) ? this.st.success('禁用成功', result) : this.st.error('禁用失败', result);
        }
    }

    /**
     * 获取菜单zTree树结构数据
     */
    // async getMenuTreeData() {
    //     let treeData = [];

    //     let firstMenus = await this.dao.select({ parent_id: 0, status: 1, type: 1 }); //获取一级菜单
    //     if (firstMenus) {
    //         for (let i = 0, len = firstMenus.length; i < len; i++) {
    //             let currMenu = firstMenus[i];
    //             let body = { id: currMenu.id, name: currMenu.title, parent_title: currMenu.parent_title, children: [] };
    //             await this.setChildrenMenus(body); //设置子菜单
    //             treeData.push(body);
    //         }
    //     }

    //     return this.st.success('', treeData);
    // }

    async asyncTreeDate(body) {
        body.id = body.id || 0;
        let treeData = [];
        let firstMenus = await this.dao.select2({ parent_id: body.id, syscode: body.syscode });
        if (firstMenus) {
            for (let i = 0, len = firstMenus.length; i < len; i++) {
                let currMenu = firstMenus[i];
                var body;
                if (currMenu.type == 1) {
                    body = { id: currMenu.id, name: currMenu.title, type: currMenu.type, parent_id: currMenu.parent_id, children: [], child_num: currMenu.child_num };
                } else {
                    body = { id: currMenu.id, name: currMenu.title, type: currMenu.type, parent_id: currMenu.parent_id, child_num: 0 };
                }
                // await this.setChildrenMenus(body); //设置子菜单
                treeData.push(body);
            }
        }

        return this.st.success('', treeData);
    }


    /**
     * 设置子菜单
     * @param {*} body 
     */
    async setChildrenMenus(body) {
        let childrenMenus = await this.dao.select({ parent_id: body.id, status: 1, type: 1 }); //获取下级菜单
        if (childrenMenus && childrenMenus.length > 0) {
            let children = []; //子菜单
            for (let j = 0, lenJ = childrenMenus.length; j < lenJ; j++) {
                let childMenu = childrenMenus[j];
                let body = { id: childMenu.id, name: childMenu.title, parent_title: childMenu.parent_title };

                await this.setChildrenMenus(body); //设置子菜单
                children.push(body);
            }
            body.children = children;
        }
    }


    async setChildrenMenus2(body) {
        let childrenMenus = await this.dao.select2({ parent_id: body.id }); //获取下级菜单
        if (childrenMenus && childrenMenus.length > 0) {
            let children = []; //子菜单
            for (let j = 0, lenJ = childrenMenus.length; j < lenJ; j++) {
                let childMenu = childrenMenus[j];
                let body = { id: childMenu.id, name: childMenu.title, parent_title: childMenu.parent_title };
                // await this.setChildrenMenus2(body); //设置子菜单
                children.push(body);
            }
            return children;
        } else {
            return []
        }
    }

    async export(){
        let data = await this.dao.exportMenus()
        console.log(data);
        let result = [["id",'syscode','title','url','link_urls','type','parent_id','parent_path','level',"status","seq",'remark','del']]
        for (let i=0;i<data.length;i++){
            result.push([data[i].id,data[i].syscode,data[i].title,data[i].url,data[i].link_urls,
                data[i].type,data[i].parent_id,data[i].parent_path,data[i].level,data[i].status,data[i].seq,data[i].remark,data[i].del])    
        }
        return result
    }
    async importMenns(body){
        let status = 1;
        let create_user_id = this.user.id;
        let time = this.authorityDB.literals.now;
        for (let i=0;i<body.length;i++){
            body[i].push(create_user_id)
            body[i].push(time)
            body[i].push(create_user_id)
            body[i].push(time)
            body[i].push("")
        }
        let result = await this.dao.importMenns(body);
        return result
    }
}
module.exports = menuService;