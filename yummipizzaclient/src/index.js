import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import ErrorBoundary from "./utilities/errors/ErrorBoundary";

import Loader from './utilities/loader/Loader'

const App = lazy(() => import("./App"));

ReactDOM.render(
    <ErrorBoundary>
        <Suspense fallback={<Loader/>}>
            <App/>
        </Suspense>
    </ErrorBoundary>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
