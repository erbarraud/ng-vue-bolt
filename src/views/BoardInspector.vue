<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">greant</h1>
        <p class="text-gray-600">Find and analyze boards in the system</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-right">
          <div class="text-sm text-gray-600">Order: B-4873 - Red Oak 4/4 Premium</div>
        </div>
        <button class="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
          <List class="w-4 h-4 mr-2" />
          View All Boards in This Order
        </button>
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
          <div v-if="isDefectVisible('face1', 'Knot')" class="absolute top-4 left-8 w-8 h-8 bg-red-500 bg-opacity-70 rounded-full border-2 border-red-600"></div>
          <div v-if="isDefectVisible('face1', 'Split')" class="absolute top-8 right-12 w-12 h-3 bg-orange-500 bg-opacity-70 border border-orange-600"></div>
          <div v-if="isDefectVisible('face1', 'Wane')" class="absolute bottom-4 left-4 w-16 h-6 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform -skew-x-12"></div>
          <div v-if="isDefectVisible('face1', 'Stain')" class="absolute top-12 left-20 w-14 h-10 bg-purple-500 bg-opacity-60 rounded-lg border border-purple-600"></div>
          <div v-if="isDefectVisible('face1', 'Pitch Pocket')" class="absolute bottom-8 right-8 w-6 h-8 bg-blue-500 bg-opacity-70 rounded border border-blue-600"></div>
          <div v-if="isDefectVisible('face1', 'Shake')" class="absolute top-16 right-6 w-2 h-12 bg-gray-600 bg-opacity-80 border border-gray-700"></div>
        </div>
        
        <!-- Defect Tags -->
        <div class="flex flex-wrap gap-2 text-xs mb-4">
          <button
            v-for="defect in defectTypes"
            :key="defect.name"
            @click="toggleDefect('face1', defect.name)"
            :class="[
              'px-3 py-1 rounded-full font-medium transition-all duration-200',
              isDefectVisible('face1', defect.name) 
                ? defect.activeClass 
                : 'bg-gray-200 text-gray-500'
            ]"
          >
            {{ defect.name }}
          </button>
        </div>
      </div>

      <!-- Face 2 -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Face 2</h3>
        <div class="h-48 rounded-lg border border-gray-300 mb-4 overflow-hidden bg-gray-50 relative">
          <img src="/image.png" alt="Board Face 2 - Lumber scan showing defects" class="w-full h-full object-contain" />
          
          <!-- Defect Overlay Areas -->
          <div v-if="isDefectVisible('face2', 'Knot')" class="absolute top-6 right-10 w-7 h-7 bg-red-500 bg-opacity-70 rounded-full border-2 border-red-600"></div>
          <div v-if="isDefectVisible('face2', 'Check')" class="absolute bottom-6 left-8 w-14 h-2 bg-orange-500 bg-opacity-70 border border-orange-600"></div>
          <div v-if="isDefectVisible('face2', 'Wane')" class="absolute bottom-3 right-4 w-10 h-8 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform skew-y-12"></div>
          <div v-if="isDefectVisible('face2', 'Decay')" class="absolute top-8 left-12 w-16 h-8 bg-purple-500 bg-opacity-60 rounded border border-purple-600"></div>
          <div v-if="isDefectVisible('face2', 'Hole')" class="absolute top-12 right-16 w-4 h-6 bg-blue-500 bg-opacity-70 rounded border border-blue-600"></div>
        </div>
        
        <!-- Defect Tags -->
        <div class="flex flex-wrap gap-2 text-xs mb-4">
          <button
            v-for="defect in face2DefectTypes"
            :key="defect.name"
            @click="toggleDefect('face2', defect.name)"
            :class="[
              'px-3 py-1 rounded-full font-medium transition-all duration-200',
              isDefectVisible('face2', defect.name) 
                ? defect.activeClass 
                : 'bg-gray-200 text-gray-500'
            ]"
          >
            {{ defect.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Clear Cuttings Analysis -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
      <!-- Face 1 Clear Cuttings -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h4 class="font-semibold text-gray-900 mb-4">Clear Cuttings (Face 1)</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-900">6' 2 3/4" × 5 3/8"</span>
            <span class="font-semibold text-gray-900">33.28 units</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-900">2' × 4 13/16"</span>
            <span class="font-semibold text-gray-900">9.64 units</span>
          </div>
          <div class="border-t border-gray-200 pt-3">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900">Total Units:</span>
              <span class="text-2xl font-bold text-gray-900">43</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Face 2 Clear Cuttings -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-lg shadow p-6">
        <h4 class="font-semibold text-gray-900 mb-4">Clear Cuttings (Face 2)</h4>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-900">3' 3 3/4" × 5 3/16"</span>
            <span class="font-semibold text-gray-900">17.2 units</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-900">3' 5 3/4" × 4 7/8"</span>
            <span class="font-semibold text-gray-900">16.83 units</span>
          </div>
          <div class="border-t border-gray-200 pt-3">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-gray-900">Total Units:</span>
              <span class="text-2xl font-bold text-gray-900">34</span>
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
  ChevronLeft, ChevronRight, Clock, Ruler, Layers, Package, AlertCircle, TrendingUp,
  Filter, CheckCircle, XCircle, FileText, TreePine, Droplets, List,
  ArrowLeftRight, Box, DollarSign, AlertTriangle
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

// Defect visibility state
const defectVisibility = ref({
  face1: {
    'Knot': true,
    'Split': true,
    'Wane': true,
    'Stain': true,
    'Pitch Pocket': true,
    'Shake': true
  },
  face2: {
    'Knot': true,
    'Check': true,
    'Wane': true,
    'Decay': true,
    'Hole': true
  }
})

// Defect types for Face 1
const defectTypes = ref([
  { name: 'Knot', activeClass: 'bg-red-100 text-red-800' },
  { name: 'Split', activeClass: 'bg-orange-100 text-orange-800' },
  { name: 'Wane', activeClass: 'bg-yellow-100 text-yellow-800' },
  { name: 'Stain', activeClass: 'bg-purple-100 text-purple-800' },
  { name: 'Pitch Pocket', activeClass: 'bg-blue-100 text-blue-800' },
  { name: 'Shake', activeClass: 'bg-gray-100 text-gray-800' }
])

// Defect types for Face 2
const face2DefectTypes = ref([
  { name: 'Knot', activeClass: 'bg-red-100 text-red-800' },
  { name: 'Check', activeClass: 'bg-orange-100 text-orange-800' },
  { name: 'Wane', activeClass: 'bg-yellow-100 text-yellow-800' },
  { name: 'Decay', activeClass: 'bg-purple-100 text-purple-800' },
  { name: 'Hole', activeClass: 'bg-blue-100 text-blue-800' }
])

// Toggle defect visibility
const toggleDefect = (face, defectName) => {
  defectVisibility.value[face][defectName] = !defectVisibility.value[face][defectName]
}

// Check if defect is visible
const isDefectVisible = (face, defectName) => {
  return defectVisibility.value[face][defectName]
}
</script>