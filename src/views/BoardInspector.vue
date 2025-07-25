<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
          <Button>
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Board Inspector</h1>
          </Button>
          <Button variant="secondary">

    <!-- Board Navigation -->
          </Button>
          <Button variant="outline" class="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-gray-600">
          </Button>
          <Button variant="outline" class="border-red-300 text-red-700 hover:bg-red-50">
          <div>
            <h2 class="text-2xl font-extrabold text-gray-900">BRD-4625</h2>
          </Button>
          <Button variant="outline" class="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <ChevronRight class="w-5 h-5" />
          </Button>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">1COMMON</span>
        </div>
      </div>

      <!-- Board Specifications -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div>
          <div class="text-sm text-gray-500">Length</div>
          <div class="font-semibold text-gray-900">8'3 3/4"</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Width</div>
          <div class="font-semibold text-gray-900">5 1/2"</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Thickness</div>
          <div class="font-semibold text-gray-900">15/16"</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Board Feet</div>
          <div class="font-semibold text-gray-900">4 bf</div>
        </div>
        <div>
          <div class="text-sm text-gray-500">Value</div>
          <div class="font-semibold text-emerald-600">$4.90</div>
        </div>
      </div>
    </div>

    <!-- Board Images and Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Face 1 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Face 1</h3>
        <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <div class="text-gray-500">Board Face 1 Image</div>
        </div>
        
        <!-- Defect Tags for Face 1 -->
        <div class="space-y-2">
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Knot</span>
            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Wane</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Stain</span>
          </div>
        </div>

        <!-- Clear Cutting Calculation -->
        <div class="mt-4">
          <h4 class="font-semibold text-gray-900 mb-2">Clear Cutting Calculation</h4>
          <div class="bg-gray-50 rounded-lg p-3">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-600">
                  <th class="pb-2">Width</th>
                  <th class="pb-2">Length</th>
                  <th class="pb-2">Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3"</td>
                  <td>24"</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>2"</td>
                  <td>18"</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
            <div class="mt-2 pt-2 border-t border-gray-200">
              <div class="font-medium">Total Units: 3</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Face 2 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Face 2</h3>
        <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <div class="text-gray-500">Board Face 2 Image</div>
        </div>
        
        <!-- Defect Tags for Face 2 -->
        <div class="space-y-2">
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Split</span>
            <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Wane</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Pitch Pocket</span>
            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Shake</span>
          </div>
        </div>

        <!-- Clear Cutting Calculation -->
        <div class="mt-4">
          <h4 class="font-semibold text-gray-900 mb-2">Clear Cutting Calculation</h4>
          <div class="bg-gray-50 rounded-lg p-3">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-600">
                  <th class="pb-2">Width</th>
                  <th class="pb-2">Length</th>
                  <th class="pb-2">Units</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>4"</td>
                  <td>30"</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>3"</td>
                  <td>20"</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
            <div class="mt-2 pt-2 border-t border-gray-200">
              <div class="font-medium">Total Units: 5</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inspector Tools -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Inspector Tools</h3>
      <div class="flex flex-wrap gap-4">
        <button class="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors">
          <ZoomIn class="w-4 h-4 mr-2" />
          Magnifier
        </button>
        <button class="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors">
          <EyeOff class="w-4 h-4 mr-2" />
          Hide Minor Defects
        </button>
        <button class="flex items-center px-4 py-2 bg-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-300 font-medium transition-colors">
          <CheckCircle class="w-4 h-4 mr-2" />
          Agree with NG AI
        </button>
        <button class="flex items-center px-4 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 font-medium transition-colors">
          <XCircle class="w-4 h-4 mr-2" />
          Disagree with NG AI
        </button>
        <button class="flex items-center px-4 py-2 bg-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-300 font-medium transition-colors">
          <AlertTriangle class="w-4 h-4 mr-2" />
          See Rejected Grades
        </button>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-between">
      <Button class="bg-purple-600 hover:bg-purple-700">
        <BookOpen class="w-4 h-4 mr-2" />
        Add to Reference Bundle
      </Button>
      <Button>
        Complete Full Inspection
      </Button>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronLeft, ChevronRight, ZoomIn, EyeOff, CheckCircle, XCircle,
  AlertTriangle, BookOpen
} from 'lucide-vue-next'
</script>