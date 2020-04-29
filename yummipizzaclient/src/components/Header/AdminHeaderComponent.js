import React, {useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth from '../../libraries/AuthLibrary';
import {APP_CURRENCY_TYPE} from '../../config/AppConfig';
import {connect} from 'react-redux';

const AdminHeaderComponent = (props) => {
    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <div id="d-headerTop">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light py-4 px-0">
                        <Link to="/" className="navbar-brand d-inline-flex align-items-center py-0">
                            <img src="/dist/img/logo.png" width="220" alt="Logo" className="ml-4"/>
                        </Link>
                        <div className="headerTop-navbar ml-auto">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown d-flex align-items-center">
                                    <a href="//" className="nav-link text-dark fs-17 dropdown-toggle"
                                       id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        {APP_CURRENCY_TYPE === 'euro' ? 'EURO€' : 'USD$'}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right rounded-0"
                                         aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="//" className="dropdown-item" onClick={(event) => {
                                            event.preventDefault();
                                            localStorage.setItem('APP_CURRENCY_TYPE', 'euro');
                                            window.location.reload();
                                        }}>
                                            <i className="fa fa-euro"/>&nbsp;&nbsp;EURO
                                        </Link>
                                        <Link to="//" className="dropdown-item" onClick={(event) => {
                                            event.preventDefault();
                                            localStorage.setItem('APP_CURRENCY_TYPE', 'usd');
                                            window.location.reload();
                                        }}>
                                            <i className="fa fa-usd"/>&nbsp;&nbsp;USD
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/checkout" className="nav-link text-dark fs-17">
                                        <img
                                            src='https://img.favpng.com/12/18/15/shopping-cart-icon-png-favpng-e5DiMUYLNYaTjdsibphFUCAxC.jpg'
                                            className="img-fluid rounded-circle mr-2"
                                            alt="cart-icon"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}/>
                                        <span className="badge badge-secondary">{props.cart.length}</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link text-dark fs-17 dropdown-toggle" href="//"
                                       id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        <img
                                            src='https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg'
                                            className="img-fluid rounded-circle mr-2"
                                            alt="profile-pic"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}/>
                                        {true}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right rounded-0"
                                         aria-labelledby="navbarDropdownMenuLink">
                                        {!auth.status() ?
                                            <Link to="/login" className="dropdown-item">
                                                <i className="fa fa-sign-in"/>&nbsp;&nbsp;Login
                                            </Link> : null}
                                        {auth.status() ?
                                            <Link to="//" className="dropdown-item" onClick={(event) => {
                                                event.preventDefault();
                                                auth.logout();
                                                setTimeout(() => {
                                                    window.location.href = '/'
                                                }, 500);
                                            }}>
                                                <i className="fa fa-power-off"/>&nbsp;&nbsp;Signout
                                            </Link> : null}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    cart: state.cartReducer.cart
});

export default connect(mapStateToProps)(withRouter(AdminHeaderComponent));