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


const FormEditUserTool = ({ id, open, handleClose, fullName,
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

    const phanQuyen = getItemLocalStorage('dataQuyen');

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
    const names = getItemLocalStorage('all-tool')


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ch???nh s???a ng?????i d??ng</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <>
                            <TextField
                                label="T??n ng?????i d??ng"
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
                                label="Ch???c v???"
                                id="outlined-start-adornment"
                                value={chucVu}
                                onChange={(e) => setChucVu(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-envelope"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="T??n s???n ph???m"
                                id="outlined-start-adornment"
                                value={tenSanPham}
                                onChange={(e) => setTenSanPham(e.target.value)}
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
                                label="Ng??y h???t h???n"
                                value={ngayHetHan}
                                onChange={(e) => setNgayHetHan(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                type="date"
                            />
                            {phanQuyen.join('') === "Admin" ? <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-name-label">M?? tool</InputLabel>
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
                            </FormControl> :
                                <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-name-label">M?? tool</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={maTool}
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
                            </FormControl>
                            }


                        </>
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