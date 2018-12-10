const Controller = require("../../../base/baseController");

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
        sql += body.id ? "AND n.id=? " : "";
        sql += "ORDER BY n.create_time DESC ";

        if (body.title) params.push("%" + body.title + "%");
        if (body.intro) params.push("%" + body.intro + "%");
        if (body.start_date) params.push(body.start_date + ' 00:00:00');
        if (body.end_date) params.push(body.end_date + ' 23:59:59');
        if (body.status) params.push(body.status);
        if (body.category_id) params.push(body.category_id);
        if (body.id) params.push(body.id);

        return await this.dbSelect(sql, params, body, this.authorityDB);
    }

    /**
     * 通过ID获取
     * @param {*} id
     */
    async get(id) {
        return await this.authorityDB.get("blog_note", { id: id });
    }
    

}

module.exports = noteDao;
