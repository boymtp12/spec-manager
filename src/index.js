import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './component/Login'
import Register from './component/Register'

import FormEditUserTool from './component/FormEditUserTool'
import TableUserAdmin from './component/quanlygc/TableUserAdmin'


import AppRouter from './AppRouter';
import Header from './component/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <App />
  // <AppRouter />
);

reportWebVitals();
