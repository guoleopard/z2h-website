<template>
  <div class="worksheet-card">
    <div class="card-icon">{{ icon }}</div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
    <router-link :to="link" class="card-link">
      {{ buttonText }} →
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: '开始生成'
  }
})
</script>

<style scoped>
.worksheet-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.worksheet-card:hover {
  border-color: #667eea;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 12px;
}

.card-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.card-link {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;
}

.card-link:hover {
  background: #5a67d8;
}

@media (max-width: 768px) {
  .worksheet-card {
    padding: 24px;
  }
  
  .card-icon {
    font-size: 36px;
  }
  
  .card-title {
    font-size: 18px;
  }
}
</style>
