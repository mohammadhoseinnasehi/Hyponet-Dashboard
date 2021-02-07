<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-toolbar>
        <v-toolbar-title>مدیریت قالب ها</v-toolbar-title>
      </v-toolbar>
    </v-row>

    <v-row class="mt-4">
      <v-col md="6" lg="6"   cols="12">
        <v-tabs color="deep-purple accent-4" class="mr-2">
          <v-tab @click="showRegulartemplates()">قالب های معمولی</v-tab>
          <v-tab @click="showSpecialtemplates()">قالب های اختصاصی</v-tab>
        </v-tabs>
      </v-col>

      <v-col md="6" lg="4"   cols="12">
        <v-autocomplete
          @blur="showbyCat(values)"
          class="center"
          lang="en"
          v-model="values"
          :items="$store.state.isregular ? regularitems : specialitems"
          chips
          color="rgb(1, 8, 77)"
          item-color="rgb(1, 8, 77)"
          rounded
          solo
          prefix="دسته بندی ها :"
        ></v-autocomplete>
      </v-col>

      <v-col md="12" lg="2"  cols="12">
        <v-btn
          class="float-left ml-2"
          color="rgb(1, 8, 77)"
          rounded
          elevation="10"
          large
          text
          @click.stop="$store.state.templateshow = true"
        >
          افزودن قالب
          <v-icon right> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <add-template></add-template>
    

    <v-row class="roww pt-10 mt-16 pb-10" v-if="isShow">
      <v-col v-for="i in 12" cols="12" xs="12" sm="12" md="6" lg="4" :key="i">
        
        <skeleton-card></skeleton-card>
      </v-col>
    </v-row>

    <v-row v-if="isempty" class="roww pt-10 mt-16 pb-10">
      <v-col class="d-flex justify-center">
        <div>
          قالبی موجود نیست .... <v-icon>mdi-emoticon-neutral-outline</v-icon>
        </div>
      </v-col>
    </v-row>

    <v-row class="roww pt-10 mt-16 pb-10" v-if="!isShow && !isempty">
      <v-col
        v-for="template in $store.state.finaltemplates"
        class="mt-10"
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="4"
        :key="template._id"
      >
        <template-card :template="template"></template-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import TemplateCard from "../components/TemplateCard.vue";
import SkeletonCard from "../components/SkeletonCard.vue";
import AddTemplate from "../components/AddTemplate.vue";
export default {
  name: "TemplateManage",
  components: { SkeletonCard, AddTemplate, TemplateCard },
  data() {
    return {
      isShow: true,
      isempty: false,
      isActive: true,
      tabs: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      // items: ["uii", "uxx", "icon", "template", "html"],
      regularitems: [
        "شرکتی",
        "شخصی",
        "فروشگاهی",
        "آموزشی",
        "املاک",
        "هتل و رستوران",
      ],
      specialitems: ["املاک", "گردشگری", "استارتاپی"],
      values: "",
    };
  },
  methods: {
    showbyCat(val) {
      console.log("show by category");
      console.log(val);
      if (val) {
        if (this.$store.state.isregular == true) {
          this.$store.state.finaltemplates = this.$store.state.regulartemplates.filter(
            (template) => {
              return template.category == this.$t(val);
            }
          );
        }
        if (this.$store.state.isspecial == true) {
          this.$store.state.finaltemplates = this.$store.state.specialtemplates.filter(
            (template) => {
              return template.category == this.$t(val);
            }
          );
        }
      }
    },
    showRegulartemplates() {
      this.$store.state.finaltemplates = this.$store.state.regulartemplates;
      this.$store.state.isspecial = false;
      this.$store.state.isregular = true;
      console.log("regular done");
    },
    showSpecialtemplates() {
      this.$store.state.finaltemplates = this.$store.state.specialtemplates;
      this.$store.state.isspecial = true;
      this.$store.state.isregular = false;
      console.log("special done");
    },
    log(x) {
      console.log(x);
    },
  },
  watch: {
    values: function (val) {
      if (!val) {
        if (this.$store.state.isregular == true) {
          this.$store.state.finaltemplates = this.$store.state.regulartemplates;
        }
        if (this.$store.state.isspecial == true) {
          this.$store.state.finaltemplates = this.$store.state.specialtemplates;
        }
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
      .get(`https://hyponet.herokuapp.com/api/v1/theme`)
      .then((response) => {
        // this.$store.state.templates = response.data.themes.special;
        this.$store.state.regulartemplates = response.data.themes.regular;
        this.$store.state.finaltemplates = response.data.themes.regular;
        this.$store.state.specialtemplates = response.data.themes.special;
        // console.log("before translate", this.$store.state.designs);
        // this.$store.state.designs.forEach((item) => {
        //   item.category = this.$t(item.category);
        // });
        this.isShow = false;
        console.log("this.$store.state.templates", this.$store.state.templates);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  computed: {
    forwatch() {
      return this.$store.state.finaltemplates;
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





