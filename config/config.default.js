exports.keys = 'www.oneonejl.com-5267435154';
//延长session失效时间
exports.middleware = ['saveSession', 'checkLogin'];
// 添加 view 配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};
// 调整参数大小限制
exports.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb'
};
// 设置日志记录级别
exports.logger = {
    level: 'INFO',
    consoleLevel: 'INFO',
};
// 设置缓存
exports.cache = {
    default: 'memory',
    stores: {
        memory: {
            driver: 'memory',
            max: 100,
            ttl: 0,
        },
    },
};
exports.multipart = {
    fileExtensions: ['.doc', '.docx', ".pdf", '.csv', '.xlsx', '.xls'],//对上传文件后缀扩张
};
// 权限配置
exports.authority = {
    //排除的path
    excludes: ['/admin/authority/getMenu', '/admin/authority/version/list', '/admin/main/switchsys']
}
// csrf验证
exports.security = {
    csrf: {
        enable: true
    }
}