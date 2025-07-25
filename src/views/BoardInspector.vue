<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Green</h1>
        <p class="text-gray-600">Find and analyze boards in the system</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-right">
          <div class="text-sm text-gray-600">Order: B-4873 - Red Oak 4/4 Premium</div>
        </div>
        <Button variant="outline">
          <List class="w-4 h-4 mr-2" />
          View All Boards in This Order
        </Button>
      </div>
    </div>

    <!-- Board Navigation and Info -->
    <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <div class="flex items-center space-x-3">
            <h2 class="text-2xl font-extrabold text-gray-900">BRD-4625</h2>
            <span class="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded">1COMMON</span>
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <TreePine class="w-4 h-4" />
              <span>Red Oak</span>
              <Droplets class="w-4 h-4 ml-2" />
              <span>Kiln Dried</span>
            </div>
          </div>
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-gray-900">Value</div>
          <div class="text-2xl font-bold text-emerald-600">$4.90</div>
        </div>
      </div>

      <!-- Timestamp -->
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <Clock class="w-4 h-4 mr-1" />
        03/18/2025 3:58 PM
      </div>

      <!-- Board Specifications -->
      <div class="grid grid-cols-7 gap-6 mb-8">
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <Ruler class="w-5 h-5 text-amber-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Length</span>
            </div>
            <div class="text-lg font-bold text-gray-900">8' 3 3/4"</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <ArrowLeftRight class="w-5 h-5 text-blue-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Width</span>
            </div>
            <div class="text-lg font-bold text-gray-900">5 1/2"</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <Layers class="w-5 h-5 text-purple-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Thickness</span>
            </div>
            <div class="text-lg font-bold text-gray-900">15/16"</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <Box class="w-5 h-5 text-green-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Volume</span>
            </div>
            <div class="text-lg font-bold text-gray-900">4 bf</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <DollarSign class="w-5 h-5 text-emerald-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Value</span>
            </div>
            <div class="text-lg font-bold text-emerald-600">$4.90</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <AlertTriangle class="w-5 h-5 text-red-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Total Defects</span>
            </div>
            <div class="text-lg font-bold text-red-600">2</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <TrendingUp class="w-5 h-5 text-indigo-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Yield</span>
            </div>
            <div class="text-lg font-bold text-gray-900">N/A</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inspector Tools -->
    <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6 mb-6">
      <div class="flex items-center gap-3 mb-8">
        <Button variant="secondary" size="sm" class="bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200">
          <Filter class="w-4 h-4 mr-2" />
          Hide filtered defects
        </Button>
        <Button variant="outline" size="sm" class="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
          <CheckCircle class="w-4 h-4 mr-2" />
          Agree with NG AI
        </Button>
        <Button variant="outline" size="sm" class="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
          <XCircle class="w-4 h-4 mr-2" />
          Disagree with NG AI
        </Button>
        <Button variant="outline" size="sm" class="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200">
          <FileText class="w-4 h-4 mr-2" />
          See Rejected Grades
        </Button>
      </div>
    </div>

    <!-- Board Images and Analysis -->
    <div class="space-y-6 mb-6">
      <!-- Face 1 -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Face 1</h3>
        <div class="h-48 rounded-lg border border-gray-300 mb-4 overflow-hidden bg-gray-50 relative">
          <img src="/image.png" alt="Board Face 1 - Lumber scan showing defects" class="w-full h-full object-contain" />
          
          <!-- Defect Overlay Areas -->
          <div v-if="isDefectVisible('face1', 'Wane')" class="absolute bottom-4 left-4 w-16 h-6 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform -skew-x-12"></div>
        </div>
        
        <div class="text-sm font-medium text-gray-900">Wane</div>
      </div>

      <!-- Face 2 -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Face 2</h3>
        <div class="h-48 rounded-lg border border-gray-300 mb-4 overflow-hidden bg-gray-50 relative">
          <img src="/image.png" alt="Board Face 2 - Lumber scan showing defects" class="w-full h-full object-contain" />
          
          <!-- Defect Overlay Areas -->
          <div v-if="isDefectVisible('face2', 'Wane')" class="absolute bottom-3 right-4 w-10 h-8 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform skew-y-12"></div>
        </div>
        
        <div class="text-sm font-medium text-gray-900">Wane</div>
      </div>
    </div>

    <!-- Clear Cuttings Analysis -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <!-- Face 1 Clear Cuttings -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-6">Clear Cuttings (Face 1)</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-900">6' 2 3/4" × 5 3/8"</span>
            <span class="font-semibold text-gray-900">33.28 units</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-900">2' × 4 13/16"</span>
            <span class="font-semibold text-gray-900">9.64 units</span>
          </div>
          <div class="border-t border-gray-200 pt-4 mt-6">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900">Total Units:</span>
              <span class="text-2xl font-bold text-emerald-600">43</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Face 2 Clear Cuttings -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-6">Clear Cuttings (Face 2)</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-900">3' 3 3/4" × 5 3/16"</span>
            <span class="font-semibold text-gray-900">17.2 units</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-900">3' 5 3/4" × 4 7/8"</span>
            <span class="font-semibold text-gray-900">16.83 units</span>
          </div>
          <div class="border-t border-gray-200 pt-4 mt-6">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900">Total Units:</span>
              <span class="text-2xl font-bold text-emerald-600">34</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ChevronLeft, ChevronRight, Clock, Ruler, Layers, TreePine, Droplets, List,
  ArrowLeftRight, Box, DollarSign, AlertTriangle, TrendingUp, Filter, CheckCircle, XCircle, FileText
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

// Defect visibility state
const defectVisibility = ref({
  face1: {
    'Wane': true
  },
  face2: {
    'Wane': true
  }
})

// Check if defect is visible
const isDefectVisible = (face, defectName) => {
  return defectVisibility.value[face][defectName]
}
</script>