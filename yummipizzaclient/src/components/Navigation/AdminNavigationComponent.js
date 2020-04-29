import React from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import auth from '../../libraries/AuthLibrary';

const AdminNavigationComponent = (props) => {
    return (
        <React.Fragment>
            <div id="d-navigation" className="border-top border-bottom py-1">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light px-0 py-1">
                        <div className="d-navigation-navbar">
                            <ul className="navbar-nav">
                                <li className="nav-item mr-4">
                                    <NavLink exact to="/" activeClassName="active" className="nav-link text-dark fs-18 ">Home</NavLink>
                                </li>
                                <li className="nav-item mr-4">
                                    <NavLink to="/products" activeClassName="active" className="nav-link text-dark fs-18 ">Products</NavLink>
                                </li>
                                <li className="nav-item mr-4">
                                    <NavLink to="/checkout" activeClassName="active" className="nav-link text-dark fs-18 ">Checkout</NavLink>
                                </li>
                                {auth.status() ? <li className="nav-item mr-4">
                                    <NavLink to="/orders" activeClassName="active" className="nav-link text-dark fs-18 ">Orders</NavLink>
                                </li> : null}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(AdminNavigationComponent);