import axiosInstance from './axiosInstance';
import { API_CONFIG } from '../config/apiConfig';

// 会员相关API
const membershipApi = {
  /**
   * 获取会员套餐列表
   * @returns {Promise}
   */
  getMembershipPlans: () => {
    return axiosInstance.get(API_CONFIG.endpoints.getMembershipPlans);
  },

  /**
   * 购买会员
   * @param {Object} data - 购买信息
   * @param {string} data.planId - 套餐ID
   * @param {string} data.paymentMethod - 支付方式
   * @returns {Promise}
   */
  purchaseMembership: (data) => {
    return axiosInstance.post(API_CONFIG.endpoints.purchaseMembership, data);
  },

  /**
   * 获取会员状态
   * @returns {Promise}
   */
  getMembershipStatus: () => {
    return axiosInstance.get(API_CONFIG.endpoints.getMembershipStatus);
  }
};

export default membershipApi;
