import React, { Fragment } from 'react';
import { Card, Tabs, message } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import './ui.less';

const { TabPane } = Tabs;

export default class Tab extends React.Component {

    newTabIndex = 0;
    showMessage = (type) => {
        message[type]("恭喜你")
    }

    callback = (key) => {
        message.info(`Hi, 你选择了页签：${key}`);
    }

    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            },
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    render() {
        return (
            <Fragment>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                            Welcome
                        </TabPane>
                        <TabPane tab="Tab 2" disabled key="2">
                            Welcome
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            React
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span> <AppleOutlined />Tab 1</span>} key="1">
                            Welcome
                        </TabPane>
                        <TabPane tab={<span> <AndroidOutlined />Tab 2</span>} key="2">
                            Welcome
                        </TabPane>
                        <TabPane tab={<span> <AndroidOutlined />Tab 3</span>} key="3">
                            React
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab动态页签" className="card-wrap">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                        type="editable-card">
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}>

                                    {panel.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </Fragment>
        );
    }
}