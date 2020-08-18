import React, { Fragment } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default class Carousels extends React.Component {



    render() {
        return (
            <Fragment>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel >
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                        <img src="/carousel-img/carousel-2.jpg" alt=""/>
                        </div>
                        <div>
                        <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </Fragment>
        );
    }
}