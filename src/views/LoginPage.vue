<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">用户登录</h2>
      
      <div class="tab-container">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'phone' }"
          @click="activeTab = 'phone'"
        >
          手机号登录
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'email' }"
          @click="activeTab = 'email'"
        >
          邮箱登录
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'wechat' }"
          @click="activeTab = 'wechat'"
        >
          微信登录
        </div>
      </div>

      <div class="login-form">
        <!-- 手机号登录 -->
        <div v-if="activeTab === 'phone'" class="form-content">
          <div class="form-group">
            <label for="phone">手机号</label>
            <div class="phone-input-container">
              <input 
                type="tel" 
                id="phone" 
                placeholder="请输入手机号"
                class="form-input"
              />
              <button class="code-btn">获取验证码</button>
            </div>
          </div>
          <div class="form-group">
            <label for="verificationCode">验证码</label>
            <input 
              type="text" 
              id="verificationCode" 
              placeholder="请输入验证码"
              class="form-input"
            />
          </div>
          <button class="login-btn">登录</button>
        </div>

        <!-- 邮箱登录 -->
        <div v-if="activeTab === 'email'" class="form-content">
          <div class="form-group">
            <label for="email">邮箱</label>
            <div class="email-input-container">
              <input 
                type="email" 
                id="email" 
                placeholder="请输入邮箱"
                class="form-input"
              />
              <button class="code-btn">获取验证码</button>
            </div>
          </div>
          <div class="form-group">
            <label for="emailCode">验证码</label>
            <input 
              type="text" 
              id="emailCode" 
              placeholder="请输入验证码"
              class="form-input"
            />
          </div>
          <button class="login-btn">登录</button>
        </div>

        <!-- 微信登录 -->
        <div v-if="activeTab === 'wechat'" class="form-content">
          <div class="wechat-qr">
            <div class="qr-placeholder">
              <span class="qr-icon">📱</span>
              <p>微信扫码登录</p>
              <p class="qr-tip">请使用微信扫一扫上方二维码</p>
            </div>
          </div>
        </div>
      </div>

      <div class="login-footer">
        <p>还没有账号？<router-link to="/register" class="register-link">立即注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('phone')
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  padding: 32px;
}

.login-title {
  text-align: center;
  margin-bottom: 24px;
  color: #1f2937;
  font-size: 28px;
  font-weight: 700;
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

.login-form {
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

.phone-input-container {
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

.login-btn {
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

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.wechat-qr {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.qr-placeholder {
  text-align: center;
  padding: 30px;
  border: 2px dashed #e5e7eb;
  border-radius: 12px;
}

.qr-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.qr-placeholder p {
  margin: 8px 0;
  color: #374151;
  font-weight: 500;
}

.qr-tip {
  font-size: 14px;
  color: #6b7280;
}

.login-footer {
  text-align: center;
  color: #6b7280;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px;
  }
  
  .login-title {
    font-size: 24px;
  }
}
</style>