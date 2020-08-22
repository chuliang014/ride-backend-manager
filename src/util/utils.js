//建立公共机制
export default {
    formateDate(date) {
        if (!date) return '';
        return date.getFullYear() + '-' + (date.getMonth() + 1)
            + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
            + ':' + date.getSeconds();
    },
    // 分页封装
    pagination(data, callback) {
        let page = {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`;
            },
            showQuickJumper: true
        }
        return page;
    }
}