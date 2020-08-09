import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {/* 可以加载一切组件，比如说登录页面，详情页面， 主页*/}
        {this.props.children}
      </div >
    );
  }
}