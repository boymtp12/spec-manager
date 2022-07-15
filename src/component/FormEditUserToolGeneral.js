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
    ngayHetHan,
    setNgayHetHan,
    handleSubmit }) => {



    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div>
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