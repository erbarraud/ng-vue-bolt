<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-emerald-800 border-b border-emerald-700 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <img src="/Asset 3@4x 1.png" alt="Neural Grader Logo" class="h-10 w-auto mr-3" />
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-1 navigation-container">
              <router-link
                to="/"
                :class="[
                  $route.name === 'Dashboard'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium flex items-center'
                ]"
              >
                <BarChart3 class="w-4 h-4 mr-2" />
                Overview
              </router-link>
              <router-link
                to="/orders"
                :class="[
                  $route.name === 'ProductionOrders' || $route.name === 'CreateProductionOrder'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium flex items-center'
                ]"
              >
                <Package class="w-4 h-4 mr-2" />
                Orders
              </router-link>
              <router-link
                to="/finder"
                :class="[
                  $route.name === 'BoardFinder'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium flex items-center'
                ]"
              >
                <Search class="w-4 h-4 mr-2" />
                Board Finder
              </router-link>
              <router-link
                to="/line"
                :class="[
                  $route.name === 'LineCheck'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-100 hover:bg-emerald-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium flex items-center'
                ]"
              >
                <Activity class="w-4 h-4 mr-2" />
                Line
              </router-link>
              <div class="relative">
                <button
                  @click="showToolsMenu = !showToolsMenu"
                  :class="[
                    ['UserManagement', 'ShiftScheduler', 'ClaimsManagement', 'LiveScanning', 'BoardInspector'].includes($route.name)
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-700 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium flex items-center'
                  ]"
                >
                  Tools
                  <ChevronDown class="w-4 h-4 ml-1" />
                </button>
                <div
                  v-if="showToolsMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-emerald-lg py-1 z-50 border border-emerald-100"
                >
                  <router-link
                    to="/users"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    @click="showToolsMenu = false"
                  >
                    User Management
                  </router-link>
                  <router-link
                    to="/scheduler"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    @click="showToolsMenu = false"
                  >
                    Shift Scheduler
                  </router-link>
                  <router-link
                    to="/claims"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    @click="showToolsMenu = false"
                  >
                    Claims Management
                  </router-link>
                  <router-link
                    to="/scanning"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    @click="showToolsMenu = false"
                  >
                    Live Scanning
                  </router-link>
                  <router-link
                    to="/inspector"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"
                    @click="showToolsMenu = false"
                  >
                    Board Inspector
                  </router-link>
                </div>
              </div>
              <button class="text-emerald-100 hover:bg-emerald-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                Support
                <ChevronDown class="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <button class="relative text-emerald-100 hover:text-white p-2 rounded-md hover:bg-emerald-700">
              <Bell class="h-5 w-5" />
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div class="h-8 w-8 bg-white rounded-full flex items-center justify-center">
              <User class="h-5 w-5 text-emerald-800" />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between text-sm text-gray-500">
          <div>
            © 2024 Neural Grader. Built for precision lumber grading.
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="hover:text-gray-700">Terms</a>
            <a href="#" class="hover:text-gray-700">Privacy</a>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Layers, BarChart3, Package, Search, Activity, ChevronDown,
  Bell, User
} from 'lucide-vue-next'

const showToolsMenu = ref(false)
</script>