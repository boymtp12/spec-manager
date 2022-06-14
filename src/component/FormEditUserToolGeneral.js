import * as React from 'react';
import { useState, useEffect } from 'react'
import { ajaxCallGet, ajaxCallPost, getItemLocalStorage } from '../libs/base';
import "./../css_main/css/edit.css"
import $ from 'jquery'
import { toast } from 'wc-toast'
import Button from '@mui/material/Button';
// Multiple Select
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, TextField } from '@mui/material';


const FormEditUserToolGeneral = ({ id,
    open,
    handleClose,
    chucVu,
    noiLamViec,
    ngayDangKy,
    ngayHetHan,
    setChucVu,
    setNoiLamViec,
    setNgayDangKy,
    setNgayHetHan,
    handleSubmit }) => {

    

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <TextField
                                label="Chức vụ"
                                id="outlined-start-adornment"
                                value={chucVu}
                                onChange={(e) => setChucVu(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-envelope"></i></InputAdornment>,
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
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )



}
export default FormEditUserToolGeneral;