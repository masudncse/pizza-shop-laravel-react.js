import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from './routes/Routes.js';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import {Provider} from 'react-redux';
import store from './store';
import {toast} from 'react-toastify';
import {API_URL} from "./config/AppConfig";
import axios from "axios";
import FloatLoader from './utilities/loader/FloatLoader';

toast.configure();

/**
 * Axios Global Config
 *
 * @type {string}
 */
axios.defaults.baseURL = API_URL;

const App = () => {
    const [isLoading, setIsLoading] = useState(false);

    axios.interceptors.request.use((config) => {
        setIsLoading(true);
        return config;
    }, (error) => {
        setIsLoading(false);
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        setIsLoading(false);
        return response;
    }, (error) => {
        setIsLoading(false);
        return Promise.reject(error);
    });

    useEffect(() => {

    }, []);

    return (
        <Provider store={store}>
            {/*Loader for every component*/}
            {isLoading ? <FloatLoader isLoading={true}/> : null}

            {/*Router*/}
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
