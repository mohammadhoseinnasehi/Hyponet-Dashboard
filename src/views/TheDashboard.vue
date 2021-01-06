<template >
  <v-container fluid class="pt-0">
    <v-row justify="center">
      <v-col cols="12">
        <vue-typed-js
          :strings="['محمدحسین', 'علی']"
          :startDelay="1000"
          :backDelay="1000"
          :loop="true"
        >
          <h1>سلام <span class="typing"></span></h1>
        </vue-typed-js>
      </v-col>
      <v-row justify="center">
        <HelloI18n />
      </v-row>
      <!-- <v-col cols="12">
        <v-carousel
          cycle
          continuous
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col> -->
      <v-col cols="12">
        <!-- <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="picker"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="pickerformatted"
              label="تاریخ ثبت"
              filled
              rounded
              dense
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="picker" locale="fa" :first-day-of-week="6">
          </v-date-picker>
        </v-menu> -->
        <v-btn @click="log(picker)">console</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import HelloI18n from "../components/HelloI18n.vue";
// import moment from "moment-jalaali";
// import "moment/locale/fa";
export default {
  name: "TheDashboard",
  components: { HelloI18n },
  data() {
    return {
      // date: new Date().toISOString().substr(0, 10),
      // menu: false,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
    log(x) {
      console.log(x);
    },
  },
  computed: {
    // dateformatted() {
    //   console.log(this.picker);
    //   moment.loadPersian({ dialect: "persian-modern" });
    //   return this.picker
    //     ? moment(this.picker).format("jDD / jMM / jYYYY ")
    //     : "";
    // },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>





