import React, {Component} from 'react';
import {AdminHeaderComponent, FooterComponent, AdminNavigationComponent} from '../components/index';
import axios from "axios";
import {setPageTitle} from "../helpers/AppHelper";

class Home extends Component {
    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        setPageTitle('Home');
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 style={{padding: "200px 0 200px 0"}}>Welcome to, Yummi Pizza :)</h2>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </React.Fragment>
        );
    }
}

export default Home;