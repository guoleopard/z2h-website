<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-info">
        <div class="avatar">
          <span class="avatar-icon">👤</span>
        </div>
        <div class="user-info">
          <h2 class="username">张三</h2>
          <p class="user-email">zhangsan@example.com</p>
          <p class="user-level">等级：Lv.5</p>
        </div>
      </div>
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-number">120</span>
          <span class="stat-label">学习天数</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">365</span>
          <span class="stat-label">练习次数</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">15</span>
          <span class="stat-label">完成字帖</span>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <!-- Tab标签 -->
      <div class="profile-tabs">
        <div class="tab-item" :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">
          <div class="tab-icon">⚙️</div>
          <div class="tab-text">个人设置</div>
        </div>
        <div class="tab-item" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">
          <div class="tab-icon">📋</div>
          <div class="tab-text">我的订单</div>
        </div>
        <div class="tab-item" :class="{ active: activeTab === 'invites' }" @click="activeTab = 'invites'">
          <div class="tab-icon">👥</div>
          <div class="tab-text">我的邀请</div>
        </div>
      </div>

      <!-- Tab内容 -->
      <div class="tab-content">
        <!-- 个人设置 -->
        <div v-if="activeTab === 'settings'" class="content-section">
          <h3 class="section-title">个人设置</h3>
          <div class="settings-list">
            <div class="setting-item" @click="activeTab = 'change-phone'">
              <div class="setting-icon">📱</div>
              <div class="setting-info">
                <div class="setting-title">修改手机号</div>
                <div class="setting-desc">当前手机号：{{ userData.phone }}</div>
              </div>
              <div class="setting-action">></div>
            </div>
            <div class="setting-item" @click="activeTab = 'change-email'">
              <div class="setting-icon">📧</div>
              <div class="setting-info">
                <div class="setting-title">修改邮箱</div>
                <div class="setting-desc">当前邮箱：{{ userData.email }}</div>
              </div>
              <div class="setting-action">></div>
            </div>
            <!-- <div class="setting-item">
              <div class="setting-icon">🔒</div>
              <div class="setting-info">
                <div class="setting-title">修改密码</div>
                <div class="setting-desc">点击修改登录密码</div>
              </div>
              <div class="setting-action">></div>
            </div> -->
            
            <div class="setting-item" @click="bindWechat">
              <div class="setting-icon">💬</div>
              <div class="setting-info">
                <div class="setting-title">绑定微信</div>
                <div class="setting-desc">{{ userData.wechat ? '已绑定微信' : '点击绑定微信' }}</div>
              </div>
              <div class="setting-action">></div>
            </div>
            <div class="setting-item">
              <div class="setting-icon">📤</div>
              <div class="setting-info">
                <div class="setting-title">退出登录</div>
                <div class="setting-desc">安全退出当前账号</div>
              </div>
              <div class="setting-action">></div>
            </div>
          </div>
        </div>

        <!-- 我的订单 -->
        <div v-if="activeTab === 'orders'" class="content-section">
          <h3 class="section-title">我的订单</h3>
          <div class="order-list">
            <div v-if="userData.orders.length === 0" class="no-orders">
              <p>暂无订单记录</p>
            </div>
            <div v-for="order in currentOrders" :key="order.id" class="order-card">
              <div class="order-header">
                <div class="order-info">
                  <div class="order-number">订单号：{{ order.orderNumber }}</div>
                  <div class="order-date">{{ order.date }}</div>
                </div>
                <div class="order-status" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </div>
              </div>
              <div class="order-details">
                <div class="order-item">
                  <div class="item-name">{{ order.itemName }}</div>
                  <div class="item-price">¥{{ order.price.toFixed(2) }}</div>
                </div>
              </div>
              <div class="order-total">
                <div class="total-label">总计：</div>
                <div class="total-amount">¥{{ order.total.toFixed(2) }}</div>
              </div>
            </div>
          </div>
          <!-- 分页控件 -->
          <div v-if="totalPages > 1" class="pagination">
            <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
            <div class="page-numbers">
              <button 
                v-for="page in totalPages" 
                :key="page" 
                class="page-number" 
                :class="{ active: currentPage === page }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
          </div>
        </div>

        <!-- 修改手机号 -->
        <div v-if="activeTab === 'change-phone'" class="content-section">
          <h3 class="section-title">修改手机号</h3>
          <div class="form-container">
            <div class="form-group">
              <label for="old-phone" class="form-label">当前手机号</label>
              <input type="tel" id="old-phone" class="form-input" value="{{ userData.phone }}" disabled>
            </div>
            <div class="form-group">
              <label for="new-phone" class="form-label">新手机号</label>
              <input type="tel" id="new-phone" class="form-input" v-model="newPhone" placeholder="请输入新手机号">
            </div>
            <div class="form-group">
              <label for="phone-code" class="form-label">验证码</label>
              <div class="code-input-container">
                <input type="text" id="phone-code" class="form-input code-input" v-model="phoneCode" placeholder="请输入验证码">
                <button class="code-btn" @click="sendPhoneCode" :disabled="isPhoneCodeSending">
                  {{ phoneCodeText }}
                </button>
              </div>
            </div>
            <div class="form-group">
              <button class="submit-btn" @click="changePhone">提交修改</button>
            </div>
          </div>
        </div>

        <!-- 修改邮箱 -->
        <div v-if="activeTab === 'change-email'" class="content-section">
          <h3 class="section-title">修改邮箱</h3>
          <div class="form-container">
            <div class="form-group">
              <label for="old-email" class="form-label">当前邮箱</label>
              <input type="email" id="old-email" class="form-input" value="{{ userData.email }}" disabled>
            </div>
            <div class="form-group">
              <label for="new-email" class="form-label">新邮箱</label>
              <input type="email" id="new-email" class="form-input" v-model="newEmail" placeholder="请输入新邮箱">
            </div>
            <div class="form-group">
              <label for="email-code" class="form-label">验证码</label>
              <div class="code-input-container">
                <input type="text" id="email-code" class="form-input code-input" v-model="emailCode" placeholder="请输入验证码">
                <button class="code-btn" @click="sendEmailCode" :disabled="isEmailCodeSending">
                  {{ emailCodeText }}
                </button>
              </div>
            </div>
            <div class="form-group">
              <button class="submit-btn" @click="changeEmail">提交修改</button>
            </div>
          </div>
        </div>

        <!-- 我的邀请 -->
        <div v-if="activeTab === 'invites'" class="content-section">
          <h3 class="section-title">我的邀请</h3>
          <div class="invite-list">
            <div v-if="userData.invites.length === 0" class="no-invites">
              <p>暂无邀请记录</p>
            </div>
            <div v-for="invite in userData.invites" :key="invite.id" class="invite-card">
              <div class="invite-info">
                <div class="invitee-name">被邀请人：{{ invite.invitee }}</div>
                <div class="invite-date">{{ invite.date }}</div>
              </div>
              <div class="invite-status" :class="getStatusClass(invite.status)">
                {{ invite.status }}
              </div>
              <div class="invite-reward">
                {{ invite.reward }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userApi } from '../api'

