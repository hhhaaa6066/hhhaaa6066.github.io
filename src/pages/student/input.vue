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
      <a href="https://baike.baidu.com/item/%E9%BD%90%E7%99%BD%E7%9F%B3/234940" target="_blank" class="title-link">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">齐白石介绍</h1>
      </a>
      <div class="intro-content text-gray-700 leading-relaxed">
      <p class="mb-3">中国传统文人山水画大多以水墨为主，偶有浅绛或小青绿山水，但设色多简淡雅致。齐白石的山水画大多数却是明丽鲜艳的。他会直接用红色渲染整个天空，表现落日的辉煌和朝霞的灿烂，用一片金黄点厾出“红于二月花”的霜叶，用深浅不一的粉红点厾出连绵数里桃花，更不要说以青黛或花青绘成馒头状的远山。即使是画雪景，他也不忘在一片冷寂中加上一点温暖的红色……齐白石用单纯而丰富的色彩表现自然的美丽，毫不吝惜运用一切能使用的色彩。但他的色彩表现又是不同于西方的，齐白石遵照表现物体固有色的中国传统，充分发挥纸张和石色、水色的特性，因此，他笔下的色彩又是明净清透的。

      </p>
      <p class="mb-3">
        徐悲鸿也曾评价说：“齐白石之长处，在有色彩，一往无前，无所顾忌。”齐白石的花鸟如此，山水又何尝不如此！
      </p>
      <p class="mb-3">
        虾蟹,是齐白石绘画中最为脍炙人口的表现题材,画家有多年的绘画经验。60岁以前多为临摹,62岁时他自己在画案的水缸中养虾,时时观察虾的游动、 跃进、 觅食及体态的各种变化。不断地写生,画作也不断在改进变化,形成早年画虾体短墨浓、 中年淡墨尖浓和晚年须精的各期特点。图中他把擅长表现的虾蟹合于同一画面,浓墨画蟹,淡墨绘虾,他以高度概括和夸张的手法意笔写出蟹壳的硬度和茸毛质感,用饱满的墨色表现表面扁平而内涵圆劲的蟹足,在动态上显现一种横行之气。图中的虾,虾眼已由早期的两个墨点改为两横笔,虾头中间一笔焦墨,加重了虾的份量,又表现了白虾具有弹力的透明形体,细如游丝般的触须,笔力饱满,一笔到底,显现了浮游水中的动态。右侧题款:“借山吟馆主者白石八十八岁作于故都” 及 “白石”、“吾年八十八” 朱文印各一方。可知此幅为白石88岁所作,当为晚期作品。
      </p>
      <p class="mb-3">
        由此可见,齐白石的画,在题材上多是出于对生活的感悟,章法处理上也是信手绘出。在造型上坚持“妙在似与不似之间”的信念,将似与不似揉于一起,形成对照,讲求笔情、墨韵。在他笔下,花鸟草虫不仅在形象上巧妙、 真实,而且生意盎然,具有勃然生机和朝气,他的画平易近人,朴实可爱,在情感上和现代人生活更为贴近,更易为大家理解和接受。
      </p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import slide1 from "../../assets/images/5.jpg";
import slide2 from "../../assets/images/6.jpg";
import slide3 from "../../assets/images/7.jpg";
import slide4 from "../../assets/images/8.jpg";
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