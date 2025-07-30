<template>
  <BaseCard>
    <BaseCardContent class="p-6">
      <div class="flex items-center">
        <div :class="iconContainerClass" class="w-10 h-10 rounded-lg flex items-center justify-center mr-4">
          <component :is="icon" class="w-5 h-5" :class="iconClass" />
        </div>
        <div>
          <div class="text-sm text-gray-600">{{ label }}</div>
          <div class="text-2xl font-bold text-gray-900">{{ value }}</div>
          <div v-if="trend" class="flex items-center mt-1" :class="trendColorClass">
            <component :is="trendIcon" class="h-3 w-3 mr-1" />
            <span class="text-xs font-semibold">{{ trend }}</span>
          </div>
        </div>
      </div>
    </BaseCardContent>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseCardContent from '@/components/ui/BaseCardContent.vue'

interface Props {
  label: string
  value: string | number
  icon: any
  iconColor?: 'emerald' | 'blue' | 'green' | 'purple' | 'red' | 'yellow'
  trend?: string
  trendDirection?: 'up' | 'down'
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'emerald',
  trendDirection: 'up'
})

const iconContainerClass = computed(() => {
  const colorMap = {
    emerald: 'bg-emerald-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100'
  }
  return colorMap[props.iconColor]
})

const iconClass = computed(() => {
  const colorMap = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600'
  }
  return colorMap[props.iconColor]
})

const trendIcon = computed(() => {
  return props.trendDirection === 'up' ? TrendingUp : TrendingDown
})

const trendColorClass = computed(() => {
  return props.trendDirection === 'up' ? 'text-emerald-600' : 'text-red-500'
})
</script>