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
        <!-- <div style="font-family: {{ settings.fontFamily }}; margin-bottom: 20px;">
          测试字体：{{ settings.fontFamily }}
        </div> -->

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
                'with-grid': settings.showGrid,
                'with-cross': settings.showCross,
                'is-trace': char && shouldTrace(index),
                'is-empty': !char
              }"
              :style="cellStyle"
            >
              <div v-if="settings.showStrokeOrder && char" class="char-stroke-order">
                {{ strokeOrderMap[char]?.join(' ') || '' }}
              </div>
              <div v-if="settings.showPinyin && char" class="char-pinyin" :style="{ fontSize: cellStyle.pinyinFontSize }">
                {{ getPinyin(char) }}
              </div>
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
              
              <!-- 页码 -->
              <!-- <div class="page-number">第 {{ pageIndex + 1 }} 页 / 共 {{ generatedPages.length }} 页</div> -->
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
            <button @click="showInputDialog = true" class="btn btn-primary">
              <span class="btn-icon">✏️</span>
              输入内容
            </button>
            <div class="input-hint">提示：点击按钮输入要练习的汉字，支持换行</div>
          </section>

          <!-- 输入对话框 -->
          <div v-if="showInputDialog" class="dialog-overlay" @click="showInputDialog = false">
            <div class="dialog-content" @click.stop>
              <div class="dialog-header">
                <h3>输入内容</h3>
                <button @click="showInputDialog = false" class="close-btn">×</button>
              </div>
              <div class="dialog-body">
                <textarea 
                  v-model="dialogInputText" 
                  placeholder="请输入要练习的汉字，例如'你好世界'，支持插入空行。"
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
                <option value="'KaiTi', '楷体', serif">楷体</option>
                <option value="'SimSun', '宋体', serif">宋体</option>
                <option value="'SimHei', '黑体', sans-serif">黑体</option>
                <option value="'FangSong', '仿宋', serif">仿宋</option>
                <option value="'Microsoft YaHei', '微软雅黑', sans-serif">微软雅黑</option>
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
              <!-- <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showGrid">
                <span>显示田字格</span>
              </label> -->
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showCross">
                <span>显示十字线</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showPinyin">
                <span>显示拼音</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="settings.showStrokeOrder">
                <span>显示笔顺</span>
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
const inputText = ref('永和九年岁在癸丑暮春之初会于山阴之兰亭')
const showInputDialog = ref(false)
const dialogInputText = ref('')

// 确认输入
const confirmInput = () => {
  inputText.value = dialogInputText.value
  showInputDialog.value = false
}

// 设置项
const settings = reactive({
  fontFamily: "'KaiTi', '楷体', serif",
  columns: 12,
  repeatCount: 1,
  showGrid: true,
  showCross: true,
  showPinyin: false,
  traceMode: 'first', // none, first, half, all
  traceColor: '#cccccc',
  fontSizeRatio: 0.7, // 字体大小比例
  showStrokeOrder: false // 是否显示笔顺
})

