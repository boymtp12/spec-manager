import React, { useState } from 'react'
import {
  ajaxCallGet,
  setItemLocalStorage,
  URL_MAIN
} from '../libs/base'
import './../css_main/css/login.css'
import { toast } from 'wc-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import { IMAGES } from '../libs/Const_Image'
import MediaQuery from 'react-responsive'

const Login = () => {
  let history = useNavigate()
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [check, setCheck] = useState(false)

  React.useEffect(() => {
    let acu = []
    ajaxCallGet(`user-tool/find-all`)
      .then(rs => {
        let myArray = rs.data.reduce((acu, item) => {
          if (acu.indexOf(item.clMaTool) === -1) {
            acu.push(item.clMaTool)
          }
          return acu
        }, [])
        setItemLocalStorage('all-tool', myArray)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSubmit = event => {
    setCheck(true)
    event.preventDefault()
    ajaxCallGet(`user-admin?queries=sdt=${number},pass=${password}`)
      .then(rs => {
        if (rs.length == 1) {
          handleGetQuyenByIdUser(rs[0].id)
          setItemLocalStorage('tenUserAdmin', rs[0].ten)
          setTimeout(() => {
            toast.success('Đăng nhập thành công')
            window.location = URL_MAIN
            history('/')
          }, 2500)
        } else {
          setCheck(false)
          toast.error('Tài khoản mật khẩu không chính xác')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleGetQuyenByIdUser = idUser => {
    let dataQuyen = []
    ajaxCallGet(`admin-has-quyen?queries=id.userAdminId=${idUser}`).then(rs => {
      rs.map(item => {
        if (item.quyen.tenQuyen) {
          dataQuyen = [...dataQuyen, item.quyen.tenQuyen]
        }
      })
      setItemLocalStorage('dataQuyen', dataQuyen)
    })
  }
  return (
    <>
      <div className='limiter' style={!check ? null : { opacity: 0.2 }}>
        <div className='container-login100'>
          <div className='wrap-login100'>
            <div className='login100-pic js-tilt' data-tilt>
              <img
                style={{ marginTop: '0' }}
                src={IMAGES.LOGIN}
                alt='IMG'
              />
            </div>
            <form className='login100-form validate-form' onSubmit={(e) => handleSubmit(e)}>
            <MediaQuery maxWidth={767}><span className='login100-form-title'><img src={IMAGES.LOGIN} style={{ width: "50%" }} /></span></MediaQuery>
              <div
                className='wrap-input100 validate-input'
                data-validate='Valid email is required: ex@abc.xyz'
              >
                <input
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                  className='input100'
                  type='text'
                  name='text'
                  placeholder='Số điện thoại'
                />
                <span className='focus-input100' />
                <span className='symbol-input100'>
                  <i className='fa fa-envelope' aria-hidden='true' />
                </span>
              </div>
              <div
                className='wrap-input100 validate-input'
                data-validate='Password is required'
              >
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='input100'
                  type='password'
                  name='pass'
                  placeholder='Mật khẩu'
                />
                <span className='focus-input100' />
                <span className='symbol-input100'>
                  <i className='fa fa-lock' aria-hidden='true' />
                </span>
              </div>
              <div className='container-login100-form-btn'>
                <button type='submit' className='login100-form-btn'>
                  Đăng nhập
                </button>
              </div>
              {/* <div className='text-center p-t-12 mb-32'>
              <span className='txt1'>Quên</span>
              <a className='txt2' href='#'>
                tài khoản / mật khẩu?
              </a>
            </div>
            <div className='text-center p-t-136 mt-10'>
              <Link to='../register' className='txt2'>
                Tạo tài khoản mới {''}
                <i
                  className='fas fa-long-arrow-alt-right'
                  aria-hidden='true'
                ></i>
              </Link>
            </div> */}
            </form>
          </div>
        </div>

      </div>
      {!check ? '' : <div style={{ position: 'fixed', top: "0", left: "0", right: "0", bottom: "0", zIndex: '99999', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* <div ><CircularProgress color="success" /></div> */}
          <div><img src="https://rdsic.edu.vn/img/logo.png" style={{ width: "150px", opacity: 1 }} /></div>
          <div style={{ marginTop: '15px', textAlign: 'center', opacity: 1 }}>Vui lòng chờ ...</div>
        </Box>
      </div>}
    </>

  )
}

export default Login
