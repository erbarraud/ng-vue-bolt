<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
    <!-- First Line: KPIs and Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
      <!-- KPI Cards - Left Side -->
      <div class="lg:col-span-1">
        <div class="space-y-4">
          <!-- Value Processed -->
          <Card class="border-l-4 border-primary">
            <CardContent class="p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                  <DollarSign class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div class="text-sm font-medium text-slate-700">Value Processed</div>
                  <div class="text-xl font-bold text-slate-900">$24,680</div>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center">
                  <TrendingUp class="h-3 w-3 text-primary mr-1" />
                  <span class="text-xs text-primary font-semibold">+8.2%</span>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>

          <!-- Volume Processed -->
          <Card class="border-l-4 border-primary">
            <CardContent class="p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                  <Package class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div class="text-sm font-medium text-slate-700">Volume Processed</div>
                  <div class="text-xl font-bold text-slate-900">38.4 m³</div>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center">
                  <TrendingUp class="h-3 w-3 text-primary mr-1" />
                  <span class="text-xs text-primary font-semibold">+12.1%</span>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>

          <!-- Feedback Submitted -->
          <Card class="border-l-4 border-primary">
            <CardContent class="p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                  <MessageSquare class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div class="text-sm font-medium text-slate-700">Feedback Submitted</div>
                  <div class="text-xl font-bold text-slate-900">34</div>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center">
                  <TrendingDown class="h-3 w-3 text-red-500 mr-1" />
                  <span class="text-xs text-red-600 font-semibold">-2.3%</span>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Boards Processed Chart -->
      <div class="lg:col-span-4">
        <Card>
          <CardContent class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900">Boards Processed per Hour</h3>
            <Button variant="outline" size="sm">
              <Download class="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <div class="h-80">
            <canvas ref="chartCanvas"></canvas>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Second Line: Recent Orders Table -->
    <div class="mb-8">
      <Card>
        <CardContent class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-slate-900">Recent Orders</h3>
          <Button variant="link">
            View All
            <ChevronRight class="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div class="text-sm text-slate-600 mb-4">Latest wood grading operations</div>
        
        <!-- Compact List View -->
        <div class="space-y-2">
          <div class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md">
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div>
                <div class="font-semibold text-slate-900">Red Oak - Premium Run</div>
                <div class="text-xs text-slate-500">Order B-4873 • Started 09:15 AM</div>
              </div>
              <div class="text-sm text-slate-600">Johnson Lumber Co.</div>
              <Badge variant="default" class="bg-emerald-100 text-emerald-800">Active</Badge>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-slate-900">125 boards</div>
                <div class="text-xs text-slate-500">3.8 / 11.2 m³</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold text-emerald-600">$2,847</div>
                <div class="text-xs text-slate-500">92.1% acc</div>
              </div>
              <Button variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                <MoreHorizontal class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md">
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div>
                <div class="font-semibold text-slate-900">Soft Maple - Special Order</div>
                <div class="text-xs text-slate-500">Order B-4872 • 08:30 AM - 11:45 AM</div>
              </div>
              <div class="text-sm text-slate-600">Artisan Furniture</div>
              <Badge variant="secondary">Completed</Badge>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-slate-900">287 boards</div>
                <div class="text-xs text-slate-500">12.6 m³</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold text-emerald-600">$4,125</div>
                <div class="text-xs text-slate-500">91.8% acc</div>
              </div>
              <Button variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                <MoreHorizontal class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md">
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div>
                <div class="font-semibold text-slate-900">White Oak - Flooring</div>
                <div class="text-xs text-slate-500">Order B-4871 • 07:15 AM - 10:30 AM</div>
              </div>
              <div class="text-sm text-slate-600">Flooring Inc.</div>
              <span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-semibold">Completed</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-slate-900">198 boards</div>
                <div class="text-xs text-slate-500">9.9 m³</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold text-emerald-600">$3,672</div>
                <div class="text-xs text-slate-500">92.5% acc</div>
              </div>
              <button class="text-slate-400 hover:text-slate-600 transition-colors duration-150">
                <MoreHorizontal class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md">
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div>
                <div class="font-semibold text-slate-900">Cherry - Cabinet Grade</div>
                <div class="text-xs text-slate-500">Order B-4870 • 14:20 PM - 17:45 PM</div>
              </div>
              <div class="text-sm text-slate-600">Cabinet Masters</div>
              <span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-semibold">Completed</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-slate-900">342 boards</div>
                <div class="text-xs text-slate-500">15.2 m³</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold text-emerald-600">$5,890</div>
                <div class="text-xs text-slate-500">89.3% acc</div>
              </div>
              <button class="text-slate-400 hover:text-slate-600 transition-colors duration-150">
                <MoreHorizontal class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md">
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div>
                <div class="font-semibold text-slate-900">Hard Maple - Premium</div>
                <div class="text-xs text-slate-500">Order B-4869 • 09:00 AM - 13:30 PM</div>
              </div>
              <div class="text-sm text-slate-600">Premium Hardwoods</div>
              <span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-semibold">Completed</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-slate-900">421 boards</div>
                <div class="text-xs text-slate-500">18.7 m³</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold text-emerald-600">$7,234</div>
                <div class="text-xs text-slate-500">94.1% acc</div>
              </div>
              <button class="text-slate-400 hover:text-slate-600 transition-colors duration-150">
                <MoreHorizontal class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between py-3 px-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all duration-200 hover:shadow-md">
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-2 h-2 bg-slate-400 rounded-full"></div>
              <div>
                <div class="font-semibold text-slate-900">Walnut - Select Grade</div>
                <div class="text-xs text-slate-500">Order B-4868 • 11:15 AM - 15:20 PM</div>
              </div>
              <div class="text-sm text-slate-600">Luxury Millwork</div>
              <span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-semibold">Completed</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-semibold text-slate-900">156 boards</div>
                <div class="text-xs text-slate-500">22.1 m³</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-semibold text-emerald-600">$8,945</div>
                <div class="text-xs text-slate-500">90.7% acc</div>
              </div>
              <button class="text-slate-400 hover:text-slate-600 transition-colors duration-150">
                <MoreHorizontal class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>

    <!-- Third Line: Shift Status and System Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Shift Status -->
      <Card class="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardContent class="p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <Calendar class="w-5 h-5 text-emerald-600 mr-2" />
            <span class="text-lg font-bold text-emerald-800">Shift Status</span>
          </div>
          <Button class="bg-emerald-600 hover:bg-emerald-700">
            <Clock class="w-4 h-4 mr-2" />
            Extend (+1h)
          </Button>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-700">Current:</span>
            <Badge variant="secondary">No Active Shift</Badge>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-700">Next:</span>
            <div class="flex items-center">
              <Badge variant="default" class="bg-emerald-100 text-emerald-700">Morning Shift</Badge>
              <span class="ml-2 text-sm text-slate-600">Friday, 7:00 AM - 3:00 PM</span>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>

      <!-- System Alerts -->
      <Card>
        <CardContent class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-slate-900">System Alerts</h3>
          <Button variant="link" class="text-emerald-600 hover:text-emerald-700 p-0">View All Alerts</Button>
        </div>
        <div class="text-sm text-slate-600 mb-4">Recent notifications and warnings</div>
        
        <div class="space-y-4">
          <div class="flex items-start space-x-3 p-3 bg-orange-50 border-l-4 border-orange-400 rounded-xl">
            <AlertTriangle class="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-slate-900">Accuracy Drop Detected</div>
              <div class="text-sm text-slate-600 mt-1">Batch #4872 showed 5% lower accuracy than average</div>
              <div class="text-xs text-slate-500 mt-2 flex items-center">
                <Clock class="w-3 h-3 mr-1" />
                2 hours ago
              </div>
            </div>
          </div>

          <div class="flex items-start space-x-3 p-3 bg-emerald-50 border-l-4 border-emerald-400 rounded-xl">
            <FileText class="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-slate-900">New Grading Rule Added</div>
              <div class="text-sm text-slate-600 mt-1">Admin user added a new rule for knot detection</div>
              <div class="text-xs text-slate-500 mt-2 flex items-center">
                <Clock class="w-3 h-3 mr-1" />
                Jul 24, 2025
              </div>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import {
  Calendar, Clock, DollarSign, Package, MessageSquare, TrendingUp, TrendingDown,
  MoreHorizontal, Download, ChevronRight, AlertTriangle, FileText
} from 'lucide-vue-next'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Badge from '@/components/ui/badge.vue'

Chart.register(...registerables)

const chartCanvas = ref(null)

onMounted(() => {
  // Initialize the chart
  const ctx = chartCanvas.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
      datasets: [
        {
          label: 'Grade A',
          data: [45, 52, 48, 31, 67, 43, 51, 29, 37],
          backgroundColor: '#10b981',
          stack: 'stack1'
        },
        {
          label: 'Grade B',
          data: [23, 31, 28, 19, 41, 27, 35, 18, 22],
          backgroundColor: '#34d399',
          stack: 'stack1'
        },
        {
          label: 'Grade C',
          data: [12, 18, 15, 10, 22, 14, 18, 9, 13],
          backgroundColor: '#6ee7b7',
          stack: 'stack1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 280,
          ticks: {
            stepSize: 70
          }
        }
      }
    }
  })
})
</script>