//建立公共机制
export default {
    formateDate(date) {
        if (!date) return '';
        return date.getFullYear() + '-' + (date.getMonth() + 1)
            + '-' + date.getDate() + ' '+date.getHours() + ':' + date.getMinutes()
            + ':'+date.getSeconds();
    }
}