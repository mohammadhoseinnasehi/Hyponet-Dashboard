<template>
  <v-app>
    <drawer />
    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>
<script>
import Drawer from "./components/Drawer.vue";
export default {
  components: {
    Drawer,
  },

};
</script>
<style lang="scss">
</style>