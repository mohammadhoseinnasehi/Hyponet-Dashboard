<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-toolbar>
        <v-toolbar-title>مدیریت موشن گرافی </v-toolbar-title>
      </v-toolbar>
    </v-row>

    <v-row class="mt-4">
      <v-col md="6" sm="12" cols="12">
        <v-autocomplete
          lang="en"
          v-model="values"
          :items="items"
          chips
          color="rgb(1, 8, 77)"
          item-color="rgb(1, 8, 77)"
          rounded
          solo
          prefix="دسته بندی ها :"
        ></v-autocomplete>
      </v-col>
      <v-col md="3" sm="6" cols="6">
        <v-btn
          @click="showbyCat(values)"
          class="float-right"
          color="rgb(1, 8, 77)"
          rounded
          elevation="10"
          large
          text
        >
          نمایش موشن
          <v-icon right> mdi-monitor-edit </v-icon>
        </v-btn>
      </v-col>
      <v-col md="3" sm="6" cols="6">
        <v-btn
          class="float-left ml-2"
          color="rgb(1, 8, 77)"
          rounded
          elevation="10"
          large
          text
          @click.stop="$store.state.motionshow = true"
        >
          افزودن موشن 
          <v-icon right> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <add-motion></add-motion>
    <!-- <v-row>
      <v-col>
        <skeleton-card v-if="isshow"></skeleton-card>
        <design-card v-if="!isshow" :design="design"></design-card>
      </v-col>
    </v-row> -->

    <v-row class="roww pt-10 mt-16 pb-10" v-if="isShow">
      <v-col v-for="i in 12" cols="12" xs="12" sm="12" md="6" lg="4" :key="i">
        <!-- <v-lazy
          v-model="isActive"
          :options="{ threshold: 0.5 }"
          transition="fade-transition"
        > -->
        <skeleton-card></skeleton-card>
        <!-- </v-lazy> -->
      </v-col>
    </v-row>

    <v-row v-if="isempty" class="roww pt-10 mt-16 pb-10">
      <v-col class="d-flex justify-center">
        <div>
          طرحی موجود نیست .... <v-icon>mdi-emoticon-neutral-outline</v-icon>
        </div>
      </v-col>
    </v-row>

    <v-row class="roww pt-10 mt-16 pb-10" v-if="!isShow && !isempty">
      <v-col
        v-for="motion in $store.state.filteredmotions"
        class="mt-10"
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="4"
        :key="motion._id"
      >
        <motion-card :motion="motion"></motion-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import MotionCard from "../components/MotionCard.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
import AddMotion from "../components/AddMotion.vue";
export default {
  name: "MotionManage",
  components: { SkeletonCard, AddMotion, MotionCard },
  data() {
    return {
      isShow: true,
      isempty: false,
      items: ["تیزر"],
      values: "",
    };
  },
  methods: {
    showbyCat(val) {
      console.log(val);
      {
        this.$store.state.filteredmotions = this.$store.state.motions.filter(
          (motion) => {
            return motion.category == this.$t(val);
          }
        );
      }
    },
  },
  watch: {
    values: function (val) {
      if (!val) {
        this.$store.state.filteredmotions = this.$store.state.motions;
      }
    },
    forwatch: function (val) {
      console.log("for watch ", val);
      if (val.length == 0) {
        this.isempty = true;
      } else {
        this.isempty = false;
      }
    },
  },
  mounted() {
    // console.log(this.$store.state.designs)
    // this.$store.state.filtereddesigns = this.$store.state.designs;
    // console.log(this.$store.state.show);
  },
  async created() {
    await axios
      .get(`https://hyponet.herokuapp.com/api/v1/motion`)
      .then((response) => {
        this.$store.state.motions = response.data.motions;
        // console.log("before translate", this.$store.state.designs);
        // this.$store.state.designs.forEach((item) => {
        //   item.category = this.$t(item.category);
        // });
        this.$store.state.filteredmotions = this.$store.state.motions;
        this.isShow = false;
        console.log("this.$store.state.motions", this.$store.state.motions);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  computed: {
    forwatch() {
      return this.$store.state.filteredmotions;
    },
  },
};
</script>

<style lang="scss" scoped >
.roww {
  background-color: #c4c4c4;
  height: 100%;
}

.v-btn:hover {
  background-color: rgb(1, 8, 77);
  color: rgb(255, 255, 255) !important;
}
</style> 





