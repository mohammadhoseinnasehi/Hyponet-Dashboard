<template>
  <v-card
    class="mx-auto"
    max-width="350px"
    hover
    :ripple="false"
    :to="{ path: `/planmanage/posts/${frame._id}` }"
  >
    <v-img :src="`https://hyponet.herokuapp.com${frame.image1}`" height="250px" max-width="350px"></v-img>

    <v-card-title> {{ frame.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle> {{ frame.created_at }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click.prevent="show = !show">
        بیشتر
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ frame.subtitle }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "FrameCard",
  props: { frame: Object },
  data() {
    return { show: false };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 30px !important ;
}
</style>