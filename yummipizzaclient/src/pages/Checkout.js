import React, {useEffect} from 'react';
import { AdminHeaderComponent, CheckoutComponent, AdminNavigationComponent, FooterComponent } from '../components';
import {setPageTitle} from "../helpers/AppHelper";

const Checkout = () => {
    useEffect(() => {
        setPageTitle();
    });

    return (
        <React.Fragment>
            <AdminHeaderComponent/>
            <AdminNavigationComponent/>
            <CheckoutComponent />
            <FooterComponent />
        </React.Fragment>
    );
};

export default Checkout;