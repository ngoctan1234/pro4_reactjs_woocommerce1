// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

// Thay đổi URL và cấu hình phù hợp với API của bạn
const API_URL = process.env.REACT_APP_API_URL;


export const uploadImage= createAsyncThunk('pro/uploadImage', async ({id,formData},thunkAPI) => {
  const url= API_URL+`/products/uploads/${id}`;
  try {
    const response = await axiosInstance.post(url, formData,{
      headers: {
        'Content-Type': 'multipart/form-data' // Đặt Content-Type cho yêu cầu upload
      }
    });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});

export const getAllProductDetail = createAsyncThunk('pro/getAllProductDetail', async (id,thunkAPI) => {
  const url= `/products/productDetail/${id}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});

export const getAll = createAsyncThunk('pro/getAll', async ({currentPage,limit},thunkAPI) => {
  const url= `/products?page=${currentPage}&&limit=${limit}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});
export const addNewProduct= createAsyncThunk('pro/addNewProduct', async (product,thunkAPI) => {
  const url= `/products`;
  try {
    const response = await axiosInstance.post(url,product);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});

export const editProduct= createAsyncThunk('pro/editProduct', async ({id,product},thunkAPI) => {
  const url= `/products/${id}`;
  try {
    console.log(product)
    const response = await axiosInstance.put(url,product);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});

export const deleteProduct= createAsyncThunk('pro/deleteProduct', async (id,thunkAPI) => {
  const url= `/products/${id}`;
  try {
    const response = await axiosInstance.delete(url);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});


const getFromLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

const productSlice = createSlice({
  name: 'pro',
  initialState: {
    status: 'idle',
    error: null,
    products:null,
    totalPages:0,
    productDetails:null
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.products = action.payload.responseProducts
        state.totalPages=action.payload.totalPages
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        
      })
      .addCase(getAllProductDetail.fulfilled, (state, action) => {
        state.productDetails=action.payload
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        
      })
     ;
  },
});

export default productSlice.reducer;
