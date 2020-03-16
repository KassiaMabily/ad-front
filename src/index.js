import React from 'react';
import ReactDOM from 'react-dom';
import App from './lib/app';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/store';
import '../node_modules/toastr/build/toastr.min.css';

const root = document.getElementById('root');


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
