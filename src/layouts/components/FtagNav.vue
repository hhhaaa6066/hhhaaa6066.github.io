<template>
  <div class="f-tag-nav">
    <el-tabs 
      v-model="editableTabsValue" 
      type="card" 
      class="demo-tabs" 
      editable 
      @edit="handleTabsEdit"
      @tab-change="changeTab"
      @tab-remove="removeTab"
    >
      <template #add-icon>
        <el-icon><Select /></el-icon>
      </template>
      <el-tab-pane 
        v-for="item in editableTabs" 
        :key="item.path" 
        :label="item.title" 
        :name="item.path"
      >
        <!-- {{ item.content }} -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Select } from '@element-plus/icons-vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

const router = useRouter() 
const route = useRoute()
const cookie = useCookies()

console.log('初始路由路径:', route.path)

const editableTabsValue = ref(route.path)
const editableTabs = ref([
  {
    title: '画作',
    path: "/student/list"
  },
  {
    title: '摄影作品',
    path: '/course/list'
  }
])

// 添加标签导航
function addTab(tab) {
  // 检查标签是否已存在
  console.log(cookie)
  let noTab = editableTabs.value.findIndex(t => t.path == tab.path) == -1
  if (noTab) {
    editableTabs.value.push(tab)
  }
  // 将标签页数据保存到cookie
  cookie.set("editableTabs", editableTabs.value)
}

onBeforeRouteUpdate((to, from) => {
  editableTabsValue.value = to.path
  addTab({
    title: to.meta.title,
    path: to.path,
    from,
  })
})

const changeTab = (t) => {
  console.log("打印changeTab:", t)
  editableTabsValue.value = t
  router.push(t)
}

const removeTab = (t) => {
  let tabs = editableTabs.value // 当前导航数组
  let activePath = editableTabsValue.value // 当前激活的值（路径） - 修复：使用 editableTabsValue
  
  console.log("tabs", tabs)
  console.log("tabs[0]", tabs[0])
  console.log("tabs", JSON.parse(JSON.stringify(tabs)))
  console.log("activePath", activePath)  // 修改变量名
  console.log("t", t)
  
  // 如果删除的是当前激活的标签
  if (activePath == t) {
    // 找到要删除标签的索引
    const tabIndex = tabs.findIndex(tab => tab.path === t)
    
    if (tabIndex !== -1) {
      // 尝试获取下一个或上一个标签
      const nextTab = tabs[tabIndex + 1] || tabs[tabIndex - 1]
      
      if (nextTab) {
        // 激活相邻的标签
        editableTabsValue.value = nextTab.path
        router.push(nextTab.path)
      } else {
        // 如果没有其他标签，跳转到首页或其他默认页面
        editableTabsValue.value = ''
        router.push('/')
      }
    }
  }
  
  // 从列表中移除标签
  editableTabs.value = editableTabs.value.filter(tab => tab.path != t)
  
  // 保存到cookie - 修复：正确的参数
  cookie.set("editableTabs", editableTabs.value)
}

function initTabList() {
  let tablist = cookie.get("editableTabs")
  if (tablist) {
    editableTabs.value = tablist
  }
}
initTabList()

// 处理标签编辑（添加/删除）事件
const handleTabsEdit = (targetName, action) => {
  if (action === 'add') {
    // 添加新标签的逻辑
    const newTabName = `newTab${editableTabs.value.length + 1}`
    editableTabs.value.push({
      title: '新标签',
      path: `/${newTabName}`,
    })
    editableTabsValue.value = `/${newTabName}`
  }
  // 删除逻辑已经在 removeTab 中处理
}
</script>

<style scoped>
.f-tag-nav {
  @apply fixed bg-gray-200 flex items-center;
  top: 64px;
  right: 0;
  left: 250px;
  height: 40px; /* 明确设置高度 */
  z-index: 100;
}

/* 优化标签样式 */
:deep(.el-tabs) {
  height: 100%;
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__nav-wrap) {
  height: 100%;
}

:deep(.el-tabs__item) {
  height: 40px;
  line-height: 40px;
  border-radius: 4px 4px 0 0;
  margin-right: 4px;
}

:deep(.el-tabs__item.is-active) {
  background-color: white;
  border-bottom-color: white;
}

:deep(.el-tabs__content) {
  display: none; /* 标签内容不在这里显示 */
}
</style>