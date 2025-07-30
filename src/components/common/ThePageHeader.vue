<template>
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">{{ title }}</h1>
      <p v-if="description" class="text-gray-600 mt-1">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex items-center space-x-4">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>