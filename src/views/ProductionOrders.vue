<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900">Production Orders</h1>
      <router-link
        to="/orders/create"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 flex items-center"
      >
        <Plus class="w-4 h-4 mr-2" />
        Schedule New Order
      </router-link>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6">
      <nav class="flex space-x-8">
        <button
          @click="activeTab = 'current'"
          :class="[
            activeTab === 'current'
              ? 'border-b-2 border-emerald-500 text-emerald-600'
              : 'text-gray-500 hover:text-gray-700',
            'pb-2 text-sm font-semibold'
          ]"
        >
          Current Orders (3)
        </button>
        <button
          @click="activeTab = 'past'"
          :class="[
            activeTab === 'past'
              ? 'border-b-2 border-emerald-500 text-emerald-600'
              : 'text-gray-500 hover:text-gray-700',
            'pb-2 text-sm font-semibold'
          ]"
        >
          Past Orders (2)
        </button>
      </nav>
    </div>

    <!-- Current Orders Tab -->
    <div v-if="activeTab === 'current'">
      <!-- Running Order -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-emerald-600 mb-6">
          Running Order
        </h2>
        
        <div class="bg-white border-2 border-emerald-300 rounded-xl p-8 shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 flex items-center mb-2">
                <Zap class="w-5 h-5 text-emerald-600 mr-2" />
                Red Oak - Prime Run
              </h3>
              <div class="text-sm text-gray-500">
                ID: ORD-20250701-001 | Customer: Johnson Lumber Co.
              </div>
            </div>
            <div class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 border">
              Running
            </div>
          </div>

          <div class="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div class="flex items-center mb-2">
                <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-sm text-gray-600">Species</span>
              </div>
              <div class="text-base font-medium text-gray-900">Red Oak (KD)</div>
            </div>
            <div>
              <div class="flex items-center mb-2">
                <Clock class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-sm text-gray-600">Scheduled Start</span>
              </div>
              <div class="text-base font-medium text-gray-900">Jul 1, 8:00 AM</div>
            </div>
            <div>
              <div class="flex items-center mb-2">
                <User class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-sm text-gray-600">Operator</span>
              </div>
              <div class="text-base font-medium text-gray-900">John Doe</div>
            </div>
          </div>

          <div class="text-sm text-gray-600 mb-4">Key Performance Indicators:</div>
          <div class="grid grid-cols-4 gap-6">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 class="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div class="text-sm text-gray-600">Boards Scanned</div>
                <div class="text-xl font-bold text-gray-900">125</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <Package class="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div class="text-sm text-gray-600">Bundles Created</div>
                <div class="text-xl font-bold text-gray-900">4</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <Clock class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div class="text-sm text-gray-600">Time Elapsed</div>
                <div class="text-xl font-bold text-gray-900">1h 02m</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <Timer class="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div class="text-sm text-gray-600">Time Remaining (Est.)</div>
                <div class="text-xl font-bold text-gray-900">1h 58m</div>
              </div>
            </div>
          </div>

          <!-- Stop & Complete Button -->
          <div class="flex justify-end mt-8">
            <button class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors border">
              <Power class="w-4 h-4 mr-2" />
              Stop & Complete
            </button>
          </div>
        </div>
      </div>

      <!-- Upcoming Orders -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Upcoming Orders (2)</h2>
        
        <div class="space-y-4">
          <!-- Soft Maple Order -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xl font-bold text-gray-900 flex items-center">
                    <Menu class="w-4 h-4 text-gray-400 mr-3" />
                    Soft Maple - Special Order
                  </h3>
                  <div class="flex items-center space-x-2">
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium border">Scheduled</span>
                    <button class="text-gray-400 hover:text-gray-600">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                      <Play class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="text-sm text-gray-500 mb-3">
                  ID: ORD-20250701-002 | Customer: Artisan Furniture
                </div>
                <div class="flex items-center space-x-8 text-sm">
                  <div class="flex items-center">
                    <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                    Jul 1, 1:00 PM
                  </div>
                  <div class="flex items-center">
                    <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                    Soft Maple
                  </div>
                  <div class="flex items-center">
                    <Droplets class="w-4 h-4 text-gray-400 mr-2" />
                    Green
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- White Oak Order -->
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xl font-bold text-gray-900 flex items-center">
                    <Menu class="w-4 h-4 text-gray-400 mr-3" />
                    White Oak - Flooring
                  </h3>
                  <div class="flex items-center space-x-2">
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium border">Scheduled</span>
                    <button class="text-gray-400 hover:text-gray-600">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                      <Edit class="w-4 h-4" />
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                      <Play class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="text-sm text-gray-500 mb-3">
                  ID: ORD-20250702-003 | Customer: Flooring Inc.
                </div>
                <div class="flex items-center space-x-8 text-sm">
                  <div class="flex items-center">
                    <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                    Jul 2, 9:00 AM
                  </div>
                  <div class="flex items-center">
                    <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                    White Oak
                  </div>
                  <div class="flex items-center">
                    <Droplets class="w-4 h-4 text-gray-400 mr-2" />
                    KD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Past Orders Tab -->
    <div v-if="activeTab === 'past'">
      <!-- Search and Filters -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, Name, Customer..."
              class="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option>All Species</option>
            <option>Red Oak</option>
            <option>White Oak</option>
            <option>Cherry</option>
            <option>Hard Maple</option>
          </select>
        </div>
        <button class="text-sm text-emerald-600 hover:text-emerald-800 font-medium">Clear Filters</button>
      </div>

      <!-- Past Orders List -->
      <div class="space-y-4">
        <!-- Cancelled Order -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-900">Cherry - Test Run</h3>
                <div class="flex items-center space-x-2">
                  <span class="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">Cancelled</span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <Eye class="w-4 h-4" />
                  </button>
                  <button class="text-gray-400 hover:text-gray-600">
                    <RotateCcw class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="text-sm text-gray-600 mb-3">
                ID: ORD-20250629-001
              </div>
              <div class="flex items-center space-x-8 text-sm text-gray-500">
                <div class="flex items-center">
                  <Calendar class="w-4 h-4 mr-2" />
                  Jun 29
                </div>
                <div class="flex items-center">
                  <Package class="w-4 h-4 mr-2" />
                  Cherry
                </div>
                <div class="flex items-center">
                  <Hash class="w-4 h-4 mr-2" />
                  1 sort
                </div>
                <div class="flex items-center">
                  <AlertCircle class="w-4 h-4 mr-2" />
                  N/A
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Completed Order -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-900">Mixed Hardwoods - Stock</h3>
                <div class="flex items-center space-x-2">
                  <span class="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">Completed</span>
                  <button class="text-gray-400 hover:text-gray-600">
                    <Eye class="w-4 h-4" />
                  </button>
                  <button class="text-gray-400 hover:text-gray-600">
                    <RotateCcw class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="text-sm text-gray-600 mb-3">
                ID: ORD-20250628-001
              </div>
              <div class="flex items-center space-x-8 text-sm text-gray-500">
                <div class="flex items-center">
                  <Calendar class="w-4 h-4 mr-2" />
                  Jun 28
                </div>
                <div class="flex items-center">
                  <Package class="w-4 h-4 mr-2" />
                  Hard Maple, Be...
                </div>
                <div class="flex items-center">
                  <Hash class="w-4 h-4 mr-2" />
                  5 sorts
                </div>
                <div class="flex items-center">
                  <AlertCircle class="w-4 h-4 mr-2" />
                  N/A
                </div>
              </div>
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
  Plus, Zap, TreePine, Clock, User, Power, BarChart3, Timer, Menu, Edit, Play,
  Calendar, Droplets, Search, Eye, RotateCcw, Hash, AlertCircle
} from 'lucide-vue-next'

const activeTab = ref('current')
</script>