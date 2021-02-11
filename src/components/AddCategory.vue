<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.categoryshow"
      transition="dialog-bottom-transition"
      persistent
      :scrollable="true"
      max-width="1000px"
    >
      <v-card max-height="600px">
        <v-toolbar color="rgb(1, 8, 50)">
          <v-toolbar-title class="white--text"
            ><h5>افزودن دسته بندی</h5></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon class="" dark @click.stop="hide()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" lg="6">
                <v-text-field
                  v-model="englishname"
                  label="نام دسته بندی (انگلیسی)"
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" lg="6">
                <v-text-field
                  v-model="persianname"
                  label="نام دسته بندی (فارسی)"
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12">
                <v-autocomplete
                  v-model="values"
                  :items="items"
                  chips
                  color="rgb(1, 8, 77)"
                  item-color="rgb(1, 8, 77)"
                  rounded
                  filled
                  prefix=" نوع دسته بندی  :"
                ></v-autocomplete>
              </v-col>
              <v-col cols="3">
                <v-btn
                  @click="send()"
                  color="rgb(1, 8, 77)"
                  rounded
                  elevation="10"
                  large
                  text
                  >ارسال</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading" z-index="10000">
      <v-container justify-content-center>
        <v-row>
          <v-col>
            <v-progress-circular
              class="mx-auto"
              indeterminate
              size="64"
            ></v-progress-circular>
            <div class="mt-6 mx-auto">در حال افزودن دسته بندی ...</div>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "AddDesign",
  components: {},
  data() {
    return {
      englishname: "",
      persianname: "",
      items: ["طرح", "قالب", "موشن گرافی"],
      values: "",
      loading: false,
    };
  },
  methods: {
    hide() {
      this.$store.state.categoryshow = false;
    },

    send() {
      this.loading = true;
      this.$store.state.categoryshow = false;
      var new_category = {
        type: this.$t(this.values),
        title: this.englishname,
        persian: this.persianname,
      };

      var that = this;
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      axios
        .post("https://hyponet.herokuapp.com/api/v1/category", new_category, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((response) => {
          that.loading = false;
          this.$store.state.categories.push(response.data);
          console.log(response.data);
        })

        .catch(function () {
          that.loading = false;
          console.log("FAILURE!!");
        });
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.v-btn:hover {
  background-color: rgb(1, 8, 77);
  color: rgb(255, 255, 255) !important;
}
</style>