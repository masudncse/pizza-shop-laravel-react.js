import React from 'react';

const NotFound = () => {
    return (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '100vh' }}>
                <i className="fa fa-meh-o fa-5x text-danger" aria-hidden="true"/>
                <h1 className="mb-1 text-danger mt-3"> Error #404 </h1>
                <p className="text-dark"> &#8212; The page you requested has flown the coop </p>
            </div>
        </React.Fragment>
    );
};

export default NotFound;