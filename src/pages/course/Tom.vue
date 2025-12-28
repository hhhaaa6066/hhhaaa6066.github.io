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
      <a href="https://baijiahao.baidu.com/s?id=1846853721415049119&wfr=spider&for=pc" target="_blank" class="title-link">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Tom Juenemann介绍</h1>
      </a>

      <!-- 介绍内容：全部左对齐，大标题（一、二、三）仅加粗、字体和正文一致 -->
      <div class="intro-content text-gray-700 leading-relaxed">
        <p class="mb-4">
          Tom Juenemann 是一位来自德国的知名风光摄影师与探险家，其作品以对自然景观的深刻诠释和独特美学风格闻名。
        </p>

        <!-- 一、艺术风格与创作理念（仅加粗，字体大小=正文） -->
        <h2 class="font-bold text-gray-900 mt-6 mb-3">一、艺术风格与创作理念</h2>
        <h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">1. 深绿色调的视觉语言</h3>
        <p class="mb-3">
          Tom 的作品以深绿色调为核心，通过不同层次的绿色（如翠绿、幽绿、墨绿）展现自然的生命力与神秘感。他善于在前景中点缀黄色、白色等暖色调，形成冷暖对比的和谐画面，同时北欧系列作品偏青色调，强化清冷氛围。
        </p>

        <h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">2. 留白与层次构图</h3>
        <p class="mb-3">
          他的构图常运用大面积留白（如天空、雾气），赋予画面空灵感与哲学意味，并通过前景虚化、中景主体、远景延展的三层结构增强空间纵深感。例如用虚化的花草引导视线，以居中构图的房屋或小人物形成视觉焦点，体现“大场景小人物”的叙事张力。
        </p>

        <h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">3. 光影的诗意表达</h3>
        <p class="mb-3">
          偏好黄金时段（日出/日落）的柔和光线，通过侧光强化纹理立体感，逆光剪影渲染戏剧性氛围。他常采用低速快门（1/30s-1/60s）捕捉云层流动，结合尼康相机的VR防抖功能实现动态模糊效果，展现自然的流动韵律。
        </p>

        <!-- 二、技术实践与设备运用（仅加粗，字体大小=正文） -->
        <h2 class="font-bold text-gray-900 mt-6 mb-3">二、技术实践与设备运用</h2>
        <h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">4. 拍摄技法</h3>
        <ul class="list-disc pl-6 mb-3 space-y-1">
          <li>使用三脚架配合斜坡放置法确保稳定性，启用电子前帘快门减少机械震动</li>
          <li>采用RAW格式保留高动态范围细节，后期通过优化校准功能调整明暗过渡</li>
        </ul>

        <h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">5. 器材选择</h3>
        <p class="mb-3">
          主要使用尼康高像素机型（如Z7 II、D800系列），搭配广角镜头（16-35mm）强化透视，长焦镜头（70-200mm）压缩空间形成抽象线条构图，充分发挥传感器的高分辨率特性。
        </p>

        <!-- 三、主题表达与情感共鸣（仅加粗，字体大小=正文） -->
        <h2 class="font-bold text-gray-900 mt-6 mb-3">三、主题表达与情感共鸣</h2>
        <p class="mb-3">
          Tom 的作品超越单纯记录，致力于传递自然的多重维度：
        </p>
        <ul class="list-disc pl-6 mb-3 space-y-1">
          <li>雄浑与细腻并存：巍峨山脉与叶片纹理的对比展现自然的宏观与微观之美</li>
          <li>原始纯净的生态观：通过未受人类干扰的景观，唤起对环境保护的思考</li>
          <li>人文与自然的对话：渺小的人物剪影置于壮阔场景中，隐喻人类在自然中的位置</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 脚本部分不变
import slide1 from "../../assets/images/1.jpg";
import slide2 from "../../assets/images/2.jpg";
import slide3 from "../../assets/images/3.jpg";
import slide4 from "../../assets/images/4.jpg";
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