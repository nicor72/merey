import { combineReducers } from 'redux'
import { cart } from './cart'
import { breadcrumb } from './breadcrumb'

export default combineReducers({
  breadcrumb,
  cart
})
