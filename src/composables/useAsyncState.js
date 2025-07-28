import { ref, computed } from 'vue'

export function useAsyncState(asyncFn, initialState = null, options = {}) {
  const {
    immediate = true,
    resetOnExecute = true,
    onError = null,
    onSuccess = null,
    shallow = true
  } = options

  const state = ref(initialState)
  const isLoading = ref(false)
  const error = ref(null)

  const isReady = computed(() => !isLoading.value && error.value === null)
  const isSuccess = computed(() => !isLoading.value && error.value === null && state.value !== null)

  const execute = async (...args) => {
    if (resetOnExecute) {
      error.value = null
    }
    
    isLoading.value = true

    try {
      const result = await asyncFn(...args)
      state.value = result
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return result
    } catch (err) {
      error.value = err
      
      if (onError) {
        onError(err)
      }
      
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    state.value = initialState
    error.value = null
    isLoading.value = false
  }

  if (immediate) {
    execute()
  }

  return {
    state,
    isLoading,
    error,
    isReady,
    isSuccess,
    execute,
    reset
  }
}