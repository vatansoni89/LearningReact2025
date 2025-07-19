import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './features/cart/cartSlice'; //cartReducer

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});