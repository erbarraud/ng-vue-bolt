<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button @click="$router.go(-1)" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Order Builder</h1>
            <p class="text-sm text-gray-600">Build your order by combining sorts, grades, and color sorting</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="saveAsDraft" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            Save Draft
          </button>
          <button @click="createOrder" :disabled="!canCreateOrder" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Create Order
          </button>
        </div>
      </div>
    </div>

    <div class="flex h-[calc(100vh-80px)]">
      <!-- Left Panel - Component Library -->
      <div class="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Component Library</h2>
          
          <!-- Search -->
          <div class="relative mb-6">
            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Find components..."
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Sorts Section -->
          <div class="mb-6">
            <button @click="sortsExpanded = !sortsExpanded" class="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center">
                <span class="text-2xl mr-2">📋</span>
                <span class="font-medium text-blue-900">SORTS</span>
                <span class="ml-2 text-sm text-blue-600">({{ availableSorts.length }})</span>
              </div>
              <svg :class="sortsExpanded ? 'rotate-180' : ''" class="w-4 h-4 text-blue-600 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div v-if="sortsExpanded" class="mt-3 space-y-2">
              <div 
                v-for="sort in filteredSorts" 
                :key="sort.id"
                @dragstart="handleDragStart($event, 'sort', sort)"
                @dragend="handleDragEnd"
                draggable="true"
                class="p-3 border-2 border-blue-200 rounded-lg cursor-move hover:border-blue-300 hover:shadow-md transition-all bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">📋 {{ sort.name }}</h4>
                  <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{{ sort.quality }}</span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                  <div>Length: {{ sort.length }}</div>
                  <div>Knot limit: {{ sort.knotLimit }}</div>
                </div>
                <div class="mt-2 text-xs text-blue-600 font-medium">+ Drag to Order</div>
              </div>
              
              <button @click="showCreateSortModal = true" class="w-full p-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <span class="text-sm font-medium">+ Create New Sort</span>
              </button>
            </div>
          </div>

          <!-- Standard Grades Section -->
          <div class="mb-6">
            <button @click="gradesExpanded = !gradesExpanded" class="flex items-center justify-between w-full p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <div class="flex items-center">
                <span class="text-2xl mr-2">⭐</span>
                <span class="font-medium text-yellow-900">STANDARD GRADES</span>
                <span class="ml-2 text-sm text-yellow-600">({{ standardGrades.length }})</span>
              </div>
              <svg :class="gradesExpanded ? 'rotate-180' : ''" class="w-4 h-4 text-yellow-600 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div v-if="gradesExpanded" class="mt-3 space-y-2">
              <div 
                v-for="grade in filteredGrades" 
                :key="grade.id"
                @dragstart="handleDragStart($event, 'grade', grade)"
                @dragend="handleDragEnd"
                draggable="true"
                class="p-3 border-2 border-yellow-200 rounded-lg cursor-move hover:border-yellow-300 hover:shadow-md transition-all bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">⭐ {{ grade.name }}</h4>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                  <div>Min clear face: {{ grade.clearFaceReq }}</div>
                  <div>Min size: {{ grade.minBoardSize }}</div>
                </div>
                <div class="mt-2 text-xs text-yellow-600 font-medium">+ Drag to Order</div>
              </div>
            </div>
          </div>

          <!-- Color Sorting Section -->
          <div class="mb-6">
            <button @click="colorExpanded = !colorExpanded" class="flex items-center justify-between w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div class="flex items-center">
                <span class="text-2xl mr-2">🎨</span>
                <span class="font-medium text-purple-900">COLOR SORTING</span>
                <span class="ml-2 text-sm text-purple-600">({{ colorSortingOptions.length }})</span>
              </div>
              <svg :class="colorExpanded ? 'rotate-180' : ''" class="w-4 h-4 text-purple-600 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div v-if="colorExpanded" class="mt-3 space-y-2">
              <div 
                v-for="colorOption in filteredColorOptions" 
                :key="colorOption.id"
                @dragstart="handleDragStart($event, 'color', colorOption)"
                @dragend="handleDragEnd"
                draggable="true"
                class="p-3 border-2 border-purple-200 rounded-lg cursor-move hover:border-purple-300 hover:shadow-md transition-all bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">🎨 {{ colorOption.name }}</h4>
                </div>
                <div class="text-xs text-gray-600">
                  {{ colorOption.description }}
                </div>
                <div class="mt-2 text-xs text-purple-600 font-medium">+ Drag to Order</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Panel - Order Builder Canvas -->
      <div class="flex-1 p-6">
        <div class="bg-white rounded-lg border-2 border-gray-200 h-full">
          <!-- Canvas Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <input 
                  v-model="orderName"
                  type="text" 
                  placeholder="Enter order name..."
                  class="text-xl font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                />
                <div class="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <span>{{ orderComponents.length }} components</span>
                  <span>Est. {{ totalVolume.toFixed(1) }} m³</span>
                  <span>{{ estimatedDuration.toFixed(1) }} hours</span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="text-sm text-gray-600">Complexity:</div>
                <div class="flex items-center">
                  <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div :style="{ width: complexityPercentage + '%' }" :class="complexityColor" class="h-full transition-all"></div>
                  </div>
                  <span class="ml-2 text-sm font-medium" :class="complexityTextColor">{{ complexityLevel }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Drop Zone -->
          <div 
            class="p-6 min-h-96"
            @dragover="handleDragOver"
            @drop="handleDrop"
            :class="isDragOver ? 'bg-blue-50 border-blue-300' : ''"
          >
            <div v-if="orderComponents.length === 0" class="text-center py-20">
              <div class="text-6xl mb-4">🧩</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Build Your Order</h3>
              <p class="text-gray-600 mb-4">Drag components from the library to create your order</p>
              <div class="text-sm text-gray-500">
                Combine <span class="text-blue-600 font-medium">📋 Sorts</span>, 
                <span class="text-yellow-600 font-medium">⭐ Grades</span>, and 
                <span class="text-purple-600 font-medium">🎨 Color Sorting</span>
              </div>
            </div>

            <!-- Order Components -->
            <div v-else class="space-y-4">
              <div 
                v-for="(component, index) in orderComponents" 
                :key="component.id + '_' + index"
                class="flex items-center p-4 border-2 rounded-lg transition-all"
                :class="getComponentClasses(component.type)"
              >
                <!-- Drag Handle -->
                <div class="cursor-move mr-3 text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                  </svg>
                </div>

                <!-- Component Icon and Info -->
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <span class="text-xl mr-3">{{ getComponentIcon(component.type) }}</span>
                      <div>
                        <h4 class="font-medium text-gray-900">{{ component.name }}</h4>
                        <div class="text-sm text-gray-600">
                          Volume: {{ component.volume }} m³
                          <span v-if="component.priority" class="ml-2">• Priority: {{ component.priority }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <!-- Edit Button -->
                      <button 
                        @click="editComponent(component, index)"
                        class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit component"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <!-- Remove Button -->
                      <button 
                        @click="removeComponent(index)"
                        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove component"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add Component Button -->
              <button 
                @click="showComponentSelector = true"
                class="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <span class="text-lg">+ Add Component</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Live Preview & Summary -->
      <div class="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <!-- Overview Card -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="text-gray-600">Total Volume</div>
                <div class="font-semibold text-gray-900">{{ totalVolume.toFixed(1) }} m³</div>
              </div>
              <div>
                <div class="text-gray-600">Components</div>
                <div class="font-semibold text-gray-900">{{ orderComponents.length }}</div>
              </div>
              <div>
                <div class="text-gray-600">Est. Duration</div>
                <div class="font-semibold text-gray-900">{{ estimatedDuration.toFixed(1) }} hrs</div>
              </div>
              <div>
                <div class="text-gray-600">Complexity</div>
                <div class="font-semibold" :class="complexityTextColor">{{ complexityLevel }}</div>
              </div>
            </div>
          </div>

          <!-- Component Breakdown -->
          <div v-if="orderComponents.length > 0" class="mb-6">
            <h3 class="font-medium text-gray-900 mb-3">Component Breakdown</h3>
            <div class="space-y-2">
              <div v-for="(component, index) in orderComponents" :key="index" class="flex items-center justify-between text-sm">
                <div class="flex items-center">
                  <span class="mr-2">{{ getComponentIcon(component.type) }}</span>
                  <span class="text-gray-900">{{ component.name }}</span>
                </div>
                <div class="text-gray-600">
                  {{ component.volume }} m³ ({{ ((component.volume / totalVolume) * 100).toFixed(0) }}%)
                </div>
              </div>
            </div>
          </div>

          <!-- Processing Timeline -->
          <div v-if="orderComponents.length > 0" class="mb-6">
            <h3 class="font-medium text-gray-900 mb-3">Processing Timeline</h3>
            <div class="space-y-3">
              <div v-for="(component, index) in orderComponents" :key="index" class="flex items-center justify-between text-sm">
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-3">
                    {{ index + 1 }}
                  </div>
                  <span class="text-gray-900">{{ component.name }}</span>
                </div>
                <div class="text-gray-600">{{ (component.volume * 0.15).toFixed(1) }} hrs</div>
              </div>
              <div class="border-t pt-2 flex items-center justify-between font-medium">
                <span class="text-gray-900">Total Processing Time</span>
                <span class="text-gray-900">{{ estimatedDuration.toFixed(1) }} hrs</span>
              </div>
            </div>
          </div>

          <!-- Compatibility Checker -->
          <div class="mb-6">
            <h3 class="font-medium text-gray-900 mb-3">Compatibility Check</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">All components compatible</span>
              </div>
              <div v-if="hasColorSorting" class="flex items-center">
                <svg class="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <span class="text-gray-700">Color sorting may extend processing time</span>
              </div>
            </div>
          </div>

          <!-- Order Actions -->
          <div class="space-y-3">
            <button 
              @click="showOrderDetailsModal = true"
              :disabled="orderComponents.length === 0"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Order Details
            </button>
            <button 
              @click="saveAsTemplate"
              :disabled="orderComponents.length === 0"
              class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save as Template
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Edit Modal -->
    <div v-if="editingComponent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Edit Component</h3>
          <button @click="editingComponent = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Volume for this component</label>
            <div class="flex space-x-2">
              <input 
                v-model="editingComponent.volume"
                type="number" 
                step="0.1"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span class="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">m³</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              v-model="editingComponent.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
            <textarea 
              v-model="editingComponent.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special requirements..."
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="editingComponent = null"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="saveComponentEdit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="showOrderDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Order Details</h3>
          <button @click="showOrderDetailsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Client *</label>
            <select 
              v-model="orderDetails.clientId"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select client...</option>
              <option v-for="client in clients" :key="client.id" :value="client.id">
                {{ client.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Required Date *</label>
            <input 
              v-model="orderDetails.requiredDate"
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <input 
              v-model="orderDetails.contactPerson"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contact person name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
            <select 
              v-model="orderDetails.priority"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Standard">Standard</option>
              <option value="Rush">Rush</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea 
            v-model="orderDetails.specialInstructions"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special requirements or notes..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="showOrderDetailsModal = false"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="finalizeOrder"
            :disabled="!orderDetails.clientId || !orderDetails.requiredDate"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Component state
const searchQuery = ref('')
const sortsExpanded = ref(true)
const gradesExpanded = ref(true)
const colorExpanded = ref(true)
const isDragOver = ref(false)
const editingComponent = ref(null)
const editingIndex = ref(-1)
const showOrderDetailsModal = ref(false)
const showCreateSortModal = ref(false)
const showComponentSelector = ref(false)

// Order data
const orderName = ref('Untitled Order')
const orderComponents = ref([])
const orderDetails = ref({
  clientId: '',
  contactPerson: '',
  requiredDate: '',
  priority: 'Standard',
  specialInstructions: ''
})

// Sample data
const clients = ref([
  { id: 'client1', name: 'Johnson Lumber Co.' },
  { id: 'client2', name: 'Artisan Furniture Ltd.' },
  { id: 'client3', name: 'Premium Hardwoods Inc.' },
  { id: 'client4', name: 'Cabinet Masters LLC' },
  { id: 'client5', name: 'Construction Supply Co.' }
])

const availableSorts = ref([
  {
    id: 'sort1',
    name: 'Premium Oak Sort',
    quality: 'Premium',
    length: '200-400cm',
    knotLimit: '<30cm',
    defaultVolume: 10
  },
  {
    id: 'sort2',
    name: 'Cabinet Grade Select',
    quality: 'Premium',
    length: '150-300cm',
    knotLimit: '<20cm',
    defaultVolume: 8
  },
  {
    id: 'sort3',
    name: 'Construction Standard',
    quality: 'Standard',
    length: '200-600cm',
    knotLimit: '<50cm',
    defaultVolume: 15
  },
  {
    id: 'sort4',
    name: 'Furniture Hardwood',
    quality: 'Premium',
    length: '100-250cm',
    knotLimit: '<25cm',
    defaultVolume: 12
  },
  {
    id: 'sort5',
    name: 'Economy Utility',
    quality: 'Economy',
    length: '150-400cm',
    knotLimit: '<60cm',
    defaultVolume: 20
  }
])

const standardGrades = ref([
  {
    id: 'fas',
    name: 'FAS (First and Seconds)',
    clearFaceReq: '83.3%',
    minBoardSize: '6" x 8\'',
    defaultVolume: 5
  },
  {
    id: 'fas_one_face',
    name: 'FAS One Face (F1F)',
    clearFaceReq: '83.3% one face',
    minBoardSize: '6" x 8\'',
    defaultVolume: 6
  },
  {
    id: 'select_better',
    name: 'Select and Better',
    clearFaceReq: '83.3%',
    minBoardSize: '4" x 6\'',
    defaultVolume: 7
  },
  {
    id: 'no1_common',
    name: 'No. 1 Common',
    clearFaceReq: '66.7%',
    minBoardSize: '3" x 4\'',
    defaultVolume: 8
  },
  {
    id: 'no2a_common',
    name: 'No. 2A Common',
    clearFaceReq: '50%',
    minBoardSize: '3" x 4\'',
    defaultVolume: 10
  },
  {
    id: 'no2b_common',
    name: 'No. 2B Common',
    clearFaceReq: '25%',
    minBoardSize: '2" x 4\'',
    defaultVolume: 12
  }
])

const colorSortingOptions = ref([
  {
    id: 'heartwood_dominant',
    name: 'Heartwood Dominant',
    description: '>70% heartwood showing',
    defaultVolume: 5
  },
  {
    id: 'uniform_color',
    name: 'Uniform Color',
    description: 'Minimal color variation',
    defaultVolume: 4
  },
  {
    id: 'sapwood_focus',
    name: 'Light Sapwood Focus',
    description: 'Emphasize lighter sapwood',
    defaultVolume: 3
  },
  {
    id: 'balanced_mix',
    name: 'Balanced Mix',
    description: 'Even heartwood/sapwood blend',
    defaultVolume: 6
  },
  {
    id: 'high_variation',
    name: 'High Variation',
    description: 'Mixed colors acceptable',
    defaultVolume: 8
  }
])

// Computed properties
const filteredSorts = computed(() => {
  if (!searchQuery.value) return availableSorts.value
  return availableSorts.value.filter(sort => 
    sort.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredGrades = computed(() => {
  if (!searchQuery.value) return standardGrades.value
  return standardGrades.value.filter(grade => 
    grade.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredColorOptions = computed(() => {
  if (!searchQuery.value) return colorSortingOptions.value
  return colorSortingOptions.value.filter(option => 
    option.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    option.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalVolume = computed(() => {
  return orderComponents.value.reduce((sum, component) => sum + (component.volume || 0), 0)
})

const estimatedDuration = computed(() => {
  return orderComponents.value.reduce((sum, component) => sum + (component.volume * 0.15), 0)
})

const complexityPercentage = computed(() => {
  const baseComplexity = orderComponents.value.length * 10
  const colorComplexity = orderComponents.value.filter(c => c.type === 'color').length * 20
  const gradeComplexity = orderComponents.value.filter(c => c.type === 'grade').length * 15
  return Math.min(baseComplexity + colorComplexity + gradeComplexity, 100)
})

const complexityLevel = computed(() => {
  const percentage = complexityPercentage.value
  if (percentage < 30) return 'Low'
  if (percentage < 60) return 'Medium'
  return 'High'
})

const complexityColor = computed(() => {
  const level = complexityLevel.value
  if (level === 'Low') return 'bg-green-500'
  if (level === 'Medium') return 'bg-yellow-500'
  return 'bg-red-500'
})

const complexityTextColor = computed(() => {
  const level = complexityLevel.value
  if (level === 'Low') return 'text-green-600'
  if (level === 'Medium') return 'text-yellow-600'
  return 'text-red-600'
})

const hasColorSorting = computed(() => {
  return orderComponents.value.some(component => component.type === 'color')
})

const canCreateOrder = computed(() => {
  return orderComponents.value.length > 0 && orderName.value.trim()
})

// Methods
const handleDragStart = (event, type, item) => {
  event.dataTransfer.setData('application/json', JSON.stringify({ type, item }))
  event.dataTransfer.effectAllowed = 'copy'
}

const handleDragEnd = (event) => {
  event.target.style.opacity = '1'
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
  isDragOver.value = true
}

const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  
  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    addComponent(data.type, data.item)
  } catch (error) {
    console.error('Error parsing drop data:', error)
  }
}

const addComponent = (type, item) => {
  const component = {
    id: item.id,
    type: type,
    name: item.name,
    volume: item.defaultVolume || 5,
    priority: 'Medium',
    notes: '',
    originalData: item
  }
  
  orderComponents.value.push(component)
}

const removeComponent = (index) => {
  orderComponents.value.splice(index, 1)
}

const editComponent = (component, index) => {
  editingComponent.value = { ...component }
  editingIndex.value = index
}

const saveComponentEdit = () => {
  if (editingIndex.value >= 0) {
    orderComponents.value[editingIndex.value] = { ...editingComponent.value }
  }
  editingComponent.value = null
  editingIndex.value = -1
}

const getComponentIcon = (type) => {
  switch (type) {
    case 'sort': return '📋'
    case 'grade': return '⭐'
    case 'color': return '🎨'
    default: return '🧩'
  }
}

const getComponentClasses = (type) => {
  switch (type) {
    case 'sort': return 'border-blue-200 bg-blue-50'
    case 'grade': return 'border-yellow-200 bg-yellow-50'
    case 'color': return 'border-purple-200 bg-purple-50'
    default: return 'border-gray-200 bg-gray-50'
  }
}

const saveAsDraft = () => {
  // Implementation for saving as draft
  alert('Order saved as draft!')
}

const saveAsTemplate = () => {
  // Implementation for saving as template
  alert('Order saved as template!')
}

const createOrder = () => {
  if (orderComponents.value.length === 0) {
    alert('Please add at least one component to your order.')
    return
  }
  showOrderDetailsModal.value = true
}

const finalizeOrder = () => {
  if (!orderDetails.value.clientId || !orderDetails.value.requiredDate) {
    alert('Please fill in all required fields.')
    return
  }

  // Create the order
  const order = {
    name: orderName.value,
    components: orderComponents.value,
    details: orderDetails.value,
    totalVolume: totalVolume.value,
    estimatedDuration: estimatedDuration.value,
    complexity: complexityLevel.value
  }

  console.log('Creating order:', order)
  alert('Order created successfully!')
  router.push('/orders')
}

// Initialize with tomorrow's date
onMounted(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  orderDetails.value.requiredDate = tomorrow.toISOString().split('T')[0]
})
</script>