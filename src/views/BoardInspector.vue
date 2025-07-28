<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-1">Board Inspector</h1>
        <p class="text-gray-600">Find and analyze boards in the system</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-right">
          <div class="text-sm text-gray-600">Order: B-4873 - Red Oak 4/4 Premium</div>
        </div>
        <Button variant="outline" class="flex items-center">
          <List class="w-4 h-4 mr-2" />
          View All Boards in This Order
        </Button>
      </div>
    </div>

    <!-- Board Navigation Card -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft class="w-5 h-5" />
          </button>
          <div class="flex items-center space-x-3">
            <h2 class="text-2xl font-bold text-gray-900">BRD-4625</h2>
            <span class="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">1COMMON</span>
            <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <div class="flex items-center">
              <TreePine class="w-4 h-4 mr-1" />
              <span>Red Oak</span>
            </div>
            <div class="flex items-center">
              <Droplets class="w-4 h-4 mr-1" />
              <span>Kiln Dried</span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-600">Value</div>
          <div class="text-2xl font-bold text-gray-900">$4.90</div>
        </div>
      </div>

      <!-- Timestamp -->
      <div class="flex items-center text-sm text-gray-500 mb-6">
        <Clock class="w-4 h-4 mr-1" />
        03/18/2025 3:58 PM
      </div>

      <!-- Board Specifications -->
      <div class="grid grid-cols-6 gap-6 mb-8">
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
              <AlertTriangle class="w-5 h-5 text-red-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Total Defects</span>
            </div>
            <div class="text-lg font-bold text-gray-900">2</div>
          </div>
        </div>
        <div class="text-center">
          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div class="flex items-center justify-center mb-2">
              <TrendingUp class="w-5 h-5 text-indigo-600 mr-1" />
              <span class="text-sm font-medium text-gray-700">Yield</span>
            </div>
            <div class="text-lg font-bold text-gray-900">85%</div>
          </div>
        </div>
      </div>

      <!-- Inspector Tools -->
      <div class="flex flex-wrap gap-3 mb-6">
        <button
          @click="toggleMagnifier"
          :class="[
            'flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            magnifierEnabled 
              ? 'text-emerald-600 bg-emerald-100 border-emerald-300' 
              : 'text-gray-600 bg-white border-2 border-gray-300'
          ]"
        >
          <ZoomIn class="w-4 h-4 mr-2" />
          {{ magnifierEnabled ? 'Disable Magnifier' : 'Enable Magnifier' }}
        </button>
        <button class="flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          <EyeOff class="w-4 h-4 mr-2" />
          Hide Defects
        </button>