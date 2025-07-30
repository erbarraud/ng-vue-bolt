<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Create New Production Order</h1>
            <p class="text-gray-600">Follow the guided steps to create your lumber processing order</p>
          </div>
          <Button variant="outline" @click="$router.push('/orders')">
            <X class="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center">
            <div :class="[
              'flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold',
              currentStep > index + 1 
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : currentStep === index + 1
                  ? 'bg-emerald-100 border-emerald-600 text-emerald-600'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
            ]">
              <CheckCircle v-if="currentStep > index + 1" class="w-5 h-5" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="ml-3">
              <div :class="[
                'text-sm font-medium',
                currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'
              ]">
                {{ step.title }}
              </div>
              <div class="text-xs text-gray-500">{{ step.subtitle }}</div>
            </div>
            <div v-if="index < steps.length - 1" class="flex-1 mx-8">
              <div :class="[
                'h-0.5',
                currentStep > index + 1 ? 'bg-emerald-600' : 'bg-gray-300'
              ]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Step 1: Order Details -->
        <div v-if="currentStep === 1" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Order Details</h2>
            <p class="text-gray-600">Define the basic information for your production order</p>
          </div>

          <div class="space-y-8">
            <!-- Basic Order Information -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Order Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="orderForm.orderName"
                    type="text"
                    placeholder="e.g., Red Oak Premium Run"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Order ID (Optional)</label>
                  <input
                    v-model="orderForm.customOrderId"
                    type="text"
                    placeholder="Auto-generated if empty"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <div class="text-xs text-gray-500 mt-1">
                    Will be: {{ orderForm.customOrderId || `ORD-${new Date().getFullYear()}${String(Date.now()).slice(-4)}` }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Client Information -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Client <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="orderForm.client"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select client...</option>
                    <option value="johnson-lumber">Johnson Lumber Co.</option>
                    <option value="artisan-furniture">Artisan Furniture</option>
                    <option value="premium-hardwoods">Premium Hardwoods</option>
                    <option value="cabinet-masters">Cabinet Masters</option>
                    <option value="flooring-inc">Flooring Inc.</option>
                    <option value="luxury-millwork">Luxury Millwork</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <input
                    v-model="orderForm.contactPerson"
                    type="text"
                    placeholder="Enter contact name"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Project Reference</label>
                  <input
                    v-model="orderForm.projectReference"
                    type="text"
                    placeholder="Optional reference"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <!-- Scheduling -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Scheduling</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Required Date <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="orderForm.requiredDate"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select
                    v-model="orderForm.priority"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="rush">Rush</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Line</label>
                  <select
                    v-model="orderForm.preferredLine"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="auto">Auto-assign</option>
                    <option value="line1">Line 1</option>
                    <option value="line2">Line 2</option>
                    <option value="line3">Line 3</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Volume and Specifications -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Volume Specifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Expected Volume <span class="text-red-500">*</span>
                  </label>
                  <div class="flex space-x-2">
                    <input
                      v-model="orderForm.volume"
                      type="number"
                      placeholder="Enter volume"
                      class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <select
                      v-model="orderForm.unit"
                      class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="bf">board feet</option>
                      <option value="m3">m³</option>
                      <option value="pieces">pieces</option>
                    </select>
                  </div>
                  <div v-if="orderForm.volume" class="text-sm text-gray-500 mt-1">
                    Estimated processing time: ~{{ calculateProcessingTime() }} hours
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Species</label>
                  <select
                    v-model="orderForm.species"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select species...</option>
                    <option value="red-oak">Red Oak</option>
                    <option value="white-oak">White Oak</option>
                    <option value="soft-maple">Soft Maple</option>
                    <option value="hard-maple">Hard Maple</option>
                    <option value="cherry">Cherry</option>
                    <option value="walnut">Walnut</option>
                    <option value="douglas-fir">Douglas Fir</option>
                    <option value="pine">Pine</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Special Instructions -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
              <textarea
                v-model="orderForm.specialInstructions"
                rows="4"
                placeholder="Any special requirements, handling instructions, or notes..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
              <div class="text-sm text-gray-500 mt-1">
                {{ orderForm.specialInstructions?.length || 0 }}/500 characters
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-8 border-t border-gray-200">
            <div class="text-sm text-gray-600">
              Step 1 of 3 - Order Details
            </div>
            <Button
              @click="nextStep"
              :disabled="!isStep1Valid"
              class="px-8"
            >
              Continue to Sorts
              <ChevronRight class="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <!-- Step 2: Define Sorts -->
        <div v-if="currentStep === 2" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Define Sorts</h2>
            <p class="text-gray-600">Add the different sorts you want to include in this order</p>
          </div>

          <!-- Existing Sorts -->
          <div v-if="orderForm.sorts.length > 0" class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Added Sorts ({{ orderForm.sorts.length }})</h3>
            <div class="space-y-4">
              <div
                v-for="(sort, index) in orderForm.sorts"
                :key="index"
                class="border border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ sort.name }}</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span class="font-medium text-gray-700">Target Volume:</span>
                        <span class="ml-2 text-gray-900">{{ sort.targetVolume }} {{ sort.unit }}</span>
                      </div>
                      <div>
                        <span class="font-medium text-gray-700">Quality Level:</span>
                        <span class="ml-2 text-gray-900 capitalize">{{ sort.qualityLevel }}</span>
                      </div>
                      <div>
                        <span class="font-medium text-gray-700">Dimensions:</span>
                        <span class="ml-2 text-gray-900">{{ sort.dimensions }}</span>
                      </div>
                      <div>
                        <span class="font-medium text-gray-700">Defect Tolerance:</span>
                        <span class="ml-2 text-gray-900">{{ sort.defectTolerance }}%</span>
                      </div>
                    </div>
                    <div v-if="sort.specialRequirements" class="mt-2">
                      <span class="font-medium text-gray-700 text-sm">Special Requirements:</span>
                      <span class="ml-2 text-gray-600 text-sm">{{ sort.specialRequirements }}</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm" @click="editSort(index)">
                      <Edit class="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" @click="removeSort(index)">
                      <Trash2 class="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Add New Sort Form -->
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              {{ editingSort !== null ? 'Edit Sort' : 'Add New Sort' }}
            </h3>
            
            <div class="space-y-6">
              <!-- Sort Name and Target Volume -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Sort Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="currentSort.name"
                    type="text"
                    placeholder="e.g., Premium Flooring Grade"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Target Volume <span class="text-red-500">*</span>
                  </label>
                  <div class="flex space-x-2">
                    <input
                      v-model="currentSort.targetVolume"
                      type="number"
                      placeholder="Volume"
                      class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <select
                      v-model="currentSort.unit"
                      class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="bf">board feet</option>
                      <option value="m3">m³</option>
                      <option value="pieces">pieces</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Quality and Dimensions -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Quality Level</label>
                  <select
                    v-model="currentSort.qualityLevel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                    <option value="economy">Economy</option>
                    <option value="construction">Construction</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                  <input
                    v-model="currentSort.dimensions"
                    type="text"
                    placeholder="e.g., 2x4, 1x6, or custom"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <!-- Defect Tolerance and Moisture -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Defect Tolerance (%)</label>
                  <input
                    v-model="currentSort.defectTolerance"
                    type="range"
                    min="0"
                    max="20"
                    class="w-full"
                  />
                  <div class="text-sm text-gray-600 mt-1">{{ currentSort.defectTolerance }}% maximum defects allowed</div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Moisture Content</label>
                  <select
                    v-model="currentSort.moistureContent"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="kiln-dried">Kiln Dried (KD)</option>
                    <option value="air-dried">Air Dried (AD)</option>
                    <option value="green">Green</option>
                  </select>
                </div>
              </div>

              <!-- Special Requirements -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea
                  v-model="currentSort.specialRequirements"
                  rows="3"
                  placeholder="Any specific requirements for this sort..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>

              <!-- Add/Update Sort Button -->
              <div class="flex items-center space-x-4">
                <Button
                  @click="addSort"
                  :disabled="!isCurrentSortValid"
                  class="px-6"
                >
                  {{ editingSort !== null ? 'Update Sort' : 'Add Sort' }}
                </Button>
                <Button
                  v-if="editingSort !== null"
                  variant="outline"
                  @click="cancelEdit"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-8 border-t border-gray-200">
            <Button variant="outline" @click="previousStep">
              <ChevronLeft class="w-4 h-4 mr-2" />
              Previous Step
            </Button>
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-600">
                {{ orderForm.sorts.length }} sort(s) added
              </div>
              <Button
                @click="nextStep"
                :disabled="orderForm.sorts.length === 0"
                class="px-8"
              >
                Continue to Grades (Optional)
                <ChevronRight class="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <!-- Step 3: Optional Grade Selection -->
        <div v-if="currentStep === 3" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Grade Library (Optional)</h2>
            <p class="text-gray-600">Choose predefined grades to apply to your sorts, or skip to create the order</p>
          </div>

          <!-- Skip Option -->
          <div class="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="flex items-center">
              <Info class="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <h4 class="font-medium text-blue-900">Grade Selection is Optional</h4>
                <p class="text-sm text-blue-700 mt-1">
                  You can skip this step and use the custom sort specifications you defined, or select predefined grades to enhance your sorts.
                </p>
              </div>
            </div>
          </div>

          <!-- Grade Selection Toggle -->
          <div class="mb-6">
            <label class="flex items-center">
              <input
                v-model="useGradeLibrary"
                type="checkbox"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Apply grades from library to sorts</span>
            </label>
          </div>

          <!-- Grade Library (shown when enabled) -->
          <div v-if="useGradeLibrary">
            <!-- Search and Filter -->
            <div class="mb-6">
              <div class="flex items-center space-x-4">
                <div class="flex-1 relative">
                  <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    v-model="gradeSearchQuery"
                    type="text"
                    placeholder="Search grades..."
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <select
                  v-model="gradeTypeFilter"
                  class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Types</option>
                  <option value="hardwood">Hardwood</option>
                  <option value="softwood">Softwood</option>
                  <option value="engineered">Engineered</option>
                </select>
              </div>
            </div>

            <!-- Grade Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div
                v-for="grade in filteredGrades"
                :key="grade.id"
                @click="toggleGrade(grade)"
                :class="[
                  'border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md',
                  selectedGrades.some(g => g.id === grade.id)
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="mb-4">
                  <img
                    :src="grade.image"
                    :alt="grade.name"
                    class="w-full h-20 object-cover rounded-lg bg-gray-100"
                  />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ grade.name }}</h3>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li v-for="spec in grade.keySpecs" :key="spec" class="flex items-start">
                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {{ spec }}
                  </li>
                </ul>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-xs text-gray-500 capitalize">{{ grade.type }}</span>
                  <div v-if="selectedGrades.some(g => g.id === grade.id)" class="text-emerald-600">
                    <CheckCircle class="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Selected Grades Summary -->
            <div v-if="selectedGrades.length > 0" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h4 class="font-medium text-emerald-900 mb-2">Selected Grades ({{ selectedGrades.length }})</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="grade in selectedGrades"
                  :key="grade.id"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
                >
                  {{ grade.name }}
                  <button @click="removeGrade(grade)" class="ml-2 text-emerald-600 hover:text-emerald-800">
                    <X class="w-3 h-3" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-gray-700 mb-2">Order Details</h4>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li><strong>Name:</strong> {{ orderForm.orderName }}</li>
                  <li><strong>Client:</strong> {{ getClientName(orderForm.client) }}</li>
                  <li><strong>Volume:</strong> {{ orderForm.volume }} {{ orderForm.unit }}</li>
                  <li><strong>Species:</strong> {{ getSpeciesName(orderForm.species) }}</li>
                  <li><strong>Required Date:</strong> {{ formatDate(orderForm.requiredDate) }}</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium text-gray-700 mb-2">Sorts ({{ orderForm.sorts.length }})</h4>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li v-for="sort in orderForm.sorts" :key="sort.name">
                    <strong>{{ sort.name }}:</strong> {{ sort.targetVolume }} {{ sort.unit }} ({{ sort.qualityLevel }})
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="useGradeLibrary && selectedGrades.length > 0" class="mt-4">
              <h4 class="font-medium text-gray-700 mb-2">Applied Grades ({{ selectedGrades.length }})</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="grade in selectedGrades"
                  :key="grade.id"
                  class="inline-flex items-center px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-800"
                >
                  {{ grade.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-8 border-t border-gray-200">
            <Button variant="outline" @click="previousStep">
              <ChevronLeft class="w-4 h-4 mr-2" />
              Previous Step
            </Button>
            <div class="flex items-center space-x-4">
              <Button variant="outline" @click="saveDraft">
                Save as Draft
              </Button>
              <Button @click="createOrder" class="px-8 py-3 text-lg">
                Create Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="w-8 h-8 text-emerald-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Order Created Successfully!</h3>
          <p class="text-gray-600 mb-6">Order {{ generatedOrderId }} has been created and added to the production queue.</p>
          <div class="flex items-center space-x-3">
            <Button variant="outline" @click="createAnother" class="flex-1">
              Create Another
            </Button>
            <Button @click="viewOrder" class="flex-1">
              View Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Search, Info, ChevronRight, ChevronLeft, CheckCircle, Edit, Trash2, X
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

const router = useRouter()

// Wizard state
const currentStep = ref(1)
const showSuccessModal = ref(false)
const generatedOrderId = ref('')
const useGradeLibrary = ref(false)
const editingSort = ref(null)

// Search and filter
const gradeSearchQuery = ref('')
const gradeTypeFilter = ref('')

// Form data
const orderForm = ref({
  orderName: '',
  customOrderId: '',
  client: '',
  contactPerson: '',
  projectReference: '',
  requiredDate: '',
  priority: 'standard',
  preferredLine: 'auto',
  volume: '',
  unit: 'bf',
  species: '',
  specialInstructions: '',
  sorts: []
})

// Current sort being added/edited
const currentSort = ref({
  name: '',
  targetVolume: '',
  unit: 'bf',
  qualityLevel: 'standard',
  dimensions: '',
  defectTolerance: 5,
  moistureContent: 'kiln-dried',
  specialRequirements: ''
})

// Selected grades
const selectedGrades = ref([])

// Wizard steps
const steps = ref([
  { title: 'Order Details', subtitle: 'Basic information' },
  { title: 'Define Sorts', subtitle: 'Add sort specifications' },
  { title: 'Grade Library', subtitle: 'Optional grade selection' }
])

// Sample grade data
const grades = ref([
  {
    id: 'fas-hardwood',
    name: 'FAS Hardwood',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'First and Seconds grade',
      'Minimum 6" wide, 8\' long',
      '83.3% clear face required'
    ]
  },
  {
    id: 'select-hardwood',
    name: 'Select Hardwood',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'Select grade quality',
      'Minimum 4" wide, 6\' long',
      '83.3% clear face required'
    ]
  },
  {
    id: '1-common-hardwood',
    name: '1 Common Hardwood',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'No. 1 Common grade',
      'Minimum 3" wide, 4\' long',
      '66.7% clear face required'
    ]
  },
  {
    id: '2-common-hardwood',
    name: '2 Common Hardwood',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'No. 2 Common grade',
      'Minimum 3" wide, 4\' long',
      '50% clear face required'
    ]
  },
  {
    id: 'select-structural',
    name: 'Select Structural',
    type: 'softwood',
    image: '/image.png',
    keySpecs: [
      'Select structural grade',
      'High strength properties',
      'Minimal defects allowed'
    ]
  },
  {
    id: 'construction-grade',
    name: 'Construction Grade',
    type: 'softwood',
    image: '/image.png',
    keySpecs: [
      'Standard construction use',
      'Good strength properties',
      'Some defects allowed'
    ]
  },
  {
    id: 'utility-grade',
    name: 'Utility Grade',
    type: 'softwood',
    image: '/image.png',
    keySpecs: [
      'Utility applications',
      'Lower strength requirements',
      'More defects allowed'
    ]
  },
  {
    id: 'engineered-i-joist',
    name: 'Engineered I-Joist',
    type: 'engineered',
    image: '/image.png',
    keySpecs: [
      'Engineered lumber product',
      'Consistent performance',
      'Minimal defects'
    ]
  }
])

