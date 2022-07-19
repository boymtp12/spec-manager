import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { ajaxCallGet, ajaxCallPost, ajaxCallPut, setItemLocalStorage, sweetAlert2 } from '../../libs/base';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Tab, Tabs, TextField } from '@mui/material';
import Header from '../Header'
import EditFormUserAdmin from './EditFormUserAdmin';
import { toast } from 'wc-toast';
import { EditLocationAltSharp } from '@mui/icons-material';
import FormAddUserAdmin from '../FormAddUserAdmin';
import FormAddQuyen from '../FormAddQuyen';
import FormListQuyen from '../FormListQuyen'
import ListIcon from '@mui/icons-material/List';

/**
* Tạo data render
*
* @param 
* @author HieuTN
*/

function createData(id, name, sdt, address, email, pass) {
    return {
        id,
        name,
        sdt,
        address,
        email,
        pass,
    };
}


// const rows = [
//   createData('Nguyen Tuan Anh', "0334689521", "Ha Noi", "hieu@gmail.com", "okeconbe"),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'ten',
        numeric: false,
        disablePadding: true,
        label: 'Tên',
    },
    {
        id: 'sdt',
        numeric: true,
        disablePadding: false,
        label: 'Số điện thoại',
    },
    {
        id: 'address',
        numeric: true,
        disablePadding: false,
        label: 'Địa chỉ'
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'pass',
        numeric: true,
        disablePadding: false,
        label: 'Mật khẩu',
    },
    {
        id: 'chucNang',
        numeric: true,
        disablePadding: false,
        label: 'Chức năng',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <React.Fragment>
            <Header />
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            style={{ whiteSpace: 'nowrap', textAlign: 'center' }}
                            align={headCell.numeric ? 'right' : 'left'}
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
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </React.Fragment>

    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function TableUserAdmin() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])

    const [ten, setTen] = React.useState('')
    const [sdt, setSdt] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')

    const [userId, setUserId] = React.useState('')

    // dialog edit
    const [open, setOpen] = React.useState(false);
    const [quyen, setQuyen] = React.useState([]);

    const [openAdd, setOpenAdd] = React.useState(false)
    const [openAddQuyen, setOpenAddQuyen] = React.useState(false)

    const [openList, setOpenList] = React.useState(false);

    //
    const [checked, setChecked] = React.useState([]);
    const [phanQuyen, setPhanQuyen] = React.useState([]);


    const EnhancedTableToolbar = (props) => {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Danh sách tài khoản
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <React.Fragment>
                        <Tooltip title='Delete' onClick={handleDeleteGeneral}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                ) : (
                    <>
                        <Tooltip title='Danh sách các quyền' onClick={handleOpenList}>
                            <IconButton>
                                <ListIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Thêm Quyền' onClick={handleOpenAddQuyen}>
                            <IconButton>
                                <AddBoxIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Thêm tài khoản" onClick={handleOpenAdd}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };


    /**
     * Submit để xóa dữ liệu admin has quyen cũ 
     * bị xóa đi và thêm admin has quyen mới vào
     *
     * @param 
     * @author HieuTN
     */


    const handleSubmitAdminHasQuyen = (id) => {
        ajaxCallPost(`admin-has-quyen/delete?idUser=${id}`)
            .then(rs => {
                checked.forEach((idQuyen => {
                    ajaxCallPost(`admin-has-quyen/save-new?idUser=${id}&idQuyen=${idQuyen}`)
                        .then(rs => {
                            console.log('rs: ', rs)
                        })
                        .catch(err => {
                            console.log('errr: ', err)
                        })
                }))
            })
            .catch(err => {
                console.log("err: ", err);
            })


    }


    /**
* Submit sửa
*
* @param 
* @author HieuTN
*/

    const handleSubmit = () => {
        const data = {
            id: userId,
            ten: ten,
            sdt: sdt,
            address: address,
            email: email,
            pass: pass,
        }

        ajaxCallPut('user-admin', data)
            .then(rs => {
                toast.success('Sửa Thành công')
                getAllUser();
                handleSubmitAdminHasQuyen(userId);
                handleClose();
            })
            .catch(err => (console.log("error: ", err)))
    }


    /**
* Muốn xóa được UserAdmin thì phải xóa quan hệ
* của nó với Quyền trước, vì thế ta gọi hàm
* handleDelete sau khi xóa được AdminHasQuyen
*
* @param 
* @author HieuTN
*/
    const handleDeleteAdminHasQuyen = async (id) => {
        const text = "Bạn có thực sự muốn xóa?";
        const confirm = await sweetAlert2(text);
        if (confirm) {
            ajaxCallPost(`admin-has-quyen/delete?idUser=${id}`)
                .then(rs => {
                    handleDelete(id);
                })
                .catch(err => {
                    console.log("err: ", err);
                })
        } else {
            toast.success('Thank u')
        }

    }

    /**
* Submit xóa
*
* @param 
* @author HieuTN
*/

    const handleDelete = (id) => {
        ajaxCallPost(`user-admin/delete?id=${id}`)
            .then(rs => {
                toast.success('Xóa thành công')
                getAllUser()
            })
            .catch(err => {
                toast.error(err);
            })
    }

    const handleDeleteGeneral = () => {
        toast.error('Chức năng này chưa được phát triển')
    }

    const getQuyen = () => {
        let data = [];
        ajaxCallGet(`quyen/find-all`)
            .then(rs => {
                console.log(rs.data);
                setQuyen(rs.data);
            })
    }

    const getUserAdminHasQuyen = (id) => {
        let dataId = [];
        let dataTenQuyen = [];
        ajaxCallGet(`admin-has-quyen?queries=id.userAdminId=${id}`)
            .then(rs => {
                rs.map((item) => {
                    dataId.push(item.id.quyenId);
                    dataTenQuyen.push(item.quyen.tenQuyen)
                })
                setChecked(dataId);
                setPhanQuyen(dataTenQuyen)
            })
            .catch(err => {
                console.log("err: ", err)
            })
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setUserId(id);
        ajaxCallGet(`user-admin/${id}`)
            .then(rs => {
                setTen(rs.ten)
                setSdt(rs.sdt)
                setAddress(rs.address)
                setEmail(rs.email)
                setPass(rs.pass)
            })
        getQuyen(id);
        setChecked([])
        getUserAdminHasQuyen(id);
    };

    const getAllUser = () => {
        let data = [];
        ajaxCallGet(`user-admin?queries=address`)
            .then(rs => {
                rs.map((item) => {
                    data.push(createData(item.id, item.ten, item.sdt, item.address, item.email, item.pass));
                })
                setRows(data);
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenAdd = () => {
        setOpenAdd(true);
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    }

    const handleOpenList = () => {
        setOpenList(true);
        getQuyen();
    }

    const handleCloseList = () => {
        setOpenList(false);
    }

    const handleOpenAddQuyen = () => {
        setOpenAddQuyen(true);
    }


    const handleCloseAddQuyen = () => {
        setOpenAddQuyen(false);
    }



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    React.useEffect(() => {
        let dataa = []
        ajaxCallGet(`user-admin?queries=address&queries=string`).then(rs => {
            rs.map(item => {
                dataa.push(
                    createData(
                        item.id,
                        item.ten,
                        item.sdt,
                        item.address,
                        item.email,
                        item.pass,
                    )
                )
            })
            setRows(dataa)

        })
    }, [])

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClickCheck = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '90%', maxWidth: '1900px', margin: '110px auto' }}
            className='body border rounded box-shadow-xl'
        >
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
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
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleClickCheck(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClickCheck(event, row.name)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                onClick={() => handleClickOpen(row.id)}
                                                align="center"
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                onClick={() => handleClickOpen(row.id)}
                                            >{row.sdt}</TableCell>
                                            <TableCell
                                                align="center"
                                                onClick={() => handleClickOpen(row.id)}
                                            >{row.address}</TableCell>
                                            <TableCell
                                                align="center"
                                                onClick={() => handleClickOpen(row.id)}
                                            >{row.email}</TableCell>
                                            <TableCell
                                                align="center"
                                                onClick={() => handleClickOpen(row.id)}
                                            >{row.pass}</TableCell>
                                            <TableCell align='center'>
                                                <Stack sx={{ justifyContent: 'center' }} direction="row" spacing={2}>
                                                    <Button style={{ color: '#f3341e', border: '1px solid #f3341e' }} onClick={() => handleDeleteAdminHasQuyen(row.id)} variant="outlined" startIcon={<DeleteIcon />}>
                                                        Xóa
                                                    </Button>
                                                    {/* <Link to={``}>
                                                        <Button onClick={() => handleClickOpen(row.id)} variant="contained" endIcon={<i style={{ color: '#fff' }} className="fas fa-edit"></i>}>Sửa</Button>
                                                    </Link> */}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />

            {/* dialog edit open */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <EditFormUserAdmin
                            ten={ten}
                            sdt={sdt}
                            address={address}
                            email={email}
                            pass={pass}
                            quyen={quyen}
                            checked={checked}
                            phanQuyen={phanQuyen}
                            setTen={setTen}
                            setSdt={setSdt}
                            setAddress={setAddress}
                            setEmail={setEmail}
                            setPass={setPass}
                            setChecked={setChecked}
                            setPhanQuyen={setPhanQuyen}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleSubmit}>Hoàn thành</Button>
                </DialogActions>
            </Dialog>

            <FormAddUserAdmin
                open={openAdd}
                handleClose={handleCloseAdd}
                getAllUser={getAllUser}
            />
            <FormAddQuyen
                open={openAddQuyen}
                handleClose={handleCloseAddQuyen} />
            <FormListQuyen
                open={openList}
                handleClose={handleCloseList}
                allQuyen={quyen}
                setAllQuyen={setQuyen}
            />
        </Box>

    );
}
