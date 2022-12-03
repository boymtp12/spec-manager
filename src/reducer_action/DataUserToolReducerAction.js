export const changeData = e => {
  return {
    type: 'CHANGE_DATA',
    dataUser: e
  }
}
export const changeTypeTabs = e => {
  return {
    type: 'CHANGE_TYPE',
    typeTabs: e
  }
}

export const changeInputPhoneNumber = e => {
  return {
    type: 'CHANGE_INPUT_PHONE_NUMBER',
    inputPhoneNumber: e
  }
}
