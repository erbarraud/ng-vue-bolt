<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Board Finder</h1>
      <p class="text-gray-600 mt-1">Find and analyze boards as they move through the scanning line</p>
    </div>

    <!-- Search Bar -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 flex-1">
          <div class="relative flex-1 max-w-md">
            <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search boards by ID, batch, or grade..."
              v-model="searchQuery"
              class="pl-10 pr-3 py-2 w-full border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
          <Button variant="outline">
            <Filter class="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Show</span>
          <select class="border border-input rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-ring focus:border-ring">
            <option>3</option>
            <option>5</option>
            <option>10</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Timeline Navigator -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <Clock class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-semibold text-gray-900">Timeline Navigator</h3>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="showTimeline = !showTimeline" class="p-1 hover:bg-gray-100 rounded">
            <ChevronDown :class="showTimeline ? 'rotate-180' : ''" class="w-4 h-4 text-gray-400 transition-transform" />
          </button>
        </div>
      </div>
      
      <div v-if="showTimeline" class="space-y-4">
        <!-- Batch Timeline Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Clock class="w-4 h-4 text-gray-400" />
            <span class="text-sm font-medium text-gray-700">Batch Timeline</span>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="setTimeRange('today')"
              :class="[
                'px-3 py-1.5 text-sm rounded-md transition-colors',
                selectedTimeRange === 'today' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              Today
            </button>
            <button 
              @click="setTimeRange('yesterday')"
              :class="[
                'px-3 py-1.5 text-sm rounded-md transition-colors',
                selectedTimeRange === 'yesterday' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              Yesterday
            </button>
            <button 
              @click="setTimeRange('week')"
              :class="[
                'px-3 py-1.5 text-sm rounded-md transition-colors',
                selectedTimeRange === 'week' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >
              This Week
            </button>
            <button 
              @click="showDatePicker = !showDatePicker"
              class="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Calendar class="w-4 h-4 mr-1" />
              Date Range
            </button>
          </div>
        </div>

        <!-- Description -->
        <div class="text-sm text-gray-500">
          Select an hour to view boards
        </div>

        <!-- Timeline Chart -->
        <div class="relative">
          <!-- Navigation Arrows -->
          <button 
            @click="scrollTimeline('left')"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 shadow-sm"
          >
            <ChevronLeft class="w-4 h-4 text-gray-600" />
          </button>
          
          <button 
            @click="scrollTimeline('right')"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 shadow-sm"
          >
            <ChevronRight class="w-4 h-4 text-gray-600" />
          </button>

          <!-- Chart Container -->
          <div class="mx-10 overflow-hidden">
            <div class="flex items-end justify-between gap-2 h-32 px-4 py-3">
              <button
                v-for="hour in visibleTimeSlots"
                :key="hour.value"
                @click="selectTimeSlot(hour.value)"
                class="flex flex-col items-center group transition-all duration-200 cursor-pointer min-w-0 flex-1"
                :title="`${hour.label} - ${hour.boards} boards`"
              >
                <!-- Bar -->
                <div 
                  :class="[
                    'w-full rounded-t-sm transition-all duration-200 mb-2',
                    selectedTimeSlot === hour.value
                      ? 'bg-gray-800'
                      : 'bg-gray-200 group-hover:bg-gray-300'
                  ]"
                  :style="{ height: `${Math.max((hour.boards / 35) * 80, 8)}px` }"
                ></div>
                <!-- Time Label -->
                <div class="text-xs text-gray-600 font-medium">
                  {{ hour.time }}
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Summary Stats -->
        <div class="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
          <span>Total: {{ totalBoards }} boards</span>
          <span>Batch duration: {{ batchDuration }} hours</span>
        </div>

        <!-- Date Picker Modal (if needed) -->
        <div v-if="showDatePicker" class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20">
          <div class="flex items-center space-x-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input 
                type="date" 
                v-model="selectedDate"
                class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input 
                type="date" 
                v-model="selectedDate"
                class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div class="flex items-end space-x-2">
              <button 
                @click="applyDateRange"
                class="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
              >
                Apply
              </button>
              <button 
                @click="showDatePicker = false"
                class="px-4 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-gray-600">Showing 1-3 of 3 boards</div>
      <div class="flex items-center space-x-2">
        <button class="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Previous</button>
        <span class="text-sm text-gray-600">Page 1 of 1</span>
        <button class="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">Next</button>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Sidebar - Board List -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow">
          <div class="space-y-1 p-2">
            <div v-for="board in boards" :key="board.id"
                 :class="[
                   'p-3 rounded-lg cursor-pointer border-2 transition-all',
                   selectedBoard === board.id
                     ? 'border-emerald-500 bg-emerald-50'
                     : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                 ]"
                 @click="selectedBoard = board.id"
            >
              <div class="flex items-center justify-between">
                <div class="font-semibold text-gray-900">{{ board.id }}</div>
                <div class="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">{{ board.grade }}</div>
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ board.batch }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg border-2 border-emerald-500 p-8" v-if="currentBoard">
          <div>
            <!-- Board Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-4">
                <h2 class="text-2xl font-bold text-gray-900">Board {{ currentBoard.id }}</h2>
                <span class="px-3 py-1 bg-gray-800 text-white text-sm font-medium rounded">{{ currentBoard.grade }}</span>
              </div>
            </div>

            <!-- Divider -->
            <div class="border-b border-gray-200 mb-8"></div>

            <!-- Board Specifications -->
            <div class="grid grid-cols-7 gap-8 mb-8">
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <Tag class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Length</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ currentBoard.length }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <Tag class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Width</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ currentBoard.width }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <Layers class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Thickness</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ currentBoard.thickness }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <Package class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Volume</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ currentBoard.volume }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <DollarSign class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Value</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ currentBoard.value }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <AlertCircle class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Total Defects</span>
                </div>
                <div class="text-lg font-bold text-gray-900">{{ currentBoard.totalDefects }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <Percent class="w-4 h-4 text-gray-500 mr-1" />
                  <span class="text-sm text-gray-600">Yield</span>
                </div>
                <div class="text-lg font-bold text-gray-900">N/A</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-4 mb-8">
              <Button variant="outline" size="sm" class="text-gray-700 border-gray-300 hover:bg-gray-50">
                <EyeOff class="w-4 h-4 mr-2" />
                Hide filtered defects
              </Button>
              <Button variant="outline" size="sm" class="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                <CheckCircle class="w-4 h-4 mr-2" />
                Agree with NG AI
              </Button>
              <Button variant="outline" size="sm" class="text-red-600 border-red-300 hover:bg-red-50">
                <XCircle class="w-4 h-4 mr-2" />
                Disagree with NG AI
              </Button>
              <Button variant="outline" size="sm" class="text-gray-700 border-gray-300 hover:bg-gray-50">
                <FileText class="w-4 h-4 mr-2" />
                See Rejected Grades
              </Button>
            </div>

            <!-- Board Images -->
            <div class="space-y-4 mb-6">
              <!-- Face 1 -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Face 1</h4>
                <div class="h-48 rounded-lg border border-gray-300 mb-2 overflow-hidden bg-gray-100 relative">
                  <img src="/image.png" alt="Board Face 1 - Lumber scan showing defects" class="w-full h-full object-contain" />
                  
                  <!-- Defect Overlay Areas -->
                  <div v-if="isDefectVisible('face1', 'Wane')" class="absolute bottom-4 left-4 w-16 h-6 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform -skew-x-12"></div>
                </div>
                
                <div class="text-sm font-medium text-gray-900">Wane</div>
              </div>

              <!-- Face 2 -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Face 2</h4>
                <div class="h-48 rounded-lg border border-gray-300 mb-2 overflow-hidden bg-gray-100 relative">
                  <img src="/image.png" alt="Board Face 2 - Lumber scan showing defects" class="w-full h-full object-contain" />
                  
                  <!-- Defect Overlay Areas -->
                  <div v-if="isDefectVisible('face2', 'Wane')" class="absolute bottom-3 right-4 w-10 h-8 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform skew-y-12"></div>
                </div>
                
                <div class="text-sm font-medium text-gray-900">Wane</div>
              </div>
            </div>

            <!-- Clear Cuttings -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <!-- Face 1 Clear Cuttings -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-6">Clear Cuttings (Face 1)</h4>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900">6' 2 3/4" × 5 3/8"</span>
                    <span class="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">33.28 units</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900">2' × 4 13/16"</span>
                    <span class="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">9.64 units</span>
                  </div>
                  <div class="border-t border-gray-200 pt-4 mt-6">
                    <div class="flex items-center justify-between">
                      <span class="font-semibold text-gray-900">Total Units:</span>
                      <span class="text-2xl font-bold text-emerald-600">43</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Face 2 Clear Cuttings -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-6">Clear Cuttings (Face 2)</h4>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900">3' 3 3/4" × 5 3/16"</span>
                    <span class="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">17.2 units</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900">3' 5 3/4" × 4 7/8"</span>
                    <span class="bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium">16.83 units</span>
                  </div>
                  <div class="border-t border-gray-200 pt-4 mt-6">
                    <div class="flex items-center justify-between">
                      <span class="font-semibold text-gray-900">Total Units:</span>
                      <span class="text-2xl font-bold text-emerald-600">34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Inspection Button -->
            <div class="flex justify-end">
              <Button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2">
                <router-link :to="`/inspection/${currentBoard.id}`">
                  Full Inspection
                </router-link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Search, Filter, ChevronDown, Calendar, Ruler, Layers, Package, DollarSign, 
  AlertCircle, EyeOff, CheckCircle, XCircle, FileText, Eye, Clock, ChevronLeft, ChevronRight,
  Tag, Percent
} from 'lucide-vue-next'

