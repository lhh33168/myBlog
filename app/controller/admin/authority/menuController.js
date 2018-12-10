const Controller = require("../../../base/baseController");
const fs = require("fs");
const path = require("path");
class MenuController extends Controller {
    /**
     * 数据列表
     */
    async menu() {
        await this.ctx.render("/admin/authority/menu/menu2.tpl", {
            params: { syscode: this.ctx.query.syscode || 1 }
        });
    }

    async setChildrenMenus2() {
        let body = this.ctx.request.query;
        let status = await this.ctx.service.admin.authority.menuService.asyncTreeDate(
            body
        );
        this.ctx.body = status.data;
    }
    /**
     * 进入新增
     */
    async new() {
        let menuList = await this.ctx.service.admin.authority.menuService.getParentMenu();
        await this.ctx.render("/admin/authority/menu/menuNew.tpl", {
            menuList: menuList
        });
    }

    /**
     * 新增数据
     */
    async add() {
        let body = this.ctx.request.body;
        body.id = null;
        const rule = {
            title: { type: "string" },
            seq: { type: "string" }
        };

        let status = await this.validateExecute(rule, body, async () => {
            return await this.ctx.service.admin.authority.menuService.save(
                body
            );
        });

        this.ctx.body = status;
    }

    async edit() {
        const status = await this.ctx.service.admin.authority.menuService.get(
            this.ctx.query.id
        );
        this.ctx.body = status;
    }

    async update2() {
        let body = this.ctx.request.body;
        const rule = {
            title: { type: "string" },
            seq: { type: "string" }
        };

        let status = await this.validateExecute(rule, body, async status => {
            let statusUp = await this.ctx.service.admin.authority.menuService.update(
                body
            );
            statusUp.data = status.data;
            return statusUp;
        });
        this.ctx.body = status;
    }

    /**
     * 修改数据
     */
    async update() {
        let body = this.ctx.request.body;
        const rule = {
            title: { type: "string" },
            seq: { type: "string" }
        };

        let status = await this.validateExecute(rule, body, async status => {
            let statusUp = await this.ctx.service.admin.authority.menuService.update(
                body
            );
            statusUp.data = status.data;
            return statusUp;
        });
        let menuList = await this.ctx.service.admin.authority.menuService.getParentMenu(
            body.id
        );
        await this.ctx.render("/admin/authority/menu/menuNew.tpl", {
            status: status,
            menuList: menuList
        });
    }

    async destroyTree() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.authority.menuService.destroy(
            body
        );
        return (this.ctx.body = status);
    }

    /**
     * 启用
     */
    async enabled() {
        let body = this.ctx.query;
        let status = await this.ctx.service.admin.authority.menuService.enabled(
            body
        );
        const listSt = await this.ctx.service.admin.authority.menuService.select(
            { page: 1 }
        );
        status.data = listSt.data;

        await this.ctx.render("/admin/authority/menu/menu.tpl", {
            status: status
        });
    }
    /**
     * 禁用
     */
    async disable() {
        let status = await this.ctx.service.admin.authority.menuService.disable(
            this.ctx.query
        );
        const listSt = await this.ctx.service.admin.authority.menuService.select(
            { page: 1 }
        );
        status.data = listSt.data;

        await this.ctx.render("/admin/authority/menu/menu.tpl", {
            status: status
        });
    }

    async export() {
        let data = await this.ctx.service.admin.authority.menuService.export();
        console.log(data);
        let result = [
            {
                name: "sheet1",
                data: data
            }
        ];
        let buffer = xlsx.build(result);
        // fs.writeFile("./resut.xls", buffer, function(err) {
        //     if (err) throw err;
        //     console.log("Write to xls has finished");
        // });
        this.ctx.attachment("菜单目录.xls");
        this.ctx.set("Content-Type", "application/octet-stream");
        return (this.ctx.body = buffer);
    }
    async download(){
        let data = [["系统编号[id]","名字[title]","链接[url]","授权关联链接(多个链接用英文逗号拼接)[link_urls]",]]
        let dir_url ='/app/public/template/menu.xlsx'
        let target = path.join(this.config.baseDir, dir_url);
        let buffer = fs.createReadStream(target);
        this.ctx.attachment("菜单模板.xls");
        this.ctx.set("Content-Type", "application/octet-stream");
        return this.ctx.body = buffer;
    }

    async import(){
        const stream = await this.ctx.getFileStream();
        let dir_url = '/app/public/upload/';
        let original = stream.filename;
        let filename = this.uuid + original.substring(original.lastIndexOf('.'));
        let target = path.join(this.config.baseDir, dir_url + filename);
        // let filedata = xlsx.parse(stream._readableState.buffer[0]);
        const result = await new Promise((resolve, reject) => {
            const remoteFileStream = fs.createWriteStream(target);
            stream.pipe(remoteFileStream);
            let errFlag;
            remoteFileStream.on('error', err => {
                errFlag = true;
                sendToWormhole(stream);
                remoteFileStream.destroy();
                reject(err);
            });
            remoteFileStream.on('finish', async () => {
                if (errFlag) return;
                resolve({ state: "SUCCESS", url: `/public/upload/${filename}`, original: original });
            });
        });
        const fileData = xlsx.parse(`${target}`);
        console.log(target);
        let data = fileData[0].data;
        // await this.ctx.service.admin.authority.dao.menuDao.importMenns(data);
        // 删除文件
        fs.unlink(`${target}`,()=>{
            console.log("删除文件回调");
        });
        if (data.length>1){
            let pamrns = data.slice(1,)
            let result = await this.ctx.service.admin.authority.menuService.importMenns(pamrns);
            return this.ctx.body = result;   
            
        }else{
            return this.ctx.body = this.st.success("没有数据")   
        }
    }
}

module.exports = MenuController;
