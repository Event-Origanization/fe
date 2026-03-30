import { defineStore } from 'pinia';
import { ref } from 'vue';
import { highlightService } from '@/services/highlight.service';
import type { 
  IHighlight, 
  CreateHighlightRequest, 
  UpdateHighlightRequest, 
  HighlightQuery
} from '@/types/highlight';
import { ResponseError } from '@/utils/error';

export const useHighlightStore = defineStore('highlight', () => {
  const highlights = ref<IHighlight[]>([]);
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchPublicHighlights = async () => {
    loading.value = true;
    try {
      const response = await highlightService.getPublic();
      if (response instanceof ResponseError) throw response;
      
      highlights.value = response.data;
    } catch (error) {
      console.error('Error fetching highlights:', error);
    } finally {
      loading.value = false;
    }
  };

  const fetchAdminHighlights = async (params: HighlightQuery = {}) => {
    loading.value = true;
    try {
      const response = await highlightService.getAdmin(params);
      if (response instanceof ResponseError) throw response;

      highlights.value = response.data.highlights;
      pagination.value = response.data.pagination;
    } catch (error) {
      console.error('Error fetching admin highlights:', error);
    } finally {
      loading.value = false;
    }
  };

  const getHighlightById = async (id: number) => {
    try {
      const response = await highlightService.getById(id);
      if (response instanceof ResponseError) throw response;
      return response.data;
    } catch (error) {
      console.error('Error fetching highlight by id:', error);
      return null;
    }
  };

  const createHighlight = async (data: CreateHighlightRequest) => {
    try {
      const response = await highlightService.create(data);
      if (response instanceof ResponseError) throw response;
      return response;
    } catch (error) {
      console.error('Error creating highlight:', error);
      throw error;
    }
  };

  const updateHighlight = async (id: number, data: UpdateHighlightRequest) => {
    try {
      const response = await highlightService.update(id, data);
      if (response instanceof ResponseError) throw response;
      return response;
    } catch (error) {
      console.error('Error updating highlight:', error);
      throw error;
    }
  };

  const deleteHighlight = async (id: number) => {
    try {
      const response = await highlightService.delete(id);
      if (response instanceof ResponseError) return false;
      return true;
    } catch (error) {
      console.error('Error deleting highlight:', error);
      return false;
    }
  };

  return {
    highlights,
    loading,
    pagination,
    fetchPublicHighlights,
    fetchAdminHighlights,
    getHighlightById,
    createHighlight,
    updateHighlight,
    deleteHighlight,
  };
});
