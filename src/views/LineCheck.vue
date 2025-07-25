<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Line Check</h1>
          <p class="text-gray-600 mt-1">Monitor camera feeds and equipment status in real-time</p>
        </div>
        
        <!-- Tab Navigation -->
        <div class="flex items-center space-x-2">
          <button
            @click="activeTab = 'live'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'live'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            <Activity class="w-4 h-4 mr-2 inline" />
            Live View
          </button>
          <button
            @click="activeTab = 'scanner'"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === 'scanner'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            <Camera class="w-4 h-4 mr-2 inline" />
            Scanner
          </button>
        </div>
      </div>

      <!-- Live Scanning View Tab -->
      <div v-if="activeTab === 'live'">
        <!-- Live Scanning Header -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Live Scanning View</h2>
          <p class="text-gray-600">Real-time feed from scanner</p>
        </div>

        <!-- Control Bar -->
        <div class="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow border">
          <div class="flex items-center space-x-4">
            <div class="flex items-center text-gray-600">
              <Clock class="w-4 h-4 mr-2" />
              <span class="text-gray-900 font-medium">05:06:55 PM</span>
            </div>
            <select class="bg-white text-gray-900 px-3 py-1 rounded text-sm border border-gray-300">
              <option>5/min</option>
              <option>10/min</option>
              <option>30/min</option>
            </select>
          </div>
          <div class="flex items-center space-x-3">
            <button class="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Pause class="w-4 h-4 mr-2" />
              Pause
            </button>
            <button class="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw class="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button class="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Maximize class="w-4 h-4 mr-2" />
              Full Screen
            </button>
          </div>
        </div>

        <!-- Recent Boards Section -->
        <div class="mb-6">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Recent Boards</h3>
          
          <div class="space-y-4">
            <!-- Board 1 -->
            <div class="bg-white rounded-lg overflow-hidden shadow border">
              <div class="relative">
                <!-- Board Image with overlays -->
                <div class="bg-gray-100 h-32 flex items-center justify-center relative">
                  <img src="/image.png" alt="Board scan" class="w-full h-full object-cover" />
                  
                  <!-- Defect overlays -->
                  <div class="absolute top-4 left-8 w-12 h-6 border-2 border-red-500 bg-red-500 bg-opacity-30"></div>
                  <div class="absolute bottom-6 right-12 w-8 h-8 border-2 border-blue-500 bg-blue-500 bg-opacity-30 rounded-full"></div>
                </div>
                
                <!-- Board Info Overlay -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="text-white font-bold text-lg"># LV-1001</div>
                      <div class="flex items-center text-gray-200 text-sm">
                        <Hash class="w-3 h-3 mr-1" />
                        B-789
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="px-2 py-1 bg-gray-600 text-white text-sm rounded">Select</span>
                      <div class="text-emerald-400 font-bold">$12.50</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Board 2 -->
            <div class="bg-white rounded-lg overflow-hidden shadow border">
              <div class="relative">
                <!-- Board Image with overlays -->
                <div class="bg-gray-100 h-32 flex items-center justify-center relative">
                  <img src="/image.png" alt="Board scan" class="w-full h-full object-cover" />
                  
                  <!-- Defect overlays -->
                  <div class="absolute top-6 left-12 w-10 h-4 border-2 border-red-500 bg-red-500 bg-opacity-30"></div>
                  <div class="absolute bottom-4 right-8 w-6 h-10 border-2 border-blue-500 bg-blue-500 bg-opacity-30"></div>
                </div>
                
                <!-- Board Info Overlay -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="text-white font-bold text-lg"># LV-1002</div>
                      <div class="flex items-center text-gray-200 text-sm">
                        <Hash class="w-3 h-3 mr-1" />
                        B-790
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="px-2 py-1 bg-yellow-600 text-white text-sm rounded">Common</span>
                      <div class="text-emerald-400 font-bold">$18.75</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Note -->
        <div class="flex items-center text-gray-600 text-sm">
          <Info class="w-4 h-4 mr-2" />
          Live feed with board images (original aspect ratio). KPIs are overlaid. Click Board ID for details.
        </div>
      </div>

      <!-- Camera/Hardware View Tab -->
      <div v-if="activeTab === 'scanner'">
        <!-- Equipment Status -->
        <div class="bg-white rounded-lg p-6 mb-8 shadow border">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Equipment Status</h2>
          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-3">
              <span class="text-gray-700">Scanner</span>
              <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                <span class="sr-only">Toggle scanner</span>
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-gray-700">Air</span>
              <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                <span class="sr-only">Toggle air</span>
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-gray-700">Lights</span>
              <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
                <span class="sr-only">Toggle lights</span>
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Batch Information -->
        <div class="bg-white rounded-lg p-6 mb-8 shadow border">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Current Batch</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div class="text-gray-600 text-sm">Batch ID</div>
              <div class="text-xl font-semibold text-gray-900">B-4873</div>
            </div>
            <div>
              <div class="text-gray-600 text-sm">Species</div>
              <div class="text-xl font-semibold text-gray-900">Douglas Fir</div>
            </div>
            <div>
              <div class="text-gray-600 text-sm">Scheduled</div>
              <div class="text-xl font-semibold text-gray-900">8:30 AM</div>
            </div>
            <div>
              <div class="text-gray-600 text-sm">Volume Processed</div>
              <div class="text-xl font-semibold text-gray-900">28.3 m³</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-gray-600 text-sm">System Uptime</div>
            <div class="text-xl font-semibold text-emerald-400">97%</div>
          </div>
        </div>

        <!-- Camera Feeds -->
        <div class="space-y-8">
          <!-- Line Check Row 1 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Line Check Row 1 (5 cameras)</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Entry Camera -->
              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Entry</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Live Feed</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-emerald-600 text-xs text-white rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>

              <!-- Scanner Camera -->
              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Scanner</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Connected</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-900 rounded flex items-center justify-center mb-3">
                  <div class="text-emerald-400 text-sm">Scanner Active</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-emerald-600 text-xs text-white rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>

              <!-- Additional cameras (3 more) -->
              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Camera 3</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Warning</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Feed Loading</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Camera 4</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Live Feed</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Camera 5</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Live Feed</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Line Check Row 2 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Line Check Row 2 (3 cameras)</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Quality Check</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Active</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Inspection Feed</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Exit</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Output Feed</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg p-4 shadow border">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-medium text-gray-900">Sorting</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Operational</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                  <div class="text-gray-600 text-sm">Sort Monitor</div>
                </div>
                <div class="flex items-center justify-between">
                  <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                  <div class="flex items-center space-x-2">
                    <button class="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Live View</button>
                    <button class="px-2 py-1 bg-gray-200 text-xs text-gray-700 rounded">Scanner</button>
                  </div>
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
  Activity, Camera, Clock, Pause, RefreshCw, Maximize, Hash, Info
} from 'lucide-vue-next'

const activeTab = ref('live')
</script>