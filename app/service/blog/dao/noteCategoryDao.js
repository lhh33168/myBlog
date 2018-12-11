const Controller = require("../../../base/baseController");

class noteDao extends Controller {
    /**
     * 查询
     */
    async select(body) {
        let sql, params = [];

        sql = "SELECT id, title, status, create_time, update_time ";
        sql += "FROM blog_note_category WHERE status=2 ";
        sql += body.title ? "AND title like ? " : "";
        sql += "ORDER BY "
        sql += body.orderBy ? body.orderBy : "create_time DESC ";

        if (body.title) params.push("%" + body.title + "%");

        return await this.dbSelect(sql, params, body, this.authorityDB);
    }
}

module.exports = noteDao;
