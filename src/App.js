import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes, Switch, useHistory } from 'react-router-dom'
import Home from './component/quanlygc/Home'
import Header from './component/Header'
import Login from './component/Login'
import { Provider } from 'react-redux'
import store from './store'
import { getItemLocalStorage } from './libs/base';
import Register from './component/Register'
import FormEditUserTool from './component/FormEditUserTool'
import TableUserAdmin from './component/quanlygc/TableUserAdmin'
import NotFound from './component/NotFound'


function App() {
  const phanQuyen = getItemLocalStorage('dataQuyen');
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={phanQuyen ? <Home phanQuyen = {phanQuyen}/> : <Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user-admin' element={<TableUserAdmin /> } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
