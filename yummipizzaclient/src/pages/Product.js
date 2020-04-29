import React, {useEffect} from 'react';
import {AdminHeaderComponent, ProductComponent, AdminNavigationComponent, FooterComponent} from '../components';
import {setPageTitle} from "../helpers/AppHelper";

const Product = () => {
    useEffect(() => {
        setPageTitle();
    });

    return (
        <React.Fragment>
            <AdminHeaderComponent/>
            <AdminNavigationComponent/>
            <ProductComponent/>
            <FooterComponent/>
        </React.Fragment>
    );
};

export default Product;