import React, { Fragment } from 'react';
import { Card, Table } from 'antd';
import axios from '../../axios/index';

export default class BasicTable extends React.Component {
    state = {
        dataSource2: []
    }

    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                username: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '5361 QUail Run Rd',
                time: '09:00'
            },
            {
                id: '1',
                username: 'Tome',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '5361 QUail Run Rd',
                time: '09:00'
            },
            {
                id: '2',
                username: 'Vincent',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '5361 QUail Run Rd',
                time: '09:00'
            }
        ]
        this.setState({
            dataSource
        });
        this.request();
    }

    request = () => {

        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                },
                isShowLoading: false
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    dataSource2: res.result.list
                });
            }
        }, (res) => {
            console.log("请求失败");
        });
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
        return (
            <Fragment>
                <Card title="基础表格" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </Fragment>
        )
    };
}