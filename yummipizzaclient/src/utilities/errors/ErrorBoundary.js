import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {

        // store error reporting service
        this.setState({
            hasError: true,
            error,
            errorInfo
        });

        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <React.Fragment>
                    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{height: '100vh'}}>
                        <i className="fa fa-meh-o fa-5x text-danger" aria-hidden="true"/>
                        <h1 className="mb-1 text-danger mt-3">Something went wrong!</h1>
                        <p className="text-dark"> &#8212; Caught by error boundary</p>
                    </div>
                </React.Fragment>
            )
        }

        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary