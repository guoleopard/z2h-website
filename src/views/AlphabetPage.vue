<template>
  <div class="alphabet-page">
    <div class="page-container">
      <!-- 左侧预览区域 -->
      <main class="main-content">
        <div class="preview-header">
          <h2 class="preview-title">英文字母字帖</h2>
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
              v-for="(pageChars, pageIndex) in generatedPages"
              :key="pageIndex"
              ref="worksheetRef"
              class="worksheet-paper"
              :style="{
                gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
                display: 'grid'
              }"
            >
              <div 
                v-for="(char, index) in pageChars" 
                :key="`${pageIndex}-${index}`"
                class="char-cell"
                :class="{
                  'with-lines': settings.showLines,
                  'is-trace': char && shouldTrace(index),
                  'is-empty': !char
                }"
                :style="cellStyle"
              >
                <div 
                  v-if="char"
                  class="char-text"
                  :style="{
                    ...getCharStyle(index), 
                    fontFamily: settings.fontFamily,
                    '-webkit-text-stroke': '1px #222',
                    'text-stroke': '1px #222',
                    color: '#000000',
                    fontSize: cellStyle.fontSize
                  }"
                >
                  {{ char }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧控制面板 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <!-- 输入字母 -->
          <section class="control-section">
            <h3 class="section-title">输入字母</h3>
            <button @click="showInputDialog = true" class="btn btn-primary">
              <span class="btn-icon">✏️</span>
              输入内容
            </button>
            <div class="input-hint">提示：点击按钮输入要练习的字母，支持大小写</div>
          </section>

          <!-- 输入对话框 -->
          <div v-if="showInputDialog" class="dialog-overlay" @click="showInputDialog = false">
            <div class="dialog-content" @click.stop>
              <div class="dialog-header">
                <h3>输入字母</h3>
                <button @click="showInputDialog = false" class="close-btn">×</button>
              </div>
              <div class="dialog-body">
                <textarea 
                  v-model="dialogInputText" 
                  placeholder="请输入要练习的字母，例如'AaBbCc'或'abcdef'" 
                  class="dialog-textarea"
                  rows="10"
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
              <label class="form-label">每行字母数</label>
              <select v-model="settings.columns" class="form-select">
                <option :value="8">8个</option>
                <option :value="10">10个</option>
                <option :value="12">12个</option>
                <option :value="16">16个</option>
              </select>
            </div>
            <div class="form-row">
              <label class="form-label">重复次数</label>
              <select v-model="settings.repeatCount" class="form-select">
                <option :value="1">1次</option>
                <option :value="2">2次</option>
                <option :value="3">3次</option>
                <option :value="4">4次</option>
                <option :value="5">5次</option>
              </select>
            </div>
          </section>

          <!-- 辅助线设置 -->
          <section class="control-section">
            <h3 class="section-title">辅助线设置</h3>
            <div class="checkbox-list">
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showLines">
                <span>显示四线格</span>
              </label>
            </div>
          </section>

          <!-- 描红设置 -->
          <section class="control-section">
            <h3 class="section-title">描红设置</h3>
            <div class="form-row">
              <label class="form-label">描红模式</label>
              <select v-model="settings.traceMode" class="form-select">
                <option value="none">无描红</option>
                <option value="first">首字描红</option>
                <option value="half">前半描红</option>
                <option value="all">全部描红</option>
              </select>
            </div>
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
const inputText = ref('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')
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
  columns: 12,
  repeatCount: 2,
  showLines: true,
  traceMode: 'first', // none, first, half, all
  traceColor: '#cccccc',
  fontSizeRatio: 0.7, // 字体大小比例
})

// 缩放级别
const zoomLevel = ref(1)
const worksheetRef = ref(null)

// 单元格样式
const cellStyle = computed(() => {
  // A4纸张可用宽度：635px - 80px(左右边距) = 555px
  // 根据每行字数计算单元格大小
  const availableWidth = 555
  const cellSize = Math.floor(availableWidth / settings.columns)
  
  return {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    fontSize: `${Math.floor(cellSize * settings.fontSizeRatio)}px`,
    fontFamily: settings.fontFamily,
    color: '#000000'
  }
})

