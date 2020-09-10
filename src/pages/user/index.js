import React, { Fragment } from 'react';
import { Card, Button, DatePicker, Modal, Form, Input, Radio, Select } from 'antd';
import axios from '../../axios';
import Utils from '../../util/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/BaseForm';
import RadioGroup from 'antd/lib/radio/group';
import TextArea from 'antd/lib/input/TextArea';

const FormItem = Form.Item;
const Option = Select.Option;

export default class User extends React.Component {

    params = {
        page: 1
    }

    state = {
        isVisible: false
    }

    formList = [
        {
            type: 'INPUT',
            label: 'UserName',
            field: 'user_name',
            placeholder: 'Please enter username',
            width: 100,
        },
        {
            type: 'INPUT',
            label: 'Phone',
            field: 'user_mobile',
            placeholder: 'Please enter phone number',
            width: 100,
        },
        {
            type: 'DATE',
            label: 'Enrollment Date',
            field: 'user_date',
            placeholder: 'Please enter date',
            width: 80,
        },
    ]

    componentDidMount() {
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/table/list1', this.params);
    }

    handleOperate = (type) => {
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: 'Create'
            })
        }
    }

    //create
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/user/add',
            data: {
                params: data
            }
        }).then(res => {
            if (res.code == 0) {
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: 'Username',
                dataIndex: 'userName',
            },
            {
                title: 'Gender',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Status',
                dataIndex: 'state',
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                title: 'WakeUpTime',
                dataIndex: 'time',
            },
        ]
        return (
            <Fragment>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>Create</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>Edit</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>Detail</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>Delete</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedItem={this.state.selectedItem}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                >
                    <UserForm type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst} />
                </Modal>
            </Fragment>
        );
    }
}

class UserForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="Username" {...formItemLayout}>
                    {
                        getFieldDecorator('user_name')(
                            <Input type="text" placeholder="Please enter username" />
                        )
                    }
                </FormItem>
                <FormItem label="Sex" {...formItemLayout}>
                    {
                        getFieldDecorator('sex')(
                            <RadioGroup>
                                <Radio value={1}>Male</Radio>
                                <Radio value={2}>Female</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="Status" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                                <Option value={5}>5</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Birthday" {...formItemLayout}>
                    {
                        getFieldDecorator('birthday')(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="Address" {...formItemLayout}>
                    {
                        getFieldDecorator('address')(
                            <TextArea rows={3} placeholder="please enter address" />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm)