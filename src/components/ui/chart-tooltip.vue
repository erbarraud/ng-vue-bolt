<template>
  <div
    v-if="active && payload && payload.length"
    class="rounded-lg border bg-background p-2 shadow-sm"
  >
    <div class="grid gap-2">
      <div class="flex flex-col">
        <span class="text-[0.70rem] uppercase text-muted-foreground">
          {{ label }}
        </span>
        <div class="grid gap-1">
          <div
            v-for="(entry, index) in payload"
            :key="index"
            class="flex items-center gap-2"
          >
            <div
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: entry.color }"
            />
            <span class="text-sm font-medium">
              {{ entry.name }}: {{ entry.value }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active?: boolean
  payload?: any[]
  label?: string
}

defineProps<Props>()
</script>