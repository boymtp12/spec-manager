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
import { toast } from 'wc-toast';

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

    // async function copyToClipboard(text) {
    //     try {
    //         await navigator.clipboard.writeText(text);
    //         $('.btnCopy').text('Copied')
    //     } catch (err) {
    //         console.error('Failed to copy: ', err);
    //     }
    // }

    function copyToClipboard(id1, id2, id3) {
        let copyText1 = document.getElementById(id1)
        let copyText2 = document.getElementById(id2)
        let copyText3 = document.getElementById(id3)
        let copyText = copyText1.value + '_' + copyText2.value + '_' + copyText3.value;
        copyText1.select()
        copyText1.setSelectionRange(0, 99999)
        copyText2.select()
        copyText2.setSelectionRange(0, 99999)
        copyText3.select()
        copyText3.setSelectionRange(0, 99999)
        navigator.clipboard
            .writeText(copyText)
            .then(() => {
                $('.btnCopy').text('Copied')
                toast.success('Đã coppy vào clipboard')
            })
            .catch(error => {
                toast.error(`Copy failed!`)
            })
    }

    // function copyToClipboard(text) {
    //     navigator.clipboard.writeText(text).then(() => {
    //         toast.success("Đã coppy vào clipboard");
    //         $('.btnCopy').text('Copied')
    //     }).catch((error) => {
    //         toast.error(`Copy failed!`)
    //     })
    // }

    // const copyToClipboard = (text) => {
    //     window.prompt("Nhấn Ctrl + C, Enter", text);
    // }

    return (
        <div>
            <Dialog sx={{ height: '70%' }} open={openActivate} onClose={handleClose}>
                <DialogTitle style={{ widht: '100%', display: 'flex', justifyContent: 'space-between' }}><div>Kích hoạt Key</div>
                    <div><Button style={{ display: 'none' }} className="btnCopy" onClick={e => copyToClipboard('text_active_name', 'text_active_sdt', 'text_active_key')}>Copy</Button></div>
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
                            id="text_active_name"
                            label="Họ tên"
                            variant="outlined" />
                        <TextField
                            sx={{ m: 1, width: '250px' }}
                            value={sdt}
                            onChange={(e) => onChangeSdt(e)}
                            id="text_active_sdt"
                            label="Số điện thoại"
                            variant="outlined" />
                        <TextField
                            sx={{ m: 1, width: '250px' }}
                            value={keyActivate}
                            label="Key"
                            id="text_active_key"
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

