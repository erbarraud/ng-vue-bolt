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
        </ul>
      </nav>

      <!-- Order Summary -->
      <div class="p-4 border-t border-gray-200 bg-gray-50">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Order Summary</h3>
        <div class="space-y-1 text-xs text-gray-600">
          <div v-if="orderData.name">Name: {{ orderData.name }}</div>
          <div v-if="orderData.clientId">Client: {{ getClientName(orderData.clientId) }}</div>
          <div v-if="orderData.sorts.length > 0">Sorts: {{ orderData.sorts.length }}</div>
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
              <p class="text-gray-600">Configure board geometry, grades, and color sorting for each sort</p>
            </div>
          </div>

          <!-- Added Sorts List -->
          <div v-if="orderData.sorts.length > 0" class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Added Sorts ({{ orderData.sorts.length }})</h3>
            <div class="space-y-4">
              <div v-for="(sort, index) in orderData.sorts" :key="index" 
                   class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-medium text-gray-900 text-lg">{{ sort.name }}</h4>
                  <button 
                    @click="removeSort(index)"
                    class="px-3 py-1 bg-white border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 hover:border-red-400 transition-colors flex items-center"
                  >
                    <X class="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- Board Geometry -->
                  <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div class="flex items-center mb-3">
                      <Ruler class="w-5 h-5 text-blue-600 mr-2" />
                      <h5 class="font-medium text-blue-900">Board Geometry</h5>
                    </div>
                    <div class="space-y-2 text-sm text-blue-800">
                      <div>Width: {{ sort.geometry.width }}"{{ sort.geometry.widthTolerance.enabled ? ' ±' + sort.geometry.widthTolerance.value + '"' : '' }}</div>
                      <div>Length: {{ sort.geometry.length }}'{{ sort.geometry.lengthTolerance.enabled ? ' ±' + sort.geometry.lengthTolerance.value + '\'' : '' }}</div>
                      <div>Thickness: {{ sort.geometry.thickness }}</div>
                    </div>
                  </div>

                  <!-- Board Grades -->
                  <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div class="flex items-center mb-3">
                      <CheckCircle class="w-5 h-5 text-green-600 mr-2" />
                      <h5 class="font-medium text-green-900">Board Grades</h5>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="grade in sort.grades" :key="grade" 
                            class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {{ grade }}
                      </span>
                    </div>
                  </div>

                  <!-- Board Colors -->
                  <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div class="flex items-center mb-3">
                      <Palette class="w-5 h-5 text-purple-600 mr-2" />
                      <h5 class="font-medium text-purple-900">Board Colors</h5>
                    </div>
                    <div class="text-sm text-purple-800">
                      <div v-if="sort.colorSorting.enabled">
                        Color Type: {{ sort.colorSorting.type }}
                      </div>
                      <div v-else class="text-purple-600">No color sorting</div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-200">
                  <div class="text-sm text-gray-600">
                    Target Volume: <span class="font-medium">{{ sort.targetVolume }} {{ sort.volumeUnit }}</span>
                    <span v-if="sort.specialRequirements" class="ml-4">
                      Special: <span class="font-medium">{{ sort.specialRequirements }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Create New Sort Form -->
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Create New Sort</h3>
            
            <!-- Basic Sort Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
            </div>

            <!-- 3 Configuration Areas -->
            <div class="space-y-8 mb-6">
              <!-- 1. Board Geometry -->
              <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <Ruler class="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Board Geometry</h4>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <!-- Width -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-3">Width (inches)</label>
                    <div class="space-y-3">
                      <input 
                        v-model="newSort.geometry.width"
                        type="number" 
                        step="0.25"
                        placeholder="Width"
                        class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                      />
                      <div class="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          v-model="newSort.geometry.widthTolerance.enabled"
                          class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label class="text-sm text-gray-600">Add tolerance</label>
                      </div>
                      <input 
                        v-if="newSort.geometry.widthTolerance.enabled"
                        v-model="newSort.geometry.widthTolerance.value"
                        type="number" 
                        step="0.25"
                        placeholder="± Tolerance"
                        class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <!-- Length -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-3">Length (feet)</label>
                    <div class="space-y-3">
                      <input 
                        v-model="newSort.geometry.length"
                        type="number" 
                        step="0.5"
                        placeholder="Length"
                        class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                      />
                      <div class="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          v-model="newSort.geometry.lengthTolerance.enabled"
                          class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label class="text-sm text-gray-600">Add tolerance</label>
                      </div>
                      <input 
                        v-if="newSort.geometry.lengthTolerance.enabled"
                        v-model="newSort.geometry.lengthTolerance.value"
                        type="number" 
                        step="0.5"
                        placeholder="± Tolerance (feet)"
                        class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <!-- Thickness -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-3">Thickness</label>
                    <div class="space-y-3">
                      <select 
                        v-model="newSort.geometry.thickness"
                        class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                      >
                        <option value="">Select thickness...</option>
                        <option value="4/4">4/4 (1 inch)</option>
                        <option value="5/4">5/4 (1.25 inches)</option>
                        <option value="6/4">6/4 (1.5 inches)</option>
                        <option value="8/4">8/4 (2 inches)</option>
                        <option value="10/4">10/4 (2.5 inches)</option>
                        <option value="12/4">12/4 (3 inches)</option>
                      </select>
                      <div class="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          v-model="newSort.geometry.thicknessTolerance.enabled"
                          class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label class="text-sm text-gray-600">Add tolerance</label>
                      </div>
                      <input 
                        v-if="newSort.geometry.thicknessTolerance.enabled"
                        v-model="newSort.geometry.thicknessTolerance.value"
                        type="number" 
                        step="0.125"
                        placeholder="± Tolerance (inches)"
                        class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Board Grades -->
              <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle class="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Board Grades</h4>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <label class="flex items-start">
                    <input 
                      type="checkbox" 
                      value="FAS" 
                      v-model="newSort.grades"
                      class="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">FAS</div>
                      <div class="text-xs text-gray-600">First and Seconds - Highest grade</div>
                    </div>
                  </label>

                  <label class="flex items-start">
                    <input 
                      type="checkbox" 
                      value="Select" 
                      v-model="newSort.grades"
                      class="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">Select</div>
                      <div class="text-xs text-gray-600">High quality with minor defects</div>
                    </div>
                  </label>

                  <label class="flex items-start">
                    <input 
                      type="checkbox" 
                      value="No. 1 Common" 
                      v-model="newSort.grades"
                      class="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">No. 1 Common</div>
                      <div class="text-xs text-gray-600">Good for staining and painting</div>
                    </div>
                  </label>

                  <label class="flex items-start">
                    <input 
                      type="checkbox" 
                      value="No. 2 Common" 
                      v-model="newSort.grades"
                      class="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">No. 2 Common</div>
                      <div class="text-xs text-gray-600">Economy grade with character</div>
                    </div>
                  </label>

                  <label class="flex items-start">
                    <input 
                      type="checkbox" 
                      value="No. 3 Common" 
                      v-model="newSort.grades"
                      class="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">No. 3 Common</div>
                      <div class="text-xs text-gray-600">Utility grade for construction</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- 3. Board Colors -->
              <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <Palette class="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">Board Colors</h4>
                </div>
                
                <div class="space-y-4">
                  <!-- Enable Color Sorting -->
                  <label class="flex items-center">
                    <input 
                      type="checkbox" 
                      v-model="newSort.colorSorting.enabled"
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span class="ml-3 text-sm font-medium text-gray-900">Enable Color Sorting</span>
                  </label>

                  <!-- Color Options (only show if enabled) -->
                  <div v-if="newSort.colorSorting.enabled" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label class="flex items-center">
                      <input 
                        type="radio" 
                        value="White/Light" 
                        v-model="newSort.colorSorting.type"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <div class="ml-3 flex items-center">
                        <div class="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
                        <div class="text-sm text-gray-900">White/Light</div>
                      </div>
                    </label>

                    <label class="flex items-center">
                      <input 
                        type="radio" 
                        value="Red/Dark" 
                        v-model="newSort.colorSorting.type"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <div class="ml-3 flex items-center">
                        <div class="w-4 h-4 bg-red-300 border border-red-400 rounded mr-2"></div>
                        <div class="text-sm text-gray-900">Red/Dark</div>
                      </div>
                    </label>

                    <label class="flex items-center">
                      <input 
                        type="radio" 
                        value="Mixed" 
                        v-model="newSort.colorSorting.type"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <div class="ml-3 flex items-center">
                        <div class="w-4 h-4 bg-gradient-to-r from-gray-100 to-red-300 border border-gray-300 rounded mr-2"></div>
                        <div class="text-sm text-gray-900">Mixed</div>
                      </div>
                    </label>

                    <label class="flex items-center">
                      <input 
                        type="radio" 
                        value="Natural Variation" 
                        v-model="newSort.colorSorting.type"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <div class="ml-3 flex items-center">
                        <div class="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded mr-2"></div>
                        <div class="text-sm text-gray-900">Natural Variation</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Special Requirements -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
              <input 
                v-model="newSort.specialRequirements"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Any special requirements..."
              />
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-3 mt-6">
              <button 
                @click="resetNewSort"
                class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button 
                @click="addNewSort"
                :disabled="!canAddSort"
                :class="[
                  'px-4 py-2 rounded-lg transition-colors',
                  canAddSort
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                Add Sort to Order
              </button>
            </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircle, X, Ruler, Palette } from 'lucide-vue-next'

