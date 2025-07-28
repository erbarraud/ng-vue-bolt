<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Line Check</h1>
        </div>
        
        <!-- Tab Navigation -->
        <div class="flex items-center space-x-2">
          <button class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 flex items-center">
            <div class="w-4 h-4 mr-2 flex items-center justify-center">
              <div class="w-2 h-2 bg-gray-600 rounded-sm"></div>
              <div class="w-2 h-2 bg-gray-600 rounded-sm ml-0.5"></div>
            </div>
            Live View
          </button>
          <button class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 flex items-center">
            <Camera class="w-4 h-4 mr-2" />
            Scanner
          </button>
        </div>
      </div>

      <!-- Live Scanning View Section -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Live Scanning View</h2>
        <p class="text-gray-600">Real-time feed from scanner</p>
      </div>

      <!-- Control Bar -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-600">
            <Clock class="w-4 h-4 mr-2" />
            <span class="text-gray-900 font-medium">{{ currentTime }}</span>
          </div>
          <select 
            v-model="scanInterval" 
            @change="updateScanInterval"
            class="bg-white text-gray-900 px-3 py-1 rounded text-sm border border-gray-300"
          >
            <option value="12000">5/min</option>
            <option value="5000">12/min</option>
            <option value="2000">30/min</option>
          </select>
        </div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Square class="w-4 h-4 mr-2" />
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
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-900">Recent Boards</h3>
      </div>

      <!-- Board List Container -->
      <div class="bg-gray-800 rounded-lg overflow-hidden">
        <TransitionGroup name="board-list" tag="div">
          <div
            v-for="board in recentBoards"
            :key="board.id"
            :class="[
              'relative flex items-center bg-gray-800 border-b border-gray-700 last:border-b-0 transition-all duration-300',
              board.isNew ? 'bg-gray-700' : ''
            ]"
          >
            <!-- New Badge -->
            <div v-if="board.isNew" class="absolute top-2 right-2 z-10">
              <span class="bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
            </div>

            <!-- Board Image -->
            <div class="flex-1 relative">
              <img 
                src="/image.png" 
                alt="Board scan image" 
                class="w-full h-24 object-cover"
              />
              
              <!-- Board Info Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between px-4">
                <!-- Left side info -->
                <div class="flex items-center space-x-4">
                  <div class="text-white">
                    <div class="text-lg font-bold"># {{ board.id }}</div>
                    <div class="text-sm flex items-center">
                      <div class="w-4 h-4 bg-white rounded-full mr-2 flex items-center justify-center">
                        <div class="w-2 h-2 bg-gray-800 rounded-full"></div>
                      </div>
                      {{ board.batch }}
                    </div>
                  </div>
                </div>

                <!-- Right side info -->
                <div class="text-right text-white">
                  <div class="flex items-center justify-end space-x-2 mb-1">
                    <span :class="getGradeBadgeClass(board.grade)" class="px-2 py-1 rounded text-xs font-medium">
                      {{ board.grade }}
                    </span>
                  </div>
                  <div class="text-lg font-bold">${{ board.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Footer Info -->
      <div class="mt-4 flex items-center text-gray-500 text-sm">
        <div class="w-4 h-4 rounded-full border border-gray-400 mr-2 flex items-center justify-center">
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
        Live feed with board images (original aspect ratio). KPIs are overlaid. Click Board ID for details.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Clock, Square, RefreshCw, Maximize, Camera } from 'lucide-vue-next'

// Reactive state
const isScanning = ref(true)
const scanInterval = ref(12000) // 5/min default
const currentTime = ref('')
const recentBoards = ref([])

// Timers
let clockTimer = null
let scanTimer = null

// Sample data for generating boards
const sampleGrades = ['2COMMON', 'Select', 'Common']
const sampleBatches = ['B-934', 'B-789', 'B-790', 'B-791', 'B-792']
const sampleValues = ['8.41', '12.50', '18.75', '15.25', '22.00']

/**
 * Generates a random board with realistic lumber data
 * @returns {Object} Board object with id, grade, batch, etc.
 */
const generateRandomBoard = () => {
  const boardTypes = ['BRD-10003', 'LV-1001', 'LV-1002']
  const boardId = boardTypes[Math.floor(Math.random() * boardTypes.length)]
  const grade = sampleGrades[Math.floor(Math.random() * sampleGrades.length)]
  const batch = sampleBatches[Math.floor(Math.random() * sampleBatches.length)]
  const value = sampleValues[Math.floor(Math.random() * sampleValues.length)]
  
  return {
    id: boardId,
    grade,
    batch,
    value,
    scannedTime: new Date().toLocaleTimeString(),
    isNew: true
  }
}

/**
 * Adds a new randomly generated board to the scanning results
 */
const addNewBoard = () => {
  if (!isScanning.value) return
  
  const newBoard = generateRandomBoard()
  
  // Add to the beginning of the array
  recentBoards.value.unshift(newBoard)
  
  // Remove the "new" highlight after 3 seconds
  setTimeout(() => {
    newBoard.isNew = false
  }, 3000)
  
  // Keep only the last 10 boards
  if (recentBoards.value.length > 10) {
    recentBoards.value = recentBoards.value.slice(0, 10)
  }
}

/**
 * Starts the scanning process
 */
const startScanning = () => {
  if (scanTimer) clearInterval(scanTimer)
  
  // Add a board immediately when starting
  addNewBoard()
  
  // Start scanning timer
  scanTimer = setInterval(() => {
    addNewBoard()
  }, scanInterval.value)
}

/**
 * Updates the scanning interval and restarts if currently scanning
 */
const updateScanInterval = () => {
  if (isScanning.value) {
    if (scanTimer) clearInterval(scanTimer)
    startScanning()
  }
}

/**
 * Updates the current time display
 */
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * Gets CSS class for grade badge styling
 * @param {string} grade - Board grade
 * @returns {string} CSS class
 */
const getGradeBadgeClass = (grade) => {
  const badgeMap = {
    '2COMMON': 'bg-gray-600 text-white',
    'Select': 'bg-blue-600 text-white',
    'Common': 'bg-yellow-600 text-white'
  }
  return badgeMap[grade] || 'bg-gray-600 text-white'
}

/**
 * Initializes the component with sample board data
 */
const initializeSampleBoards = () => {
  const initialBoards = [
    {
      id: 'BRD-10003',
      grade: '2COMMON',
      batch: 'B-934',
      value: '8.41',
      scannedTime: '06:39:00 PM',
      isNew: true
    },
    {
      id: 'LV-1001',
      grade: 'Select',
      batch: 'B-789',
      value: '12.50',
      scannedTime: '06:38:55 PM',
      isNew: false
    },
    {
      id: 'LV-1002',
      grade: 'Common',
      batch: 'B-790',
      value: '18.75',
      scannedTime: '06:38:50 PM',
      isNew: false
    }
  ]
  
  recentBoards.value = initialBoards
}

onMounted(() => {
  initializeSampleBoards()
  updateTime()
  
  // Start clock timer
  clockTimer = setInterval(updateTime, 1000)
  
  // Start scanning
  if (isScanning.value) {
    startScanning()
  }
})

onUnmounted(() => {
  if (scanTimer) clearInterval(scanTimer)
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<style scoped>
/* Transition animations for new boards */
.board-list-enter-active {
  transition: all 0.5s ease;
}

.board-list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.board-list-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.board-list-leave-active {
  transition: all 0.3s ease;
}

.board-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>