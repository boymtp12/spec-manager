import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { tinhTong } from '../libs/base';

export default function FormActivateKey({ openActivate, setOpenActivate }) {
    const [maThietBi, setMaThietBi] = React.useState('')
    const [keyActivate, setKeyActivate] = React.useState('')


    const handleClose = () => {
        setOpenActivate(false);
        clearData();
    };

    const handleActivate = () => {
        setKeyActivate(tinhTong(maThietBi));
        // console.log(maThietBi[0])
    }

    const clearData = () => {
        setMaThietBi('');
        setKeyActivate('');
    }

    return (
        <div>
            <Dialog sx={{ height: '70%' }} open={openActivate} onClose={handleClose}>
                <DialogTitle>Kích hoạt Key</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <Box
                        component="form"
                        sx={{ m: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic"
                            sx={{ m: 1, width: '250px' }}
                            value={maThietBi}
                            onChange={(e) => setMaThietBi(e.target.value)}
                            label="Mã thiết bị"
                            variant="outlined" />
                        <TextField sx={{ m: 1, width: '250px' }} id="outlined-basic" label="Họ tên" variant="outlined" />
                        <TextField sx={{ m: 1, width: '250px' }} id="outlined-basic" label="Số điện thoại" variant="outlined" />
                        <TextField id="outlined-basic"
                            sx={{ m: 1, width: '250px' }}
                            value={keyActivate}
                            onChange={(e) => setKeyActivate(e.target.value)}
                            label="Key"
                            variant="outlined" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleActivate}>Kích hoạt</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

