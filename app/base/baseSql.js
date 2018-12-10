/**
 * 返回sql语句
 * @param {json} jsql {
        select: "id, uname",
        from: "user",
        where: "1=1",
        group: "id, uname",
        order: "id desc",
        limit: "0,10"
    }
 */
function base(jsql, page) {
    let sql = "";
    if ("string" == typeof jsql) {
        sql = jsql;
        if (page) {
            sql += " LIMIT " + page.getStart() + "," + page.row;
        }
    } else {
        if (page) {
            jsql.limit = page.getStart() + "," + page.row;
        }
        if (jsql.select) {
            sql += " SELECT " + jsql.select + " ";
        }
        if (jsql.from) {
            sql += " FROM " + jsql.from + " ";
        }
        if (jsql.where) {
            sql += " WHERE " + jsql.where + " ";
        }
        if (jsql.group) {
            sql += " GROUP BY " + jsql.group + " ";
        }
        if (jsql.order) {
            sql += " ORDER BY " + jsql.order + " ";
        }
        if (jsql.limit) {
            sql += " LIMIT " + jsql.limit + " ";
        }
    }
    return sql;
}
/**
 * 返回统计记录数SQL
 * @param {json} jsql {
        from: "user",
        where: "1=1",
        group: "id, uname"
    }
 */
function count(jsql) {
    let sql = "SELECT count(1) rowcount ";
    if ("string" == typeof jsql) {
        sql = createCountSQL(jsql);
    } else {
        if (jsql.from) {
            sql += "FROM " + jsql.from + " ";
        }
        if (jsql.where) {
            sql += "WHERE " + jsql.where + " ";
        }
        if (jsql.group) {
            sql += "GROUP BY " + jsql.group + " ";
        }
    }
    return sql;
}

/**
 * 根据查询sql组装统计总数sql
 * @param {string} querySQL 
 */
function createCountSQL(querySQL) {
    let sql = querySQL.toLowerCase().replace(/(^\s*)|(\s*$)/g, "");
    let formIndex = getCountSqlIndex(sql);
    let lastIndex = getCountSqlLastIndex(sql);
    let countSQL = 'SELECT count(1) rowcount ' + sql.substring(formIndex, lastIndex);
    return countSQL;
}

/**
 * 获得结束索引
 * @param {string} querySQL 
 */
function getCountSqlLastIndex(querySQL) {
    var arr = [];
    arr.push({ index: querySQL.lastIndexOf(' limit '), type: 'limit' });
    arr.push({ index: querySQL.lastIndexOf(' group '), type: 'group' });
    arr.push({ index: querySQL.lastIndexOf(' order '), type: 'order' });
    arr.push({ index: querySQL.lastIndexOf(' where '), type: 'where' });
    arr.push({ index: querySQL.lastIndexOf(' and '), type: 'and' });
    arr.push({ index: querySQL.lastIndexOf(' or '), type: 'or' });
    arr.push({ index: querySQL.lastIndexOf(' from '), type: 'from' });
    arr.push({ index: querySQL.lastIndexOf(' on '), type: 'on' });

    sort(arr); //排序

    let lastIndex = querySQL.length;
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if ('limit' == obj.type || 'group' == obj.type || 'order' == obj.type) {
            lastIndex = obj.index;
        }
        if ('from' == obj.type || 'where' == obj.type || 'and' == obj.type || 'or' == obj.type || 'on' == obj.type) {
            break;
        }
    }
    return lastIndex;
}
/**
 * 排序
 * @param {Array} arr 
 */
function sort(arr) {
    var len = arr.length;
    var minIndex, temp;

    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j].index > arr[minIndex].index) { //寻找最小的数
                minIndex = j; //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

/**
 * 获得FROM索引
 * @param {string} querySQL 
 */
function getCountSqlIndex(querySQL) {
    var sqls = querySQL.split('(');
    if (-1 != sqls[0].indexOf('from')) {
        return sqls[0].indexOf('from');
    } else {
        var fi = 0;
        var leftNum = 1;
        for (var i = 1; i < sqls.length; i++) {
            var ss = sqls[i].split(')');
            if (ss.length > 1) {
                if (ss.length > leftNum) {
                    var num = 0;
                    for (var j = 0; j < ss.length - 1; j++) {
                        num += ss[j].length;
                        if (j < ss.length) {
                            num += 1;
                        }
                    }
                    num += ss[ss.length - 1].indexOf('from');

                    let fromIndex = ss[ss.length - 1].indexOf('from');
                    if (-1 != fromIndex) {
                        for (var k = 0; k < i; k++) {
                            fi += sqls[k].length;
                            if (k < i) {
                                fi += 1;
                            }
                        }
                        fi += num;
                        break;
                    } else {
                        leftNum = leftNum - (ss.length - 1);
                    }
                } else {
                    leftNum = leftNum - (ss.length - 1);
                }
            } else {
                leftNum += 1;
            }
        }
        return fi;
    }
}

exports.base = base;
exports.count = count;