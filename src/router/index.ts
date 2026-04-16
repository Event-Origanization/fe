// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/components/layout/Admin.vue'
import UserLayout from '@/components/layout/UserLayout.vue'
import { useAuthStore } from '@/store/auth'
import { USER_ROLES } from '@/constants'
import { SeoService } from '@/services/seo.service'
import { ResponseError } from '@/utils/error'
import { ADMIN_ROUTES, ADMIN_PATHS } from '@/constants/routes'

// Fetch all SEO metas once to get paths
const seoData = await SeoService.getAllSeoMeta()
const seoMetas = !(seoData instanceof ResponseError) ? seoData.data : []

const getSeoPath = (pageKey: string, defaultPath: string) => {
  const normalizedKey = pageKey.toUpperCase()
  const meta = seoMetas.find(m => m.pageKey.toUpperCase() === normalizedKey)
  // Ensure we don't return an empty string if it's not the home page
  return meta?.path || defaultPath
}

// ====================== ROUTE NAME CONSTANTS ======================
export const ROUTE_NAMES = {
  HOME: 'Home',
  // ABOUT: 'About',
  EVENT_VIDEO: 'EventVideo',
  EVENT_IMAGE: 'EventImage',
  SOUND_LIGHT: 'Sound_Light',
  RENTAL: 'Rental',
  CONTACT: 'Contact',
  NEWS: 'News',
  POST_DETAIL: 'PostDetail',
  PRODUCT_DETAIL: 'ProductDetail',
  SIGNIN: 'Signin',
  SIGNUP: 'Signup',
  NOT_FOUND: 'NotFound',
  PRODUCT_MANAGEMENT: 'ProductManagement',
  PRODUCT_EDIT: 'ProductEdit',
  PRODUCT_CREATE: 'ProductCreate'
} as const

