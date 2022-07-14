import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { ajaxCallGet, ajaxCallPost, sweetAlert2 } from '../libs/base';
import { toast } from 'wc-toast';

// function generate(element) {
//     return [0, 1, 2].map((value) =>
//         React.cloneElement(element, {
//             key: value,
//         }),
//     );
// }

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


export default function FormDialog({ open, handleClose, allQuyen, setAllQuyen }) {

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                {/* <DialogTitle>Subscribe</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <InteractiveList
                        allQuyen={allQuyen}
                        setAllQuyen={setAllQuyen}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const InteractiveList = ({ allQuyen, setAllQuyen }) => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);



    const handleDeleteQuyen = async (id) => {
        const text = "Bạn có thực sự muốn xóa?";
        ajaxCallPost(`quyen/delete?id=${id}`)
            .then(rs => {
                // console.log(rs);
                toast.success('Xóa thành công!');
                getAllQuyen();
            })
            .catch(err => {
                // console.log(err);
                toast.error('Xóa thất bại @@')
            })

    }

    const getAllQuyen = () => {
        let dataa = [];
        ajaxCallGet(`quyen/find-all`)
            .then(rs => {
                rs.data.map(item => {
                    // console.log(item)
                    dataa.push(item);
                })
                setAllQuyen(dataa);
            })
    }

    return (
        <box>
            <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 2, mb: 2, minWidth: "350px" }} variant="h6" component="div">
                    Danh sách Quyền
                </Typography>
                <Demo>
                    <List dense={dense}>
                        {allQuyen.map((item, index) => {
                            return (
                                <ListItem key={index}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon
                                                onClick={() => handleDeleteQuyen(item.id)}
                                            />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.tenQuyen}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </Demo>
            </Grid>
        </box>
    )
}
