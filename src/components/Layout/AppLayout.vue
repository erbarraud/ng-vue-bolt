<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navigation Header -->
    <nav class="shadow-xl" style="background-color: #213C33; border-bottom: 2px solid #4ED586;">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <img src="/Asset 3@4x 1.png" alt="Neural Grader Logo" class="h-10 w-auto mr-3 brightness-110" />
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="flex items-center space-x-1">
              <router-link
                to="/"
                :class="[
                  $route.name === 'Dashboard'
                    ? 'text-white shadow-lg ring-2 ring-primary/50'
                    : 'text-white hover:bg-primary/80 hover:text-white',
                  'px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
                :style="$route.name === 'Dashboard' ? 'background-color: #204739' : ''"
              >
                <BarChart3 class="w-4 h-4 mr-2 flex-shrink-0" />
                Overview
              </router-link>
              <router-link
                to="/orders"
                :class="[
                  $route.name === 'ProductionOrders' || $route.name === 'CreateProductionOrder'
                    ? 'text-white shadow-lg ring-2 ring-primary/50'
                    : 'text-white hover:bg-primary/80 hover:text-white',
                  'px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
                :style="($route.name === 'ProductionOrders' || $route.name === 'CreateProductionOrder') ? 'background-color: #204739' : ''"
              >
                <Package class="w-4 h-4 mr-2 flex-shrink-0" />
                Orders
              </router-link>
              <router-link
                to="/finder"
                :class="[
                  $route.name === 'BoardFinder'
                    ? 'text-white shadow-lg ring-2 ring-primary/50'
                    : 'text-white hover:bg-primary/80 hover:text-white',
                  'px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
                :style="$route.name === 'BoardFinder' ? 'background-color: #204739' : ''"
              >
                <Search class="w-4 h-4 mr-2 flex-shrink-0" />
                Board Finder
              </router-link>
              <router-link
                to="/line"
                :class="[
                  $route.name === 'LineCheck'
                    ? 'text-white shadow-lg ring-2 ring-primary/50'
                    : 'text-white hover:bg-primary/80 hover:text-white',
                  'px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                ]"
                :style="$route.name === 'LineCheck' ? 'background-color: #204739' : ''"
              >
                <Activity class="w-4 h-4 mr-2 flex-shrink-0" />
                Line
              </router-link>
              <div class="relative">
                <button
                  @click="showToolsMenu = !showToolsMenu"
                  :class="[
                    ['UserManagement', 'ShiftScheduler', 'ClaimsManagement', 'LiveScanning'].includes($route.name)
                      ? 'text-white shadow-lg ring-2 ring-primary/50'
                      : 'text-white hover:bg-primary/80 hover:text-white',
                    'px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md'
                  ]"
                  :style="['UserManagement', 'ShiftScheduler', 'ClaimsManagement', 'LiveScanning'].includes($route.name) ? 'background-color: #204739' : ''"
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
              <button class="text-white hover:bg-primary/80 hover:text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md">
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
        <div class="flex items-center justify-between">
          <div class="text-sm text-slate-500">
            © 2024 Neural Grader. Built for precision lumber grading.
          </div>
          
          <!-- Lumberjack Animation -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-4 text-sm text-slate-500">
              <a href="#" class="hover:text-slate-700 transition-colors duration-150">Terms</a>
              <a href="#" class="hover:text-slate-700 transition-colors duration-150">Privacy</a>
              <span>v1.0.0</span>
            </div>
            
            <div class="flex items-center space-x-2">
              <span class="text-sm text-slate-500">Powered by</span>
              <div class="lumberjack-animation">
                <svg width="50" height="40" viewBox="0 0 120 100" class="la-linea-svg">
                  <!-- Tree (simple line) -->
                  <g class="tree-shake">
                    <line x1="90" y1="70" x2="90" y2="40" stroke="black" stroke-width="3" stroke-linecap="round" />
                    <circle cx="90" cy="35" r="8" fill="none" stroke="black" stroke-width="2" class="tree-top" />
                  </g>
                  
                  <!-- Lumberjack (La Linea style) -->
                  <g class="linea-man">
                    <!-- Head -->
                    <circle cx="25" cy="25" r="6" fill="none" stroke="black" stroke-width="2" />
                    <!-- Body -->
                    <line x1="25" y1="31" x2="25" y2="55" stroke="black" stroke-width="2" stroke-linecap="round" />
                    <!-- Legs -->
                    <line x1="25" y1="55" x2="20" y2="70" stroke="black" stroke-width="2" stroke-linecap="round" />
                    <line x1="25" y1="55" x2="30" y2="70" stroke="black" stroke-width="2" stroke-linecap="round" />
                    <!-- Left arm (static) -->
                    <line x1="25" y1="40" x2="15" y2="45" stroke="black" stroke-width="2" stroke-linecap="round" />
                    <!-- Right arm with axe (animated) -->
                    <g class="axe-arm">
                      <line x1="25" y1="40" x2="40" y2="35" stroke="black" stroke-width="2" stroke-linecap="round" />
                      <!-- Axe handle -->
                      <line x1="40" y1="35" x2="55" y2="30" stroke="black" stroke-width="2" stroke-linecap="round" />
                      <!-- Axe head -->
                      <path d="M 55 25 L 65 30 L 55 35 Z" fill="none" stroke="black" stroke-width="2" stroke-linejoin="round" />
                    </g>
                  </g>
                  
                  <!-- Wood chips (simple dots) -->
                  <circle cx="75" cy="45" r="1" fill="black" class="chip-1" />
                  <circle cx="70" cy="50" r="1" fill="black" class="chip-2" />
                  <circle cx="80" cy="52" r="1" fill="black" class="chip-3" />
                </svg>
              </div>
            </div>
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

<style scoped>
/* Lumberjack animation */
@keyframes la-linea-chop {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-45deg); }
}

@keyframes tree-wobble {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-1px) rotate(-2deg); }
  75% { transform: translateX(1px) rotate(2deg); }
}

@keyframes linea-chip-1 {
  0% { opacity: 0; transform: translate(0, 0); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translate(-15px, 8px); }
}

@keyframes linea-chip-2 {
  0% { opacity: 0; transform: translate(0, 0); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translate(-10px, -5px); }
}

@keyframes linea-chip-3 {
  0% { opacity: 0; transform: translate(0, 0); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translate(-18px, 3px); }
}

@keyframes linea-walk {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1px); }
}

.axe-arm {
  transform-origin: 25px 40px;
  animation: la-linea-chop 2s ease-in-out infinite;
}

.tree-shake {
  animation: tree-wobble 2s ease-in-out infinite;
}

.linea-man {
  animation: linea-walk 2s ease-in-out infinite;
}

.chip-1 {
  animation: linea-chip-1 2s ease-out infinite;
}

.chip-2 {
  animation: linea-chip-2 2s ease-out infinite 0.3s;
}

.chip-3 {
  animation: linea-chip-3 2s ease-out infinite 0.6s;
}

.la-linea-svg {
  transition: all 0.3s ease;
}

/* Add a hover effect for fun */
.lumberjack-animation:hover .axe-arm {
  animation-duration: 1s;
}

.lumberjack-animation:hover .tree-shake {
  animation-duration: 1s;
}

.lumberjack-animation:hover .linea-man {
  animation-duration: 1s;
}

.lumberjack-animation:hover .chip-1,
.lumberjack-animation:hover .chip-2,
.lumberjack-animation:hover .chip-3 {
  animation-duration: 1s;
}
</style>