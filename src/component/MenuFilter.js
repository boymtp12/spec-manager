import * as React from 'react';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { ajaxCallGet, createData, getItemLocalStorage } from '../libs/base';
import { changeData, changeTypeTabs } from '../reducer_action/DataUserToolReducerAction';
import { useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button, TextField } from '@mui/material';
import { toast } from 'wc-toast';
import MediaQuery from "react-responsive";


export default function MenuFilter({ tenTool, setTenTool, checked, setChecked }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const allTool = getItemLocalStorage('all-tool')

    const dispatch = useDispatch()
    const itemList = React.useRef()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChoseTool = (e) => {
        setAnchorEl(null);
    }

    const [searchTerm, setSearchTerm] = React.useState('');

    const heightFilterList = 50 * Math.floor(allTool.length / 2);
    const widhtFilterList = 500;


    const handleToggle = (id, tool) => () => {
        const currentIndex = checked.indexOf(id);
        const currentIndex2 = tenTool.indexOf(tool);


        const newChecked = [...checked];
        const newTenTool = [...tenTool];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        if (currentIndex2 === -1) {
            newTenTool.push(tool);
        } else {
            newTenTool.splice(currentIndex2, 1)
        }

        setChecked(newChecked);
        setTenTool(newTenTool)
    };


    const handleChangeSearchInput = (e) => {
        setSearchTerm(e.target.value);

    }


    React.useEffect(() => {
        let toolData = [];
        let allToolData = [];
        if (tenTool.length === 0) {
            ajaxCallGet(`user-tool/find-all`).then(async rss => {
                rss.data.map((rs, index) => {
                    let infoUserTool = createData(rs.clId,
                        rs.clMaThietBi,
                        rs.clMaTool,
                        rs.clHoTen,
                        rs.clSdt,
                        rs.clGmail,
                        rs.clChucVu,
                        rs.clNoiLamViec,
                        rs.clNgayDangKy,
                        rs.clNgayHetHan)
                    toolData.push(infoUserTool);
                })

                const action3 = changeTypeTabs(1);
                await dispatch(action3)
                const action2 = changeData([...toolData])
                await dispatch(action2)
            })
        } else {
            tenTool.forEach((tool, index) => {
                ajaxCallGet(`user-tool?queries=clMaTool=${tool}&sort=clId-desc`).then(async rss => {

                    rss.map((rs, index) => {
                        let infoUserTool = createData(rs.clId,
                            rs.clMaThietBi,
                            rs.clMaTool,
                            rs.clHoTen,
                            rs.clSdt,
                            rs.clGmail,
                            rs.clChucVu,
                            rs.clNoiLamViec,
                            rs.clNgayDangKy,
                            rs.clNgayHetHan)
                        toolData.push(infoUserTool);
                    })
                    allToolData = [...toolData];

                    if (allToolData.length !== 0) {
                        const action3 = changeTypeTabs(1);
                        await dispatch(action3)
                        const action2 = changeData([...allToolData])
                        await dispatch(action2)
                    } else {
                        toast.error(`${tool} không có dữ liệu!`)
                    }

                    // const action3 = changeTypeTabs(1);
                    // await dispatch(action3)
                    // const action2 = changeData([...allToolData])
                    // await dispatch(action2)
                })


            })
        }
    }, [tenTool])

    return (
        <div>
            <Button
                title='Lọc mã'
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                style={{ marginLeft: '16px' }}
                endIcon={<KeyboardArrowDownIcon />
                }
            >
                Lọc mã
            </Button>
            {/* <Tooltip title='Filter list'>
                <IconButton>
                    <FilterListIcon
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        onClick={handleClick}
                    />
                </IconButton>
            </Tooltip> */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >


                <MediaQuery minWidth='600px'>
                    <List sx={{ display: 'flex', maxHeight: `${heightFilterList + 60}px`, flexWrap: 'wrap', width: `${widhtFilterList}px`, bgcolor: 'background.paper' }} >
                        <TextField
                            value={searchTerm}
                            onChange={e => handleChangeSearchInput(e)}
                            sx={{ marginLeft: '15px', width: '95%' }} id="outlined-basic" label="Tìm kiếm" variant="outlined" />

                        {allTool.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((value, index) => {

                            const labelId = `checkbox-list-label-${value}`;


                            return (
                                <div>
                                    <ListItem
                                        sx={{ width: '250px' }}
                                        key={index}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <AccountBoxIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton ref={itemList} role={undefined} onClick={handleToggle(index, value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={tenTool.includes(value)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value} />
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                </MediaQuery>
                <MediaQuery maxWidth='599px'>
                    <List sx={{ maxWidth: '350px', bgcolor: 'background.paper' }} >
                        <TextField
                            value={searchTerm}
                            onChange={e => handleChangeSearchInput(e)}
                            sx={{ marginLeft: '15px', width: '90%' }} id="outlined-basic" label="Tìm kiếm" variant="outlined" />

                        {allTool.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        }).map((value, index) => {

                            const labelId = `checkbox-list-label-${value}`;


                            return (
                                <div>
                                    <ListItem
                                        sx={{ width: '250px' }}
                                        key={index}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <AccountBoxIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton ref={itemList} role={undefined} onClick={handleToggle(index, value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={tenTool.includes(value)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value} />
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                </MediaQuery>

            </Menu>
        </div>
    );
}
