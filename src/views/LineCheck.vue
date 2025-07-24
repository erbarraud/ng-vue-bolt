<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-white mb-2">Line Check</h1>
        <p class="text-gray-300 mt-1">Monitor camera feeds and equipment status in real-time</p>
      </div>

      <!-- Equipment Status -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">Equipment Status</h2>
        <div class="flex items-center space-x-8">
          <div class="flex items-center space-x-3">
            <span class="text-gray-300">Scanner</span>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
              <span class="sr-only">Toggle scanner</span>
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
            </button>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-gray-300">Air</span>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
              <span class="sr-only">Toggle air</span>
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
            </button>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-gray-300">Lights</span>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-600">
              <span class="sr-only">Toggle lights</span>
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Batch Information -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">Current Batch</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div class="text-gray-400 text-sm">Batch ID</div>
            <div class="text-xl font-semibold text-white">B-4873</div>
          </div>
          <div>
            <div class="text-gray-400 text-sm">Species</div>
            <div class="text-xl font-semibold text-white">Douglas Fir</div>
          </div>
          <div>
            <div class="text-gray-400 text-sm">Scheduled</div>
            <div class="text-xl font-semibold text-white">8:30 AM</div>
          </div>
          <div>
            <div class="text-gray-400 text-sm">Volume Processed</div>
            <div class="text-xl font-semibold text-white">28.3 m³</div>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-gray-400 text-sm">System Uptime</div>
          <div class="text-xl font-semibold text-emerald-400">97%</div>
        </div>
      </div>

      <!-- Camera Feeds -->
      <div class="space-y-8">
        <!-- Line Check Row 1 -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Line Check Row 1 (5 cameras)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Entry Camera -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Entry</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Streaming</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Live Feed</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-emerald-600 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>

            <!-- Scanner Camera -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Scanner</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Connected</span>
                </div>
              </div>
              <div class="aspect-video bg-black rounded flex items-center justify-center mb-3">
                <div class="text-emerald-400 text-sm">Scanner Active</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-emerald-600 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>

            <!-- Additional cameras (3 more) -->
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Camera 3</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Warning</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Feed Loading</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-gray-700 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Camera 4</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Streaming</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Live Feed</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-gray-700 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Camera 5</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Streaming</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Live Feed</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-gray-700 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Line Check Row 2 -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-4">Line Check Row 2 (3 cameras)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Quality Check</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Active</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Inspection Feed</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-gray-700 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Exit</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Streaming</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Output Feed</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-gray-700 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
                </div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-medium text-white">Sorting</h3>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span class="text-xs text-gray-300">Operational</span>
                </div>
              </div>
              <div class="aspect-video bg-gray-700 rounded flex items-center justify-center mb-3">
                <div class="text-gray-400 text-sm">Sort Monitor</div>
              </div>
              <div class="flex items-center justify-between">
                <button class="text-emerald-400 hover:text-emerald-300 text-xs">Snapshot</button>
                <div class="flex items-center space-x-2">
                  <button class="px-2 py-1 bg-gray-700 text-xs text-white rounded">Live View</button>
                  <button class="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">Scanner</button>
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
// Line check monitoring functionality
</script>