// Computed properties
const isStep1Valid = computed(() => {
  return orderForm.value.orderName && 
         orderForm.value.client && 
         orderForm.value.requiredDate && 
         orderForm.value.volume
})

const isCurrentSortValid = computed(() => {
  return currentSort.value.name && 
         currentSort.value.targetVolume && 
         currentSort.value.qualityLevel
})

const filteredGrades = computed(() => {
  return grades.value.filter(grade => {
    const matchesSearch = !gradeSearchQuery.value || 
      grade.name.toLowerCase().includes(gradeSearchQuery.value.toLowerCase())
    const matchesType = !gradeTypeFilter.value || grade.type === gradeTypeFilter.value
    return matchesSearch && matchesType
  })
})

// Methods
const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const addSort = () => {
  if (editingSort.value !== null) {
    // Update existing sort
    orderForm.value.sorts[editingSort.value] = { ...currentSort.value }
    editingSort.value = null
  } else {
    // Add new sort
    orderForm.value.sorts.push({ ...currentSort.value })
  }
  
  // Reset form
  currentSort.value = {
    name: '',
    targetVolume: '',
    unit: 'bf',
    qualityLevel: 'standard',
    dimensions: '',
    defectTolerance: 5,
    moistureContent: 'kiln-dried',
    specialRequirements: ''
  }
}

