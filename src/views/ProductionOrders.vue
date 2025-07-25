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
                <Button variant="outline" class="flex items-center">
                  <Power class="w-4 h-4 mr-2" />
                  Stop & Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Upcoming Orders -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Upcoming Orders (2)</h2>
          
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
                    <div class="flex flex-col space-y-1">
                      <Button size="sm" class="w-full text-xs px-2 py-1 h-7" :disabled="!order.canStart" :variant="order.canStart ? 'default' : 'outline'">
                        <Play class="w-3 h-3 mr-1" />
                        {{ order.canStart ? 'Start Order' : 'Setup Required' }}
                      </Button>
                      <div class="flex space-x-0.5">
                        <Button variant="outline" size="sm" class="flex-1 text-xs px-1 py-1 h-6">
                          <Edit class="w-3 h-3 mr-0.5" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" class="flex-1 text-xs px-1 py-1 h-6">
                          <Eye class="w-3 h-3 mr-0.5" />
                          View
                        </Button>
                      </div>
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
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search by ID, Name, Customer..."
                class="pl-10 w-64"
              />
            </div>
            <Select>
              <SelectTrigger class="w-40">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger class="w-40">
                <SelectValue placeholder="All Species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="red-oak">Red Oak</SelectItem>
                <SelectItem value="white-oak">White Oak</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
                <SelectItem value="hard-maple">Hard Maple</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="link" class="text-emerald-600">Clear Filters</Button>
        </div>


      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import {
  Plus, Zap, TreePine, Clock, User, Power, BarChart3, Timer, Menu, Edit, Play,
  Calendar, Droplets, Search, Eye, RotateCcw, Hash, AlertCircle, Package
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
  }
])

// Drag and drop functionality
const tableBodyRef = ref()

useSortable(tableBodyRef, upcomingOrders, {
  handle: '.drag-handle',
  animation: 150,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  onEnd: (evt) => {
    // Update priority numbers based on new order
    upcomingOrders.value.forEach((order, index) => {
      order.priority = index + 1
    })
    console.log('Orders reordered:', upcomingOrders.value.map(o => ({ id: o.id, priority: o.priority })))
  }
})
</script>

<style scoped>
.drag-handle {
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.sortable-ghost {
  opacity: 0.5;
  background: #f0fdf4;
}

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