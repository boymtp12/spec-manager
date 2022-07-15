import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Input, InputAdornment } from '@mui/material';
import { ajaxCallPost, getItemLocalStorage } from '../libs/base';
import { toast } from 'wc-toast';


export default function FormAddUserAdmin({ open, handleClose, getAllUser }) {
    const phanQuyen = getItemLocalStorage('dataQuyen').join('')

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleSubmit = () => {
        let userData = {
            'ten': name,
            'sdt': number,
            'email': email,
            'address': address,
            'pass': password
        }
        ajaxCallPost(`user-admin/save-new`, userData)
            .then(rs => {
                toast.success('Thêm User Admin thành công');
                handleClose();
                getAllUser();
                clearDataAfterSubmit();
            })
            .catch(err => {
                toast.error('Thêm User Admin thất bại')
                console.log(err);
                clearDataAfterSubmit();
            })

    }


    const clearDataAfterSubmit = () => {
        setName('')
        setEmail('')
        setPassword('')
        setNumber('')
        setAddress('')
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm User Admin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <>
                            <TextField
                                label="Họ tên"
                                id="outlined-start-adornment"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-file-signature"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Số điện thoại"
                                id="outlined-start-adornment"
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-phone"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Email"
                                id="outlined-start-adornment"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-envelope"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Mật khẩu"
                                id="outlined-start-adornment"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-key"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Địa chỉ"
                                id="outlined-start-adornment"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="far fa-address-card"></i></InputAdornment>,
                                }}
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