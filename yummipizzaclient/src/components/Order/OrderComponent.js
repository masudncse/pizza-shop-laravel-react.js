import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import {toastNotify, initDataTable, makeCurrency} from "../../helpers/AppHelper";
import {toast} from "react-toastify";
import auth from "../../libraries/AuthLibrary";

class RegisteredCourseComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    loadOrders() {
        axios.get("/api/orders", {
            cancelToken: this.axiosCancelSource.token,
            params: {
                email: auth.email()
            }
        })
            .then(response => {
                let orderObj = response.data.data;
                if (response.data) {
                    if (this._isMounted) {
                        this.setState({
                            orders: orderObj
                        }, () => {
                            initDataTable();
                        });
                    }
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log(error.message);
                } else {
                    toastNotify(toast, 'error', error);
                }
            });
    }

    getOrderTotal(order) {
        let total = 0;
        order.orderDetails.forEach(item => {
            total += item.quantity * item.price;
        });
        total += parseFloat(order.delivery_expense);
        return total;
    }

    getOrderItems(order) {
        let items = "";
        order.orderDetails.forEach(item => {
            items += `<kbd class='p-1 d-inline-block bg-success' style="margin-bottom: 1px;">${item.product.title} (${item.quantity} x ${makeCurrency(item.price)} = ${makeCurrency(item.quantity * item.price)})</kbd><br />`;
        });
        items += `<kbd class='p-1 d-inline-block bg-danger'>DELIVERY EXPENSE: ${makeCurrency(order.delivery_expense)}</kbd>`;
        return items;
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        this.loadOrders();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <React.Fragment>
                <div id="d-courses" className="py-5">
                    <div className="container">
                        {/*<h4 className="category__title mb-4">Course & Registrations &#8212; </h4>*/}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="category-files">
                                    <table
                                        className="table table-striped table-bordered dt-responsive order-listing nowrap w-100">
                                        <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Order Date</th>
                                            <th>Order Items</th>
                                            <th>Total Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.orders.map((order, key) =>
                                            <tr key={key}>
                                                <td>{order.id}</td>
                                                <td>{moment(order.createdAt).format('DD MMM, YYYY hh:mm A')}</td>
                                                <td dangerouslySetInnerHTML={{__html: this.getOrderItems(order)}}/>
                                                <td>{makeCurrency(this.getOrderTotal(order))}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Order Date</th>
                                            <th>Order Items</th>
                                            <th>Total Amount</th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(RegisteredCourseComponent);