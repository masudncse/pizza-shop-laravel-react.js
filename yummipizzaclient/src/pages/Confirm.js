import React, {Component} from 'react';
import {AdminHeaderComponent, ConfirmComponent, FooterComponent, AdminNavigationComponent} from '../components/index';
import axios from "axios";
import {setPageTitle} from "../helpers/AppHelper";

class Confirm extends Component {
    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        setPageTitle('Confirm');
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <React.Fragment>
                <AdminHeaderComponent/>
                <AdminNavigationComponent/>
                <ConfirmComponent/>
                <FooterComponent/>
            </React.Fragment>
        );
    }
}

export default Confirm;