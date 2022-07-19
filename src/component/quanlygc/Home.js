import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Tab, Tabs } from '@mui/material'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import TableQl from './TableQl'
import { ajaxCallGet, setItemLocalStorage, URL_API_GET, createData, getItemLocalStorage, URL_MAIN } from '../../libs/base'

import "../../css_main/css/home.css"
import Header from '../Header'

import '../../css_main/css/home.css'
import { changeData, changeTypeTabs } from '../../reducer_action/DataUserToolReducerAction'
import { phanQuyen } from '../Login'
import { useNavigate } from 'react-router-dom'


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
        <Box sx={{ paddingTop: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

// in Box

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


export default function Home({ phanQuyen }) {
  const dispatch = useDispatch()

  const [tenTool, setTenTool] = React.useState([]);

  const [value, setValue] = React.useState(0)
  const [accountChinhThuc, setAccountChinhThuc] = React.useState(0)
  const mainDataUser = useSelector(state => state.userTool.dataUser)
  // const [mainDataUser, setMainDataUser] = React.useState()

  const getAllUser = () => {
    let dataa = []
    ajaxCallGet('user-tool/find-all')
      .then(rs => {
        rs.data.map(async item => {
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
              item.clNgayHetHan,
            )
          )
          const action4 = changeTypeTabs(1);
          await dispatch(action4)
          const action2 = changeData([...dataa])
          await dispatch(action2)
        })
      })
  }


  const getAllUserByQuyen = () => {
    const quyenArr = getItemLocalStorage('dataQuyen');
    if (quyenArr.length === 1) {
      let dataa = []
      ajaxCallGet(`user-tool?queries=clMaTool=${quyenArr.join('')}&sort=clId-desc`)
        .then(async rs => {
          rs.map(item => {
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
            // setMainDataUser(dataa)

          })
          const action3 = changeTypeTabs(1);
          await dispatch(action3)

          const action2 = changeData([...dataa])
          await dispatch(action2)
        })
    } else {
      let dataCurrent = [];
      quyenArr.map(quyen => {
        let dataa1 = [];
        ajaxCallGet(`user-tool?queries=clMaTool=${quyen}&sort=clId-desc`)
          .then(async rs => {
            rs.map(item => {
              dataa1.push(createData(
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
              ))
            })
            dataCurrent = [...dataCurrent, ...dataa1];
            const action3 = changeTypeTabs(1);
            await dispatch(action3)

            const action2 = changeData([...dataCurrent])
            await dispatch(action2)
          })
      })
    }

  }

  const getUserToolByFilter = () => {
    let toolData = [];
    let allToolData = [];
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
        const action3 = changeTypeTabs(1);
        await dispatch(action3)
        const action2 = changeData([...allToolData])
        await dispatch(action2)

      })
    })
  }

  // Lấy hết mã tool ném vào local

  React.useEffect(() => {

    if (phanQuyen.join('') === "Admin" && tenTool.length !== 0) {
      getUserToolByFilter();
    } else if (phanQuyen.join('') === "Admin" && tenTool.length === 0) {
      getAllUser();
    } else {
      getAllUserByQuyen()
    }
    renderData()


  }, [])

  // if (phanQuyen.join('') === "Admin" && tenTool.length !== 0) {
  //   let dataa = []
  //   let label = []
  //   ajaxCallGet(`user-tool/find-all`).then(async rs => {

  //     for (let x in rs.data) {
  //       let item = rs.data[x]
  //       dataa.push(
  //         createData(
  //           item.clId,
  //           item.clMaThietBi,
  //           item.clMaTool,
  //           item.clHoTen,
  //           item.clSdt,
  //           item.clGmail,
  //           item.clChucVu,
  //           item.clNoiLamViec,
  //           item.clNgayDangKy,
  //           item.clNgayHetHan
  //         )
  //       )

  //     }
  //     // setMainDataUser(dataa)
  //     const action3 = changeTypeTabs(1);
  //     await dispatch(action3)
  //     const action2 = changeData([...dataa])
  //     await dispatch(action2)
  //     renderData()
  //   })
  //     .catch(err => {
  //       console.log(err);

  //     })
  // } else if (phanQuyen.length === 1 && phanQuyen.join('') !== 'Admin' && tenTool.length !== 0) {
  //   let dataa = []
  //   let label = []
  //   /// check đăng nhập trước rồi mới call api
  //   ajaxCallGet(`user-tool/find-by-matool?clMaTool=${phanQuyen.join('')}&sort=clId-desc`).then(async rs => {
  //     for (let x in rs) {
  //       let item = rs[x]
  //       dataa.push(
  //         createData(
  //           item.clId,
  //           item.clMaThietBi,
  //           item.clMaTool,
  //           item.clHoTen,
  //           item.clSdt,
  //           item.clGmail,
  //           item.clChucVu,
  //           item.clNoiLamViec,
  //           item.clNgayDangKy,
  //           item.clNgayHetHan
  //         )
  //       )

  //     }
  //     // setMainDataUser(dataa)
  //     const action3 = changeTypeTabs(1);
  //     await dispatch(action3)
  //     const action2 = changeData([...dataa])
  //     await dispatch(action2)
  //     renderData()
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // } else if (phanQuyen.length !== 1 && tenTool.length !== 0) {
  //   let dataCurrent = [];
  //   phanQuyen.map(quyen => {
  //     let dataa1 = [];
  //     ajaxCallGet(`user-tool?queries=clMaTool=${quyen}&sort=clId-desc`)
  //       .then(async rs => {
  //         rs.map(item => {
  //           dataa1.push(createData(
  //             item.clId,
  //             item.clMaThietBi,
  //             item.clMaTool,
  //             item.clHoTen,
  //             item.clSdt,
  //             item.clGmail,
  //             item.clChucVu,
  //             item.clNoiLamViec,
  //             item.clNgayDangKy,
  //             item.clNgayHetHan
  //           ))
  //         })
  //         dataCurrent = [...dataCurrent, ...dataa1];
  //         // const action3 = changeTypeTabs(1);
  //         // await dispatch(action3)
  //         // const action2 = changeData(dataCurrent)
  //         // await dispatch(action2)
  //         // renderData()
  //         await renderUserTool(dataCurrent);
  //       })
  //   })
  // } else if (phanQuyen.join('') === "Admin" && tenTool.length !== 0) {

  // } else if (phanQuyen.join('') !== 'Admin' && tenTool.length !== 0) {

  // }

  // }

  // const renderUserTool = (dataCurrent) => {
  //   const action3 = changeTypeTabs(1);
  //   dispatch(action3)
  //   dispatch(changeData([...dataCurrent]))
  //   renderData()
  // }


  const handleData = (type, data) => {
    if (data.length > 0) {

      return (
        <TableQl
          tenTool={tenTool}
          setTenTool={setTenTool}
          getUserToolByFilter={getUserToolByFilter}
          getAllUserByQuyen={getAllUserByQuyen}
          getAllUser={getAllUser}
          type={type}
          onCountItem={setAccountChinhThuc}
          data={data} />
      )
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderData = () => {
    let data = mainDataUser
    return (
      <div className='w-100'>
        <Header />
        <Box
          sx={{ width: '90%', maxWidth: '1900px' }}
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
            <Tab label='Danh sách' {...a11yProps(0)} />
            <Tab label='Chính thức' {...a11yProps(0)}></Tab>
            <Tab label='Dùng thử' {...a11yProps(0)} />
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
      // dispatch(action2)
    }
  } catch (err) {
    const action2 = changeData([])
    dispatch(action2)
  }
}
