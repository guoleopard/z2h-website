<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/">Z2H.CN</router-link>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">沪ICP备15020427号-7</a>
      </div>
      <div class="footer-text">
        翰墨之道，得法者成 | 丹青之妙，勤习者达
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  margin-top: 80px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.footer-links a {
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #1f2937;
}

.footer-text {
  color: #9ca3af;
  font-size: 14px;
  font-style: italic;
}

@media (max-width: 768px) {
  .footer-links {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
