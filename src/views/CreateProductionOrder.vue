<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Create New Production Order</h1>
            <p class="text-gray-600">Follow the guided steps to create your lumber grading order</p>
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
        <!-- Step 1: Select Base Grade -->
        <div v-if="currentStep === 1" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Select Base Grade Template</h2>
            <p class="text-gray-600">Choose the foundation for your lumber product</p>
          </div>

          <!-- Search and Filter -->
          <div class="mb-8">
            <div class="flex items-center space-x-4">
              <div class="flex-1 relative">
                <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search grades..."
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <select
                v-model="typeFilter"
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
              @click="selectGrade(grade)"
              :class="[
                'border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md',
                selectedGrade?.id === grade.id
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
                <button class="text-emerald-600 hover:text-emerald-700">
                  <Info class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-200">
            <div class="text-sm text-gray-600">
              {{ selectedGrade ? `Selected: ${selectedGrade.name}` : 'No grade selected' }}
            </div>
            <Button
              @click="nextStep"
              :disabled="!selectedGrade"
              class="px-8"
            >
              Continue to Customization
              <ChevronRight class="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <!-- Step 2: Define Your Product -->
        <div v-if="currentStep === 2" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Customize Your Product</h2>
            <div class="text-sm text-gray-600">
              <span class="text-emerald-600 font-medium">{{ selectedGrade?.name }}</span> > Customization
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Panel - Customization Form -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Product Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="orderForm.productName"
                  type="text"
                  placeholder="Enter product name (e.g., Premium Oak Flooring Sort)"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <!-- Dimension Rules -->
              <div class="border border-gray-200 rounded-lg p-6">
                <button
                  @click="toggleSection('dimensions')"
                  class="flex items-center justify-between w-full text-left"
                >
                  <h3 class="text-lg font-semibold text-gray-900">Dimension Rules</h3>
                  <ChevronDown :class="[
                    'w-5 h-5 text-gray-400 transition-transform',
                    expandedSections.dimensions ? 'rotate-180' : ''
                  ]" />
                </button>
                <div v-if="expandedSections.dimensions" class="mt-4 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Length Range (cm)</label>
                      <div class="flex items-center space-x-2">
                        <input
                          v-model="orderForm.dimensions.length.min"
                          type="number"
                          placeholder="Min"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <span class="text-gray-500">to</span>
                        <input
                          v-model="orderForm.dimensions.length.max"
                          type="number"
                          placeholder="Max"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Width Range (cm)</label>
                      <div class="flex items-center space-x-2">
                        <input
                          v-model="orderForm.dimensions.width.min"
                          type="number"
                          placeholder="Min"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <span class="text-gray-500">to</span>
                        <input
                          v-model="orderForm.dimensions.width.max"
                          type="number"
                          placeholder="Max"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Thickness Range (mm)</label>
                      <div class="flex items-center space-x-2">
                        <input
                          v-model="orderForm.dimensions.thickness.min"
                          type="number"
                          placeholder="Min"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <span class="text-gray-500">to</span>
                        <input
                          v-model="orderForm.dimensions.thickness.max"
                          type="number"
                          placeholder="Max"
                          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  <label class="flex items-center">
                    <input
                      v-model="orderForm.dimensions.allowMixed"
                      type="checkbox"
                      class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Allow mixed dimensions</span>
                  </label>
                </div>
              </div>

              <!-- Defect Rules -->
              <div class="border border-gray-200 rounded-lg p-6">
                <button
                  @click="toggleSection('defects')"
                  class="flex items-center justify-between w-full text-left"
                >
                  <h3 class="text-lg font-semibold text-gray-900">Defect Rules</h3>
                  <ChevronDown :class="[
                    'w-5 h-5 text-gray-400 transition-transform',
                    expandedSections.defects ? 'rotate-180' : ''
                  ]" />
                </button>
                <div v-if="expandedSections.defects" class="mt-4 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Knot Size Limit (cm)</label>
                      <input
                        v-model="orderForm.defects.knotSize"
                        type="number"
                        placeholder="Max diameter"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Surface Defect Tolerance (%)</label>
                      <input
                        v-model="orderForm.defects.surfaceDefects"
                        type="range"
                        min="0"
                        max="10"
                        class="w-full"
                      />
                      <div class="text-sm text-gray-600 mt-1">{{ orderForm.defects.surfaceDefects }}%</div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Edge Defects</label>
                      <select
                        v-model="orderForm.defects.edgeDefects"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="none">None</option>
                        <option value="minor">Minor</option>
                        <option value="moderate">Moderate</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Color Variation</label>
                      <select
                        v-model="orderForm.defects.colorVariation"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="minimal">Minimal</option>
                        <option value="some">Some</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Specifications -->
              <div class="border border-gray-200 rounded-lg p-6">
                <button
                  @click="toggleSection('additional')"
                  class="flex items-center justify-between w-full text-left"
                >
                  <h3 class="text-lg font-semibold text-gray-900">Additional Specifications</h3>
                  <ChevronDown :class="[
                    'w-5 h-5 text-gray-400 transition-transform',
                    expandedSections.additional ? 'rotate-180' : ''
                  ]" />
                </button>
                <div v-if="expandedSections.additional" class="mt-4 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Moisture Content (%)</label>
                      <input
                        v-model="orderForm.additional.moistureContent"
                        type="number"
                        placeholder="e.g., 12"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Grain Pattern</label>
                      <select
                        v-model="orderForm.additional.grainPattern"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="straight">Straight</option>
                        <option value="wavy">Wavy</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Surface Finish</label>
                      <select
                        v-model="orderForm.additional.surfaceFinish"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="rough">Rough</option>
                        <option value="smooth">Smooth</option>
                        <option value="planed">Planed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <textarea
                      v-model="orderForm.additional.specialRequirements"
                      rows="3"
                      placeholder="Enter any special requirements or notes..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Panel - Live Preview -->
            <div class="lg:col-span-1">
              <div class="sticky top-6">
                <div class="bg-gray-50 rounded-lg p-6 border">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                  
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-medium text-gray-900">{{ orderForm.productName || 'Unnamed Product' }}</h4>
                      <p class="text-sm text-gray-600">Built on: {{ selectedGrade?.name }}</p>
                    </div>
                    
                    <div>
                      <h5 class="text-sm font-medium text-gray-700 mb-2">Applied Customizations:</h5>
                      <ul class="space-y-1 text-sm text-gray-600">
                        <li v-if="orderForm.dimensions.length.min || orderForm.dimensions.length.max">
                          Length: {{ orderForm.dimensions.length.min || '?' }}-{{ orderForm.dimensions.length.max || '?' }}cm
                        </li>
                        <li v-if="orderForm.defects.knotSize">
                          Knot size: Max {{ orderForm.defects.knotSize }}cm
                        </li>
                        <li v-if="orderForm.defects.surfaceDefects">
                          Surface defects: <{{ orderForm.defects.surfaceDefects }}%
                        </li>
                        <li v-if="orderForm.additional.moistureContent">
                          Moisture: {{ orderForm.additional.moistureContent }}%
                        </li>
                      </ul>
                    </div>
                    
                    <div class="pt-4 border-t border-gray-200">
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Expected throughput:</span>
                        <span class="text-sm font-semibold text-emerald-600">{{ calculateThroughput() }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-8 border-t border-gray-200">
            <Button variant="outline" @click="previousStep">
              <ChevronLeft class="w-4 h-4 mr-2" />
              Previous Step
            </Button>
            <Button
              @click="nextStep"
              :disabled="!orderForm.productName"
              class="px-8"
            >
              Add Order Details
              <ChevronRight class="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <!-- Step 3: Order Details -->
        <div v-if="currentStep === 3" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Order Information</h2>
            <p class="text-gray-600">{{ orderForm.productName }} based on {{ selectedGrade?.name }}</p>
          </div>

          <div class="space-y-8">
            <!-- Order Specification -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Specification</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Volume/Quantity</label>
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
                      <option value="m3">m³</option>
                      <option value="bf">board feet</option>
                      <option value="pieces">pieces</option>
                    </select>
                  </div>
                  <div v-if="orderForm.volume" class="text-sm text-gray-500 mt-1">
                    ~{{ Math.round(orderForm.volume * 9) }} pieces estimated
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Required Date</label>
                  <input
                    v-model="orderForm.requiredDate"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input
                        v-model="orderForm.priority"
                        type="radio"
                        value="standard"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">Standard</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="orderForm.priority"
                        type="radio"
                        value="rush"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">Rush</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="orderForm.priority"
                        type="radio"
                        value="low"
                        class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">Low</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Client Information -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <select
                    v-model="orderForm.client"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select client...</option>
                    <option value="johnson-lumber">Johnson Lumber Co.</option>
                    <option value="artisan-furniture">Artisan Furniture</option>
                    <option value="premium-hardwoods">Premium Hardwoods</option>
                    <option value="cabinet-masters">Cabinet Masters</option>
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

            <!-- Production Planning -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Production Planning</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Line</label>
                  <select
                    v-model="orderForm.preferredLine"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="auto">Auto</option>
                    <option value="line1">Line 1</option>
                    <option value="line2">Line 2</option>
                    <option value="line3">Line 3</option>
                  </select>
                  <div class="text-sm text-gray-500 mt-1">
                    Estimated duration: ~{{ calculateDuration() }} hours
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Quality Requirements</label>
                  <select
                    v-model="orderForm.inspectionLevel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="enhanced">Enhanced</option>
                    <option value="full">Full audit</option>
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
                placeholder="Additional notes or special requirements..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
              <div class="text-sm text-gray-500 mt-1">
                {{ orderForm.specialInstructions?.length || 0 }}/500 characters
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
                This order will use {{ calculateLineCapacity() }}% line capacity
              </div>
              <Button @click="nextStep" class="px-8">
                Review Order
                <ChevronRight class="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <!-- Step 4: Review & Create -->
        <div v-if="currentStep === 4" class="p-8">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Review Your Order</h2>
            <p class="text-gray-600">Order ID will be assigned: ORD-2025-{{ String(Date.now()).slice(-4) }}</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Order Summary -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Product Details -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div class="flex items-start space-x-4">
                  <div class="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Package class="w-8 h-8 text-emerald-600" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-xl font-semibold text-gray-900">{{ orderForm.productName }}</h4>
                    <p class="text-gray-600">Base grade: {{ selectedGrade?.name }}</p>
                    <ul class="mt-2 space-y-1 text-sm text-gray-600">
                      <li v-if="orderForm.dimensions.length.min">• Length: {{ orderForm.dimensions.length.min }}-{{ orderForm.dimensions.length.max }}cm</li>
                      <li v-if="orderForm.defects.knotSize">• Knot size: Max {{ orderForm.defects.knotSize }}cm</li>
                      <li v-if="orderForm.defects.surfaceDefects">• Surface defects: <{{ orderForm.defects.surfaceDefects }}%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Specifications -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Volume:</span>
                    <span class="ml-2 text-gray-900">{{ orderForm.volume }} {{ orderForm.unit }} (~{{ Math.round(orderForm.volume * 9) }} pieces)</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Quality level:</span>
                    <span class="ml-2 text-gray-900 capitalize">{{ orderForm.inspectionLevel }} inspection</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Delivery:</span>
                    <span class="ml-2 text-gray-900">{{ formatDate(orderForm.requiredDate) }} ({{ orderForm.priority }} priority)</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Client:</span>
                    <span class="ml-2 text-gray-900">{{ getClientName(orderForm.client) }}</span>
                  </div>
                </div>
              </div>

              <!-- Client Information -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                <div class="space-y-2 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Client:</span>
                    <span class="ml-2 text-gray-900">{{ getClientName(orderForm.client) }}</span>
                  </div>
                  <div v-if="orderForm.contactPerson">
                    <span class="font-medium text-gray-700">Contact:</span>
                    <span class="ml-2 text-gray-900">{{ orderForm.contactPerson }}</span>
                  </div>
                  <div v-if="orderForm.projectReference">
                    <span class="font-medium text-gray-700">Project:</span>
                    <span class="ml-2 text-gray-900">{{ orderForm.projectReference }}</span>
                  </div>
                  <div v-if="orderForm.specialInstructions">
                    <span class="font-medium text-gray-700">Special instructions:</span>
                    <p class="mt-1 text-gray-900">{{ orderForm.specialInstructions }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Production Impact -->
            <div class="space-y-6">
              <!-- Performance Analysis -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-700">Processing time:</span>
                      <span class="font-medium">{{ calculateDuration() }} hours</span>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-700">Line efficiency:</span>
                      <span class="font-medium">{{ calculateThroughput() }}% of standard</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-emerald-600 h-2 rounded-full"
                        :style="{ width: calculateThroughput() + '%' }"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-700">Resource usage:</span>
                      <span class="font-medium">{{ calculateLineCapacity() }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-blue-600 h-2 rounded-full"
                        :style="{ width: calculateLineCapacity() + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Timeline Preview -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Timeline Preview</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-700">Start:</span>
                    <span class="font-medium">Available immediately</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-700">Completion:</span>
                    <span class="font-medium">{{ calculateCompletionDate() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-700">Buffer:</span>
                    <span class="font-medium text-emerald-600">{{ calculateBuffer() }} days before delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Panel -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between mb-6">
              <div>
                <label class="flex items-center">
                  <input
                    v-model="saveAsTemplate"
                    type="checkbox"
                    class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">Save product as template for future orders</span>
                </label>
                <input
                  v-if="saveAsTemplate"
                  v-model="templateName"
                  type="text"
                  placeholder="Template name"
                  class="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
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
  Search, Info, ChevronRight, ChevronLeft, ChevronDown, CheckCircle,
  Package, X
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'

const router = useRouter()

// Wizard state
const currentStep = ref(1)
const showSuccessModal = ref(false)
const generatedOrderId = ref('')

// Form data
const selectedGrade = ref(null)
const searchQuery = ref('')
const typeFilter = ref('')
const saveAsTemplate = ref(false)
const templateName = ref('')

// Expanded sections
const expandedSections = ref({
  dimensions: true,
  defects: false,
  additional: false
})

// Order form
const orderForm = ref({
  productName: '',
  dimensions: {
    length: { min: '', max: '' },
    width: { min: '', max: '' },
    thickness: { min: '', max: '' },
    allowMixed: false
  },
  defects: {
    knotSize: '',
    surfaceDefects: 3,
    edgeDefects: 'none',
    colorVariation: 'minimal'
  },
  additional: {
    moistureContent: '',
    grainPattern: 'straight',
    surfaceFinish: 'rough',
    specialRequirements: ''
  },
  volume: '',
  unit: 'm3',
  requiredDate: '',
  priority: 'standard',
  client: '',
  contactPerson: '',
  projectReference: '',
  preferredLine: 'auto',
  inspectionLevel: 'standard',
  specialInstructions: ''
})

// Wizard steps
const steps = ref([
  { title: 'Select Grade', subtitle: 'Choose base template' },
  { title: 'Customize', subtitle: 'Define your product' },
  { title: 'Order Details', subtitle: 'Add specifications' },
  { title: 'Review', subtitle: 'Confirm and create' }
])

// Sample grade data
const grades = ref([
  {
    id: 'premium-hardwood-a',
    name: 'Premium Hardwood A',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 5% surface defects',
      'Typical thickness: 25-50mm',
      'Common use: Flooring, furniture'
    ]
  },
  {
    id: 'standard-hardwood-b',
    name: 'Standard Hardwood B',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 10% surface defects',
      'Typical thickness: 20-40mm',
      'Common use: Cabinetry, millwork'
    ]
  },
  {
    id: 'economy-hardwood-c',
    name: 'Economy Hardwood C',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 15% surface defects',
      'Typical thickness: 15-35mm',
      'Common use: Construction, pallets'
    ]
  },
  {
    id: 'premium-softwood-a',
    name: 'Premium Softwood A',
    type: 'softwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 8% surface defects',
      'Typical thickness: 20-60mm',
      'Common use: Structural, framing'
    ]
  },
  {
    id: 'standard-softwood-b',
    name: 'Standard Softwood B',
    type: 'softwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 12% surface defects',
      'Typical thickness: 15-50mm',
      'Common use: General construction'
    ]
  },
  {
    id: 'engineered-composite',
    name: 'Engineered Composite',
    type: 'engineered',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 3% surface defects',
      'Typical thickness: 10-30mm',
      'Common use: Specialty applications'
    ]
  },
  {
    id: 'specialty-exotic',
    name: 'Specialty Exotic',
    type: 'hardwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 2% surface defects',
      'Typical thickness: 20-40mm',
      'Common use: High-end furniture'
    ]
  },
  {
    id: 'construction-grade',
    name: 'Construction Grade',
    type: 'softwood',
    image: '/image.png',
    keySpecs: [
      'Defect tolerance: < 20% surface defects',
      'Typical thickness: 25-75mm',
      'Common use: Framing, structural'
    ]
  }
])

