import React from 'react';
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig';
import './index.less';

const SubMenu = Menu.SubMenu;


export default class NavLeft extends React.Component {
    UNSAFE_componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
    }

    //menu render
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return <Menu.Item title={item.title} key={item.key}> {item.title}</Menu.Item>
        });
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Ride Manager</h1>
                </div>
                <Menu theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
}