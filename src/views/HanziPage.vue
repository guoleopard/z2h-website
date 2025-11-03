<template>
  <div class="hanzi-page">
    <div class="page-container">
      <!-- 左侧预览区域 -->
      <main class="main-content">
        <div class="preview-header">
          <h2 class="preview-title">字帖预览</h2>
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
            >
              <div 
                v-for="(char, index) in pageChars" 
                :key="`${pageIndex}-${index}`"
                class="char-cell"
                :class="{ 
                  'with-grid': settings.showGrid,
                  'with-cross': settings.showCross,
                  'is-trace': char && shouldTrace(index),
                  'is-empty': !char
                }"
                :style="cellStyle"
              >
                <div v-if="settings.showPinyin && char" class="char-pinyin">
                  {{ getPinyin(char) }}
                </div>
                <div 
                  v-if="char"
                  class="char-text"
                  :style="getCharStyle(index)"
                >
                  {{ char }}
                </div>
              </div>
              
              <!-- 页码 -->
              <div class="page-number">第 {{ pageIndex + 1 }} 页 / 共 {{ generatedPages.length }} 页</div>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧控制面板 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <!-- 输入文字 -->
          <section class="control-section">
            <h3 class="section-title">输入文字</h3>
            <textarea 
              v-model="inputText" 
              placeholder="请输入要练习的汉字，每个汉字会重复多次..."
              class="text-input"
              rows="5"
            ></textarea>
            <div class="input-hint">提示：可以输入任意汉字，系统会自动生成练习字帖</div>
          </section>

          <!-- 字体样式 -->
          <section class="control-section">
            <h3 class="section-title">字体样式</h3>
            <div class="form-row">
              <label class="form-label">字体</label>
              <select v-model="settings.fontFamily" class="form-select">
                <option value="'KaiTi', '楷体', serif">楷体</option>
                <option value="'SimSun', '宋体', serif">宋体</option>
                <option value="'SimHei', '黑体', sans-serif">黑体</option>
                <option value="'FangSong', '仿宋', serif">仿宋</option>
                <option value="'Microsoft YaHei', '微软雅黑', sans-serif">微软雅黑</option>
              </select>
            </div>
          </section>

          <!-- 布局设置 -->
          <section class="control-section">
            <h3 class="section-title">布局设置</h3>
            <div class="form-row">
              <label class="form-label">每行字数</label>
              <select v-model="settings.columns" class="form-select">
                <option :value="6">6个</option>
                <option :value="8">8个</option>
                <option :value="10">10个</option>
                <option :value="12">12个</option>
              </select>
            </div>
          </section>

          <!-- 田字格设置 -->
          <section class="control-section">
            <h3 class="section-title">田字格设置</h3>
            <div class="checkbox-list">
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showGrid">
                <span>显示田字格</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showCross">
                <span>显示十字线</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showPinyin">
                <span>显示拼音</span>
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
import { ref, computed, reactive } from 'vue'

// 输入文字
const inputText = ref('永和九年岁在癸丑暮春之初会于山阴之兰亭')

// 设置项
const settings = reactive({
  fontFamily: "'KaiTi', '楷体', serif",
  columns: 12,
  repeatCount: 1,
  showGrid: true,
  showCross: true,
  showPinyin: false,
  traceMode: 'first', // none, first, half, all
  traceColor: '#cccccc'
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
    fontSize: `${Math.floor(cellSize * 0.7)}px`,
    fontFamily: settings.fontFamily
  }
})

// 计算每页可以容纳多少行
const rowsPerPage = computed(() => {
  // A4纸张可用高度：898px - 96px(上下边距) = 802px
  const availableHeight = 802
  const cellSize = Math.floor(555 / settings.columns)
  return Math.floor(availableHeight / cellSize)
})

// 生成分页后的字符数组
const generatedPages = computed(() => {
  const chars = inputText.value.split('').filter(c => c.trim())
  const pages = []
  let currentPage = []
  let currentRowCount = 0
  
  chars.forEach(char => {
    // 每个字重复指定次数
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
    
    // 检查是否需要换页
    if (currentRowCount >= rowsPerPage.value) {
      pages.push(currentPage)
      currentPage = []
      currentRowCount = 0
    }
    
    // 添加当前行到当前页
    currentPage.push(...charRow)
    currentRowCount++
  })
  
  // 添加最后一页
  if (currentPage.length > 0) {
    pages.push(currentPage)
  }
  
  return pages.length > 0 ? pages : [[]]
})

// 判断是否需要描红
const shouldTrace = (index) => {
  if (settings.traceMode === 'none') return false
  if (settings.traceMode === 'all') return true
  
  const charIndex = Math.floor(index / settings.repeatCount)
  const repeatIndex = index % settings.repeatCount
  
  if (settings.traceMode === 'first') {
    return repeatIndex === 0
  }
  
  if (settings.traceMode === 'half') {
    return repeatIndex < Math.floor(settings.repeatCount / 2)
  }
  
  return false
}

// 获取字符样式
const getCharStyle = (index) => {
  if (shouldTrace(index)) {
    return {
      color: settings.traceColor,
      opacity: 0.3
    }
  }
  return {
    color: 'transparent'
  }
}

