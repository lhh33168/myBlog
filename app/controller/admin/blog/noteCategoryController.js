const Controller = require('../../../base/baseController');

class noteCategoryController extends Controller {

    /**
     * 数据列表
     */
    async index() {
        let body = this.ctx.query;
        body.page = body.page || 1;
        let status = await this.ctx.service.admin.blog.noteCategoryService.select(body);
        await this.ctx.render('/admin/blog/noteCategory/noteCategory.tpl', { status: status, params: body });
    }
    /**
     * 获取发布版本记录
     */
    async list() {
        let body = this.ctx.query;
        body.orderBy="create_time ASC ";
        let status = await this.ctx.service.admin.blog.noteCategoryService.list(body);
        this.ctx.body = status;
    }
    /**
     * 进入新增
     */
    async new() {
        await this.ctx.render('/admin/blog/noteCategory/noteCategoryNew.tpl');
    }

    /**
     * 新增数据
     */
    async add() {
        const body = this.ctx.request.body;
        const rule = {
            title: { type: 'string' }
        };

        let status = await this.validateExecute(rule, body, async () => {
            return await this.ctx.service.admin.blog.noteCategoryService.save(body);
        });

        await this.ctx.render('/admin/blog/noteCategory/noteCategoryNew.tpl', { status: status });
    }
    /**
     * 进入编辑
     */
    async edit() {
        const status = await this.ctx.service.admin.blog.noteCategoryService.get(this.ctx.query.id);
        await this.ctx.render('/admin/blog/noteCategory/noteCategoryNew.tpl', { status: status });
    }

    /**
     * 修改数据
     */
    async update() {
        let body = this.ctx.request.body;
        const rule = {
            title: { type: 'string' }
        };

        let status = await this.validateExecute(rule, body, async (status) => {
            let statusUp = await this.ctx.service.admin.blog.noteCategoryService.update(body);
            statusUp.data = status.data;
            return statusUp;
        });

        await this.ctx.render('/admin/blog/noteCategory/noteCategoryNew.tpl', { status: status });
    }

    /**
    * 删除数据
    */
    async destroy() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteCategoryService.destroy(body);
        const listSt = await this.ctx.service.admin.blog.noteCategoryService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/blog/noteCategory/noteCategory.tpl', { status: status });
    }

    /**
     * 发布笔记
     */
    async publish(){
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteCategoryService.publish(body);
        const listSt = await this.ctx.service.admin.blog.noteCategoryService.select({ page: 1 });
        status.data = listSt.data;
        await this.ctx.render('/admin/blog/noteCategory/noteCategory.tpl', { status: status });
    }
    /**
     * 撤销笔记
     */
    async repeal(){
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteCategoryService.repeal(body);
        const listSt = await this.ctx.service.admin.blog.noteCategoryService.select({ page: 1 });
        status.data = listSt.data;
        await this.ctx.render('/admin/blog/noteCategory/noteCategory.tpl', { status: status });
    }
}

module.exports = noteCategoryController;