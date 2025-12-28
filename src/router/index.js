import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import About from '~/pages/About.vue'
import Login from '~/pages/login.vue'
import Admin from '~/layouts/admin.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import Student from '../pages/student/List.vue'
import Course from '../pages/course/List.vue'
import StudentInput from '../pages/student/input.vue'
import Tom from '../pages/course/Tom.vue'
import Score from '../pages/student/Score.vue'
import My from '../pages/mypicture.vue'

const routes =[{
    path:"/",
    component:Admin,
    children:[{
        path:"/student/Score",
        component:Score ,
        meta:{
            title:'梵高'
        }
    },
    {
        path:'/student/input',
        component:StudentInput,
        meta:{
            title:'齐白石'
        }
    },
    {
        path:'/student/List',
        component:Student,
        meta:{
            title:'添加画作'
        }
    },
    {
        path:"/course/list",
        component: Course,
        meta:{
            title:'添加照片'
        }
    },
    {
        path:"/course/Tom",
        component: Tom,
        meta:{
            title:'Tom Juenemann'
        }
    },
    {
        path:"/pages/mypicture",
        component: My,
        meta:{
            title:'我的画廊'
        }
    },
]
},
{
    path:"/login",
    component:Login
},
{
    path:"/about",
    component:About
},
{
    path:"/:pathMatch(.*)*",
    component:NotFound
},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router