import React, { Fragment } from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, message, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class FormRegister extends React.Component {
    state = {
        loading: false
    }


    onFinish = (values) => {
        let userInfo = values;
        console.log(userInfo);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            },
        }

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    //向右偏移4列
                    offset: 4
                }
            }
        }
        const rowObject = {
            minRows: 4,
            maxRows: 6
        }

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { imageUrl } = this.state;
        return (
            <Fragment>
                <Card title="注册表单" className="card-wrap">
                    <Form
                        layout="horizontal"
                        initialValues={{
                            age: 18,
                            currentstatus: '1',
                            marry: true,
                            birthday: moment('2018-08-08'),
                            address: "5361 Quail Run Rd"
                        }}
                        onFinish={this.onFinish}

                    >
                        <FormItem
                            {...formItemLayout}
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required'
                                }
                            ]}
                        >
                            <Input placeholder="Please enter username" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                }
                            ]}
                        >
                            <Input type="password" placeholder="please enter password" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Gender"
                            name="gender"

                        >
                            <Radio.Group>
                                <Radio value='1'>Male</Radio>
                                <Radio value='2'>Female</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Age"
                            name="age"

                        >
                            <InputNumber />
                        </FormItem>
                        {/* Select */}
                        <FormItem
                            {...formItemLayout}
                            label="CurrentStatus"
                            name="currentstatus"

                        >
                            <Select>
                                <Select.Option value="1">one</Select.Option>
                                <Select.Option value="2">two</Select.Option>
                                <Select.Option value="3">three</Select.Option>
                                <Select.Option value="4">four</Select.Option>
                                <Select.Option value="5">five</Select.Option>
                            </Select>
                        </FormItem>
                        {/* Multiple selection */}
                        <FormItem
                            {...formItemLayout}
                            label="Hobby"
                            name="hobbby"
                        >
                            <Select mode="multiple" defaultValue={['1', '2', '3']}>
                                <Select.Option value="1">Swimming</Select.Option>
                                <Select.Option value="2">Basketball</Select.Option>
                                <Select.Option value="3">Footbal</Select.Option>
                                <Select.Option value="4">Running</Select.Option>
                                <Select.Option value="5">Riding</Select.Option>
                            </Select>
                        </FormItem>
                        {/* Switch */}
                        <FormItem
                            {...formItemLayout}
                            label="Married"
                            name="marry"
                            valuePropName="checked"
                        >
                            <Switch />
                        </FormItem>
                        {/* DatePicker */}
                        <FormItem
                            {...formItemLayout}
                            label="Birthday"
                            name="birthday"
                        >
                            <DatePicker />
                        </FormItem>
                        {/* TextArea */}
                        <FormItem
                            {...formItemLayout}
                            label="Address"
                            name="address"
                        >
                            <TextArea autoSize={rowObject} />
                        </FormItem>
                        {/* TimePicker */}
                        <FormItem
                            {...formItemLayout}
                            label="Time"
                            name="time"
                        >
                            <TimePicker defaultValue={moment('12:09:08', 'HH:mm:ss')} />
                        </FormItem>
                        {/* Upload */}
                        <FormItem
                            {...formItemLayout}
                            label="UserImg"
                            name="userimg"
                        >
                            <Upload
                                listType="picture-card"
                                showUploadList={false}
                                onChange={this.handleChange}
                                beforeUpload={this.beforeUpload}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </FormItem>
                        {/*  */}
                        <FormItem
                            {...offsetLayout}
                            name="agreement"
                        >
                            <Checkbox>我已阅读过协议</Checkbox>
                        </FormItem>
                        {/*  */}
                        <FormItem
                            {...offsetLayout}
                        >
                            <Button type="primary" htmlType="submit">Sign Up</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}