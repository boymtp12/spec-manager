import * as React from 'react'
import { Autocomplete, Badge, Tab, Tabs, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import $ from 'jquery'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import TableQl from './TableQl'
import { ajaxCallGet, URL_API_GET } from '../../libs/base'
import Edit from '../Edit'
import { Link } from 'react-router-dom'
import "../../css_main/css/tabsQl.css"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
function createData(id,
  mathietbi,
  matool,
  hovaten,
  sdt,
  gmail,
  chucvu,
  noilamviec,
  ngaydangky,
  ngayhethan
) {
  return {
    id,
    mathietbi,
    matool,
    hovaten,
    sdt,
    chucvu,
    gmail,
    noilamviec,
    ngaydangky,
    ngayhethan
  }
}

export default function TabsQl() {
  const [value, setValue] = React.useState(0)
  const [accountChinhThuc, setAccountChinhThuc] = React.useState(0)
  const [check, setCheck] = React.useState(0)
  const [mainDataUser, setMainDataUser] = React.useState([])
  const [mainDataUser2, setMainDataUser2] = React.useState([])
  const [autoLabel, setAutoLabel] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [time, setTime] = React.useState(0)
  React.useEffect(() => {
    setCheck(Math.random())
  }, [mainDataUser])
  React.useEffect(() => {
    let dataa = []
    let label = []
    ajaxCallGet(`user-tool?queries=clMaTool=GoodChild`).then(rs => {
      rs.map(item => {
        dataa.push(
          createData(item.clId,
            item.clMaThietBi,
            item.clMaTool,
            item.clHoTen,
            item.clSdt,
            item.clGmail,
            item.clChucVu,
            item.clNoiLamViec,
            item.clNgayDangKy,
            item.clNgayHetHan
          )
        )
        label.push({ label: item.clSdt, year: item.clMaThietBi })
        setAutoLabel(label)
      })
      setMainDataUser(dataa)
      setMainDataUser2(dataa)
    })
  }, [])

  const handleData = (type, data) => {
    if (data.length > 0) {
      return (
        <TableQl type={type} onCountItem={setAccountChinhThuc} data={data} />
      )
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  let inputHandler = (e) => {
    // console.log("kdkdkd");
    // clearTimeout(time)
    // let tm = setTimeout(() => {
    // console.log("jdjdjd");

    var inputCheck = e.target.value;
      console.log(inputCheck);
      let dataa = [];
      let label = [];
      fetch(URL_API_GET + `user-tool/find-like-sdt/?sdt=${inputCheck}`)
        .then(response => response.json())
        .then(rs => {
          console.log(rs.data)
          rs.data.map(item => {
            dataa.push(createData(item.clId,
              item.clMaThietBi,
              item.clMaTool,
              item.clHoTen,
              item.clSdt,
              item.clGmail,
              item.clChucVu,
              item.clNoiLamViec,
              item.clNgayDangKy,
              item.clNgayHetHan))

            label.push({ label: item.clSdt, year: item.clMaThietBi })
            setAutoLabel(label)
          })
          console.log(dataa)
          setMainDataUser(dataa)
          setMainDataUser2(dataa)
        })
    // }, 1000);
    // setTime(tm)
  }

  console.log(mainDataUser);
  console.log(mainDataUser2);

  const renderData = () => {
    return (
      <div className='w-100'>
        <div className='header mt-2 d-flex justify-content-between'>
          <div>
            <i className="logo-icon fab fa-accusoft"></i>
            <span className='logo-header mb-0'>GoodChild</span>
          </div>
          <div>
            <TextField
              style={{ marginRight: '32px' }}
              id='outlined-basic'
              onChange={inputHandler}
              label='Tìm kiếm'
              variant='outlined'
            />
            <Link className="text-log" to='/login'>Đăng nhập</Link >
            <div className="line"></div>
            <Link className="text-register" to='/register'>Đăng ký</Link >
          </div>

        </div>
        <Box
          sx={{ width: '80%' }}
          className='body border rounded box-shadow-xl'
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
            aria-label='scrollable force tabs example'
          >
            <Tab label='Chính thức' {...a11yProps(0)}></Tab>
            <Tab label='Dùng thử' {...a11yProps(0)} />
            <Tab label='Danh sách' {...a11yProps(0)} />
            <Tab label='Hết hạn' {...a11yProps(0)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            {handleData(1, mainDataUser2)}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {handleData(2, mainDataUser2)}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {handleData(3, mainDataUser2)}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {handleData(4, mainDataUser2)}
          </TabPanel>
        </Box>
      </div>
    )


  }

  return renderData()

}
