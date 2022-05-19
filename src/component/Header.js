import $ from 'jquery'
import { Checkbox, FormControl, FormControlLabel, FormLabel, TextField, RadioGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { getItemLocalStorage } from "../libs/base";

const Header = (props) => {

    return (
        <div className='header mt-2 d-flex justify-content-between'>
            <Link to="/">
                <div>
                    <i className="logo-icon fab fa-accusoft"></i>
                    <span className='logo-header mb-0'>GoodChild</span>
                </div></Link>
            <div>
            {/* <FormControl sx={{display:"none", m: 1 }}>
                    <FormLabel id="demo-controlled-radio-buttons-group" sx={{ m: 0 }}>Phân quyền</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={props.checked}
                    >
                        {props.allTool.map((item, index) => {
                            return (
                                <FormControlLabel
                                    checked={props.checked.includes(item)}
                                    onChange={() => props.handleChangeInCheckbox(item)}
                                    key={index} value={item[index]} control={<Checkbox />} label={item[index]} />
                            )
                        })}
                    </RadioGroup>
                </FormControl> */}
                <TextField
                    style={{ marginRight: '32px' }}
                    id='outlined-basic'
                    onChange={props.inputHandler}
                    label='Tìm kiếm'
                    variant='outlined'
                />
                <Link className="text-log" to='/login'>Đăng nhập</Link >
                <div className="line" style={{ display: "none" }}></div>
                <Link className="text-register" style={{ marginRight: '34px' }} to='/register'>Đăng ký</Link >
                <Link className="text-register" to='/user-admin'>User Admin</Link >
            </div>

        </div>
    )
}

export default Header;