import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
const myStore = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});
export default myStore;
