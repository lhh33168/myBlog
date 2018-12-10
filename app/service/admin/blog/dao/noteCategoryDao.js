const Controller = require("../../../../base/baseController");

class noteDao extends Controller {
    /**
     * 查询
     */
    async select(body) {
        let sql, params = [];

        sql = "SELECT id, title, status, create_time, update_time ";
        sql += "FROM blog_note_category WHERE 1=1 ";
        sql += body.title ? "AND title like ? " : "";
        sql += "ORDER BY "
        sql += body.orderBy ? body.orderBy : "create_time DESC ";

        if (body.title) params.push("%" + body.title + "%");

        return await this.dbSelect(sql, params, body, this.authorityDB);
    }

    /**
     * 通过ID获取
     * @param {*} id
     */
    async get(id) {
        return await this.authorityDB.get("blog_note_category", { id: id });
    }
    /**
     * 更新
     * @param {*} body
     */
    async update(body) {
        delete body._csrf;
        body.update_user_id = this.user.id;
        body.update_time = this.authorityDB.literals.now;

        return await this.authorityDB.update("blog_note_category", body);
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

        return await this.authorityDB.insert("blog_note_category", body);
    }

    /**
     * 删除
     * @param {*} body 
     */
    async delete(body) {
        return await this.authorityDB.delete("blog_note_category", body);
    }

}

module.exports = noteDao;
