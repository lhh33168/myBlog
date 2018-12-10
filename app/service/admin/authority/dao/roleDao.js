const Controller = require('../../../../base/baseController');

class roleDao extends Controller {
    /**
     * 获取登录用户信息
     * @param {string} uname 
     * @param {string} pword 
     */
    async login(uname, pword) {
        const params = [uname, pword];
        let sql = 'SELECT ui.id user_id, ui.nick_name, u.id, u.uname, u.phone, u.status ';
        sql += 'FROM auth_user u ';
        sql += 'LEFT JOIN user_info ui ON ui.phone = u.phone ';
        sql += 'WHERE u.uname=? AND u.pword=? AND u.status<2 ';

        const users = await this.authorityDB.query(sql, params);
        return (users && 0 < users.length) ? users[0] : null;
    }
    
}

module.exports = roleDao;