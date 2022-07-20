import $ from 'jquery'
import Swal from 'sweetalert2'

var url = window.location.href.split('/')
// let URL_HTTP = url[0] + "/" + "/" + url[2] + "/" + url[3] + "/"
// if (url[3].length == 0) {
//     URL_HTTP = url[0] + "/" + "/" + url[2] + "/" + url[4] + "/"
// }
export const URL_MAIN = window.location.origin + '/'
// export const URL_MAIN = 'https://spec.edu.vn/goodchilds/'


const URL_HTTP = 'http://localhost:9667/'
// const URL_HTTP = 'https://spec.edu.vn/goodchilds/'
const TOKENHEADER_VALUE = getCookie('Authorization')
export const URL_API_GET = URL_HTTP + 'api/v1/private-get/'
const URL_API_EDIT = URL_HTTP + 'api/v1/private-edit/'
$(function () { })

export function tinhTong(chuoi) {
  let RANDOM_STRING_LENGTH = 8;
  let tong = 1;
  for (let j = 0; j < RANDOM_STRING_LENGTH; j++) {
    if (chuoi[j] === "A")
      tong = tong * 1;
    else if (chuoi[j] === "B")
      tong = tong * 2;
    else if (chuoi[j] === "C")
      tong = tong * 3;
    else if (chuoi[j] === "D")
      tong = tong * 4;
    else if (chuoi[j] === "E")
      tong = tong * 5;
    else if (chuoi[j] === "F")
      tong = tong * 6;
    else if (chuoi[j] === "G")
      tong = tong * 7;
    else if (chuoi[j] === "H")
      tong = tong * 8;
    else if (chuoi[j] === "I")
      tong = tong * 9;
    else if (chuoi[j] === "K")
      tong = tong * 10;
    else if (chuoi[j] === "L")
      tong = tong * 11;
    else if (chuoi[j] === "M")
      tong = tong * 12;
    else if (chuoi[j] === "N")
      tong = tong * 13;
    else if (chuoi[j] === "O")
      tong = tong * 14;
    else if (chuoi[j] === "P")
      tong = tong * 15;
    else if (chuoi[j] === "Q")
      tong = tong * 16;
    else if (chuoi[j] === "R")
      tong = tong * 17;
    else if (chuoi[j] === "S")
      tong = tong * 18;
    else if (chuoi[j] === "T")
      tong = tong * 19;
    else if (chuoi[j] === "U")
      tong = tong * 20;
    else if (chuoi[j] === "V")
      tong = tong * 21;
    else if (chuoi[j] === "W")
      tong = tong * 22;
    else if (chuoi[j] === "X")
      tong = tong * 23;
    else if (chuoi[j] === "Y")
      tong = tong * 24;
    else if (chuoi[j] === "Z")
      tong = tong * 25;
    else if (chuoi[j] === "1")
      tong = tong * 1;
    else if (chuoi[j] === "2")
      tong = tong * 2;
    else if (chuoi[j] === "3")
      tong = tong * 3;
    else if (chuoi[j] === "4")
      tong = tong * 4;
    else if (chuoi[j] === "5")
      tong = tong * 5;
    else if (chuoi[j] === "6")
      tong = tong * 6;
    else if (chuoi[j] === "7")
      tong = tong * 7;
    else if (chuoi[j] === "8")
      tong = tong * 8;
    else if (chuoi[j] === "9")
      tong = tong * 9;
  }
  return tong;
}

export function getDayMonthYear() {
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  const date = `${day}-${month}-${year}`;
  return date;
}

