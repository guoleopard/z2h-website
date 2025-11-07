import axiosInstance from './axiosInstance';
import { API_CONFIG } from '../config/apiConfig';

// 用户相关API
const userApi = {
  /**
   * 用户登录
   * @param {Object} data - 登录信息
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise}
   */
  login: (data) => {
    return axiosInstance.post(API_CONFIG.endpoints.login, data);
  },

  /**
   * 用户注册
   * @param {Object} data - 注册信息
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @param {string} data.email - 邮箱
   * @param {string} data.phone - 手机号
   * @returns {Promise}
   */
  register: (data) => {
    return axiosInstance.post(API_CONFIG.endpoints.register, data);
  },

  /**
   * 获取用户个人信息
   * @returns {Promise}
   */
  getProfile: () => {
    return axiosInstance.get(API_CONFIG.endpoints.getProfile);
  },

  /**
   * 更新用户个人信息
   * @param {Object} data - 用户信息
   * @returns {Promise}
   */
  updateProfile: (data) => {
    return axiosInstance.put(API_CONFIG.endpoints.updateProfile, data);
  },

  /**
   * 获取图形验证码
   * @returns {Promise}
   */
  getCaptcha: () => {
    return axiosInstance.get(API_CONFIG.endpoints.getCaptcha);
  },

  /**
   * 发送短信验证码
   * @param {Object} data - 手机号信息
   * @param {string} data.phone - 手机号
   * @param {string} data.captcha - 图形验证码
   * @returns {Promise}
   */
  sendSmsCode: (data) => {
    return axiosInstance.post(API_CONFIG.endpoints.sendSmsCode, data);
  },

  /**
   * 发送邮箱验证码
   * @param {Object} data - 邮箱信息
   * @param {string} data.email - 邮箱
   * @param {string} data.captcha - 图形验证码
   * @returns {Promise}
   */
  sendEmailCode: (data) => {
    return axiosInstance.post(API_CONFIG.endpoints.sendEmailCode, data);
  }
};

export default userApi;
