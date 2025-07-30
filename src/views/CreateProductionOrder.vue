<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Sidebar Navigation -->
    <div class="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Create New Order</h1>
        <p class="text-sm text-gray-600 mt-1">Configure your production order</p>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <button
              @click="activeSection = 'details'"
              :class="[
                'w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200',
                activeSection === 'details'
                  ? 'bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3',
                  isStepComplete('details')
                    ? 'bg-emerald-500 text-white'
                    : activeSection === 'details'
                    ? 'bg-emerald-200 text-emerald-700'
                    : 'bg-gray-200 text-gray-600'
                ]">
                  <CheckCircle v-if="isStepComplete('details')" class="w-4 h-4" />
                  <span v-else>1</span>
                </div>
                <div>
                  <div class="font-medium">Order Details</div>
                  <div class="text-xs text-gray-500">Basic information & scheduling</div>
                </div>
              </div>
            </button>
          </li>

          <li>
            <button
              @click="activeSection = 'sorts'"
              :class="[
                'w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200',
                activeSection === 'sorts'
                  ? 'bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3',
                  isStepComplete('sorts')
                    ? 'bg-emerald-500 text-white'
                    : activeSection === 'sorts'
                    ? 'bg-emerald-200 text-emerald-700'
                    : 'bg-gray-200 text-gray-600'
                ]">
                  <CheckCircle v-if="isStepComplete('sorts')" class="w-4 h-4" />
                  <span v-else>2</span>
                </div>
                <div>
                  <div class="font-medium">Define Sorts</div>
                  <div class="text-xs text-gray-500">Product specifications</div>
                </div>
              </div>
            </button>
          </li>

          <li>
            <button
              @click="activeSection = 'grades'"
              :class="[
                'w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200',
                activeSection === 'grades'
                  ? 'bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3',
                  isStepComplete('grades')
                    ? 'bg-emerald-500 text-white'
                    : activeSection === 'grades'
                    ? 'bg-emerald-200 text-emerald-700'
                    : 'bg-gray-200 text-gray-600'
                ]">
                  <CheckCircle v-if="isStepComplete('grades')" class="w-4 h-4" />
                  <span v-else>3</span>
                </div>
                <div>
                  <div class="font-medium">Optional Grades</div>
                  <div class="text-xs text-gray-500">Grade library selection</div>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Order Summary -->
      <div class="p-4 border-t border-gray-200 bg-gray-50">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Order Summary</h3>
        <div class="space-y-1 text-xs text-gray-600">
          <div v-if="orderData.name">Name: {{ orderData.name }}</div>
          <div v-if="orderData.clientId">Client: {{ getClientName(orderData.clientId) }}</div>
          <div v-if="orderData.sorts.length > 0">Sorts: {{ orderData.sorts.length }}</div>
          <div v-if="orderData.selectedGrades.length > 0">Grades: {{ orderData.selectedGrades.length }}</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="p-4 border-t border-gray-200">
        <div class="space-y-2">
          <button 
            @click="createOrder"
            :disabled="!canCreateOrder"
            :class="[
              'w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              canCreateOrder
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Create Order
          </button>
          <button class="w-full px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Save as Draft
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 overflow-auto">
      <div class="max-w-5xl mx-auto p-6">
        <!-- Order Details Section -->
        <div v-if="activeSection === 'details'" class="bg-white rounded-lg shadow-sm p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Order Details</h2>
            <p class="text-gray-600">Configure the basic information for your production order</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Basic Information -->
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Order Name *</label>
                <input 
                  v-model="orderData.name"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter order name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Custom Order ID</label>
                <input 
                  v-model="orderData.customId"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Optional custom ID"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Client *</label>
                <select 
                  v-model="orderData.clientId"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select client...</option>
                  <option v-for="client in clients" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Client Information -->
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Client Information</h3>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input 
                  v-model="orderData.contactPerson"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Contact person name"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Project Reference</label>
                <input 
                  v-model="orderData.projectReference"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Project reference number"
                />
              </div>
            </div>
          </div>

          <!-- Scheduling -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-6">Scheduling</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Required Date *</label>
                <input 
                  v-model="orderData.requiredDate"
                  type="date" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select 
                  v-model="orderData.priority"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="standard">Standard</option>
                  <option value="rush">Rush</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Line</label>
                <select 
                  v-model="orderData.preferredLine"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="auto">Auto Assignment</option>
                  <option value="line1">Line 1</option>
                  <option value="line2">Line 2</option>
                  <option value="line3">Line 3</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Volume and Species -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-6">Volume and Species</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Expected Volume</label>
                <div class="flex space-x-2">
                  <input 
                    v-model="orderData.expectedVolume"
                    type="number" 
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                  <select 
                    v-model="orderData.volumeUnit"
                    class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="m3">m³</option>
                    <option value="bf">Board Feet</option>
                    <option value="pieces">Pieces</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Species</label>
                <select 
                  v-model="orderData.species"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select species...</option>
                  <option v-for="species in speciesList" :key="species" :value="species">
                    {{ species }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Special Instructions -->
          <div class="mt-8">
            <label class="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
            <textarea 
              v-model="orderData.specialInstructions"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Any special requirements or notes..."
            ></textarea>
          </div>
        </div>

        <!-- Define Sorts Section -->
        <div v-if="activeSection === 'sorts'" class="bg-white rounded-lg shadow-sm p-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">Define Sorts</h2>
              <p class="text-gray-600">Add the sorts you want to include in this order</p>
            </div>
            <div class="flex space-x-3">
              <button 
                @click="showExistingSorts = true"
                class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <Package class="w-4 h-4 mr-2" />
                Select Existing Sort
              </button>
              <button 
                @click="showNewSortForm = true"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Plus class="w-4 h-4 mr-2" />
                Create New Sort
              </button>
            </div>
          </div>

          <!-- Added Sorts List -->
          <div v-if="orderData.sorts.length > 0" class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Added Sorts ({{ orderData.sorts.length }})</h3>
            <div class="space-y-4">
              <div v-for="(sort, index) in orderData.sorts" :key="index" 
                   class="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 text-lg">{{ sort.name }}</h4>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ sort.targetVolume }} {{ sort.volumeUnit }} • {{ sort.qualityLevel }} Quality
                  </p>
                  <p class="text-xs text-gray-500 mt-2">{{ sort.description }}</p>
                  <div v-if="sort.specialRequirements" class="text-xs text-blue-600 mt-1">
                    Special: {{ sort.specialRequirements }}
                  </div>
                </div>
                <button 
                  @click="removeSort(index)"
                  class="px-3 py-1 bg-white border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 hover:border-red-400 transition-colors flex items-center"
                >
                  <X class="w-4 h-4 mr-1" />
                  Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <div class="text-gray-400 mb-4">
              <Package class="w-16 h-16 mx-auto" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No sorts added yet</h3>
            <p class="text-gray-600 mb-6">Add sorts to define what products you want to create from this order.</p>
            <div class="flex justify-center space-x-3">
              <button @click="showExistingSorts = true" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Select Existing Sort
              </button>
              <button @click="showNewSortForm = true" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Create New Sort
              </button>
            </div>
          </div>

          <!-- Existing Sorts Modal -->
          <div v-if="showExistingSorts" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-semibold text-gray-900">Select Existing Sort</h3>
                <button @click="showExistingSorts = false" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <X class="w-4 h-4" />
                </button>
              </div>

              <!-- Search and Filter -->
              <div class="flex space-x-4 mb-6">
                <input 
                  v-model="sortSearch"
                  type="text" 
                  placeholder="Search sorts..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <select 
                  v-model="sortFilter"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Quality Levels</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                  <option value="Economy">Economy</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <!-- Sort Templates Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div v-for="sort in filteredExistingSorts" :key="sort.id"
                     @click="selectExistingSort(sort)"
                     :class="[
                       'p-4 border-2 rounded-lg cursor-pointer transition-all',
                       selectedExistingSort?.id === sort.id 
                         ? 'border-emerald-500 bg-emerald-50' 
                         : 'border-gray-200 hover:border-gray-300'
                     ]">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-gray-900">{{ sort.name }}</h4>
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full',
                      sort.qualityLevel === 'Premium' ? 'bg-purple-100 text-purple-800' :
                      sort.qualityLevel === 'Standard' ? 'bg-blue-100 text-blue-800' :
                      sort.qualityLevel === 'Economy' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ sort.qualityLevel }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">{{ sort.description }}</p>
                  <div class="text-xs text-gray-500 space-y-1">
                    <div>Dimensions: {{ sort.dimensions }}</div>
                    <div>Defect Tolerance: {{ sort.defectTolerance }}%</div>
                    <div>Moisture: {{ sort.moistureContent }}%</div>
                  </div>
                  <div v-if="selectedExistingSort?.id === sort.id" class="mt-2 flex items-center text-emerald-600">
                    <CheckCircle class="w-4 h-4 mr-1" />
                    Selected
                  </div>
                </div>
              </div>

              <!-- Configuration for Selected Sort -->
              <div v-if="selectedExistingSort" class="border-t pt-6">
                <h4 class="font-medium text-gray-900 mb-4">Configure "{{ selectedExistingSort.name }}"</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Target Volume *</label>
                    <div class="flex space-x-2">
                      <input 
                        v-model="existingSortConfig.targetVolume"
                        type="number" 
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="0"
                      />
                      <select 
                        v-model="existingSortConfig.volumeUnit"
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="m3">m³</option>
                        <option value="bf">Board Feet</option>
                        <option value="pieces">Pieces</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                    <input 
                      v-model="existingSortConfig.specialRequirements"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Any special requirements..."
                    />
                  </div>
                </div>
              </div>

              <!-- Modal Actions -->
              <div class="flex justify-end space-x-3 mt-6">
                <button 
                  @click="showExistingSorts = false"
                  class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  @click="addExistingSort"
                  :disabled="!selectedExistingSort || !existingSortConfig.targetVolume"
                  :class="[
                    'px-4 py-2 rounded-lg transition-colors',
                    (!selectedExistingSort || !existingSortConfig.targetVolume)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  ]"
                >
                  Add Sort to Order
                </button>
              </div>
            </div>
          </div>

          <!-- New Sort Form Modal -->
          <div v-if="showNewSortForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-semibold text-gray-900">Create New Sort</h3>
                <button @click="showNewSortForm = false" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <X class="w-4 h-4" />
                </button>
              </div>

              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sort Name *</label>
                    <input 
                      v-model="newSort.name"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter sort name"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Quality Level</label>
                    <select 
                      v-model="newSort.qualityLevel"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="Premium">Premium</option>
                      <option value="Standard">Standard</option>
                      <option value="Economy">Economy</option>
                      <option value="Construction">Construction</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Target Volume *</label>
                    <div class="flex space-x-2">
                      <input 
                        v-model="newSort.targetVolume"
                        type="number" 
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="0"
                      />
                      <select 
                        v-model="newSort.volumeUnit"
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="m3">m³</option>
                        <option value="bf">Board Feet</option>
                        <option value="pieces">Pieces</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Defect Tolerance (%)</label>
                    <input 
                      v-model="newSort.defectTolerance"
                      type="number" 
                      min="0" 
                      max="100"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="5"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                    <input 
                      v-model="newSort.dimensions"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="e.g., 200-400cm × 15-25cm × 40mm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Moisture Content (%)</label>
                    <input 
                      v-model="newSort.moistureContent"
                      type="number" 
                      min="0" 
                      max="100"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="12"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    v-model="newSort.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Brief description of this sort..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                  <input 
                    v-model="newSort.specialRequirements"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Any special requirements..."
                  />
                </div>
              </div>

              <!-- Modal Actions -->
              <div class="flex justify-end space-x-3 mt-6">
                <button 
                  @click="showNewSortForm = false"
                  class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  @click="addNewSort"
                  :disabled="!newSort.name || !newSort.targetVolume"
                  :class="[
                    'px-4 py-2 rounded-lg transition-colors',
                    (!newSort.name || !newSort.targetVolume)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  ]"
                >
                  Add Sort to Order
                </button>
            </div>
          </div>
        </div>

        <!-- Optional Grade Selection Section -->
        <div v-if="activeSection === 'grades'" class="bg-white rounded-lg shadow-sm p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Optional Grade Selection</h2>
            <p class="text-gray-600">You can optionally apply predefined grades to enhance your sorts, or skip this step entirely.</p>
          </div>

          <!-- Toggle Option -->
          <div class="mb-8">
            <label class="flex items-center">
              <input 
                v-model="orderData.useGrades"
                type="checkbox" 
                class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <span class="ml-3 text-sm font-medium text-gray-700">Apply grades from library</span>
            </label>
          </div>

          <!-- Grade Selection (only if enabled) -->
          <div v-if="orderData.useGrades">
            <!-- Search and Filter -->
            <div class="flex space-x-4 mb-6">
              <input 
                v-model="gradeSearch"
                type="text" 
                placeholder="Search grades..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <select 
                v-model="gradeFilter"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Types</option>
                <option value="Hardwood">Hardwood</option>
                <option value="Softwood">Softwood</option>
                <option value="Engineered">Engineered</option>
              </select>
            </div>

            <!-- Grade Library -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div v-for="grade in filteredGrades" :key="grade.id"
                   @click="toggleGrade(grade)"
                   :class="[
                     'p-4 border-2 rounded-lg cursor-pointer transition-all',
                     orderData.selectedGrades.some(g => g.id === grade.id)
                       ? 'border-emerald-500 bg-emerald-50' 
                       : 'border-gray-200 hover:border-gray-300'
                   ]">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">{{ grade.name }}</h4>
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full',
                    grade.type === 'Hardwood' ? 'bg-green-100 text-green-800' :
                    grade.type === 'Softwood' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  ]">
                    {{ grade.type }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ grade.description }}</p>
                <div class="text-xs text-gray-500 space-y-1">
                  <div v-for="spec in grade.keySpecs" :key="spec">• {{ spec }}</div>
                </div>
                <div v-if="orderData.selectedGrades.some(g => g.id === grade.id)" class="mt-2 flex items-center text-emerald-600">
                  <CheckCircle class="w-4 h-4 mr-1" />
                  Selected
                </div>
              </div>
            </div>

            <!-- Selected Grades Summary -->
            <div v-if="orderData.selectedGrades.length > 0" class="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 class="font-medium text-gray-900 mb-2">Selected Grades ({{ orderData.selectedGrades.length }})</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="grade in orderData.selectedGrades" :key="grade.id"
                      class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  {{ grade.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Skip Message -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <CheckCircle class="w-16 h-16 mx-auto" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Grades Skipped</h3>
            <p class="text-gray-600">Your order will use only the sorts you defined without additional grade specifications.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProductionOrder',
  data() {
    return {
      activeSection: 'details',
      
      // Order data
      orderData: {
        name: '',
        customId: '',
        clientId: '',
        contactPerson: '',
        projectReference: '',
        requiredDate: '',
        priority: 'standard',
        preferredLine: 'auto',
        expectedVolume: '',
        volumeUnit: 'm3',
        species: '',
        specialInstructions: '',
        sorts: [],
        useGrades: false,
        selectedGrades: []
      },

      // Sort management
      showExistingSorts: false,
      showNewSortForm: false,
      selectedExistingSort: null,
      existingSortConfig: {
        targetVolume: '',
        volumeUnit: 'm3',
        specialRequirements: ''
      },
      newSort: {
        name: '',
        qualityLevel: 'Standard',
        targetVolume: '',
        volumeUnit: 'm3',
        defectTolerance: 5,
        dimensions: '',
        moistureContent: 12,
        description: '',
        specialRequirements: ''
      },

      // Search and filters
      sortSearch: '',
      sortFilter: '',
      gradeSearch: '',
      gradeFilter: '',

      // Sample data
      clients: [
        { id: 'client1', name: 'Johnson Lumber Co.' },
        { id: 'client2', name: 'Artisan Furniture Ltd.' },
        { id: 'client3', name: 'Premium Hardwoods Inc.' },
        { id: 'client4', name: 'Cabinet Masters LLC' },
        { id: 'client5', name: 'Construction Supply Co.' }
      ],

      speciesList: [
        'Oak', 'Maple', 'Cherry', 'Walnut', 'Pine', 'Cedar', 'Birch', 'Ash', 'Mahogany', 'Teak'
      ],

      existingSorts: [
        {
          id: 'sort1',
          name: 'Premium Flooring Sort',
          qualityLevel: 'Premium',
          description: 'High-grade flooring with minimal defects',
          dimensions: '200-400cm × 15-25cm × 20-40mm',
          defectTolerance: 2,
          moistureContent: 8
        },
        {
          id: 'sort2',
          name: 'Cabinet Grade Select',
          qualityLevel: 'Premium',
          description: 'Premium cabinet-grade lumber with excellent finish',
          dimensions: '150-300cm × 10-20cm × 15-30mm',
          defectTolerance: 3,
          moistureContent: 10
        },
        {
          id: 'sort3',
          name: 'Construction Standard',
          qualityLevel: 'Standard',
          description: 'Reliable construction-grade lumber',
          dimensions: '200-600cm × 20-30cm × 40-60mm',
          defectTolerance: 8,
          moistureContent: 15
        },
        {
          id: 'sort4',
          name: 'Furniture Hardwood',
          qualityLevel: 'Premium',
          description: 'Premium hardwood for fine furniture',
          dimensions: '100-250cm × 8-15cm × 20-50mm',
          defectTolerance: 2,
          moistureContent: 8
        },
        {
          id: 'sort5',
          name: 'Economy Utility',
          qualityLevel: 'Economy',
          description: 'Cost-effective utility lumber',
          dimensions: '150-400cm × 15-25cm × 20-40mm',
          defectTolerance: 15,
          moistureContent: 18
        },
        {
          id: 'sort6',
          name: 'Millwork Select',
          qualityLevel: 'Standard',
          description: 'Quality millwork and trim lumber',
          dimensions: '200-350cm × 5-12cm × 15-25mm',
          defectTolerance: 5,
          moistureContent: 12
        },
        {
          id: 'sort7',
          name: 'Pallet Grade',
          qualityLevel: 'Construction',
          description: 'Industrial pallet and crating lumber',
          dimensions: '100-300cm × 10-20cm × 20-40mm',
          defectTolerance: 20,
          moistureContent: 20
        },
        {
          id: 'sort8',
          name: 'Pressure Treated Decking',
          qualityLevel: 'Standard',
          description: 'Weather-resistant decking lumber',
          dimensions: '300-500cm × 12-20cm × 25-40mm',
          defectTolerance: 10,
          moistureContent: 15
        }
      ],

      gradeLibrary: [
        {
          id: 'grade1',
          name: 'FAS (First and Seconds)',
          type: 'Hardwood',
          description: 'Highest grade hardwood lumber',
          keySpecs: ['83.3% clear face', 'Min 6" wide × 8" long', 'Premium appearance']
        },
        {
          id: 'grade2',
          name: 'Select Grade',
          type: 'Hardwood',
          description: 'High-quality hardwood with minor defects',
          keySpecs: ['Good one face', 'Min 4" wide × 6" long', 'Small defects allowed']
        },
        {
          id: 'grade3',
          name: 'Common No. 1',
          type: 'Hardwood',
          description: 'Standard grade with character marks',
          keySpecs: ['66.7% clear face', 'Sound knots allowed', 'Good for staining']
        },
        {
          id: 'grade4',
          name: 'Common No. 2',
          type: 'Hardwood',
          description: 'Economy grade with more character',
          keySpecs: ['50% clear face', 'Larger defects allowed', 'Paint grade quality']
        },
        {
          id: 'grade5',
          name: 'Select Structural',
          type: 'Softwood',
          description: 'High-strength structural lumber',
          keySpecs: ['High strength rating', 'Minimal defects', 'Load-bearing applications']
        },
        {
          id: 'grade6',
          name: 'Construction Grade',
          type: 'Softwood',
          description: 'Standard construction lumber',
          keySpecs: ['Good strength properties', 'Some defects allowed', 'General framing']
        },
        {
          id: 'grade7',
          name: 'Utility Grade',
          type: 'Softwood',
          description: 'Economy structural lumber',
          keySpecs: ['Lower strength rating', 'More defects allowed', 'Non-critical applications']
        },
        {
          id: 'grade8',
          name: 'Engineered Composite',
          type: 'Engineered',
          description: 'Manufactured composite lumber',
          keySpecs: ['Consistent properties', 'Moisture resistant', 'Dimensional stability']
        }
      ]
    }
  },

  computed: {
    canCreateOrder() {
      return this.orderData.name && 
             this.orderData.clientId && 
             this.orderData.requiredDate && 
             this.orderData.sorts.length > 0
    },

    filteredExistingSorts() {
      let filtered = this.existingSorts

      if (this.sortSearch) {
        filtered = filtered.filter(sort => 
          sort.name.toLowerCase().includes(this.sortSearch.toLowerCase()) ||
          sort.description.toLowerCase().includes(this.sortSearch.toLowerCase())
        )
      }

      if (this.sortFilter) {
        filtered = filtered.filter(sort => sort.qualityLevel === this.sortFilter)
      }

      return filtered
    },

    filteredGrades() {
      let filtered = this.gradeLibrary

      if (this.gradeSearch) {
        filtered = filtered.filter(grade => 
          grade.name.toLowerCase().includes(this.gradeSearch.toLowerCase()) ||
          grade.description.toLowerCase().includes(this.gradeSearch.toLowerCase())
        )
      }

      if (this.gradeFilter) {
        filtered = filtered.filter(grade => grade.type === this.gradeFilter)
      }

      return filtered
    }
  },

  methods: {
    isStepComplete(step) {
      switch (step) {
        case 'details':
          return this.orderData.name && this.orderData.clientId && this.orderData.requiredDate
        case 'sorts':
          return this.orderData.sorts.length > 0
        case 'grades':
          return true // Optional step is always "complete"
        default:
          return false
      }
    },

    getClientName(clientId) {
      const client = this.clients.find(c => c.id === clientId)
      return client ? client.name : ''
    },

    selectExistingSort(sort) {
      this.selectedExistingSort = sort
      this.existingSortConfig = {
        targetVolume: '',
        volumeUnit: 'm3',
        specialRequirements: ''
      }
    },

    addExistingSort() {
      if (this.selectedExistingSort && this.existingSortConfig.targetVolume) {
        const sortToAdd = {
          ...this.selectedExistingSort,
          targetVolume: this.existingSortConfig.targetVolume,
          volumeUnit: this.existingSortConfig.volumeUnit,
          specialRequirements: this.existingSortConfig.specialRequirements
        }
        
        this.orderData.sorts.push(sortToAdd)
        this.showExistingSorts = false
        this.selectedExistingSort = null
        this.existingSortConfig = {
          targetVolume: '',
          volumeUnit: 'm3',
          specialRequirements: ''
        }
      }
    },

    addNewSort() {
      if (this.newSort.name && this.newSort.targetVolume) {
        this.orderData.sorts.push({
          ...this.newSort,
          id: 'custom_' + Date.now()
        })
        
        this.showNewSortForm = false
        this.newSort = {
          name: '',
          qualityLevel: 'Standard',
          targetVolume: '',
          volumeUnit: 'm3',
          defectTolerance: 5,
          dimensions: '',
          moistureContent: 12,
          description: '',
          specialRequirements: ''
        }
      }
    },

    removeSort(index) {
      this.orderData.sorts.splice(index, 1)
    },

    toggleGrade(grade) {
      const index = this.orderData.selectedGrades.findIndex(g => g.id === grade.id)
      if (index > -1) {
        this.orderData.selectedGrades.splice(index, 1)
      } else {
        this.orderData.selectedGrades.push(grade)
      }
    },

    createOrder() {
      if (this.canCreateOrder) {
        console.log('Creating order:', this.orderData)
        alert('Order created successfully!')
        this.$router.push('/orders')
      }
    }
  },

  mounted() {
    // Set default required date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.orderData.requiredDate = tomorrow.toISOString().split('T')[0]
  }
}
</script>