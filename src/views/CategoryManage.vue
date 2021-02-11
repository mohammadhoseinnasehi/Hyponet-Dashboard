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
      :headers="headers"
      :items="$store.state.categories"
      sort-by="type"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="edited.title"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="edited.persian"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="edited.type"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <!-- ******************************************************************* -->

    <!-- <v-row class="roww pt-10 mt-16 pb-10" v-if="isShow">
      <v-col v-for="i in 12" cols="12" xs="12" sm="12" md="6" lg="4" :key="i">
      
        <skeleton-card></skeleton-card>
      </v-col>
    </v-row> -->

    <!-- <v-row v-if="isempty" class="roww pt-10 mt-16 pb-10">
      <v-col class="d-flex justify-center">
        <div>
          طرحی موجود نیست .... <v-icon>mdi-emoticon-neutral-outline</v-icon>
        </div>
      </v-col>
    </v-row> -->
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
      isShow: true,
      isempty: false,
      edited: [],
      editdialog: false,
      deletedialog: false,
      headers: [
        { text: "عنوان (فارسی)", value: "persian" },
        { text: "عنوان (انگلیسی)", value: "title" },
        { text: "دسته بندی", value: "type" },
      ],
    };
  },
  methods: {},
  watch: {
    // values: function (val) {
    //   if (!val) {
    //     this.$store.state.filtereddesigns = this.$store.state.designs;
    //   }
    // },
    // forwatch: function (val) {
    //   console.log("for watch ", val);
    //   if (val.length == 0) {
    //     this.isempty = true;
    //   } else {
    //     this.isempty = false;
    //   }
    // },
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
        this.isShow = false;
        console.log(
          "this.$store.state.categories",
          this.$store.state.categories
        );
      })
      .catch((e) => {
        console.log(e);
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





