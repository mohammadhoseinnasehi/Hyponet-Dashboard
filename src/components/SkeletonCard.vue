<template>
  <v-skeleton-loader
    class="mx-auto "
    max-width="400"
    height="280px"
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
  background-color: #fff;
}
</style>