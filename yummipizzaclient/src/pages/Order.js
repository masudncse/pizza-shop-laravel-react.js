import React, {useEffect} from 'react';
import {AdminHeaderComponent, FooterComponent, AdminNavigationComponent, OrderComponent} from '../components/index';
import {setPageTitle} from "../helpers/AppHelper";

const Course = () => {
    useEffect(() => {
        setPageTitle();
    });

    return (
        <React.Fragment>
            <AdminHeaderComponent/>
            <AdminNavigationComponent/>
            <OrderComponent/>
            <FooterComponent/>
        </React.Fragment>
    );
};

export default Course;