// 模拟用户数据
const userData = ref({
  username: '张三',
  email: 'zhangsan@example.com',
  phone: '138****8888',
  wechat: null,
  level: 5,
  learningDays: 120,
  practiceCount: 365,
  completedWorksheets: 15,
  worksheets: [
    { title: '汉字基础字帖', date: '2024-01-15', status: '已完成' },
    { title: '英语单词字帖', date: '2024-01-14', status: '已完成' },
    { title: '数字书写字帖', date: '2024-01-13', status: '已完成' }
  ],
  orders: [
    { id: 1, orderNumber: 'ORD20240115001', date: '2024-01-15', status: '已支付', itemName: '月度会员', price: 19.99, total: 19.99 },
    { id: 2, orderNumber: 'ORD20240110002', date: '2024-01-10', status: '已支付', itemName: '年度会员', price: 199.99, total: 199.99 },
    { id: 3, orderNumber: 'ORD20240105003', date: '2024-01-05', status: '已取消', itemName: '月度会员', price: 19.99, total: 19.99 }
  ],
  invites: [
    { id: 1, invitee: '李四', date: '2024-01-15', status: '已注册', reward: '10积分' },
    { id: 2, invitee: '王五', date: '2024-01-10', status: '已注册', reward: '10积分' },
    { id: 3, invitee: '赵六', date: '2024-01-05', status: '未注册', reward: '10积分' }
  ]
})

