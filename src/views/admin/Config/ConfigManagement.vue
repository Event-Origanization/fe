<template>
  <div class="space-y-6">
    <page-breadcrumb :pageTitle="$t('CONFIG_ADMIN.TITLE')" />

    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {{ $t('CONFIG_ADMIN.TITLE') }}
      </h1>
      <button 
        @click="saveAll"
        :disabled="saving"
        class="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 active:scale-95"
      >
        <i class="pi pi-save"></i>
        <span>{{ saving ? $t('CONFIG_ADMIN.SAVING') : $t('CONFIG_ADMIN.SAVE_ALL') }}</span>
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
      :title="$t('CONFIG_ADMIN.TAB_CONTENT_TITLE')" 
      :desc="`${$t('CONFIG_ADMIN.TAB_CONTENT_DESC')} ${tabs.find(t => t.id === activeTab)?.name}`"
    >
      <div v-if="loading" class="flex justify-center py-12">
        <i class="pi pi-spin pi-spinner text-3xl text-blue-500"></i>
      </div>

      <div v-else class="space-y-8 max-w-5xl">
        <div v-for="config in filteredConfigs" :key="config.key" class="space-y-4 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">{{ getConfigLabel(config.key) }}</label>
          
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
import { useI18n } from 'vue-i18n';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import ComponentCard from '@/components/common/ComponentCard.vue';
import { useConfigStore } from '@/store/config';
import { ConfigService } from '@/services/config.service';
import { ResponseError } from '@/utils/error';
import { useToast } from '@/composables/useToast';

const { t } = useI18n();
const { toastSuccess, toastError } = useToast();

const configStore = useConfigStore();
const activeTab = ref('GENERAL');
const saving = ref(false);
const loading = ref(false);

const tabs = computed(() => [
  { id: 'GENERAL', name: t('CONFIG_ADMIN.TABS.GENERAL') },
  { id: 'CONTACT', name: t('CONFIG_ADMIN.TABS.CONTACT') },
  { id: 'SOCIAL', name: t('CONFIG_ADMIN.TABS.SOCIAL') },
  { id: 'MENU', name: t('CONFIG_ADMIN.TABS.MENU') }
]);

const editData = ref<Record<string, { value_vi: string, value_en: string, value_zh: string }>>({});

const filteredConfigs = computed(() => {
  return configStore.allConfigs.filter(c => c.group === activeTab.value);
});

const getConfigLabel = (key: string) => {
  return t(`CONFIG_ADMIN.LABELS.${key}`) || key;
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
      toastSuccess(t('COMMON.SUCCESS'));
    } else {
      toastError(response.message || t('COMMON.ERROR'));
    }
  } catch {
    toastError(t('COMMON.ERROR'));
  } finally {
    saving.value = false;
  }
};
</script>
