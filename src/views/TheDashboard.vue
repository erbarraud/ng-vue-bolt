<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-8">
      <LoadingSkeleton variant="card" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LoadingSkeleton variant="list" :rows="6" />
        <LoadingSkeleton variant="card" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-64">
      <div class="text-center space-y-4">
        <AlertCircle class="w-16 h-16 text-destructive mx-auto" />
        <h2 class="text-xl font-semibold text-foreground">Failed to load dashboard</h2>
        <p class="text-muted-foreground">{{ error.message }}</p>
        <BaseButton @click="retryLoad" variant="outline">
          <RefreshCw class="w-4 h-4 mr-2" />
          Try Again
        </BaseButton>
      </div>
    </div>

    <!-- Dashboard Content -->
    <template v-else>
      <!-- KPIs and Chart Section -->
      <BaseCard class="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-sm">
        <BaseCardContent class="p-6">
          <!-- Header with Shift Status -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-2">
                <Calendar class="w-5 h-5 text-emerald-600" />
                <span class="text-lg font-semibold text-slate-900">Production Overview</span>
              </div>
              <BaseBadge variant="secondary" class="bg-emerald-50 text-emerald-700 border-emerald-200">
                No Active Shift
              </BaseBadge>
            </div>
            <BaseButton variant="outline" size="sm" class="bg-white/80">
              <Download class="w-4 h-4 mr-2" />
              Export
            </BaseButton>
          </div>

          <!-- KPIs Row -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <TheKpiCard
              label="Next Shift"
              value="Morning - 7:00 AM"
              :icon="Calendar"
              icon-color="emerald"
            />
            <TheKpiCard
              label="Value Processed"
              value="$24,680"
              :icon="DollarSign"
              icon-color="emerald"
              trend="+8.2%"
              trend-direction="up"
            />
            <TheKpiCard
              label="Volume Processed"
              value="38.4 m³"
              :icon="Package"
              icon-color="emerald"
              trend="+12.1%"
              trend-direction="up"
            />
            <TheKpiCard
              label="Feedback Submitted"
              value="34"
              :icon="MessageSquare"
              icon-color="emerald"
              trend="-2.3%"
              trend-direction="down"
            />
          </div>

          <!-- Chart Section -->
          <div>
            <h3 class="text-lg font-semibold text-slate-900 mb-4">Boards Processed per Hour</h3>
            <div class="h-64 bg-white/40 rounded-lg p-4 border border-slate-100">
              <Bar :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </BaseCardContent>
      </BaseCard>

      <!-- Recent Orders and System Alerts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Orders -->
        <BaseCard>
          <BaseCardContent class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900">Recent Orders</h3>
              <BaseButton variant="link">
                View All
                <ChevronRight class="w-4 h-4 ml-1" />
              </BaseButton>
            </div>
            <div class="text-sm text-slate-600 mb-4">Latest wood grading operations</div>
            
            <!-- Order List -->
            <div class="space-y-2">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md"
              >
                <div class="flex items-center space-x-4 flex-1">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div>
                    <div class="font-semibold text-slate-900">{{ order.name }}</div>
                    <div class="text-xs text-slate-500">
                      <router-link :to="`/orders/${order.id}`" class="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">
                        {{ order.displayId }}
                      </router-link>
                      • {{ order.startTime }}
                    </div>
                  </div>
                  <div class="text-sm text-slate-600">{{ order.customer }}</div>
                  <BaseBadge :variant="getOrderStatusVariant(order.status)" class="text-xs">
                    {{ order.status }}
                  </BaseBadge>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="text-right">
                    <div class="text-sm font-semibold text-slate-900">{{ order.boardCount }} boards</div>
                    <div class="text-xs text-slate-500">{{ order.volume }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold text-emerald-600">${{ order.value }}</div>
                    <div class="text-xs text-slate-500">{{ order.accuracy }} acc</div>
                  </div>
                  <BaseButton variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal class="h-4 w-4" />
                  </BaseButton>
                </div>
              </div>
            </div>
          </BaseCardContent>
        </BaseCard>

        <!-- System Alerts -->
        <BaseCard>
          <BaseCardContent class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900">System Alerts</h3>
              <BaseButton variant="link" class="text-emerald-600 hover:text-emerald-700 p-0">
                View All Alerts
              </BaseButton>
            </div>
            <div class="text-sm text-slate-600 mb-4">Recent notifications and warnings</div>
            
            <div class="space-y-4">
              <div
                v-for="alert in systemAlerts"
                :key="alert.id"
                class="flex items-start space-x-3 p-3 rounded-xl border-l-4"
                :class="getAlertClasses(alert.type)"
              >
                <component :is="alert.icon" :class="getAlertIconClasses(alert.type)" class="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-slate-900">{{ alert.title }}</div>
                  <div class="text-sm text-slate-600 mt-1">{{ alert.description }}</div>
                  <div class="text-xs text-slate-500 mt-2 flex items-center">
                    <Clock class="w-3 h-3 mr-1" />
                    {{ alert.timestamp }}
                  </div>
                </div>
              </div>
            </div>
          </BaseCardContent>
        </BaseCard>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Calendar, Clock, DollarSign, Package, MessageSquare, TrendingUp, TrendingDown,
  MoreHorizontal, Download, ChevronRight, AlertTriangle, FileText, RefreshCw, AlertCircle
} from 'lucide-vue-next'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Components
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseCardContent from '@/components/ui/BaseCardContent.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import LoadingSkeleton from '@/components/ui/loading-skeleton.vue'
import TheKpiCard from '@/components/common/TheKpiCard.vue'
import { useAsyncState } from '@/composables/useAsyncState.js'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Types
interface Order {
  id: string
  displayId: string
  name: string
  customer: string
  startTime: string
  status: 'Active' | 'Completed' | 'Scheduled'
  boardCount: number
  volume: string
  value: string
  accuracy: string
}

