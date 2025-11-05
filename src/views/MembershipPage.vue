<template>
  <div class="membership-container">
    <div class="membership-header">
      <h1 class="page-title">成为会员，解锁更多功能</h1>
      <p class="page-subtitle">选择适合您的会员计划，享受无限制的学习体验</p>
    </div>

    <div class="membership-cards">
      <!-- 月会员 -->
      <div class="card monthly">
        <div class="card-header">
          <div class="badge">月会员</div>
        </div>
        <div class="card-body">
          <div class="price">
            <span class="amount">¥19</span>
            <span class="period">/月</span>
          </div>
          <div class="benefits">
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">无限制访问所有字帖</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">无广告干扰</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">下载高清字帖PDF</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">优先体验新功能</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">专属客服支持</span>
            </div>
          </div>
          <button class="buy-btn">立即购买</button>
        </div>
      </div>

      <!-- 年会员 -->
      <div class="card annual popular">
        <div class="card-header">
          <div class="badge popular-badge">年会员</div>
          <div class="discount">立省¥78</div>
        </div>
        <div class="card-body">
          <div class="price">
            <span class="amount">¥159</span>
            <span class="period">/年</span>
          </div>
          <div class="original-price">原价 ¥237</div>
          <div class="benefits">
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">所有月会员权益</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">额外赠送2个月</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">专属学习计划</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">高级数据分析</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">离线使用功能</span>
            </div>
          </div>
          <button class="buy-btn popular-btn">立即购买</button>
        </div>
      </div>
    </div>

    <div class="faq-section">
      <h2 class="faq-title">常见问题</h2>
      <div class="faq-item">
        <div class="faq-question">会员可以在多设备上使用吗？</div>
        <div class="faq-answer">是的，一个会员账号可以在最多3台设备上使用。</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">如何取消自动续费？</div>
        <div class="faq-answer">您可以在个人中心或支付平台（如微信/支付宝）设置中取消自动续费。</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">会员过期后会失去所有功能吗？</div>
        <div class="faq-answer">会员过期后，您将无法访问会员专属内容，但可以继续使用免费功能。</div>
      </div>
      <div class="faq-item">
        <div class="faq-question">可以退款吗？</div>
        <div class="faq-answer">购买后7天内，如果您未使用主要会员功能，可以申请全额退款。</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.membership-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 64px);
}

.membership-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.page-subtitle {
  font-size: 18px;
  color: #6b7280;
}

.membership-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 80px;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card.monthly {
  border: 2px solid #e5e7eb;
}

.card.annual {
  border: 2px solid #667eea;
}

.card-header {
  padding: 24px;
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
}

.popular-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
}

.discount {
  margin-top: 12px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
}

.card-body {
  padding: 32px;
}

.price {
  text-align: center;
  margin-bottom: 24px;
}

.amount {
  font-size: 48px;
  font-weight: 700;
  color: #1f2937;
}

.period {
  font-size: 24px;
  color: #6b7280;
  margin-left: 8px;
}

.original-price {
  text-align: center;
  margin-bottom: 24px;
  color: #9ca3af;
  text-decoration: line-through;
  font-size: 14px;
}

.benefits {
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  color: #374151;
}

.benefit-icon {
  margin-right: 12px;
  font-size: 20px;
}

.buy-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.popular-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
}

.popular-btn:hover {
  box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
}

.faq-section {
  max-width: 800px;
  margin: 0 auto;
}

.faq-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 40px;
}

.faq-item {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.faq-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.faq-question {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  cursor: pointer;
}

.faq-answer {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 32px;
  }
  
  .membership-cards {
    grid-template-columns: 1fr;
  }
  
  .card-body {
    padding: 24px;
  }
  
  .amount {
    font-size: 36px;
  }
}
</style>