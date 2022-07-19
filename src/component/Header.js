import $ from 'jquery'
import { Checkbox, FormControl, FormControlLabel, FormLabel, TextField, RadioGroup } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getItemLocalStorage } from "../libs/base";
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react'
import { ajaxCallGet, setItemLocalStorage, URL_API_GET, createData } from '../libs/base'
import { changeData, changeTypeTabs } from '../reducer_action/DataUserToolReducerAction'
import { toast } from 'wc-toast';
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
import { IMAGES } from '../libs/Const_Image';



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

  const phanQuyen = getItemLocalStorage('dataQuyen');
  const localTenUserAdmin = getItemLocalStorage('tenUserAdmin');

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
                item.clChucVu,
                item.clNoiLamViec,
                item.clNgayDangKy,
                item.clNgayHetHan
              )
            )
          }
          // setMainDataUser(dataa)
          const action2 = changeData([...dataa])
          await dispatch(action2)
          // renderData()
        } else {
          toast.error('Không có số điện thoại nào khớp @@')
        }
      }).catch(err => {
        // console.log(err);
      })
    }, 1000)
    setTime(tm)
  }


  const inputHandlerOfQuyen = e => {
    clearTimeout(time)
    let tm = setTimeout(async () => {
      var inputCheck = e.target.value;
      let dataa = [];
      for (let i in phanQuyen) {
        ajaxCallGet(`user-tool/find-like-sdt?sdt=${inputCheck}&matool=${phanQuyen[i]}`).then(async rs => {
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
            // setMainDataUser(dataa)
            const action2 = changeData([...dataa])
            await dispatch(action2)
            // renderData()
          } else {
            toast.error('Không có số điện thoại nào khớp @@')
          }
        }).catch(err => {
          console.log(err);
        })
      }
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

  // if (phanQuyen.join('') === "Admin") {
  return (
    <div className='header mt-2 d-flex justify-content-between align-items-center'>
      <Link to="/">
        <div>
          <img src={IMAGES.LOGO} style={{ width: "120px" }} />
          {/* <span className='logo-header mb-0'>{phanQuyen.join('')}</span> */}
        </div>
      </Link>
      <React.Fragment>
        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <TextField
            id='outlined-basic'
            onChange={phanQuyen.join('') === "Admin" ? inputHandlerOfAdmin : inputHandlerOfQuyen}
            label='Tìm kiếm'
            variant='outlined'
            style={{margin: '0px 16px'}}
          />
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
              <AccountCircle sx={{ color: '#c36a2e', width: 32, height: 32 }} />
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
          <MenuItem style={{ fontSize: "14px", fontWeight: "500", color: '#d3821e' }}>
            <Avatar /> {localTenUserAdmin}
          </MenuItem>
          <MenuItem>
            <Avatar sx={{ fontSize: '15px' }} /> {phanQuyen.join('')}
          </MenuItem>
          <Divider />
          {phanQuyen.join('') === "Admin" && <MenuItem>
            <Link className="text-register" style={{ marginRight: '34px' }} to='/user-admin'>
              <ListItemIcon>
                <PersonAdd style={{ fontSize: "20px" }} />
              </ListItemIcon>
              Quản lý tài khoản
            </Link >
          </MenuItem>
          }
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
  )
}

export default Header;