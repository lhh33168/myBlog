const Controller = require('../../../base/baseController');

class noteController extends Controller {

    /**
     * 数据列表
     */
    async index() {
        let body = this.ctx.query;
        body.page = body.page || 1;
        let status = await this.ctx.service.admin.blog.noteService.select(body);
        this.ctx.body = status;
    }

}

module.exports = noteController;