/**
 * 增加过滤器
 * @param {json} app 
 */
function addFilter(app) {
    /**
     * 列出所有附件
     */
    app.nunjucks.addFilter('accessory', (urls) => {
        let test = (app.env == 'local' || app.env == 'test') ? 'test/' : '';
        let html = '';
        if (urls) {
            let us = urls.split(',');
            for (let i = 0; i < us.length; i++) {
                html += `<a href='https://wechat.oneonejl.com/${test}files` + us[i] + `' target='_blank'>附件${i + 1}</a>`;
                if (i + 1 < us.length) {
                    html += '，';
                }
            }
        }
        return html;
    });
    /**
     * 转换文件地址
     */
    app.nunjucks.addFilter('fileURL', (url) => {
        let test = (app.env == 'local' || app.env == 'test') ? 'test/' : '';
        console.log(`======= test : `, test);
        return `https://wechat.oneonejl.com/${test}files${url}`;
    });
    /**
     * 转换文件地址
     */
    app.nunjucks.addFilter('jsonString', (json) => {
        return JSON.stringify(json);
    });
    /**
     * 去除首字符<br/>
     */
    app.nunjucks.addFilter('removeFirstBr', (body) => {
        if (0 == body.indexOf("<br/>")) {
            return body.replace("<br/>", "");
        } else {
            return body;
        }
    });
    /**
     * 去除首字符<br/>
     */
    app.nunjucks.addFilter('rnToB', (body) => {
        return body.replace(/\r\n/g, "\<br/>").replace(/\n/g, "\<br/>").replace(/\r/g, "\<br/>");
    });
    /**
     * 时间格式转换，页面上使用示例代码：{{ item.create_time|dateFormat("yyyy-MM-dd hh:mm:ss") }}
     */
    app.nunjucks.addFilter('dateFormat', (obj, fmt) => {
        if (!obj) {
            return '';
        }
        var date = new Date(obj);
        var o = {
            "M+": date.getMonth() + 1,                      //月份   
            "d+": date.getDate(),                           //日   
            "h+": date.getHours(),                          //小时   
            "m+": date.getMinutes(),                        //分   
            "s+": date.getSeconds(),                        //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
            "S": date.getMilliseconds()                     //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    });
    app.nunjucks.addFilter('dateFormatAdd',(obj,fmt,d)=>{
        if (!obj) {
            return '';
        }
        var date1 =  Date.parse(obj);
        var date2 = date1+d*24*3600*1000;
        var date = new Date(date2);
        var o = {
            "M+": date.getMonth() + 1,                      //月份   
            "d+": date.getDate(),                           //日   
            "h+": date.getHours(),                          //小时   
            "m+": date.getMinutes(),                        //分   
            "s+": date.getSeconds(),                        //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
            "S": date.getMilliseconds()                     //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    })
}

exports.addFilter = addFilter;
``