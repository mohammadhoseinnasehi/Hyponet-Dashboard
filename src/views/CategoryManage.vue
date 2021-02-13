<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-toolbar>
        <v-toolbar-title>مدیریت دسته بندی</v-toolbar-title>
      </v-toolbar>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-btn
          class="float-left ml-2"
          color="rgb(1, 8, 77)"
          rounded
          elevation="10"
          large
          text
          @click.stop="$store.state.categoryshow = true"
        >
          افزودن دسته بندی
          <v-icon right> mdi-plus-circle-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <add-category></add-category>
    <!-- ******************************************************************* -->
    <v-data-table
      v-if="isShow"
      :headers="headers"
      :items-per-page="100"
      hide-default-footer
      :items="$store.state.categories"
      sort-by="type"
      class="elevation-1 mb-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>دسته بندی ها</v-toolbar-title> -->
          <!-- ******************************************************************* -->

          <v-dialog
            v-model="editdialog"
            transition="dialog-bottom-transition"
            persistent
            :scrollable="true"
            max-width="1000px"
          >
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template> -->
            <v-card>
              <v-toolbar color="rgb(1, 8, 50)">
                <v-toolbar-title class="white--text"
                  ><h5>ویرایش دسته بندی</h5></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn icon dark @click.stop="hide()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" lg="6">
                      <v-text-field
                        v-model="edited.title"
                        label="نام دسته بندی (انگلیسی)"
                        filled
                        rounded
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" lg="6">
                      <v-text-field
                        v-model="edited.persian"
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
                        @click="edit()"
                        color="rgb(1, 8, 77)"
                        rounded
                        elevation="10"
                        large
                        text
                        >اعمال تغییرات</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deletedialog" max-width="500px">
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
                  @click="deletedialog = false"
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

          <!-- ******************************************************************* -->
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-4" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon class="mr-8" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <div>
          طرحی موجود نیست .... <v-icon>mdi-emoticon-neutral-outline</v-icon>
        </div>
      </template>
    </v-data-table>
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
    <v-overlay :value="isdelete" absolute z-index="10000">
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
    <!-- ******************************************************************* -->
    <v-overlay :value="!isShow" absolute z-index="10000">
      <v-container justify-content-center>
        <v-row>
          <v-col>
            <v-progress-circular
              class="mx-auto"
              indeterminate
              size="64"
            ></v-progress-circular>
            <div class="mt-6 mx-auto">در حال بارگذاری اطلاعات ...</div>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

    <v-row v-if="isempty" class="roww pt-10 mt-16 pb-10">
      <v-col class="d-flex justify-center">
        <div>
          هیچ دسته بندی وجود ندارد ....
          <v-icon>mdi-emoticon-neutral-outline</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
// import SkeletonCard from "../components/SkeletonCard.vue";
import AddCategory from "../components/AddCategory.vue";
export default {
  name: "CategoryManage",
  components: { AddCategory },
  data() {
    return {
      isShow: false,
      loading: false,
      isempty: false,
      isdelete: false,
      items: ["طرح", "قالب", "موشن گرافی"],
      values: "",
      edited: {},
      deletedid: null,
      editdialog: false,
      deletedialog: false,
      headers: [
        {
          text: "عنوان (فارسی)",
          value: "persian",
          align: "center",
          sortable: false,
        },
        {
          text: "عنوان (انگلیسی)",
          value: "title",
          align: "center",
          sortable: false,
        },
        { text: "دسته بندی", value: "type", align: "center" },
        {
          text: "عملیات ها",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    hide() {
      this.editdialog = false;
    },
    editItem(item) {
      console.log("item", item);
      this.edited = item;
      this.values = this.$t(this.edited.type);
      this.editdialog = true;
    },
    edit() {
      console.log("edited", this.edited);
      var editedcategory = {};
      editedcategory.type = this.$t(this.values);
      editedcategory.persian = this.edited.persian;
      editedcategory.title = this.edited.title;
      console.log("editedcategory", editedcategory);
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      this.editdialog = false;
      this.loading = true;
      // var id = this.edited['_id'];
      axios
        .put(
          `https://hyponet.herokuapp.com/api/v1/category/${this.edited._id}`,
          editedcategory,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.categories = this.$store.state.categories.map(
            (category) => {
              if (category._id === this.edited._id) {
                return response.data;
              } else {
                return category;
              }
            }
          );
          this.loading = false;
        })

        .catch(function (e) {
          console.log(e, "error");
          this.loading = false;
        });
    },
    deleteItem(item) {
      this.deletedialog = true;
      this.deletedid = item._id;
    },
    delet() {
      const token = "32323JUHUHIUH63t6253523KSCJKH()1123(22((@)";
      this.deletedialog = false;
      this.$vuetify.goTo(350, { duration: 0 });
      this.isdelete = true;
      axios
        .delete(
          `https://hyponet.herokuapp.com/api/v1/category/${this.deletedid}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.$store.state.categories = this.$store.state.categories.filter(
            (category) => {
              return category._id !== this.deletedid;
            }
          );

          this.isdelete = false;
        })
        .catch(function (e) {
          console.log("error", e);
          this.isdelete = false;
        });
    },
  },
  watch: {
    // values: function (val) {
    //   if (!val) {
    //     this.$store.state.filtereddesigns = this.$store.state.designs;
    //   }
    // },
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
      .get(`https://hyponet.herokuapp.com/api/v1/category`)
      .then((response) => {
        this.$store.state.categories = response.data.categories;
        this.isShow = true;
        console.log(
          "this.$store.state.categories",
          this.$store.state.categories
        );
      })
      .catch((e) => {
        console.log(e);
        this.isShow = true;
      });
  },
  computed: {
    forwatch() {
      return this.$store.state.categories;
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





