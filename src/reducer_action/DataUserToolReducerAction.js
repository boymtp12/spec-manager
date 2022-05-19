export const changeData = e => {
    console.log(e);
  return {
    type: 'CHANGE_DATA',
    dataUser: e
  }
}
