import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Badge, Tab, Tabs, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import $ from 'jquery'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import TableQl from './TableQl'
import { ajaxCallGet, setItemLocalStorage, URL_API_GET, createData, getItemLocalStorage } from '../../libs/base'
import FormEditUserTool from '../FormEditUserTool'
import { Link } from 'react-router-dom'

import "../../css_main/css/tabsQl.css"
import Header from '../Header'

import '../../css_main/css/tabsQl.css'
import { changeData } from '../../reducer_action/DataUserToolReducerAction'


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


export default function TabsQl() {
  const dispatch = useDispatch()

  const [value, setValue] = React.useState(0)
  const [accountChinhThuc, setAccountChinhThuc] = React.useState(0)

  const mainDataUser = useSelector(state => state.userTool.dataUser)
  // const [mainDataUser, setMainDataUser] = React.useState()


  const [checked, setChecked] = React.useState([])
  const [allTool, setAllTool] = React.useState([]);


  // Lấy hết mã tool ném vào local
  React.useEffect(() => {
    let acu = [];
    ajaxCallGet(`user-tool/find-all`).then(rs => {
      let myArray = rs.data.reduce((acu, item) => {
        if (acu.indexOf(item.clMaTool) === -1) {
          acu.push(item.clMaTool)
        }
        return acu;
      }, [])
      setItemLocalStorage('all-tool', myArray)
    }).catch(err => {
      console.log(err);
    })
  }, [])
  const phanQuyen = getItemLocalStorage('dataQuyen');


  React.useEffect(() => {
    if (phanQuyen === "Admin") {
      let dataa = []
      let label = []
      ajaxCallGet(`user-tool/find-all`).then(async rs => {
        console.log(rs)

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

        }
        console.log(dataa);
        // setMainDataUser(dataa)
        const action2 = changeData(dataa)
        await dispatch(action2)
        renderData()
      }).catch(err => {
        console.log(err);
      })
    }else{
      let dataa = []
      let label = []
      /// check đăng nhập trước rồi mới call api
      ajaxCallGet(`user-tool?queries=clMaTool=${phanQuyen.join('')}`).then(async rs => {
        console.log(rs)
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
  
        }
        console.log(dataa);
        // setMainDataUser(dataa)
        const action2 = changeData(dataa)
        await dispatch(action2)
        renderData()
      }).catch(err => {
        console.log(err);
      })
    }
  }, [])

 
  // }




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



  // const handleChangeInCheckbox = (id) => {
  //   setChecked(prev => {
  //     const isChecked = checked.includes(id);
  //     if (isChecked) {
  //       return checked.filter(item => {
  //         return item !== id;
  //       })
  //     } else {
  //       return [...prev, id];
  //     }
  //   });
  //   // end Radio
  // }

  // console.log(checked)
  // React.useEffect(() => {
  //   let data = [];
  //   ajaxCallGet(`user-tool?queries=clMaTool%3D${checked.toString()}`)
  //     .then(rs => {
  //       rs.map(item => {
  //         data.push(createData(item.clId,
  //           item.clMaThietBi,
  //           item.clMaTool,
  //           item.clHoTen,
  //           item.clSdt,
  //           item.clGmail,
  //           item.clChucVu,
  //           item.clNoiLamViec,
  //           item.clNgayDangKy,
  //           item.clNgayHetHan))
  //       })
  //       console.log(data);
  //       setMainDataUser(data)
  //       setMainDataUser2(data)
  //     })

  // },[checked])

  const renderData = () => {
    let data = mainDataUser
    return (
      <div className='w-100'>

        

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