// 当前激活的tab标签
const activeTab = ref('settings')

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(2) // 每页显示2条订单
const totalPages = ref(1)

// 修改手机号相关变量
const newPhone = ref('')
const phoneCode = ref('')
const isPhoneCodeSending = ref(false)
const phoneCodeText = ref('获取验证码')

// 修改邮箱相关变量
const newEmail = ref('')
const emailCode = ref('')
const isEmailCodeSending = ref(false)
const emailCodeText = ref('获取验证码')

// 退出登录
const logout = () => {
  localStorage.removeItem('token')
  // 跳转到登录页
  window.location.href = '/login'
}

// 绑定微信
const bindWechat = () => {
  // 这里可以添加微信绑定的逻辑
  // 例如：调用微信API进行授权登录
  // 模拟绑定微信
  if (userData.value.wechat) {
    // 已绑定，取消绑定
    userData.value.wechat = null
    alert('已取消微信绑定')
  } else {
    // 未绑定，进行绑定
    userData.value.wechat = 'wechat_123456789'
    alert('微信绑定成功')
  }
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await userApi.getProfile()
    // 将API返回的数据更新到userData
    userData.value = { ...userData.value, ...response.data }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// 获取订单记录
const fetchOrderHistory = async () => {
  try {
    const response = await userApi.getOrderHistory()
    // 将API返回的订单数据更新到userData
    userData.value.orders = response.data.orders || []
    // 更新当前页订单数据
    updateCurrentOrders()
  } catch (error) {
    console.error('获取订单记录失败:', error)
  }
}

// 获取订单状态对应的CSS类名
const getStatusClass = (status) => {
  switch (status) {
    case '已支付':
      return 'paid'
    case '待支付':
      return 'pending'
    case '已取消':
      return 'cancelled'
    default:
      return ''
  }
}

// 计算当前页的订单数据
const currentOrders = ref([])

// 更新当前页订单数据
const updateCurrentOrders = () => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  currentOrders.value = userData.value.orders.slice(startIndex, endIndex)
  totalPages.value = Math.ceil(userData.value.orders.length / pageSize.value)
}

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  updateCurrentOrders()
}

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    updateCurrentOrders()
  }
}

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updateCurrentOrders()
  }
}

// 发送手机验证码
const sendPhoneCode = () => {
  if (!newPhone.value) {
    alert('请输入新手机号')
    return
  }
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(newPhone.value)) {
    alert('请输入正确的手机号格式')
    return
  }
  // 模拟发送验证码
  isPhoneCodeSending.value = true
  phoneCodeText.value = '发送中...'
  setTimeout(() => {
    isPhoneCodeSending.value = false
    phoneCodeText.value = '60秒后重新获取'
    // 60秒后恢复获取验证码按钮
    setTimeout(() => {
      phoneCodeText.value = '获取验证码'
    }, 60000)
    alert('验证码发送成功')
  }, 1500)
}

// 修改手机号
const changePhone = () => {
  if (!newPhone.value || !phoneCode.value) {
    alert('请填写完整信息')
    return
  }
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(newPhone.value)) {
    alert('请输入正确的手机号格式')
    return
  }
  // 验证验证码
  if (phoneCode.value !== '123456') {
    alert('验证码错误')
    return
  }
  // 模拟修改手机号
  userData.value.phone = newPhone.value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  alert('手机号修改成功')
  // 重置表单
  newPhone.value = ''
  phoneCode.value = ''
  phoneCodeText.value = '获取验证码'
  // 切换回个人设置页面
  activeTab.value = 'settings'
}

// 发送邮箱验证码
const sendEmailCode = () => {
  if (!newEmail.value) {
    alert('请输入新邮箱')
    return
  }
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newEmail.value)) {
    alert('请输入正确的邮箱格式')
    return
  }
  // 模拟发送验证码
  isEmailCodeSending.value = true
  emailCodeText.value = '发送中...'
  setTimeout(() => {
    isEmailCodeSending.value = false
    emailCodeText.value = '60秒后重新获取'
    // 60秒后恢复获取验证码按钮
    setTimeout(() => {
      emailCodeText.value = '获取验证码'
    }, 60000)
    alert('验证码发送成功')
  }, 1500)
}

