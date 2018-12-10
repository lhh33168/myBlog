/**
 * 返回操作状态 
 * @param {int} code 0-操作成功；1-操作失败；2-验证失败；
 * @param {string} message 提示消息
 * @param {json} data 附加数据
 */
function base(code, message, data) {
    return {
        code: code,
        message: message || '',
        data: data || ''
    }
}
/**
 * 返回成功status
 * @param {string} message 
 * @param {json} data 
 */
function success(message, data) {
    return this.base(0, message, data);
}
/**
 * 返回错误status
 * @param {string} message 
 * @param {json} data 
 */
function error(message, data) {
    return this.base(1, message, data);
}
/**
 * 返回验证错误status
 * @param {string} message 
 * @param {json} data 
 */
function validateError(message, data) {
    return this.base(2, message, data);
}

exports.base = base;
exports.success = success;
exports.error = error;
exports.validateError = validateError;