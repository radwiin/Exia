<template>
  <component :is="layout"></component>
</template>

<script>
import SideMenuLayout from "./SideMenuLayout";
import SideAllLayout from "./SideAllLayout";
import TopMenuLayout from "./TopMenuLayout";
import { mapState } from "vuex";

export default {
  name: "layout",
  components: {
    SideMenuLayout,
    SideAllLayout,
    TopMenuLayout
  },
  computed: {
    ...mapState({
      layout: state => state.settings.layout
    })
  }
};
</script>

<style></style>
