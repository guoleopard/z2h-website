// API配置文件
// 服务器地址和端口可以在这里修改
export const API_CONFIG = {
  // 基础URL
  baseURL: 'http://localhost:3000',
  
  // 超时时间
  timeout: 10000,
  
  // 接口路径
  endpoints: {
    // 用户相关
    login: '/api/user/login',
    register: '/api/user/register',
    getProfile: '/api/user/profile',
    updateProfile: '/api/user/profile',
    
    // 字帖相关
    getWorksheets: '/api/worksheet/list',
    getWorksheetDetail: '/api/worksheet/detail',
    generateWorksheet: '/api/worksheet/generate',
    
    // 会员相关
    getMembershipPlans: '/api/membership/plans',
    purchaseMembership: '/api/membership/purchase',
    getMembershipStatus: '/api/membership/status',
    
    // 验证码相关
    getCaptcha: '/api/captcha',
    sendSmsCode: '/api/sms/code',
    sendEmailCode: '/api/email/code',
    
    // 订单相关
    getOrderHistory: '/api/order/history'
  }
};
