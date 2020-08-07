import React from 'react';

export default class Life extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    handleBtnClick() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div className="content">
                <p>react life cycle introduction</p>
                <button onClick={this.handleBtnClick.bind(this)}>点击一下</button>
                <p>{this.state.count}</p>
            </div>
        );
    }
}