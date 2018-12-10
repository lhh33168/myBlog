const Controller = require("../../../base/baseController");

class noteCategoryService extends Controller {
    /**
     * 获取dao
     */
    get dao() {
        return this.ctx.service.admin.blog.dao.noteCategoryDao;
    }
    /**
    * 保存
    * @param {json} body 
    */
    async save(body) {
        const result = await this.dao.insert(body);
        return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
    }

    /**
	 * 查询
	 */
    async select(body) {
        const result = await this.dao.select(body);
        return this.st.success('', result);
    }

    /**
	 * 根据id获取
	 * @param {String} id 
	 * @param {String} syscode 
	 */
    async get(id) {
        const result = await this.dao.get(id);
        return this.st.success('', result);
    }

    /**
	 * 修改
	 * @param {json} body 
	 */
    async update(body) {
        const result = await this.dao.update(body);
        return (0 < result.affectedRows) ? this.st.success('保存成功', result) : this.st.error('保存失败', result);
    }

	/**
	 * 删除
	 * @param {json} body 
	 */
    async destroy(body) {
        if (!body.id) {
            return this.st.error('请选择要删除的记录！', body);
        } else {
            delete body._csrf;
            const result = await this.dao.delete(body);
            return (0 < result.affectedRows) ? this.st.success('删除成功', result) : this.st.error('删除失败', result);
        }
    }

    /**
     * 发布
     * @param {*} body 
     */
    async publish(body) {
        const result = await this.dao.update({ id: body.id, status: 2 });
        return (0 < result.affectedRows) ? this.st.success('发布成功', result) : this.st.error('发布失败', result);
    }
    /**
     * 撤销
     * @param {*} body 
     */
    async repeal(body) {
        const result = await this.dao.update({ id: body.id, status: 1 });
        return (0 < result.affectedRows) ? this.st.success('撤销成功', result) : this.st.error('撤销失败', result);
    }

}
module.exports = noteCategoryService;
