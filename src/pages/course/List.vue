<template>
  <div>
    <el-card shadow="never" class="boder-red-500 w-[850px] h-[1060px] overflow-hidden relative z-10">
      <el-carousel indicator-position="outside" height="360px" class="overflow-hidden">
        <el-carousel-item v-for="item in carouselImages" :key="item.id">
          <el-image 
            :src="item.url" 
            fit="cover" 
            class="w-full h-full object-cover" 
            :preview-src-list="carouselImages.map(img => img.url)"
            :initial-index="item.id - 1"
          >
            <template #placeholder>
              <div class="w-full h-full flex items-center justify-center bg-gray-100">
                <span>加载中...</span>
              </div>
            </template>
            <template #error>
              <div class="w-full h-full flex items-center justify-center bg-gray-100">
                <span>图片加载失败</span>
              </div>
            </template>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
// 1. 图片导入（如果需要不同图片，替换路径即可）
import slide1 from '../../assets/images/zzzz.jpg'
import slide2 from '../../assets/images/zzzz.jpg' // 可改成不同图片，如 slide2.jpg
import slide3 from '../../assets/images/zzzz.jpg'
import slide4 from '../../assets/images/zzzz.jpg'

console.log('导入的图片路径:', slide1) // 检查控制台：如果是 blob:xxx 或 /src/assets/... 说明路径正确

// 2. 数组变量名：carouselImages（和模板保持一致）
const carouselImages = [
  { id: 1, url: slide1, title: '图片标题1' },
  { id: 2, url: slide2, title: '图片标题2' },
  { id: 3, url: slide3, title: '图片标题3' },
  { id: 4, url: slide4, title: '图片标题4' }
]
</script>

<style scoped>
/* 修正3：去掉 el-carousel__item 的背景色，避免覆盖图片；或降低优先级 */
.el-carousel__item {
  background: transparent; /* 透明背景，不遮挡图片 */
}

/* 修正4：确保轮播项内部元素100%填充 */
.el-carousel__item > div {
  width: 100%;
  height: 100%;
}

/* 保留原有的标题样式（如果需要显示标题） */
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
</style>