<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <h1 class="text-2xl font-semibold text-gray-900">Board Finder</h1>
      <p class="text-sm text-gray-600 mt-1">Find and analyze boards as they move through the scanning line</p>
    </div>

    <!-- Search and Filters -->
    <div class="px-6 py-4 bg-white border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search boards by ID, batch, or grade..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div class="flex items-center space-x-3 ml-4">
          <button class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter class="w-4 h-4 mr-2" />
            Filters
          </button>
          <button class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Grid3X3 class="w-4 h-4 mr-2" />
            Show 3
            <ChevronDown class="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>

    <!-- Timeline Navigator -->
    <div class="px-6 py-4 bg-white border-b border-gray-200">
      <button class="flex items-center justify-between w-full text-left">
        <span class="font-medium text-gray-900">Timeline Navigator</span>
        <ChevronDown class="w-5 h-5 text-gray-400" />
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex">
      <!-- Left Sidebar -->
      <div class="w-56 bg-white border-r border-gray-200 p-4">
        <div class="text-sm text-gray-600 mb-4">Showing 1-3 of 3 boards</div>
        
        <div class="space-y-2">
          <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
            <div class="font-medium text-sm">BRD-4625</div>
            <div class="text-xs text-gray-600">Batch: B-4873</div>
            <div class="text-xs text-blue-600 font-medium mt-1">1COMMON</div>
          </div>
          
          <div class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div class="font-medium text-sm">BRD-58920</div>
            <div class="text-xs text-gray-600">Batch: B-4873</div>
            <div class="text-xs text-blue-600 font-medium mt-1">1COMMON</div>
          </div>
          
          <div class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div class="font-medium text-sm">BRD-58919</div>
            <div class="text-xs text-gray-600">Batch: B-4873</div>
            <div class="text-xs text-blue-600 font-medium mt-1">1COMMON</div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-6 text-sm">
          <button class="text-gray-400 cursor-not-allowed">Previous</button>
          <span class="text-gray-600">Page 1 of 1</span>
          <button class="text-gray-400 cursor-not-allowed">Next</button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 p-6">
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <!-- Board Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Board BRD-4625</h2>
              <div class="text-sm text-blue-600 font-medium mt-1">1COMMON</div>
            </div>
          </div>

          <!-- Board Specifications -->
          <div class="grid grid-cols-6 gap-6 mb-6">
            <div>
              <div class="text-xs text-gray-500 mb-1">Length</div>
              <div class="font-medium">8' 3 3/4"</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Width</div>
              <div class="font-medium">5 1/2"</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Thickness</div>
              <div class="font-medium">15/16"</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Volume</div>
              <div class="font-medium">4 bf</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Value</div>
              <div class="font-medium">$4.90</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 mb-1">Total Defects</div>
              <div class="font-medium">2</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-4 mb-6">
            <button class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
              <EyeOff class="w-4 h-4 mr-2" />
              Hide filtered defects
            </button>
            <button class="flex items-center px-3 py-2 text-sm text-green-600 hover:text-green-700">
              <Check class="w-4 h-4 mr-2" />
              Agree with NG AI
            </button>
            <button class="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700">
              <X class="w-4 h-4 mr-2" />
              Disagree with NG AI
            </button>
            <button class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
              <FileText class="w-4 h-4 mr-2" />
              See Rejected Grades
            </button>
          </div>

          <!-- Board Faces -->
          <div class="space-y-6">
            <!-- Face 1 -->
            <div>
              <h3 class="font-medium text-gray-900 mb-3">Face 1</h3>
              <div class="bg-gray-100 rounded-lg p-4 mb-2">
                <div class="h-24 bg-gradient-to-r from-amber-100 to-amber-200 rounded border-2 border-amber-300 flex items-center justify-center">
                  <span class="text-xs text-gray-600">Board visualization</span>
                </div>
              </div>
              <div class="text-sm text-gray-600">Wane</div>
            </div>

            <!-- Face 2 -->
            <div>
              <h3 class="font-medium text-gray-900 mb-3">Face 2</h3>
              <div class="bg-gray-100 rounded-lg p-4 mb-2">
                <div class="h-24 bg-gradient-to-r from-amber-100 to-amber-200 rounded border-2 border-amber-300 flex items-center justify-center">
                  <span class="text-xs text-gray-600">Board visualization</span>
                </div>
              </div>
              <div class="text-sm text-gray-600">Wane</div>
            </div>
          </div>

          <!-- Clear Cuttings -->
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div>
              <h4 class="font-medium text-gray-900 mb-4">Clear Cuttings (Face 1)</h4>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">6' 2 3/4" × 5 3/8"</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">33.28 units</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">2' × 4 13/16"</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">9.64 units</span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-900">Total Units:</span>
                  <span class="font-medium text-green-600">43</span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 mb-4">Clear Cuttings (Face 2)</h4>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">3' 3 3/4" × 5 3/16"</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">17.2 units</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">3' 5 3/4" × 4 7/8"</span>
                  <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">16.83 units</span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-900">Total Units:</span>
                  <span class="font-medium text-green-600">34</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Full Inspection Button -->
          <div class="flex justify-end mt-8">
            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              Full Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Filter, Grid3X3, ChevronDown, EyeOff, Check, X, FileText } from 'lucide-vue-next'
</script>