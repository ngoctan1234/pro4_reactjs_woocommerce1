// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

// Thay đổi URL và cấu hình phù hợp với API của bạn
const API_URL = process.env.REACT_APP_API_URL;




export const getAllCate= createAsyncThunk('cate/getAllCate', async ({ currentPage, limit },thunkAPI) => {
  const url= `/categories?page=${currentPage}&limit=${limit}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
  }
});

export const addNewCategory= createAsyncThunk('cate/addNewCategory', async (name,thunkAPI) => {
    const url= `/categories`;
    try {
      const response = await axiosInstance.post(url,{"name":name});
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });

  export const editCategory= createAsyncThunk('cate/editCategory', async ({id,name},thunkAPI) => {
    const url= `/categories/${id}`;
    try {
      const response = await axiosInstance.put(url,{"name":name});
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });

  export const deleteCategory= createAsyncThunk('cate/deleteCategory', async (id,thunkAPI) => {
    const url= `/categories/${id}`;
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

const categorySlice = createSlice({
  name: 'cate',
  initialState: {
    status: 'idle',
    error: null,
    categories:null,
    totalPages:10
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCate.fulfilled, (state, action) => {
        state.categories = action.payload.categories
        state.totalPages = action.payload.totalPages
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        
      })
     ;
  },
});

export default categorySlice.reducer;
