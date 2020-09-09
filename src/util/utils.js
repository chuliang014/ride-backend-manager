import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;

//建立公共机制
export default {
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
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
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`;
            },
            showQuickJumper: true
        }
        return page;
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
        });
        return options;
    }
}