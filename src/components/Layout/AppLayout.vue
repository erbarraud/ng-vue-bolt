<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header matching Neural Grader -->
    <header class="bg-white border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Title -->
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              Neural Grader
            </h1>
          </div>
          
          <!-- Right side navigation items (if any) -->
          <div class="flex items-center space-x-4">
            <!-- Add any nav items here if needed -->
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
      <div class="px-4 sm:px-6 lg:px-8">
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
// Vue 3 Composition API
</script>