const PUBLIC_ROUTE_NAMES: string[] = Object.values(ROUTE_NAMES)

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    // ====================== ADMIN ROUTES ======================
    {
      path: ADMIN_ROUTES.BASE,
      component: Admin,
      children: [
        {
          path: ADMIN_PATHS.DASHBOARD,
          name: 'HomePage',
          component: () => import('@/views/admin/HomePage.vue'),
          meta: {
            title: 'eCommerce Dashboard',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN, USER_ROLES.ROLE_USER],
          },
        },
        {
          path: ADMIN_PATHS.PRODUCTS,
          name: 'ProductManagement',
          component: () => import('@/views/admin/Products/ProductManagement.vue'),
          meta: {
            title: 'Quản lý sản phẩm',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.POSTS,
          name: 'PostManagement',
          component: () => import('@/views/admin/Posts/PostManagement.vue'),
          meta: {
            title: 'Quản lý bài viết',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.POSTS_CREATE,
          name: 'PostCreate',
          component: () => import('@/views/admin/Posts/PostEditorPage.vue'),
          meta: {
            title: 'Tạo bài viết mới',
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.POSTS_EDIT,
          name: 'PostEdit',
          component: () => import('@/views/admin/Posts/PostEditorPage.vue'),
          meta: {
            title: 'Chỉnh sửa bài viết',
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: 'products/create',
          name: 'ProductCreate',
          component: () => import('@/views/admin/Products/ProductEditorPage.vue'),
          meta: { requiresAuth: true, title: 'Thêm sản phẩm mới' }
        },
        {
          path: 'products/edit/:id',
          name: 'ProductEdit',
          component: () => import('@/views/admin/Products/ProductEditorPage.vue'),
          meta: { requiresAuth: true, title: 'Chỉnh sửa sản phẩm' }
        },
        {
          path: ADMIN_PATHS.SEO,
          name: 'SeoManagement',
          component: () => import('@/views/admin/Seo/SeoManagement.vue'),
          meta: {
            title: 'Quản lý SEO',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.HIGHLIGHTS,
          name: 'HighlightManagement',
          component: () => import('@/views/admin/Highlights/HighlightManagement.vue'),
          meta: {
            title: 'Quản lý Nổi bật',
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.VIDEOS,
          name: 'VideoManagement',
          component: () => import('@/views/admin/Videos/VideoManagement.vue'),
          meta: {
            title: 'Quản lý Video',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.HOME_VIDEOS,
          name: 'HomeVideoManagement',
          component: () => import('@/views/admin/HomeVideo/HomeVideoManagement.vue'),
          meta: {
            title: 'Quản lý Video trang chủ',
            // requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.CONFIGS,
          name: 'ConfigManagement',
          component: () => import('@/views/admin/Config/ConfigManagement.vue'),
          meta: {
            title: 'Cấu hình Website',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        // {
        //   path: ADMIN_PATHS.NEWSLETTER,
        //   name: 'NewsletterManagement',
        //   component: () => import('@/views/admin/Newsletter/NewsletterManagement.vue'),
        //   meta: {
        //     title: 'Quản lý nhận tin',
        //     // requiresAuth: true,
        //     roles: [USER_ROLES.ROLE_ADMIN],
        //   },
        // },
        {
          path: ADMIN_PATHS.PARTNERS,
          name: 'PartnerManagement',
          component: () => import('@/views/admin/Partners/PartnerManagement.vue'),
          meta: {
            title: 'Quản lý đối tác',
            requiresAuth: true,
            roles: [USER_ROLES.ROLE_ADMIN],
          },
        },
        {
          path: ADMIN_PATHS.CONTACT_MESSAGES,
          name: 'ContactMessageManagement',
          component: () => import('@/views/admin/ContactMessage/ContactMessageManagement.vue'),
          meta: {
            title: 'Tin nhắn liên hệ',
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
          name: ROUTE_NAMES.HOME,
          component: () => import('@/views/user/HomePage.vue'),
          meta: { title: 'Home Page' },
        },
        // {
        //   path: getSeoPath('ABOUT', 'about').replace(/^\//, ''),
        //   name: ROUTE_NAMES.ABOUT,
        //   component: () => import('@/views/user/AboutPage.vue'),
        //   meta: { title: 'About Us' },
        // },
        {
          path: getSeoPath('EVENT_VIDEO', 'video-su-kien').replace(/^\//, ''),
          name: ROUTE_NAMES.EVENT_VIDEO,
          component: () => import('@/views/user/EventVideosPage.vue'),
          meta: { title: 'Event Videos' },
        },
        {
          path: getSeoPath('EVENT_IMAGE', 'hinh-anh-su-kien').replace(/^\//, ''),
          name: ROUTE_NAMES.EVENT_IMAGE,
          component: () => import('@/views/user/EventImagesPage.vue'),
          meta: { title: 'Event Images' },
        },
        {
          path: getSeoPath('SOUND_LIGHT', 'sound-lighting').replace(/^\//, ''),
          name: ROUTE_NAMES.SOUND_LIGHT,
          component: () => import('@/views/user/SoundLightPage.vue'),
          meta: { title: 'Sound & Lighting' },
        },
        {
          path: getSeoPath('RENTAL', 'rental').replace(/^\//, ''),
          name: ROUTE_NAMES.RENTAL,
          component: () => import('@/views/user/RentalPage.vue'),
          meta: { title: 'Equipment Rental' },
        },
        {
          path: getSeoPath('CONTACT', 'contact').replace(/^\//, ''),
          name: ROUTE_NAMES.CONTACT,
          component: () => import('@/views/user/ContactPage.vue'),
          meta: { title: 'Contact Us' },
        },
        {
          path: getSeoPath('NEWS', 'news').replace(/^\//, ''),
          name: ROUTE_NAMES.NEWS,
          component: () => import('@/views/user/NewsPage.vue'),
          meta: { title: 'News' },
        },
        {
          path: getSeoPath('POST_DETAIL', 'post/:slug').replace(/^\//, ''),
          name: ROUTE_NAMES.POST_DETAIL,
          component: () => import('@/views/user/PostDetailPage.vue'),
          meta: { title: 'Post Details' },
        },
        {
          path: getSeoPath('PRODUCT_DETAIL', 'product/:slug').replace(/^\//, ''),
          name: ROUTE_NAMES.PRODUCT_DETAIL,
          component: () => import('@/views/user/ProductDetailPage.vue'),
          meta: { title: 'Product Details' },
        },
      ],
    },
    {
      path: '/signin',
      name: ROUTE_NAMES.SIGNIN,
      component: () => import('@/views/Auth/Signin.vue'),
      meta: { title: 'Sign In' },
    },
    {
      path: '/signup',
      name: ROUTE_NAMES.SIGNUP,
      component: () => import('@/views/Auth/Signup.vue'),
      meta: { title: 'Sign Up' },
    },
    // ====================== 404 ======================
    {
      path: '/404',
      name: ROUTE_NAMES.NOT_FOUND,
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
  const authStore = useAuthStore()

  // Check if this is an admin route by path prefix
  const isAdminRoute = to.path.startsWith(ADMIN_ROUTES.BASE)

  if (!isAdminRoute || PUBLIC_ROUTE_NAMES.includes(to.name as string)) {
    // All non-admin routes are public — allow through
    return next()
  }

  // Admin route: ensure user is authenticated
  if (!authStore.isAuthenticated) {
    await authStore.getMe()
  }

  if (!authStore.isAuthenticated || !authStore.user) {
    return next({ path: '/signin', query: { redirect: to.fullPath } })
  }

  // Check role-based access
  if (to.meta.roles && Array.isArray(to.meta.roles)) {
    const userRole = authStore.user?.role
    const allowedRoles = to.meta.roles

    if (!allowedRoles.includes(userRole)) {
      return next({ name: 'NotFound' })
    }
  }

  return next()
})

router.afterEach(() => {
  // We handle SEO and Tittle in App.vue now
})

export default router
