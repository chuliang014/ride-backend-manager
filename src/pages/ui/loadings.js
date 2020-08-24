import React, { Fragment } from 'react';
import { Card, Spin, Alert, Icon } from 'antd';
import './ui.less';

export default class Loading extends React.Component {

    render() {
        const icon = <Icon type="loading" style={{ fontSize: 24 }} />
        const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <Fragment>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{ margin: '0 10px' }} />
                    <Spin size="large" />
                    <Spin indicator={icon} style={{ marginLeft: 10 }} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="warning"
                    />
                    <Spin>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="loading....">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="loading...." indicator={iconLoading}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                        />
                    </Spin>
                </Card>
            </Fragment>

        );
    }
}
