<template>
  <div class="membership-container">
    <div class="membership-header">
      <h1 class="page-title">成为会员，解锁更多功能</h1>
      <p class="page-subtitle">选择适合您的会员计划，享受无限制的学习体验</p>
    </div>

    <div class="membership-cards">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>加载会员套餐中...</p>
      </div>
      
      <!-- 错误信息 -->
      <div v-if="error && !loading" class="error-state">
        <p>{{ error }}</p>
      </div>
      
      <!-- 会员套餐卡片 -->
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        :class="['card', plan.name === '月会员' ? 'monthly' : 'annual', plan.popular ? 'popular' : '']"
      >
        <div class="card-header">
          <div :class="['badge', plan.popular ? 'popular-badge' : '']">{{ plan.name }}</div>
          <div v-if="plan.discount" class="discount">{{ plan.discount }}</div>
        </div>
        <div class="card-body">
          <div class="price">
            <span class="amount">¥{{ plan.price }}</span>
            <span class="period">/{{ plan.period }}</span>
          </div>
          <div v-if="plan.originalPrice" class="original-price">原价 ¥{{ plan.originalPrice }}</div>
          <div class="benefits">
            <div 
              v-for="(benefit, index) in plan.benefits" 
              :key="index"
              class="benefit-item"
            >
              <span class="benefit-icon">✅</span>
              <span class="benefit-text">{{ benefit }}</span>
            </div>
          </div>
          <button 
            :class="['buy-btn', plan.popular ? 'popular-btn' : '']"
            @click="purchasePlan(plan.id)"
          >
            立即购买
          </button>
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
import { ref, onMounted } from 'vue'
import { membershipApi } from '../api'

// 会员套餐数据
const plans = ref([])
// 加载状态
const loading = ref(true)
// 错误信息
const error = ref('')

// 购买会员
const purchasePlan = async (planId) => {
  try {
    const response = await membershipApi.purchaseMembership({ 
      planId,
      paymentMethod: 'wechat' // 或 'alipay'、'card'，根据实际情况调整
    })
    // 处理支付逻辑，例如跳转到支付页面或显示支付二维码
    console.log('购买成功:', response)
    alert('购买成功！会员已开通')
  } catch (error) {
    console.error('购买失败:', error)
    alert('购买失败，请稍后重试')
  }
}

// 获取会员套餐
const fetchPlans = async () => {
  try {
    loading.value = true
    const response = await membershipApi.getMembershipPlans()
    // 将API返回的数据更新到plans
    if (response.data && response.data.length > 0) {
      plans.value = response.data
    } else {
      // 如果API返回为空，使用默认数据
      plans.value = [
        {
          id: 1,
          name: '月会员',
          price: 19,
          period: '月',
          benefits: ['无限制访问所有字帖', '无广告干扰', '下载高清字帖PDF', '优先体验新功能', '专属客服支持'],
          popular: false
        },
        {
          id: 2,
          name: '年会员',
          price: 159,
          period: '年',
          originalPrice: 237,
          discount: '立省¥78',
          benefits: ['所有月会员权益', '额外赠送2个月', '专属学习计划', '高级数据分析', '离线使用功能'],
          popular: true
        }
      ]
    }
  } catch (err) {
    console.error('获取会员套餐失败:', err)
    error.value = '获取会员套餐失败，请稍后重试'
    // 使用默认数据
    plans.value = [
      {
        id: 1,
        name: '月会员',
        price: 19,
        period: '月',
        benefits: ['无限制访问所有字帖', '无广告干扰', '下载高清字帖PDF', '优先体验新功能', '专属客服支持'],
        popular: false
      },
      {
        id: 2,
        name: '年会员',
        price: 159,
        period: '年',
        originalPrice: 237,
        discount: '立省¥78',
        benefits: ['所有月会员权益', '额外赠送2个月', '专属学习计划', '高级数据分析', '离线使用功能'],
        popular: true
      }
    ]
  } finally {
    loading.value = false
  }
}

// 页面加载时获取会员套餐
onMounted(() => {
  fetchPlans()
})
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

/* 加载状态 */
.loading-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #ef4444;
  font-size: 18px;
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