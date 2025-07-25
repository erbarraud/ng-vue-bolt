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
        <h3 class="text-lg font-semibold text-gray-900">Timeline Navigator</h3>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">{{ formatTimeRange(selectedTimeSlot) }}</span>
          <button @click="showTimeline = !showTimeline" class="p-1 hover:bg-gray-100 rounded">
            <ChevronDown :class="showTimeline ? 'rotate-180' : ''" class="w-4 h-4 text-gray-400 transition-transform" />
          </button>
        </div>
      </div>
      
      <div v-if="showTimeline" class="space-y-4">
        <!-- Date Selector -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <Calendar class="w-4 h-4 text-gray-400" />
            <input 
              type="date" 
              v-model="selectedDate"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button 
            @click="setToday"
            class="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Today
          </button>
          <button 
            @click="clearTimeFilter"
            class="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Clear Filter
          </button>
        </div>

        <!-- Timeline Slider -->
        <div class="space-y-3">
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>6:00 AM</span>
            <span>6:00 PM</span>
          </div>
          
          <!-- Time Slots Grid -->
          <div class="grid grid-cols-12 gap-1">
            <button
              v-for="hour in timeSlots"
              :key="hour.value"
              @click="selectTimeSlot(hour.value)"
              :class="[
                'h-8 rounded text-xs font-medium transition-all duration-200',
                selectedTimeSlot === hour.value
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
              :title="`${hour.label} - ${hour.boards} boards`"
            >
              <div class="flex flex-col items-center">
                <span class="text-xs">{{ hour.short }}</span>
                <span class="text-xs opacity-75">{{ hour.boards }}</span>
              </div>
            </button>
          </div>
          
          <!-- Legend -->
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>Click a time slot to filter boards from that hour</span>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-gray-100 rounded"></div>
                <span>Available</span>
              </div>
              <div class="flex items-center space-x-1">
                <div class="w-3 h-3 bg-emerald-600 rounded"></div>
                <span>Selected</span>
              </div>
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
        <div class="bg-white rounded-lg shadow border-2 border-emerald-300" v-if="currentBoard">
          <div class="p-6">
            <!-- Board Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-4">
                <h2 class="text-2xl font-bold text-gray-900">Board {{ currentBoard.id }}</h2>
                <span class="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded">{{ currentBoard.grade }}</span>
              </div>
            </div>

            <!-- Board Specifications -->
            <div class="grid grid-cols-6 gap-6 mb-6">
              <div class="text-center">
                <div class="flex items-center justify-center mb-1">
                  <Ruler class="w-4 h-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-600">Length</span>
                </div>
                <div class="font-semibold text-gray-900">{{ currentBoard.length }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-1">
                  <Ruler class="w-4 h-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-600">Width</span>
                </div>
                <div class="font-semibold text-gray-900">{{ currentBoard.width }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-1">
                  <Layers class="w-4 h-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-600">Thickness</span>
                </div>
                <div class="font-semibold text-gray-900">{{ currentBoard.thickness }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-1">
                  <Package class="w-4 h-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-600">Volume</span>
                </div>
                <div class="font-semibold text-gray-900">{{ currentBoard.volume }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-1">
                  <DollarSign class="w-4 h-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-600">Value</span>
                </div>
                <div class="font-semibold text-emerald-600">{{ currentBoard.value }}</div>
              </div>
              <div class="text-center">
                <div class="flex items-center justify-center mb-1">
                  <AlertCircle class="w-4 h-4 text-gray-400 mr-1" />
                  <span class="text-sm text-gray-600">Total Defects</span>
                </div>
                <div class="font-semibold text-gray-900">{{ currentBoard.totalDefects }}</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center space-x-4 mb-6">
              <Button variant="outline" size="sm">
                <EyeOff class="w-4 h-4 mr-2" />
                Hide filtered defects
              </Button>
              <Button variant="outline" size="sm" class="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                <CheckCircle class="w-4 h-4 mr-2" />
                Agree with NG AI
              </Button>
              <Button variant="outline" size="sm" class="border-red-300 text-red-600 hover:bg-red-50">
                <XCircle class="w-4 h-4 mr-2" />
                Disagree with NG AI
              </Button>
              <Button variant="outline" size="sm">
                <FileText class="w-4 h-4 mr-2" />
                See Rejected Grades
              </Button>
            </div>

            <!-- Board Images -->
            <div class="space-y-6 mb-6">
              <!-- Face 1 -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Face 1</h4>
                <div class="h-32 rounded-lg border border-gray-300 mb-3 overflow-hidden bg-gray-50 relative">
                  <img src="/image.png" alt="Board Face 1 - Lumber scan showing defects" class="w-full h-full object-cover" />
                  
                  <!-- Defect Overlay Areas -->
                  <div v-if="isDefectVisible('face1', 'Knot')" class="absolute top-2 left-4 w-6 h-6 bg-red-500 bg-opacity-70 rounded-full border-2 border-red-600"></div>
                  <div v-if="isDefectVisible('face1', 'Split')" class="absolute top-6 right-8 w-8 h-2 bg-orange-500 bg-opacity-70 border border-orange-600"></div>
                  <div v-if="isDefectVisible('face1', 'Wane')" class="absolute bottom-3 left-2 w-12 h-4 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform -skew-x-12"></div>
                  <div v-if="isDefectVisible('face1', 'Stain')" class="absolute top-8 left-12 w-10 h-8 bg-purple-500 bg-opacity-60 rounded-lg border border-purple-600"></div>
                  <div v-if="isDefectVisible('face1', 'Pitch Pocket')" class="absolute bottom-6 right-6 w-4 h-6 bg-blue-500 bg-opacity-70 rounded border border-blue-600"></div>
                  <div v-if="isDefectVisible('face1', 'Shake')" class="absolute top-12 right-4 w-1 h-8 bg-gray-600 bg-opacity-80 border border-gray-700"></div>
                </div>
                
                <!-- Inline Defect Tags -->
                <div class="flex flex-wrap gap-1 text-xs">
                  <button
                    v-for="defect in defectTypes"
                    :key="defect.name"
                    @click="toggleDefect('face1', defect.name)"
                    :class="[
                      'px-2 py-1 rounded flex items-center transition-all duration-200',
                      isDefectVisible('face1', defect.name) 
                        ? defect.activeClass 
                        : 'bg-gray-200 text-gray-500'
                    ]"
                  >
                    <Eye v-if="isDefectVisible('face1', defect.name)" class="w-3 h-3 mr-1" />
                    <EyeOff v-else class="w-3 h-3 mr-1" />
                    {{ defect.name }}
                  </button>
                </div>
              </div>

              <!-- Face 2 -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Face 2</h4>
                <div class="h-32 rounded-lg border border-gray-300 mb-3 overflow-hidden bg-gray-50 relative">
                  <img src="/image.png" alt="Board Face 2 - Lumber scan showing defects" class="w-full h-full object-cover" />
                  
                  <!-- Defect Overlay Areas -->
                  <div v-if="isDefectVisible('face2', 'Knot')" class="absolute top-4 right-6 w-5 h-5 bg-red-500 bg-opacity-70 rounded-full border-2 border-red-600"></div>
                  <div v-if="isDefectVisible('face2', 'Split')" class="absolute bottom-4 left-6 w-10 h-1 bg-orange-500 bg-opacity-70 border border-orange-600"></div>
                  <div v-if="isDefectVisible('face2', 'Wane')" class="absolute bottom-2 right-3 w-8 h-6 bg-yellow-500 bg-opacity-70 border border-yellow-600 transform skew-y-12"></div>
                  <div v-if="isDefectVisible('face2', 'Stain')" class="absolute top-6 left-8 w-12 h-6 bg-purple-500 bg-opacity-60 rounded border border-purple-600"></div>
                  <div v-if="isDefectVisible('face2', 'Pitch Pocket')" class="absolute top-10 right-12 w-3 h-4 bg-blue-500 bg-opacity-70 rounded border border-blue-600"></div>
                  <div v-if="isDefectVisible('face2', 'Shake')" class="absolute bottom-8 left-4 w-1 h-6 bg-gray-600 bg-opacity-80 border border-gray-700"></div>
                </div>
                
                <!-- Inline Defect Tags -->
                <div class="flex flex-wrap gap-1 text-xs">
                  <button
                    v-for="defect in defectTypes"
                    :key="defect.name"
                    @click="toggleDefect('face2', defect.name)"
                    :class="[
                      'px-2 py-1 rounded flex items-center transition-all duration-200',
                      isDefectVisible('face2', defect.name) 
                        ? defect.activeClass 
                        : 'bg-gray-200 text-gray-500'
                    ]"
                  >
                    <Eye v-if="isDefectVisible('face2', defect.name)" class="w-3 h-3 mr-1" />
                    <EyeOff v-else class="w-3 h-3 mr-1" />
                    {{ defect.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Clear Cuttings -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Face 1 Clear Cuttings -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Clear Cuttings (Face 1)</h4>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">6' 2 3/4" × 5 3/8"</span>
                      <span class="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">33.28 units</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">2' × 4 13/16"</span>
                      <span class="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">9.64 units</span>
                    </div>
                  </div>
                  <div class="mt-4 pt-3 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-gray-900">Total Units:</span>
                      <span class="font-bold text-emerald-600 text-lg">43</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Face 2 Clear Cuttings -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Clear Cuttings (Face 2)</h4>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">3' 3 3/4" × 5 3/16"</span>
                      <span class="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">17.2 units</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-gray-600">3' 5 3/4" × 4 7/8"</span>
                      <span class="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-medium">16.83 units</span>
                    </div>
                  </div>
                  <div class="mt-4 pt-3 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                      <span class="font-medium text-gray-900">Total Units:</span>
                      <span class="font-bold text-emerald-600 text-lg">34</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Inspection Button -->
            <div class="text-right">
              <Button asChild>
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
  AlertCircle, EyeOff, CheckCircle, XCircle, FileText, Eye
} from 'lucide-vue-next'

const searchQuery = ref('')
const selectedBoard = ref('BRD-4625')
const showTimeline = ref(false)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedTimeSlot = ref(null)

// Time slots for the timeline (6 AM to 6 PM)
const timeSlots = ref([
  { value: 6, label: '6:00 AM', short: '6A', boards: 12 },
  { value: 7, label: '7:00 AM', short: '7A', boards: 18 },
  { value: 8, label: '8:00 AM', short: '8A', boards: 24 },
  { value: 9, label: '9:00 AM', short: '9A', boards: 31 },
  { value: 10, label: '10:00 AM', short: '10A', boards: 28 },
  { value: 11, label: '11:00 AM', short: '11A', boards: 22 },
  { value: 12, label: '12:00 PM', short: '12P', boards: 15 },
  { value: 13, label: '1:00 PM', short: '1P', boards: 19 },
  { value: 14, label: '2:00 PM', short: '2P', boards: 26 },
  { value: 15, label: '3:00 PM', short: '3P', boards: 33 },
  { value: 16, label: '4:00 PM', short: '4P', boards: 29 },
  { value: 17, label: '5:00 PM', short: '5P', boards: 21 }
])

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

const setToday = () => {
  selectedDate.value = new Date().toISOString().split('T')[0]
}

const clearTimeFilter = () => {
  selectedTimeSlot.value = null
}

const formatTimeRange = (hour) => {
  if (!hour) return 'All times'
  const slot = timeSlots.value.find(s => s.value === hour)
  if (!slot) return 'All times'
  const nextHour = hour + 1
  const nextLabel = nextHour > 12 ? `${nextHour - 12}:00 PM` : nextHour === 12 ? '12:00 PM' : `${nextHour}:00 AM`
  return `${slot.label} - ${nextLabel}`
}
</script>