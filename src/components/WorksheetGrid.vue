<template>
  <section class="worksheet-section">
    <div class="container">
      <h2 class="section-title">选择字帖类型</h2>
      
      <div class="category">
        <h3 class="category-title">语文字帖</h3>
        <div class="grid">
          <WorksheetCard
            icon="📝"
            title="汉字字帖"
            description="对每个汉字反复练习，加强肌肉记忆"
            link="/hanzi"
            buttonText="开始生成"
          />
          <WorksheetCard
            icon="📚"
            title="词组字帖"
            description="练字的同时也能学习和复习语文词组"
            link="/cizu"
            buttonText="开始生成"
          />
          <WorksheetCard
            icon="📄"
            title="段落字帖"
            description="所见即所得，可练习文章、段落和语句"
            link="/duanluo"
            buttonText="开始生成"
          />
          <WorksheetCard
            icon="✏️"
            title="笔画字帖"
            description="从最基础的笔画开始练习，适合刚学习汉字的初学者"
            link="/bihua"
            buttonText="开始生成"
          />
        </div>
      </div>

      <div class="category">
        <h3 class="category-title">英文字帖</h3>
        <div class="grid">
          <WorksheetCard
            icon="🔤"
            title="字母字帖"
            description="对每个字母反复练习，加强肌肉记忆"
            link="/alphabet"
            buttonText="开始生成"
          />
          <WorksheetCard
            icon="📖"
            title="单词字帖"
            description="练字的同时加强对单词或词汇的记忆"
            link="/word"
            buttonText="开始生成"
          />
          <WorksheetCard
            icon="📝"
            title="段落字帖"
            description="练习英文书写的连贯性和速度"
            link="/paragraph"
            buttonText="开始生成"
          />
        </div>
      </div>

      <div class="coming-soon">
        <h3 class="category-title">更多字帖</h3>
        <p class="coming-soon-text">更多字帖正在开发中，敬请期待！</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import WorksheetCard from './WorksheetCard.vue'
</script>

<style scoped>
.worksheet-section {
  padding: 80px 20px;
  background: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 60px;
}

.category {
  margin-bottom: 60px;
}

.category-title {
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 32px;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.coming-soon {
  text-align: center;
  padding: 60px 20px;
}

.coming-soon-text {
  color: #6b7280;
  font-size: 18px;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .worksheet-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  .category-title {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
