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
              <div class="la-linea-container">
                <svg width="120" height="60" viewBox="0 0 120 60" class="la-linea-svg">
                  <!-- Ground line -->
                  <line x1="0" y1="50" x2="120" y2="50" stroke="white" stroke-width="2" stroke-linecap="round" />
                  
                  <!-- Tree (simple lines) -->
                  <g class="tree">
                    <line x1="90" y1="50" x2="90" y2="20" stroke="white" stroke-width="3" stroke-linecap="round" />
                    <line x1="85" y1="25" x2="90" y2="30" stroke="white" stroke-width="2" stroke-linecap="round" />
                    <line x1="95" y1="25" x2="90" y2="30" stroke="white" stroke-width="2" stroke-linecap="round" />
                    <line x1="85" y1="35" x2="90" y2="40" stroke="white" stroke-width="2" stroke-linecap="round" />
                    <line x1="95" y1="35" x2="90" y2="40" stroke="white" stroke-width="2" stroke-linecap="round" />
                  </g>
                  
                  <!-- Lumberjack (La Línea style) -->
                  <g class="lumberjack-linea">
                    <!-- Head -->
                    <circle cx="25" cy="25" r="6" fill="none" stroke="white" stroke-width="2" />
                    <!-- Body -->
                    <line x1="25" y1="31" x2="25" y2="40" stroke="white" stroke-width="2" stroke-linecap="round" />
                    
                    <!-- Legs walking -->
                    <line x1="25" y1="40" x2="20" y2="50" stroke="white" stroke-width="2" stroke-linecap="round" class="leg-left" />
                    <line x1="25" y1="40" x2="30" y2="50" stroke="white" stroke-width="2" stroke-linecap="round" class="leg-right" />
                    
                    <!-- Left arm (static) -->
                    <line x1="25" y1="35" x2="15" y2="40" stroke="white" stroke-width="2" stroke-linecap="round" />
                    
                    <!-- Right arm with axe (animated) -->
                    <g class="arms-axe">
                      <line x1="25" y1="35" x2="40" y2="30" stroke="white" stroke-width="2" stroke-linecap="round" />
                      <!-- Axe handle -->
                      <line x1="40" y1="30" x2="55" y2="25" stroke="white" stroke-width="2" stroke-linecap="round" />
                      <!-- Axe head -->
                      <path d="M 55 22 L 65 25 L 55 28 Z" fill="white" stroke="white" stroke-width="1" stroke-linejoin="round" />
                    </g>
                    
                    <!-- Simple face -->
                    <circle cx="23" cy="24" r="0.5" fill="white" />
                    <circle cx="27" cy="24" r="0.5" fill="white" />
                    <path d="M 23 27 Q 25 28 27 27" fill="none" stroke="white" stroke-width="1" />
                  </g>
                  
                  <!-- Motion lines -->
                  <g class="motion-lines">
                    <line x1="70" y1="30" x2="75" y2="30" stroke="white" stroke-width="1" opacity="0.6" />
                    <line x1="72" y1="33" x2="77" y2="33" stroke="white" stroke-width="1" opacity="0.6" />
                  </g>
                  
                  <!-- Wood chips -->
                  <circle cx="75" cy="35" r="1" fill="white" class="chip-1" />
                  <circle cx="70" cy="40" r="1" fill="white" class="chip-2" />
                  <circle cx="80" cy="42" r="1" fill="white" class="chip-3" />
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
/* La Línea container with colored background */
.la-linea-container {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  border-radius: 8px;
  padding: 8px 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Walking animation */
@keyframes walk-left {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
}

@keyframes walk-right {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-15deg); }
}

/* Chopping animation */
@keyframes chop-motion {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-25deg); }
}

/* Tree shake */
@keyframes tree-shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  40%, 60% { transform: translateX(1px) rotate(1deg); }
}

/* Chips flying */
@keyframes chip-fly-1 {
  0% { 
    opacity: 0;
    transform: translate(0, 0);
  }
  50% { 
    opacity: 1;
  }
  100% { 
    opacity: 0;
    transform: translate(-15px, -8px);
  }
}

@keyframes chip-fly-2 {
  0% { 
    opacity: 0;
    transform: translate(0, 0);
  }
  50% { 
    opacity: 1;
  }
  100% { 
    opacity: 0;
    transform: translate(-12px, 5px);
  }
}

@keyframes chip-fly-3 {
  0% { 
    opacity: 0;
    transform: translate(0, 0);
  }
  50% { 
    opacity: 1;
  }
  100% { 
    opacity: 0;
    transform: translate(-20px, 8px);
  }
}

/* Motion lines fade */
@keyframes pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.8; }
}

/* Apply animations */
.leg-left {
  transform-origin: 25px 40px;
  animation: walk-left 1.2s ease-in-out infinite;
}

.leg-right {
  transform-origin: 25px 40px;
  animation: walk-right 1.2s ease-in-out infinite 0.6s;
}

.arms-axe {
  transform-origin: 25px 35px;
  animation: chop-motion 1.5s ease-in-out infinite;
}

.tree {
  animation: tree-shake 1.5s ease-in-out infinite;
}

.chip-1 {
  animation: chip-fly-1 1.5s ease-out infinite;
}

.chip-2 {
  animation: chip-fly-2 1.5s ease-out infinite 0.3s;
}

.chip-3 {
  animation: chip-fly-3 1.5s ease-out infinite 0.6s;
}

.motion-lines line {
  animation: pulse 1.5s ease-in-out infinite;
}

.la-linea-svg {
  transition: all 0.3s ease;
}

/* Add a hover effect for fun */
.la-linea-container:hover .arms-axe {
  animation-duration: 0.8s;
}

.la-linea-container:hover .tree {
  animation-duration: 0.8s;
}

.la-linea-container:hover .leg-left,
.la-linea-container:hover .leg-right {
  animation-duration: 0.6s;
}

.la-linea-container:hover .chip-1,
.la-linea-container:hover .chip-2,
.la-linea-container:hover .chip-3 {
  animation-duration: 0.8s;
}
</style>