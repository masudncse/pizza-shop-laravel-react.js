import React from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from '../libraries/AuthLibrary';

const SafeRouteHelper = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => {
                if (auth.status()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
    );
};

export default SafeRouteHelper;
