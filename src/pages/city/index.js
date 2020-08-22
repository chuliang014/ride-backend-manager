import React, { Fragment } from 'react';
import { Card, Button, Table, Form, Select } from 'antd';
import axios from './../../axios/index';
import Utils from '../../util/utils';


const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {

    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList();
    }

    //request data
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            });
        });
    }

    // openCity
    handleOpenCity = () => {

    }

    render() {

        const columns = [
            {
                title: 'CityId',
                dataIndex: 'id'
            },
            {
                title: 'City',
                dataIndex: 'name'
            },
            {
                title: 'Car Mode',
                dataIndex: 'mode'
            },
            {
                title: 'Opeartion Mode',
                dataIndex: 'op_mode'
            },
            {
                title: 'Franchise',
                dataIndex: 'franchisee_name'
            },
            {
                title: 'Administrator',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: 'City Open Time',
                dataIndex: 'open_time'
            },
            {
                title: 'OperationTime',
                dataIndex: 'update_time'
            },
            {
                title: 'Operator',
                dataIndex: 'sys_user_name'
            },
        ];


        return (
            <Fragment>
                <Card className="card-wrap">
                    <FilterForm />
                </Card>
                <Card className="card-wrap">
                    <Button type="primary" onClick={this.handleOpenCity} style={{ marginBottom: 10 }}>OpenCity</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>

            </Fragment>
        );
    }
}

class FilterForm extends React.Component {

    render() {
        return (
            <Form layout="inline">
                {/* city */}
                <FormItem
                    label="City"
                    name="city_id"
                >
                    <Select
                        placeholder="All"
                        style={{ width: 100 }}
                    >
                        <Option value="">All</Option>
                        <Option value="1">Beijing</Option>
                        <Option value="2">Tianjin</Option>
                        <Option value="3">Shenzhen</Option>
                    </Select>
                </FormItem>
                {/* mode */}
                <FormItem
                    label="Mode"
                    name="city_id"
                >
                    <Select
                        placeholder="All"
                        style={{ width: 140 }}
                    >
                        <Option value="">All</Option>
                        <Option value="1">Designated Mode</Option>
                        <Option value="2">Forbidden Mode</Option>
                    </Select>
                </FormItem>
                {/* op_mode */}
                <FormItem
                    label="Operation"
                    name="op_mode"
                >
                    <Select
                        placeholder="All"
                        style={{ width: 125 }}
                    >
                        <Option value="">All</Option>
                        <Option value="1">Self-operated</Option>
                        <Option value="2">Franchise</Option>
                    </Select>
                </FormItem>
                {/* Franchise Status */}
                <FormItem
                    label="Franchise Status"
                    name="auth_status"
                >
                    <Select
                        placeholder="All"
                        style={{ width: 125 }}
                    >
                        <Option value="">All</Option>
                        <Option value="1">Franchised</Option>
                        <Option value="2">Not Franchised</Option>
                    </Select>
                </FormItem>
                {/* Button */}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>Search</Button>
                    <Button>Reset</Button>

                </FormItem>
            </Form>
        );
    }
}