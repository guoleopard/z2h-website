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


      <div class="content-section">
        <h3 class="section-title">我的字帖</h3>
        <div class="worksheet-grid">
          <div class="worksheet-card">
            <div class="worksheet-icon">📄</div>
            <div class="worksheet-info">
              <div class="worksheet-title">汉字基础字帖</div>
              <div class="worksheet-date">2024-01-15</div>
            </div>
            <div class="worksheet-status">已完成</div>
          </div>
          <div class="worksheet-card">
            <div class="worksheet-icon">📄</div>
            <div class="worksheet-info">
              <div class="worksheet-title">英语单词字帖</div>
              <div class="worksheet-date">2024-01-14</div>
            </div>
            <div class="worksheet-status">已完成</div>
          </div>
          <div class="worksheet-card">
            <div class="worksheet-icon">📄</div>
            <div class="worksheet-info">
              <div class="worksheet-title">数字书写字帖</div>
              <div class="worksheet-date">2024-01-13</div>
            </div>
            <div class="worksheet-status">已完成</div>
          </div>
        </div>
      </div>

      <div class="content-section">
        <h3 class="section-title">个人设置</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-icon">📱</div>
            <div class="setting-info">
              <div class="setting-title">修改手机号</div>
              <div class="setting-desc">当前手机号：138****8888</div>
            </div>
            <div class="setting-action">></div>
          </div>
          <div class="setting-item">
            <div class="setting-icon">📧</div>
            <div class="setting-info">
              <div class="setting-title">修改邮箱</div>
              <div class="setting-desc">当前邮箱：zhangsan@example.com</div>
            </div>
            <div class="setting-action">></div>
          </div>
          <div class="setting-item">
            <div class="setting-icon">🔒</div>
            <div class="setting-info">
              <div class="setting-title">修改密码</div>
              <div class="setting-desc">点击修改登录密码</div>
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
    </div>
  </div>
</template>

<script setup>
// 这里可以添加个人中心的逻辑
// 例如：获取用户信息、学习进度等
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

  .progress-cards,
  .worksheet-grid {
    grid-template-columns: 1fr;
  }
}
</style>