<template>
  <div class="f-aside">
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><PictureFilled /></el-icon>
          <!-- <el-icon>
            <location />
          </el-icon> -->
          <span>画作</span>
        </template>
        <el-menu-item index="/student/input">齐白石</el-menu-item>
        <el-menu-item index="/student/Score">梵高</el-menu-item>
        <!-- <el-menu-item index="/student/list">添加我的画作</el-menu-item> -->
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><CameraFilled /></el-icon>
          <!-- <el-icon>
            <location />
          </el-icon> -->
          <span>摄影作品</span>
        </template>
        <!-- <el-menu-item index="/course/list">课程列表</el-menu-item> -->
        <el-menu-item index="/course/Tom">Tom Juenemann</el-menu-item>
        <!-- <el-menu-item index="/course/list">添加我的摄影作品</el-menu-item> -->
      </el-sub-menu>
      <el-menu-item index="/pages/mypicture"> 
        
        <el-icon class="title-icon"><Picture /></el-icon>
        <span>我的画廊</span>
        <!-- 替换成你想要的菜单名称，比如“App页面” -->
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  // 可选：补充方法（如果需要的话）
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<!-- 合并重复的style标签，删除多余的闭合标签 -->
<style scoped>
.f-aside {
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  position: fixed; /* 添加定位 */
}
</style>