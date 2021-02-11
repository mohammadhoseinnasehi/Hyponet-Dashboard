<template>
  <v-navigation-drawer
    app
    color="#757575"
    permanent
    src="../assets/images/6.jpg"
    right
    dark
    max-width="240"
    v-if="$vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm' "
    >
    <template v-slot:prepend>
      <v-list-item two-line class="pr-2">
        <v-list-item-avatar>
          <img src="../assets/images/rasato.svg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>هایپونت</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        class="item pt-2 pb-2"
        v-for="item in items"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "Drawer",
  data() {
    return {
      items: [
        {
          title: "داشبورد",
          icon: "mdi-menu",
          link: "/",
        },
        {
          title: "مدیریت طرح ها",
          icon: "mdi-clipboard-edit-outline",
          link: "/designmanage",
        },
        {
          title: "مدیریت قالب ها",
          icon: "mdi-clipboard-text-outline",
          link: "/templatemanage",
        },
        {
          title: "مدیریت دسته بندی",
          icon: "mdi-clipboard-text-outline",
          link: "/categorymanage",
        },
        
      ],
    };
  },
};
</script>
<style lang="scss">
.item:hover {
  background-color: rgba(0, 30, 58, 0.438);
  
}
</style>