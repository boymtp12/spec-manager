import * as React from 'react'

import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils'
import { ajaxCallGet, ajaxCallPost, URL_API_GET, createData, ajaxCallPut, sweetAlert2, getItemLocalStorage, setItemLocalStorage, getDayMonthYear } from './../../libs/base'
import { toast } from 'wc-toast'

import FormEditUserTool from '../FormEditUserTool'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormAddUserTool from '../FormAddUserTool'

import { useDispatch, useSelector } from 'react-redux'
import { changeData, changeTypeTabs } from '../../reducer_action/DataUserToolReducerAction'
import FormEditUserToolGeneral from '../FormEditUserToolGeneral'
import FormActivateKey from '../FormActivateKey'
import MenuFilter from '../MenuFilter'
import Header from '../Header'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';


const userToolContext = React.createContext()


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'hoten',
    numeric: false,
    disablePadding: false,
    label: 'Họ và tên',
    mWidth: "minWidth: '200px'"
  },
  {
    id: 'matool',
    numeric: false,
    disablePadding: false,
    label: 'Mã Tool',
    mWidth: "minWidth: '120px'"
  },
  {
    id: 'sdt',
    numeric: false,
    disablePadding: false,
    label: 'Số điện thoại',
    mWidth: "minWidth: '130px'"
  },
  {
    id: 'ngaydangky',
    numeric: false,
    disablePadding: false,
    label: 'Ngày đăng ký'
  },
  {
    id: 'ngayhethan',
    numeric: false,
    disablePadding: false,
    label: 'Ngày hết hạn'
  },
  {
    id: 'chucNang',
    numeric: false,
    disablePadding: false,
    label: 'Chức năng',
    mWidth: "minWidth: '250px'"
  }
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <>
      {/* <Header /> */}
      <TableHead style={{ background: '#f4f3f3' }}>
        <TableRow>
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
            />
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={'center'}
              style={{ whiteSpace: 'nowrap' }}
              minWidth={headCell.mWidth}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component='span' sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}



