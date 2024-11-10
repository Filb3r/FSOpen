import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer  from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import App from './App';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        anecdotes: anecdoteReducer
    }
})

console.log('store state: ', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
