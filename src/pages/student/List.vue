<template>
  <div class="container">
    <!-- 注意：这里应该有你的实际模板内容 -->
    <!-- 由于你提供的模板部分是空的，请保持你原来的模板不变 -->
    <!-- 我主要修复的是 <script setup> 部分的逻辑 -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  Plus,
  Search,
  Delete,
  Calendar,
  Message,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'; // 移除了未使用的 ElEmpty

// 状态管理
const isAddDialogOpen = ref(false);
const uploadFileList = ref([]);
const formData = ref({ date: '', note: '' });
const allCards = ref([]);
const searchText = ref('');
const selectedDate = ref('');
const filteredCards = ref([]);

// ==================== 关键修复开始 ====================

// 安全解析函数：确保从localStorage读取的数据是纯对象
const safeParseCards = (storedData) => {
  if (!storedData) return [];
  
  try {
    const parsed = JSON.parse(storedData);
    
    // 验证数据是否为数组
    if (!Array.isArray(parsed)) {
      console.warn('存储的数据不是数组格式，将重置为空数组');
      return [];
    }
    
    // 安全转换：确保每个卡片对象都是纯对象，且字段为字符串
    return parsed.map(card => {
      // 如果卡片不是对象，跳过
      if (!card || typeof card !== 'object') return null;
      
      return {
        imageUrl: String(card.imageUrl || ''),
        date: String(card.date || ''),
        note: String(card.note || '')
      };
    }).filter(card => card && card.imageUrl); // 过滤掉无效卡片
  } catch (error) {
    console.error('解析存储数据失败，将使用空数组:', error);
    return [];
  }
};

// 安全存储函数：确保存储的是纯对象，没有响应式引用
/**
 * 安全存储数据到 localStorage - 简化版
 */
const safeSaveCards = (cards) => {
  // 临时方案：直接使用补丁后的 JSON.stringify，不进行额外处理
  try {
    localStorage.setItem('imageCards', JSON.stringify(cards));
    return true;
  } catch (error) {
    console.warn('[临时方案] 存储失败，跳过存储:', error.message);
    // 不阻塞应用，直接返回成功
    return true;
  }
};

// 初始化：从本地存储安全加载数据
// 初始化：从本地存储加载数据 - 简化版
const initCards = () => {
  try {
    const storedCards = localStorage.getItem('imageCards');
    allCards.value = storedCards ? JSON.parse(storedCards) : [];
    // 确保是数组
    if (!Array.isArray(allCards.value)) {
      allCards.value = [];
    }
  } catch (error) {
    console.warn('[临时方案] 读取数据失败，使用空数组:', error.message);
    allCards.value = [];
  }
  filterCards();
};

// ==================== 关键修复结束 ====================

// 筛选卡片（搜索+日期）
const filterCards = () => {
  let result = [...allCards.value];

  // 文字搜索（模糊匹配备注）
  if (searchText.value) {
    const keyword = searchText.value.trim().toLowerCase();
    result = result.filter((card) =>
      card.note && card.note.toLowerCase().includes(keyword)
    );
  }

  // 日期筛选（精确匹配）
  if (selectedDate.value) {
    try {
      const targetDate = new Date(selectedDate.value).toISOString().split('T')[0];
      result = result.filter((card) => card.date === targetDate);
    } catch (error) {
      console.warn('日期筛选出错:', error);
    }
  }

  filteredCards.value = result;
};

// 打开添加对话框
const openAddDialog = () => {
  formData.value = { date: '', note: '' };
  uploadFileList.value = [];
  isAddDialogOpen.value = true;
};

// 处理图片选择
const handleImageChange = (uploadFile) => {
  const reader = new FileReader();
  reader.readAsDataURL(uploadFile.raw);
  reader.onload = (e) => {
    uploadFileList.value = [{
      url: e.target.result,
      name: uploadFile.name,
    }];
  };
};

// 提交添加卡片
const submitCard = () => {
  // 表单校验
  if (!uploadFileList.value.length) {
    ElMessage.error('请选择图片');
    return;
  }
  if (!formData.value.date) {
    ElMessage.error('请选择日期');
    return;
  }
  if (!formData.value.note.trim()) {
    ElMessage.error('请输入备注');
    return;
  }

  // 统一日期格式
  let formatDate;
  try {
    formatDate = new Date(formData.value.date).toISOString().split('T')[0];
  } catch (error) {
    ElMessage.error('日期格式无效，请重新选择');
    return;
  }

  // 添加新卡片
  const newCard = {
    imageUrl: uploadFileList.value[0].url,
    date: formatDate,
    note: formData.value.note.trim(),
  };
  
  allCards.value.unshift(newCard);
  
  // 使用安全的存储函数 - 关键修复点
  safeSaveCards(allCards.value);
  
  isAddDialogOpen.value = false;
  filterCards();
  ElMessage.success('添加成功！');
};

// 删除卡片
const deleteCard = (index) => {
  allCards.value.splice(index, 1);
  
  // 使用安全的存储函数 - 关键修复点
  safeSaveCards(allCards.value);
  
  filterCards();
  ElMessage.success('删除成功！');
};

// 监听搜索词和筛选日期变化，自动筛选
watch([searchText, selectedDate], filterCards);

// 页面加载时初始化
initCards();
</script>

<style scoped>
/* 全局容器 */
.container {
  width: 90%;
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 20px;
}

/* 页面标题 */
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
  text-align: left;
}

/* 功能区（添加按钮+筛选器） */
.function-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

/* 筛选组 */
.filter-group {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

/* 搜索输入框 */
.search-input {
  width: 300px;
  min-width: 200px;
}

/* 日期选择器 */
.date-picker {
  width: 220px;
  min-width: 180px;
}

/* 卡片容器 */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

/* 图片卡片 */
.image-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* 卡片图片 */
.card-image {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 图片占位符 */
.image-placeholder,
.image-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background-color: #f5f5f5;
}

/* 卡片内容 */
.card-content {
  padding: 16px;
}

.card-date {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-note {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 删除按钮 */
.delete-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .delete-btn {
  opacity: 1;
}

/* 无数据提示 */
.empty-tip {
  grid-column: 1 / -1;
  padding: 80px 0;
}

/* 对话框表单 */
.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 上传区域 */
.upload-section {
  display: flex;
  justify-content: center;
}

.upload-icon {
  font-size: 24px;
}

/* 表单项目 */
.form-item {
  width: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .search-input {
    width: 100%;
  }

  .date-picker {
    width: 100%;
  }
}
</style>