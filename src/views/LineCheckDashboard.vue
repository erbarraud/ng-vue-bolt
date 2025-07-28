<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
    <!-- Header Bar -->
    <div class="bg-white border-b-4 border-emerald-500 px-8 py-6 shadow-lg">
      <div class="flex items-center justify-between">
        <!-- Title and Status -->
        <div class="flex items-center space-x-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900">Line Check Dashboard</h1>
            <p class="text-xl text-gray-600 mt-1">Real-time Board Scanning Monitor</p>
          </div>
          
          <!-- Connection Status -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div :class="connectionStatus === 'connected' ? 'bg-emerald-400' : 'bg-red-400'" 
                   class="w-4 h-4 rounded-full animate-pulse"></div>
              <span class="text-lg font-medium text-gray-900">
                {{ connectionStatus === 'connected' ? 'Connected' : 'Disconnected' }}
              </span>
            </div>
            
            <!-- Scanning Status -->
            <div class="flex items-center space-x-2">
              <div :class="isScanning ? 'bg-emerald-400' : 'bg-yellow-400'" 
                   class="w-4 h-4 rounded-full"></div>
              <span class="text-lg font-medium text-gray-900">
                {{ isScanning ? 'Scanning Active' : 'Scanning Paused' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Live Stats -->
        <div class="flex items-center space-x-12">
          <div class="text-center">
            <div class="text-3xl font-bold text-emerald-400">{{ totalScanned }}</div>
            <div class="text-sm text-gray-500 uppercase tracking-wide">Total Scanned</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ scanRate }}/min</div>
            <div class="text-sm text-gray-500 uppercase tracking-wide">Scan Rate</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">{{ averageGrade }}</div>
            <div class="text-sm text-gray-500 uppercase tracking-wide">Avg Grade</div>
          </div>
          <div class="text-lg text-gray-700">
            {{ currentTime }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="p-8">
      <!-- Current Scanning Board (Large Display) -->
      <div v-if="currentBoard" class="mb-8">
        <div class="bg-white rounded-2xl p-8 shadow-2xl border-4 border-emerald-500">
          <div class="flex items-center justify-between">
            <!-- Board Image and Info -->
            <div class="flex items-center space-x-12">
              <!-- Board Image -->
              <div class="relative">
                <div class="text-sm text-gray-600 uppercase tracking-wide mb-2">Board Image</div>
                <div class="w-96 bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden">
                  <img 
                    src="/image.png" 
                    alt="Current board being scanned" 
                    class="w-full h-auto object-contain"
                  />
                  <!-- Scanning overlay -->
                  <div class="absolute inset-0 bg-emerald-500 bg-opacity-20 border-2 border-emerald-500 rounded-lg animate-pulse"></div>
                </div>
                <div class="text-center mt-2">
                  <div class="text-emerald-600 text-sm font-medium">Currently Scanning</div>
                </div>
              </div>
              
              <!-- Board Details -->
              <div class="text-center">
                <div class="text-sm text-gray-600 uppercase tracking-wide mb-2">Board ID</div>
                <div class="text-6xl font-bold text-gray-900">{{ currentBoard.id }}</div>
              </div>
              
              <div class="h-20 w-px bg-gray-300"></div>
              
              <div class="grid grid-cols-4 gap-8">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900">{{ currentBoard.grade }}</div>
                  <div class="text-sm text-gray-600 uppercase">Grade</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900">{{ currentBoard.species }}</div>
                  <div class="text-sm text-gray-600 uppercase">Species</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900">{{ currentBoard.dimensions }}</div>
                  <div class="text-sm text-gray-600 uppercase">Dimensions</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-emerald-600">${{ currentBoard.value }}</div>
                  <div class="text-sm text-gray-600 uppercase">Value</div>
                </div>
              </div>
            </div>
            
            <!-- Scanning Animation -->
            <div class="text-center">
              <div class="w-24 h-24 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <div class="text-gray-900 text-lg font-medium">Scanning...</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Boards List -->
      <div class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Recent Boards</h2>
        <TransitionGroup name="board-list" tag="div" class="space-y-4">
          <div
            v-for="board in recentBoards"
            :key="board.id"
            :class="[
              'bg-white rounded-xl p-6 border-l-8 transition-all duration-500 shadow-lg flex items-center space-x-8',
              board.isNew ? 'border-emerald-500 bg-emerald-50 shadow-xl shadow-emerald-200' : 'border-gray-200',
              getGradeColorClass(board.grade)
            ]"
          >
            <!-- Board Image Full Size -->
            <div class="flex-shrink-0">
              <div class="w-80 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <img 
                  src="/image.png" 
                  alt="Board scan image" 
                  class="w-full h-auto object-contain"
                />
              </div>
            </div>

            <!-- Board Information -->
            <div class="flex-1 grid grid-cols-6 gap-8 items-center">
              <!-- Board ID -->
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">{{ board.id }}</div>
                <div class="text-sm text-gray-500 mt-1">{{ board.scannedTime }}</div>
              </div>

              <!-- Grade -->
              <div class="text-center">
                <div :class="getGradeBadgeClass(board.grade)" 
                     class="inline-block px-4 py-2 rounded-full text-xl font-bold mb-2">
                  {{ board.grade }}
                </div>
                <div class="text-sm text-gray-500 uppercase">Grade</div>
              </div>

              <!-- Species -->
              <div class="text-center">
                <div class="text-xl font-bold text-gray-900">{{ board.species }}</div>
                <div class="text-sm text-gray-500 uppercase">Species</div>
              </div>

              <!-- Dimensions -->
              <div class="text-center">
                <div class="text-xl font-bold text-gray-900">{{ board.dimensions }}</div>
                <div class="text-sm text-gray-500 uppercase">Size</div>
              </div>

              <!-- Value -->
              <div class="text-center">
                <div class="text-2xl font-bold text-emerald-600">${{ board.value }}</div>
                <div class="text-sm text-gray-500 uppercase">Value</div>
              </div>

              <!-- Status & Defects -->
              <div class="text-center">
                <div class="flex items-center justify-center space-x-4 mb-2">
                  <div :class="board.status === 'passed' ? 'bg-emerald-500' : 'bg-yellow-500'" 
                       class="w-4 h-4 rounded-full"></div>
                  <span class="text-lg font-medium text-gray-900 capitalize">{{ board.status }}</span>
                </div>
                <div class="text-sm text-gray-500">
                  {{ board.defectCount || 0 }} defects
                </div>
              </div>
            </div>

            <!-- Key Info -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Species:</span>
                <span class="text-gray-900 font-medium">{{ board.species }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Size:</span>
                <span class="text-gray-900 font-medium">{{ board.dimensions }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Value:</span>
                <span class="text-emerald-600 font-bold text-lg">${{ board.value }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-sm">Defects:</span>
                <span :class="board.defectCount > 0 ? 'text-red-600' : 'text-emerald-600'" 
                      class="font-medium">
                  {{ board.defectCount || 0 }}
                </span>
              </div>
            </div>

            <!-- Status Indicator -->
        </div>
        
        <div class="flex items-center space-x-4">
          <button 
            @click="toggleScanning"
            :class="isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'"
            class="px-6 py-2 rounded-lg font-medium transition-colors text-white"
          >
            {{ isScanning ? 'Pause Scanning' : 'Resume Scanning' }}
          </button>
          <button 
            @click="refreshData"
            class="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors text-white"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Reactive state
const connectionStatus = ref('connected')
const isScanning = ref(true)
const currentTime = ref('')
const lastUpdateTime = ref('')
const currentBoard = ref(null)
const recentBoards = ref([])
const totalScanned = ref(1247)
const scanRate = ref(12)
const currentBatch = ref('B-4873')
const currentOrder = ref('ORD-20250701-001')

// Timers and intervals
let clockTimer = null
let scanTimer = null
let connectionTimer = null

// Sample data for generating boards
const sampleSpecies = ['Red Oak', 'White Oak', 'Cherry', 'Maple', 'Walnut', 'Ash']
const sampleGrades = ['FAS', 'Select', '1 Common', '2 Common', '3 Common']
const sampleStatuses = ['passed', 'review']

/**
 * Generates a random board for simulation
 * @returns {Object} Board object with realistic lumber data
 */
const generateRandomBoard = () => {
  const boardNumber = Math.floor(Math.random() * 9999) + 2000
  const species = sampleSpecies[Math.floor(Math.random() * sampleSpecies.length)]
  const grade = sampleGrades[Math.floor(Math.random() * sampleGrades.length)]
  const length = Math.floor(Math.random() * 8) + 4 // 4-12 feet
  const width = Math.floor(Math.random() * 8) + 4 // 4-12 inches
  const thickness = Math.random() > 0.5 ? '4/4' : '5/4'
  const value = (Math.random() * 50 + 10).toFixed(2)
  const defectCount = Math.floor(Math.random() * 4) // 0-3 defects
  const status = defectCount > 2 ? 'review' : 'passed'
  
  return {
    id: `BRD-${boardNumber}`,
    species,
    grade,
    dimensions: `${length}' × ${width}" × ${thickness}`,
    value,
    defectCount,
    status,
    scannedTime: new Date().toLocaleTimeString(),
    isNew: true
  }
}

/**
 * Simulates scanning a new board
 */
const scanNewBoard = () => {
  if (!isScanning.value) return

  // Set current board being scanned
  currentBoard.value = generateRandomBoard()
  
  // Simulate scanning time (2-4 seconds)
  const scanDuration = Math.random() * 2000 + 2000
  
  setTimeout(() => {
    if (currentBoard.value) {
      // Add to recent boards
      recentBoards.value.unshift({ ...currentBoard.value })
      
      // Remove new highlight after 5 seconds
      setTimeout(() => {
        if (recentBoards.value[0]) {
          recentBoards.value[0].isNew = false
        }
      }, 5000)
      
      // Keep only last 18 boards (3 rows of 6)
      if (recentBoards.value.length > 18) {
        recentBoards.value = recentBoards.value.slice(0, 18)
      }
      
      // Update stats
      totalScanned.value++
      lastUpdateTime.value = new Date().toLocaleTimeString()
      
      // Clear current board
      currentBoard.value = null
      
      // Schedule next scan
      if (isScanning.value) {
        const nextScanDelay = Math.random() * 3000 + 2000 // 2-5 seconds
        setTimeout(scanNewBoard, nextScanDelay)
      }
    }
  }, scanDuration)
}

/**
 * Updates the current time display
 */
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

/**
 * Simulates connection status changes
 */
const simulateConnection = () => {
  // Occasionally simulate connection issues (5% chance)
  if (Math.random() < 0.05) {
    connectionStatus.value = 'disconnected'
    setTimeout(() => {
      connectionStatus.value = 'connected'
    }, Math.random() * 3000 + 1000)
  }
}

/**
 * Toggles scanning state
 */
const toggleScanning = () => {
  isScanning.value = !isScanning.value
  
  if (isScanning.value && !currentBoard.value) {
    scanNewBoard()
  }
}

/**
 * Refreshes dashboard data
 */
const refreshData = () => {
  lastUpdateTime.value = new Date().toLocaleTimeString()
  // In a real app, this would fetch fresh data from the API
}

/**
 * Gets CSS class for grade color coding
 * @param {string} grade - Board grade
 * @returns {string} CSS class
 */
const getGradeColorClass = (grade) => {
  const colorMap = {
    'FAS': 'border-l-4 border-l-emerald-600',
    'Select': 'border-l-4 border-l-blue-600',
    '1 Common': 'border-l-4 border-l-yellow-600',
    '2 Common': 'border-l-4 border-l-orange-600',
    '3 Common': 'border-l-4 border-l-red-600'
  }
  return colorMap[grade] || 'border-l-4 border-l-gray-600'
}

/**
 * Gets CSS class for grade badge styling
 * @param {string} grade - Board grade
 * @returns {string} CSS class
 */
const getGradeBadgeClass = (grade) => {
  const badgeMap = {
    'FAS': 'bg-emerald-600 text-white',
    'Select': 'bg-blue-600 text-white',
    '1 Common': 'bg-yellow-600 text-white',
    '2 Common': 'bg-orange-600 text-white',
    '3 Common': 'bg-red-600 text-white'
  }
  return badgeMap[grade] || 'bg-gray-600 text-white'
}

/**
 * Calculates average grade for display
 */
const averageGrade = computed(() => {
  if (recentBoards.value.length === 0) return 'N/A'
  
  const gradeValues = {
    'FAS': 5,
    'Select': 4,
    '1 Common': 3,
    '2 Common': 2,
    '3 Common': 1
  }
  
  const total = recentBoards.value.reduce((sum, board) => {
    return sum + (gradeValues[board.grade] || 0)
  }, 0)
  
  const average = total / recentBoards.value.length
  
  // Convert back to grade name
  if (average >= 4.5) return 'FAS'
  if (average >= 3.5) return 'Select'
  if (average >= 2.5) return '1 Common'
  if (average >= 1.5) return '2 Common'
  return '3 Common'
})

// Lifecycle hooks
onMounted(() => {
  // Initialize with some sample boards
  const initialBoards = Array.from({ length: 6 }, () => ({
    ...generateRandomBoard(),
    isNew: false
  }))
  recentBoards.value = initialBoards
  
  // Start timers
  updateTime()
  clockTimer = setInterval(updateTime, 1000)
  connectionTimer = setInterval(simulateConnection, 10000)
  
  // Start scanning
  if (isScanning.value) {
    setTimeout(scanNewBoard, 2000)
  }
  
  lastUpdateTime.value = new Date().toLocaleTimeString()
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (scanTimer) clearInterval(scanTimer)
  if (connectionTimer) clearInterval(connectionTimer)
})
</script>

<style scoped>
/* Board grid animations */
.board-grid-enter-active {
  transition: all 0.6s ease;
}

.board-grid-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.board-grid-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.board-grid-leave-active {
  transition: all 0.4s ease;
}

.board-grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(20px);
}

.board-grid-move {
  transition: transform 0.5s ease;
}

/* Custom scrollbar for better visibility */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Ensure text is always readable */
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* High contrast focus states for accessibility */
button:focus {
  outline: 3px solid #fbbf24;
  outline-offset: 2px;
}
</style>