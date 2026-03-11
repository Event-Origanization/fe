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
          path: 'users',
          name: 'UserManagement',
          component: () => import('@/views/admin/Users/UserManagement.vue'),
          meta: { requiresAuth: true, roles: [USER_ROLES.ROLE_ADMIN] },
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
  const publicRouteNames = ['Home', 'Signin', 'Signup', 'NotFound']
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

export default router