// 监听字体变化
watch(() => settings.fontFamily, (newFont) => {
  console.log('Font changed to:', newFont)
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
    pinyinFontSize: `${Math.floor(cellSize * 0.2)}px`,
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
    
    // 如果当前行是空行，添加一个空行到字帖
    if (chars.length === 0) {
      // 检查是否需要换页
      if (currentRowCount >= rowsPerPage.value) {
        pages.push(currentPage)
        currentPage = []
        currentRowCount = 0
      }
      
      // 添加空行
      const emptyRow = Array(settings.columns).fill('')
      currentPage.push(...emptyRow)
      currentRowCount++
    }
  })
  
  // 添加最后一页
  if (currentPage.length > 0) {
    // 计算最后一页需要补充的空单元格数量
    const totalCellsPerPage = rowsPerPage.value * settings.columns
    const emptyCellsNeeded = totalCellsPerPage - currentPage.length
    
    // 如果需要补充空单元格，则添加空单元格
    if (emptyCellsNeeded > 0) {
      currentPage.push(...Array(emptyCellsNeeded).fill(''))
    }
    
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
      opacity: 0.3,
      '-webkit-text-stroke': '1px #ff4444',
      'text-stroke': '1px #ff4444'
    }
  }
  return {
    color: 'transparent',
    '-webkit-text-stroke': '1px #222',
    'text-stroke': '1px #222'
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

// 笔顺数据
const strokeOrderMap = {
  '永': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏'],
  '和': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍'],
  '九': ['⒈', '⒉'],
  '年': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍'],
  '岁': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏'],
  '在': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍'],
  '癸': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓', '⒔', '⒕'],
  '丑': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍'],
  '暮': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓'],
  '春': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏'],
  '之': ['⒈', '⒉', '⒊'],
  '初': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏'],
  '会': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏'],
  '于': ['⒈', '⒉', '⒊'],
  '山': ['⒈', '⒉', '⒊'],
  '阴': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓', '⒔', '⒕'],
  '兰': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎'],
  '亭': ['⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓']
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

/* 右侧边栏 */
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

/* 控制区块 */
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

/* 文本输入 */


.input-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}

/* 表单行 */
/* 对话框样式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #f3f4f6;
}

.dialog-body {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.dialog-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
}

.dialog-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.dialog-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

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

/* 预览区域 */
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
  display: grid;
  grid-template-columns: repeat(var(--columns, 12), 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 0;
  position: relative;
}

.worksheet-paper:last-child {
  margin-bottom: 0;
}

/* 字符单元格 */
.char-cell {
  position: relative;
  border: 0.2px solid #e0e0e0;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: white;
}

/* 最后一列的单元格显示右边框 */
.char-cell:nth-child(12n) {
  border-right: 0.2px solid #e0e0e0;
}

/* 田字格样式 */
.char-cell.with-grid {
  background-image: 
    linear-gradient(to right, #e0e0e0 0.5px, transparent 0.5px),
    linear-gradient(to bottom, #e0e0e0 0.5px, transparent 0.5px),
    linear-gradient(to right, #e0e0e0 0.5px, transparent 0.5px),
    linear-gradient(to bottom, #e0e0e0 0.5px, transparent 0.5px);
  background-size: 50% 50%, 50% 50%, 100% 100%, 100% 100%;
  background-position: 0 0, 0 0, 50% 50%, 50% 50%;
  border: 0.5px solid #e0e0e0;
}

/* 字符样式 */
.char-text {
  font-weight: normal;
  line-height: 1;
  -webkit-text-stroke: 0.5px #333;
  text-stroke: 0.5px #333;
  position: relative;
  z-index: 1;
  font-family: 'KaiTi', '楷体', serif;
}

/* 描红样式 */
.char-cell.is-trace .char-text {
  -webkit-text-stroke: 0.5px #ff6666;
  text-stroke: 0.5px #ff6666;
  color: rgba(255, 102, 102, 0.2);
}

/* 十字线样式 */
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
  width: 0.5px;
  transform: translateX(-0.25px);
  border-left: 0.5px dashed #e0e0e0;
}

.char-cell.with-cross::after {
  top: 50%;
  left: 0;
  right: 0;
  height: 0.5px;
  transform: translateY(-0.25px);
  border-top: 0.5px dashed #e0e0e0;
}

/* 拼音样式 */
.char-pinyin {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  color: #888;
  font-family: Arial, sans-serif;
  white-space: nowrap;
}

.char-stroke-order {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: #888;
  font-family: Arial, sans-serif;
  font-size: 12px;
  white-space: nowrap;
}

/* 字符样式 */
.char-text {
  font-weight: normal;
  line-height: 1;
  position: relative;
  z-index: 1;
  color: #000000;
}

/* 描红样式 */
.char-cell.is-trace .char-text {
  -webkit-text-stroke: 1px #ff4444;
  text-stroke: 1px #ff4444;
  color: rgba(255, 68, 68, 0.3);
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