const searchQuery = ref('')
const selectedBoard = ref('BRD-4625')
const showTimeline = ref(false)
const showDatePicker = ref(false)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedTimeSlot = ref(null)
const selectedTimeRange = ref('today')
const currentTimelineStart = ref(0)

// Time slots for the timeline (8 AM to 3 PM as shown in image)
const timeSlots = ref([
  { value: 8, label: '8:00 AM', time: '08:00', boards: 45 },
  { value: 9, label: '9:00 AM', time: '09:00', boards: 52 },
  { value: 10, label: '10:00 AM', time: '10:00', boards: 38 },
  { value: 11, label: '11:00 AM', time: '11:00', boards: 41 },
  { value: 12, label: '12:00 PM', time: '12:00', boards: 35 },
  { value: 13, label: '1:00 PM', time: '13:00', boards: 48 },
  { value: 14, label: '2:00 PM', time: '14:00', boards: 55 },
  { value: 15, label: '3:00 PM', time: '15:00', boards: 42 }
])

// Computed properties for timeline
const visibleTimeSlots = computed(() => {
  return timeSlots.value.slice(currentTimelineStart.value, currentTimelineStart.value + 8)
})

const totalBoards = computed(() => {
  return timeSlots.value.reduce((sum, slot) => sum + slot.boards, 0)
})

