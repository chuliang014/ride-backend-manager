import React, { Fragment } from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';

export default class Notice extends React.Component {
   
    openNotification = (type, direction)=>{
        if(direction){
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message:'今天搬家了',
            description:'From GrandMarc to Trail'
        });
    }

    render() {
        return (
            <Fragment>
               <Card title="通知提醒框" className="card-wrap">
                   <Button type="primary" onClick={()=>this.openNotification('success')}> Success</Button>
                   <Button type="primary" onClick={()=>this.openNotification('info')}> Info</Button>
                   <Button type="primary" onClick={()=>this.openNotification('warning')}> Warning</Button>
                   <Button type="primary" onClick={()=>this.openNotification('error')}> Error</Button>
               </Card>
                {/* 控制方向 */}
               <Card title="通知提醒框" className="card-wrap">
                   <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}> Success</Button>
                   <Button type="primary" onClick={()=>this.openNotification('info','topRight')}> Info</Button>
                   <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}> Warning</Button>
                   <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}> Error</Button>
               </Card>
            </Fragment>
        );
    }
}