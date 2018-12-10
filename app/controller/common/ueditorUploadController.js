const Controller = require('../../base/baseController');
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

/**
 * 文件上传
 */
class ueditorUploadController extends Controller {

    async upload() {
        var body = this.ctx.request.query;

        let dirPath = this.config.baseDir + '/app/public/upload/';
        fs.exists(dirPath, function (exists) {
            if (!exists) {
                fs.mkdirSync(dirPath);
            }
        });

        if (body.action === 'uploadimage') { // 上传图片处理
            let dir_url = '/app/public/upload/';

            const stream = await this.ctx.getFileStream();

            let original = stream.filename;
            let filename = this.uuid + original.substring(original.lastIndexOf('.'));

            let target = path.join(this.config.baseDir, dir_url + filename);
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

            this.ctx.set('Content-Type', 'text/html');
            this.ctx.body = JSON.stringify(result);

        } else if (body.action === 'listimage') {//  查找图片列表

            let list_dir = '/public/upload/';
            let i = 0;
            let list = [];
            const ctx = this.ctx;

            let dirPath = this.config.baseDir + '/app' + list_dir;

            fs.readdir(dirPath, function (err, files) {
                if (err) throw err;

                let total = files.length;
                files.forEach(function (file) {

                    let filetype = 'jpg,png,gif,ico,bmp';
                    let tmplist = file.split('.');
                    let _filetype = tmplist[tmplist.length - 1];
                    if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
                        let temp = {};
                        if (list_dir === '/') {
                            temp.url = list_dir + file;
                        } else {
                            temp.url = list_dir + "/" + file;
                        }
                        list[i] = (temp);
                    } else { }
                    i++;
                    // send file name string when all files was processed
                    if (i === total) {
                        ctx.set('Content-Type', 'text/html');
                        ctx.body = JSON.stringify({
                            "state": "SUCCESS",
                            "list": list,
                            "start": 1,
                            "total": total
                        });
                    }
                });
            });

        } else {// 其他请求
            this.ctx.set('Content-Type', 'application/json');
            this.ctx.redirect('/public/lib/ueditor/nodejs/ueditor.config.json');
        }

    }

}

module.exports = ueditorUploadController;