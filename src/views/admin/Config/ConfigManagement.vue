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

      <div v-else :class="['space-y-8', activeTab === 'FOOTER' ? 'w-full' : 'max-w-5xl']">
        <!-- Footer Sub-tabs -->
        <div v-if="activeTab === 'FOOTER'" class="flex gap-4 p-2 bg-gray-50 rounded-2xl w-fit border border-gray-100 shadow-sm mb-6">
          <button 
            @click="activeFooterTab = 'COLUMNS'"
            :class="[
              'px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2',
              activeFooterTab === 'COLUMNS' 
                ? 'bg-red-500 text-white shadow-md shadow-red-500/20' 
                : 'text-gray-500 hover:text-red-500 hover:bg-white'
            ]"
          >
            <i class="pi pi-th-large"></i>
            {{ $t('CONFIG_ADMIN.LABELS.FOOTER_COLUMNS') }}
          </button>
          <button 
            @click="activeFooterTab = 'PARTNERS'"
            :class="[
              'px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2',
              activeFooterTab === 'PARTNERS' 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-white'
            ]"
          >
            <i class="pi pi-images"></i>
            {{ $t('CONFIG_ADMIN.FOOTER_BUILDER.PARTNER_LOGOS') }}
          </button>
        </div>

        <div v-for="config in filteredConfigs" :key="config.key" class="space-y-4 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">{{ getConfigLabel(config.key) }}</label>
          <div v-if="config.key === 'CONTACT_MAP_IFRAME'" class="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg flex items-start gap-2 border border-blue-100 italic transition-all shadow-sm">
            <i class="pi pi-info-circle mt-0.5"></i>
            <div>
              <p class="font-bold mb-1 opacity-90">{{ $t('CONFIG_ADMIN.HINT.MAP_TITLE') }}</p>
              <ul class="list-disc list-inside space-y-1 opacity-80">
                <li>{{ $t('CONFIG_ADMIN.HINT.MAP_STEP1') }}</li>
                <li>{{ $t('CONFIG_ADMIN.HINT.MAP_STEP2') }}</li>
                <li>{{ $t('CONFIG_ADMIN.HINT.MAP_STEP3') }}</li>
              </ul>
            </div>
          </div>
          
          <div v-if="editData[config.key]" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Special handling for SYSTEM_FONT -->
            <template v-if="config.key === 'SYSTEM_FONT'">
              <div class="col-span-3 space-y-2">
                <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Chọn Font Chữ Hệ Thống</span>
                <div class="flex gap-4">
                  <div class="relative flex-1" ref="fontDropdownRef">
                    <div 
                      @click="isFontDropdownOpen = !isFontDropdownOpen"
                      class="flex items-center justify-between w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 cursor-pointer hover:bg-white focus:outline-none transition-all"
                      :style="systemFontMode !== '_CUSTOM_' ? { fontFamily: `&quot;${systemFontMode}&quot;, sans-serif` } : {}"
                    >
                      <span>{{ systemFontMode === '_CUSTOM_' ? 'Font tùy chỉnh từ Google Fonts...' : systemFontMode }}</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    <div 
                      v-if="isFontDropdownOpen"
                      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto py-1"
                    >
                      <div 
                        v-for="font in availableFonts" 
                        :key="font" 
                        @click="selectFontMode(font, config.key)"
                        class="px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-gray-900 transition-colors"
                        :class="{'bg-blue-50 text-blue-600': systemFontMode === font}"
                        :style="{ fontFamily: `&quot;${font}&quot;, sans-serif` }"
                      >
                        {{ font }}
                      </div>
                      <div 
                        @click="selectFontMode('_CUSTOM_', config.key)"
                        class="px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-gray-900 border-t border-gray-100 transition-colors"
                        :class="{'bg-blue-50 text-blue-600': systemFontMode === '_CUSTOM_'}"
                      >
                        Font tùy chỉnh từ Google Fonts...
                      </div>
                    </div>
                  </div>
                  <input 
                    v-if="systemFontMode === '_CUSTOM_'"
                    v-model="editData[config.key].value_vi"
                    @input="syncFontValues(config.key)"
                    placeholder="VD: Dancing Script"
                    type="text"
                    class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <!-- Font Preview Box -->
                <h6 class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 border-b border-gray-200 pb-2">Xem trước font chữ:</h6>
                <div 
                  class="mt-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
                  :style="{ fontFamily: `&quot;${editData[config.key]?.value_vi || 'Outfit'}&quot;, sans-serif` }"
                >
                  <p class="text-xl font-medium text-gray-800 mb-2">Kiến tạo cảm xúc, thu trọn thương hiệu</p>
                  <p class="text-md text-gray-500">The quick brown fox jumps over the lazy dog. 0123456789</p>
                </div>
                <p class="text-[11px] text-gray-500 italic mt-1">* Chọn font từ danh sách hoặc nhập tên chính xác từ Google Fonts. Áp dụng toàn trang.</p>
              </div>
            </template>

            <!-- Special handling for FOOTER_COLUMNS -->
            <template v-else-if="config.key === 'FOOTER_COLUMNS'">
              <div class="col-span-3 space-y-8 group/builder w-full max-w-none">
                <!-- Column List -->
                <div v-for="(col, colIdx) in footerData" :key="colIdx" 
                  class="relative bg-white border-2 border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 ring-offset-4 hover:ring-2 hover:ring-red-100"
                >
                  <!-- Floating Index -->
                  <div class="absolute -left-4 top-10 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg ring-4 ring-white z-10">
                    {{ colIdx + 1 }}
                  </div>

                  <!-- Header Actions -->
                  <div class="flex justify-between items-center mb-6 pl-4">
                    <div class="flex items-center gap-4">
                      <button @click="toggleCol(colIdx)" 
                        class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-200 shadow-sm"
                      >
                        <i :class="['pi', collapsedCols[colIdx] ? 'pi-chevron-down' : 'pi-chevron-up']"></i>
                      </button>
                      <div class="space-y-0.5">
                        <h4 class="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                           <i class="pi pi-th-large text-red-500"></i>
                           {{ col.title.vi || $t('CONFIG_ADMIN.FOOTER_BUILDER.COL_TITLE') }}
                        </h4>
                        <p v-if="!collapsedCols[colIdx]" class="text-sm text-gray-400">Cấu hình tiêu đề và đường dẫn chính cho cột footer này</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <span v-if="collapsedCols[colIdx]" class="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                        {{ col.items.length }} liên kết con
                      </span>
                    </div>
                  </div>
                  
                  <div v-if="!collapsedCols[colIdx]" class="transition-all duration-500 animate-fade-in">
                    <!-- Main Inputs -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pl-4">
                      <div class="space-y-2">
                        <label class="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Tiêu đề (VI)</label>
                        <input v-model="col.title.vi" type="text" 
                          class="w-full text-lg font-bold border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all bg-white" 
                        />
                      </div>
                      <div class="space-y-2">
                        <label class="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Title (EN)</label>
                        <input v-model="col.title.en" type="text" 
                          class="w-full text-lg font-bold border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all bg-white" 
                        />
                      </div>
                      <div class="space-y-2">
                        <label class="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">标题 (ZH)</label>
                        <input v-model="col.title.zh" type="text" 
                          class="w-full text-lg font-bold border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all bg-white" 
                        />
                      </div>
                      <div class="space-y-2">
                        <label class="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">{{ $t('CONFIG_ADMIN.FOOTER_BUILDER.SELECT_LINK') }}</label>
                        <select v-model="col.link" 
                          class="w-full text-lg font-bold border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all bg-white cursor-pointer"
                        >
                          <option v-for="key in selectablePageKeys" :key="key" :value="key">{{ key }}</option>
                        </select>
                      </div>
                    </div>

                    <!-- Sub Items Section -->
                    <div class="mt-6 ml-4 bg-gray-50/50 rounded-3xl p-8 border-2 border-gray-200">
                      <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-3 text-gray-800">
                           <i class="pi pi-list text-lg text-red-500"></i>
                           <span class="text-sm font-black uppercase tracking-wider">Danh sách liên kết con ({{ col.items.length }})</span>
                        </div>
                      </div>

                      <div class="space-y-6">
                        <div v-for="(item, itemIdx) in col.items" :key="itemIdx" 
                          class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end bg-white border-2 border-gray-100 p-6 rounded-2xl relative group/item hover:border-red-300 transition-all shadow-sm"
                        >
                          <div class="space-y-2">
                            <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Link (VI)</label>
                            <input v-model="item.title.vi" type="text" class="w-full text-[15px] font-semibold border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-red-500 focus:ring-0 bg-gray-50/30" />
                          </div>
                          <div class="space-y-2">
                            <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Link (EN)</label>
                            <input v-model="item.title.en" type="text" class="w-full text-[15px] font-semibold border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-red-500 focus:ring-0 bg-gray-50/30" />
                          </div>
                          <div class="space-y-2">
                            <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Link (ZH)</label>
                            <input v-model="item.title.zh" type="text" class="w-full text-[15px] font-semibold border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-red-500 focus:ring-0 bg-gray-50/30" />
                          </div>
                          <div class="flex items-center gap-4">
                            <div class="flex-1 space-y-2">
                              <label class="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Đường dẫn</label>
                              <select v-model="item.link" class="w-full text-[15px] font-semibold border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-red-500 focus:ring-0 bg-gray-50/30 cursor-pointer">
                                <option v-for="key in selectablePageKeys" :key="key" :value="key">{{ key }}</option>
                              </select>
                            </div>
                            <button @click="removeFooterItem(Number(colIdx), Number(itemIdx))" 
                              class="mb-0.5 p-3.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all opacity-0 group-hover/item:opacity-100 shadow-sm"
                            >
                              <i class="pi pi-trash text-lg"></i>
                            </button>
                          </div>
                        </div>

                        <!-- Empty State for items -->
                        <div v-if="!col.items.length" class="text-center py-12 text-gray-400 border-2 border-dashed border-gray-300 rounded-2xl bg-white/50 italic text-sm">
                          Chưa có liên kết con nào. Hãy nhấn nút bên dưới để thêm.
                        </div>
                      </div>

                      <!-- Add Item Button -->
                      <button @click="addFooterItem(colIdx)" 
                        class="mt-8 w-full py-5 border-4 border-dashed border-red-200 rounded-2xl text-red-500 font-black hover:bg-red-500 hover:text-white hover:border-red-500 transition-all flex items-center justify-center gap-2 group/addbtn shadow-sm"
                      >
                        <i class="pi pi-plus-circle text-xl group-hover/addbtn:scale-125 transition-transform"></i>
                        <span class="text-lg uppercase">{{ $t('CONFIG_ADMIN.FOOTER_BUILDER.ADD_ITEM') }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Special handling for FOOTER_PARTNER_LOGOS -->
            <template v-else-if="config.key === 'FOOTER_PARTNER_LOGOS'">
              <div class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(logo, idx) in partnerLogos" :key="idx" 
                  class="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm hover:border-red-200 transition-all flex flex-col gap-6"
                >
                  <div class="flex items-center gap-3 border-b border-gray-50 pb-4 mb-2">
                    <div class="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                      {{ idx + 1 }}
                    </div>
                    <span class="font-black text-gray-800 uppercase tracking-tight text-lg truncate">{{ logo.name }}</span>
                  </div>

                  <!-- Image Upload -->
                  <div @click="($refs[`logoInput_${idx}`] as any)?.[0]?.click()" 
                    class="aspect-[16/6] bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-red-50 hover:border-red-400 transition-all group overflow-hidden relative shadow-inner"
                  >
                    <img v-if="logo.image" :src="logo.image" class="absolute inset-0 w-full h-full object-contain p-6 hover:scale-110 transition-transform duration-500" :class="{'opacity-20': uploadingLogos[idx]}" />
                    <div v-if="uploadingLogos[idx]" class="absolute inset-0 flex flex-col items-center justify-center text-red-500">
                      <i class="pi pi-spin pi-spinner text-4xl mb-2"></i>
                      <span class="text-[10px] font-black uppercase tracking-widest animate-pulse">Đang tải lên...</span>
                    </div>
                    <div v-else-if="!logo.image" class="flex flex-col items-center text-gray-400 group-hover:text-red-500 transition-colors">
                      <i class="pi pi-cloud-upload text-4xl mb-2"></i>
                      <span class="text-xs font-black uppercase tracking-widest">{{ $t('CONFIG_ADMIN.FOOTER_BUILDER.PARTNER_IMAGE') }}</span>
                    </div>
                    <input :ref="`logoInput_${idx}`" type="file" @change="e => handlePartnerLogoUpload(e, idx)" class="hidden" accept="image/*" />
                  </div>

                  <!-- Name Edit -->
                  <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">{{ $t('CONFIG_ADMIN.FOOTER_BUILDER.PARTNER_NAME') }}</label>
                    <input v-model="logo.name" type="text" 
                      class="w-full text-base font-bold border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white"
                    />
                  </div>

                  <!-- Link Edit -->
                  <div class="space-y-2">
                    <label class="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">{{ $t('CONFIG_ADMIN.FOOTER_BUILDER.PARTNER_LINK') }}</label>
                    <input v-model="logo.link" type="text" 
                      class="w-full text-base font-bold border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </template>

            <!-- Default rendering -->
            <template v-else>
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
            </template>
          </div>
        </div>
      </div>
    </component-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import ComponentCard from '@/components/common/ComponentCard.vue';
import { useConfigStore } from '@/store/config';
import { ConfigService } from '@/services/config.service';
import { ResponseError } from '@/utils/error';
import { useToast } from '@/composables/useToast';
import { PAGE_KEYS, API_ROUTES } from '@/constants';
import { uploadService } from '@/services/upload.service';

const { t } = useI18n();
const { toastSuccess, toastError } = useToast();

const configStore = useConfigStore();
const activeTab = ref('GENERAL');
const activeFooterTab = ref('COLUMNS');
const saving = ref(false);
const loading = ref(false);

const selectablePageKeys = computed(() => {
  return Object.keys(PAGE_KEYS).filter(k => k !== 'POST_DETAIL' && k !== 'PRODUCT_DETAIL');
});

const footerData = ref<any[]>([]);
const collapsedCols = ref<Record<number, boolean>>({});
const toggleCol = (idx: number) => {
  collapsedCols.value[idx] = !collapsedCols.value[idx];
};

const partnerLogos = ref<any[]>([]);
const uploadingLogos = ref<Record<number, boolean>>({});

const handlePartnerLogoUpload = async (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  uploadingLogos.value[index] = true;
  try {
    const response = await uploadService.uploadImage(file);
    if (response instanceof ResponseError) {
      toastError(response.message || 'Tải ảnh thất bại');
      return;
    }

    if (!response.data?.location) {
      toastError('Tải ảnh thất bại');
      return;
    }
    partnerLogos.value[index].image = response.data.location;
    toastSuccess('Tải ảnh thành công');
  } catch (error) {
    console.error('Error uploading partner logo:', error);
    toastError('Lỗi khi tải ảnh');
  } finally {
    uploadingLogos.value[index] = false;
    target.value = '';
  }
};

const addFooterItem = (colIdx: number) => {
  footerData.value[colIdx].items.push({
    title: { vi: 'Liên kết mới', en: 'New link', zh: '新链接' },
    link: 'HOME'
  });
};

const removeFooterItem = (colIdx: number, itemIdx: number) => {
  footerData.value[colIdx].items.splice(itemIdx, 1);
};

const tabs = computed(() => [
  { id: 'GENERAL', name: t('CONFIG_ADMIN.TABS.GENERAL') },
  { id: 'CONTACT', name: t('CONFIG_ADMIN.TABS.CONTACT') },
  { id: 'SOCIAL', name: t('CONFIG_ADMIN.TABS.SOCIAL') },
  { id: 'MENU', name: t('CONFIG_ADMIN.TABS.MENU') },
  { id: 'FOOTER', name: t('CONFIG_ADMIN.TABS.FOOTER') },
  // { id: 'STATISTICS', name: t('CONFIG_ADMIN.TABS.STATISTICS') }
]);

const editData = ref<Record<string, { value_vi: string, value_en: string, value_zh: string }>>({});

const filteredConfigs = computed(() => {
  if (activeTab.value === 'FOOTER') {
    if (activeFooterTab.value === 'COLUMNS') {
      return configStore.allConfigs.filter(c => c.key === 'FOOTER_COLUMNS');
    } else {
      return configStore.allConfigs.filter(c => c.key === 'FOOTER_PARTNER_LOGOS');
    }
  }
  return configStore.allConfigs.filter(c => c.group === activeTab.value && c.key !== 'FOOTER_COLUMNS' && c.key !== 'FOOTER_PARTNER_LOGOS');
});

const getConfigLabel = (key: string) => {
  return t(`CONFIG_ADMIN.LABELS.${key}`) || key;
};

const systemFontMode = ref('Outfit');

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
  
  if (data['SYSTEM_FONT']) {
    if (availableFonts.includes(data['SYSTEM_FONT'].value_vi)) {
      systemFontMode.value = data['SYSTEM_FONT'].value_vi;
    } else {
      systemFontMode.value = '_CUSTOM_';
    }
  }

  if (data['FOOTER_COLUMNS']) {
    try {
      footerData.value = JSON.parse(data['FOOTER_COLUMNS'].value_vi || '[]');
    } catch (e) {
      console.error('Failed to parse FOOTER_COLUMNS', e);
      footerData.value = [];
    }
  } else {
    footerData.value = [];
  }

  if (data['FOOTER_PARTNER_LOGOS']) {
    try {
      partnerLogos.value = JSON.parse(data['FOOTER_PARTNER_LOGOS'].value_vi || '[]');
    } catch (e) {
      console.error('Failed to parse FOOTER_PARTNER_LOGOS', e);
    }
  }
};

