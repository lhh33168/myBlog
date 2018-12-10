const Controller = require('../../../base/baseController');

class IndexController extends Controller {
    /**
     * 登录页
     */
    async index() {
        if (this.user && this.user.id) {
            await this.ctx.render('/admin/main/version.tpl');
        } else {
            await this.ctx.render('/admin/main/login.tpl');
        }
    }

    /**
     * 登录页
     */
    async main() {
        await this.ctx.render('/admin/main/version.tpl');
    }

    /**
     * 登录
     */
    async login() {
        const rule = {
            uname: { type: 'string', min: 4, max: 16 },
            pword: { type: 'password', min: 6, max: 16 }
        };
        const body = this.ctx.request.body;

        let status = await this.validateExecute(rule, body, async () => {
            return await this.ctx.service.admin.authority.userService.login(body.uname, body.pword);
        });

        if ('0' == status.code) {
            await this.ctx.render('/admin/main/version.tpl', {});
        } else {
            await this.ctx.render('/admin/main/login.tpl', { status: status });
        }
    }

    /**
     * 注销登录
     */
    async logout() {
        this.ctx.cookies.set('uname', null);
        this.ctx.session = null;
        await this.ctx.render('/admin/main/login.tpl');
    }
    /**
     * 版本记录
     */
    async version() {
        await this.ctx.render('/admin/main/version.tpl');
    }
    /**
     * 切换系统
     */
    async switchsys() {
        this.ctx.session.user.syscode = this.ctx.query.syscode || 1;
        await this.ctx.render("/admin/main/version.tpl");
    }
}

module.exports = IndexController;