import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from "axios";
import {toastNotify, makeCurrency} from "../../helpers/AppHelper";
import {toast} from "react-toastify";
import striptags from 'striptags';
import {connect} from 'react-redux';

class ProductComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    loadProducts() {
        axios
            .get("/api/products", {
                cancelToken: this.axiosCancelSource.token
            })
            .then(response => {
                let productObj = response.data.data;
                if (productObj) {
                    if (this._isMounted) {
                        this.setState({
                            products: productObj
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

    handleAddToCartItem(product) {
        if (this.isExistInCart(product)) {
            return toastNotify(toast, 'warning', {
                message: "Already added into the cart."
            });
        } else {
            this.props.ADD_CART_ITEM({
                productId: product.id,
                title: product.title,
                content: product.content,
                image: product.image,
                quantity: 1,
                price: product.price,
                total: product.price * 1
            });

            toastNotify(toast, 'success', {
                message: "Successfully added to cart."
            });

            this.reload();
        }
    };

    reload() {
        const current = this.props.location.pathname;
        this.props.history.replace(`/reload`);
        setTimeout(() => {
            this.props.history.replace(current);
        });
    }

    isExistInCart(product) {
        let isExisted = false;
        this.props.cart.forEach(item => {
            if (item.productId === product.id) {
                isExisted = true;
            }
        });
        return isExisted;
    }

    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();
        this.loadProducts();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');
    }

    render() {
        return (
            <React.Fragment>
                <div id="product">
                    <div className="container">
                        <div className="product__posts mt-5">
                            <div className="row">
                                {this.state.products.map((product, key) =>
                                    <div key={key} className="col-md-3 mb-3">
                                        <div className="post-slide border p-1">
                                            <div className="post-img">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}/>
                                            </div>
                                            <div className="post-review">
                                                <h3 className="post-title mt-2">{product.title}</h3>
                                                <p className="post-description"
                                                   title={striptags(product.content)}>
                                                    {striptags(product.content).substring(0, 120) + '...'}
                                                </p>
                                                <h3 className="post-title text-success mt-2">
                                                    {makeCurrency(product.price)}
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-block mt-3 text-uppercase"
                                                    onClick={() => {
                                                        this.handleAddToCartItem(product);
                                                    }}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.cartReducer.cart
});

const mapDispatchToProps = dispatch => ({
    ADD_CART_ITEM: (payload) => dispatch({type: 'ADD_CART_ITEM', payload}),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductComponent));
