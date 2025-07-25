<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
    <!-- First Line: KPIs and Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-8">
      <!-- KPI Cards - Left Side -->
      <div class="lg:col-span-3">
        <div class="space-y-4">
          <!-- Compact Shift Status -->
          <Card class="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <CardContent class="p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Calendar class="w-4 h-4 text-emerald-600 mr-2" />
                  <span class="text-sm font-bold text-emerald-800">Shift Status</span>
                </div>
                <Badge variant="secondary" class="text-xs">No Active Shift</Badge>
              </div>
              <div class="mt-2 text-xs text-slate-600">
                Next: <span class="font-medium text-emerald-700">Morning Shift</span> - Friday, 7:00 AM
              </div>
            </CardContent>
          </Card>

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
      <div class="lg:col-span-7">
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
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart :data="chartData" :margin="{ top: 20, right: 30, left: 20, bottom: 5 }">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip content={ChartTooltip} />
                  <Legend content={ChartLegend} />
                  <Bar dataKey="Grade A" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Grade B" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Grade C" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Second Line: Recent Orders and System Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Orders -->
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
              <Button variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                <MoreHorizontal class="h-4 w-4" />
              </Button>
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
              <Button variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                <MoreHorizontal class="h-4 w-4" />
              </Button>
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
              <Button variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                <MoreHorizontal class="h-4 w-4" />
              </Button>
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
              <Button variant="ghost" size="sm" class="text-slate-400 hover:text-slate-600">
                <MoreHorizontal class="h-4 w-4" />
              </Button>
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
import { ref } from 'vue'
import {
  Calendar, Clock, DollarSign, Package, MessageSquare, TrendingUp, TrendingDown,
  MoreHorizontal, Download, ChevronRight, AlertTriangle, FileText
} from 'lucide-vue-next'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import Button from '@/components/ui/button.vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Badge from '@/components/ui/badge.vue'
import ChartContainer from '@/components/ui/chart-container.vue'
import ChartTooltip from '@/components/ui/chart-tooltip.vue'
import ChartLegend from '@/components/ui/chart-legend.vue'

// Chart data
const chartData = ref([
  { time: '9AM', 'Grade A': 95, 'Grade B': 35, 'Grade C': 25 },
  { time: '10AM', 'Grade A': 145, 'Grade B': 45, 'Grade C': 35 },
  { time: '11AM', 'Grade A': 98, 'Grade B': 42, 'Grade C': 28 },
  { time: '12PM', 'Grade A': 45, 'Grade B': 25, 'Grade C': 15 },
  { time: '1PM', 'Grade A': 185, 'Grade B': 55, 'Grade C': 35 },
  { time: '2PM', 'Grade A': 95, 'Grade B': 35, 'Grade C': 25 },
  { time: '3PM', 'Grade A': 125, 'Grade B': 45, 'Grade C': 35 },
  { time: '4PM', 'Grade A': 165, 'Grade B': 55, 'Grade C': 45 },
  { time: '5PM', 'Grade A': 175, 'Grade B': 65, 'Grade C': 35 }
])
</script>