// Computed properties
const filteredGrades = computed(() => {
  return grades.value.filter(grade => {
    const matchesSearch = !searchQuery.value || 
      grade.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !typeFilter.value || grade.type === typeFilter.value
    return matchesSearch && matchesType
  })
})

// Methods
const selectGrade = (grade) => {
  selectedGrade.value = grade
}

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const calculateThroughput = () => {
  let base = 85
  if (orderForm.value.defects.surfaceDefects < 5) base -= 5
  if (orderForm.value.defects.knotSize && orderForm.value.defects.knotSize < 20) base -= 3
  return Math.max(70, base)
}

const calculateDuration = () => {
  const baseHours = orderForm.value.volume ? (orderForm.value.volume * 0.08) : 4.2
  return baseHours.toFixed(1)
}

const calculateLineCapacity = () => {
  const base = orderForm.value.volume ? Math.min(85, orderForm.value.volume * 1.5) : 65
  return Math.round(base)
}

const calculateCompletionDate = () => {
  if (!orderForm.value.requiredDate) return 'TBD'
  const date = new Date(orderForm.value.requiredDate)
  date.setDate(date.getDate() - 3)
  return date.toLocaleDateString()
}

const calculateBuffer = () => {
  return 3
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
    'cabinet-masters': 'Cabinet Masters'
  }
  return clients[clientId] || 'Not selected'
}

const saveDraft = () => {
  // Save draft logic
  console.log('Saving draft...', orderForm.value)
  router.push('/orders')
}

const createOrder = () => {
  generatedOrderId.value = `ORD-2025-${String(Date.now()).slice(-4)}`
  showSuccessModal.value = true
}

const createAnother = () => {
  showSuccessModal.value = false
  // Reset form
  currentStep.value = 1
  selectedGrade.value = null
  orderForm.value = {
    productName: '',
    dimensions: {
      length: { min: '', max: '' },
      width: { min: '', max: '' },
      thickness: { min: '', max: '' },
      allowMixed: false
    },
    defects: {
      knotSize: '',
      surfaceDefects: 3,
      edgeDefects: 'none',
      colorVariation: 'minimal'
    },
    additional: {
      moistureContent: '',
      grainPattern: 'straight',
      surfaceFinish: 'rough',
      specialRequirements: ''
    },
    volume: '',
    unit: 'm3',
    requiredDate: '',
    priority: 'standard',
    client: '',
    contactPerson: '',
    projectReference: '',
    preferredLine: 'auto',
    inspectionLevel: 'standard',
    specialInstructions: ''
  }
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