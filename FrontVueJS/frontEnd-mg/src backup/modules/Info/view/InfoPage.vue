<template>
This Is Info Page
</template>

<script lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'WelcomePage',
  setup() {
    const dialogVisible = ref(false)
    const handleClose = (done: () => void) => {

          done()
    
    }

    return {
      dialogVisible,
      handleClose
    }
  }
}
</script>
<style>
</style>
