<template>
  <div class="donate-container">
    <div class="donate-content">
      <h1 class="donate-title">捐赠支持本站</h1>
      <p class="donate-description">
        如果本站对你有些许帮助，那就小小赞助一下吧^_^
      </p>
      <p class="donate-note">
        如有需要可加我微信（willick）交流，有问必答
      </p>

      <div class="donate-methods">
        <h2 class="section-title">捐赠方式</h2>
        
        <div class="donate-method">
          <div class="method-icon">💳</div>
          <div class="method-info">
            <h3 class="method-name">微信支付</h3>
            <p class="method-desc">扫一扫下方二维码</p>
          </div>
          <div class="qr-code">
            <div class="qr-placeholder">微信二维码</div>
          </div>
        </div>

        <div class="donate-method">
          <div class="method-icon">📱</div>
          <div class="method-info">
            <h3 class="method-name">支付宝</h3>
            <p class="method-desc">扫一扫下方二维码</p>
          </div>
          <div class="qr-code">
            <div class="qr-placeholder">支付宝二维码</div>
          </div>
        </div>
      </div>

      <div class="donate-thanks">
        <h2 class="section-title">感谢支持</h2>
        <p class="thanks-text">
          感谢每一位支持本站的朋友！你的捐赠将帮助我们持续维护和改进网站功能，为大家提供更好的学习体验。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.donate-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
  min-height: calc(100vh - 64px);
}

.donate-content {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.donate-title {
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  text-align: center;
}

.donate-description {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 12px;
  text-align: center;
}

.donate-note {
  font-size: 16px;
  color: #667eea;
  margin-bottom: 48px;
  text-align: center;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.donate-methods {
  margin-bottom: 48px;
}

.donate-method {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.donate-method:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

.method-icon {
  font-size: 48px;
}

.method-info {
  flex: 1;
}

.method-name {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.method-desc {
  font-size: 14px;
  color: #6b7280;
}

.qr-code {
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
}

.qr-placeholder {
  font-size: 14px;
  color: #9ca3af;
  text-align: center;
  padding: 20px;
}

.donate-thanks {
  text-align: center;
}

.thanks-text {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .donate-content {
    padding: 32px 24px;
  }
  
  .donate-title {
    font-size: 28px;
  }
  
  .donate-method {
    flex-direction: column;
    text-align: center;
  }
  
  .qr-code {
    width: 120px;
    height: 120px;
  }
}
</style>