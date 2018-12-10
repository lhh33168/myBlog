exports.keys = 'blog-5267435154';
exports.cluster = {
    listen: {
        port: 8080
    }
};

// 添加MySQL配置
exports.mysql = {
    clients: {
        authority: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '',
            // 数据库名
            database: 'blog'
        },
    },
    // 所有数据库配置的默认值
    default: {

    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};

// 设置日志记录级别
exports.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG'
};


