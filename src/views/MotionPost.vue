<template>
  <v-row justify="center">
    <v-overlay :value="!isget" z-index="9999" absolute>
      <v-container>
        <v-progress-circular
          class="mx-auto"
          indeterminate
          size="50"
        ></v-progress-circular>
        <div class="mt-6 mx-auto">در حال بارگیری ...</div>
      </v-container>
    </v-overlay>
    <v-card class="mt-1 mb-1" v-if="isget">
      <v-toolbar color="rgb(1, 8, 50)">
        <v-toolbar-title class="white--text">
          <h5>ویرایش موشن</h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon>mdi-close</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="motion.title"
                label="عنوان موشن"
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
                  v-model="motion.created_at"
                  locale="fa"
                  no-title
                  :first-day-of-week="6"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="12">
              <v-autocomplete
                v-model="motion.category"
                :items="items"
                chips
                color="rgb(1, 8, 77)"
                item-color="rgb(1, 8, 77)"
                rounded
                filled
                prefix="دسته بندی ها :"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" lg="12">
              <v-textarea
                label="توضیحات"
                v-model="motion.subtitle"
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
                  v-model="motion.video"
                  auto-grow
                  filled
                  rounded
                  rows="1"
                  row-height="15"
                ></v-text-field>
              </v-col>
            <v-col cols="12" lg="12">
              <v-file-input
                @change="previewimage(image)"
                v-model="image"
                label="تصاویر موشن "
                filled
                rounded
                prepend-icon=""
                show-size
                truncate-length="50"
                dense
                append-icon="mdi-camera"
              ></v-file-input>
            </v-col>
            <!-- <v-col cols="12" lg="12">
              <v-card
                v-show="motion.imagesPath[0]"
                max-height="400px"
                max-width="600px"
                class="mx-auto rounded-xl"
              >
                <v-img
                  :src="url"
                  max-height="400px"
                  max-width="600px"
                  @load="img1_isload = true"
                >
                </v-img>
              </v-card>
            </v-col> -->
            <v-row class="mt-8">
              <v-container>
                <v-col class="mt-4 d-flex justify-space-between">
                  <v-dialog v-model="edit_dialog" max-width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        v-bind="attrs"
                        v-on="on"
                        color="rgb(1, 8, 77)"
                        rounded
                        elevation="10"
                        large
                        text
                      >
                        اعمال تغییرات
                        <v-icon right>mdi-monitor-edit</v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-container>
                        <h4>آیا از اعمال تغییرات مطمئن هستید ؟</h4>
                      </v-container>
                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="edit()"
                          color="rgb(1, 8, 77)"
                          elevation="5"
                          text
                        >
                          تایید
                          <v-icon right> mdi-checkbox-marked-circle </v-icon>
                        </v-btn>
                        <v-btn
                          @click="edit_dialog = false"
                          color="rgb(1, 8, 77)"
                          elevation="5"
                          text
                        >
                          لغو
                          <v-icon right> mdi-close-circle </v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                  <v-dialog v-model="delete_dialog" max-width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        v-bind="attrs"
                        v-on="on"
                        color="rgb(1, 8, 77)"
                        rounded
                        elevation="10"
                        large
                        text
                      >
                        حذف طرح
                        <v-icon right>mdi-delete</v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-container>
                        <h4>آیا از حذف طرح مطمئن هستید ؟</h4>
                      </v-container>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="delet()"
                          color="rgb(1, 8, 77)"
                          elevation="5"
                          text
                        >
                          تایید
                          <v-icon right> mdi-checkbox-marked-circle </v-icon>
                        </v-btn>
                        <v-btn
                          @click="delete_dialog = false"
                          color="rgb(1, 8, 77)"
                          elevation="5"
                          text
                        >
                          لغو
                          <v-icon right> mdi-close-circle </v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-container>
            </v-row>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-overlay :value="loading" absolute z-index="10000">
      <v-container justify-content-center>
        <v-row>
          <v-col>
            <v-progress-circular
              class="mx-auto"
              indeterminate
              size="64"
            ></v-progress-circular>
            <div class="mt-6 mx-auto">در حال اعمال تغییرات ...</div>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
    <v-overlay :value="isdelete" absolute z-index="10001">
      <v-container justify-content-center>
        <v-row>
          <v-col>
            <v-progress-circular
              class="mx-auto"
              indeterminate
              size="64"
            ></v-progress-circular>
            <div class="mt-6 mx-auto">در حال حذف طرح ...</div>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-row>
