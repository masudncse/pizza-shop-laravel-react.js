import React from 'react';
import {Switch, Route} from "react-router-dom";
import SafeRouteHelper from "../helpers/SafeRouteHelper";

import Home from '../pages/Home';
import Login from '../pages/Login';
import Order from '../pages/Order';
import Product from '../pages/Product';
import Checkout from '../pages/Checkout';
import NotFound from '../utilities/errors/NotFound';
import Confirm from "../pages/Confirm";

const Routes = () => {
    return (
        <React.Fragment>
            <Switch>
                {/*Home Page*/}
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/products" component={Product}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/confirm/:orderId/:orderTotal" component={Confirm}/>
                <Route path="/reload" component={null} />

                {/*Conditional Routes*/}
                <SafeRouteHelper path="/orders" component={Order}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </React.Fragment>
    );
};

export default Routes;