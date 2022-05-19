import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputAdornment } from '@mui/material';
import { ajaxCallPost } from '../libs/base';
import { toast } from 'wc-toast';


export default function FormAddUserTool({ open, handleClose }) {

    const [maTool, setMaTool] = React.useState('')
    const [ten, setTen] = React.useState('')
    const [soDienThoai, setSoDienThoai] = React.useState('')
    const [gmail, setGmail] = React.useState('')
    const [chucVu, setChucVu] = React.useState('')
    const [noiLamViec, setNoiLamViec] = React.useState('')
    const [ngayHetHan, setNgayHetHan] = React.useState()
    const [ngayDangKy, setNgayDangKy] = React.useState()

    const handleSubmit = () => {
        console.log({maTool, ten, soDienThoai, gmail, chucVu, noiLamViec, ngayDangKy, ngayHetHan })
        let data = {
            "clMaThietBi": "",
            "clMaTool": maTool,
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
                toast.success('Thêm người dùng thành công')
                handleClose();
            })
            .catch(err => {
                toast.error('Thêm người dùng thất bại')
                console.log(err);
                resetData();
            })

    }

    const resetData = () => {
        setMaTool('')
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <TextField
                                label="Mã Tool"
                                id="outlined-start-adornment"
                                value={maTool}
                                onChange={e => setMaTool(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fab fa-codepen"></i></InputAdornment>,
                                }}
                            />
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
                                onChange={e => setNgayDangKy(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                            />
                            <TextField
                                label="Ngày hết hạn"
                                value={ngayHetHan}
                                onChange={e => setNgayHetHan(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                            />

                        </div>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}