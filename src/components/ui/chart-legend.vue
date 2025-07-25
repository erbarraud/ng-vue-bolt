<template>
  <div class="flex items-center justify-center gap-4 pt-4">
    <div
      v-for="(entry, index) in payload"
      :key="index"
      class="flex items-center gap-2"
    >
      <div
        class="h-3 w-3 rounded-full"
        :style="{ backgroundColor: entry.color }"
      />
      <span class="text-sm text-muted-foreground">{{ entry.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  payload?: any[]
}

defineProps<Props>()
</script>