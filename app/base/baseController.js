const { Controller } = require('egg');
const baseStatus = require('./baseStatus');
const basePage = require('./basePage');
const baseSql = require('./baseSql');
const baseCrypto = require('./baseCrypto');
const uuid = require('node-uuid');
var sms;

class BaseController extends Controller {
    /**
     * 获取登录用户
     */
    get user() {
        return this.ctx.session.user;
    }
    /**
     * 获取状态组件
     */
    get st() {
        return baseStatus;
    }
    /**
     * 获得uuid
     */
    get uuid() {
        return uuid.v4().replace(new RegExp('-', "g"), '');
    }
    /**
     * 获取sql组件
     */
    get sql() {
        return baseSql;
    }

    /**
     * 聘得易数据源
     */
    get pdyDB() {
        return this.app.mysql.get('pdy');
    }
    /**
     * 精英易数据源
     */
    get jyyDB() {
        return this.app.mysql.get('jyy');
    }
    /**
     * 权限管理数据源
     */
    get authorityDB() {
        return this.app.mysql.get('authority');
    }
    /**
     * 短信服务数据源
     */
    get smsDB() {
        return this.app.mysql.get('sms');
    }

    /**
     * 获取crypto组件
     */
    get crypto() {
        return baseCrypto;
    }

    /**
     * 返回参数验证status
     * @param {json} rule 
     * @param {json} data 
     */
    validate(rule, data) {
        const result = this.app.validator.validate(rule, data);
        if (result) {
            let errors = {};
            let length = result.length;
            for (let i = 0; i < length; i++) {
                errors[result[i].field] = this.replaceMessage(rule[result[i].field], result[i].message);
            }
            this.ctx.logger.debug('验证错误: ', errors);
            data.errors = errors;
            return this.st.validateError('', data);
        } else {
            return this.st.success('', data);
        }
    }
    /**
     * 转换验证错误提示信息
     * @param {json} rule 规则
     * @param {string} message 消息
     */
    replaceMessage(rule, message) {
        if ('number' == rule.type) {
            message = message.replace('should be a number', '必须是数字')
                .replace('should smaller than', '必须小于')
                .replace('should bigger than', '必须大于');
        } else if ('int' == rule.type || 'integer' == rule.type) {
            message = message.replace('should be an integer', '必须是整数')
                .replace('should smaller than', '必须小于')
                .replace('should bigger than', '必须大于');
        } else if ('boolean' == rule.type || 'bool' == rule.type) {
            message = message.replace('should be an boolean', '必须是boolean');
        } else if ('array' == rule.type) {
            message = message.replace('should be an array', '必须是array');
        } else if ('object' == rule.type) {
            message = message.replace('should be an object', '必须是object');
        } else if ('enum' == rule.type) {
            message = message.replace('check enum need array type values', '需要先在规则中设置所有枚举值')
                .replace('should be one of', '需要选择其中一个：');
        } else if ('email' == rule.type) {
            message = message.replace('should be an email', '邮箱格式错误');
        } else if ('url' == rule.type) {
            message = message.replace('should be a url', 'URL地址格式错误');
        } else if ('password' == rule.type) {
            message = message.replace(`should equal to ${rule.compare}`, '必须内容一致');
        }
        message = message.replace('should be a string', '必须是字符串')
            .replace('should not be empty', '不能为空')
            .replace('length should smaller than', '长度必须小于')
            .replace('length should bigger than', '长度必须大于')
            .replace('should match', '格式错误')
            .replace('required', '必须填写');
        return '【 提示 】：' + message;
    }
    /**
     * 参数验证并执行函数，如果参数验证不通过，则不会执行函数，直接返回参数错误status
     * @param {json} rule 
     * @param {json} data 
     * @param {function} fn 
     */
    async validateExecute(rule, data, fn) {
        let status = this.validate(rule, data);
        if ('0' == status.code && typeof (eval(fn)) == "function") {
            status = await fn(status);
        }
        return status;
    }

    /**
     * 查询数据
     * @param {string} jsql 
     * @param {array} params 
     * @param {json} body 
     */
    async dbSelect(jsql, params, body, db) {
        const dbSource = db || this.app.mysql;
        let page = null;
        if (body && (body.page || body.row)) {
            page = new basePage(body.page, body.row);
            const countResult = await dbSource.query(this.sql.count(jsql), params);
            page.setRowCount(countResult[0].rowcount);
        }
        const result = await dbSource.query(this.sql.base(jsql, page), params);
        return page ? page.build(result) : result;
    }
}

module.exports = BaseController;