import {combineReducers} from 'redux'
import * as Action from '../actions'
import user from './user'

const id = (prev = null, action) => {
  switch (action.type) {
    case Action.FETCH_SUCCESS:
    case Action.SAVE_SUCCESS:
      if (action.payload._id !== undefined) {
        return action.payload._id
      }
      return null
    default:
      return prev
  }
}
export default combineReducers({
  id,
  user,
})