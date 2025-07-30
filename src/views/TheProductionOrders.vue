<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
    <ThePageHeader
      title="Production Orders"
      description="Manage and monitor production orders"
    >
      <template #actions>
        <BaseButton variant="outline" as-child>
          <router-link to="/orders/past">Past Orders</router-link>
        </BaseButton>
        <BaseButton as-child>
          <router-link to="/orders/create" class="flex items-center">
            <Plus class="w-4 h-4 mr-2" />
            Schedule New Order
          </router-link>
        </BaseButton>
      </template>
    </ThePageHeader>

    <!-- Running Order -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-emerald-600 mb-6">Running Order</h2>
      
      <BaseCard class="border-2 border-emerald-300">
        <BaseCardContent class="p-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 flex items-center mb-2">
                <Zap class="w-5 h-5 text-emerald-600 mr-2" />
                {{ runningOrder.name }}
              </h3>
              <div class="text-sm text-gray-500">
                ID: <router-link :to="`/orders/${runningOrder.id}`" class="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">
                  {{ runningOrder.id }}
                </router-link> | Customer: {{ runningOrder.customer }}
              </div>
            </div>
            <BaseBadge variant="secondary" class="border">Running</BaseBadge>
          </div>

          <div class="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div class="flex items-center mb-2">
                <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-sm text-gray-600">Species</span>
              </div>
              <div class="text-base font-medium text-gray-900">{{ runningOrder.species }}</div>
            </div>
            <div>
              <div class="flex items-center mb-2">
                <Clock class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-sm text-gray-600">Scheduled Start</span>
              </div>
              <div class="text-base font-medium text-gray-900">{{ runningOrder.scheduledStart }}</div>
            </div>
            <div>
              <div class="flex items-center mb-2">
                <User class="w-4 h-4 text-gray-400 mr-2" />
                <span class="text-sm text-gray-600">Operator</span>
              </div>
              <div class="text-base font-medium text-gray-900">{{ runningOrder.operator }}</div>
            </div>
          </div>

          <div class="text-sm text-gray-600 mb-4">Key Performance Indicators:</div>
          <div class="grid grid-cols-4 gap-6 mb-8">
            <TheKpiCard
              v-for="kpi in runningOrderKpis"
              :key="kpi.label"
              :label="kpi.label"
              :value="kpi.value"
              :icon="kpi.icon"
              :icon-color="kpi.iconColor"
            />
          </div>

          <div class="flex justify-end">
            <BaseButton variant="outline">
              <Power class="w-4 h-4 mr-2" />
              Stop & Complete
            </BaseButton>
          </div>
        </BaseCardContent>
      </BaseCard>
    </div>

    <!-- Upcoming Orders -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Upcoming Orders ({{ upcomingOrders.length }})</h2>
        <BaseButton variant="outline" asChild>
          <router-link to="/orders/all">Show All</router-link>
        </BaseButton>
      </div>
      
      <!-- Upcoming Orders Table -->
      <TheDataTable
        :columns="orderColumns"
        :filtered-count="upcomingOrders.length"
        :total-count="upcomingOrders.length"
        :show-filters="false"
        :show-pagination="false"
      >
        <template #rows>
          <tr 
            v-for="(order, index) in upcomingOrders" 
            :key="order.id" 
            :class="[
              'hover:bg-emerald-50 transition-colors duration-150 cursor-move',
              dragOverIndex === index ? 'bg-emerald-100 border-t-2 border-emerald-500' : ''
            ]"
            draggable="true"
            @dragstart="handleDragStart($event, order, index)"
            @dragend="handleDragEnd"
            @dragover="handleDragOver($event, index)"
            @dragleave="handleDragLeave"
            @drop="handleDrop($event, index)"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <div class="drag-handle flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
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
                  <div class="text-xs text-emerald-600 font-medium">
                    <router-link :to="`/orders/${order.id}`" class="hover:text-emerald-800 hover:underline">
                      {{ order.id }}
                    </router-link>
                  </div>
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
                <BaseBadge variant="secondary" class="border text-xs px-2 py-0.5">{{ order.status }}</BaseBadge>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center space-x-2">
                <button 
                  class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                  :disabled="!order.canStart" 
                  :title="order.canStart ? 'Start Order' : 'Setup Required'"
                  @click="startOrder(order)"
                >
                  <Play v-if="order.canStart" class="w-3 h-3 mx-auto" />
                  <Settings v-else class="w-3 h-3 mx-auto" />
                </button>
                <button 
                  class="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                  title="Edit Order"
                  @click="editOrder(order)"
                >
                  <Edit class="w-3 h-3" />
                </button>
                <button 
                  class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors" 
                  title="View Details"
                  @click="viewOrder(order)"
                >
                  <Eye class="w-3 h-3" />
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TheDataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Plus, Zap, TreePine, Clock, User, Power, BarChart3, Timer, Menu, Edit, Play,
  Eye, Package, Settings
} from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseCardContent from '@/components/ui/BaseCardContent.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import ThePageHeader from '@/components/common/ThePageHeader.vue'
import TheKpiCard from '@/components/common/TheKpiCard.vue'
import TheDataTable from '@/components/common/TheDataTable.vue'

