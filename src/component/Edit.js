import * as React from 'react';
import { useState, useEffect } from 'react'
import { ajaxCallGet, ajaxCallPost } from '../libs/base';
import "./../css_main/css/edit.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import { toast } from 'wc-toast'
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
// Multiple Select
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Edit = () => {
    const [maThietBi, setMaThietBi] = useState('');
    const [fullName, setFullName] = useState('');
    const [mail, setMail] = useState('');
    const [tenSanPham, setTenSanPham] = useState('');
    const [maTool, setMaTool] = useState([]);
    const [soDienThoai, setSoDienThoai] = useState('');
    const [chucVu, setChucVu] = useState('');
    const [noiLamViec, setNoiLamViec] = useState('');
    const [ngayHetHan, setNgayHetHan] = useState('');

    const [allTool, setAllTool] = useState([]);

    // Start multipleSelect

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


    const names = allTool;


    function getStyles(name, toolName, theme) {
        return {
            fontWeight:
                toolName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();
    const [toolName, setToolName] = React.useState([]);


    console.log(toolName)
    console.log(toolName.toString())

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setToolName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // End MultipleSelect



    useEffect(() => {
        ajaxCallGet(`user-tool/find-all`)
            .then(rs => rs.data.reduce((acu, item) => {
                if (acu.indexOf(item.clMaTool) === -1) {
                    acu.push(item.clMaTool)
                }
                return acu;
            }, []))
            .then(acu => {
                setAllTool(acu);
            })
    }, [])

    const { id } = useParams();

    const handleSubmit = () => {
        ajaxCallGet(`user-tool/${id}`)
            .then(rs => {
                console.log(rs)
                let data = {
                    "clId": id,
                    "clMaThietBi": maThietBi,
                    "clMaTool": toolName.toString(),
                    "clTenSanPham": tenSanPham,
                    "clHoTen": fullName,
                    "clSdt": soDienThoai,
                    "clGmail": mail,
                    "clChucVu": chucVu,
                    "clNoiLamViec": noiLamViec,
                    "clNgayDangKy": rs.clNgayDangKy,
                    "clNgayHetHan": ngayHetHan,
                    "clCheDo": rs.clCheDo,
                    "clMatKhau": rs.clMatKhau,
                    "clPhanMemChoPhep": rs.clPhanMemChoPhep,
                    "clWebCanChan": rs.clWebCanChan,
                    "clWebChoChay": rs.clWebChoChay,
                    "clPmDaChan": rs.clPmDaChan,
                    "clWebDaChan": rs.clWebDaChan,
                    "clTrangThai": rs.clTrangThai,
                    "clLichSuWeb": rs.clLichSuWeb,
                    "clThoiGianBat": rs.clThoiGianBat,
                    "clThoiGianTat": rs.clThoiGianTat,
                }
                console.log(data)

                ajaxCallPost('user-tool', data)
                    .then(rs => {
                        console.log(rs);
                        toast.success('Sửa phiếu thành công')
                    })
                    .catch(err => (console.log("error: ", err)))
            })


    }

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        await ajaxCallGet(`user-tool/${id}`)
            .then(rs => {
                setMaThietBi(rs.clMaThietBi);
                setFullName(rs.clHoTen);
                setMail(rs.clGmail)
                setTenSanPham(rs.clTenSanPham)
                setMaTool(rs.clMaTool)
                setSoDienThoai(rs.clSdt)
                setChucVu(rs.clChucVu)
                setNoiLamViec(rs.clNoiLamViec)
                setNgayHetHan(rs.clNgayHetHan)
            })
    }

    return (
        <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: '#e0e0e0' }}>
            <div className="container-form">
                <form>
                    <div className="title-form">Edit User Profile Form</div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="text-label" htmlFor="validationDefault01">Mã thiết bị</label>
                            <input
                                value={maThietBi}
                                name="maThietBi"
                                onChange={(e) => setMaThietBi(e.target.value)}
                                type="text" className="form-control" id="validationDefault01" defaultValue="" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="text-label" htmlFor="validationDefault02">Tên sản phẩm</label>
                            <input
                                value={tenSanPham}
                                name="tenSanPham"
                                onChange={(e) => setTenSanPham(e.target.value)}
                                type="text" className="form-control" id="validationDefault02" defaultValue="" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <div>
                                <FormControl sx={{ m: "14px 0", width: 160 }}>
                                    <InputLabel id="demo-multiple-name-label">All Tools</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={toolName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, toolName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="text-label" htmlFor="validationDefault04">Họ và tên</label>
                            <input
                                value={fullName}
                                name="fullName"
                                onChange={(e) => setFullName(e.target.value)}
                                type="text" className="form-control" id="validationDefault04" required />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="text-label" htmlFor="validationDefault05">Số điện thoại</label>
                            <input
                                value={soDienThoai}
                                name="soDienThoai"
                                onChange={(e) => setSoDienThoai(e.target.value)}
                                type="text" className="form-control" id="validationDefault05" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="text-label" htmlFor="validationDefault06">Chức vụ</label>
                            <input
                                value={chucVu}
                                name="chucVu"
                                onChange={(e) => setChucVu(e.target.value)}
                                type="text" className="form-control" id="validationDefault06" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="text-label" htmlFor="validationDefault07">Gmail</label>
                            <input
                                value={mail}
                                name="mail"
                                onChange={(e) => setMail(e.target.value)}
                                type="text" className="form-control" id="validationDefault07" required />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="text-label" htmlFor="validationDefault08">Nơi làm việc</label>
                            <input
                                value={noiLamViec}
                                name="noiLamViec"
                                onChange={(e) => setNoiLamViec(e.target.value)}
                                type="text" className="form-control" id="validationDefault08" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="text-label" htmlFor="validationDefault09">Ngày hết hạn</label>
                            <input
                                value={ngayHetHan}
                                name="ngayHetHan"
                                onChange={(e) => setNgayHetHan(e.target.value)}
                                type="date" className="form-control" id="validationDefault09" />
                        </div>
                    </div>
                    <div className="form-footer">
                        <Stack direction="row" spacing={2}>
                            <Link to='/'>
                                <Button style={{ color: '#f3341e', border: '1px solid #f3341e' }} variant="outlined" startIcon={<i className="fas fa-sign-out"></i>}>
                                    Đóng
                                </Button>
                            </Link>
                            <Link to='/'
                                onClick={handleSubmit}
                                type="submit">
                                <Button variant="contained" endIcon={<SaveIcon />}>
                                    Lưu
                                </Button>
                            </Link>
                        </Stack>
                    </div>

                </form>
            </div>
        </div>

    )



}
export default Edit;