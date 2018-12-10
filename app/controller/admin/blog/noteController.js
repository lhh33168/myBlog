const Controller = require('../../../base/baseController');

class noteController extends Controller {

    /**
     * 数据列表
     */
    async index() {
        let body = this.ctx.query;
        console.log('body',body)
        body.page = body.page || 1;
        let status = await this.ctx.service.admin.blog.noteService.select(body);
        let categoryStatus = await this.ctx.service.admin.blog.noteCategoryService.select({});
        await this.ctx.render('/admin/blog/note/note.tpl', { status: status, params: body, categoryStatus: categoryStatus });
    }
    /**
     * 获取发布版本记录
     */
    async list() {
        let body = this.ctx.query;
        body.orderBy = "create_time ASC ";
        let status = await this.ctx.service.admin.blog.noteService.list(body);
        this.ctx.body = status;
    }
    /**
     * 进入新增
     */
    async new() {
        let status = await this.ctx.service.admin.blog.noteCategoryService.select({});
        await this.ctx.render('/admin/blog/note/noteNew.tpl', { categoryStatus: status });
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
            return await this.ctx.service.admin.blog.noteService.save(body);
        });

        await this.ctx.render('/admin/blog/note/noteNew.tpl', { status: status });
    }
    /**
     * 进入编辑
     */
    async edit() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteService.get(body.id);
        let categoryStatus = await this.ctx.service.admin.blog.noteCategoryService.select({});
        await this.ctx.render('/admin/blog/note/noteNew.tpl', { status: status, categoryStatus: categoryStatus });
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
            let statusUp = await this.ctx.service.admin.blog.noteService.update(body);
            statusUp.data = status.data;
            return statusUp;
        });

        await this.ctx.render('/admin/blog/note/noteNew.tpl', { status: status });
    }

    /**
    * 删除数据
    */
    async destroy() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteService.destroy(body);
        const listSt = await this.ctx.service.admin.blog.noteService.select({ page: 1 });
        status.data = listSt.data;

        await this.ctx.render('/admin/blog/note/note.tpl', { status: status });
    }

    /**
     * 发布笔记
     */
    async publish() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteService.publish(body);
        const listSt = await this.ctx.service.admin.blog.noteService.select({ page: 1 });
        status.data = listSt.data;
        await this.ctx.render('/admin/blog/note/note.tpl', { status: status });
    }
    /**
     * 撤销笔记
     */
    async repeal() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.blog.noteService.repeal(body);
        const listSt = await this.ctx.service.admin.blog.noteService.select({ page: 1 });
        status.data = listSt.data;
        await this.ctx.render('/admin/blog/note/note.tpl', { status: status });
    }
}

module.exports = noteController;