const router = useRouter()

// Types
interface Order {
  id: string
  priority: number
  name: string
  species: string
  dryStatus: string
  volume: string
  date: string
  time: string
  shift: string
  status: string
  targetMix: string
  canStart: boolean
  customer?: string
  scheduledStart?: string
  operator?: string
}

// Drag and drop state
const draggedItem = ref<{ order: Order; index: number } | null>(null)
const dragOverIndex = ref<number | null>(null)

// Running order data
const runningOrder = ref({
  id: 'ORD-20250701-001',
  name: 'Red Oak - Prime Run',
  customer: 'Johnson Lumber Co.',
  species: 'Red Oak (KD)',
  scheduledStart: 'Jul 1, 8:00 AM',
  operator: 'John Doe',
  status: 'Running'
})

const runningOrderKpis = computed(() => [
  { label: 'Boards Scanned', value: '125', icon: BarChart3, iconColor: 'emerald' as const },
  { label: 'Bundles Created', value: '4', icon: Package, iconColor: 'emerald' as const },
  { label: 'Time Elapsed', value: '1h 02m', icon: Clock, iconColor: 'gray' as const },
  { label: 'Time Remaining (Est.)', value: '1h 58m', icon: Timer, iconColor: 'gray' as const }
])

// Orders data
const upcomingOrders = ref<Order[]>([
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
    targetMix: '60% Select, 30% #1 Common, 10% #2 Common',
    canStart: false
  }
])

const orderColumns = [
  { key: 'priority', label: 'Priority' },
  { key: 'details', label: 'Order Details' },
  { key: 'species', label: 'Species & Grade Mix' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

// Methods
const stopOrder = (): void => {
  console.log('Stopping order:', runningOrder.value.id)
}

const startOrder = (order: Order): void => {
  console.log('Starting order:', order.id)
}

const editOrder = (order: Order): void => {
  router.push(`/orders/${order.id}/edit`)
}

const viewOrder = (order: Order): void => {
  router.push(`/orders/${order.id}`)
}

// Drag and drop handlers
const handleDragStart = (event: DragEvent, order: Order, index: number): void => {
  draggedItem.value = { order, index }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
  if (event.target instanceof HTMLElement) {
    event.target.style.opacity = '0.5'
  }
}

const handleDragEnd = (event: DragEvent): void => {
  if (event.target instanceof HTMLElement) {
    event.target.style.opacity = '1'
  }
  draggedItem.value = null
  dragOverIndex.value = null
}

const handleDragOver = (event: DragEvent, index: number): void => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  dragOverIndex.value = index
}

const handleDragLeave = (): void => {
  dragOverIndex.value = null
}

const handleDrop = (event: DragEvent, targetIndex: number): void => {
  event.preventDefault()
  
  if (!draggedItem.value || draggedItem.value.index === targetIndex) {
    return
  }
  
  const orders = [...upcomingOrders.value]
  const draggedOrder = orders[draggedItem.value.index]
  
  // Remove the dragged item
  orders.splice(draggedItem.value.index, 1)
  
  // Insert at new position
  orders.splice(targetIndex, 0, draggedOrder)
  
  // Update priorities
  orders.forEach((order, index) => {
    order.priority = index + 1
  })
  
  upcomingOrders.value = orders
  draggedItem.value = null
  dragOverIndex.value = null
}
</script>