const Controller = require('../../../base/baseController');

class MenuController extends Controller {

    /**
     * 获取菜单数据
     */
    async getMenu() {
        const syscode = this.ctx.session.user.syscode;
        const menu = await this.ctx.service.admin.authority.userOnlineMenuService.getMenu(syscode);
        this.ctx.body = menu;
    }


}

module.exports = MenuController;