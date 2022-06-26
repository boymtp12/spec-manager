import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import { ajaxCallGet, getItemLocalStorage, setItemLocalStorage } from '../../libs/base';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

/**
 * Insert text at cursor position.
 *
 * @param {string} ...pass, {array} checked phanQuyen
 * @author HieuTN
 */
export default function EditFormUserAdmin({
    ten,
    sdt,
    address,
    email,
    pass,
    quyen,
    checked,
    phanQuyen,
    setTen,
    setSdt,
    setAddress,
    setEmail,
    setPass,
    setChecked,
    setPhanQuyen }) {

    const theme = useTheme();

    const handleChangeInMultiple = (event) => {
        const {
            target: { value },
        } = event;
        setPhanQuyen(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );        
    };

    React.useEffect(() => {
        let dataIdQuyen = [];
        let dataTenQuyen = [];
        phanQuyen.forEach(item => {
            ajaxCallGet(`quyen?queries=tenQuyen=${item}`)
                .then(rs => {
                    rs.map(rs => {
                        dataIdQuyen.push(rs.id)
                    })
                })
                setChecked(dataIdQuyen)
        })
    },[phanQuyen])

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

    function getStyles(name, phanQuyen, theme) {
        return {
            fontWeight:
                phanQuyen.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const names = quyen;


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div>
                <TextField
                    label="Họ tên"
                    id="outlined-start-adornment"
                    value={ten}
                    onChange={e => setTen(e.target.value)}
                    sx={{ m: 1, width: '250px' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i className="fas fa-file-signature"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Số điện thoại"
                    value={sdt}
                    onChange={e => setSdt(e.target.value)}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '250px' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i className="fas fa-mobile"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Địa chỉ"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '250px' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i className="fas fa-map-marked-alt"></i></InputAdornment>,
                    }}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '250px' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><i className="fas fa-envelope"></i></InputAdornment>,
                    }}
                />
                <FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                {/* <FormControl sx={{ m: 1 }}>
                    <FormLabel id="demo-controlled-radio-buttons-group" sx={{ m: 0 }}>Phân quyền</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={checked}
                    >
                        {quyen.map((item) => {
                            return (
                                <FormControlLabel
                                    checked={checked.includes(item.id)}
                                    onChange={() => handleChangeInCheckbox(item.id)}
                                    key={item.id} value={item.tenQuyen} control={<Checkbox />} label={item.tenQuyen} />
                            )
                        })}
                    </RadioGroup>
                </FormControl> */}
                <FormControl sx={{ m: 1, width: 250 }}>
                    <InputLabel id="demo-multiple-name-label">Phân quyền</InputLabel>
                    <Select
                        multiple
                        displayEmpty
                        value={phanQuyen}
                        onChange={handleChangeInMultiple}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" default disabled>
                            <em>Mã Tool</em>
                        </MenuItem>
                        {names.map((name) => (
                                <MenuItem
                                    key={name.tenQuyen}
                                    value={name.tenQuyen}
                                    style={getStyles(name.tenQuyen, phanQuyen, theme)}
                                >
                                    {name.tenQuyen}
                                </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>

        </Box>
    );
}
