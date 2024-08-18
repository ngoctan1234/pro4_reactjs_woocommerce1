import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import categorySlice from './categorySlice';


const store=configureStore({
    reducer:{
        auth:authSlice,
        pro:productSlice,
        cate:categorySlice
    }
})
export default store


