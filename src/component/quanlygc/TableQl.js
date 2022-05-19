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
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { ajaxCallGet, ajaxCallPost, URL_API_GET } from './../../libs/base'
import { toast } from 'wc-toast'

import FormEditUserTool from '../FormEditUserTool'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import FormAddUserTool from '../FormAddUserTool'

import Edit from '../Edit'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { changeData } from '../../reducer_action/DataUserToolReducerAction'


const userToolContext = React.createContext()

function createData (
  id,
  mathietbi,
  matool,
  hovaten,
  sdt,
  gmail,
  chucvu,
  noilamviec,
  ngaydangky,
  ngayhethan
) {
  return {
    id,
    mathietbi,
    matool,
    hovaten,
    sdt,
    chucvu,
    gmail,
    noilamviec,
    ngaydangky,
    ngayhethan
  }
}

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort (array, comparator) {
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
    mWidth: "minWidth: '250px'"
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

function EnhancedTableHead (props) {
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
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}

    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

export default function TableQl (props) {
  const [order, setOrder] = React.useState('asc')
  const [rows, setRows] = React.useState([])
  const [typee, setTypee] = React.useState(props.type)

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

  const [userId, setUserId] = React.useState('')

  const [fullName, setFullName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [tenSanPham, setTenSanPham] = React.useState('');
  const [maTool, setMaTool] = React.useState([]);
  const [soDienThoai, setSoDienThoai] = React.useState('');
  const [chucVu, setChucVu] = React.useState('');
  const [noiLamViec, setNoiLamViec] = React.useState('');
  const [ngayHetHan, setNgayHetHan] = React.useState('');



  React.useEffect(() => {
    let arr = mainDataUser
    let date = new Date()
    switch (typee) {
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

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.mathietbi)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
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

  const handleChangeResDate = (e, id) => {
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
    })
  }

  const handleChangeEndDate = (e, id) => {
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
    })
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const handleDelete = id => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(
      `http://localhost:9667/api/v1/private-edit/user-tool/delete?id=${id}`,
      options
    )
      .then(response => response.json())
      .then(rs => {
        console.log(rs, 'success')
        toast.success('Xóa thành công')
        getAllUser()
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }

  const getAllUser = () => {
    let dataa = []
    fetch(URL_API_GET + 'user-tool?queries=clMaTool=GoodChild')
      .then(rs => rs.json())
      .then(rs => {
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
          const action2 = changeData(dataa)
          dispatch(action2)
        })
      })
  }


  const handleClickOpen = (id) => {
    setUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = (id) => {
    setUserId(id);
    setOpenEdit(true);
    loadUserTool(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };


  // Edit USer TOol
  const loadUserTool = (id) => {
    ajaxCallGet(`user-tool/${id}`)
      .then(rs => {
        console.log(rs.clMaTool);
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

  console.log(userId)
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

        ajaxCallPost('user-tool', data)
          .then(rs => {
            console.log(rs);
            toast.success('Sửa phiếu thành công')
            handleCloseEdit()
            getAllUser()
          })
          .catch(err => (console.log("error: ", err)))
      })


  }

  const isSelected = name => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0


  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Button variant="outlined" onClick={handleClickOpen}>Add</Button>
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
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.mathietbi)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    // onClick={event => handleClick(event, row.mathietbi)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.mathietbi}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
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
                    <TableCell>{row.sdt}</TableCell>
                    <TableCell align='center'>
                      <input
                        type='date'
                        onChange={(e) => handleChangeResDate(e, row.id)}
                        defaultValue={row.ngaydangky}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <input
                        type='date'
                        onChange={(e) => handleChangeEndDate(e, row.id)}
                        defaultValue={row.ngayhethan}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Stack direction="row" spacing={2}>
                        <Button style={{ color: '#f3341e', border: '1px solid #f3341e' }} onClick={() => handleDelete(row.id)} variant="outlined" startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                        <Button onClick={() => handleClickOpenEdit(row.id)} variant="contained" endIcon={<i style={{ color: '#fff' }} className="fas fa-edit"></i>}>Edit</Button>
                      </Stack>
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
    </Paper>
  )
}

