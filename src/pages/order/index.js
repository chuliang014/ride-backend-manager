import React, { Fragment } from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from '../../util/utils';
import BaseForm from '../../components/BaseForm';
import ETable from '../../components/ETable';

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

    formList = [
        {
            type: 'SELECT',
            label: 'City',
            field: 'city',
            placeholder: 'All',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'Beijing' }, { id: '2', name: 'Tianjin' }, { id: '3', name: 'Shenzhen' }]
        },
        {
            type: 'OrderTime',
        },
        {
            type: 'SELECT',
            label: 'Order Status',
            field: 'order_status',
            placeholder: 'All',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: 'All' }, { id: '1', name: 'Running' }, { id: '2', name: 'Ended' }]
        }
    ]

    componentDidMount() {
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/order/list', this.params);
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

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: 'Info',
                content: 'Please select one order to end'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank');
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

        return (
            <Fragment>
                <Card >
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>Order Details</Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.handleComfirm} type="primary">End Order</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                        rowSelection='checkbox'
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