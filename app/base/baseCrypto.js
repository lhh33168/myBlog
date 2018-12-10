//首先引入crypto模块进项目中；
const crypto = require('crypto');
//随手写一段明文字符串，保存到常量secret中。
const secret = 'Jly4ihb02ka';

/**
 * sha256加密
 * @param {*} str 
 */
function sha256(str) {
    return crypto.createHmac('sha256', secret).update(str).digest('hex');
}

exports.sha256 = sha256;