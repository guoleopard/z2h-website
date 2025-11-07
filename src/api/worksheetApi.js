import axiosInstance from './axiosInstance';
import { API_CONFIG } from '../config/apiConfig';

// 字帖相关API
const worksheetApi = {
  /**
   * 获取字帖列表
   * @param {Object} params - 查询参数
   * @param {string} [params.grade] - 年级
   * @param {string} [params.subject] - 科目
   * @param {string} [params.type] - 类型
   * @returns {Promise}
   */
  getWorksheets: (params = {}) => {
    return axiosInstance.get(API_CONFIG.endpoints.getWorksheets, { params });
  },

  /**
   * 获取字帖详情
   * @param {string} id - 字帖ID
   * @returns {Promise}
   */
  getWorksheetDetail: (id) => {
    return axiosInstance.get(`${API_CONFIG.endpoints.getWorksheetDetail}/${id}`);
  },

  /**
   * 生成字帖
   * @param {Object} data - 生成参数
   * @param {string} data.type - 字帖类型
   * @param {string} data.content - 字帖内容
   * @param {Object} [data.settings] - 生成设置
   * @returns {Promise}
   */
  generateWorksheet: (data) => {
    return axiosInstance.post(API_CONFIG.endpoints.generateWorksheet, data);
  }
};

export default worksheetApi;
