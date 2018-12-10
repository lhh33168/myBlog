const Controller = require("../../../base/baseController");

class RoleService extends Controller {
    /**
    * 保存
    * @param {json} body 
    */
    async save(body) {
        delete body.id;
        delete body._csrf;
        body.create_user_id = this.user.id;
        body.update_user_id = this.user.id;
        body.create_time = this.authorityDB.literals.now;
        body.update_time = this.authorityDB.literals.now;
        const result = await this.authorityDB.insert('auth_role', body);
        await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
        return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
    }

    /**
	 * 查询
	 */
    async select(body) {
        let sql = "SELECT id, name, status, remark, create_time, update_time ";
        sql += "FROM auth_role ";
        sql += "WHERE 1=1 ";
        sql += body.name ? " AND name like ? " : "";
        sql += "ORDER BY create_time DESC ";

        let params = [];
        let i = 0;
        if (body.name) {
            params[i] = "%" + body.name + "%";
            i++;
        }
        const result = await this.dbSelect(sql, params, body, this.authorityDB);
        return this.st.success('', result);
    }

    /**
	 * 根据id获取
	 * @param {String} id 
	 */
    async get(id) {
        const role = await this.authorityDB.get('auth_role', { id: id });
        return this.st.success('', role);
    }

    /**
	 * 修改
	 * @param {json} body 
	 */
    async update(body) {
        delete body._csrf;
        body.update_user_id = this.user.id;
        body.update_time = this.authorityDB.literals.now;
        const result = await this.authorityDB.update('auth_role', body);
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
            const result = await this.authorityDB.beginTransactionScope(async conn => { //开启事务
                const result = await this.ctx.service.admin.authority.roleMenuService.del(body.id, conn);
                const result2 = await this.authorityDB.delete("auth_role", { id: body.id });
                await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
                return 0 < result2.affectedRows;
            }, this.ctx);
            return result ? this.st.success('删除成功', result) : this.st.error('删除失败', result);
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
            delete body._csrf;
            body.update_user_id = this.user.id;
            body.update_time = this.authorityDB.literals.now;
            const result = await this.authorityDB.update('auth_role', body);
            await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
            return (0 < result.affectedRows) ? this.st.success('启用成功', result) : this.st.error('启用失败', result);
        }
    }
	/**
	 * 停用
	 * @param {json} body 
	 */
    async disable(body) {
        if (!body.id) {
            return this.st.error('请选择要禁用的记录！', body);
        } else {
            body.status = 2;
            delete body._csrf;
            body.update_user_id = this.user.id;
            body.update_time = this.authorityDB.literals.now;
            const result = await this.authorityDB.update('auth_role', body);
            await this.ctx.service.admin.authority.authorityService.clearCacheRoles(); //清理角色缓存数据
            return (0 < result.affectedRows) ? this.st.success('停用成功', result) : this.st.error('停用失败', result);
        }
    }
}
module.exports = RoleService;
