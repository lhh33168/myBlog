/**
 * 增加验证规则
 * @param {json} app 
 */
function addRule(app) {
    /**
     * 验证是否json格式
     */
    app.validator.addRule('json', (rule, value) => {
        try {
            JSON.parse(value);
        } catch (err) {
            return '必须是json格式';
        }
    });
    /**
     * 手机号码验证
     */
    app.validator.addRule('phone', (rule, value) => {
        if (!/^1[0-9]{10}$/.test(value)) {
            return '手机号码错误';
        }
    });
}

exports.addRule = addRule;
