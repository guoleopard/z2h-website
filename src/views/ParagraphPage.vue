<template>
  <div class="paragraph-page">
    <div class="page-container">
      <!-- 左侧预览区域 -->
      <main class="main-content">
        <div class="preview-header">
          <h2 class="preview-title">英文段落字帖</h2>
          <div class="preview-tools">
            <button @click="zoomOut" class="tool-btn" title="缩小">−</button>
            <span class="zoom-level">{{ Math.round(zoomLevel * 100) }}%</span>
            <button @click="zoomIn" class="tool-btn" title="放大">+</button>
            <button @click="resetZoom" class="tool-btn" title="重置">⟲</button>
          </div>
        </div>

        <div class="preview-wrapper">
          <div 
            class="preview-container" 
            :style="{ transform: `scale(${zoomLevel})` }"
          >
            <!-- 多页显示 -->
            <div 
              v-for="(pageContent, pageIndex) in generatedPages"
              :key="pageIndex"
              ref="worksheetRef"
              class="worksheet-paper"
            >
              <div class="paragraph-content">
                <p v-html="pageContent"></p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧控制面板 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <!-- 输入段落 -->
          <section class="control-section">
            <h3 class="section-title">输入段落</h3>
            <button @click="showInputDialog = true" class="btn btn-primary">
              <span class="btn-icon">✏️</span>
              输入内容
            </button>
            <div class="input-hint">提示：点击按钮输入要练习的段落</div>
          </section>

          <!-- 输入对话框 -->
          <div v-if="showInputDialog" class="dialog-overlay" @click="showInputDialog = false">
            <div class="dialog-content" @click.stop>
              <div class="dialog-header">
                <h3>输入段落</h3>
                <button @click="showInputDialog = false" class="close-btn">×</button>
              </div>
              <div class="dialog-body">
                <textarea 
                  v-model="dialogInputText" 
                  placeholder="请输入要练习的段落..." 
                  class="dialog-textarea"
                  rows="15"
                  autofocus
                ></textarea>
              </div>
              <div class="dialog-footer">
                <button @click="showInputDialog = false" class="btn btn-outline">取消</button>
                <button @click="confirmInput" class="btn btn-primary">确定</button>
              </div>
            </div>
          </div>

          <!-- 字体样式 -->
          <section class="control-section">
            <h3 class="section-title">字体样式</h3>
            <div class="form-row">
              <label class="form-label">字体</label>
              <select v-model="settings.fontFamily" class="form-select">
                <option value="'Arial', sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Verdana', sans-serif">Verdana</option>
                <option value="'Georgia', serif">Georgia</option>
              </select>
            </div>
            <div class="form-row">
              <label class="form-label">字体大小</label>
              <div class="range-control">
                <input type="range" v-model="settings.fontSizeRatio" min="0.4" max="1.2" step="0.05" class="range-input">
                <span class="range-value">{{ Math.round(settings.fontSizeRatio * 100) }}%</span>
              </div>
            </div>
          </section>

          <!-- 布局设置 -->
          <section class="control-section">
            <h3 class="section-title">布局设置</h3>
            <div class="form-row">
              <label class="form-label">行间距</label>
              <div class="range-control">
                <input type="range" v-model="settings.lineHeight" min="1" max="2" step="0.1" class="range-input">
                <span class="range-value">{{ settings.lineHeight.toFixed(1) }}倍</span>
              </div>
            </div>
            <div class="form-row">
              <label class="form-label">首行缩进</label>
              <div class="range-control">
                <input type="range" v-model="settings.firstLineIndent" min="0" max="4" step="0.5" class="range-input">
                <span class="range-value">{{ settings.firstLineIndent.toFixed(1) }}字符</span>
              </div>
            </div>
          </section>

          <!-- 辅助线设置 -->
          <section class="control-section">
            <h3 class="section-title">辅助线设置</h3>
            <div class="checkbox-list">
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showLines">
                <span>显示书写线</span>
              </label>
            </div>
          </section>

          <!-- 描红设置 -->
          <section class="control-section">
            <h3 class="section-title">描红设置</h3>
            <div class="form-row">
              <label class="form-label">描红颜色</label>
              <select v-model="settings.traceColor" class="form-select">
                <option value="#cccccc">浅灰色</option>
                <option value="#ff0000">红色</option>
                <option value="#0066cc">蓝色</option>
                <option value="#999999">深灰色</option>
              </select>
            </div>
          </section>

          <!-- 操作按钮 -->
          <section class="control-section">
            <button @click="downloadImage" class="btn btn-primary">
              <span class="btn-icon">📥</span>
              下载图片
            </button>
            <button @click="printWorksheet" class="btn btn-outline">
              <span class="btn-icon">🖨️</span>
              打印字帖
            </button>
          </section>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'

// 输入文字
const inputText = ref('Hello, world! This is a sample paragraph for English handwriting practice. You can write any text you want to practice. The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet. Practice makes perfect!')
const showInputDialog = ref(false)
const dialogInputText = ref('')

// 确认输入
const confirmInput = () => {
  inputText.value = dialogInputText.value
  showInputDialog.value = false
}

