import React, { Fragment } from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';
import axios from '../../axios/index';
import utils from '../../util/utils';
export default class HighTable extends React.Component {
    state = {}
    params = {
        page: 1
    }

    componentDidMount() {
        this.request();
    }
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                },
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                });
                this.setState({
                    dataSource: res.result.list,
                });
            }
        }, (res) => {
            console.log("请求失败");
        });
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        });
    }

    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: 'Confirm',
            content: '您确定要删除此条数据吗？',
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: 'UserName',
                dataIndex: 'username'
            },
            {
                title: 'Gender',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Michael',
                        '2': 'Vincent',
                        '3': 'Garrison',
                        '4': "Alex",
                        '5': 'Tom'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': 'Swimming',
                        '2': 'Basketball',
                        '3': 'Footer',
                        '4': "Running",
                        '5': 'Climbing',
                        '6': 'Riding',
                        '7': 'Badminton',
                        '8': 'VolleyBall'
                    }
                    return config[interest];
                }
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Addresss',
                dataIndex: 'address'
            },
            {
                title: 'AwakeTime',
                dataIndex: 'time'
            },
        ];
        const columns2 = [
            {
                title: 'id',
                fixed: 'left',
                dataIndex: 'id'
            },
            {
                title: 'UserName',
                fixed: 'left',
                dataIndex: 'username'
            },
            {
                title: 'Gender',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Michael',
                        '2': 'Vincent',
                        '3': 'Garrison',
                        '4': "Alex",
                        '5': 'Tom'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': 'Swimming',
                        '2': 'Basketball',
                        '3': 'Footer',
                        '4': "Running",
                        '5': 'Climbing',
                        '6': 'Riding',
                        '7': 'Badminton',
                        '8': 'VolleyBall'
                    }
                    return config[interest];
                }
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Addresss',
                dataIndex: 'address'
            },
            {
                title: 'AwakeTime',
                fixed: 'right',
                dataIndex: 'time'
            },
        ];
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: 'UserName',
                dataIndex: 'username'
            },
            {
                title: 'Gender',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Michael',
                        '2': 'Vincent',
                        '3': 'Garrison',
                        '4': "Alex",
                        '5': 'Tom'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': 'Swimming',
                        '2': 'Basketball',
                        '3': 'Footer',
                        '4': "Running",
                        '5': 'Climbing',
                        '6': 'Riding',
                        '7': 'Badminton',
                        '8': 'VolleyBall'
                    }
                    return config[interest];
                }
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Addresss',
                dataIndex: 'address'
            },
            {
                title: 'AwakeTime',
                dataIndex: 'time'
            },
        ];
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: 'UserName',
                dataIndex: 'username'
            },
            {
                title: 'Gender',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': 'Michael',
                        '2': 'Vincent',
                        '3': 'Garrison',
                        '4': "Alex",
                        '5': 'Tom'
                    }
                    return config[state];
                }
            },
            {
                title: 'Hobby',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': <Badge status="success" text="Swimming" />,
                        '2': <Badge status="error" text='Basketball' />,
                        '3': <Badge status="default" text='Football' />,
                        '4': <Badge status="processing" text='Running' />,
                        '5': <Badge status="warning" text='Climbing' />,
                    }
                    return config[interest];
                }
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'Addresss',
                dataIndex: 'address'
            },
            {
                title: '操作',
                render: (text, item) => {
                    return (<Button size="small" onClick={(item) => { this.handleDelete(item) }}>删除</Button>)
                }
            },
        ];
        return (
            <Fragment>
                <Card title="头部固定" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左侧固定" className="card-wrap">
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 2000 }}
                    />
                </Card>
                <Card title="表格排序" className="card-wrap">
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" className="card-wrap">
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
            </Fragment>
        );
    }
}