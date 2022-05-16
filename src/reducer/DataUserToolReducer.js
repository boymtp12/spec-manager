const initialState = {
  dataUser: [{}]
}
const DataUserToolReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CHANGE_DATA': {
      return {
        ...state,
        dataUser: action.dataUser
      }
    }

    default: {
      return state
    }
  }
}
export default DataUserToolReducer
