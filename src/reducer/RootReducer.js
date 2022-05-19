import { combineReducers } from 'redux'
import DataUserToolReducer from './DataUserToolReducer'

const RootReducer = combineReducers({
  userTool: DataUserToolReducer,
})
export default RootReducer
