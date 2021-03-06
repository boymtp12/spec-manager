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
    const [names, setNames] = React.useState(() => {
        const localAllTool = getItemLocalStorage('all-tool')
        return localAllTool;

    })

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
                        handleClose();
                        resetData();
                        getAllUser();
                    })
                    .catch(err => {
                        toast.error('Th??m ng?????i d??ng th???t b???i')
                        console.log(err);
                        resetData();
                    })

            })
            toast.success('Th??m ng?????i d??ng th??nh c??ng');

        } else {
            for (let i in maTool) {
                let data = {
                    "clMaThietBi": "",
                    "clMaTool": maTool[i],
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
                        // console.log(rs);
                        handleClose();
                        resetData();
                        getAllUserByQuyen()
                    })
                    .catch(err => {
                        toast.error('Th??m ng?????i d??ng th???t b???i')
                        console.log(err);
                        resetData();
                    })
                }
                toast.success('Th??m ng?????i d??ng th??nh c??ng');
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
                <DialogTitle>Th??m ng?????i d??ng</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <>
                            {phanQuyen.join('') === "Admin" ? <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-name-label">M?? tool</InputLabel>
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
                            </FormControl> : <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-name-label">M?? tool</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={maTool === "" ? phanQuyen : maTool}
                                    onChange={handleChangeInMultiple}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {phanQuyen.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, maTool, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>}
                            {/* <TextField
                                title="B???n ch??? ???????c th??m 1 lo???i m?? Tool m?? b???n ???????c Admin c???p quy???n"
                                label="M?? Tool"
                                id="outlined-start-adornment"
                                value={maTool === "" ? phanQuyen : maTool}
                                onChange={e => setMaTool(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fab fa-codepen"></i></InputAdornment>,
                                }}
                            />  */}

                            <TextField
                                label="H??? t??n"
                                id="outlined-start-adornment"
                                value={ten}
                                onChange={e => setTen(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-file-signature"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="S??? ??i???n tho???i"
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
                                label="Ch???c v???"
                                id="outlined-start-adornment"
                                value={chucVu}
                                onChange={e => setChucVu(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-briefcase"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="N??i l??m vi???c"
                                id="outlined-start-adornment"
                                value={noiLamViec}
                                onChange={e => setNoiLamViec(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-building"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Ng??y ????ng k??"
                                value={ngayDangKy}
                                onChange={(e) => setNgayDangKy(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                                focused
                            />
                            <TextField
                                label="Ng??y h???t h???n"
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
                    <Button onClick={handleClose}>Tho??t</Button>
                    <Button onClick={handleSubmit}>Ho??n th??nh</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}