const Controller = require('../../../base/baseController');

class UserRoleService extends Controller {
    /**
    * 保存角色权限
    * @param {json} body 
    */
    async save(body) {
        let user_id = body.id;
        let delSQL = "delete from auth_user_role where user_id=?";
        let delParams = [user_id];
        await this.authorityDB.query(delSQL, delParams);
        if (body.roles) {
            let roles = body.roles.split(',');
            for (var i = 0; i < roles.length; i++) {
                let saveBody = {
                    role_id: roles[i],
                    user_id: user_id,
                    create_user_id: this.user.id,
                    create_time: this.authorityDB.literals.now
                };
                await this.authorityDB.insert("auth_user_role", saveBody);
            }
        }
        return this.st.success('保存成功', null);
    }
    /**
     * 删除用户角色权限数据，删除用户的时候，会同时调用该方法删除用户的角色数据
     * @param {*} userId 
     */
    async del(userId, conn) {
        let sql = "delete from auth_user_role where user_id=?";
        let params = [userId];
        let connect = conn ? conn : this.authorityDB;
        await connect.query(sql, params);
    }
}
module.exports = UserRoleService;