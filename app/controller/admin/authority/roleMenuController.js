const Controller = require('../../../base/baseController');

class roleMenuController extends Controller {
    /**
     * 进入授权页面
     */
    async authority() {
        let body = this.ctx.query;
        body.syscode = body.syscode || 1;
        let roleStatus = await this.ctx.service.admin.authority.roleService.get(body.id);

        await this.ctx.render('/admin/authority/role/roleAuthority.tpl', { roleStatus: roleStatus, params: body });
    }
    /**
     * 获取菜单权限
     */
    async getMenuAuthority() {
        let body = this.ctx.query;
        let menuAuthority = await this.ctx.service.admin.authority.roleMenuService.getPermission(body.id, body.syscode);
        this.ctx.body = menuAuthority;
    }

    /**
     * 保存授权权限
     */
    async saveAuthority() {
        let body = this.ctx.request.body;
        let status = await this.ctx.service.admin.authority.roleMenuService.save(body);
        let roleStatus = await this.ctx.service.admin.authority.roleService.get(body.id);
        await this.ctx.render('/admin/authority/role/roleAuthority.tpl', { status: status, roleStatus: roleStatus, params: body });
    }

}

module.exports = roleMenuController;