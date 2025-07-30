@@ .. @@
 import { ref, onErrorCaptured } from 'vue'
 import { useRouter } from 'vue-router'
 import { AlertTriangle, RefreshCw, Home } from 'lucide-vue-next'
-import Button from '@/components/ui/button.vue'
+import BaseButton from '@/components/ui/BaseButton.vue'
+import { usePageReload } from '@/composables/usePageReload'

 const router = useRouter()
+const { hardReload } = usePageReload'

 const hasError = ref(false)
 const errorDetails = ref('')
@@ .. @@
 const retry = () => {
   hasError.value = false
   errorDetails.value = ''
   // Force component re-render
-  window.location.reload()
+  hardReload()
 }
@@ .. @@
       <!-- Actions -->
       <div class="flex flex-col sm:flex-row gap-3 justify-center">
-        <Button @click="retry" variant="default">
+        <BaseButton @click="retry" variant="default">
           <RefreshCw class="w-4 h-4 mr-2" />
           Try Again
-        </Button>
-        <Button @click="goHome" variant="outline">
+        </BaseButton>
+        <BaseButton @click="goHome" variant="outline">
           <Home class="w-4 h-4 mr-2" />
           Go Home
-        </Button>
+        </BaseButton>
       </div>