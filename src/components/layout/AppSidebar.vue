<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-gray-950 border-gray-800 text-gray-100 h-screen transition-all duration-300 ease-in-out z-99999 border-r',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div :class="['py-8 flex', !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start']">
      <router-link to="/">
        <div
          v-if="isExpanded || isHovered || isMobileOpen"
          class="text-2xl font-bold flex items-center"
        >
          <span class="text-red-500">5P</span>
          <span class="ml-1 text-white">Event</span>
        </div>
        <div
          v-else
          class="text-2xl font-bold text-red-500"
        >
          5P
        </div>
      </router-link>
    </div>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
                !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{
                    item.name
                  }}</span>
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(groupIndex, index),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{
                    item.name
                  }}</span>
                </router-link>
                <transition
                  @enter="enter"
                  @after-enter="cleanup"
                  @before-leave="beforeLeave"
                  @after-leave="cleanup"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) && (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.path"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(subItem.path),
                              'menu-dropdown-item-inactive': !isActive(subItem.path),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(subItem.path),
                                  'menu-dropdown-badge-inactive': !isActive(subItem.path),
                                },
                              ]"
                            >
                              new
                            </span>
                            <span
                              v-if="subItem.pro"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(subItem.path),
                                  'menu-dropdown-badge-inactive': !isActive(subItem.path),
                                },
                              ]"
                            >
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import {
  GridIcon,
  UserCircleIcon,
  ChevronDownIcon,
  HorizontalDots,
  ListIcon,
  PlugInIcon,
} from '@/icons'
import { useSidebar } from '@/composables/useSidebar'
import { useI18n } from 'vue-i18n'
import { ADMIN_ROUTES } from '@/constants/routes'
import type { MenuGroup, MenuItem } from '@/types/menu'
import { useAuthStore } from '@/store/auth'
import { USER_ROLES } from '@/constants'

const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar()

const menuGroups = computed<MenuGroup[]>(() => {
  const fullMenu: MenuGroup[] = [
    {
      title: 'Admin Panel',
      items: [
        { icon: GridIcon, name: t('SIDEBAR.DASHBOARD'), path: ADMIN_ROUTES.DASHBOARD },
        {
          icon: ListIcon,
          name: t('SIDEBAR.CONTENT_MANAGEMENT'),
          subItems: [
            { name: t('SIDEBAR.PRODUCTS'), path: ADMIN_ROUTES.PRODUCTS, pro: false },
            { name: t('SIDEBAR.POSTS'), path: ADMIN_ROUTES.POSTS, pro: false },
            { name: t('SIDEBAR.HIGHLIGHTS'), path: ADMIN_ROUTES.HIGHLIGHTS, pro: false },
            { name: t('SIDEBAR.PARTNERS'), path: ADMIN_ROUTES.PARTNERS, pro: false },
            { name: t('SIDEBAR.VIDEOS'), path: ADMIN_ROUTES.VIDEOS, pro: false },
            { name: t('SIDEBAR.HOME_VIDEOS'), path: ADMIN_ROUTES.HOME_VIDEOS, pro: false },
          ],
        },
        {
          icon: UserCircleIcon,
          name: t('SIDEBAR.CUSTOMER_ENGAGEMENT'),
          subItems: [
            // { name: t('SIDEBAR.NEWSLETTER'), path: ADMIN_ROUTES.NEWSLETTER, pro: false },
            {
              name: t('SIDEBAR.CONTACT_MESSAGES'),
              path: ADMIN_ROUTES.CONTACT_MESSAGES,
              pro: false,
            },
          ],
        },
        {
          icon: PlugInIcon,
          name: t('SIDEBAR.SYSTEM_SETTINGS'),
          subItems: [
            { name: t('SIDEBAR.CONFIG'), path: ADMIN_ROUTES.CONFIGS, pro: false },
            { name: t('SIDEBAR.SEO'), path: ADMIN_ROUTES.SEO, pro: false },
          ],
        },
      ],
    },
  ]

  return fullMenu.map((group) => ({
    ...group,
    items: group.items.filter((item: MenuItem) => {
      if (item.requiredRole === USER_ROLES.ROLE_ADMIN) {
        return authStore.isAdmin
      }
      return true
    }),
  }))
})

const isActive = (path: string) => route.path === path

const toggleSubmenu = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`
  openSubmenu.value = openSubmenu.value === key ? null : key
}

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.value.some((group) =>
    group.items.some(
      (item: MenuItem) => item.subItems && item.subItems.some((subItem) => isActive(subItem.path)),
    ),
  )
})

const isSubmenuOpen = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups.value[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path),
      ) === true)
  )
}

const enter = (el: Element, done: () => void) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  const height = element.scrollHeight
  element.style.height = '0px'
  void element.offsetHeight
  element.style.height = `${height}px`

  const onEnd = () => {
    element.removeEventListener('transitionend', onEnd)
    done()
  }
  element.addEventListener('transitionend', onEnd)
}

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  void element.offsetHeight // force reflow
  element.style.height = '0px'
}

const cleanup = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
}

watch(
  () => route.path,
  () => {
    if (isMobileOpen.value) {
      isMobileOpen.value = false
    }
  },
)
</script>
