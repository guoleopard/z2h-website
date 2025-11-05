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

      <div class="category">
        <h3 class="category-title">小学各年级字帖</h3>
        <div class="filters">
          <div class="filter-group">
            <label for="grade-select">选择年级：</label>
            <select id="grade-select" v-model="selectedGrade">
              <option value="">全部年级</option>
              <option value="一年级">一年级</option>
              <option value="二年级">二年级</option>
              <option value="三年级">三年级</option>
              <option value="四年级">四年级</option>
              <option value="五年级">五年级</option>
              <option value="六年级">六年级</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="subject-select">选择科目：</label>
            <select id="subject-select" v-model="selectedSubject">
              <option value="">全部科目</option>
              <option value="语文">语文</option>
              <option value="英文">英文</option>
            </select>
          </div>
        </div>
        <div class="grid">
          <WorksheetCard
            v-for="worksheet in filteredWorksheets"
            :key="worksheet.title"
            :icon="worksheet.icon"
            :title="worksheet.title"
            :description="worksheet.description"
            :link="worksheet.link"
            :buttonText="worksheet.buttonText"
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
import { ref, computed } from 'vue'

const selectedGrade = ref('')
const selectedSubject = ref('')

const worksheets = [
  { icon: '📚', title: '一年级语文字帖', description: '适合小学一年级学生的语文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '🔤', title: '一年级英文字帖', description: '适合小学一年级学生的英文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '📚', title: '二年级语文字帖', description: '适合小学二年级学生的语文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '🔤', title: '二年级英文字帖', description: '适合小学二年级学生的英文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '📚', title: '三年级语文字帖', description: '适合小学三年级学生的语文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '🔤', title: '三年级英文字帖', description: '适合小学三年级学生的英文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '📚', title: '四年级语文字帖', description: '适合小学四年级学生的语文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '🔤', title: '四年级英文字帖', description: '适合小学四年级学生的英文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '📚', title: '五年级语文字帖', description: '适合小学五年级学生的语文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '🔤', title: '五年级英文字帖', description: '适合小学五年级学生的英文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '📚', title: '六年级语文字帖', description: '适合小学六年级学生的语文练习字帖', link: '/membership', buttonText: '立即购买' },
  { icon: '🔤', title: '六年级英文字帖', description: '适合小学六年级学生的英文练习字帖', link: '/membership', buttonText: '立即购买' }
]

const filteredWorksheets = computed(() => {
  return worksheets.filter(worksheet => {
    const matchesGrade = !selectedGrade.value || worksheet.title.includes(selectedGrade.value)
    const matchesSubject = !selectedSubject.value || worksheet.title.includes(selectedSubject.value)
    return matchesGrade && matchesSubject
  })
})
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

.filters {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.filter-group select {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  color: #1f2937;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
