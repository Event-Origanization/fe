// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/components/layout/Admin.vue'
import UserLayout from '@/components/layout/UserLayout.vue'
import { useAuthStore } from '@/store/auth'
import { USER_ROLES } from '@/constants'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // ====================== ADMIN ROUTES ======================
    {
      path: '/administrators',
      component: Admin,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('@/views/admin/HomePage.vue'),
          meta: {
            title: 'eCommerce Dashboard',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_USER],
          },
        },
        {
          path: 'products',
          name: 'ProductManagement',
          component: () => import('@/views/admin/Products/ProductManagement.vue'),
          meta: {
            title: 'Quản lý sản phẩm',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'posts',
          name: 'PostManagement',
          component: () => import('@/views/admin/Posts/PostManagement.vue'),
          meta: {
            title: 'Quản lý bài viết',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'seo',
          name: 'SeoManagement',
          component: () => import('@/views/admin/Seo/SeoManagement.vue'),
          meta: {
            title: 'Quản lý SEO',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'videos',
          name: 'VideoManagement',
          component: () => import('@/views/admin/Videos/VideoManagement.vue'),
          meta: {
            title: 'Quản lý Video',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'home-videos',
          name: 'HomeVideoManagement',
          component: () => import('@/views/admin/HomeVideo/HomeVideoManagement.vue'),
          meta: {
            title: 'Quản lý Video trang chủ',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'configs',
          name: 'ConfigManagement',
          component: () => import('@/views/admin/Config/ConfigManagement.vue'),
          meta: {
            title: 'Cấu hình Website',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'newsletter',
          name: 'NewsletterManagement',
          component: () => import('@/views/admin/Newsletter/NewsletterManagement.vue'),
          meta: {
            title: 'Quản lý nhận tin',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
      ],
    },

    // ====================== USER ROUTES (không Sidebar) ======================
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/user/HomePage.vue'),
          meta: { title: 'Home Page' },
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/user/AboutPage.vue'),
          meta: { title: 'About Us' },
        },
      ],
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('@/views/Auth/Signin.vue'),
      meta: { title: 'Sign In' },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/Auth/Signup.vue'),
      meta: { title: 'Sign Up' },
    },
    // ====================== 404 ======================
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/Errors/FourZeroFour.vue'),
      meta: { title: '404 - Not Found' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

router.beforeEach(async (to, _from, next) => {
  const publicRouteNames = ['Home', 'About', 'Signin', 'Signup', 'NotFound', 'ProductManagement', 'PostManagement', 'VideoManagement', 'HomeVideoManagement', 'NewsletterManagement']
  const authStore = useAuthStore()

  if (publicRouteNames.includes(to.name as string)) {
    return next()
  }

  if (!authStore.isAuthenticated) {
    await authStore.getMe()
  }

  if (!authStore.isAuthenticated || !authStore.user) {
    return next({
      name: 'NotFound',
    })
  }

  if (to.meta.roles && Array.isArray(to.meta.roles)) {
    const userRole = authStore.user?.role

    const allowedRoles = to.meta.roles

    if (!allowedRoles.includes(userRole)) {
      // alert('Bạn không có quyền truy cập trang này!')
      return next({
        name: 'NotFound',
      })
    }
  }
  return next()
})

router.afterEach(() => {
  // We handle SEO and Tittle in App.vue now
})

export default router
