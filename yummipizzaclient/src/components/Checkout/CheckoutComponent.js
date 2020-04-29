import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toastNotify, makeCurrency} from "../../helpers/AppHelper";
import {DELIVERY_EXPENSE} from "../../config/AppConfig";
import {toast} from "react-toastify";
import axios from "axios";
import FloatLoader from "../../utilities/loader/FloatLoader"
import {connect} from "react-redux";

class CheckoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {
                name: "",
                email: "",
                address: "",
                phone: "",
                orderDetails: this.props.cart,
                deliveryExpense: DELIVERY_EXPENSE
            },
            isLoading: false
        };

        this.name = React.createRef();
        this.email = React.createRef();
        this.address = React.createRef();
        this.phone = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            order: {
                ...this.state.order,
                name: this.name.current.value,
                email: this.email.current.value,
                address: this.address.current.value,
                phone: this.phone.current.value,
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let orderTotal = makeCurrency(this.getTotalDues());
        axios
            .post("/api/orders", this.state.order)
            .then(response => {
                if (response.data.success) {
                    let {last_insert_id: orderId} = response.data;
                    toastNotify(toast, 'success', response);
                    this.setState({isLoading: false});
                    this.resetForm();
                    this.props.history.push(`/confirm/${orderId}/${orderTotal}`);
                    this.props.REMOVE_ALL_CART_ITEMS();
                }
            })
            .catch(error => {
                this.setState({isLoading: false});
                if (axios.isCancel(error)) {
                    console.log(error.message);
                } else {
                    toastNotify(toast, 'error', error);
                }
            });
    }

    resetForm() {
        this.setState({
            order: {
                ...this.state.order,
                name: "",
                email: "",
                address: "",
                phone: "",
                orderDetails: [],
            }
        })
    }

    handleRemoveCartItem(productId) {
        if (window.confirm("Are you sure?")) {
            this.props.REMOVE_CART_ITEM(productId);

            toastNotify(toast, 'success', {
                message: "Successfully removed from cart"
            });
        }
    }

    handleUpdateCartItem(productId, event) {
        let newQuantity = parseInt(event.target.value);
        let updatedCartObj = this.props.cart.reduce((newCart, item, index) => {
            if (item.productId === productId) {
                item.quantity = newQuantity;
                item.total = item.price * newQuantity;
                newCart.push(item);
            } else {
                newCart.push(item);
            }
            return newCart;
        }, []);

        toastNotify(toast, 'success', {
            message: "Successfully updated the item."
        });

        this.props.UPDATE_CART_ITEMS(updatedCartObj)
    }

    getCartTotal() {
        let total = 0;
        this.props.cart.forEach(item => {
            total += item.total;
        });
        return total;
    }

    getTotalDues() {
        let total = 0;
        this.props.cart.forEach(item => {
            total += item.total;
        });
        total += parseFloat(DELIVERY_EXPENSE);
        return total;
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({
                order: {
                    ...this.state.order,
                    orderDetails: this.props.cart
                }
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <React.Fragment>
                <div id="checkout" className="py-5">
                    <div className="container">
                        <div className="checkout__info text-left">
                            <fieldset>
                                <div className="checkout__table">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-condensed">
                                            <thead>
                                            <tr>
                                                <td><strong>#</strong></td>
                                                <td><strong>Actions</strong></td>
                                                <td><strong>Particulars</strong></td>
                                                <td><strong>Quantity</strong></td>
                                                <td><strong>Price</strong></td>
                                                <td><strong>Total</strong></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.cart.map((item, key) =>
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger btn-sm"
                                                                onClick={() => {
                                                                    this.handleRemoveCartItem(item.productId)
                                                                }}>
                                                            <i className="fa fa-times" aria-hidden="true"/> Remove
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-1" title={item.content}>
                                                            - {item.title}</h6>
                                                        <a href={item.image} target="_blank" rel="noopener noreferrer"
                                                           title={item.content}>
                                                            <img src={item.image} width="80"
                                                                 className="img-thumbnail" alt={item.title}/>
                                                        </a>
                                                    </td>
                                                    <td><input
                                                        type="number"
                                                        defaultValue={item.quantity}
                                                        min="1"
                                                        className="form-control col-3 text-center"
                                                        onChange={this.handleUpdateCartItem.bind(this, item.productId)}/>
                                                    </td>
                                                    <td>{makeCurrency(item.price)}</td>
                                                    <td>{makeCurrency(item.total)}</td>
                                                </tr>)}
                                            </tbody>
                                            <tfoot>
                                            <tr className="total_checkout_price font-weight-bold">
                                                <td colSpan="5" className={"text-right"}>Sub Total:</td>
                                                <td>{makeCurrency(this.getCartTotal())}</td>
                                            </tr>
                                            <tr className="total_checkout_price font-weight-bold">
                                                <td colSpan="5" className={"text-right"}>(+) Delivery Expense:</td>
                                                <td>{makeCurrency(DELIVERY_EXPENSE)}</td>
                                            </tr>
                                            <tr className="total_checkout_price font-weight-bold">
                                                <td colSpan="5" className={"text-right"}>Total Dues:</td>
                                                <td>{makeCurrency(this.getTotalDues())}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-8 offset-2">
                                        <form action=""
                                              method="POST"
                                              onSubmit={this.handleSubmit}>
                                            <h2 className="mb-3 mt-4 text-center"
                                                style={{borderBottom: "1px solid #ddd", paddingBottom: "7px"}}>
                                                Shipping Address</h2>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label className="font-weight-bold">Name <span
                                                        className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" ref={this.name}
                                                           value={this.state.order.name} required={true}
                                                           placeholder="Name"
                                                           onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="font-weight-bold">Email <span
                                                        className="text-danger">*</span></label>
                                                    <input type="email" className="form-control"
                                                           placeholder="Email" required={true} ref={this.email}
                                                           value={this.state.order.email}
                                                           onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="font-weight-bold">Address <span
                                                    className="text-danger">*</span></label>
                                                <textarea className="form-control" ref={this.address}
                                                          value={this.state.order.address}
                                                          required={true}
                                                          placeholder="Address" style={{resizeY: "none"}}
                                                          onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-12">
                                                    <label className="font-weight-bold">Phone <span
                                                        className="text-danger">*</span></label>
                                                    <input type="text" className="form-control"
                                                           ref={this.phone}
                                                           value={this.state.order.phone}
                                                           required={true}
                                                           placeholder="Phone" onChange={this.handleChange}/>
                                                </div>
                                            </div>

                                            <button type="submit"
                                                    className="btn btn-primary btn-block text-uppercase">Place Your
                                                Order
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                {/*ExternalComponent*/}
                <FloatLoader isLoading={this.state.isLoading}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cartReducer.cart,
});

const mapDispatchToProps = dispatch => ({
    REMOVE_CART_ITEM: (productId) => dispatch({type: 'REMOVE_CART_ITEM', productId}),
    REMOVE_ALL_CART_ITEMS: () => dispatch({type: 'REMOVE_ALL_CART_ITEMS'}),
    UPDATE_CART_ITEMS: (payload) => dispatch({type: 'UPDATE_CART_ITEMS', payload}),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutComponent));
