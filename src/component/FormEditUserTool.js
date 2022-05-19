import * as React from 'react';
import { useState, useEffect } from 'react'
import { ajaxCallGet, ajaxCallPost, getItemLocalStorage } from '../libs/base';
import "./../css_main/css/edit.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import { toast } from 'wc-toast'
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
// Multiple Select
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, TextField } from '@mui/material';


const FormEditUserTool = ({ id, open, handleClose,fullName,
    mail,
    tenSanPham,
    maTool,
    soDienThoai,
    chucVu,
    noiLamViec,
    ngayHetHan,
    setFullName,
    setMail,
    setTenSanPham,
    setMaTool,
    setSoDienThoai,
    setChucVu,
    setNoiLamViec,
    setNgayHetHan,
    handleSubmit }) => {
    

    // Start multipleSelect

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


    const names = getItemLocalStorage("all-tool");


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

    // End MultipleSelect

    

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
                                label="Tên người dùng"
                                id="outlined-start-adornment"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fab fa-codepen"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Email"
                                id="outlined-start-adornment"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fab fa-codepen"></i></InputAdornment>,
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
                                label="Số điện thoại"
                                id="outlined-start-adornment"
                                value={soDienThoai}
                                onChange={(e) => setSoDienThoai(e.target.value)}
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
                                label="Ngày hết hạn"
                                value={ngayHetHan}
                                onChange={(e) => setNgayHetHan(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                            />
                            <FormControl sx={{ m: 1, width: 160 }}>
                                <InputLabel id="demo-multiple-name-label">Mã tool</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={maTool}
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
                            </FormControl>

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
export default FormEditUserTool;