<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-white mb-2">Live Scanning View</h1>
        <p class="text-gray-300 mt-1">Monitor boards as they pass through the scanning system</p>
      </div>

      <!-- Control Panel -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button class="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors">
              <Pause class="w-4 h-4 mr-2" />
              Pause
            </button>
            <button class="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors">
              <RefreshCw class="w-4 h-4 mr-2" />
              Refresh
            </button>
            <div class="flex items-center space-x-2">
              <span class="text-gray-300 text-sm">Refresh Rate:</span>
              <select class="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                <option>5/min</option>
                <option>10/min</option>
                <option>30/min</option>
              </select>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-sm text-gray-400">Current Time</div>
              <div class="text-lg font-semibold text-white">05:06:55 PM</div>
            </div>
            <button class="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors">
              <Maximize class="w-4 h-4 mr-2" />
              Full Screen
            </button>
          </div>
        </div>
      </div>

      <!-- Live Feed and Recent Boards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Live Feed -->
        <div class="lg:col-span-2">
          <div class="bg-gray-800 rounded-lg p-6">
            <h2 class="text-2xl font-bold text-white mb-4">Live Feed</h2>
            <div class="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
              <div class="text-center">
                <div class="text-gray-400 text-lg mb-2">Board Scanning in Progress</div>
                <div class="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </div>
            
            <!-- Scanning Stats Overlay -->
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="bg-gray-700 rounded-lg p-3">
                <div class="text-2xl font-bold text-emerald-400">1,247</div>
                <div class="text-sm text-gray-300">Boards Scanned</div>
              </div>
              <div class="bg-gray-700 rounded-lg p-3">
                <div class="text-2xl font-bold text-emerald-400">23</div>
                <div class="text-sm text-gray-300">Batches Today</div>
              </div>
              <div class="bg-gray-700 rounded-lg p-3">
                <div class="text-2xl font-bold text-emerald-400">98.7%</div>
                <div class="text-sm text-gray-300">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Boards -->
        <div>
          <div class="bg-gray-800 rounded-lg p-6">
            <h2 class="text-2xl font-bold text-white mb-4">Recent Boards</h2>
            
            <div class="space-y-4">
              <div class="bg-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <button class="text-emerald-400 hover:text-emerald-300 font-medium">LV-1001</button>
                  <span class="text-emerald-400 font-semibold">$12.50</span>
                </div>
                <div class="text-sm text-gray-300">
                  <div>Batch: B-789</div>
                  <div>Grade: FAS</div>
                  <div>Scanned: 05:05:23 PM</div>
                </div>
              </div>

              <div class="bg-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <button class="text-emerald-400 hover:text-emerald-300 font-medium">LV-1002</button>
                  <span class="text-emerald-400 font-semibold">$18.75</span>
                </div>
                <div class="text-sm text-gray-300">
                  <div>Batch: B-790</div>
                  <div>Grade: 1 Common</div>
                  <div>Scanned: 05:06:01 PM</div>
                </div>
              </div>

              <div class="bg-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <button class="text-emerald-400 hover:text-emerald-300 font-medium">LV-1003</button>
                  <span class="text-emerald-400 font-semibold">$9.25</span>
                </div>
                <div class="text-sm text-gray-300">
                  <div>Batch: B-791</div>
                  <div>Grade: 2 Common</div>
                  <div>Scanned: 05:06:45 PM</div>
                </div>
              </div>

              <div class="bg-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <button class="text-emerald-400 hover:text-emerald-300 font-medium">LV-1004</button>
                  <span class="text-emerald-400 font-semibold">$22.00</span>
                </div>
                <div class="text-sm text-gray-300">
                  <div>Batch: B-792</div>
                  <div>Grade: FAS</div>
                  <div>Scanned: 05:06:50 PM</div>
                </div>
              </div>
            </div>

            <button class="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors">
              View All Recent Boards
            </button>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 class="text-2xl font-bold text-white mb-4">System Status</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="flex items-center justify-center mb-2">
              <div class="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
              <span class="text-white font-medium">Scanner Online</span>
            </div>
            <div class="text-sm text-gray-300">All systems operational</div>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center mb-2">
              <div class="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
              <span class="text-white font-medium">Camera Feed</span>
            </div>
            <div class="text-sm text-gray-300">1080p @ 30fps</div>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center mb-2">
              <div class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span class="text-white font-medium">Processing Load</span>
            </div>
            <div class="text-sm text-gray-300">75% CPU usage</div>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center mb-2">
              <div class="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
              <span class="text-white font-medium">Network</span>
            </div>
            <div class="text-sm text-gray-300">Stable connection</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pause, RefreshCw, Maximize } from 'lucide-vue-next'
</script>