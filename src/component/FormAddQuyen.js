import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Input, InputAdornment } from '@mui/material';
import { ajaxCallPost, getItemLocalStorage, ajaxCallPut } from '../libs/base';
import { toast } from 'wc-toast';


export default function FormAddQuyen({ open, handleClose }) {

    const [quyen, setQuyen] = React.useState('');
    const [note, setNote] = React.useState('');

    const handleSubmit = () => {
        let data = {
            'tenQuyen': quyen,
            'ghiChu': note
        }
        ajaxCallPost(`quyen/save-new`, data)
            .then(rs => {
                toast.success('Thêm quyền thành công');
                handleClose();
                clearDataAfterSubmit();
            })
            .catch(err => {
                toast.error('Thêm quyền thất bại')
                console.log(err);
                clearDataAfterSubmit();
            })

    }


    const clearDataAfterSubmit = () => {
        setQuyen('');
        setNote('');
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm Quyền</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div>
                            <TextField
                                label="Tên quyền"
                                id="outlined-start-adornment"
                                value={quyen}
                                onChange={e => setQuyen(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-file-signature"></i></InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Ghi chú"
                                id="outlined-start-adornment"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                sx={{ m: 1, width: '250px' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><i className="fas fa-file-signature"></i></InputAdornment>,
                                }}
                            />
                        </div>
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