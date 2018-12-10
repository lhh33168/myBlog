const Controller = require('../../base/baseController');

class noteController extends Controller {

    /**
     * 笔记列表AND笔记分类标签
     */
    async index() {
        let body = this.ctx.query;
        body.page = body.page || 1;
        let categoryLabel = await this.ctx.service.blog.noteService.getCategory(body);
        let status = await this.ctx.service.blog.noteService.select(body);
        await this.ctx.render('/blog/note/note.tpl', { status: status, categoryLabel: categoryLabel, params: body, });
    }
    /**
     * 笔记详情
     */
    async details(){
        let body = this.ctx.query;
        let status = await this.ctx.service.blog.noteService.get(body);
        console.log('status: ', status);
        await this.ctx.render('/blog/note/noteDetails.tpl', { status: status });
    }
    /* 
        分类列表
    */
    async noteList(){
        let body = this.ctx.query;
        console.log('body' , body)
        let status = await this.ctx.service.blog.noteService.getNoteList(body.id);
        console.log('status: ', status);
        await this.ctx.render('/blog/note/noteList.tpl', { status: status });
    }
}

module.exports = noteController;