interface Alert {
  id: number
  type: 'warning' | 'info'
  icon: any
  title: string
  description: string
  timestamp: string
}

// Reactive data
const recentOrders = ref<Order[]>([
  {
    id: 'ORD-20250701-001',
    displayId: 'Order B-4873',
    name: 'Red Oak - Premium Run',
    customer: 'Johnson Lumber Co.',
    startTime: 'Started 09:15 AM',
    status: 'Active',
    boardCount: 125,
    volume: '3.8 / 11.2 m³',
    value: '2,847',
    accuracy: '92.1%'
  },
  {
    id: 'ORD-20250701-002',
    displayId: 'Order B-4872',
    name: 'Soft Maple - Special Order',
    customer: 'Artisan Furniture',
    startTime: '08:30 AM - 11:45 AM',
    status: 'Completed',
    boardCount: 287,
    volume: '12.6 m³',
    value: '4,125',
    accuracy: '91.8%'
  },
  {
    id: 'ORD-20250702-003',
    displayId: 'Order B-4871',
    name: 'White Oak - Flooring',
    customer: 'Flooring Inc.',
    startTime: '07:15 AM - 10:30 AM',
    status: 'Completed',
    boardCount: 198,
    volume: '9.9 m³',
    value: '3,672',
    accuracy: '92.5%'
  }
])

const systemAlerts = ref<Alert[]>([
  {
    id: 1,
    type: 'warning',
    icon: AlertTriangle,
    title: 'Accuracy Drop Detected',
    description: 'Batch #4872 showed 5% lower accuracy than average',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    icon: FileText,
    title: 'New Grading Rule Added',
    description: 'Admin user added a new rule for knot detection',
    timestamp: 'Jul 24, 2025'
  }
])

// Chart data
const chartData = ref({
  labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
  datasets: [
    {
      label: 'Grade A',
      data: [95, 145, 98, 45, 185, 95, 125, 165, 175],
      backgroundColor: '#059669',
      borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
    },
    {
      label: 'Grade B',
      data: [35, 45, 42, 25, 55, 35, 45, 55, 65],
      backgroundColor: '#10b981',
      borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }
    },
    {
      label: 'Grade C',
      data: [25, 35, 28, 15, 35, 25, 35, 45, 35],
      backgroundColor: '#34d399',
      borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 }
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: { color: '#f1f5f9', drawBorder: false },
      ticks: { color: '#6b7280', font: { size: 12 } }
    },
    y: {
      stacked: true,
      grid: { color: '#f1f5f9', drawBorder: false },
      ticks: { color: '#6b7280', font: { size: 12 } }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: { color: '#6b7280', font: { size: 12 } }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1
    }
  }
})

// Computed properties
const getOrderStatusVariant = computed(() => (status: string) => {
  switch (status) {
    case 'Active': return 'default'
    case 'Completed': return 'secondary'
    case 'Scheduled': return 'outline'
    default: return 'secondary'
  }
})

const getAlertClasses = computed(() => (type: string) => {
  switch (type) {
    case 'warning': return 'bg-orange-50 border-orange-400'
    case 'info': return 'bg-emerald-50 border-emerald-400'
    default: return 'bg-gray-50 border-gray-400'
  }
})

const getAlertIconClasses = computed(() => (type: string) => {
  switch (type) {
    case 'warning': return 'text-orange-600'
    case 'info': return 'text-emerald-600'
    default: return 'text-gray-600'
  }
})

// Async data loading
const loadDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true }
}

const { isLoading, error, execute: retryLoad } = useAsyncState(
  loadDashboardData,
  null,
  { immediate: false }
)

onMounted(() => retryLoad())
</script>