<template>
  <v-card
    class="mx-auto"
    max-width="350px"
    hover
    :ripple="false"
    :to="{ path: `/templatemanage/posts/${template._id}` }"
  >
      <v-img
        :src="`https://hyponet.herokuapp.com${template.image}`"
        height="250px"
        max-width="350px"
      ></v-img>
    <v-card-title> {{ template.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle> {{ dateformatted }} </v-card-subtitle>

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
          {{ template.subtitle }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import moment from "moment-jalaali";
import "moment/locale/fa";
export default {
  name: "TemplateCard",
  props: { template: Object },
  data() {
    return { show: false };
  },
  methods: {},
  computed: {
    dateformatted() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.template.created_at
        ? moment(this.template.created_at).format("jDD / jMM / jYYYY ")
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 20px !important ;
}

</style>