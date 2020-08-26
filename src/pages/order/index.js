import React, { Fragment } from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from '../../util/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {

    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        })
            .then((res) => {
                let list = res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    list,
                    pagination: Utils.pagination(res, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                });

            });
    }

    handleComfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: 'Info',
                content: 'Please select one order to end'
            })
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderConfirmVisble: true,
                    orderInfo: res.result
                });
            }
        });
    }

    //end order when ok
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('order ended successfully');
                this.setState({
                    orderConfirmVisble: false,
                });
                this.requestList();
            }
        });
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        });
    }

    render() {

        const columns = [
            {
                title: 'OrderId',
                dataIndex: 'order_sn'
            },
            {
                title: 'BikeId',
                dataIndex: 'bike_sn'
            },
            {
                title: 'Username',
                dataIndex: 'user_name',
            },
            {
                title: 'TelePhone',
                dataIndex: 'mobile',
            },
            {
                title: 'Distance',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'KM';
                }
            },
            {
                title: 'Total Time',
                dataIndex: 'total_time',
            },
            {
                title: 'Status',
                dataIndex: 'status'
            },
            {
                title: 'Start Time',
                dataIndex: 'start_time',
            },
            {
                title: 'End Time',
                dataIndex: 'end_time'
            },
            {
                title: 'Fee',
                dataIndex: 'total_fee'
            },
            {
                title: 'Actual Fee',
                dataIndex: 'user_pay'
            },
        ];

        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        }

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        return (
            <Fragment>
                <Card >
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary">Order Details</Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.handleComfirm} type="primary">End Order</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            }
                        }}
                    />
                </div>
                <Modal
                    title="End Order"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        });
                    }}
                    onOk={this.handleFinishOrder}
                >
                    <Form layout="horizontal">
                        <FormItem label="BikeID" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="Remaining Battery" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="Start Time" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="Current Location" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

class FilterForm extends React.Component {

    render() {

        const { getFieldDecorator } = this.props.form;

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
                    label="Order Time"
                >
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem
                    label="~"
                >
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                {/* op_mode */}
                <FormItem
                    label="Order Status"
                >
                    {
                        getFieldDecorator("order_status")(
                            <Select
                                placeholder="All"
                                style={{ width: 100 }}
                            >
                                <Option value="">All</Option>
                                <Option value="1">Running</Option>
                                <Option value="2">Ended</Option>
                            </Select>
                        )
                    }
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
FilterForm = Form.create({})(FilterForm);