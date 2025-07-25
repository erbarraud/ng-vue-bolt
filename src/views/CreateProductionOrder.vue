<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Create New Production Order</h1>
      <p class="text-gray-600 mt-2">
        Fill in the details below to schedule a new order. You can link existing sort templates or define
        custom sorts specific to this order.
      </p>
    </div>

    <form @submit.prevent="saveOrder" class="space-y-8">
      <!-- Order Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Order Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="orderId" class="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
            <input
              id="orderId"
              type="text"
              v-model="orderForm.orderId"
              class="w-full px-4 py-3 border border-input rounded-lg bg-muted focus:ring-2 focus:ring-ring focus:border-ring"
              readonly
            />
          </div>
          
          <div>
            <label for="orderName" class="block text-sm font-medium text-gray-700 mb-2">Order Name / Label</label>
            <input
              id="orderName"
              type="text"
              v-model="orderForm.orderName"
              placeholder="e.g., Soft Maple - Monday Shift"
              class="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
          
          <div>
            <label for="species" class="block text-sm font-medium text-gray-700 mb-2">Species</label>
            <select
              id="species"
              v-model="orderForm.species"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select species</option>
              <option value="red-oak">Red Oak</option>
              <option value="white-oak">White Oak</option>
              <option value="cherry">Cherry</option>
              <option value="soft-maple">Soft Maple</option>
              <option value="hard-maple">Hard Maple</option>
              <option value="walnut">Walnut</option>
            </select>
          </div>
          
          <div>
            <label for="dryStatus" class="block text-sm font-medium text-gray-700 mb-2">Dry Status</label>
            <select
              id="dryStatus"
              v-model="orderForm.dryStatus"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select dry status</option>
              <option value="kd">Kiln Dried (KD)</option>
              <option value="ad">Air Dried (AD)</option>
              <option value="green">Green</option>
            </select>
          </div>
          
          <div>
            <label for="productionDate" class="block text-sm font-medium text-gray-700 mb-2">Production Date</label>
            <input
              id="productionDate"
              type="date"
              v-model="orderForm.productionDate"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label for="shift" class="block text-sm font-medium text-gray-700 mb-2">Shift (Optional)</label>
            <select
              id="shift"
              v-model="orderForm.shift"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select shift</option>
              <option value="morning">Morning Shift (7:00 AM - 3:00 PM)</option>
              <option value="afternoon">Afternoon Shift (3:00 PM - 11:00 PM)</option>
              <option value="night">Night Shift (11:00 PM - 7:00 AM)</option>
            </select>
          </div>
          
          <div class="md:col-span-2">
            <label for="customer" class="block text-sm font-medium text-gray-700 mb-2">Customer (Optional)</label>
            <input
              id="customer"
              type="text"
              v-model="orderForm.customer"
              placeholder="Enter customer name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <!-- Sort Definitions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Sort Definitions for This Order</h2>
        
        <div class="mb-6">
          <div class="flex space-x-8">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="sortDefinitionType"
                value="existing"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Link Existing Templates (Use As-Is)</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="sortDefinitionType"
                value="custom"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Define Custom Sorts</span>
            </label>
          </div>
        </div>

        <div v-if="sortDefinitionType === 'custom'" class="space-y-6">
          <p class="text-sm text-gray-600">
            Create new custom sort definitions for this order. You can start from scratch or use an existing template as a base.
          </p>
          
          <div class="flex space-x-8">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="customSortMethod"
                value="blank"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Start with Blank Definition</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="customSortMethod"
                value="template"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Start from Existing Template</span>
            </label>
          </div>

          <!-- Custom Sort Configuration -->
          <div v-if="customSortMethod" class="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Custom Sort #1</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>FAS</option>
                  <option>1 Common</option>
                  <option>2 Common</option>
                  <option>3 Common</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lumber Stage</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Surfaced</option>
                  <option>Rough</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Board Aspect Selection</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Best Face</option>
                  <option>Worst Face</option>
                  <option>Random Face</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Enable Color Sorting</label>
                <select class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Disabled</option>
                  <option>Enabled</option>
                </select>
              </div>
            </div>

            <!-- Commercial Dimensions -->
            <div class="mt-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Commercial Dimensions</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Width</label>
                  <div class="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span class="px-3 py-2 text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span class="px-3 py-2 text-gray-500">in</span>
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs text-gray-500 mb-1">Tolerance</label>
                    <input
                      type="number"
                      placeholder="±0.25"
                      class="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Length</label>
                  <div class="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span class="px-3 py-2 text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <span class="px-3 py-2 text-gray-500">ft</span>
                  </div>
                  <div class="mt-2">
                    <label class="block text-xs text-gray-500 mb-1">Tolerance</label>
                    <input
                      type="number"
                      placeholder="±6"
                      class="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Custom Logic Tag -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Custom Logic Tag</label>
              <input
                type="text"
                placeholder="Enter custom logic or special requirements"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex items-center justify-end space-x-4">
        <Button
          variant="outline"
          @click="$router.push('/orders')"
        >
          Cancel
        </Button>
        <Button
          type="submit"
        >
          Save Order
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const orderForm = ref({
  orderId: 'ORD-2025-07-24-214',
  orderName: '',
  species: '',
  dryStatus: '',
  productionDate: '',
  shift: '',
  customer: ''
})

const sortDefinitionType = ref('existing')
const customSortMethod = ref('')

const saveOrder = () => {
  // Here you would typically save the order data
  console.log('Saving order:', orderForm.value)
  router.push('/orders')
}

onMounted(() => {
  // Set default production date to today
  const today = new Date().toISOString().split('T')[0]
  orderForm.value.productionDate = today
})
</script>