<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navigation Header -->
    <nav class="bg-emerald-900 border-b border-emerald-800 shadow-xl">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <img src="/Asset 3@4x 1.png" alt="Neural Grader Logo" class="h-10 w-auto mr-3 brightness-110" />
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-1">
              <router-link
                to="/"
                :class="[
                  $route.name === 'Dashboard'
                    ? 'bg-primary/90 text-primary-foreground shadow-lg ring-2 ring-primary/50'
                    : 'text-emerald-100 hover:bg-primary/80 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
              >
                <BarChart3 class="w-4 h-4 mr-2 flex-shrink-0" />
                Overview
              </router-link>
              <router-link
                to="/orders"
                :class="[
                  $route.name === 'ProductionOrders' || $route.name === 'CreateProductionOrder'
                    ? 'bg-primary/90 text-primary-foreground shadow-lg ring-2 ring-primary/50'
                    : 'text-emerald-100 hover:bg-primary/80 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
              >
                <Package class="w-4 h-4 mr-2 flex-shrink-0" />
                Orders
              </router-link>
              <router-link
                to="/finder"
                :class="[
                  $route.name === 'BoardFinder'
                    ? 'bg-primary/90 text-primary-foreground shadow-lg ring-2 ring-primary/50'
                    : 'text-emerald-100 hover:bg-primary/80 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
              >
                <Search class="w-4 h-4 mr-2 flex-shrink-0" />
                Board Finder
              </router-link>
              <router-link
                to="/line"
                :class="[
                  $route.name === 'LineCheck'
                    ? 'bg-primary/90 text-primary-foreground shadow-lg ring-2 ring-primary/50'
                    : 'text-emerald-100 hover:bg-primary/80 hover:text-white',
                  'px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
              >
                <Activity class="w-4 h-4 mr-2 flex-shrink-0" />
                Line
              </router-link>
              <div class="relative">
                <button
                  @click="showToolsMenu = !showToolsMenu"
                  :class="[
                    ['UserManagement', 'ShiftScheduler', 'ClaimsManagement', 'LiveScanning'].includes($route.name)
                      ? 'bg-primary/90 text-primary-foreground shadow-lg ring-2 ring-primary/50'
                      : 'text-emerald-100 hover:bg-primary/80 hover:text-white',
                    'px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                  ]"
                >
                  Tools
                  <ChevronDown class="w-4 h-4 ml-1" />
                </button>
                <div
                  v-if="showToolsMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-slate-200 ring-1 ring-black/5"
                >
                  <router-link
                    to="/users"
                    class="block px-4 py-2 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    User Management
                  </router-link>
                  <router-link
                    to="/scheduler"
                    class="block px-4 py-2 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Shift Scheduler
                  </router-link>
                  <router-link
                    to="/claims"
                    class="block px-4 py-2 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Claims Management
                  </router-link>
                  <router-link
                    to="/scanning"
                    class="block px-4 py-2 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
                    @click="showToolsMenu = false"
                  >
                    Live Scanning
                  </router-link>
                </div>
              </div>
              <button class="text-emerald-100 hover:bg-emerald-800 hover:text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md">
                Support
                <ChevronDown class="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center space-x-4">
            <button class="relative text-emerald-100 hover:text-white p-2 rounded-lg hover:bg-emerald-800 transition-all duration-200">
              <Bell class="h-5 w-5" />
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">3</span>
            </button>
            <div class="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md ring-2 ring-primary/20">
              <User class="h-5 w-5 text-primary" />
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
    <footer class="bg-white border-t border-slate-200 py-4">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between text-sm text-slate-500">
          <div>
            © 2024 Neural Grader. Built for precision lumber grading.
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="hover:text-slate-700 transition-colors duration-150">Terms</a>
            <a href="#" class="hover:text-slate-700 transition-colors duration-150">Privacy</a>
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