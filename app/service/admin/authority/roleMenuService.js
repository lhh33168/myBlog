const Controller = require('../../../base/baseController');

class roleMenuService extends Controller {

    get dao() {
        return this.ctx.service.admin.authority.dao.roleMenuDao;
    }

    /**
    * 保存角色权限
    * @param {json} body 
    */
    async save(body) {
        const ctx = this.ctx;
        try {
            const result = await this.authorityDB.beginTransactionScope(async conn => { //开启事务
                await this.dao.delByRoleIdAndSyscode(body.syscode, body.id, conn);
                if (body.menus) {
                    let menus = body.menus.split(',');
                    for (var i = 0; i < menus.length; i++) {
                        await this.dao.insert({
                            syscode: body.syscode,
                            role_id: body.id,
                            menu_id: menus[i],
                            create_user_id: this.user.id,
                            create_time: this.authorityDB.literals.now
                        }, conn);
                    }
                }
                return true;
            }, ctx);
            await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
            return result ? this.st.success('保存成功') : this.st.error('保存失败');
        } catch (error) {
            this.ctx.logger.error('保存权限失败：', error);
            return this.st.error('保存失败');
        }
    }
    /**
     * 删除角色的权限数据，删除角色数据的时候，同时会调用该方法清理角色对应的权限数据
     * @param {*} roleId 
     * @param {*} conn 
     */
    async del(roleId, conn) {
        await this.dao.del( roleId, conn);
    }

    /**
     * 获取所有权限
     */
    async getPermission(roleId, syscode) {
        let menus = await this.getFirstMenu(roleId, syscode);
        let treeMenus = [];
        for (var i = 0; i < menus.length; i++) {
            let currMenu = menus[i];
            let menuChecked = 1 === currMenu.checked ? true : false;
            let nodes = await this.setChildrenTreeNode(currMenu);
            let body = { id: currMenu.id, text: currMenu.title, icon: '', state: { checked: menuChecked, selected: menuChecked, expanded: true } };
            if (currMenu.remark) {
                body.tags = [`备注：${currMenu.remark}`];
            }
            if (nodes && nodes.length > 0) {
                body.nodes = nodes;
            }
            treeMenus.push(body); //装菜单数据
        }
        return treeMenus;
    }
    /**
     * 获取菜单以及菜单下面的所有子节点
     */
    async getFirstMenu(roleId, syscode) {
        const menus = await this.ctx.service.admin.authority.dao.menuDao.listRoleMenus({ roleId: roleId, parentId: 0, type: 1, syscode: syscode }); //获取一级菜单
        for (let i = 0, len = menus.length; i < len; i++) {
            await this.getMenuChildren(roleId, menus[i], syscode);
        }
        return menus;
    }

    /**
     * 设置树菜单子节点
     * @param {*} node 
     */
    async setChildrenTreeNode(node) {
        if (node) {
            node.nodes = [];
            for (let i = 0, len = node.children.length; i < len; i++) {
                let childNode = node.children[i];

                let menuChecked = 1 === childNode.checked ? true : false;
                let body = { id: childNode.id, text: childNode.title, state: { checked: menuChecked, selected: menuChecked, expanded: true } };
                if (childNode.type == 2) {
                    body.icon = 'glyphicon glyphicon-tag';
                }
                if (childNode.remark) {
                    body.tags = [`备注：${childNode.remark}`];
                }

                let childNodes = await this.setChildrenTreeNode(childNode);
                if (childNodes && childNodes.length > 0) {
                    body.nodes = childNodes;
                }

                node.nodes.push(body); //在菜单数据中，装权限数据
            }

            return node.nodes;
        } else {
            return null;
        }
    }
    /**
     * 获取菜单下面的所有子节点
     * @param {*} menu 
     */
    async getMenuChildren(roleId, menu, syscode) {
        const ms = await this.ctx.service.admin.authority.dao.menuDao.listRoleMenus({ roleId: roleId, parentId: menu.id, syscode: syscode }); //获取菜单下面的子菜单或权限

        for (let i = 0, len = ms.length; i < len; i++) {
            await this.getMenuChildren(roleId, ms[i], syscode);
        }
        menu.children = ms;
        return menu;
    }

}

module.exports = roleMenuService;