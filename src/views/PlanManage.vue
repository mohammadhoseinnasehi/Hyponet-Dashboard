<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-toolbar>
        <v-toolbar-title>مدیریت طرح ها</v-toolbar-title>
      </v-toolbar>
    </v-row>

    <v-row class="mt-4">
      <v-col md="6" sm="12" cols="12">
        <v-autocomplete
          lang="en"
          v-model="values"
          :items="items"
          deletable-chips
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
          نمایش طرح
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
          @click.stop="$store.state.show = true"
        >
          افزودن طرح
          <v-icon right> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <add-frame></add-frame>
    <!-- <v-row>
      <v-col>
        <skeleton-card v-if="isshow"></skeleton-card>
        <frame-card v-if="!isshow" :frame="frame"></frame-card>
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
        v-for="frame in $store.state.filteredframes"
        class="mt-10"
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="4"
        :key="frame._id"
      >
        <frame-card :frame="frame"></frame-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import FrameCard from "../components/FrameCard.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
import AddFrame from "../components/AddFrame.vue";
export default {
  name: "PlanManage",
  components: { SkeletonCard, AddFrame, FrameCard },
  data() {
    return {
      isShow: true,
      isempty: false,
      isActive: true,
      // items: ["uii", "uxx", "icon", "template", "html"],
      items: [
        "اچ تی ام ال",
        "قالب آماده",
        "آیکون",
        "تجربه کاربری",
        "رابط کاربری",
      ],
      values: "",
    };
  },
  methods: {
    showbyCat(val) {
      console.log(val);
      {
        this.$store.state.filteredframes = this.$store.state.frames.filter(
          (frame) => {
            return frame.category == this.$t(val);
          }
        );
      }
    },
  },
  watch: {
    values: function (val) {
      if (!val) {
        this.$store.state.filteredframes = this.$store.state.frames;
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
    // console.log(this.$store.state.frames)
    // this.$store.state.filteredframes = this.$store.state.frames;
    // console.log(this.$store.state.show);
  },
  async created() {
    await axios
      .get(`https://hyponet.herokuapp.com/api/v1/design`)
      .then((response) => {
        this.$store.state.frames = response.data.designs;
        // console.log("before translate", this.$store.state.frames);
        // this.$store.state.frames.forEach((item) => {
        //   item.category = this.$t(item.category);
        // });
        this.$store.state.filteredframes = this.$store.state.frames;
        this.isShow = false;
        console.log('this.$store.state.frames', this.$store.state.frames);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  computed: {
    forwatch() {
      return this.$store.state.filteredframes;
    },
  },
};
</script>

<style lang="scss" scoped >
.roww {
  background-color: #e0e0e0;
  height: 100%;
}

.v-btn:hover {
  background-color: rgb(1, 8, 77);
  color: rgb(255, 255, 255) !important;
}
</style> 





