import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Badge, Tab, Tabs, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import $ from 'jquery'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import TableQl from './TableQl'
import { ajaxCallGet, URL_API_GET } from '../../libs/base'
import Edit from '../Edit'
import { Link } from 'react-router-dom'
import '../../css_main/css/tabsQl.css'
import { changeData } from '../../reducer_action/DataUserToolReducerAction'

function TabPanel (props) {
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

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
function createData (
  id,
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

export default function TabsQl () {
  const dispatch = useDispatch()

  const [value, setValue] = React.useState(0)
  const [accountChinhThuc, setAccountChinhThuc] = React.useState(0)

  const mainDataUser = useSelector(state => state.userTool.dataUser)
  // const [mainDataUser, setMainDataUser] = React.useState()

  const [autoLabel, setAutoLabel] = React.useState()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [time, setTime] = React.useState(0)

  React.useEffect(() => {
    // renderData()
  }, [mainDataUser])

  React.useEffect(() => {
    let dataa = []
    let label = []
    ajaxCallGet(`user-tool?queries=clMaTool=GoodChild`).then(async rs => {
      for (let x in rs) {
        let item = rs[x]
        dataa.push(
          createData(
            item.clId,
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
      }
      // setMainDataUser(dataa)
      const action2 = changeData(dataa)
      await dispatch(action2)
      renderData()
    })
  }, [])
  //   handleChange: function (e) {
  //     // 1. Make a shallow copy of the items
  //     let items = [...this.state.items];
  //     // 2. Make a shallow copy of the item you want to mutate
  //     let item = {...items[1]};
  //     // 3. Replace the property you're intested in
  //     item.name = 'newName';
  //     // 4. Put it back into our array. N.B. we are mutating the array here, but that's why we made a copy first
  //     items[1] = item;
  //     // 5. Set the state to our new copy
  //     this.setState({items});
  // }
  const handleData = (type, data) => {
    if (data.length > 0) {
      console.log(data)
      return (
        <TableQl type={type} onCountItem={setAccountChinhThuc} data={data} />
      )
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const inputHandler = e => {
    // console.log("kdkdkd");
    clearTimeout(time)
    let tm = setTimeout(async () => {
      var inputCheck = e.target.value
      let dataa = []
      let label = []
      let rs = await fetch(
        URL_API_GET + `user-tool/find-like-sdt?sdt=${inputCheck}`
      ).then(response => response.json())
      for (let x in rs.data) {
        let item = rs.data[x]
        dataa.push(
          createData(
            item.clId,
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
      }
      // setMainDataUser([...dataa])
      const action2 = changeData(dataa)
      dispatch(action2)
    }, 1000)
    setTime(tm)
  }

  const renderData = () => {
    let data = mainDataUser
    return (
      <div className='w-100'>
        <div className='header mt-2 d-flex justify-content-between'>
          <div>
            <i className='logo-icon fab fa-accusoft'></i>
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
            <Link className='text-log' to='/login'>
              Đăng nhập
            </Link>
            <div className='line'></div>
            <Link className='text-register' to='/register'>
              Đăng ký
            </Link>
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
            {handleData(1, data)}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {handleData(2, data)}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {handleData(3, data)}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {handleData(4, data)}
          </TabPanel>
        </Box>
      </div>
    )
  }
  try {
    if (mainDataUser.length > 0) {
      return renderData()
    } else {
      const action2 = changeData([])
      dispatch(action2)
    }
  } catch (err) {
    const action2 = changeData([])
    dispatch(action2)
  }
}
