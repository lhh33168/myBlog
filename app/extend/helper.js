module.exports = {
    /**
     * 时间格式化
     * @param {*} d 
     * @param {*} fmt 
     */
    dateFormat(d, fmt) {
        var date = new Date(d);
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
    },
    /**
     * 比较两个时间，如果开始时间小于结束时间则返回true，否则返回false
     * @param {*} startDate 
     * @param {*} endDate 
     */
    compareDate(startDate, endDate) {
        var d1 = typeof (startDate) == 'string' ? new Date(startDate.replace(/\-/g, "\/")) : startDate;
        var d2 = typeof (endDate) == 'string' ? new Date(endDate.replace(/\-/g, "\/")) : endDate;
        return d1 < d2;
    },
    /**
     * 将字符串转换成日期类型
     * @param {*} dataStr 
     */
    strToDate(dataStr){
        return typeof (dataStr) == 'string' ? new Date(dataStr.replace(/\-/g, "\/")) : dataStr;
    },
    /**
     * 根据出生日期计算年龄(yyyy-MM-dd)
     * @param {*} birthday 出生日期
     */
    getBrithAge(birthday) {
        var nowDay = new Date();
        //出生年月日
        var birthYear = birthday.getFullYear();
        var birthMonth = birthday.getMonth() + 1;
        var birthDate = birthday.getDate();
        //当前年月日
        var nowYear = nowDay.getFullYear();
        var nowMonth = nowDay.getMonth() + 1;
        var nowDate = nowDay.getDate();

        //计算年差
        var age = nowYear - birthYear;
        //当前月大于出生月，则岁数不足
        if (nowMonth < birthMonth) {
            age = age - 1;
        } else if (nowMonth == birthMonth) {
            if (nowDate < birthDate) {
                age = age - 1;
            }
        }

        return age;
    },
    /**
     * 时间增加天数
     * @param {*} d 
     * @param {*} n 
     */
    dateAdd(d, n) {
        let d2 = typeof (d) == 'string' ? new Date(d.replace(/\-/g, "\/")) : d;
        return new Date(d2.setDate(d2.getDate() + n));
    },
    /**
     * 时间增加小时
     * @param {*} h 
     * @param {*} n 
     */
    dateAddHour(h, n) {
        let d2 = typeof (h) == 'string' ? new Date(h.replace(/\-/g, "\/")) : h;
        return new Date(d2.setHours(d2.getHours() + n));
    },
    /**
     * 时间增加分钟
     * @param {*} m 
     * @param {*} n 
     */
    dateAddMinutes(m, n) {
        let d2 = typeof (m) == 'string' ? new Date(m.replace(/\-/g, "\/")) : m;
        return new Date(d2.setMinutes(d2.getMinutes() + n));
    },
    /**
     * 补全开始时间
     * @param {*} date 
     * @param {*} type 1-补：23:59:59；其他-补：00:00:00
     */
    dateComplement(date, type) {
        return (date.length == 'yyyy-MM-dd'.length) ? (date + ' ' + (1 == type ? '23:59:59' : '00:00:00')) : date;
    },
    /**
     * 下划线转驼峰
     * @param {*} name 
     */
    strToHump(name) {
        return name.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    },
    /**
     * 驼峰转换下划线
     * @param {*} name 
     */
    strToLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    },
    
    /**
     * 字典类型转换
     * @param {*} type  
     * @param {*} val 
     */
    dictFormat(val,type){
        console.log(type);
        for (let i=0;i<dataDict.length;i++){
            if(dataDict[i].dict_type==type&&dataDict[i].code_value == val){
                return dataDict[i].code_desc 
            }
        }
    }

};