export function delayy() {
  var timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
}
export function createData(
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
export function nonAccentVietnamese(str) {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

// get cookie
export function getCookie(name) {
  try {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) {
      return match[2]
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}

//copy to clipboard
export function copyToClipboard(id) {
  console.log(id)
  let copyText = document.getElementById(id)
  console.log(copyText)
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  navigator.clipboard
    .writeText(copyText.value)
    .then(() => {
      alertSuccess('Đã coppy vào clipboard')
    })
    .catch(error => {
      alert(`Copy failed!`)
    })
}

/*Đăng xuất ra khỏi tk*/
export function logOut() {
  document.cookie = `Authorization=${TOKENHEADER_VALUE};max-age=` + 0
  localStorage.removeItem('user')
  sessionStorage.removeItem('token')
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = 'login'
}

/*notify để custom alert */
//alert notify
//***************alter
export function alertSuccess(text, time = 1000) {
  $.notify(
    {
      icon: 'far fa-check-circle',
      message: text
    },
    {
      delay: time,
      offset: { x: 15, y: 15 },
      type: 'success',
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      z_index: 1031000000000
    }
  )
}

export function alertInfo(text, time = 1000) {
  $.notify(
    {
      icon: 'fas fa-info-circle',
      message: text
    },
    {
      delay: time,
      offset: { x: 15, y: 15 },
      type: 'info',
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      z_index: 1031000000000
    }
  )
}

export async function sweetAlert2(title) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  let rs = await swalWithBootstrapButtons.fire({
    title: title,
    text: "Bạn sẽ không thể khôi phục lại điều này!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa nó!',
    cancelButtonText: 'Hủy bỏ!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return false;
    }
  })
  return rs
}

export function alertWarning(text, time = 1000) {
  $.notify(
    {
      icon: 'fas fa-exclamation',
      message: text
    },
    {
      delay: time,
      offset: { x: 55, y: 15 },
      type: 'warning',
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      z_index: 1031
    }
  )
}

export function alertDanger(text, time = 1000) {
  $.notify(
    {
      icon: 'fas fa-exclamation-triangle',
      message: text
    },
    {
      timer: 1000,
      delay: time,
      offset: { x: 15, y: 15 },
      type: 'danger',
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      z_index: 1031000000000
    }
  )
}

/*get data*/
export async function ajaxCallGet(url) {
  let rs = null

  await $.ajax({
    type: 'GET',
    dataType: 'json',
    url: URL_API_GET + url,

    success: function (result) {
      rs = result
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    }
  })
  return rs
}

/*upload file, image....*/
export async function ajaxCallUploadFile(url, file) {
  let data

  await $.ajax({
    type: 'POST',
    url: 'https://spec.edu.vn/qlbh/api/v1/private-edit/' + url,
    data: file,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    success: function (result) {
      data = result.data
    },
    error: function (err) {
      console.log(err)
    }
  })
  return data
}

/*post data*/
export async function ajaxCallPost(url, dataUser) {
  let rs = null
  await $.ajax({
    type: 'POST',
    data: JSON.stringify(dataUser),
    url: URL_API_EDIT + url,
    timeout: 30000,
    contentType: 'application/json',
    success: function (result) {
      rs = result
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    }
  })
  return rs
}

/*put data*/
export async function ajaxCallPut(url, dataUser) {
  let rs = null

  await $.ajax({
    type: 'PUT',
    data: JSON.stringify(dataUser),
    url: URL_API_EDIT + url,
    timeout: 30000,
    contentType: 'application/json',
    success: function (result) {
      rs = result
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    }
  })
  return rs
}

/*set key-val để lưu vào local storage*/
export function setItemLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
} /*get key-val để lưu vào local storage*/
export function getItemLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

/*set key-val để lưu vào local storage*/
export function setItemSessionStorage(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val))
} /*get key-val để lưu vào local storage*/
export function getItemSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

//format input type number
export function formatNumber(nStr, decSeperate, groupSeperate) {
  try {
    nStr += ''
    let x = nStr.split(decSeperate)
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + groupSeperate + '$2')
    }
    return x1 + x2
  } catch (e) {
    console.log(e)
    return nStr
  }
}

// trả ngày của tháng và năm
export function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

//format input type number
export function formatFees(nStr, decSeperate, groupSeperate) {
  try {
    nStr += ''
    let arr = nStr.split(decSeperate)
    if (arr.length > 0) {
      // nếu phần chuỗi sau dính dấu "," nó sẽ cắt bỏ đi rồi mới gán
      arr = arr.toString().replaceAll(',', '')
      nStr = arr
    }
    nStr += ''
    let x = nStr.split(decSeperate)
    let x1 = x[0]
    let x2 = x.length > 1 ? ',' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + groupSeperate + '$2')
    }
    return x1 + x2
  } catch (e) {
    console.log(e)
    return nStr
  }
}
