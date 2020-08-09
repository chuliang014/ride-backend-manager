import React from 'react';
import { Card, Button, Radio } from 'antd';
import {
    SearchOutlined, DownloadOutlined, PlusOutlined,
    EditOutlined, DeleteOutlined, PoweroffOutlined,
    LeftOutlined, RightOutlined
} from '@ant-design/icons';
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

    handleButtonChange = (e) =>{
        this.setState({
            size:e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">demo</Button>
                    <Button>demo</Button>
                    <Button type="dashed">demo</Button>
                    <Button danger>demo</Button>
                    <Button disabled>demo</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button shape="circle" icon={<SearchOutlined />}></Button>
                    <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading} icon={<PoweroffOutlined />}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button loading={this.state.loading} shape="circle" icon={<PoweroffOutlined />}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <Button.Group>
                        <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                        <Button type="primary" icon={<RightOutlined />}>前进</Button>
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
            </div>

        );
    }
}