// 获取拼音
const getPinyin = (char) => {
  const pinyinMap = {
    '永': 'yǒng', '和': 'hé', '九': 'jiǔ', '年': 'nián',
    '岁': 'suì', '在': 'zài', '癸': 'guǐ', '丑': 'chǒu',
    '暮': 'mù', '春': 'chūn', '之': 'zhī', '初': 'chū',
    '会': 'huì', '于': 'yú', '山': 'shān', '阴': 'yīn',
    '兰': 'lán', '亭': 'tíng'
  }
  return pinyinMap[char] || ''
}

// 生成字帖
const generateWorksheet = () => {
  console.log('生成字帖')
}

// 下载图片
const downloadImage = () => {
  // TODO: 实现图片下载功能
  alert('下载功能开发中...')
}

// 打印字帖
const printWorksheet = () => {
  window.print()
}

// 缩放控制
const zoomIn = () => {
  if (zoomLevel.value < 2) {
    zoomLevel.value = Math.min(2, zoomLevel.value + 0.1)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 0.3) {
    zoomLevel.value = Math.max(0.3, zoomLevel.value - 0.1)
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
}
</script>

<style scoped>
/* 页面容器 */
.hanzi-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  padding-right: 20px;
}

/* 右侧边栏 */
.sidebar {
  width: 320px;
  background: white;
  border-left: 1px solid #e0e0e0;
  overflow-y: auto;
  flex-shrink: 0;
  order: 2;
}

.sidebar-content {
  padding: 16px;
}

/* 控制区块 */
.control-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.control-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

/* 文本输入 */
.text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
}

.input-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}

/* 表单行 */
.form-row {
  margin-bottom: 10px;
}

.form-label {
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
}

.form-select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.form-select:focus {
  outline: none;
  border-color: #667eea;
}

/* 滑块控制 */
.range-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-input {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #ddd;
  border-radius: 2px;
  outline: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.range-input::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.range-value {
  font-size: 13px;
  color: #666;
  min-width: 50px;
  text-align: right;
}

/* 复选框列表 */
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.checkbox-item input[type="checkbox"] {
  cursor: pointer;
}

/* 按钮 */
.btn {
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-outline {
  background: white;
  color: #667eea;
  border: 1px solid #667eea;
}

.btn-outline:hover {
  background: #f8f9ff;
}

.btn-icon {
  font-size: 16px;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  order: 1;
}

.preview-header {
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.preview-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.tool-btn:hover {
  background: #f5f5f5;
  border-color: #667eea;
}

.zoom-level {
  font-size: 13px;
  color: #666;
  min-width: 50px;
  text-align: center;
}

/* 预览区域 */
.preview-wrapper {
  flex: 1;
  overflow: auto;
  background: #e8e8e8;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.preview-container {
  transform-origin: center top;
  transition: transform 0.2s ease;
}

.worksheet-paper {
  /* A4 纸张尺寸缩小80% */
  width: 635px;  /* 794px * 0.8 */
  height: 898px;  /* 1123px * 0.8 */
  background: #ccc;
  padding: 48px 40px;  /* 60px * 0.8, 50px * 0.8 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 1px;
  margin-bottom: 30px;
  position: relative;
}

.worksheet-paper:last-child {
  margin-bottom: 0;
}

/* 字符单元格 */
.char-cell {
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: white;
}

.char-cell.with-grid {
  background-image: 
    linear-gradient(to right, #ccc 1px, transparent 1px),
    linear-gradient(to bottom, #ccc 1px, transparent 1px);
  background-size: 50% 50%;
  background-position: 0 0;
}

.char-cell.with-cross::before,
.char-cell.with-cross::after {
  content: '';
  position: absolute;
  background: transparent;
}

.char-cell.with-cross::before {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-0.5px);
  border-left: 1px dashed #ccc;
}

.char-cell.with-cross::after {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-0.5px);
  border-top: 1px dashed #ccc;
}

.char-pinyin {
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #999;
  font-family: Arial, sans-serif;
}

.char-text {
  font-weight: normal;
  line-height: 1;
  -webkit-text-stroke: 1px #333;
  text-stroke: 1px #333;
  position: relative;
  z-index: 1;
}

.char-cell.is-trace .char-text {
  -webkit-text-stroke: 1px #ccc;
  text-stroke: 1px #ccc;
}

/* 页码 */
.page-number {
  position: absolute;
  bottom: 20px;
  right: 50px;
  font-size: 12px;
  color: #999;
  font-family: Arial, sans-serif;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .page-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    max-height: 40vh;
    border-left: none;
    border-top: 1px solid #e0e0e0;
    order: 2;
  }
  
  .main-content {
    height: 60vh;
    order: 1;
  }
  
  .preview-wrapper {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .sidebar-content {
    padding: 16px;
  }
  
  .preview-wrapper {
    padding: 10px;
  }
  
  .worksheet-paper {
    /* 在小屏幕上缩小A4纸张以适应屏幕 */
    width: 100%;
    max-width: 794px;
    min-height: auto;
    padding: 30px 25px;
  }
  
  .preview-container {
    width: 100%;
  }
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
  
  .hanzi-page {
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
    display: flex;
    flex-wrap: wrap;
  }
  
  .worksheet-paper:last-child {
    page-break-after: auto;
  }
  
  .char-cell {
    border-left: 1px solid #333 !important;
    border-top: 1px solid #333 !important;
    border-right: none !important;
    border-bottom: none !important;
  }

  
  .page-number {
    display: block;
    position: absolute;
    bottom: 10mm;
    right: 15mm;
  }
  
  @page {
    size: A4;
    margin: 0;
  }
}
</style>
