const initialState = {
  dataUser: [{}],
  typeTabs: 1,
  inputPhoneNumber: ''
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

    case 'CHANGE_INPUT_PHONE_NUMBER': {
      return {
        ...state,
        inputPhoneNumber: action.inputPhoneNumber
      }
    }



    default: {
      return state
    }
  }
}
export default DataUserToolReducer
