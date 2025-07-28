<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900">Production Orders</h1>
      <Button>
        <router-link to="/orders/create" class="flex items-center">
          <Plus class="w-4 h-4 mr-2" />
          Schedule New Order
        </router-link>
      </Button>
    </div>

    <!-- Tab Navigation -->
    <Tabs v-model="activeTab" class="mb-6">
      <TabsList>
        <TabsTrigger value="current">Current Orders (3)</TabsTrigger>
        <TabsTrigger value="past">Past Orders (2)</TabsTrigger>
      </TabsList>

      <!-- Current Orders Tab -->
      <TabsContent value="current">
        <!-- Running Order -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-emerald-600 mb-6">Running Order</h2>
          
          <Card class="border-2 border-emerald-300">
            <CardContent class="p-8">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 flex items-center mb-2">
                    <Zap class="w-5 h-5 text-emerald-600 mr-2" />
                    Red Oak - Prime Run
                  </h3>
                  <div class="text-sm text-gray-500">
                    ID: ORD-20250701-001 | Customer: Johnson Lumber Co.
                  </div>
                </div>
                <Badge variant="secondary" class="border">Running</Badge>
              </div>

              <div class="grid grid-cols-3 gap-8 mb-8">
                <div>
                  <div class="flex items-center mb-2">
                    <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                    <span class="text-sm text-gray-600">Species</span>
                  </div>
                  <div class="text-base font-medium text-gray-900">Red Oak (KD)</div>
                </div>
                <div>
                  <div class="flex items-center mb-2">
                    <Clock class="w-4 h-4 text-gray-400 mr-2" />
                    <span class="text-sm text-gray-600">Scheduled Start</span>
                  </div>
                  <div class="text-base font-medium text-gray-900">Jul 1, 8:00 AM</div>
                </div>
                <div>
                  <div class="flex items-center mb-2">
                    <User class="w-4 h-4 text-gray-400 mr-2" />
                    <span class="text-sm text-gray-600">Operator</span>
                  </div>
                  <div class="text-base font-medium text-gray-900">John Doe</div>
                </div>
              </div>

              <div class="text-sm text-gray-600 mb-4">Key Performance Indicators:</div>
              <div class="grid grid-cols-4 gap-6 mb-8">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 class="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Boards Scanned</div>
                    <div class="text-xl font-bold text-gray-900">125</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <Package class="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Bundles Created</div>
                    <div class="text-xl font-bold text-gray-900">4</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Clock class="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Time Elapsed</div>
                    <div class="text-xl font-bold text-gray-900">1h 02m</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Timer class="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Time Remaining (Est.)</div>
                    <div class="text-xl font-bold text-gray-900">1h 58m</div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end">
                <Button variant="outline">
                  <Power class="w-4 h-4 mr-2" />
                  Stop & Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Upcoming Orders -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Upcoming Orders (5)</h2>
            <Button variant="outline" asChild>
              <router-link to="/orders/all">
                Show All
              </router-link>
            </Button>
          </div>
          
          <!-- Upcoming Orders Table -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500 w-16">Priority</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">Order Details</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">Species & Grade Mix</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">Schedule</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">Status</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">Actions</th>
                </tr>
              </thead>
              <tbody ref="tableBodyRef" class="bg-white divide-y divide-gray-200">
                <tr v-for="order in upcomingOrders" :key="order.id" class="hover:bg-emerald-50 transition-colors duration-150 cursor-move">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <div class="drag-handle flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600">
                        <Menu class="w-4 h-4" />
                      </div>
                      <div class="flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                        {{ order.priority }}
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-start">
                      <div>
                        <div class="text-sm font-bold text-gray-900">{{ order.name }}</div>
                        <div class="text-xs text-emerald-600 font-medium">{{ order.id }}</div>
                        <div class="text-xs text-gray-500">{{ order.volume }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="space-y-1">
                      <div class="text-xs font-medium text-gray-900">{{ order.species }}</div>
                      <div class="text-xs text-gray-600">{{ order.dryStatus }}</div>
                      <div class="text-xs text-gray-500 truncate max-w-32" :title="order.targetMix">
                        {{ order.targetMix }}
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="space-y-0.5">
                      <div class="text-xs font-medium text-gray-900">{{ order.date }}</div>
                      <div class="text-xs text-gray-600">{{ order.time }}</div>
                      <div class="text-xs text-gray-500 truncate">{{ order.shift }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="space-y-1">
                      <Badge variant="secondary" class="border text-xs px-2 py-0.5">{{ order.status }}</Badge>
                      <div :class="order.canStart ? 'text-xs text-gray-500' : 'text-xs text-orange-600 font-medium'" class="truncate">
                        {{ order.statusDetail }}
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center space-x-2">
                      <button 
                        class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                        :disabled="!order.canStart" 
                        :title="order.canStart ? 'Start Order' : 'Setup Required'"
                      >
                        <Play v-if="order.canStart" class="w-3 h-3 mx-auto" />
                        <Settings v-else class="w-3 h-3 mx-auto" />
                      </button>
                      <button 
                        class="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                        title="Edit Order"
                      >
                        <Edit class="w-3 h-3" />
                      </button>
                      <button 
                        class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors" 
                        title="View Details"
                      >
                        <Eye class="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>

      <!-- Past Orders Tab -->
      <TabsContent value="past">
        <!-- Search and Filters -->
        <div class="flex items-center space-x-4 mb-6">
          <div class="relative flex-1 max-w-md">
            <Search class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              v-model="pastOrdersSearchQuery"
              type="text"
              placeholder="Search past orders..."
              class="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            v-model="pastOrdersStatusFilter"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            v-model="pastOrdersSpeciesFilter"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Species</option>
            <option value="Red Oak">Red Oak</option>
            <option value="White Oak">White Oak</option>
            <option value="Soft Maple">Soft Maple</option>
            <option value="Hard Maple">Hard Maple</option>
            <option value="Cherry">Cherry</option>
            <option value="Walnut">Walnut</option>
          </select>
          <Button variant="outline" @click="clearPastOrdersFilters">
            <X class="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        </div>

        <!-- Results Summary -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-gray-600">
            Showing {{ filteredPastOrders.length }} of {{ pastOrders.length }} past orders
          </div>
        </div>

        <!-- Past Orders Table -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Order ID
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Order Name
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Customer
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Species
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Volume
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Completed Date
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Status
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-emerald-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredPastOrders" :key="order.id" class="hover:bg-emerald-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-emerald-600">{{ order.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ order.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.customer }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.species }}</div>
                  <div class="text-xs text-gray-500">{{ order.dryStatus }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.volume }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.completedDate }}</div>
                  <div class="text-xs text-gray-500">{{ order.completedTime }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge :variant="getPastOrderStatusVariant(order.status)" class="text-xs">
                    {{ order.status }}
                  </Badge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Eye class="w-4 h-4" />
                    </button>
                    <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreHorizontal class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import {
  Plus, Zap, TreePine, Clock, User, Power, BarChart3, Timer, Menu, Edit, Play,
  Calendar, Droplets, Search, Eye, RotateCcw, Hash, AlertCircle, Package, Settings,
  MoreHorizontal, X
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'
import Badge from '@/components/ui/badge.vue'
import Tabs from '@/components/ui/tabs.vue'
import TabsContent from '@/components/ui/tabs-content.vue'
import TabsList from '@/components/ui/tabs-list.vue'
import TabsTrigger from '@/components/ui/tabs-trigger.vue'

const activeTab = ref('current')

// Past orders search and filter states
const pastOrdersSearchQuery = ref('')
const pastOrdersStatusFilter = ref('')
const pastOrdersSpeciesFilter = ref('')

// Orders data with priority field
const upcomingOrders = ref([
  {
    id: 'ORD-20250701-002',
    priority: 1,
    name: 'Soft Maple - Special Order',
    species: 'Soft Maple',
    dryStatus: 'Green (Air Dried)',
    volume: '2,500 bf',
    date: 'Jul 1, 2025',
    time: '1:00 PM - 6:00 PM',
    shift: 'Afternoon Shift',
    status: 'Scheduled',
    statusDetail: 'Ready to Start',
    targetMix: '40% Prime, 35% Select, 25% #1 Common',
    canStart: true
  },
  {
    id: 'ORD-20250702-003',
    priority: 2,
    name: 'White Oak - Flooring Grade',
    species: 'White Oak',
    dryStatus: 'Kiln Dried (KD)',
    volume: '4,200 bf',
    date: 'Jul 2, 2025',
    time: '9:00 AM - 5:00 PM',
    shift: 'Morning + Afternoon Shift',
    status: 'Scheduled',
    statusDetail: 'Pending Setup',
    targetMix: '60% Select, 30% #1 Common, 10% #2 Common',
    canStart: false
  },
  {
    id: 'ORD-20250703-004',
    priority: 3,
    name: 'Cherry - Cabinet Grade',
    species: 'Cherry',
    dryStatus: 'Kiln Dried (KD)',
    volume: '1,800 bf',
    date: 'Jul 3, 2025',
    time: '8:00 AM - 2:00 PM',
    shift: 'Morning Shift',
    status: 'Scheduled',
    statusDetail: 'Ready to Start',
    targetMix: '50% FAS, 30% Select, 20% #1 Common',
    canStart: true
  },
  {
    id: 'ORD-20250703-005',
    priority: 4,
    name: 'Hard Maple - Premium',
    species: 'Hard Maple',
    dryStatus: 'Kiln Dried (KD)',
    volume: '3,600 bf',
    date: 'Jul 3, 2025',
    time: '2:00 PM - 8:00 PM',
    shift: 'Afternoon Shift',
    status: 'Scheduled',
    statusDetail: 'Pending Setup',
    targetMix: '45% FAS, 35% Select, 20% #1 Common',
    canStart: false
  },
  {
    id: 'ORD-20250704-006',
    priority: 5,
    name: 'Walnut - Select Grade',
    species: 'Walnut',
    dryStatus: 'Kiln Dried (KD)',
    volume: '1,200 bf',
    date: 'Jul 4, 2025',
    time: '9:00 AM - 3:00 PM',
    shift: 'Morning Shift',
    status: 'Scheduled',
    statusDetail: 'Material Pending',
    targetMix: '60% FAS, 25% Select, 15% #1 Common',
    canStart: false
  }
])

// Past orders data
const pastOrders = ref([
  {
    id: 'ORD-20250630-004',
    name: 'Cherry - Cabinet Grade',
    customer: 'Cabinet Masters',
    species: 'Cherry',
    dryStatus: 'Kiln Dried (KD)',
    volume: '1,800 bf',
    completedDate: 'Jun 30, 2025',
    completedTime: '2:00 PM',
    status: 'Completed'
  },
  {
    id: 'ORD-20250629-005',
    name: 'Hard Maple - Premium',
    customer: 'Premium Hardwoods',
    species: 'Hard Maple',
    dryStatus: 'Kiln Dried (KD)',
    volume: '3,600 bf',
    completedDate: 'Jun 29, 2025',
    completedTime: '4:00 PM',
    status: 'Completed'
  },
  {
    id: 'ORD-20250628-006',
    name: 'Walnut - Select Grade',
    customer: 'Luxury Millwork',
    species: 'Walnut',
    dryStatus: 'Kiln Dried (KD)',
    volume: '1,200 bf',
    completedDate: 'Jun 28, 2025',
    completedTime: '3:00 PM',
    status: 'Completed'
  },
  {
    id: 'ORD-20250627-007',
    name: 'Red Oak - Construction Grade',
    customer: 'BuildCorp',
    species: 'Red Oak',
    dryStatus: 'Green (Air Dried)',
    volume: '5,000 bf',
    completedDate: 'Jun 27, 2025',
    completedTime: '6:00 PM',
    status: 'Completed'
  },
  {
    id: 'ORD-20250626-008',
    name: 'Soft Maple - Furniture Grade',
    customer: 'Modern Furniture Co.',
    species: 'Soft Maple',
    dryStatus: 'Kiln Dried (KD)',
    volume: '2,800 bf',
    completedDate: 'Jun 26, 2025',
    completedTime: '4:00 PM',
    status: 'Cancelled'
  },
  {
    id: 'ORD-20250625-009',
    name: 'White Oak - Flooring Premium',
    customer: 'Premium Flooring Inc.',
    species: 'White Oak',
    dryStatus: 'Kiln Dried (KD)',
    volume: '4,500 bf',
    completedDate: 'Jun 25, 2025',
    completedTime: '5:30 PM',
    status: 'Completed'
  }
])

// Computed property for filtered past orders
const filteredPastOrders = computed(() => {
  return pastOrders.value.filter(order => {
    const matchesSearch = !pastOrdersSearchQuery.value || 
      order.name.toLowerCase().includes(pastOrdersSearchQuery.value.toLowerCase()) ||
      order.id.toLowerCase().includes(pastOrdersSearchQuery.value.toLowerCase()) ||
      order.customer.toLowerCase().includes(pastOrdersSearchQuery.value.toLowerCase())
    
    const matchesStatus = !pastOrdersStatusFilter.value || order.status === pastOrdersStatusFilter.value
    const matchesSpecies = !pastOrdersSpeciesFilter.value || order.species === pastOrdersSpeciesFilter.value
    
    return matchesSearch && matchesStatus && matchesSpecies
  })
})

// Methods for past orders
const clearPastOrdersFilters = () => {
  pastOrdersSearchQuery.value = ''
  pastOrdersStatusFilter.value = ''
  pastOrdersSpeciesFilter.value = ''
}

const getPastOrderStatusVariant = (status) => {
  switch (status) {
    case 'Completed':
      return 'outline'
    case 'Cancelled':
      return 'destructive'
    default:
      return 'secondary'
  }
}
</script>

<style scoped>
.sortable-chosen {
  background: #ecfdf5;
}

.sortable-drag {
  background: #ffffff;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  transform: rotate(2deg);
}

.sortable-ghost td {
  background: transparent;
}
</style>