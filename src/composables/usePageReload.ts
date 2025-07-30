import { useRouter } from 'vue-router'

export function usePageReload() {
  const router = useRouter()

  const reloadPage = async (): Promise<void> => {
    const currentRoute = router.currentRoute.value
    
    // Navigate to a temporary route and back to force reload
    await router.push({ path: '/loading' })
    await router.replace(currentRoute.fullPath)
  }

  const hardReload = (): void => {
    window.location.reload()
  }

  return {
    reloadPage,
    hardReload
  }
}