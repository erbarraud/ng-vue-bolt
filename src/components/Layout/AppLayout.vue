<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header with Neural Grader structure but green bg -->
    <header class="bg-secondary border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left side - App Title (matching Neural Grader) -->
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">
              Neural Grader
            </h1>
          </div>

          <!-- Right side - Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-1">
              <router-link
                to="/"
                :class="[
                  $route.name === 'Dashboard'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200'
                ]"
              >
                <BarChart3 class="w-4 h-4 mr-2 flex-shrink-0" />
                Overview
              </router-link>
              <router-link
                to="/orders"
                :class="[
                  $route.name === 'ProductionOrders' || $route.name === 'CreateProductionOrder'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200'
                ]"
              >
                <Package class="w-4 h-4 mr-2 flex-shrink-0" />
                Orders
              </router-link>
              <router-link
                to="/finder"
                :class="[
                  $route.name === 'BoardFinder'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200'
                ]"
              >
                <Search class="w-4 h-4 mr-2 flex-shrink-0" />
                Board Finder
              </router-link>
              <router-link
                to="/line"
                :class="[
                  $route.name === 'LineCheck'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200'
                ]"
              >
                <Activity class="w-4 h-4 mr-2 flex-shrink-0" />
                Line
              </router-link>
              <div class="relative">
                <button
                  @click="showToolsMenu = !showToolsMenu"
                  :class="[
                    ['UserManagement', 'ShiftScheduler', 'ClaimsManagement', 'LiveScanning', 'BoardInspector'].includes($route.name)
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white',
                    'px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200'
                  ]"
                >
                  Tools
                  <ChevronDown class="w-4 h-4 ml-1 text-white" />
                </button>
                <div
                  v-if="showToolsMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200"
                >
                  <router-link
                    to="/users"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    User Management
                  </router-link>
                  <router-link
                    to="/scheduler"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Shift Scheduler
                  </router-link>
                  <router-link
                    to="/claims"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Claims Management
                  </router-link>
                  <router-link
                    to="/scanning"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Live Scanning
                  </router-link>
                  <router-link
                    to="/inspector"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Board Inspector
                  </router-link>
                </div>
              </div>
              <button class="text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200">
                Support
                <ChevronDown class="w-4 h-4 ml-1 text-white" />
              </button>
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <button class="relative text-white text-opacity-80 hover:text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
              <Bell class="h-5 w-5 text-white" />
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">3</span>
            </button>
            <div class="h-8 w-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User class="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>

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
            <a href="#" class="hover:text-gray-700 transition-colors duration-150">Terms</a>
            <a href="#" class="hover:text-gray-700 transition-colors duration-150">Privacy</a>
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
  BarChart3, Package, Search, Activity, ChevronDown,
  Bell, User
} from 'lucide-vue-next'

const showToolsMenu = ref(false)
</script>