// 设置项
const settings = reactive({
  fontFamily: "'Arial', sans-serif",
  fontSizeRatio: 0.8, // 字体大小比例
  lineHeight: 1.5, // 行间距
  firstLineIndent: 2, // 首行缩进（字符）
  showLines: true, // 是否显示书写线
  traceColor: '#cccccc', // 描红颜色
})

// 缩放级别
const zoomLevel = ref(1)
const worksheetRef = ref(null)

// 生成分页后的内容
const generatedPages = computed(() => {
  // 简单处理为单页，实际需要实现分页逻辑
  return [inputText.value.replace(/\n/g, '<br>')]
})

// 缩放功能
const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 2)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
}

const resetZoom = () => {
  zoomLevel.value = 1
}

// 下载图片
const downloadImage = () => {
  // 实现下载逻辑
  alert('下载功能开发中...')
}

// 打印功能
const printWorksheet = () => {
  // 创建一个打印容器
  const printContainer = document.createElement('div');
  printContainer.style.position = 'absolute';
  printContainer.style.left = '-9999px';
  printContainer.style.top = '-9999px';
  
  // 复制所有字帖纸张到打印容器
  const worksheetPapers = document.querySelectorAll('.worksheet-paper');
  worksheetPapers.forEach(paper => {
    printContainer.appendChild(paper.cloneNode(true));
  });
  
  // 添加打印容器到页面
  document.body.appendChild(printContainer);
  
  // 执行打印
  window.print();
  
  // 打印完成后移除打印容器
  setTimeout(() => {
    document.body.removeChild(printContainer);
  }, 100);
}
</script>

<style scoped>
/* 基本样式与其他页面保持一致 */
.paragraph-page {
  font-family: 'Microsoft YaHei', sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  flex: 1;
  margin-right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.preview-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.preview-tools {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tool-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background-color: #f0f0f0;
  border-color: #ccc;
}

.zoom-level {
  font-size: 14px;
  color: #666;
  min-width: 50px;
  text-align: center;
}

.preview-wrapper {
  overflow: auto;
  max-height: calc(100vh - 150px);
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
}

.preview-container {
  transform-origin: top left;
  transition: transform 0.3s ease;
}

.worksheet-paper {
  width: 635px;
  min-height: 898px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 auto 20px;
  padding: 48px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 四线格样式 */
.worksheet-paper::before {
  content: '';
  position: absolute;
  top: 48px;
  left: 48px;
  right: 48px;
  bottom: 48px;
  background-image: linear-gradient(to bottom, #eee 1px, transparent 1px, transparent 25%, #eee 25%, #eee 26%, transparent 26%, transparent 50%, #eee 50%, #eee 51%, transparent 51%, transparent 75%, #eee 75%, #eee 76%, transparent 76%);
  background-size: 100% 24px;
  pointer-events: none;
  z-index: 1;
}

.paragraph-content {
  position: relative;
  z-index: 2;
  font-size: 18px;
  line-height: 2;
  text-indent: 2em;
  color: #ccc;
}

.paragraph-content p {
  margin: 0 0 16px 0;
  text-align: justify;
}

.paragraph-content p:last-child {
  margin-bottom: 0;
}

.sidebar {
  width: 350px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.control-section {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.control-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover {
  background-color: #66b1ff;
}

.btn-outline {
  background-color: white;
  color: #409eff;
  border: 1px solid #409eff;
}

.btn-outline:hover {
  background-color: #ecf5ff;
}

.btn-icon {
  font-size: 16px;
}

.input-hint {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  text-align: center;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background-color: white;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: #f5f7fa;
  color: #666;
}

.dialog-body {
  padding: 20px;
}

.dialog-textarea {
  width: 100%;
  height: 250px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

.form-row {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-select:hover {
  border-color: #409eff;
}

.form-select:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.range-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-input {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #409eff;
  cursor: pointer;
}

.range-input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #409eff;
  cursor: pointer;
}

.range-value {
  min-width: 50px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.checkbox-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
/* 打印样式 */
@media print {
  /* 隐藏页面其他部分 */
  header,
  footer,
  nav {
    display: none !important;
  }
  
  /* 页面基础样式 */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  .paragraph-page {
    background: white;
    min-height: auto;
  }
  
  .page-container {
    display: block;
    height: auto;
    overflow: visible;
  }
  
  /* 隐藏所有非字帖内容 */
  .sidebar,
  .preview-header {
    display: none !important;
  }
  
  .main-content {
    width: 100%;
    height: auto;
    overflow: visible;
    display: block;
  }
  
  .preview-wrapper {
    padding: 0;
    background: white;
    display: block;
    overflow: visible;
  }
  
  .preview-container {
    transform: none !important;
    display: block;
  }
  
  .worksheet-paper {
    box-shadow: none;
    width: 210mm;
    height: 297mm;
    padding: 15mm;
    margin: 0;
    page-break-after: always;
    page-break-inside: avoid;
    background: white;
  }
  
  .worksheet-paper:last-child {
    page-break-after: auto;
  }
  
  .paragraph-content {
    font-size: 16pt !important;
    line-height: 2 !important;
  }
  
  @page {
    size: A4;
    margin: 0;
  }
}
</style>