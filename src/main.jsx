import './index.css';

import AuthProvider from './context/AuthContext';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router/Route';
import { createStore } from './states/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={createStore(null)}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
