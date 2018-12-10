const Controller = require('../../../../base/baseController');

/**
 * 数据字典DAO
 */
class roleMenuDao extends Controller {
    /**
     * 通过id加载数据
     * @param {string} roleId 
     */
    async getRoleMenu(roleId) {
        let roleMenuSql = "SELECT role_id, menu_id FROM auth_role_menu WHERE role_id = ?";
        let roleMenuParams = [roleId];
        return await this.authorityDB.query(roleMenuSql, roleMenuParams); //获取当前角色已经授权的权限
    }

    /**
     * 删除
     * @param {*} syscode 
     * @param {*} roleId 
     * @param {*} conn 
     */
    async delByRoleIdAndSyscode(syscode, roleId, conn) {
        let sql = "DELETE FROM auth_role_menu WHERE syscode=? AND role_id=?";
        let params = [syscode, roleId];
        let connection = conn ? conn : this.authorityDB;
        await connection.query(sql, params);
    }
    /**
     * 通过roleId删除数据
     * @param {*} roleId 
     * @param {*} conn 
     */
    async del(roleId, conn) {
        let sql = "DELETE FROM auth_role_menu WHERE role_id=?";
        let params = [roleId];
        let connection = conn ? conn : this.authorityDB;
        await connection.query(sql, params);
    }
    /**
     * 保存数据
     * @param {*} body 
     * @param {*} conn 
     */
    async insert(body, conn) {
        let connection = conn ? conn : this.authorityDB;
        await connection.insert("auth_role_menu", body);
    }
}

module.exports = roleMenuDao;