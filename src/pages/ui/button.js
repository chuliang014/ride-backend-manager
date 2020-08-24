import React, { Fragment } from 'react';
import { Card, Button, Radio } from 'antd';
import './ui.less';

export default class Buttons extends React.Component {
    state = {
        loading: true,
        size: 'default'
    }

    handleCloseLoading = () => {
        this.setState({
            loading: false
        });

        setTimeout(() => {
            this.setState({
                loading: true
            });
        }, 5000);
    }

    handleButtonChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">demo</Button>
                    <Button>demo</Button>
                    <Button type="dashed">demo</Button>
                    <Button danger>demo</Button>
                    <Button disabled>demo</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape="circle"></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleButtonChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button size={this.state.size} type="primary">demo</Button>
                    <Button size={this.state.size}>demo</Button>
                    <Button size={this.state.size} type="dashed">demo</Button>
                    <Button size={this.state.size} danger>demo</Button>
                </Card>
            </Fragment>
        );
    }
}