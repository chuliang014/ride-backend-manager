import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/button';
import Modals from './pages/ui/modals';
import NoMatch from './pages/nomatch';
import Loading from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/tabel/basicTable';
import HighTable from './pages/tabel/highTable';
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/detail';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';


export default class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                                <Route path="/admin/ui/modals" component={Modals}></Route>
                                <Route path="/admin/ui/loadings" component={Loading}></Route>
                                <Route path="/admin/ui/notification" component={Notice}></Route>
                                <Route path="/admin/ui/messages" component={Messages}></Route>
                                <Route path="/admin/ui/tabs" component={Tab}></Route>
                                <Route path="/admin/ui/gallery" component={Gallery}></Route>
                                <Route path="/admin/ui/carousel" component={Carousels}></Route>
                                <Route path="/admin/form/login" component={FormLogin}></Route>
                                <Route path="/admin/form/reg" component={FormRegister}></Route>
                                <Route path="/admin/table/basic" component={BasicTable}></Route>
                                <Route path="/admin/table/high" component={HighTable}></Route>
                                <Route path="/admin/city" component={City}></Route>
                                <Route path="/admin/order" component={Order}></Route>
                                <Route path="/admin/user" component={User}></Route>
                                <Route path="/admin/bikeMap" component={BikeMap}></Route>
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>

                    <Route path="/common" render={() =>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    }></Route>

                </App>
            </HashRouter>
        );
    }
}