import React, { useState, useEffect } from 'react'
import { ajaxCallGet, setItemLocalStorage } from '../libs/base';
import "./../css_main/css/login.css"
import { toast } from 'wc-toast'
import { Link } from 'react-router-dom'




const Login = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ number, password })
        ajaxCallGet(`user-admin?queries=sdt=${number},pass=${password}`).then(rs => {

            if (rs.length == 1) {
                handleGetQuyenByIdUser(rs[0].id);
                toast.success('Đăng nhập thành công')
            } else {
                toast.error('Tài khoản mật khẩu không chính xác')
            }
        }).catch(err => { console.log(err) });
    }

    const handleGetQuyenByIdUser = (idUser) => {
        let dataQuyen = [];
        ajaxCallGet(`admin-has-quyen?queries=id.userAdminId=${idUser}`)
            .then(rs => {
                rs.map(item => {
                    console.log(item.quyen.tenQuyen);
                    if (item.quyen.tenQuyen) {
                        dataQuyen = [...dataQuyen, item.quyen.tenQuyen];
                    }
                })
                console.log(dataQuyen)
                setItemLocalStorage('dataQuyen', dataQuyen);
            })

    }
    return (

        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="https://media.istockphoto.com/vectors/login-icon-vector-id996724196" alt="IMG" />
                    </div>
                    <form className="login100-form validate-form" method="post">
                        <span className="login100-form-title">
                            Member Login
                        </span>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                            <input
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                className="input100" type="text" name="text" placeholder="Số điện thoại" />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="input100" type="password" name="pass" placeholder="Mật khẩu" />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button
                                onBlur={handleSubmit}
                                className="login100-form-btn">
                                Đăng nhập
                            </button>
                        </div>
                        <div className="text-center p-t-12 mb-32">
                            <span className="txt1">
                                Quên
                            </span>
                            <a className="txt2" href="#">
                                tài khoản / mật khẩu?
                            </a>
                        </div>
                        <div className="text-center p-t-136 mt-10">
                            <Link to="../register" className="txt2">
                                Tạo tài khoản mới  {""}
                                <i className="fas fa-long-arrow-alt-right" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login