// 修改邮箱
const changeEmail = () => {
  if (!newEmail.value || !emailCode.value) {
    alert('请填写完整信息')
    return
  }
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newEmail.value)) {
    alert('请输入正确的邮箱格式')
    return
  }
  // 验证验证码
  if (emailCode.value !== '123456') {
    alert('验证码错误')
    return
  }
  // 模拟修改邮箱
  userData.value.email = newEmail.value
  alert('邮箱修改成功')
  // 重置表单
  newEmail.value = ''
  emailCode.value = ''
  emailCodeText.value = '获取验证码'
  // 切换回个人设置页面
  activeTab.value = 'settings'
}

// 页面加载时获取用户信息和订单记录
onMounted(() => {
  fetchUserInfo()
  fetchOrderHistory().then(() => {
    updateCurrentOrders()
  })
})
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 40px;
}

.user-info h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
}

.user-email,
.user-level {
  margin: 0 0 4px 0;
  font-size: 14px;
  opacity: 0.9;
}

.profile-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.profile-content {
  display: flex;
  gap: 30px;
}

/* Tab标签样式 */
.profile-tabs {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.tab-item:hover {
  background: #e5e7eb;
}

.tab-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-left-color: #667eea;
}

/* 分页样式 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.page-btn {
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.page-btn:hover:not(:disabled) {
  background: #e5e7eb;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.page-number:hover:not(.active) {
  background: #e5e7eb;
}

.page-number.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

/* 表单样式 */
.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.code-input-container {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.code-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  white-space: nowrap;
}

.code-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.code-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.tab-icon {
  font-size: 24px;
}

.tab-text {
  font-size: 16px;
  font-weight: 600;
}

/* Tab内容样式 */
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.content-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.section-title {
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.progress-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.progress-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
}

.progress-icon {
  font-size: 40px;
}

.progress-info {
  flex: 1;
}

.progress-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  color: #6b7280;
}

.worksheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* 邀请记录样式 */
.invite-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.invite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.invite-card:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.invite-info {
  flex: 1;
}

.invitee-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1f2937;
}

.invite-date {
  font-size: 14px;
  color: #6b7280;
}

.invite-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  min-width: 80px;
}

.invite-status.paid {
  background: #d1fae5;
  color: #065f46;
}

.invite-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.invite-status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.invite-reward {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
}

.no-invites {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 8px;
}

.worksheet-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.worksheet-icon {
  font-size: 32px;
}

.worksheet-info {
  flex: 1;
}

.worksheet-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1f2937;
}

.worksheet-date {
  font-size: 14px;
  color: #6b7280;
}

.worksheet-status {
  padding: 4px 12px;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.setting-item:hover {
  background: #e5e7eb;
}

.setting-icon {
  font-size: 24px;
  color: #667eea;
}

.setting-info {
  flex: 1;
}

.setting-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1f2937;
}

.setting-desc {
  font-size: 14px;
  color: #6b7280;
}

.setting-action {
  font-size: 20px;
  color: #9ca3af;
}

/* 订单列表样式 */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-orders {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 8px;
}

.order-card {
  background: #f3f4f6;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #667eea;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-number {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.order-date {
  font-size: 12px;
  color: #6b7280;
}

.order-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.order-status.paid {
  background: #10b981;
}

.order-status.pending {
  background: #f59e0b;
}

.order-status.cancelled {
  background: #ef4444;
}

.order-details {
  margin-bottom: 16px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
}

.order-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.total-label {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.total-amount {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

@media (max-width: 768px) {
    .profile-header {
      flex-direction: column;
      text-align: center;
    }

    .profile-info {
      flex-direction: column;
    }

    .profile-stats {
      justify-content: space-around;
      width: 100%;
    }

    .profile-content {
      flex-direction: column;
    }

    .profile-tabs {
      width: 100%;
      flex-direction: row;
      overflow-x: auto;
    }

    .tab-item {
      flex-shrink: 0;
    }

    .progress-cards,
    .worksheet-grid {
      grid-template-columns: 1fr;
    }
}
</style>