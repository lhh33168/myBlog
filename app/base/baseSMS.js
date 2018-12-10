const SMSClient = require('@alicloud/sms-sdk');
module.exports = function (config) {
    this.config = config;
    this.smsClient;

    /**
     * 发送短信
     * @param {*} params
     * @param {*} callback 
     */
    this.sendSMS = async function (params) {
        let checkStatus = this.checkParams(params); //配置参数检查，并过滤被排除的手机号码
        if (0 == checkStatus.code) {
            try {
                let result = await new Promise((resolve, reject) => {

                    this.smsClient.sendSMS({
                        PhoneNumbers: params.phones.truePhones.join(','),             //必填: 待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码, 批量调用相对于单条调用及时性稍有延迟, 验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为00+国际区号+号码，如“0085200000000”
                        SignName: params.signName,                  //必填: 短信签名 - 可在短信控制台中找到
                        TemplateCode: params.TemplateCode,            //必填: 短信模板 - 可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
                        TemplateParam: params.TemplateParam       //可选: 模板中的变量替换JSON串, 如模板内容为"亲爱的${name},您的验证码为${code}"时。
                    }).then(function (res) {
                        resolve(res)
                    }, function (err) {
                        reject(err);
                    });
                    
                });
                result.params = params; //追加参数返回
                return { code: 0, message: '发送成功！', data: result };
            } catch (error) {
                return { code: 1, message: '发送短信失败！', data: error };
            }
        } else {
            return checkStatus;
        }
    }
    /**
     * 配置参数检查，并过滤被排除的手机号码
     */
    this.checkParams = function (params) {
        if (!this.config.enable) {
            return { code: 2, message: '短信功能未开启', data: params };
        } else {
            if (!params) {
                return { code: 3, message: '短信参数异常', data: params };
            } else {
                if (!params.signName) {
                    return { code: 4, message: '未指定短信签名', data: params };
                } else if (!params.TemplateCode) {
                    return { code: 5, message: '未指定短信模板', data: params };
                } else if (!params.PhoneNumbers) {
                    return { code: 6, message: '未指定手机号码', data: params };
                } else {
                    params.phones = this.excludePhones(params.PhoneNumbers, params.excludePhones); //追加筛选过的手机号码组，得到数据内容：{ truePhones: '需要发送短信的手机号码', falsePhones: '被排除的手机号码' }
                    if (params.phones.truePhones.length == 0) {
                        return { code: 7, message: '手机号码被排除，没有需发送短信的手机号码', data: params };
                    } else {

                        if (!this.smsClient) { //检查短信客户端是否已初始化
                            const accessKeyId = this.config.accessKeyId;
                            const secretAccessKey = this.config.secretAccessKey;
                            this.smsClient = new SMSClient({ accessKeyId, secretAccessKey }); //初始化sms_client
                        }

                        return { code: 0, message: '参数检验通过', data: params };
                    }
                }
            }
        }
    }
    /**
     * 移除被排除的手机号码
     * @param {*} phoneNumbers 
     */
    this.excludePhones = function (phoneNumbers, excludePhones) {
        let exc = this.config.enableConfigExcludePhones ? this.config.excludePhones : excludePhones.split(','); //手机号码黑名单清单
        let truePhones = []; //正常的手机号码
        let falsePhones = []; //排除的手机号码

        if (exc && exc.length > 0) {
            let arr = phoneNumbers.split(',');

            for (let i = 0, len = arr.length; i < len; i++) {
                let phone = arr[i];

                let isExc = false;
                for (let j = 0, excLen = exc.length; j < excLen; j++) {
                    if (phone == exc[j]) {
                        isExc = true;
                        falsePhones.push(phone); //记录被排除的手机号码
                        break;
                    }
                }
                if (!isExc) {
                    truePhones.push(phone);
                }
            }
        }
        return { truePhones: truePhones, falsePhones: falsePhones };
    }

};
