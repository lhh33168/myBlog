const Controller = require('../../../base/baseController');

class UserService extends Controller {

	get dao() {
		return this.ctx.service.admin.authority.dao.userDao;
	}

	/**
     * 获取所有角色
     */
	async getAll(userId) {
		let userRoleSql = "SELECT role_id FROM auth_user_role WHERE user_id = ?";
		let userRoleParams = [userId];
		let userRoles = await this.authorityDB.query(userRoleSql, userRoleParams); //获取当前用户已经授权的角色

		let sql = "SELECT id, name, remark FROM auth_role WHERE status=1 ";
		const roles = await this.authorityDB.query(sql);//获取所有角色

		let treeRoles = [];
		for (var i = 0; i < roles.length; i++) {
			let currRole = roles[i];

			let roleChecked = false;

			for (var j = 0; j < userRoles.length; j++) {
				if (currRole.id == userRoles[j].role_id) {
					roleChecked = true;
				}
			}

			treeRoles.push({
				id: currRole.id,
				text: `${currRole.name}`,
				tags: `备注：${currRole.remark}`,
				checked: roleChecked,
				selected: roleChecked
			}); //装菜单数据
		}
		return treeRoles;
	}

	/**
	 * 用户登录
	 * @param {String} uname 用户名
	 * @param {String} pword 密码
	 */
	async login(uname, pword) {
		const user = await this.dao.login(uname, this.crypto.sha256(pword));
		if (user) {
			if (0 == user.status) {
				delete user.status; //删除多余没用的数据
				delete user.pword; //安全起见，删除密码
				if (!user.syscode) {
					user.syscode = '1';
				}
				user.role_ids = await this.dao.getUserRoles(user.id);
				user.user_id = user.id;
				this.ctx.session.user = user;
				return this.st.success();
			} else {
				return this.st.error('该账号已被锁定');
			}
		} else {
			return this.st.error('用户名或密码错误');
		}
	}

	/**
	 * 查询用户
	 */
	async select(body) {
		const result = await this.dao.select(body);
		return this.st.success('', result);
	}

	/**
	 * 保存用户
	 * @param {json} body 
	 */
	async save(body) {
		const uResult = await this.dao.getByPhone(body.phone);
		if (uResult && uResult.phone) {
			return this.st.error('手机号码已存在，请换个手机号码！');
		} else {
			delete body.rePword;
			if (body.pword) {
				body.pword = this.crypto.sha256(body.pword);
			}
			body.create_user_id = body.create_user_id || this.user.id;
			body.update_user_id = body.create_user_id || this.user.id;
			const result = await this.dao.insert(body);
			return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
		}
	}

	/**
	 * 根据id获取用户信息
	 * @param {String} id 
	 */
	async get(id) {
		const user = await this.dao.get(id);
		return this.st.success('', user);
	}
	/**
	 * 修改密码
	 * @param {json} body 
	 */
	async upPassword(body) {
		body.id = this.user.id;
		const user = await this.dao.get(body.id);
		if (this.crypto.sha256(body.oldPword) != user.pword) {
			return this.st.validateError('原密码不正确');
		} else if (body.pword == user.pword) {
			return this.st.validateError('新密码不能和原密码相同');
		} else {
			delete body.oldPword;
			delete body.rePword;
			body.pword = this.crypto.sha256(body.pword);
			const result = await this.dao.update(body);
			return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
		}
	}
	/**
	 * 修改用户
	 * @param {json} body 
	 */
	async update(body) {
		delete body.rePword;
		const result = await this.dao.update(body);
		return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
	}

	/**
	 * 删除用户
	 * @param {json} body 
	 */
	async destroy(body) {
		if (!body.id) {
			return this.st.error('请选择要删除的记录！', body);
		} else {
			const result = await this.authorityDB.beginTransactionScope(async conn => { //开启事务
				const result = await this.ctx.service.admin.authority.userRoleService.del(body.id, conn);
				const result2 = await this.dao.del(body.id, conn);
				return 0 < result2.affectedRows;
			}, this.ctx);
			return result ? this.st.success('删除成功', result) : this.st.error('删除失败', result);
		}
	}
	/**
	 * 启用用户
	 * @param {json} body 
	 */
	async enabled(body) {
		if (!body.id) {
			return this.st.error('请选择要启用的记录！', body);
		} else {
			body.status = 0;
			const result = await this.dao.update(body);
			return (0 < result.affectedRows) ? this.st.success('启用成功', result) : this.st.error('启用失败', result);
		}
	}
	/**
	 * 禁用用户
	 * @param {json} body 
	 */
	async disable(body) {
		if (!body.id) {
			return this.st.error('请选择要禁用的记录！', body);
		} else {
			body.status = 1;
			const result = await this.dao.update(body);
			return (0 < result.affectedRows) ? this.st.success('禁用成功', result) : this.st.error('禁用失败', result);
		}
	}

}

module.exports = UserService;