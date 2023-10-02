<template>
  <q-page class="main">
    <TravelList />
  </q-page>
</template>

<script>
import TravelList from "src/components/TravelList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    TravelList,
  },
});
</script>

<style scoped>
.main {
  width: 100%;
}
</style>
