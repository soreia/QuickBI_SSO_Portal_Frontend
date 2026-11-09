import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由表
 * - 业务页面按需懒加载，避免首屏体积膨胀
 * - meta.title 供导航守卫写入文档标题
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录' },
  },
  {
    // Entra ID 认证完成后回跳地址，需与应用注册里的重定向 URI 一致
    path: '/auth/callback',
    name: 'auth-callback',
    component: () => import('@/views/AuthCallbackView.vue'),
    meta: { title: '正在登录' },
  },
  {
    path: '/MyReports',
    name: 'my-reports',
    component: () => import('@/views/MyReports.vue'),
    meta: { title: 'My Reports' },
  },
  {
    path: '/MyReports/ChinaSalesOverview',
    name: 'china-sales-overview',
    component: () => import('@/views/ChinaSalesOverview.vue'),
    meta: { title: 'China Sales Overview' },
  },
  {
    path: '/CommonError',
    name: 'common-error',
    component: () => import('@/views/CommonError.vue'),
    meta: { title: 'Unable to load the report' },
  },
  {
    path: '/AuditLogs',
    name: 'audit-logs',
    component: () => import('@/views/AuditLogs.vue'),
    meta: { title: 'Audit logs' },
  },
  {
    path: '/UserAccessSync',
    name: 'user-access-sync',
    component: () => import('@/views/UserAccessSync.vue'),
    meta: { title: 'User & Access Sync' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'QuickBI SSO Portal'
  const pageTitle = to.meta?.title
  document.title = pageTitle ? `${pageTitle} · ${appTitle}` : appTitle
})

export default router