const availableFonts = [
  'Inter', 'Be Vietnam Pro', 'Montserrat', 'Roboto', 'Open Sans', 'Poppins', 'Nunito', 'Noto Sans', 'Lexend', 'Quicksand', 'Mulish',
  'Playfair Display', 'Lora', 'Merriweather', 'EB Garamond', 'Tinos', 'Noto Serif',
  'Outfit', 'Kanit', 'Oswald', 'Bitter', 'Space Grotesk'
];

const syncFontValues = (key: string) => {
  if (key === 'SYSTEM_FONT') {
    const val = editData.value[key].value_vi;
    editData.value[key].value_en = val;
    editData.value[key].value_zh = val;
  }
};

const handleFontModeChange = (key: string) => {
  if (systemFontMode.value !== '_CUSTOM_') {
    editData.value[key].value_vi = systemFontMode.value;
    syncFontValues(key);
  }
};

const isFontDropdownOpen = ref(false);
const fontDropdownRef = ref<HTMLElement | null>(null);

const selectFontMode = (val: string, key: string) => {
  systemFontMode.value = val;
  isFontDropdownOpen.value = false;
  handleFontModeChange(key);
};

const handleClickOutside = (e: MouseEvent) => {
  const el = Array.isArray(fontDropdownRef.value) ? fontDropdownRef.value[0] : fontDropdownRef.value;
  if (el && typeof el.contains === 'function' && !el.contains(e.target as Node)) {
    isFontDropdownOpen.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  await configStore.fetchAllConfigs();
  initEditData();
  loading.value = false;
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const saveAll = async () => {
  saving.value = true;
  try {
    const sanitizeMapUrl = (key: string, value: string) => {
      if (key === 'CONTACT_MAP_IFRAME' && value.includes('<iframe')) {
        const match = value.match(/src="([^"]+)"/);
        return match ? match[1] : value;
      }
      return value;
    };

    const payload = {
      configs: Object.keys(editData.value).map(key => {
        let val_vi = editData.value[key].value_vi;
        let val_en = editData.value[key].value_en;
        let val_zh = editData.value[key].value_zh;

        if (key === 'FOOTER_COLUMNS') {
           const json = JSON.stringify(footerData.value);
           val_vi = json;
           val_en = json;
           val_zh = json;
        } else if (key === 'FOOTER_PARTNER_LOGOS') {
           const json = JSON.stringify(partnerLogos.value);
           val_vi = json;
           val_en = json;
           val_zh = json;
        } else {
           val_vi = sanitizeMapUrl(key, val_vi);
           val_en = sanitizeMapUrl(key, val_en);
           val_zh = sanitizeMapUrl(key, val_zh);
        }

        return {
          key,
          value_vi: val_vi,
          value_en: val_en,
          value_zh: val_zh
        };
      })
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
