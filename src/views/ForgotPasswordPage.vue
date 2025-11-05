<template>
  <div class="forgot-password-container">
    <div class="forgot-password-card">
      <h2 class="forgot-password-title">忘记密码</h2>
      <p class="forgot-password-subtitle">请选择找回密码的方式</p>
      
      <div class="tab-container">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'phone' }"
          @click="activeTab = 'phone'"
        >
          手机号找回
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'email' }"
          @click="activeTab = 'email'"
        >
          邮箱找回
        </div>
      </div>

      <div class="forgot-password-form">
        <!-- 手机号找回 -->
        <div v-if="activeTab === 'phone'" class="form-content">
          <div class="form-group">
            <label for="phone">手机号</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="请输入手机号" 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="phoneCaptcha">图形验证码</label>
            <div class="captcha-container">
              <input 
                type="text" 
                id="phoneCaptcha" 
                placeholder="请输入图形验证码" 
                class="form-input captcha-input"
                v-model="userCaptcha"
              />
              <div class="captcha-code" @click="refreshCaptcha">
                {{ captcha }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="phoneVerificationCode">短信验证码</label>
            <div class="code-container">
              <input 
                type="text" 
                id="phoneVerificationCode" 
                placeholder="请输入短信验证码" 
                class="form-input"
              />
              <button class="code-btn" @click="sendPhoneCode">获取验证码</button>
            </div>
          </div>
          <div class="form-group">
            <label for="newPhonePassword">新密码</label>
            <input 
              type="password" 
              id="newPhonePassword" 
              placeholder="请输入新密码" 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="confirmPhonePassword">确认新密码</label>
            <input 
              type="password" 
              id="confirmPhonePassword" 
              placeholder="请确认新密码" 
              class="form-input"
            />
          </div>
          <button class="reset-btn">重置密码</button>
        </div>

        <!-- 邮箱找回 -->
        <div v-if="activeTab === 'email'" class="form-content">
          <div class="form-group">
            <label for="email">邮箱</label>
            <input 
              type="email" 
              id="email" 
              placeholder="请输入邮箱" 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="emailCaptcha">图形验证码</label>
            <div class="captcha-container">
              <input 
                type="text" 
                id="emailCaptcha" 
                placeholder="请输入图形验证码" 
                class="form-input captcha-input"
                v-model="userCaptcha"
              />
              <div class="captcha-code" @click="refreshCaptcha">
                {{ captcha }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="emailVerificationCode">邮箱验证码</label>
            <div class="code-container">
              <input 
                type="text" 
                id="emailVerificationCode" 
                placeholder="请输入邮箱验证码" 
                class="form-input"
              />
              <button class="code-btn" @click="sendEmailCode">获取验证码</button>
            </div>
          </div>
          <div class="form-group">
            <label for="newEmailPassword">新密码</label>
            <input 
              type="password" 
              id="newEmailPassword" 
              placeholder="请输入新密码" 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="confirmEmailPassword">确认新密码</label>
            <input 
              type="password" 
              id="confirmEmailPassword" 
              placeholder="请确认新密码" 
              class="form-input"
            />
          </div>
          <button class="reset-btn">重置密码</button>
        </div>
      </div>

      <div class="forgot-password-footer">
        <p>想起密码了？<router-link to="/login" class="login-link">返回登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('phone')
const captcha = ref('')
const userCaptcha = ref('')

// 生成随机验证码
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captcha.value = result
}

// 初始化验证码
onMounted(() => {
  generateCaptcha()
})

// 点击刷新验证码
const refreshCaptcha = () => {
  generateCaptcha()
}

// 校验验证码
const validateCaptcha = () => {
  return userCaptcha.value.toLowerCase() === captcha.value.toLowerCase()
}

// 模拟发送手机验证码
const sendPhoneCode = () => {
  if (!validateCaptcha()) {
    alert('验证码错误，请重新输入')
    return
  }
  // 这里可以添加实际的发送手机验证码逻辑
  alert('手机验证码发送成功')
}

// 模拟发送邮箱验证码
const sendEmailCode = () => {
  if (!validateCaptcha()) {
    alert('验证码错误，请重新输入')
    return
  }
  // 这里可以添加实际的发送邮箱验证码逻辑
  alert('邮箱验证码发送成功')
}
</script>

<style scoped>
.forgot-password-container {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.forgot-password-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  padding: 32px;
}

.forgot-password-title {
  text-align: center;
  margin-bottom: 8px;
  color: #1f2937;
  font-size: 28px;
  font-weight: 700;
}

.forgot-password-subtitle {
  text-align: center;
  margin-bottom: 24px;
  color: #6b7280;
  font-size: 14px;
}

.tab-container {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  color: #6b7280;
  font-weight: 500;
  transition: all 0.3s;
}

.tab-item:hover {
  color: #667eea;
}

.tab-item.active {
  color: #667eea;
  border-bottom: 2px solid #667eea;
}

.forgot-password-form {
  margin-bottom: 24px;
}

.form-content {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.captcha-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.captcha-input {
  flex: 1;
}

.captcha-code {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 4px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
}

.captcha-code:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.code-container {
  display: flex;
  gap: 12px;
}

.code-btn {
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.code-btn:hover {
  background: #5568d3;
}

.reset-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.forgot-password-footer {
  text-align: center;
  color: #6b7280;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .forgot-password-card {
    padding: 24px;
  }
  
  .forgot-password-title {
    font-size: 24px;
  }
}
</style>