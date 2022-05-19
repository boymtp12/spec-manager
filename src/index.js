import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Edit from './component/Edit'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
 <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>      
      <Route path='/login' element={<Login />}/>      
      <Route path='/register' element={<Register />}/>      
      <Route path='/edit/:id' element={<Edit />}/>      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
</Provider>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
