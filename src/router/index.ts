// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/components/layout/Admin.vue'
import UserLayout from '@/components/layout/UserLayout.vue'
import { useAuthStore } from '@/store/auth'
import { USER_ROLES } from '@/constants'
import { SeoService } from '@/services/seo.service'
import { ResponseError } from '@/utils/error'

// Fetch all SEO metas once to get paths
const seoData = await SeoService.getAllSeoMeta()
const seoMetas = !(seoData instanceof ResponseError) ? seoData.data : []

const getSeoPath = (pageKey: string, defaultPath: string) => {
  const normalizedKey = pageKey.toUpperCase()
  const meta = seoMetas.find(m => m.pageKey.toUpperCase() === normalizedKey)
  // Ensure we don't return an empty string if it's not the home page
  return meta?.path || defaultPath
}

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
        {
          path: 'partners',
          name: 'PartnerManagement',
          component: () => import('@/views/admin/Partners/PartnerManagement.vue'),
          meta: {
            title: 'Quản lý đối tác',
            requiresAuth: true,
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
          path: getSeoPath('HOME', ''),
          name: 'Home',
          component: () => import('@/views/user/HomePage.vue'),
          meta: { title: 'Home Page' },
        },
        {
          path: getSeoPath('ABOUT', 'about').replace(/^\//, ''),
          name: 'About',
          component: () => import('@/views/user/AboutPage.vue'),
          meta: { title: 'About Us' },
        },
        {
          path: getSeoPath('EVENTS', 'events').replace(/^\//, ''),
          name: 'Events',
          component: () => import('@/views/user/EventsPage.vue'),
          meta: { title: 'Event Organization' },
        },
        {
          path: getSeoPath('SOUND_LIGHT', 'sound-lighting').replace(/^\//, ''),
          name: 'Sound_Light',
          component: () => import('@/views/user/SoundLightPage.vue'),
          meta: { title: 'Sound & Lighting' },
        },
        {
          path: getSeoPath('RENTAL', 'rental').replace(/^\//, ''),
          name: 'Rental',
          component: () => import('@/views/user/RentalPage.vue'),
          meta: { title: 'Equipment Rental' },
        },
        {
          path: getSeoPath('CONTACT', 'contact').replace(/^\//, ''),
          name: 'Contact',
          component: () => import('@/views/user/ContactPage.vue'),
          meta: { title: 'Contact Us' },
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
  const publicRouteNames = ['Home', 'About', 'Events', 'Sound_Light', 'Rental', 'Contact', 'Signin', 'Signup', 'NotFound', 'ProductManagement', 'PostManagement', 'VideoManagement', 'HomeVideoManagement', 'NewsletterManagement', 'PartnerManagement']
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
