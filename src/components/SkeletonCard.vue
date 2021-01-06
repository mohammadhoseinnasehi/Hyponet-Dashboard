<template>
  <v-skeleton-loader
    class="mx-auto"
    max-width="400"
    height="350px"
    type="card"
  ></v-skeleton-loader>
</template>
<script>
export default {
  name: "SkeletonCard",
};
</script>

<style lang="scss" scoped>
.v-skeleton-loader {
  border-radius: 10px !important;
}
</style>