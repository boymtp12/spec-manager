import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { ajaxCallPost, getItemLocalStorage } from '../libs/base';
import { toast } from 'wc-toast';
import { useTheme } from '@mui/material/styles';


export default function FormAddUserTool({ open, handleClose, getAllUserByQuyen, getAllUser }) {
    const phanQuyen = getItemLocalStorage('dataQuyen');

    const [maTool, setMaTool] = React.useState([])
    const [ten, setTen] = React.useState('')
    const [soDienThoai, setSoDienThoai] = React.useState('')
    const [gmail, setGmail] = React.useState('')
    const [chucVu, setChucVu] = React.useState('')
    const [noiLamViec, setNoiLamViec] = React.useState('')
    const [ngayHetHan, setNgayHetHan] = React.useState('')
    const [ngayDangKy, setNgayDangKy] = React.useState('')

    // start multiple Select
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, maTool, theme) {
        return {
            fontWeight:
                maTool.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();

    const handleChangeInMultiple = (event) => {
        const {
            target: { value },
        } = event;
        setMaTool(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const names = getItemLocalStorage('all-tool')



    const handleSubmit = () => {
        if (phanQuyen.join('') === "Admin") {
            maTool.forEach((tool, index) => {
                let data = {
                    "clMaThietBi": "",
                    "clMaTool": tool,
                    "clTenSanPham": "",
                    "clHoTen": ten,
                    "clSdt": soDienThoai,
                    "clGmail": gmail,
                    "clChucVu": chucVu,
                    "clNoiLamViec": noiLamViec,
                    "clNgayDangKy": ngayDangKy,
                    "clNgayHetHan": ngayHetHan,
                    "clCheDo": "",
                    "clMatKhau": "",
                    "clPhanMemChoPhep": "",
                    "clWebCanChan": "",
                    "clWebChoChay": "",
                    "clPmDaChan": "",
                    "clWebDaChan": "",
                    "clTrangThai": "",
                    "clLichSuWeb": "",
                    "clThoiGianBat": "",
                    "clThoiGianTat": ""
                }
                ajaxCallPost(`user-tool`, data)
                    .then(rs => {
                        console.log(rs);
                        handleClose();
                        resetData();
                        if (phanQuyen.join('') === "Admin") {
                            getAllUser();
                        } else {
                            getAllUserByQuyen()
                        }
                    })
                    .catch(err => {
                        toast.error('Thêm người dùng thất bại')
                        console.log(err);
                        resetData();
                    })

            })
            toast.success('Thêm người dùng thành công');

        } else {
            let data = {
                "clMaThietBi": "",
                "clMaTool": phanQuyen.join(''),
                "clTenSanPham": "",
                "clHoTen": ten,
                "clSdt": soDienThoai,
                "clGmail": gmail,
                "clChucVu": chucVu,
                "clNoiLamViec": noiLamViec,
                "clNgayDangKy": ngayDangKy,
                "clNgayHetHan": ngayHetHan,
                "clCheDo": "",
                "clMatKhau": "",
                "clPhanMemChoPhep": "",
                "clWebCanChan": "",
                "clWebChoChay": "",
                "clPmDaChan": "",
                "clWebDaChan": "",
                "clTrangThai": "",
                "clLichSuWeb": "",
                "clThoiGianBat": "",
                "clThoiGianTat": ""
            }
            ajaxCallPost(`user-tool`, data)
                .then(rs => {
                    console.log(rs);
                    handleClose();
                    resetData();
                    toast.success('Thêm người dùng thành công');
                    if (phanQuyen.join('') === "Admin") {
                        getAllUser();
                    } else {
                        getAllUserByQuyen()
                    }
                })
                .catch(err => {
                    toast.error('Thêm người dùng thất bại')
                    console.log(err);
                    resetData();
                })
        }




    }


    const resetData = () => {
        setTen('')
        setSoDienThoai('')
        setGmail('')
        setChucVu('')
        setNoiLamViec('')
        setNgayHetHan('')
        setNgayDangKy('')
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <>
                            {phanQuyen.join('') === "Admin" ? <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-name-label">Mã tool</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={maTool === "" ? phanQuyen : maTool}
                                    onChange={handleChangeInMultiple}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, maTool, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl> : <TextField
                                title="Bạn chỉ được thêm 1 loại mã Tool mà bạn được Admin cấp quyền"
                                label="Mã Tool"
                                disabled
                                id="outlined-start-adornment"
                                value={phanQuyen.join('')}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fab fa-codepen"></i></InputAdornment>,
                                }}
                            />}
                            {/* <TextField
                                title="Bạn chỉ được thêm 1 loại mã Tool mà bạn được Admin cấp quyền"
                                label="Mã Tool"
                                id="outlined-start-adornment"
                                value={maTool === "" ? phanQuyen : maTool}
                                onChange={e => setMaTool(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fab fa-codepen"></i></InputAdornment>,
                                }}
                            />  */}

                            <TextField
                                label="Họ tên"
                                id="outlined-start-adornment"
                                value={ten}
                                onChange={e => setTen(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-file-signature"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Số điện thoại"
                                id="outlined-start-adornment"
                                value={soDienThoai}
                                onChange={e => setSoDienThoai(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-phone"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Gmail"
                                id="outlined-start-adornment"
                                value={gmail}
                                onChange={e => setGmail(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-envelope"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Chức vụ"
                                id="outlined-start-adornment"
                                value={chucVu}
                                onChange={e => setChucVu(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-briefcase"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Nơi làm việc"
                                id="outlined-start-adornment"
                                value={noiLamViec}
                                onChange={e => setNoiLamViec(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-building"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Ngày đăng ký"
                                value={ngayDangKy}
                                onChange={(e) => setNgayDangKy(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                                focused
                            />
                            <TextField
                                label="Ngày hết hạn"
                                value={ngayHetHan}
                                onChange={(e) => setNgayHetHan(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                                focused
                            />

                        </>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleSubmit}>Hoàn thành</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}