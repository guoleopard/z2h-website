import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求头中添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 处理成功响应
    return response.data;
  },
  (error) => {
    // 处理响应错误
    console.error('API Error:', error);
    
    // 统一错误处理
    let errorMessage = '请求失败，请稍后重试';
    
    if (error.response) {
      // HTTP错误状态码
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data.message || '请求参数错误';
          break;
        case 401:
          errorMessage = '未授权，请重新登录';
          // 可以在这里跳转到登录页
          // router.push('/login');
          break;
        case 403:
          errorMessage = '拒绝访问，权限不足';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器错误，请稍后重试';
          break;
        default:
          errorMessage = `请求错误，状态码：${status}`;
      }
    } else if (error.request) {
      // 请求已发送但没有收到响应
      errorMessage = '网络错误，没有收到服务器响应';
    } else {
      // 请求配置错误
      errorMessage = `请求配置错误：${error.message}`;
    }
    
    // 可以在这里添加全局错误提示
    // ElMessage.error(errorMessage);
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
