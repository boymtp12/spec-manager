import * as React from 'react';
import $ from 'jquery'
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
    const [maThietBi, setMaThietBi] = React.useState('');
    const [keyActivate, setKeyActivate] = React.useState('');
    const [name, setName] = React.useState('');
    const [sdt, setSdt] = React.useState('');


    const handleClose = () => {
        clearData();
        setOpenActivate(false);
    };

    const onChangeMaThietBi = (e) => {
        $('.btnCopy').text('Copy')
        setMaThietBi(e.target.value);
    }

    const onChangeName = (e) => {
        $('.btnCopy').text('Copy')
        setName(e.target.value);
    }
    const onChangeSdt = (e) => {
        $('.btnCopy').text('Copy')
        setSdt(e.target.value);
    }

    const handleActivate = () => {
        setKeyActivate(tinhTong(maThietBi));
        $('.btnCopy').css('display', 'inline-block');
    }

    const clearData = () => {
        setMaThietBi('');
        setKeyActivate('');
        setName('');
        setSdt('');
    }

    async function handleCopy(text) {
        try {
          await navigator.clipboard.writeText(text);
          $('.btnCopy').text('Copied')
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }


    return (
        <div>
            <Dialog sx={{ height: '70%' }} open={openActivate} onClose={handleClose}>
                <DialogTitle style={{ widht: '100%', display: 'flex', justifyContent: 'space-between' }}><div>Kích hoạt Key</div>
                    <div><Button style={{ display: 'none' }} className="btnCopy" onClick={e => handleCopy(`${name}_${sdt}_${keyActivate}`)}>Copy</Button></div>
                </DialogTitle>

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
                            onChange={(e) => onChangeMaThietBi(e)}
                            label="Mã thiết bị"
                            variant="outlined" />
                        <TextField
                            sx={{ m: 1, width: '250px' }}
                            value={name}
                            onChange={(e) => onChangeName(e)}
                            id="outlined-basic"
                            label="Họ tên"
                            variant="outlined" />
                        <TextField
                            sx={{ m: 1, width: '250px' }}
                            value={sdt}
                            onChange={(e) => onChangeSdt(e)}
                            id="outlined-basic"
                            label="Số điện thoại"
                            variant="outlined" />
                        <TextField id="outlined-basic"
                            sx={{ m: 1, width: '250px' }}
                            value={keyActivate}
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

