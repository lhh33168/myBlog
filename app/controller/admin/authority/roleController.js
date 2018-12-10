const Controller = require('../../../base/baseController');

class RoleController extends Controller {
   
    /**
     * 数据列表
     */
    async role() {
        let body = this.ctx.query;
        body.page = body.page || 1;
        let status = await this.ctx.service.admin.authority.roleService.select(body);
        await this.ctx.render('/admin/authority/role/role.tpl', { status: status, params: body });
    }
    /**
     * 进入新增
     */
    async new() {
        await this.ctx.render('/admin/authority/role/roleNew.tpl');
    }

    /**
     * 新增数据
     */
    async add() {
        const body = this.ctx.request.body;
        const rule = {
            name: { type: 'string' }
        };

        let status = await this.validateExecute(rule, body, async () => {
            return await this.ctx.service.admin.authority.roleService.save(body);
        });

        await this.ctx.render('/admin/authority/role/roleNew.tpl', { status: status });
    }
    /**
     * 进入编辑
     */
    async edit() {
        const status = await this.ctx.service.admin.authority.roleService.get(this.ctx.query.id);
        await this.ctx.render('/admin/authority/role/roleNew.tpl', { status: status });
    }

    /**
     * 修改数据
     */
    async update() {
        let body = this.ctx.request.body;
        const rule = {
            name: { type: 'string' }
        };

        let status = await this.validateExecute(rule, body, async (status) => {
            let statusUp = await this.ctx.service.admin.authority.roleService.update(body);
            statusUp.data = status.data;
            return statusUp;
        });

        await this.ctx.render('/admin/authority/role/roleNew.tpl', { status: status });
    }

    /**
    * 删除数据
    */
    async destroy() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.authority.roleService.destroy(body);
        const listSt = await this.ctx.service.admin.authority.roleService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/authority/role/role.tpl', { status: status });
    }

    /**
     * 启用
     */
    async enabled() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.authority.roleService.enabled(body);
        const listSt = await this.ctx.service.admin.authority.roleService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/authority/role/role.tpl', { status: status });
    }
    /**
     * 停用
     */
    async disable() {
        let status = await this.ctx.service.admin.authority.roleService.disable(this.ctx.query);
        const listSt = await this.ctx.service.admin.authority.roleService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/authority/role/role.tpl', { status: status });
    }

}

module.exports = RoleController;