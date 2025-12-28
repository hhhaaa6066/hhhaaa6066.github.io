<template>
  <div>
    <el-card shadow="never" class="boder-red-500 w-[850px] min-h-[1060px] overflow-auto relative z-10 p-6">
      <el-carousel indicator-position="outside" height="360px" class="overflow-hidden mb-6">
        <!-- 轮播图内容不变 -->
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

      <!-- 顶部标题：保持原样式（可按需调整居中/左对齐） -->
      <a href="https://baike.baidu.com/item/%E6%96%87%E6%A3%AE%E7%89%B9%C2%B7%E6%A2%B5%E9%AB%98/349237" target="_blank" class="title-link">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">文森特·梵高介绍</h1>
      </a>
      <div class="intro-content text-gray-700 leading-relaxed">
      <p class="mb-3">梵高（1853-1890），全名文森特·威廉·梵高，是荷兰的后印象派画家。他出生在一个普通的牧师家庭，童年时光平静而又充满期待。少年时期的他，曾试图走上宗教道路，成为一名传教士，但那段信仰的火焰最终未能点燃他对艺术的炽热追求。
      </p>
      <p class="mb-3">
        梵高的作品以其强烈的色彩、扭曲的线条和充满情感的笔触闻名于世。他并非传统意义上的“技法大师”，而是一位用心灵画画的“情感艺术家”。他的画面充满了能量与激情，每一笔都似乎在诉说他内心的苦楚与希望。
      </p>
      <p class="mb-3">
        他的色彩选择大胆、夸张，既有荷兰的阴郁，也融合了法国印象派的明亮，形成了一种独特的“梵高色彩语言”。他的画不讲究完美的线条，而是用情感的爆发去打动人心。
      </p>
      <p class="mb-3">
        梵高的艺术，超越了时间与空间的限制，影响了无数后来的艺术家。他用色彩和线条表达情感的方式，启发了抽象表现主义、野兽派等现代艺术流派。
      </p>
      <p class="mb-3">
        他的生命告诉我们：天才或许伴随着孤独和痛苦，但只要坚持自我，就能在黑暗中点亮一颗星。梵高用画笔，绘出了一个充满激情、痛苦与希望的世界，也让我们相信，真正的艺术，源于心灵的呐喊。
      </p>
      <p class="mb-3">
        梵高，一个被误解的天才，一个用生命书写艺术的孤独诗人。他的作品如星空般璀璨，照亮了无数人的心灵。或许，他的生命短暂，但他的艺术永恒。

        在这个快节奏、浮躁的时代，让我们静下心来，感受梵高那份炽热的情感与不屈的精神。因为，每一幅画背后，都是一个孤独而伟大的灵魂在用生命歌唱。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import slide1 from "../../assets/images/9.jpg";
import slide2 from "../../assets/images/10.jpg";
import slide3 from "../../assets/images/11.jpg";
import slide4 from "../../assets/images/12.jpg";
import { Picture } from '@element-plus/icons-vue';

const carouselImages = [
  { id: 1, url: slide1, title: "图片标题1" },
  { id: 2, url: slide2, title: "图片标题2" },
  { id: 3, url: slide3, title: "图片标题3" },
  { id: 4, url: slide4, title: "图片标题4" },
];
</script>

<style scoped>
/* 顶部标题样式：保持加粗+较大字体 */
.title-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.title-link:hover h1 {
  color: #1890ff;
}

/* 核心样式：所有内容左对齐（默认就是左对齐，这里明确指定避免冲突） */
.intro-content {
  text-align: left; /* 强制左对齐，覆盖可能的默认居中 */
  line-height: 1.8;
}

/* 大标题（一、二、三）：仅加粗，字体大小和正文一致 */
.intro-content h2 {
  font-size: inherit; /* 继承正文字体大小（和p标签一致） */
  font-weight: 700; /* 加粗（Element Plus默认bold是700） */
  margin-top: 1.5rem; /* 上方间距优化 */
  margin-bottom: 0.75rem;
}

/* 小标题（1.、2.、3.）：保持原样式（可按需调整） */
.intro-content h3 {
  font-size: inherit; /* 比正文稍大，若要和正文一致可改为 inherit */
  font-weight: 400; /* 半粗（和大标题的700区分），可改为700统一加粗 */
}

/* 轮播图样式不变 */
.el-carousel__item {
  background: transparent;
}
.el-carousel__item > div {
  width: 100%;
  height: 100%;
}

/* 列表样式优化 */
.space-y-1 > li {
  margin-bottom: 4px;
}

/* 卡片内边距 */
.el-card {
  padding: 20px;
}
</style>