import $ from 'jquery'
import { Checkbox, FormControl, FormControlLabel, FormLabel, TextField, RadioGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { getItemLocalStorage } from "../libs/base";
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react'
import { ajaxCallGet, setItemLocalStorage, URL_API_GET, createData } from '../libs/base'
import { changeData } from '../reducer_action/DataUserToolReducerAction'

const Header = (props) => {
  const dispatch = useDispatch()
  const [time, setTime] = React.useState(0)
  const mainDataUser = useSelector(state => state.userTool.dataUser)

  const inputHandler = e => {
    console.log("kdkdkd");
    clearTimeout(time)
    let tm = setTimeout(async () => {
      console.log("hshshsh");
      var inputCheck = e.target.value
      let dataa = []

      let rs = await fetch(
        URL_API_GET + `user-tool/find-like-sdt?sdt=${inputCheck}&matool=${inputCheck}`
      ).then(response => response.json())
      for (let x in rs.data) {
        let item = rs.data[x]
        dataa.push(
          createData(
            item.clId,
            item.clMaThietBi,
            item.clMaTool,
            item.clHoTen,
            item.clSdt,
            item.clGmail,
            item.clChucVu,
            item.clNoiLamViec,
            item.clNgayDangKy,

            item.clNgayHetHan
          )
        )

      }
      const action2 = changeData(dataa)
      dispatch(action2)
    }, 1000)
    setTime(tm)
  }
  

  const handleLogOut = () => {
    const action2 = changeData([])
    dispatch(action2)
    console.log("đăng xuất")
    setItemLocalStorage('dataQuyen', [])
  }

  const phanQuyen = getItemLocalStorage('dataQuyen').join('');
  if (phanQuyen === "Admin") {
    return (
      <div className='header mt-2 d-flex justify-content-between'>
        <Link to="/">
          <div>
            <i className="logo-icon fab fa-accusoft"></i>
            <span className='logo-header mb-0'>GoodChild</span>
          </div></Link>
        <div>
          <TextField
            style={{ marginRight: '32px' }}
            id='outlined-basic'
            onChange={inputHandler}
            label='Tìm kiếm'
            variant='outlined'
          />
          <span className="text-log">{phanQuyen}</span >
          <div className="line" style={{ display: "none" }}></div>
          <Link className="text-register" style={{ marginRight: '34px' }} to='/login'>Đăng xuất</Link >
          <Link className="text-register" to='/user-admin'>User Admin</Link >
        </div>

      </div>
    )
  } else if (phanQuyen !== "Admin") {
    return (
      <div className='header mt-2 d-flex justify-content-between'>
        <Link to="/">
          <div>
            <i className="logo-icon fab fa-accusoft"></i>
            <span className='logo-header mb-0'>GoodChild</span>
          </div></Link>
        <div>
          <TextField
            style={{ marginRight: '32px' }}
            id='outlined-basic'
            onChange={inputHandler}
            label='Tìm kiếm'
            variant='outlined'
          />
          <span className="text-log">{phanQuyen}</span >
          <div className="line" style={{ display: "none" }}></div>
          <Link onClick={handleLogOut} className="text-register" style={{ marginRight: '34px' }} to='/login'>Đăng xuất</Link >
        </div>
      </div>
    )
  } else {
    return (
      <div className='header mt-2 d-flex justify-content-between'>
        <Link to="/">
          <div>
            <i className="logo-icon fab fa-accusoft"></i>
            <span className='logo-header mb-0'>GoodChild</span>
          </div></Link>
        <div>
          {/* <FormControl sx={{display:"none", m: 1 }}>
                    <FormLabel id="demo-controlled-radio-buttons-group" sx={{ m: 0 }}>Phân quyền</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={props.checked}
                    >
                        {props.allTool.map((item, index) => {
                            return (
                                <FormControlLabel
                                    checked={props.checked.includes(item)}
                                    onChange={() => props.handleChangeInCheckbox(item)}
                                    key={index} value={item[index]} control={<Checkbox />} label={item[index]} />
                            )
                        })}
                    </RadioGroup>
                </FormControl> */}
          <TextField
            style={{ marginRight: '32px' }}
            id='outlined-basic'
            onChange={()=>{inputHandler()}}
            label='Tìm kiếm'
            variant='outlined'
          />
          <Link className="text-log" to='/login'>Đăng nhập</Link >
          <div className="line" style={{ display: "none" }}></div>
          <Link className="text-register" style={{ marginRight: '34px' }} to='/register'>Đăng ký</Link >
          <Link className="text-register" to='/user-admin'>User Admin</Link >
        </div>

      </div>
    )
  }


}

export default Header;