export default {
  name: 'CreateProductionOrder',
  components: {
    CheckCircle,
    X,
    Ruler,
    Palette
  },
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
        sorts: []
      },

      // New sort form
      newSort: {
        name: '',
        targetVolume: '',
        volumeUnit: 'm3',
        specialRequirements: '',
        geometry: {
          width: '',
          widthTolerance: {
            enabled: false,
            value: ''
          },
          length: '',
          lengthTolerance: {
            enabled: false,
            value: ''
          },
          thickness: '',
          thicknessTolerance: {
            enabled: false,
            value: ''
          }
        },
        grades: [],
        colorSorting: {
          enabled: false,
          type: ''
        }
      },

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

    canAddSort() {
      return this.newSort.name && 
             this.newSort.targetVolume && 
             this.newSort.grades.length > 0 &&
             (this.newSort.geometry.width || this.newSort.geometry.lengthMin || this.newSort.geometry.thickness)
    }
  },

  methods: {
    isStepComplete(step) {
      switch (step) {
        case 'details':
          return this.orderData.name && this.orderData.clientId && this.orderData.requiredDate
        case 'sorts':
          return this.orderData.sorts.length > 0
        default:
          return false
      }
    },

    getClientName(clientId) {
      const client = this.clients.find(c => c.id === clientId)
      return client ? client.name : ''
    },

    addNewSort() {
      if (this.canAddSort) {
        this.orderData.sorts.push({
          ...this.newSort,
          id: 'custom_' + Date.now()
        })
        
        this.resetNewSort()
      }
    },

    removeSort(index) {
      this.orderData.sorts.splice(index, 1)
    },

    resetNewSort() {
      this.newSort = {
        name: '',
        targetVolume: '',
        volumeUnit: 'm3',
        specialRequirements: '',
        geometry: {
          width: '',
          widthTolerance: {
            enabled: false,
            value: ''
          },
          length: '',
          lengthTolerance: {
            enabled: false,
            value: ''
          },
          thickness: '',
          thicknessTolerance: {
            enabled: false,
            value: ''
          }
        },
        grades: [],
        colorSorting: {
          enabled: false,
          type: ''
        }
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