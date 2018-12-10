const Controller = require('../../../base/baseController');

class usersController extends Controller {

    /**
     * 数据列表
     */
    async index() {
        let body = this.ctx.query;
        body.page = body.page || 1;
        let status = await this.ctx.service.admin.authority.userService.select(body);
        await this.ctx.render('/admin/authority/users/users.tpl', { status: status, params: body });
    }

    /**
     * 进入新增界面
     */
    async new() {
        await this.ctx.render('/admin/authority/users/userEdit.tpl');
    }

    /**
     * 新增数据
     */
    async create() {
        const body = this.ctx.request.body;
        const rule = {
            uname: { type: 'string', min: 4, max: 16 },
            phone: { type: 'phone' },
            pword: { type: 'password', min: 6, max: 16 },
            rePword: { type: 'password', min: 6, max: 16, compare: 'pword' }
        };

        let status = await this.validateExecute(rule, body, async () => {
            return await this.ctx.service.admin.authority.userService.save(body);
        });

        await this.ctx.render('/admin/authority/users/userEdit.tpl', { status: status, params: body });
    }

    /**
     * 进入编辑页面
     */
    async edit() {
        const status = await this.ctx.service.admin.authority.userService.get(this.ctx.query.id);
        await this.ctx.render('/admin/authority/users/userEdit.tpl', { status: status });
    }

    /**
     * 修改数据
     */
    async update() {
        let body = this.ctx.request.body;
        const rule = {

        };

        let status = await this.validateExecute(rule, body, async (status) => {
            let statusUp = await this.ctx.service.admin.authority.userService.update(body);
            statusUp.data = status.data;
            return statusUp;
        });

        await this.ctx.render('/admin/authority/users/userEdit.tpl', { status: status });
    }

    /**
     * 进入修改密码界面
     */
    async pword() {
        await this.ctx.render('/admin/authority/users/pword.tpl');
    }

    /**
     * 修改用户密码
     */
    async upPassword() {
        let body = this.ctx.request.body;
        const rule = {
            oldPword: { type: 'password', min: 6, max: 16 },
            pword: { type: 'password', min: 6, max: 16 },
            rePword: { type: 'password', min: 6, max: 16, compare: 'pword' }
        };

        let status = await this.validateExecute(rule, body, async (status) => {
            return await this.ctx.service.admin.authority.userService.upPassword(body);
        });

        await this.ctx.render('/admin/authority/users/pword.tpl', { status: status });
    }

    /**
     * 删除数据
     */
    async destroy() {
        let status = await this.ctx.service.admin.authority.userService.destroy(this.ctx.query);
        const listSt = await this.ctx.service.admin.authority.userService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/authority/users/users.tpl', { status: status });
    }
    /**
     * 启用
     */
    async enabled() {
        let status = await this.ctx.service.admin.authority.userService.enabled(this.ctx.query);
        const listSt = await this.ctx.service.admin.authority.userService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/authority/users/users.tpl', { status: status });
    }
    /**
     * 禁用
     */
    async disable() {
        let status = await this.ctx.service.admin.authority.userService.disable(this.ctx.query);
        const listSt = await this.ctx.service.admin.authority.userService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/authority/users/users.tpl', { status: status });
    }

}

module.exports = usersController;