export default function TableQl(props) {
  const [order, setOrder] = React.useState('asc')
  const [rows, setRows] = React.useState([])
  const typee = useSelector(state => state.userTool.typeTabs)

  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  // const [mainDataUser, setMainDataUser] = React.useState(props.data)
  const dispatch = useDispatch()
  const mainDataUser = useSelector(state => state.userTool.dataUser)

  const [rowsPerPage, setRowsPerPage] = React.useState(25)

  const [date, setDate] = React.useState('')


  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openEditGeneral, setOpenEditGeneral] = React.useState(false);
  const [openActivate, setOpenActivate] = React.useState(false);

  const [userId, setUserId] = React.useState('')

  const [fullName, setFullName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [tenSanPham, setTenSanPham] = React.useState('');
  const [maTool, setMaTool] = React.useState([]);
  const [soDienThoai, setSoDienThoai] = React.useState('');
  const [chucVu, setChucVu] = React.useState('');
  const [noiLamViec, setNoiLamViec] = React.useState('');
  const [ngayDangKy, setNgayDangKy] = React.useState('');
  const [ngayHetHan, setNgayHetHan] = React.useState('');
  const [dataUserTool, setDataUserTool] = React.useState([]);

  const phanQuyen = getItemLocalStorage('dataQuyen').join('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilterList = Boolean(anchorEl);

  const EnhancedTableToolbar = props => {
    const { numSelected } = props
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              )
          })
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color='inherit'
            variant='subtitle1'
            component='div'
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            Danh sách tài khoản
          </Typography>
        )}

        {numSelected > 0 ? (
          <React.Fragment>
            <Tooltip title='Edit' onClick={handleClickOpenEditGeneral}>
              <IconButton >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete' onClick={handleDeleteGeneral}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tooltip title='Kích hoạt Key' onClick={handleClickOpenActivate}>
              <IconButton>
                <ChangeHistoryIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title='Add User Tool' onClick={handleClickOpen}>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title='Filter list'>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
          </React.Fragment>
        )}

      </Toolbar>
    )
  }
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
  }
  const handleClickFilterList = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilterList = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {

  }, [])
  React.useEffect(() => {
    let arr = mainDataUser
    let date = new Date()
    switch (props.type) {
      case 1:
        arr = arr.filter(item => {
          var c = new Date(item.ngayhethan)
          return c > date
        })
        props.onCountItem(arr.length)
        setRows(arr)
        break
      case 2:
        arr = arr.filter(item => {
          var c = new Date(item.ngayhethan)
          return c < date
        })
        props.onCountItem(arr.length)
        setRows(arr)
        break
      case 3:
        setRows(arr)
        break
      case 4:
        arr = arr.filter(item => {
          var c = new Date(item.ngayhethan)
          return c < date
        })
        props.onCountItem(arr.length)
        setRows(arr)
        break
      default:
        props.onCountItem(arr.length)
        setRows(arr)
        break
    }
  }, [mainDataUser])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  /**
 * Đẩy dữ liệu sau khi đã chỉnh sửa nhiều user-tool cùng 1 lúc
 *
 * @param 
 * @author HieuTN
 */

  const handleSubmitEditGeneral = async () => {
    const idSelected = getItemLocalStorage('idSelected');
    for (let i in idSelected) {
      const idUser = idSelected[i];
      let data = await ajaxCallGet(`user-tool/${idUser}`)
        .then(rs => {
          console.log(rs)
          return {
            "clId": idUser,
            "clMaThietBi": rs.clMaThietBi,
            "clMaTool": rs.clMaTool,
            "clTenSanPham": rs.clTenSanPham,
            "clHoTen": rs.clHoTen,
            "clSdt": rs.clSdt,
            "clGmail": rs.clGmail,
            "clChucVu": chucVu === "" ? rs.clChucVu : chucVu,
            "clNoiLamViec": noiLamViec === "" ? rs.clNoiLamViec : noiLamViec,
            "clNgayDangKy": ngayDangKy === "" ? rs.clNgayDangKy : ngayDangKy,
            "clNgayHetHan": ngayHetHan === "" ? rs.clNgayHetHan : ngayHetHan,
            "clCheDo": rs.clCheDo,
            "clMatKhau": rs.clMatKhau,
            "clPhanMemChoPhep": rs.clPhanMemChoPhep,
            "clWebCanChan": rs.clWebCanChan,
            "clWebChoChay": rs.clWebChoChay,
            "clPmDaChan": rs.clPmDaChan,
            "clWebDaChan": rs.clWebDaChan,
            "clTrangThai": rs.clTrangThai,
            "clLichSuWeb": rs.clLichSuWeb,
            "clThoiGianBat": rs.clThoiGianBat,
            "clThoiGianTat": rs.clThoiGianTat,
          }


        })
      await ajaxCallPut('user-tool', data)
        .then(rs => {
          console.log(rs);
          setSelected([]);
          handleCloseEditGeneral();
          if (phanQuyen === "Admin") {
            getAllUser()
          } else {
            getAllUserByQuyen();
          }
        })
        .catch(err => (console.log("error: ", err)))
    }

    toast.success('Sửa thành công');
    clearDataAfterSubmit();
  }

  const clearDataAfterSubmit = () => {
    setChucVu('')
    setNoiLamViec('')
  }

  /**
* Hàm xóa dữ liệu nhiều người dùng cùng 1 lúc
*
* @param 
* @author HieuTN
*/
  const handleDeleteGeneral = async () => {
    const idSelected = getItemLocalStorage('idSelected');
    const text = "Bạn có thực sự muốn xóa?";

    let confirm = await sweetAlert2(text)
    if (confirm) {
      for (let i in idSelected) {
        const id = idSelected[i];
        ajaxCallPost(`user-tool/delete?id=${id}`)
          .then(rs => {
            setSelected([]);
            if (phanQuyen === "Admin") {
              getAllUser()
            } else {
              getAllUserByQuyen();
            }
          })
          .catch(err => {
            console.log("Error general", err);
          })
      }
      toast.success("Xóa thành công !!!")
    } else {
      toast.success("Thank u")
    }
  }

  React.useEffect(() => {
    setItemLocalStorage("idSelected", selected)
  }, [selected])

  /**
* Hàm chọn tất cả các user-tool cùng 1 lúc
*
* @param 
* @author HieuTN
*/

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  /**
* Hàm chọn từng user-tool 1
*
* @param 
* @author HieuTN
*/

  const handleClickCheck = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  /**
* Hàm sửa ngày đăng ký user-tool ngay lập tức
*
* @param 
* @author HieuTN
*/
  const handleChangeNgayDangKy = (e, id) => {
    setDate(e.target.value)
    ajaxCallGet('user-tool' + '/' + id)
      .then(rs => {
        let data = {
          "clId": id,
          "clMaThietBi": rs.clMaThietBi,
          "clMaTool": rs.clMaTool,
          "clTenSanPham": rs.clTenSanPham,
          "clHoTen": rs.clHoTen,
          "clSdt": rs.clSdt,
          "clGmail": rs.clGmail,
          "clChucVu": rs.clChucVu,
          "clNoiLamViec": rs.clNoiLamViec,
          "clNgayDangKy": e.target.value,
          "clNgayHetHan": rs.clNgayHetHan,
          "clCheDo": rs.clCheDo,
          "clMatKhau": rs.clMatKhau,
          "clPhanMemChoPhep": rs.clPhanMemChoPhep,
          "clWebCanChan": rs.clWebCanChan,
          "clWebChoChay": rs.clWebChoChay,
          "clPmDaChan": rs.clPmDaChan,
          "clWebDaChan": rs.clWebDaChan,
          "clTrangThai": rs.clTrangThai,
          "clLichSuWeb": rs.clLichSuWeb,
          "clThoiGianBat": rs.clThoiGianBat,
          "clThoiGianTat": rs.clThoiGianTat
        }
        ajaxCallPost('user-tool', data)
          .then(rs => {
            toast.success('Sửa thành công')
          })
      })
  }

  /**
* Hàm sửa ngày hết hạn của user-tool ngay lập tức
*
* @param 
* @author HieuTN
*/
  const handleChangeNgayHetHan = (e, id) => {
    setDate(e.target.value)

    ajaxCallGet('user-tool' + '/' + id)
      .then(rs => {
        let data = {
          "clId": id,
          "clMaThietBi": rs.clMaThietBi,
          "clMaTool": rs.clMaTool,
          "clTenSanPham": rs.clTenSanPham,
          "clHoTen": rs.clHoTen,
          "clSdt": rs.clSdt,
          "clGmail": rs.clGmail,
          "clChucVu": rs.clChucVu,
          "clNoiLamViec": rs.clNoiLamViec,
          "clNgayDangKy": rs.clNgayDangKy,
          "clNgayHetHan": e.target.value,
          "clCheDo": rs.clCheDo,
          "clMatKhau": rs.clMatKhau,
          "clPhanMemChoPhep": rs.clPhanMemChoPhep,
          "clWebCanChan": rs.clWebCanChan,
          "clWebChoChay": rs.clWebChoChay,
          "clPmDaChan": rs.clPmDaChan,
          "clWebDaChan": rs.clWebDaChan,
          "clTrangThai": rs.clTrangThai,
          "clLichSuWeb": rs.clLichSuWeb,
          "clThoiGianBat": rs.clThoiGianBat,
          "clThoiGianTat": rs.clThoiGianTat
        }
        ajaxCallPost('user-tool', data)
          .then(rs => {
            toast.success('Sửa thành công')
          })


      })

  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  /**
* Hàm xóa từng user-tool
*
* @param 
* @author HieuTN
*/

  const handleDelete = async (id) => {
    const text = "Bạn có thực sự muốn xóa?";
    let confirm = await sweetAlert2(text)
    if (confirm) {
      ajaxCallPost(`user-tool/delete?id=${id}`)
        .then(rs => {
          console.log(rs, 'success')
          toast.success('Xóa thành công')
          if (phanQuyen === "Admin") {
            getAllUser();
          } else {
            getAllUserByQuyen()
          }
        })
        .catch(err => {
          console.log(err, 'error')
        })
    } else {
      toast.success("Thank u")
    }

  }

  /**
* Lấy ra tất cả các user-tool có cùng mã tool với user-admin có quyền 
* xem mã tool đấy và render ra (thường dùng cho admin khi search và user-admin có phanQuyen đó)
*
* @param 
* @author HieuTN
*/


  const getAllUserByQuyen = () => {
    const quyenArr = getItemLocalStorage('dataQuyen');
    if (quyenArr.length === 1) {
      let dataa = []
      ajaxCallGet(`user-tool?queries=clMaTool=${quyenArr.join('')}`)
        .then(async rs => {
          console.log('get All by quyen')
          rs.map(item => {
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
            // setMainDataUser(dataa)

          })
          console.log(dataa)
          const action3 = changeTypeTabs(1);
          await dispatch(action3)

          const action2 = changeData(dataa)
          await dispatch(action2)
        })
    } else {
      let dataCurrent = [];
      quyenArr.map(quyen => {
        let dataa1 = [];
        ajaxCallGet(`user-tool?queries=clMaTool=${quyen}`)
          .then(async rs => {
            console.log('getAllUserByNhieuQuyen');
            rs.map(item => {
              dataa1.push(createData(
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
              ))
            })
            dataCurrent = [...dataCurrent, ...dataa1];
            const action3 = changeTypeTabs(1);
            await dispatch(action3)

            const action2 = changeData(dataCurrent)
            await dispatch(action2)
          })
      })
    }

  }

  const getAllUserByNhieuQuyen = () => {
    const quyenArr = getItemLocalStorage('dataQuyen');
    console.log(quyenArr.length);
    let dataCurrent = [];
    quyenArr.map(quyen => {
      let dataa1 = [];
      ajaxCallGet(`user-tool?queries=clMaTool=${quyen}`)
        .then(async rs => {
          console.log('getAllUserByNhieuQuyen');
          rs.map(item => {
            dataa1.push(createData(
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
            ))
          })
          dataCurrent = [...dataCurrent, ...dataa1];
          const action3 = changeTypeTabs(1);
          await dispatch(action3)

          const action2 = changeData(dataCurrent)
          await dispatch(action2)
        })
    })
  }

  /**
* Hàm lấy ra tất cả các user-tool
* dùng cho người có quyền cao nhất 
*
* @param 
* @author HieuTN
*/

  const getAllUser = () => {
    let dataa = []
    ajaxCallGet('user-tool/find-all')
      .then(rs => {
        console.log("get all admin")
        rs.data.map(item => {
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
          // setMainDataUser(dataa)
          // const action3 = changeTypeTabs(1);
          // dispatch(action3)
          // const action2 = changeData([createData(
          //   null ,
          //   null ,
          //   null ,
          //   null ,
          //   null ,
          //   null ,
          //   null ,
          //   null ,
          //   null ,
          //   null 
          // )])
          // dispatch(action2)
          const action4 = changeTypeTabs(1);
          dispatch(action4)
          const action2 = changeData(dataa)
          dispatch(action2)
        })
      })
  }


  /**
* Mở ra dialog thêm user-tool
*
* @param 
* @author HieuTN
*/
  const handleClickOpen = (id) => {
    setUserId(id);
    setOpen(true);
  };

  const handleClickOpenActivate = () => {
    setOpenActivate(true)
  }

  /**
* Đóng dialog thêm user-tool
*
* @param 
* @author HieuTN
*/

  const handleClose = () => {
    setOpen(false);
  };

  /**
* Mở ra dialog sửa user-tool
*
* @param 
* @author HieuTN
*/

  const handleClickOpenEdit = (id) => {
    setUserId(id);
    setOpenEdit(true);
    loadUserTool(id);
  };

  /**
   * Đóng dialog sửa user-tool
   *
   * @param 
   * @author HieuTN
   */

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  /**
* Mở dialog sửa nhiều user-tool cùng 1 lúc
*
* @param 
* @author HieuTN
*/

  const handleClickOpenEditGeneral = () => {
    setOpenEditGeneral(true);
  }


  /**
* Mở dialog sửa nhiều user-tool cùng 1 lúc
*
* @param 
* @author HieuTN
*/

  const handleCloseEditGeneral = () => {
    setOpenEditGeneral(false);
  };



  /**
* Lấy dữ liệu user-tool mỗi lần ta nhấn sửa
*
* @param 
* @author HieuTN
*/

  // Edit USer TOol
  const loadUserTool = (id) => {
    ajaxCallGet(`user-tool/${id}`)
      .then(rs => {
        setFullName(rs.clHoTen);
        setMail(rs.clGmail)
        setTenSanPham(rs.clTenSanPham)
        setMaTool([rs.clMaTool])
        setSoDienThoai(rs.clSdt)
        setChucVu(rs.clChucVu)
        setNoiLamViec(rs.clNoiLamViec)
        setNgayHetHan(rs.clNgayHetHan)
      })
  }

  /**
* Submit sửa
*
* @param 
* @author HieuTN
*/
  const handleSubmit = () => {
    ajaxCallGet(`user-tool/${userId}`)
      .then(rs => {
        console.log(rs)
        let data = {
          "clId": userId,
          "clMaThietBi": rs.clMaThietBi,
          "clMaTool": maTool.toString(),
          "clTenSanPham": tenSanPham,
          "clHoTen": fullName,
          "clSdt": soDienThoai,
          "clGmail": mail,
          "clChucVu": chucVu,
          "clNoiLamViec": noiLamViec,
          "clNgayDangKy": rs.clNgayDangKy,
          "clNgayHetHan": ngayHetHan,
          "clCheDo": rs.clCheDo,
          "clMatKhau": rs.clMatKhau,
          "clPhanMemChoPhep": rs.clPhanMemChoPhep,
          "clWebCanChan": rs.clWebCanChan,
          "clWebChoChay": rs.clWebChoChay,
          "clPmDaChan": rs.clPmDaChan,
          "clWebDaChan": rs.clWebDaChan,
          "clTrangThai": rs.clTrangThai,
          "clLichSuWeb": rs.clLichSuWeb,
          "clThoiGianBat": rs.clThoiGianBat,
          "clThoiGianTat": rs.clThoiGianTat,
        }

        ajaxCallPut('user-tool', data)
          .then(rs => {
            console.log(rs);
            toast.success('Sửa phiếu thành công')
            handleCloseEdit()
            if (phanQuyen === "Admin") {
              getAllUser();
            } else {
              getAllUserByQuyen()
            }
          })
          .catch(err => (console.log("error: ", err)))
      })


  }

  const isSelected = name => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0





  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      {/* <Button variant="outlined" onClick={handleClickOpen}>Add</Button> */}
      {/* <Button variant="outlined" onClick={handleClickOpenEditGeneral}>Edit General</Button> */}
      {phanQuyen !== "Admin" || <MenuFilter getAllUser={getAllUser} />}
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby='tableTitle'
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      // onClick={event => handleClickCheck(event, row.mathietbi)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.mathietbi + index}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          onClick={event => handleClickCheck(event, row.id)}
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell
                        style={{ 'whiteSpace': 'nowrap' }}
                      >
                        {row.hovaten}
                      </TableCell>
                      <TableCell align='center'>{row.matool}</TableCell>
                      <TableCell align='center'>{row.sdt}</TableCell>
                      <TableCell align='center'>
                        <input
                          type='date'
                          onChange={(e) => handleChangeNgayDangKy(e, row.id)}
                          defaultValue={row.ngaydangky}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <input
                          type='date'
                          onChange={(e) => handleChangeNgayHetHan(e, row.id)}
                          defaultValue={row.ngayhethan}
                        />
                      </TableCell>
                      <TableCell align='center'>
                          <Button style={{ color: '#f3341e', border: '1px solid #f3341e', marginRight: '15px' }} onClick={() => handleDelete(row.id)} variant="outlined" startIcon={<DeleteIcon />}>
                            Xóa
                          </Button>
                          <Button onClick={() => handleClickOpenEdit(row.id)} variant="contained" endIcon={<i style={{ color: '#fff' }} className="fas fa-edit"></i>}>Sửa</Button>
                      </TableCell>

                    </TableRow>
                  )
                })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 100, 1000]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <FormAddUserTool
        open={open}
        handleClose={handleClose}
        getAllUserByQuyen={getAllUserByQuyen}
        getAllUser={getAllUser}
      />
      <FormEditUserTool
        id={userId}
        open={openEdit}
        handleClose={handleCloseEdit}
        fullName={fullName}
        mail={mail}
        tenSanPham={tenSanPham}
        maTool={maTool}
        soDienThoai={soDienThoai}
        chucVu={chucVu}
        noiLamViec={noiLamViec}
        ngayHetHan={ngayHetHan}
        setFullName={setFullName}
        setMail={setMail}
        setTenSanPham={setTenSanPham}
        setMaTool={setMaTool}
        setSoDienThoai={setSoDienThoai}
        setChucVu={setChucVu}
        setNoiLamViec={setNoiLamViec}
        setNgayHetHan={setNgayHetHan}
        handleSubmit={handleSubmit}
      />
      <FormEditUserToolGeneral
        id={userId}
        open={openEditGeneral}
        handleClose={handleCloseEditGeneral}
        chucVu={chucVu}
        noiLamViec={noiLamViec}
        ngayDangKy={ngayDangKy}
        ngayHetHan={ngayHetHan}
        dataUserTool={dataUserTool}
        setChucVu={setChucVu}
        setNoiLamViec={setNoiLamViec}
        setNgayDangKy={setNgayDangKy}
        setNgayHetHan={setNgayHetHan}
        handleSubmit={handleSubmitEditGeneral} />
      <FormActivateKey
        openActivate={openActivate}
        setOpenActivate={setOpenActivate}
      />
    </Paper>
  )
}

