// src/axiosInstance.js
import axios from 'axios';

// Tạo một axios instance với cấu hình cơ bản
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // URL cơ sở của API
  timeout: 10000, // Thời gian chờ (timeout) 10 giây
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
});

// Thêm interceptor để xử lý các yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('accessToken');
    if (token) {
      console.log(token)
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
console.log(error)
    // Nếu lỗi là 401 (Unauthorized) và chưa thử lại
    if (error.response && (error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gửi yêu cầu refresh token
        console.log("test refresh: "+localStorage.getItem('refreshToken'))
        const response = await axios.post('http://localhost:8080/api/users/refresh-token', {
        "refreshToken": localStorage.getItem('refreshToken'),
        });
        const { token } = response.data;
        console.log("test: "+token)

        // Lưu token mới vào localStorage
        localStorage.setItem('accessToken', token);

        // Cập nhật token cho yêu cầu gốc
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        // Thực hiện lại yêu cầu gốc với token mới
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Xử lý lỗi khi refresh token không thành công
        console.log('Refresh token failed', refreshError);
        // Ví dụ: Điều hướng đến trang đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
