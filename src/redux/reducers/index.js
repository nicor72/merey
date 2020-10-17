import { combineReducers } from 'redux'
import { cart } from './cart'
import { webpay } from './webpay'

export default combineReducers({
  cart,
  webpay
})
