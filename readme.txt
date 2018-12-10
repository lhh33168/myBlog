------------------------------------------------------
【安装项目依赖库】 
------------------------------------------------------
运行命令：
npm i

------------------------------------------------------
【启动项目】
------------------------------------------------------
1 开发环境启动
npm run dev

2 debug模式启动
    2.1 运行开启DEBUG命令：
        set DEBUG=*    //该命令会把所有插件的DEBUG日志都打印出来，如果只想打印执行的mysql语句则可以运行命令：set DEBUG=ali-rds*
    2.2 运行启动命令：
        npm run debug

-- DEBUG可以指定显示模块，多个模块用逗号分隔，例如：
DEBUG=* egg-bin debug --port 8088
DEBUG=* npm run debug
DEBUG=egg-bin:start-cluster,detect-port npm run dev




------------------------------------------------------
其他说明：
------------------------------------------------------
【安装检查代码规范插件：eslint】
1.安装插件：
npm -g install eslint
2.初始化项目：
eslint --init

【egg规范】
1. 文件名必须以小写字幕开头，不能以大写字母，数字，特殊符号等开头。


------------------------------------------------------
controller中的参数验证选项：
------------------------------------------------------
number: 检查是否是数字，有小数位也是数字。？？：这选项无效？
int: 检查是否是整数（没有小数位）。？？：这选项无效？
integer: 检查是否是整除，同int一样。？？：这选项无效？
string: 检查是否是字符串。
id: 检查是否是id（一般没有用）。
date: 检查是否是日期类型（年月日）。
dateTime: 检查是否是时间类型（年月日时分秒）。
boolean: 检查是否是布尔值（内容只有true或者false）。
array: 检查是否是数组（多条数据）。
object: 检查是否是对象（一般没有用）。
enum: 检查是否是枚举类型（一般没有用）
email: 检查是否是邮箱地址。
password: 检查是否是密码。
url: 检查是否是URL地址。
phone：检查是否是手机号码。


------------------------------------------------------
项目打包：
------------------------------------------------------
压缩：
tar -zcvf ../release.tgz --exclude=./node_modules --exclude=./.git --exclude=./logs --exclude=./run --exclude=./.vscode --exclude=./.gitignore --exclude=./.eslintrc.js --exclude=package-lock.json .

解压：
tar -xzvf ./release.tgz -C ../www/

------------------------------------------------------
框架说明：
------------------------------------------------------
app/route.js
    管理所有访问的URL地址

app/controller
    和route.js的url地址对应，设定响应处理请求的函数

app/service
    处理业务逻辑和访问数据库层面的操作。

流程图说明：
    URL请求 --> app/route.js --> app/controller --> app/service --> database --> app/service --> app/controller --> view（页面）


controller获取页面参数：
    GET请求： var paramsJSON = this.ctx.query; --> paramsJSON = { 'username':'admin', 'password':'123456' };
    POST请求： var paramsJSON = this.ctx.request.body; --> paramsJSON = { 'username':'admin', 'password':'123456' };

contoller返回页面：
    await this.ctx.render('app/view/文件夹下面的tpl页面文件', 返回页面的json参数);

页面获得参数：
    {{ 参数名 }}
    例如：app/controller的返回代码是：await this.ctx.render('app/view/index.tpl', {'code':0,'msg':'ok','data':{'username':'张三'}});
    页面上获取用户名的代码：{{data.username}} --> 张三


参数验证：
    rule：验证规则
    body：需要验证的参数（JSON）
    validateExecute：执行参数验证，验证通过，则会执行validateExecute的第三个参数设定的回调函数，如果验证失败，则不执行validateExecute的第三个参数设定的回调函数，直接返回status
    示例代码：
        let status = await this.validateExecute(rule, body, async () => {
            return {'code':0,'msg':'ok','data':{'username':'张三'}};
        });

日志：
    this.ctx.logger.debug('日志内容');
    日志会记录在/logs/jly-web/jly-web-web/log

执行SQL：
    this.app.mysql.query(SQL,参数数组);

sha256加密：
    this.crypto.sha256(需要加密的内容);

session缓存：
    只缓存在登录用户上面，登录用户自己可以获得，其他用户不可获得。代码：this.ctx.session.自定义属性名字 = 内容；
    删除：delete this.ctx.session.自定义属性名字;
    页面获取session缓存：{{ ctx.session.自定义参数 }}

页面渲染模板：Nunjucks
继承模板：{% extends "./common/base.tpl" %} 
引用模板：{% import "./common/template.tpl" as template %}

本框架UI使用：bootstrap，官网：http://www.bootcss.com/


可以利用的缓存：
cookie（浏览器存储）
session（cookie形式存储-加密），通常用户的登录信息保存在这里面，并且，有长度限制。
    设置内容：this.ctx.session.key=value;
    获取内容：this.ctx.session.key
    页面获取：{{ ctx.session.key }}
    session缓存可以装redis插件，把session里面的数据全部存到redis里面，操作session里面的数据，都是直接操作redis里面的数据。

this.ctx 当前请求有效，下个请求无效
    设置内容：this.ctx.key = value;
    获取内容：this.ctx.key;
    页面获取：{{ ctx.key }}
this.app 整个应用都有效，关闭服务后或重新启动后，无效。但是，通常情况下，无法把数据保存到this.app里面, 只能扩展this.app形式来保存内容。例如说egg-cache插件。

本框架使用了缓存插件：https://github.com/hexindai/egg-cache
    因页面不能直接获取app，因此页面无法直接获取egg-cache里面的缓存数据，只能在渲染页面之前，把缓存数据一起带到页面，或后期通过ajax的形式获取。



计划任务：
    在app/schedule文件夹下（没有就创建该文件夹），新建js，示例代码如下：
        const Subscription = require('egg').Subscription;

        class cacheJob extends Subscription {
            static get schedule() {
                return {
                    immediate: true,
                    // interval: '1s', // 1 分钟间隔
                    cron: '0 0 2 * * *', //每天凌晨2点钟执行
                    type: 'worker', // worker：每台机器上只有一个 worker 会执行这个定时任务。all: 指定所有的 worker 都需要执行
                };
            }

            async subscribe() {
                const data = await this.ctx.service.admin.dictionaryService.getData();
                this.app.cache.set('dictionary', data);
            }
        }

        module.exports = cacheJob;

js图表：http://echarts.baidu.com/
树菜单：https://www.cnblogs.com/tangzeqi/p/8021637.html