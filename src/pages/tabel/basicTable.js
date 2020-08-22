import React, { Fragment } from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios/index';
import utils from '../../util/utils';

export default class BasicTable extends React.Component {
    state = {
        dataSource2: []
    }

    params = {
        page: 1
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
        dataSource.map((item, index) => {
            item.key = index;
        })
        this.setState({
            dataSource
        });
        this.request();
    }

    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
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
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: utils.pagination(res, (current) => {
                        //to-do
                        _this.params.page = current;
                        this.request();
                    })
                });
            }
        }, (res) => {
            console.log("请求失败");
        });
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: 'Info',
            content: `Username:${record.username}, hobby: ${record.interest}`
        });
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        });
    }

    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id)
        });
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗? ${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
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
        const selectedRowKeys = this.state.selectedRowKeys;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                // let ids = [];
                // selectedRows.map((item) => {
                //     ids.push(item.id);
                // });
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });
            }
        }
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
                <Card title="Mock-单选" className="card-wrap">
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => { this.onRowClick(record, index) }, // 点击行
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-复选" className="card-wrap">
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-分页" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </Fragment>
        )
    };
}