const batchDuration = computed(() => {
  return timeSlots.value.length
})

// Defect visibility state
const defectVisibility = ref({
  face1: {
    'Knot': true,
    'Split': false,
    'Wane': true,
    'Stain': true,
    'Pitch Pocket': false,
    'Shake': false
  },
  face2: {
    'Knot': false,
    'Split': true,
    'Wane': true,
    'Stain': false,
    'Pitch Pocket': true,
    'Shake': true
  }
})

// Defect types with styling
const defectTypes = ref([
  { name: 'Knot', activeClass: 'bg-red-100 text-red-800' },
  { name: 'Split', activeClass: 'bg-orange-100 text-orange-800' },
  { name: 'Wane', activeClass: 'bg-yellow-100 text-yellow-800' },
  { name: 'Stain', activeClass: 'bg-purple-100 text-purple-800' },
  { name: 'Pitch Pocket', activeClass: 'bg-blue-100 text-blue-800' },
  { name: 'Shake', activeClass: 'bg-gray-100 text-gray-800' }
])

// Toggle defect visibility
const toggleDefect = (face, defectName) => {
  defectVisibility.value[face][defectName] = !defectVisibility.value[face][defectName]
}

// Check if defect is visible
const isDefectVisible = (face, defectName) => {
  return defectVisibility.value[face][defectName]
}

const boards = ref([
  {
    id: 'BRD-4625',
    grade: '1COMMON',
    batch: 'Batch: B-4873',
    length: '8\' 3 3/4"',
    width: '5 1/2"',
    thickness: '15/16"',
    volume: '4 bf',
    value: '$4.90',
    totalDefects: '2',
    face1Defects: ['Wane'],
    face2Defects: ['Wane']
  },
  {
    id: 'BRD-58920',
    grade: '1COMMON',
    batch: 'Batch: B-4873',
    length: '10\' 2"',
    width: '6"',
    thickness: '4/4"',
    volume: '5.2 bf',
    value: '$12.80',
    totalDefects: '1',
    face1Defects: ['Minor Knot'],
    face2Defects: ['Wane']
  },
  {
    id: 'BRD-58919',
    grade: '1COMMON',
    batch: 'Batch: B-4873',
    length: '7\' 6"',
    width: '4"',
    thickness: '4/4"',
    volume: '2.5 bf',
    value: '$3.75',
    totalDefects: '3',
    face1Defects: ['Split', 'Knot'],
    face2Defects: ['Shake']
  }
])

const currentBoard = computed(() => {
  return boards.value.find(board => board.id === selectedBoard.value)
})

// Timeline methods
const selectTimeSlot = (hour) => {
  selectedTimeSlot.value = selectedTimeSlot.value === hour ? null : hour
}

const setTimeRange = (range) => {
  selectedTimeRange.value = range
  selectedTimeSlot.value = null
  
  if (range === 'today') {
    selectedDate.value = new Date().toISOString().split('T')[0]
  } else if (range === 'yesterday') {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    selectedDate.value = yesterday.toISOString().split('T')[0]
  }
  // Add logic for 'week' if needed
}

const scrollTimeline = (direction) => {
  if (direction === 'left' && currentTimelineStart.value > 0) {
    currentTimelineStart.value--
  } else if (direction === 'right' && currentTimelineStart.value < timeSlots.value.length - 8) {
    currentTimelineStart.value++
  }
}

const applyDateRange = () => {
  showDatePicker.value = false
  selectedTimeRange.value = 'custom'
}
</script>