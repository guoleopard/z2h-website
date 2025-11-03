<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Z2H字帖 | 超级好用的字帖生成工具</h1>
      <p class="hero-description">
        这是一个优雅实用的在线字帖生成工具，可轻松自定义所需字帖，支持汉字和英文任意排版、灵活设置描红样式和大小、自选字体、生成控笔练习字帖、导出图片等。
      </p>
      <router-link to="/hanzi" class="cta-button">
        ✨ 开始生成 ✨
      </router-link>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
  line-height: 1.2;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 20px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .cta-button {
    font-size: 16px;
    padding: 14px 28px;
  }
}
</style>
