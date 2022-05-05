import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Header from "../components/Header.vue";
import Console from '../views/Console.vue'
const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      title: "首页-搜索"
    },
    components: {
      default: Home,
      Header
    }
  },
  {
    path: '/console',
    name: 'console',
    meta: {
      title: "控制台"
    },
    components: {
      console: Console,
    },
    children: [{
      path: 'setting',
      component: () => import('../components/console/Setting.vue')
    }, {
      path: 'url',
      component: () => import('../components/console/Url.vue')
    }, {
      path: 'account',
      component: () => import('../components/console/Account.vue')
    }]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router