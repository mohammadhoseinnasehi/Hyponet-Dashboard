<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.motionshow"
      transition="dialog-bottom-transition"
      persistent
      :scrollable="true"
      max-width="1000px"
    >
      <v-card max-height="600px">
        <v-toolbar color="rgb(1, 8, 50)">
          <v-toolbar-title class="white--text"
            ><h5>افزودن موشن گرافی</h5></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon class="" dark @click.stop="hide()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  v-model="name"
                  label="عنوان موشن گرافی"
                  filled
                  rounded
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  absolute
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="dateformatted"
                      label="تاریخ ثبت"
                      filled
                      rounded
                      dense
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    locale="fa"
                    no-title
                    :first-day-of-week="6"
                  >
                  </v-date-picker>
                </v-menu>
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
                  prefix="دسته بندی ها :"
                ></v-autocomplete>
                <!-- <p>{{ $t("uii") }}</p> -->
              </v-col>
              <v-col cols="12" lg="12">
                <v-textarea
                  label="توضیحات"
                  v-model="description"
                  auto-grow
                  filled
                  rounded
                  rows="1"
                  row-height="15"
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="12">
                <v-text-field
                  label="لینک موشن گرافی"
                  v-model="motionlink"
                  auto-grow
                  filled
                  rounded
                  rows="1"
                  row-height="15"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12">
                <v-file-input
                  @change="previewimage(images)"
                  v-model="images"
                  label="تصاویر مربوط "
                  filled
                  rounded
                  multiple
                  prepend-icon=""
                  show-size
                  truncate-length="50"
                  dense
                  append-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="12" lg="12">
                <v-card
                  max-height="400px"
                  v-for="url in urls"
                  :key="url"
                  max-width="600px"
                  class="mx-auto rounded-xl"
                >
                  <v-img :src="url" max-height="400px" max-width="600px">
                  </v-img>
                </v-card>
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
            <div class="mt-6 mx-auto">در حال ارسال طرح ...</div>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-row>
</template>

<script>
import axios from "axios";
import moment from "moment-jalaali";
import "moment/locale/fa";
// import AutoComplete from "../components/AutoComplete.vue";
export default {
  name: "AddDesign",
  components: {},
  data() {
    return {
      name: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      description: "",
      motionlink: "",
      images: [],
      urls: [],
      items: ["تیزر"],
      values: "",
      loading: false,
    };
  },
  methods: {
    hide() {
      this.$store.state.motionshow = false;
    },

    send() {
      this.loading = true;
      this.$store.state.motionshow = false;
      var new_motion = {
        category: this.$t(this.values),
        title: this.name,
        subtitle: this.description,
        created_at: this.date,
        video: this.motionlink,
      };

      var formData = new FormData();
      for (var key in new_motion) {
        formData.append(key, new_motion[key]);
      }
      // console.log("this.image",this.image)
      console.log(this.images.length);
      console.log(this.images);

      for (var i in this.images) {
        formData.append(i, this.images[i]);
      }

      console.log(this.date);
      console.log(typeof this.date);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      var that = this;
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      axios
        .post("https://hyponet.herokuapp.com/api/v1/motion", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((response) => {
          that.loading = false;
          this.$store.state.filteredmotions.push(response.data);
          console.log(response.data);
        })

        .catch(function (e) {
          that.loading = false;
          console.log(e);
          console.log("FAILURE!!");
        });
    },

    previewimage(images) {
      // for(var image in images) {
      //   this.urls.push(URL.createObjectURL(image));
      // }
      console.log(images);
    },
  },
  mounted() {
    // if (!localStorage.id) {
    //   localStorage.setItem("id", this.$store.state.id);
    // }
    // console.log(localStorage.id);
    // if (localStorage.design) {
    //   var saved = JSON.parse(localStorage.design);
    //   var that = this;
    //   saved.forEach(function (i) {
    //     that.$store.state.designs.push(i);
    //   });
    //   console.log("yes");
    // }
    // console.log(this.$store.state.designs);
  },
  computed: {
    dateformatted() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.date ? moment(this.date).format("jDD / jMM / jYYYY ") : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn:hover {
  background-color: rgb(1, 8, 77);
  color: rgb(255, 255, 255) !important;
}
</style>