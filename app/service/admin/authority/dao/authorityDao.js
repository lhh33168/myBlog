const Controller = require('../../../../base/baseController');

class authorityDao extends Controller {
    /**
     * 获取角色信息
     */
    async getRoles() {
        let sql = 'SELECT id FROM auth_role WHERE status=1 ORDER BY create_time ASC ';
        return await this.authorityDB.query(sql);
    }
    /**
     * 获取角色对应的权限信息
     * @param {string} roleId 角色id
     */
    async getAuthoritys(roleId) {
        let params = [],
            sql = "SELECT m.url, m.link_urls FROM auth_role_menu rm ";
        sql += "LEFT JOIN auth_menu m ON m.id = rm.menu_id ";
        sql += "WHERE m.del=0 AND m.status=1 AND m.url IS NOT NULL AND m.url <> '' ";
        sql += "AND rm.role_id = ? ";

        if (roleId) {
            params.push(roleId);
        }

        return await this.authorityDB.query(sql, params);
    }

}

module.exports = authorityDao;