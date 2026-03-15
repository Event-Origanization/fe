<template>
  <div class="space-y-6">
    <page-breadcrumb pageTitle="Cấu hình Website" />

    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        Quản lý Cấu hình Website
      </h1>
      <button 
        @click="saveAll"
        :disabled="saving"
        class="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 active:scale-95"
      >
        <i class="pi pi-save"></i>
        <span>{{ saving ? 'Đang lưu...' : 'Lưu tất cả' }}</span>
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-gray-200">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-6 py-4 text-sm font-semibold transition-all relative',
          activeTab === tab.id ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
        ]"
      >
        {{ tab.name }}
        <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
      </button>
    </div>

    <!-- Tab Content -->
    <component-card 
      title="Nội dung cấu hình" 
      :desc="`Quản lý các thông tin thuộc nhóm ${activeTab}`"
    >
      <div v-if="loading" class="flex justify-center py-12">
        <i class="pi pi-spin pi-spinner text-3xl text-blue-500"></i>
      </div>

      <div v-else class="space-y-8 max-w-5xl">
        <div v-for="config in filteredConfigs" :key="config.key" class="space-y-4 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
          <label class="block text-sm font-bold text-gray-700">{{ getConfigLabel(config.key) }}</label>
          
          <div v-if="editData[config.key]" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- VI -->
            <div class="space-y-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Tiếng Việt</span>
              <input 
                v-model="editData[config.key].value_vi"
                type="text"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <!-- EN -->
            <div class="space-y-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">English</span>
              <input 
                v-model="editData[config.key].value_en"
                type="text"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <!-- ZH -->
            <div class="space-y-1.5">
              <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">繁體中文</span>
              <input 
                v-model="editData[config.key].value_zh"
                type="text"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </component-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import ComponentCard from '@/components/common/ComponentCard.vue';
import { useConfigStore } from '@/store/config';
import { ConfigService } from '@/services/config.service';
import { ResponseError } from '@/utils/error';
import { useToast } from '@/composables/useToast';

const { toastSuccess, toastError } = useToast();

const configStore = useConfigStore();
const activeTab = ref('GENERAL');
const saving = ref(false);
const loading = ref(false);

const tabs = [
  { id: 'GENERAL', name: 'Cài đặt chung' },
  { id: 'CONTACT', name: 'Thông tin liên hệ' },
  { id: 'SOCIAL', name: 'Mạng xã hội' },
  { id: 'MENU', name: 'Cấu hình Menu' }
];

const editData = ref<Record<string, { value_vi: string, value_en: string, value_zh: string }>>({});

const filteredConfigs = computed(() => {
  return configStore.allConfigs.filter(c => c.group === activeTab.value);
});

const getConfigLabel = (key: string) => {
  const labels: Record<string, string> = {
    'WEBSITE_NAME': 'Tên website',
    'WEBSITE_FULLNAME': 'Tên đầy đủ công ty',
    'WEBSITE_SLOGAN': 'Slogan',
    'WEBSITE_LOGO': 'Đường dẫn Logo',
    'WEBSITE_FAVICON': 'Đường dẫn Favicon',
    'CONTACT_HOTLINE': 'Hotline',
    'CONTACT_EMAIL': 'Email liên hệ',
    'CONTACT_ADDRESS': 'Địa chỉ',
    'CONTACT_MAP_IFRAME': 'Iframe Bản đồ',
    'SOCIAL_FACEBOOK': 'Link Facebook',
    'SOCIAL_ZALO': 'Link Zalo',
    'SOCIAL_YOUTUBE': 'Link Youtube',
    'MENU_HOME': 'Menu Trang chủ',
    'MENU_ABOUT': 'Menu Giới thiệu',
    'MENU_SERVICES': 'Menu Dịch vụ',
    'MENU_PROJECTS': 'Menu Dự án',
    'MENU_NEWS': 'Menu Tin tức',
    'MENU_CONTACT': 'Menu Liên hệ'
  };
  return labels[key] || key;
};

const initEditData = () => {
  const data: Record<string, { value_vi: string, value_en: string, value_zh: string }> = {};
  configStore.allConfigs.forEach(c => {
    data[c.key] = {
      value_vi: c.value_vi || '',
      value_en: c.value_en || '',
      value_zh: c.value_zh || ''
    };
  });
  editData.value = data;
};

onMounted(async () => {
  loading.value = true;
  await configStore.fetchAllConfigs();
  initEditData();
  loading.value = false;
});

const saveAll = async () => {
  saving.value = true;
  try {
    const payload = {
      configs: Object.keys(editData.value).map(key => ({
        key,
        ...editData.value[key]
      }))
    };
    
    const response = await ConfigService.bulkUpdateConfigs(payload);
    if (!(response instanceof ResponseError)) {
      // Refresh data
      await configStore.fetchAllConfigs();
      toastSuccess('Cập nhật cấu hình thành công');
    } else {
      toastError(response.message || 'Có lỗi xảy ra khi lưu cấu hình');
    }
  } catch {
    toastError('Có lỗi xảy ra khi lưu cấu hình');
  } finally {
    saving.value = false;
  }
};
</script>
