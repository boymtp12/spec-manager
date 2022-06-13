import React from 'react'
import {BrowserRouter  as Router, Link , Route, useNavigate, Navigate,  Routes } from 'react-router-dom'
import Login from './component/Login'
import Home from './component/quanlygc/Home'
import { getItemLocalStorage } from './libs/base'

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={getItemLocalStorage('accessToken') ? <Adminn /> : <Navigate to="/login"/>} />
                <Route path="/login" element={<Loginn />} />
                    
            </Routes>
        </Router>
    )
}


function Adminn() {
    let history = useNavigate();
    function logout() {
        localStorage.removeItem("accessToken")
        history("/login")
    }
    return <div>
        <h2>Admin</h2>
        <button onClick={logout}>Log out</button>
    </div>
}

function Loginn() {
    let history = useNavigate()
    let login = () => {
        localStorage.setItem("accessToken", true)
        history("/")
    }
    return <div>
        <h2>Login</h2>
        <button onClick={login}>Login</button>
    </div>
}