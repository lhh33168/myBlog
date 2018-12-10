const Controller = require("../../../../base/baseController");

class noteDao extends Controller {
    /**
     * 查询
     */
    async select(body) {
        let sql, params = [];

        sql = "SELECT n.id, n.title, n.intro, n.content, n.status, n.create_time, n.update_time, n.category_id, nc.title category_title ";
        sql += "FROM blog_note n ";
        sql += "LEFT JOIN blog_note_category nc ON n.category_id = nc.id ";
        sql += "WHERE 1=1 ";
        sql += body.title ? "AND n.title like ? " : "";
        sql += body.intro ? "AND n.intro like ? " : "";
        sql += body.start_date ? "AND n.create_time>=? " : "";
        sql += body.end_date ? "AND n.create_time<=? " : "";
        sql += body.status ? "AND n.status=? " : "";
        sql += body.category_id ? "AND n.category_id=? " : "";
        sql += "ORDER BY n.create_time DESC ";

        if (body.title) params.push("%" + body.title + "%");
        if (body.intro) params.push("%" + body.intro + "%");
        if (body.start_date) params.push(body.start_date + ' 00:00:00');
        if (body.end_date) params.push(body.end_date + ' 23:59:59');
        if (body.status) params.push(body.status);
        if (body.category_id) params.push(body.category_id);

        return await this.dbSelect(sql, params, body, this.authorityDB);
    }

    /**
     * 通过ID获取
     * @param {*} id
     */
    async get(id) {
        return await this.authorityDB.get("blog_note", { id: id });
    }
    /**
     * 更新
     * @param {*} body
     */
    async update(body) {
        delete body._csrf;
        body.update_user_id = this.user.id;
        body.update_time = this.authorityDB.literals.now;

        return await this.authorityDB.update("blog_note", body);
    }

    /**
     * 保存
     * @param {*} body
     */
    async insert(body) {
        delete body.id;
        delete body._csrf;
        body.create_user_id = this.user.id;
        body.update_user_id = this.user.id;
        body.create_time = this.authorityDB.literals.now;
        body.update_time = this.authorityDB.literals.now;

        return await this.authorityDB.insert("blog_note", body);
    }

    /**
     * 删除
     * @param {*} body 
     */
    async delete(body) {
        return await this.authorityDB.delete("blog_note", body);
    }

}

module.exports = noteDao;
