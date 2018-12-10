/**
 * 分页对象
 * @param {int} page 当前访问页码
 * @param {int} row 每页显示记录数
 */
function Page(page, row) {
    this.page = page || 1;
    this.row = row || 10;
    this.pageCount = 0;
    this.rowCount = 0;
    this.start = (page - 1) * row;
    this.setPage = function (page) {
        this.page = (page && 0 < page) ? page : 1;
    }
    this.setRow = function (row) {
        this.row = (row && 0 < row) ? row : 10;
    }
    this.setRowCount = function (count) {
        if (count && 0 < count) {
            this.rowCount = count;
            this.pageCount = Math.ceil(count / this.row);
        } else {
            this.rowCount = 0;
            this.pageCount = 0;
        }
        if (this.page * 1 > this.pageCount) { //防止超出页码
            this.page = 1;
        }
    }
    this.getStart = function () {
        return (this.page - 1) * this.row;
    }
    this.build = function (data) {
        return {
            page: this.page,
            row: this.row,
            pageCount: this.pageCount,
            rowCount: this.rowCount,
            data: data
        };
    }
}

module.exports = Page;
