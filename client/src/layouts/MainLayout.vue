<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="index">
      <my-filters />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

import { useTravelStore } from "src/stores/TravelStore";
import MyFilters from "src/components/MyFilters.vue";

export default {
  beforeRouteUpdate(to, from, next) {
    document.title = to.meta.title || "";
    next();
  },
  components: { MyFilters },
  setup() {
    const leftDrawerOpen = ref(false);
    const travelStore = useTravelStore();

    return {
      leftDrawerOpen,
      travelStore,
    };
  },
};
</script>

<style lang="scss">
.index {
  width: 100vw;
  height: 100vh;
  background: #363636;
  display: flex;
}
</style>
