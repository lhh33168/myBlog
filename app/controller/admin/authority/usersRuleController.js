const Controller = require('../../../base/baseController');

class usersRuleController extends Controller {

    /**
     * 进入授权页面
     */
    async authority() {
        let body = this.ctx.query;
        let userStatus = await this.ctx.service.admin.authority.userService.get(body.id);
        //获取系统所有角色
        let allAuthority = await this.ctx.service.admin.authority.userService.getAll(body.id);

        await this.ctx.render('/admin/authority/users/userAuthority.tpl', { userStatus: userStatus, allAuthority: allAuthority });
    }
    /**
     * 保存授权
     */
    async saveAuthority() {
        let body = this.ctx.request.body;
        let status = await this.ctx.service.admin.authority.userRoleService.save(body);
        let userStatus = await this.ctx.service.admin.authority.userService.get(body.id);
        //获取系统所有角色
        let allAuthority = await this.ctx.service.admin.authority.userService.getAll(body.id);
        await this.ctx.render('/admin/authority/users/userAuthority.tpl', { status: status, userStatus: userStatus, allAuthority: allAuthority });
    }

}

module.exports = usersRuleController;