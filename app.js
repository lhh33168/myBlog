const baseRule = require('./app/base/baseRule');
const baseFilter = require('./app/base/baseFilter');

module.exports = app => {
    baseRule.addRule(app); //增加验证规则
    baseFilter.addFilter(app); //增加过滤器
};


