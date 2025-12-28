<template>
<div class="f-header z-20 relative">
  <div class="flex-1"></div> <!-- 左边占位 -->
  <el-icon><Picture />
  </el-icon>
  <div class="text-center">
    <span> 图片画廊 </span>
  </div>
  <!-- <el-icon class="icon-btn" @click="DoRefresh">
  <Refresh /> -->
  <!-- </el-icon> -->
  <div class="flex-1"></div> <!-- 右边占位 -->
</div>
</template>
<script setup>
// const DoRefresh = () => location.reload()
</script>
<style>

.f-header {
  @apply flex items-center fixed top-0 left-0 right-0 text-2xl;
  height: 64px;
  color: white;
  background: linear-gradient(135deg, #a6c6ed 0%, #f2b8fa 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
/* .f-header {
@apply flex items-center bg-indigo-500 text-light-50 fixed top-0 left-0 right-0 text-2xl;
height: 64px;
} */
.logo{
@apply flex justify-center items-center
}
.icon-btn{
@apply flex justify-center items-center
height: 64px;
cursor: pointer;
}
</style>