const editSort = (index) => {
  editingSort.value = index
  currentSort.value = { ...orderForm.value.sorts[index] }
}

const removeSort = (index) => {
  orderForm.value.sorts.splice(index, 1)
}

const cancelEdit = () => {
  editingSort.value = null
  currentSort.value = {
    name: '',
    targetVolume: '',
    unit: 'bf',
    qualityLevel: 'standard',
    dimensions: '',
    defectTolerance: 5,
    moistureContent: 'kiln-dried',
    specialRequirements: ''
  }
}

const toggleGrade = (grade) => {
  const index = selectedGrades.value.findIndex(g => g.id === grade.id)
  if (index > -1) {
    selectedGrades.value.splice(index, 1)
  } else {
    selectedGrades.value.push(grade)
  }
}

const removeGrade = (grade) => {
  const index = selectedGrades.value.findIndex(g => g.id === grade.id)
  if (index > -1) {
    selectedGrades.value.splice(index, 1)
  }
}

const calculateProcessingTime = () => {
  if (!orderForm.value.volume) return '0'
  const baseTime = orderForm.value.unit === 'bf' ? orderForm.value.volume * 0.01 : orderForm.value.volume * 0.5
  return baseTime.toFixed(1)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not set'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getClientName = (clientId) => {
  const clients = {
    'johnson-lumber': 'Johnson Lumber Co.',
    'artisan-furniture': 'Artisan Furniture',
    'premium-hardwoods': 'Premium Hardwoods',
    'cabinet-masters': 'Cabinet Masters',
    'flooring-inc': 'Flooring Inc.',
    'luxury-millwork': 'Luxury Millwork'
  }
  return clients[clientId] || 'Not selected'
}

