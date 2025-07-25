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
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Line Check Row 1 (5 cameras)</h2>
              <div class="flex items-center space-x-2">
                <button 
                  @click="row1ViewMode = row1ViewMode === 'grid' ? 'single' : 'grid'"
                  class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {{ row1ViewMode === 'grid' ? 'Single View' : 'Grid View' }}
                </button>
                <button class="px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors">
                  <Maximize class="w-4 h-4 mr-1 inline" />
                  Expand All
                </button>
              </div>
            </div>
            
            <!-- Grid View -->
            <div v-if="row1ViewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <!-- Entry Camera -->
              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Entry Camera</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('entry')">
                  <img src="/image.png" alt="Entry camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">1080p • 30fps</div>
                </div>
              </div>

              <!-- Scanner Camera -->
              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Scanner Camera</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Active</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('scanner')">
                  <div class="text-emerald-400 text-sm font-medium">Scanner Active</div>
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">Processing</div>
                </div>
              </div>

              <!-- Camera 3 -->
              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Quality Check</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Warning</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('quality')">
                  <img src="/image.png" alt="Quality check camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">720p • 25fps</div>
                </div>
              </div>

              <!-- Camera 4 -->
              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Exit Monitor</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('exit')">
                  <img src="/image.png" alt="Exit monitor camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">1080p • 30fps</div>
                </div>
              </div>

              <!-- Camera 5 -->
              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Sorting Monitor</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('sorting')">
                  <img src="/image.png" alt="Sorting monitor camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">1080p • 30fps</div>
                </div>
              </div>
            </div>

            <!-- Single View Mode -->
            <div v-else class="space-y-6">
              <div class="flex items-center justify-center space-x-4 mb-6">
                <button 
                  v-for="(camera, index) in row1Cameras" 
                  :key="camera.id"
                  @click="selectedRow1Camera = camera.id"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedRow1Camera === camera.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ camera.name }}
                </button>
              </div>
              
              <div class="bg-white rounded-lg p-8 shadow-md border">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center space-x-4">
                    <h3 class="text-2xl font-semibold text-gray-900">{{ getCurrentRow1Camera().name }}</h3>
                    <div class="flex items-center space-x-2">
                      <div :class="getCurrentRow1Camera().statusColor" class="w-3 h-3 rounded-full"></div>
                      <span class="text-sm text-gray-600">{{ getCurrentRow1Camera().status }}</span>
                    </div>
                  </div>
                  <button class="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors flex items-center">
                    <Maximize class="w-4 h-4 mr-2" />
                    Fullscreen
                  </button>
                </div>
                
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <img v-if="getCurrentRow1Camera().hasImage" 
                       src="/image.png" 
                       :alt="getCurrentRow1Camera().name + ' feed'" 
                       class="w-full h-full object-cover rounded-lg" />
                  <div v-else class="text-gray-600">{{ getCurrentRow1Camera().placeholder }}</div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <button class="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors flex items-center">
                      <Camera class="w-4 h-4 mr-2" />
                      Take Snapshot
                    </button>
                    <button class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center">
                      <Settings class="w-4 h-4 mr-2" />
                      Camera Settings
                    </button>
                    <button class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center">
                      <RefreshCw class="w-4 h-4 mr-2" />
                      Refresh Feed
                    </button>
                  </div>
                  <div class="text-sm text-gray-500">{{ getCurrentRow1Camera().resolution }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Line Check Row 2 -->
          <div>
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Line Check Row 2 (3 cameras)</h2>
              <div class="flex items-center space-x-2">
                <button 
                  @click="row2ViewMode = row2ViewMode === 'grid' ? 'single' : 'grid'"
                  class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {{ row2ViewMode === 'grid' ? 'Single View' : 'Grid View' }}
                </button>
                <button class="px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors">
                  <Maximize class="w-4 h-4 mr-1 inline" />
                  Expand All
                </button>
              </div>
            </div>
            
            <!-- Grid View -->
            <div v-if="row2ViewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Quality Check</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Active</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('quality2')">
                  <img src="/image.png" alt="Quality check camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">1080p • 30fps</div>
                </div>
              </div>

              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Exit Monitor</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Streaming</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('exit2')">
                  <img src="/image.png" alt="Exit monitor camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">1080p • 30fps</div>
                </div>
              </div>

              <div class="bg-white rounded-lg p-6 shadow-md border hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-semibold text-gray-900">Sorting Monitor</h3>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span class="text-xs text-gray-600">Operational</span>
                  </div>
                </div>
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative group cursor-pointer"
                     @click="expandCamera('sorting2')">
                  <img src="/image.png" alt="Sorting monitor camera feed" class="w-full h-full object-cover rounded-lg" />
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    <Expand class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center space-x-3">
                    <button class="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                      <Camera class="w-4 h-4 mr-1" />
                      Snapshot
                    </button>
                    <button class="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                      <Settings class="w-4 h-4 mr-1" />
                      Settings
                    </button>
                  </div>
                  <div class="text-xs text-gray-500">1080p • 30fps</div>
                </div>
              </div>
            </div>

            <!-- Single View Mode for Row 2 -->
            <div v-else class="space-y-6">
              <div class="flex items-center justify-center space-x-4 mb-6">
                <button 
                  v-for="(camera, index) in row2Cameras" 
                  :key="camera.id"
                  @click="selectedRow2Camera = camera.id"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedRow2Camera === camera.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ camera.name }}
                </button>
              </div>
              
              <div class="bg-white rounded-lg p-8 shadow-md border">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center space-x-4">
                    <h3 class="text-2xl font-semibold text-gray-900">{{ getCurrentRow2Camera().name }}</h3>
                    <div class="flex items-center space-x-2">
                      <div :class="getCurrentRow2Camera().statusColor" class="w-3 h-3 rounded-full"></div>
                      <span class="text-sm text-gray-600">{{ getCurrentRow2Camera().status }}</span>
                    </div>
                  </div>
                  <button class="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors flex items-center">
                    <Maximize class="w-4 h-4 mr-2" />
                    Fullscreen
                  </button>
                </div>
                
                <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <img src="/image.png" 
                       :alt="getCurrentRow2Camera().name + ' feed'" 
                       class="w-full h-full object-cover rounded-lg" />
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <button class="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors flex items-center">
                      <Camera class="w-4 h-4 mr-2" />
                      Take Snapshot
                    </button>
                    <button class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center">
                      <Settings class="w-4 h-4 mr-2" />
                      Camera Settings
                    </button>
                    <button class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center">
                      <RefreshCw class="w-4 h-4 mr-2" />
                      Refresh Feed
                    </button>
                  </div>
                  <div class="text-sm text-gray-500">{{ getCurrentRow2Camera().resolution }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Expanded Camera Modal -->
        <div v-if="expandedCamera" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="expandedCamera = null">
          <div class="bg-white rounded-lg p-6 max-w-6xl w-full mx-4" @click.stop>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ expandedCamera }} Camera - Expanded View</h3>
              <button @click="expandedCamera = null" class="text-gray-400 hover:text-gray-600">
                <X class="w-6 h-6" />
              </button>
            </div>
            
            <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <img v-if="expandedCamera !== 'scanner'" 
                   src="/image.png" 
                   :alt="expandedCamera + ' camera feed'" 
                   class="w-full h-full object-contain rounded-lg" />
              <div v-else class="text-emerald-400 text-xl font-medium">Scanner Active - Full View</div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <button class="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors flex items-center">
                  <Camera class="w-4 h-4 mr-2" />
                  Take Snapshot
                </button>
                <button class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center">
                  <Download class="w-4 h-4 mr-2" />
                  Download Feed
                </button>
              </div>
              <div class="text-sm text-gray-500">Full Resolution • Real-time</div>
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
  Activity, Camera, Clock, Pause, RefreshCw, Maximize, Hash, Info, Settings, Expand, X, Download
} from 'lucide-vue-next'