</template>
<script>
import moment from "moment-jalaali";
import "moment/locale/fa";
import axios from "axios";
export default {
  name: "MotionPost",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      loading: false,
      isget: false,
      isdelete: false,
      // img1_isload: false,
      // img2_isload: false,
      menu: false,
      design: {},
      // items: ["uii", "uxx", "icon", "template", "html"],
      items: [
        "تیزر",
        
      ],
      // url_low: null,
      // url_high: null,
      // image_low: null,
      // image_high: null,
    };
  },
  methods: {
    log(x) {
      console.log(x);
    },
    getdata() {
      this.isget = false;
      var idd = this.$route.params.id;
      console.log(idd);
      axios
        .get(`https://hyponet.herokuapp.com/api/v1/motion/${idd}`)
        .then((response) => {
          console.log(idd);
          this.motion = response.data;
          // this.url_low = `https://hyponet.herokuapp.com${this.design.image1}`;
          // this.url_high = `https://hyponet.herokuapp.com${this.design.image2}`;
          this.motion.category = this.$t(this.motion.category);
          this.isget = true;
          // console.log("url", this.url_low);
          console.log("in the getdata function", this.motion);
          console.log("get data is finish");
        })
        .catch((e) => {
          this.isget = true;
          console.log(e);
          console.log("error");
        });
    },
    previewimage(image) {
      // if (image == this.image_low) {
      //   if (!image) {
      //     this.url_low = null;
      //   } else {
      //     this.url_low = URL.createObjectURL(image);
      //   }
      // }
      // if (image == this.image_high) {
      //   if (!image) {
      //     this.url_high = null;
      //   } else {
      //     this.url_high = URL.createObjectURL(image);
      //   }
      // }
      console.log(image)
    },
    //return a promise that resolves with a File instance
    // urltoFile(url, filename, mimeType) {
    //   return fetch(url)
    //     .then(function (res) {
    //       return res.arrayBuffer();
    //     })
    //     .then(function (buf) {
    //       return new File([buf], filename, { type: mimeType });
    //     });
    // },

    //Usage example:
    // urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
    // .then(function(file){ console.log(file);});

    // dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);

    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }

    //   return new File([u8arr], filename, { type: mime });
    // },

    //Usage example:
    // var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
    // console.log(file);

    // async
    edit() {
      var edited_motion = {
        category: this.$t(this.motion.category),
        title: this.motion.title,
        subtitle: this.motion.subtitle,
        created_at: this.motion.created_at,
      };

      var formData = new FormData();
      for (var key in edited_motion) {
        formData.append(key, edited_motion[key]);
      }
      this.edit_dialog = false;
      this.$vuetify.goTo(350, { duration: 0 });
      this.loading = true;

      //*************************************************************************************** */
      // if (this.image_low === null) {
      //   await axios({
      //     url: `https://hyponet.herokuapp.com${this.design.image1}`,
      //     method: "GET",
      //     responseType: "arraybuffer",
      //   })
      //     .then((response) => {
      //       this.image_low = btoa(
      //         new Uint8Array(response.data).reduce(
      //           (data, byte) => data + String.fromCharCode(byte),
      //           ""
      //         )
      //       );
      //       let dataURL1 = `data:${response.headers[
      //         "content-type"
      //       ].toLowerCase()};base64,${this.image_low}`;
      //       console.log(this.dataURLtoFile(dataURL1, this.design.imageName_1));
      //       formData.append(
      //         "image1",
      //         this.dataURLtoFile(dataURL1, this.design.imageName_1)
      //       );
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // } else {
      //   formData.append("image1", this.image_low);
      // }


      // if (this.image_low !== null) {
        formData.append("image1", this.image_low);
      // }

      //*************************************************************************************** */
      // if (this.image_high === null) {
      //   await axios({
      //     url: `https://hyponet.herokuapp.com${this.design.image2}`,
      //     method: "GET",
      //     responseType: "arraybuffer",
      //   })
      //     .then((response) => {
      //       this.image_high = btoa(
      //         new Uint8Array(response.data).reduce(
      //           (data, byte) => data + String.fromCharCode(byte),
      //           ""
      //         )
      //       );
      //       let dataURL2 = `data:${response.headers[
      //         "content-type"
      //       ].toLowerCase()};base64,${this.image_high}`;
      //       console.log(this.dataURLtoFile(dataURL2, this.design.imageName_2));
      //       formData.append(
      //         "image2",
      //         this.dataURLtoFile(dataURL2, this.design.imageName_2)
      //       );
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // } else {
      //   formData.append("image2", this.image_high);
      // }

      // if (this.image_high !== null) {
      //   formData.append("image2", this.image_high);
      // }

      //***************************************************************************************
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      //***************************************************************************************
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      var motion_id = this.$route.params.id;
      axios
        .put(
          `https://hyponet.herokuapp.com/api/v1/design/${motion_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (this.$store.state.filteredmotions.length > 0) {
            var ne = this.$store.state.filteredmotions.map((motion) => {
              if (motion._id === motion_id) {
                return response.data;
              } else {
                return motion;
              }
            });
            this.$store.state.filtereddesigns = ne;
          }

          // this.getData();
          // console.log("after get data", this.design);

          this.loading = false;
        })

        .catch(function (e) {
          console.log(e);
          this.loading = false;
        });
      //***************************************************************************************
    },
    delet() {
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      var motion_id = this.$route.params.id;
      this.delete_dialog = false;
      this.$vuetify.goTo(350, { duration: 0 });
      this.isdelete = true;
      axios
        .delete(
          `https://hyponet.herokuapp.com/api/v1/motion/${motion_id}`,

          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (this.$store.state.filteredmotions.length > 0) {        
            this.$store.state.filteredmotions = this.$store.state.filteredmotions.filter(
              (motion) => {
                return motion._id !== motion_id;
              }
            );
          }
          this.$router.push({ name: "Motionmanage" });
          this.isdelete = false;
        })
        .catch(function (e) {
          console.log(e);
          this.isdelete = false;
        });
    },
  },
  created() {
    this.getdata();
  },
  watch: {
    $route: function (to, from) {
      // console.log(to)
      console.log(from);
      if (to.name == "MotionPosts") {
        this.motion = {};
        this.getdata();
      }
    },
  },
  computed: {
    dateformatted() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.motion.created_at
        ? moment(this.motion.created_at).format("jDD / jMM / jYYYY ")
        : "";
    },
  },
  mounted() {
    console.log(this.$store.state.filteredmotions);
    this.getdata();
  },
};
</script>
<style lang="scss" scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.v-btn:hover {
  background-color: rgb(1, 8, 77);
  color: rgb(255, 255, 255) !important;
}
</style>