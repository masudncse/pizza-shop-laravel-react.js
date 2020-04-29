import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import axios from "axios";
import _ from "lodash";
import {setPageTitle, toastNotify} from "../../helpers/AppHelper";
import {toast} from "react-toastify";

class LoginComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            errors: {}
        };

        this.email = React.createRef();
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            email: this.email.current.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (_.isEmpty(this.state.email)) {
            return toastNotify(toast, 'error', {
                message: "Invalid request."
            });
        }

        localStorage.setItem('AUTH_EMAIL', this.state.email);

        toastNotify(toast, 'success', {
            message: "Successfully login."
        });

        setTimeout(() => {
            window.location.href = "/orders";
        }, 500);
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        setPageTitle();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <React.Fragment>
                <form action="" method="POST" onSubmit={(event) => {
                    this.handleSubmit(event);
                }}>
                    <h1 className="form__title">Login Form</h1>
                    <div className="form__group">
                        <i className="icon fa fa-user-o" aria-hidden="true"/>
                        <input type="email" ref={this.email} value={this.state.email} placeholder="Email Address"
                               required={true}
                               onChange={(event) => {
                                   this.handleChange(event);
                               }}/>
                    </div>
                    {/*<div className="form__group">
                        <i className="icon fa fa-key" aria-hidden="true"/>
                        <input type={this.props.showPassword ? 'text' : 'password'} ref={this.password}
                               value={this.state.password}
                               placeholder="Password" required="" id="password" onChange={(event) => {
                            this.handleChange(event);
                        }}/>

                        <button type="button" id="showPassword" onClick={this.props.handleShowPassword}
                                className="btn btn-light">
                            {this.props.showPassword ? <i className="fa fa-eye" aria-hidden="true"/> :
                                <i className="fa fa-eye-slash" aria-hidden="true"/>}
                        </button>
                    </div>*/}
                    <div className="form__group d-flex align-items-center justify-content-between mt-3">
                        <div className="form__footer">
                            <input type="submit" value="Log in"/>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default withRouter(LoginComponent);