// 计算每页可以容纳多少行
const rowsPerPage = computed(() => {
  // A4纸张可用高度：898px - 96px(上下边距) = 802px
  const availableHeight = 802
  const cellSize = Math.floor(555 / settings.columns)
  return Math.ceil(availableHeight / cellSize)
})

// 生成分页后的字符数组
const generatedPages = computed(() => {
  // 将输入内容按行分割
  const lines = inputText.value.split('\n').filter(line => line.trim())
  const pages = []
  let currentPage = []
  let currentRowCount = 0
  
  lines.forEach(line => {
    // 将每行文字拆分为字符
    const chars = line.split('').filter(c => c.trim())
    
    // 处理当前行的每个字符
    chars.forEach(char => {
      // 每个字母重复指定次数
      const charRow = []
      for (let i = 0; i < settings.repeatCount; i++) {
        charRow.push(char)
      }
      // 补充空格填满这一行
      const emptyCount = settings.columns - (settings.repeatCount % settings.columns)
      if (emptyCount < settings.columns) {
        for (let i = 0; i < emptyCount; i++) {
          charRow.push('')
        }
      }
      
      // 如果当前页已满，添加到页面数组
      if (currentPage.length + charRow.length > settings.columns * rowsPerPage.value) {
        pages.push(currentPage)
        currentPage = []
      }
      
      currentPage.push(...charRow)
    })
  })
  
  // 添加最后一页
  if (currentPage.length > 0) {
    pages.push(currentPage)
  }
  
  return pages
})

// 是否需要描红
const shouldTrace = (index) => {
  switch (settings.traceMode) {
    case 'first':
      return index % (settings.repeatCount * 2) < settings.repeatCount
    case 'half':
      return index % (settings.repeatCount * 2) < settings.repeatCount
    case 'all':
      return true
    default:
      return false
  }
}

// 获取字符样式
const getCharStyle = (index) => {
  if (shouldTrace(index)) {
    return {
      color: settings.traceColor
    }
  }
  return {}
}

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
/* 基本样式与HanziPage.vue保持一致 */
.alphabet-page {
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
}

.char-cell {
  position: relative;
  border: 1px solid #eee;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 4px;
}

/* 四线格样式 */
.char-cell.with-lines::before,
.char-cell.with-lines::after,
.char-cell.with-lines span.line-top,
.char-cell.with-lines span.line-middle {
  content: '';
  position: absolute;
  background-color: #ddd;
  z-index: 1;
  left: 0;
  right: 0;
}

/* 底线 */
.char-cell.with-lines::before {
  height: 1px;
  bottom: 0;
}

/* 基线 */
.char-cell.with-lines::after {
  height: 1px;
  bottom: 33%;
}

/* 中线 */
.char-cell.with-lines span.line-middle {
  height: 1px;
  top: 50%;
}

/* 顶线 */
.char-cell.with-lines span.line-top {
  height: 1px;
  top: 17%;
}

/* 为每个单元格添加中线和顶线元素 */
.char-cell::before,
.char-cell::after {
  content: '';
  position: absolute;
  background-color: #ddd;
  z-index: 1;
  left: 0;
  right: 0;
}

/* 默认显示四线格 */
.char-cell::before {
  height: 1px;
  bottom: 0;
}

.char-cell::after {
  height: 1px;
  bottom: 33%;
}

.char-cell::before + span {
  content: '';
  position: absolute;
  height: 1px;
  top: 50%;
  left: 0;
  right: 0;
  background-color: #ddd;
  z-index: 1;
}

.char-cell::before + span + span {
  content: '';
  position: absolute;
  height: 1px;
  top: 17%;
  left: 0;
  right: 0;
  background-color: #ddd;
  z-index: 1;
}

.char-text {
  font-weight: 500;
  z-index: 2;
}

.char-cell.is-trace .char-text {
  font-weight: 300;
}

.char-cell.is-empty {
  background-color: #fafafa;
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
  height: 200px;
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
  
  .alphabet-page {
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
  
  .char-cell {
    border: 1px solid #333 !important;
  }
  
  @page {
    size: A4;
    margin: 0;
  }
}
</style>