<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900">Production Orders</h1>
      <Button asChild>
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
          
          <div class="space-y-4">
            <!-- Soft Maple Order -->
            <Card>
              <CardContent class="p-6">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-xl font-bold text-gray-900 flex items-center">
                        <Menu class="w-4 h-4 text-gray-400 mr-3" />
                        Soft Maple - Special Order
                      </h3>
                      <div class="flex items-center space-x-2">
                        <Badge variant="secondary" class="border">Scheduled</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit class="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play class="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 mb-3">
                      ID: ORD-20250701-002 | Customer: Artisan Furniture
                    </div>
                    <div class="flex items-center space-x-8 text-sm">
                      <div class="flex items-center">
                        <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                        Jul 1, 1:00 PM
                      </div>
                      <div class="flex items-center">
                        <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                        Soft Maple
                      </div>
                      <div class="flex items-center">
                        <Droplets class="w-4 h-4 text-gray-400 mr-2" />
                        Green
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- White Oak Order -->
            <Card>
              <CardContent class="p-6">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-xl font-bold text-gray-900 flex items-center">
                        <Menu class="w-4 h-4 text-gray-400 mr-3" />
                        White Oak - Flooring
                      </h3>
                      <div class="flex items-center space-x-2">
                        <Badge variant="secondary" class="border">Scheduled</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit class="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play class="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 mb-3">
                      ID: ORD-20250702-003 | Customer: Flooring Inc.
                    </div>
                    <div class="flex items-center space-x-8 text-sm">
                      <div class="flex items-center">
                        <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                        Jul 2, 9:00 AM
                      </div>
                      <div class="flex items-center">
                        <TreePine class="w-4 h-4 text-gray-400 mr-2" />
                        White Oak
                      </div>
                      <div class="flex items-center">
                        <Droplets class="w-4 h-4 text-gray-400 mr-2" />
                        KD
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

        <!-- Past Orders List -->
        <div class="space-y-4">
          <!-- Cancelled Order -->
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-bold text-gray-900">Cherry - Test Run</h3>
                    <div class="flex items-center space-x-2">
                      <Badge variant="destructive">Cancelled</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye class="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RotateCcw class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-3">
                    ID: ORD-20250629-001
                  </div>
                  <div class="flex items-center space-x-8 text-sm text-gray-500">
                    <div class="flex items-center">
                      <Calendar class="w-4 h-4 mr-2" />
                      Jun 29
                    </div>
                    <div class="flex items-center">
                      <Package class="w-4 h-4 mr-2" />
                      Cherry
                    </div>
                    <div class="flex items-center">
                      <Hash class="w-4 h-4 mr-2" />
                      1 sort
                    </div>
                    <div class="flex items-center">
                      <AlertCircle class="w-4 h-4 mr-2" />
                      N/A
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Completed Order -->
          <Card>
            <CardContent class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-bold text-gray-900">Mixed Hardwoods - Stock</h3>
                    <div class="flex items-center space-x-2">
                      <Badge variant="default" class="bg-emerald-100 text-emerald-800">Completed</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye class="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RotateCcw class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-3">
                    ID: ORD-20250628-001
                  </div>
                  <div class="flex items-center space-x-8 text-sm text-gray-500">
                    <div class="flex items-center">
                      <Calendar class="w-4 h-4 mr-2" />
                      Jun 28
                    </div>
                    <div class="flex items-center">
                      <Package class="w-4 h-4 mr-2" />
                      Hard Maple, Be...
                    </div>
                    <div class="flex items-center">
                      <Hash class="w-4 h-4 mr-2" />
                      5 sorts
                    </div>
                    <div class="flex items-center">
                      <AlertCircle class="w-4 h-4 mr-2" />
                      N/A
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
</script>