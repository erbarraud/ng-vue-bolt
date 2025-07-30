<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Table Header with Search and Filters -->
    <div v-if="showFilters" class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <BaseInput
              :model-value="searchQuery"
              @update:model-value="$emit('update:search-query', $event)"
              type="text"
              placeholder="Search..."
              class="pl-10 pr-3 py-2 w-80"
            />
          </div>
          <slot name="filters" />
          <BaseButton v-if="hasActiveFilters" variant="outline" @click="$emit('clear-filters')">
            <X class="w-4 h-4 mr-2" />
            Clear Filters
          </BaseButton>
        </div>
        <div class="text-sm text-gray-600">
          Showing {{ filteredCount }} of {{ totalCount }} results
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <slot name="rows" />
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="showPagination" class="px-6 py-4 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600">
          Showing {{ paginationStart }} to {{ paginationEnd }} of {{ filteredCount }} results
        </div>
        <div class="flex items-center space-x-2">
          <BaseButton
            variant="outline"
            size="sm"
            :disabled="currentPage === 1"
            @click="$emit('update:current-page', currentPage - 1)"
          >
            <ChevronLeft class="w-4 h-4" />
            Previous
          </BaseButton>
          <div class="flex items-center space-x-1">
            <BaseButton
              v-for="page in visiblePages"
              :key="page"
              :variant="page === currentPage ? 'default' : 'outline'"
              size="sm"
              class="w-8 h-8"
              @click="$emit('update:current-page', page)"
            >
              {{ page }}
            </BaseButton>
          </div>
          <BaseButton
            variant="outline"
            size="sm"
            :disabled="currentPage === totalPages"
            @click="$emit('update:current-page', currentPage + 1)"
          >
            Next
            <ChevronRight class="w-4 h-4" />
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

interface Column {
  key: string
  label: string
}

interface Props {
  columns: Column[]
  searchQuery?: string
  filteredCount: number
  totalCount: number
  hasActiveFilters?: boolean
  showFilters?: boolean
  showPagination?: boolean
  currentPage?: number
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  showFilters: true,
  showPagination: true,
  currentPage: 1,
  itemsPerPage: 10,
  hasActiveFilters: false
})

defineEmits<{
  'update:search-query': [value: string]
  'update:current-page': [page: number]
  'clear-filters': []
}>()

const totalPages = computed(() => Math.ceil(props.filteredCount / props.itemsPerPage))

const paginationStart = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)

const paginationEnd = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.filteredCount))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, props.currentPage - 2)
  const end = Math.min(totalPages.value, props.currentPage + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>