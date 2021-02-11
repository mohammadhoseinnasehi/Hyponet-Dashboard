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
          <h5>ویرایش قالب</h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon>mdi-close</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <!-- ********************************************************** -->
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="template.title"
                label="نام قالب"
                filled
                rounded
                dense
              ></v-text-field>
            </v-col>
            <!-- ********************************************************** -->
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
                  v-model="template.created_at"
                  locale="fa"
                  no-title
                  :first-day-of-week="6"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <!-- ********************************************************** -->
            <v-col cols="10" lg="10">
              <v-autocomplete
                v-model="template.category"
                :items="items"
                chips
                color="rgb(1, 8, 77)"
                item-color="rgb(1, 8, 77)"
                rounded
                filled
                prefix="دسته بندی ها :"
              ></v-autocomplete>
            </v-col>
            <!-- ********************************************************** -->
            <v-col cols="2" lg="2">
              <v-checkbox
                v-model="template.special"
                label="اختصاصی"
              ></v-checkbox>
            </v-col>
            <!-- ********************************************************** -->
            <v-col cols="12" lg="12">
              <v-textarea
                label="توضیحات"
                v-model="template.subtitle"
                auto-grow
                filled
                rounded
                rows="1"
                row-height="15"
              ></v-textarea>
            </v-col>
            <!-- ********************************************************** -->
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="template.url"
                label="لینک دمو"
                filled
                rounded
                dense
              ></v-text-field>
            </v-col>
            <!-- ********************************************************** -->
            <v-col cols="12" lg="12">
              <v-file-input
                @change="previewimage(image)"
                v-model="image"
                label="تصویر قالب "
                filled
                rounded
                prepend-icon=""
                show-size
                truncate-length="50"
                dense
                append-icon="mdi-camera"
              ></v-file-input>
            </v-col>
            <!-- ********************************************************** -->
            <v-col cols="12" lg="12">
              <v-card
                v-show="template.image"
                max-height="400px"
                max-width="600px"
                class="mx-auto rounded-xl"
              >
                <v-img
                  :src="url"
                  max-height="400px"
                  max-width="600px"
                  @load="img_isload = true"
                >
                </v-img>
              </v-card>
            </v-col>
            <!-- ********************************************************** -->
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
  name: "TemplatePost",
  data() {
    return {
      edit_dialog: false,
      delete_dialog: false,
      loading: false,
      isget: false,
      isdelete: false,
      img_isload: false,
      menu: false,
      template: {},
      // items: ["uii", "uxx", "icon", "template", "html"],
      items: [
        "وردپرس",
        "اچ تی ام ال",
        "قالب آماده",
        "آیکون",
        "تجربه کاربری",
        "رابط کاربری",
      ],
      url: null,
      image: null,
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
        .get(`https://hyponet.herokuapp.com/api/v1/theme/${idd}`)
        .then((response) => {
          console.log(idd);
          this.template = response.data;
          this.url = `https://hyponet.herokuapp.com${this.template.image}`;
          this.template.category = this.$t(this.template.category);
          this.isget = true;
          console.log("url", this.url_low);
          console.log("in the getdata function", this.template);
          console.log("get data is finish");
        })
        .catch((e) => {
          this.isget = true;
          console.log(e);
          console.log("error");
        });
    },
    previewimage(image) {
      if (!image) {
        this.url = null;
      } else {
        this.url = URL.createObjectURL(image);
      }
    },

    edit() {
      var edited_template = {
        category: this.$t(this.template.category),
        title: this.template.title,
        subtitle: this.template.subtitle,
        created_at: this.template.created_at,
        special: this.template.special,
        url: this.template.url,
      };

      var formData = new FormData();
      for (var key in edited_template) {
        formData.append(key, edited_template[key]);
      }
      this.edit_dialog = false;
      this.$vuetify.goTo(350, { duration: 0 });
      this.loading = true;

      if (this.image !== null) {
        formData.append("image", this.image);
      }

      //***************************************************************************************
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      //***************************************************************************************
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      var template_id = this.$route.params.id;
      axios
        .put(
          `https://hyponet.herokuapp.com/api/v1/theme/${template_id}`,
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
          //****************************************************************/
          // if (this.$store.state.filteredtemplates.length > 0) {
          //   var ne = this.$store.state.filteredtemplates.map((template) => {
          //     if (template._id === template_id) {
          //       return response.data;
          //     } else {
          //       return template;
          //     }
          //   });
          //   this.$store.state.filteredtemplates = ne;
          // }

          // this.getData();
          // console.log("after get data", this.template);
          //****************************************************************/
          if (response.data.special == false) {
            this.$store.state.regulartemplates = this.$store.state.regulartemplates.map(
              (template) => {
                if (template._id === template_id) {
                  return response.data;
                } else {
                  return template;
                }
              }
            );
            if (this.$store.state.isregular == true) {
              this.$store.state.finaltemplates = this.$store.state.finaltemplates.map(
                (template) => {
                  if (template._id === template_id) {
                    return response.data;
                  } else {
                    return template;
                  }
                }
              );
            }
          }

          if (response.data.special == true) {
            this.$store.state.specialtemplates = this.$store.state.specialtemplates.map(
              (template) => {
                if (template._id === template_id) {
                  return response.data;
                } else {
                  return template;
                }
              }
            );
            if (this.$store.state.isspecial == true) {
              this.$store.state.finaltemplates = this.$store.state.finaltemplates.map(
                (template) => {
                  if (template._id === template_id) {
                    return response.data;
                  } else {
                    return template;
                  }
                }
              );
            }
          }

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
      var template_id = this.$route.params.id;
      this.delete_dialog = false;
      this.$vuetify.goTo(350, { duration: 0 });
      this.isdelete = true;
      axios
        .delete(
          `https://hyponet.herokuapp.com/api/v1/theme/${template_id}`,

          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.special == false) {
            this.$store.state.regulartemplates = this.$store.state.regulartemplates.filter(
              (template) => {
                return template._id !== template_id;
              }
            );
            if (this.$store.state.isregular == true) {
              this.$store.state.finaltemplates = this.$store.state.finaltemplates.filter(
                (template) => {
                  return template._id !== template_id;
                }
              );
            }
          }

          if (response.data.special == true) {
            this.$store.state.specialtemplates = this.$store.state.specialtemplates.filter(
              (template) => {
                return template._id !== template_id;
              }
            );
            if (this.$store.state.isspecial == true) {
              this.$store.state.finaltemplates = this.$store.state.finaltemplates.filter(
                (template) => {
                  return template._id !== template_id;
                }
              );
            }
          }

          this.$router.push({ name: "Templatemanage" });
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
      if (to.name == "TemplatePosts") {
        this.template = {};
        this.getdata();
      }
    },
  },
  computed: {
    dateformatted() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.template.created_at
        ? moment(this.template.created_at).format("jDD / jMM / jYYYY ")
        : "";
    },
  },
  mounted() {
    console.log(this.$store.state.filteredtemplates);
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