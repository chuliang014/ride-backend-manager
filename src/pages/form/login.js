import React, { Fragment } from 'react';
import { Card, Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const FormItem = Form.Item;

export default class FormLogin extends React.Component {

    onFinish = (values) => {
        let userInfo = values;
        if (userInfo.username && userInfo.password) {
            message.success(`${userInfo.username}恭喜你，登录成功,当前密码为${userInfo.password}`);
        }
    }

    render() {
        return (
            <Fragment>
                <Card title="登录行内表单" className="card-wrap">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" >登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="card-wrap">
                    <Form
                        style={{ width: 300 }}
                        onFinish={this.onFinish}
                        // checkbox 默认选中要在Form设置initialValues,并且子组件上要valuePropName="checked"
                        initialValues={{ remember: true }}
                    >

                        <FormItem
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Username is required'
                                },
                                {
                                    min: 5,
                                    max: 10,
                                    message: '长度不再范围内'
                                },
                                {
                                    // 支持正则表达式
                                    pattern: /^\w+$/g,
                                    message: '用户名必须为字母或者数字'
                                }
                            ]}
                        >
                            {/* prefix是在输入框前面加图标 */}
                            <Input prefix={<UserOutlined />} />
                        </FormItem>

                        <FormItem
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: '密码不能为空'
                            }]}
                        >
                            {/* 密码框 */}
                            <Input.Password prefix={<LockOutlined />} />
                        </FormItem>

                        <FormItem
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>
                                Remember me
                            </Checkbox>
                            <a href="#" style={{ float: 'right' }}>Forget Password</a>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit" >登录</Button>
                        </FormItem>
                    </Form>·
                </Card>
            </Fragment>
        );
    }
}