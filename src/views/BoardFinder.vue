<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Board Finder</h1>
      <p class="text-gray-600 mt-1">Search and locate specific boards in the system</p>
    </div>

    <!-- Search Section -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <div class="flex items-center space-x-4 mb-4">
        <div class="relative flex-1">
          <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Board ID, Batch, or Customer..."
            class="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          Search
        </button>
      </div>
      
      <!-- Filters -->
      <div class="flex items-center space-x-4">
        <select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
          <option>All Species</option>
          <option>Red Oak</option>
          <option>White Oak</option>
          <option>Cherry</option>
          <option>Maple</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
          <option>All Grades</option>
          <option>FAS</option>
          <option>1 Common</option>
          <option>2 Common</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
          <option>All Batches</option>
          <option>B-4873</option>
          <option>B-4872</option>
          <option>B-4871</option>
        </select>
      </div>
    </div>

    <!-- Board Results -->
    <div class="space-y-6">
      <!-- Board 1 -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-900">BRD-4625</h3>
              <p class="text-sm text-gray-600">Batch B-4873 • Red Oak • 1 Common</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-emerald-600">$4.90</div>
              <div class="text-sm text-gray-500">4 bf</div>
            </div>
          </div>
        </div>
        
        <!-- Full Width Images -->
        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- Face 1 - Full Width -->
          <div class="relative">
            <img 
              src="/image.png" 
              alt="Board Face 1" 
              class="w-full h-64 object-cover"
            />
            <div class="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium">
              Face 1
            </div>
            <!-- Defect overlays -->
            <div class="absolute top-8 left-12 w-6 h-6 bg-red-500 bg-opacity-70 rounded-full border-2 border-red-600"></div>
            <div class="absolute bottom-12 right-8 w-12 h-4 bg-yellow-500 bg-opacity-70 border border-yellow-600"></div>
          </div>
          
          <!-- Face 2 - Full Width -->
          <div class="relative">
            <img 
              src="/image.png" 
              alt="Board Face 2" 
              class="w-full h-64 object-cover"
            />
            <div class="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium">
              Face 2
            </div>
            <!-- Defect overlays -->
            <div class="absolute top-12 right-16 w-8 h-8 bg-red-500 bg-opacity-70 rounded-full border-2 border-red-600"></div>
            <div class="absolute bottom-8 left-10 w-10 h-6 bg-orange-500 bg-opacity-70 border border-orange-600"></div>
          </div>
        </div>
        
        <!-- Board Details -->
        <div class="px-6 py-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Length:</span>
              <span class="ml-2 font-medium">8' 3¾"</span>
            </div>
            <div>
              <span class="text-gray-500">Width:</span>
              <span class="ml-2 font-medium">5½"</span>
            </div>
            <div>
              <span class="text-gray-500">Thickness:</span>
              <span class="ml-2 font-medium">15/16"</span>
            </div>
            <div>
              <span class="text-gray-500">Scanned:</span>
              <span class="ml-2 font-medium">3:58 PM</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Knot</span>
              <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Wane</span>
              <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Split</span>
            </div>
            <button class="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View Full Inspection
            </button>
          </div>
        </div>
      </div>

      <!-- Board 2 -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-900">BRD-4624</h3>
              <p class="text-sm text-gray-600">Batch B-4873 • Red Oak • FAS</p>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-emerald-600">$8.25</div>
              <div class="text-sm text-gray-500">6.2 bf</div>
            </div>
          </div>
        </div>
        
        <!-- Full Width Images -->
        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- Face 1 - Full Width -->
          <div class="relative">
            <img 
              src="/image.png" 
              alt="Board Face 1" 
              class="w-full h-64 object-cover"
            />
            <div class="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium">
              Face 1
            </div>
            <!-- Minimal defects for FAS grade -->
            <div class="absolute top-16 right-12 w-4 h-4 bg-purple-500 bg-opacity-60 rounded border border-purple-600"></div>
          </div>
          
          <!-- Face 2 - Full Width -->
          <div class="relative">
            <img 
              src="/image.png" 
              alt="Board Face 2" 
              class="w-full h-64 object-cover"
            />
            <div class="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium">
              Face 2
            </div>
            <!-- Clean face for FAS grade -->
          </div>
        </div>
        
        <!-- Board Details -->
        <div class="px-6 py-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Length:</span>
              <span class="ml-2 font-medium">10' 2"</span>
            </div>
            <div>
              <span class="text-gray-500">Width:</span>
              <span class="ml-2 font-medium">7¼"</span>
            </div>
            <div>
              <span class="text-gray-500">Thickness:</span>
              <span class="ml-2 font-medium">15/16"</span>
            </div>
            <div>
              <span class="text-gray-500">Scanned:</span>
              <span class="ml-2 font-medium">3:57 PM</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between mt-4">
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Minor Stain</span>
            </div>
            <button class="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View Full Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'
</script>