const getSpeciesName = (speciesId) => {
  const species = {
    'red-oak': 'Red Oak',
    'white-oak': 'White Oak',
    'soft-maple': 'Soft Maple',
    'hard-maple': 'Hard Maple',
    'cherry': 'Cherry',
    'walnut': 'Walnut',
    'douglas-fir': 'Douglas Fir',
    'pine': 'Pine'
  }
  return species[speciesId] || 'Not selected'
}

const saveDraft = () => {
  console.log('Saving draft...', orderForm.value)
  router.push('/orders')
}

const createOrder = () => {
  generatedOrderId.value = orderForm.value.customOrderId || `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`
  showSuccessModal.value = true
}

const createAnother = () => {
  showSuccessModal.value = false
  // Reset form
  currentStep.value = 1
  orderForm.value = {
    orderName: '',
    customOrderId: '',
    client: '',
    contactPerson: '',
    projectReference: '',
    requiredDate: '',
    priority: 'standard',
    preferredLine: 'auto',
    volume: '',
    unit: 'bf',
    species: '',
    specialInstructions: '',
    sorts: []
  }
  selectedGrades.value = []
  useGradeLibrary.value = false
}

const viewOrder = () => {
  showSuccessModal.value = false
  router.push(`/orders/${generatedOrderId.value}`)
}

onMounted(() => {
  // Set default required date to 7 days from now
  const defaultDate = new Date()
  defaultDate.setDate(defaultDate.getDate() + 7)
  orderForm.value.requiredDate = defaultDate.toISOString().split('T')[0]
})
</script>