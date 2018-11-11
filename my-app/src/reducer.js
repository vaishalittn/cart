import productsReducer from './products/productsreducer'
import cartReducer from './cart/cartreducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    cart:cartReducer,
    product: productsReducer,
  });
  export default reducers;