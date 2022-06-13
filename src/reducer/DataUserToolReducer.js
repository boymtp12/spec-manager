const initialState = {
  dataUser: [{}],
  typeTabs: 1
}
const DataUserToolReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CHANGE_DATA': {
      return {
        ...state,
        dataUser: action.dataUser
      }
    }
    case 'CHANGE_TYPE': {
      return {
        ...state,
        typeTabs: action.typeTabs
      }
    }

    default: {
      return state
    }
  }
}
export default DataUserToolReducer
