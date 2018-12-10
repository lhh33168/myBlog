const Controller = require("../../../../base/baseController");

class menuDao extends Controller {
    /**
     * 查询
     */
    async select(body) {
        let sql,
            params = [];
        sql = "SELECT pm.title parent_title, m.* ";
        sql += "FROM auth_menu m ";
        sql += "LEFT JOIN auth_menu pm ON pm.id=m.parent_id ";
        sql += "WHERE m.del=0 ";
        sql += body.title ? "AND m.title like ? " : "";
        sql += body.parent_title ? "AND pm.title like ? " : "";
        sql += body.url ? "AND m.url like ? " : "";
        sql += body.level ? "AND m.level=? " : "";
        sql += body.status ? "AND m.status=? " : "";
        sql += body.type ? "AND m.type=? " : "";
        sql += body.syscode ? "AND m.syscode=? " : "";
        sql +=
            body.parent_id || body.parent_id === 0 ? "AND m.parent_id=? " : "";
        sql += "ORDER BY pm.seq ASC, m.seq ASC ";

        if (body.title) params.push("%" + body.title + "%");

        if (body.parent_title) params.push("%" + body.parent_title + "%");
        if (body.url) params.push("%" + body.url + "%");

        if (body.level) params.push(body.level);

        if (body.status) params.push(body.status);

        if (body.type) params.push(body.type);

        if (body.syscode) params.push(body.syscode);

        if (body.parent_id || body.parent_id === 0) params.push(body.parent_id);

        return await this.dbSelect(sql, params, body, this.authorityDB);
    }

    /**
     * 根据角色id加载菜单数据
     * @param {*} body
     */
    async listRoleMenus(body) {
        let sql,
            params = [];
        sql =
            "SELECT m.id, m.title, m.remark, m.type, rm.menu_id, rm.role_id, CASE WHEN rm.role_id IS NOT NULL THEN 1 ELSE 0 END checked ";
        sql +=
            "FROM auth_menu m LEFT JOIN auth_role_menu rm ON rm.menu_id=m.id AND rm.role_id=? ";
        sql +=
            "WHERE m.del=0 AND m.status=1 AND m.syscode=? AND m.parent_id=? ";
        sql += body.type ? "AND m.type=? " : "";
        sql += "ORDER BY m.seq ASC ";

        params.push(body.roleId);
        params.push(body.syscode);
        params.push(body.parentId);
        if (body.type) params.push(body.type);

        return await this.authorityDB.query(sql, params);
    }

    /**
     * 通过ID获取
     * @param {*} id
     */
    async get(id) {
        return await this.authorityDB.get("auth_menu", { id: id });
    }
    /**
     * 更新
     * @param {*} body
     */
    async update(body, conn) {
        delete body._csrf;
        body.update_user_id = this.user.id;
        body.update_time = this.authorityDB.literals.now;

        let connection = conn ? conn : this.authorityDB;
        return await connection.update("auth_menu", body);
    }
    /**
     * 获取父级菜单，排除当前编辑的菜单
     * @param {*} id
     */
    async getParentMenu(id) {
        let sql,
            params = [];
        sql = "SELECT * FROM auth_menu where del=0 AND type=1 ";
        sql += id ? "AND id<>? " : "";
        sql += "ORDER BY seq ASC ";
        if (id) params.push(id);
        return this.authorityDB.query(sql, params);
    }

    /**
     * 获取用户已授权访问的菜单
     * @param {*} body
     */
    async getUserMenu(body) {
        let sql = "SELECT m.id, m.title, m.remark, m.url ";
        sql += "FROM auth_menu m, ";
        sql +=
            "(SELECT menu_id, 1 checked FROM auth_user_role ur, auth_role_menu rm WHERE ur.role_id=rm.role_id AND ur.user_id=? GROUP BY menu_id) v ";
        sql +=
            "WHERE v.menu_id=m.id AND m.del=0 AND m.status=1 AND m.type=1 AND m.parent_id=? AND m.syscode=? ";
        sql += "ORDER BY m.seq ASC ";
        let params = [body.id, body.parentId, body.syscode];

        return await this.authorityDB.query(sql, params);
    }
    /**
     * 保存
     * @param {*} body
     */
    async insert(body, conn) {
        delete body.id;
        delete body._csrf;
        body.create_user_id = this.user.id;
        body.update_user_id = this.user.id;
        body.create_time = this.authorityDB.literals.now;
        body.update_time = this.authorityDB.literals.now;

        let connection = conn ? conn : this.authorityDB;
        return await connection.insert("auth_menu", body);
    }

    async select2(body) {
        let sql,
            params = [];
        sql =
            "SELECT m.id, m.title, m.parent_id, m.type, (SELECT count(1) from auth_menu m2 WHERE 1=1 AND m2.del=0 AND m2.parent_id=m.id) child_num ";
        sql += "from auth_menu m ";
        sql += "WHERE m.del=0 AND m.syscode=? ";
        sql +=
            body.parent_id || body.parent_id === 0 ? "AND m.parent_id =? " : "";
        sql += "ORDER BY m.seq ASC ";
        params.push(body.syscode);
        if (body.parent_id || body.parent_id === 0) params.push(body.parent_id);

        return await this.dbSelect(sql, params, body, this.authorityDB);
    }

    async exportMenus() {
        return await this.authorityDB.select("auth_menu");
    }

    async importMenns(params) {
        let sql =
            "INSERT INTO auth_menu (id, title,url,link_urls,parent_id,seq,remark,type,create_user_id,create_time,update_user_id,update_time,parent_path) VALUES ?";
        try {
            await this.authorityDB.query(sql, [params]);
            return "导入成功"
        } catch (err) {
            this.ctx.logger.error("导入菜单出错：", err);
            return err.message ?  "导入菜单出错："+err.message : "导入菜单出错：";
        }
    }
}

module.exports = menuDao;
