import $ from 'jquery'
import { Checkbox, FormControl, FormControlLabel, FormLabel, TextField, RadioGroup } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getItemLocalStorage } from "../libs/base";
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react'
import { ajaxCallGet, setItemLocalStorage, URL_API_GET, createData } from '../libs/base'
import { changeData, changeTypeTabs } from '../reducer_action/DataUserToolReducerAction'
import { toast } from 'wc-toast';
import App from '.././logo.png'
import MediaQuery, { useMediaQuery } from "react-responsive";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuAppBar from './MenuAppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';



const Header = () => {
  let history = useNavigate();
  const dispatch = useDispatch()
  const [time, setTime] = React.useState(0)
  const mainDataUser = useSelector(state => state.userTool.dataUser)
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)"
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1224px)"
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 786px)"
  });
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)"
  });
  const isRetina = useMediaQuery({
    query: "(max-resolution: 300dpi)"
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const phanQuyen = getItemLocalStorage('dataQuyen').join('');

  const inputHandlerOfAdmin = e => {
    clearTimeout(time)
    let tm = setTimeout(async () => {
      var inputCheck = e.target.value;
      let dataa = [];

      ajaxCallGet(`user-tool/find-like-sdt-all?sdt=${inputCheck}`).then(async rs => {
        if (rs.data[0] !== undefined) {
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
                item.clChucVu, -
              item.clNoiLamViec,
                item.clNgayDangKy,
                item.clNgayHetHan
              )
            )
          }
          console.log(dataa);
          // setMainDataUser(dataa)
          const action2 = changeData(dataa)
          await dispatch(action2)
          // renderData()
        } else {
          toast.error('Không có số điện thoại nào khớp @@')
        }
      }).catch(err => {
        console.log(err);
      })
    }, 1000)
    setTime(tm)
  }


  const inputHandlerOfQuyen = e => {
    clearTimeout(time)
    let tm = setTimeout(async () => {
      var inputCheck = e.target.value;
      let dataa = [];

      ajaxCallGet(`user-tool/find-like-sdt?sdt=${inputCheck}&matool=${phanQuyen}`).then(async rs => {
        if (rs.data[0] !== undefined) {
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
          console.log(dataa);
          // setMainDataUser(dataa)
          const action2 = changeData(dataa)
          await dispatch(action2)
          // renderData()
        } else {
          toast.error('Không có số điện thoại nào khớp @@')
        }
      }).catch(err => {
        console.log(err);
      })
    }, 1000)
    setTime(tm)
  }

  const handleLogOut = () => {
    const action2 = changeData([])
    dispatch(action2)
    toast.success("Đăng xuất thành công")
    localStorage.removeItem('dataQuyen')
    history('/login')
  }

  // if (phanQuyen === "Admin") {
  return (
    <div className='header mt-2 d-flex justify-content-between align-items-center'>
      <Link to="/">
        <div>
          <img src="https://rdsic.edu.vn/img/logo.png" style={{ width: "150px" }} />
          {/* <span className='logo-header mb-0'>{phanQuyen}</span> */}
        </div>
      </Link>
      <MediaQuery minWidth={787}>
        <div className="header-right">
          <TextField
            style={{ marginRight: '32px' }}
            id='outlined-basic'
            onChange={phanQuyen === "Admin" ? inputHandlerOfAdmin : inputHandlerOfQuyen}
            label='Tìm kiếm'
            variant='outlined'
          />
          <MenuAppBar />
          <div className="line" style={{ display: "none" }}></div>
          <Link className="text-register" style={{ marginRight: '34px' }} to='/user-admin'>{phanQuyen === "Admin" && "User Admin"}</Link >
          <Link className="text-register" onClick={handleLogOut} to='/login'>Đăng xuất</Link >
        </div>
      </MediaQuery>
      {/* Responsive for mobile */}
      {isMobile &&
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <AccountCircle sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: '200px',
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> {phanQuyen}
            </MenuItem>
            {/* <MenuItem>
              <Avatar /> My account
            </MenuItem> */}
            <Divider />
            {phanQuyen === "Admin" && <MenuItem>
              <Link className="text-register" style={{ marginRight: '34px' }} to='/user-admin'>
                <ListItemIcon>
                  <PersonAdd style={{ fontSize: "20px" }} />
                </ListItemIcon>
                User Admin
              </Link >
            </MenuItem>

            }

            <MenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      }

    </div>
  )
  // } else if (phanQuyen !== "Admin") {
  //   return (
  //     <div className='header mt-2 d-flex justify-content-between'>
  //       <Link to="/">
  //         <div>
  //           <i className="logo-icon fab fa-accusoft"></i>
  //           <span className='logo-header mb-0'>GoodChild</span>
  //         </div></Link>
  //       <div>
  //         <TextField
  //           style={{ marginRight: '32px' }}
  //           id='outlined-basic'
  //           onChange={inputHandlerOfQuyen}
  //           label='Tìm kiếm'
  //           variant='outlined'
  //         />
  //         <span className="text-log">{phanQuyen}</span >
  //         <div className="line" style={{ display: "none" }}></div>
  //         <Link onClick={handleLogOut} className="text-register" style={{ marginRight: '34px' }} to='/login'>Đăng xuất</Link >
  //       </div>
  //     </div>
  //   )
  // }
}

export default Header;