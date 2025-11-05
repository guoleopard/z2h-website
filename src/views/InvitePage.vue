<template>
  <div class="invite-container">
    <div class="invite-header">
      <h1>邀请奖励</h1>
      <p>分享快乐，共同学习</p>
    </div>
    
    <div class="invite-content">
      <div class="invite-card">
        <div class="card-icon">
          <span class="icon">🎁</span>
        </div>
        <div class="card-content">
          <h2>邀请好友</h2>
          <p>将您的邀请链接分享给朋友，邀请他们注册成为新用户</p>
        </div>
      </div>
      
      <div class="invite-card">
        <div class="card-icon">
          <span class="icon">✨</span>
        </div>
        <div class="card-content">
          <h2>好友注册</h2>
          <p>当您的朋友通过邀请链接注册并完成首次登录后</p>
        </div>
      </div>
      
      <div class="invite-card">
        <div class="card-icon">
          <span class="icon">🎊</span>
        </div>
        <div class="card-content">
          <h2>获得奖励</h2>
          <p>您和您的朋友将各自获得1个月的免费会员资格</p>
        </div>
      </div>
    </div>
    
    <div class="invite-details">
      <h3>奖励详情</h3>
      <ul>
        <li>会员有效期将自动添加到您的账户</li>
        <li>每个用户最多可邀请10位好友</li>
        <li>奖励将在好友完成注册后24小时内到账</li>
        <li>如有疑问，请联系客服</li>
      </ul>
    </div>
    
    <div class="invite-action">
      <button class="invite-btn">复制邀请链接</button>
      <button class="share-btn">分享到社交媒体</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvitePage',
  methods: {
    copyInviteLink() {
      // 这里可以实现复制邀请链接的功能
      alert('邀请链接已复制到剪贴板！');
    },
    shareToSocialMedia() {
      // 这里可以实现分享到社交媒体的功能
      alert('分享功能开发中...');
    }
  }
}
</script>

<style scoped>
.invite-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
}

.invite-header {
  text-align: center;
  margin-bottom: 40px;
}

.invite-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.invite-header p {
  font-size: 1.2rem;
  color: #666;
}

.invite-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.invite-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.invite-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  margin-right: 20px;
}

.card-icon .icon {
  font-size: 3rem;
}

.card-content h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-content p {
  font-size: 1rem;
  opacity: 0.9;
}

.invite-details {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 40px;
}

.invite-details h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.invite-details ul {
  list-style: none;
  padding: 0;
}

.invite-details li {
  padding: 10px 0;
  color: #666;
  border-bottom: 1px solid #e9ecef;
}

.invite-details li:last-child {
  border-bottom: none;
}

.invite-action {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.invite-btn, .share-btn {
  padding: 15px 30px;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.invite-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.invite-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.share-btn {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.share-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .invite-content {
    grid-template-columns: 1fr;
  }
  
  .invite-action {
    flex-direction: column;
  }
}
</style>