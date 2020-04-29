import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {setPageTitle} from "../../helpers/AppHelper";

class ConfirmComponent extends Component {
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="text-uppercase                            "
                                style={{padding: "170px 0 170px 0", lineHeight: 1}}>
                                Thank you for your order :)
                                <br/>
                                <small className="fs-22">
                                    Order ID: #{this.props.match.params.orderId} |
                                    Order Total: {this.props.match.params.orderTotal}
                                </small>
                            </h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ConfirmComponent);