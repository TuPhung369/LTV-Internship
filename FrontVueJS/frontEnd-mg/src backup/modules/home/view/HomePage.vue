<template>
  <div>Hello:{{ emailUser }}</div>
</template>

<script>
  import { useAppOptionStore } from '../../../store/app/options'

  const getUser = useAppOptionStore()

  export default {
    name: 'HomePage',
    data() {
      return {
        emailUser: getUser.actGetUserName(),
      }
    },
  }
</script>
