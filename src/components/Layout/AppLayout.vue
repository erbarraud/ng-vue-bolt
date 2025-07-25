<template>
  <div class="min-h-screen bg-gray-50">
    <header class="shadow-sm" style="background-color: #213C33; border-bottom: 2px solid #4ED586;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">Manufacturing Dashboard</h1>
          </div>
          <nav class="flex space-x-8">
            <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </router-link>
            <router-link to="/orders" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Orders
            </router-link>
            <router-link to="/line" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Line Check
            </router-link>
            <router-link to="/users" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Users
            </router-link>
          </nav>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Layout component for the application
</script>