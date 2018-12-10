const Controller = require("../../../../base/baseController");

class userDao extends Controller {
  /**
   * 获取登录用户信息
   * @param {string} uname
   * @param {string} pword
   */
  async login(uname, pword) {
    const params = [uname, pword];
    let sql = "SELECT u.id, u.uname, u.phone, u.status ";
    sql += "FROM auth_user u ";
    sql += "WHERE u.uname=? AND u.pword=? ";

    const users = await this.authorityDB.query(sql, params);
    return users && 0 < users.length ? users[0] : null;
  }
  /**
   * 获取用户对应的角色
   * @param {*} userid 
   */
  async getUserRoles(userid) {
    let params = [],
      sql = "SELECT group_concat(ur.role_id) role_ids ";
    sql += "from auth_user_role ur, auth_role r ";
    sql += "WHERE ur.role_id = r.id ";
    sql += "AND user_id = ? ";

    if (userid) {
      params.push(userid);
    }

    const result = await this.authorityDB.query(sql, params);
    return result && result.length > 0 ? result[0].role_ids : '';
  }
  /**
   *
   * @param {*} body
   */
  async select(body) {
    let sql,
      params = [];
    sql =
      "SELECT u.id, u.uname, u.phone, u.status, u.create_time, u.update_time ";
    sql += "FROM auth_user u ";
    sql += "WHERE u.id<>1 ";
    sql += body.uname ? " AND u.uname like ? " : "";
    sql += body.phone ? " AND u.phone=? " : "";
    sql += "ORDER BY u.create_time DESC ";
    if (body.uname) params.push("%" + body.uname + "%");

    if (body.phone) params.push(body.phone);

    return this.dbSelect(sql, params, body, this.authorityDB);
  }

  async getByPhone(phone) {
    return this.authorityDB.get("auth_user", { phone: phone });
  }

  /**
   * 更新
   * @param {json} body
   */
  async update(body) {
    delete body._csrf;
    body.update_user_id = this.user.id;
    body.update_time = this.authorityDB.literals.now;
    return await this.authorityDB.update("auth_user", body);
  }
  /**
   * 更新
   * @param {json} body
   */
  async insert(body) {
    delete body.id;
    delete body._csrf;
    body.create_time = this.authorityDB.literals.now;
    body.update_time = this.authorityDB.literals.now;
    return await this.authorityDB.insert("auth_user", body);
  }
  /**
   * 通过id加载数据
   * @param {string} id
   */
  async get(id) {
    return this.authorityDB.get("auth_user", { id: id });
  }
  /**
   * 删除
   * @param {*} id
   */
  async del(id, conn) {
    let connet = conn ? conn : this.authorityDB;
    return connet.delete("auth_user", { id: id });
  }
}

module.exports = userDao;
