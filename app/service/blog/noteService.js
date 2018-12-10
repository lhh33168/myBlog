const Controller = require("../../base/baseController");

class noteService extends Controller {

    /**
	 * 查询
	 */
    async select(body) {
        const result = await this.ctx.service.blog.dao.noteDao.select(body);
        return this.st.success('', result);
    }

    /**
	 * 根据id获取
	 * @param {String} id 
	 * @param {String} syscode 
	 */
    async get(body) {
        const result = await this.ctx.service.blog.dao.noteDao.select(body);
        return this.st.success('', (result && result.length > 0) ? result[0] : {});
    }
    /* 
        查找分类标签
    */
    async getCategory(body) {
        const result = await this.ctx.service.blog.dao.noteCategoryDao.select(body);
        console.log('result' ,result)
        return this.st.success('', result);
    }
    /* 
        查找分类列表
    */
    async getNoteList(id) {
        console.log('id', id)
        const result = await this.ctx.service.blog.dao.noteDao.select({category_id: id});
        console.log('result' ,result)
        return this.st.success('', result);
    }
}
module.exports = noteService;
