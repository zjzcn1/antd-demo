<template>
  <a-config-provider>
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
  import { defineComponent} from "vue";

  export default defineComponent({
    name: 'App',
    setup() {
      return {
      }
    }
  })
</script>
