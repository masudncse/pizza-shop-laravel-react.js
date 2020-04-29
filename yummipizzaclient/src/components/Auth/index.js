import React, {useState} from 'react'
import {Link, withRouter} from "react-router-dom"
import LoginComponent from './LoginComponent';

const AuthComponent = (props) => {

    // showPassword sate
    const [showPassword, setShowPassword] = useState(false);

    // showPassword handleClick
    function handleShowPassword(e) {
        e.preventDefault();
        setShowPassword(showPassword === false);
    }

    // goBack
    function goBack(e) {
        e.preventDefault();
        props.history.goBack();
    }

    // login background
    let background = 'rgba(0, 0, 0, 0.4) url(/dist/img/pizza.jpeg)  center / cover no-repeat';

    return (
        <React.Fragment>
            <div id="login" className="login">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-7 login__bg d-none d-lg-block"
                             style={{background: background, height: '100vh'}}/>
                        <div className="col-lg-5 col-12">
                            <Link to="//" id="back" className="btn btn-primary rounded-circle"
                                  onClick={goBack}> &#8592; Back </Link>
                            <div className="form-content px-4">
                                {
                                    (function () {
                                        switch (props.status) {
                                            default:
                                                return <LoginComponent
                                                    showPassword={showPassword}
                                                    handleShowPassword={handleShowPassword}
                                                />
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default withRouter(AuthComponent)