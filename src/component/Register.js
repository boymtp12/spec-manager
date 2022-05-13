import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import React, { useEffect, useState } from 'react';
import "./../css_main/css/register.css"
import { ajaxCallPost } from '../libs/base';
import { toast } from 'wc-toast'
import {Link} from 'react-router-dom'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let userData = {
            'ten': name,
            'sdt': number,
            'email': email,
            'address': address,
            'pass': password
        }
        console.log(userData)
        if (userData.ten == '' || userData.sdt== '' || userData.email== '' || userData.address== '' || userData.pass== '') {
            toast.error('Vui lòng điền đầy đủ thông tin')
        } else {
            ajaxCallPost('user-admin/save-new', userData)
                .then(rs => {
                    toast.success("Đăng ký thành công")
                    window.location.assign("http://localhost:3000/login")
                })
        }
    }

    return (

        <div className="page-content">
            <div className="form-v5-content">
                <form className="form-detail row" method="post">
                    <h2 className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Đăng ký tài khoản</h2>
                    <div className="form-row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label htmlFor="full-name">Họ tên</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" name="full-name" id="full-name" className="input-text" placeholder="Tên của bạn" required />
                        <i className="fas fa-user" />
                    </div>
                    <div className="form-row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label htmlFor="your-email">Email</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="text" name="your-email" id="your-email" className="input-text" placeholder="Email của bạn" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" />
                        <i className="fas fa-envelope" />
                    </div>
                    <div className="form-row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password" name="password" id="password" className="input-text" placeholder="Mật khẩu của bạn" required />
                        <i className="fas fa-lock" />
                    </div>
                    <div className="form-row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label htmlFor="number">Số điện thoại</label>
                        <input
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                            type="text" name="number" id="number" className="input-text" placeholder="Số điện thoại" required />
                        <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="form-row col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            type="text" name="address" id="address" className="input-text" placeholder="Địa chỉ..." required />
                        <i className="fas fa-address-book"></i>
                    </div>
                    <div className="form-row-last col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <input
                            onClick={handleSubmit}
                            name="register" className="register" defaultValue="Đăng ký" />
                    </div>
                </form>
            </div>
        </div>
    );
}




export default Register
