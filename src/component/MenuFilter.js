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
import FilterListIcon from '@mui/icons-material/FilterList'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button } from '@mui/material';

export default function MenuFilter() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const allTool = getItemLocalStorage('all-tool')

    const dispatch = useDispatch()

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChoseTool = (e) => {
        console.log(e)
        setAnchorEl(null);
    }

    const [checked, setChecked] = React.useState([]);
    const [tenTool, setTenTool] = React.useState([]);

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

    React.useEffect(() => {
        console.log(tenTool);
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
                const action2 = changeData(toolData)
                await dispatch(action2)
            })
        } else {
            tenTool.forEach((tool, index) => {
                console.log(tenTool);
                ajaxCallGet(`user-tool?queries=clMaTool=${tool}`).then(async rss => {

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
                    allToolData = [...allToolData, ...toolData];
                    const action3 = changeTypeTabs(1);
                    await dispatch(action3)
                    const action2 = changeData(allToolData)
                    await dispatch(action2)
                })


            })
        }
    }, [tenTool])

    return (
        <div>
            <Button
                title='Filter list'
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Filter List
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
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {allTool.map((value, index) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <AccountBoxIcon />
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={handleToggle(index, value)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(index) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Menu>
        </div>
    );
}