const activeTab = ref('live')
const row1ViewMode = ref('grid')
const row2ViewMode = ref('grid')
const selectedRow1Camera = ref('entry')
const selectedRow2Camera = ref('quality2')
const expandedCamera = ref(null)

// Camera data for Row 1
const row1Cameras = ref([
  { 
    id: 'entry', 
    name: 'Entry Camera', 
    status: 'Streaming', 
    statusColor: 'bg-emerald-400',
    resolution: '1080p • 30fps',
    hasImage: true,
    placeholder: 'Live Feed'
  },
  { 
    id: 'scanner', 
    name: 'Scanner Camera', 
    status: 'Active', 
    statusColor: 'bg-emerald-400',
    resolution: 'Processing',
    hasImage: false,
    placeholder: 'Scanner Active'
  },
  { 
    id: 'quality', 
    name: 'Quality Check', 
    status: 'Warning', 
    statusColor: 'bg-yellow-400',
    resolution: '720p • 25fps',
    hasImage: true,
    placeholder: 'Feed Loading'
  },
  { 
    id: 'exit', 
    name: 'Exit Monitor', 
    status: 'Streaming', 
    statusColor: 'bg-emerald-400',
    resolution: '1080p • 30fps',
    hasImage: true,
    placeholder: 'Live Feed'
  },
  { 
    id: 'sorting', 
    name: 'Sorting Monitor', 
    status: 'Streaming', 
    statusColor: 'bg-emerald-400',
    resolution: '1080p • 30fps',
    hasImage: true,
    placeholder: 'Live Feed'
  }
])

// Camera data for Row 2
const row2Cameras = ref([
  { 
    id: 'quality2', 
    name: 'Quality Check', 
    status: 'Active', 
    statusColor: 'bg-emerald-400',
    resolution: '1080p • 30fps'
  },
  { 
    id: 'exit2', 
    name: 'Exit Monitor', 
    status: 'Streaming', 
    statusColor: 'bg-emerald-400',
    resolution: '1080p • 30fps'
  },
  { 
    id: 'sorting2', 
    name: 'Sorting Monitor', 
    status: 'Operational', 
    statusColor: 'bg-emerald-400',
    resolution: '1080p • 30fps'
  }
])

const getCurrentRow1Camera = () => {
  return row1Cameras.value.find(camera => camera.id === selectedRow1Camera.value) || row1Cameras.value[0]
}

const getCurrentRow2Camera = () => {
  return row2Cameras.value.find(camera => camera.id === selectedRow2Camera.value) || row2Cameras.value[0]
}

const expandCamera = (cameraId) => {
  expandedCamera.value = cameraId
}
</script>
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