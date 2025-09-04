<script lang="ts" setup>
  //import { computed, watch, nextTick, onMounted } from 'vue'
  import { useAppOptionStore } from './store/app/options'
  import useEmitter from '@/composables/useEmitter'
  import { ElNotification } from 'element-plus'
  //import DefaultLayout from './layouts/DefaultLayout.vue'

  // Component section

  // Interface section
  interface NotifyData {
    readonly title: string
    readonly msg: string
    readonly type?: 'success' | 'warning' | 'info' | 'error'
  }

  const emitter = useEmitter()
  const appOption = useAppOptionStore()

  appOption.setUser()
  const showNotif = (data: NotifyData) => {
    const { title, msg, type } = data
    ElNotification({
      title: title,
      message: msg,
      type: type ?? 'info',
      showClose: false,
      duration: 2500,
    })
  }

  emitter.on('message', (data: NotifyData) => showNotif(data))
</script>

<template>
  <div class="app-content">
    <el-config-provider :z-index="2000" :message="{ max: 3 }">
      <router-view />
    </el-config-provider>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Arial, Avenir, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
  }
</style>
