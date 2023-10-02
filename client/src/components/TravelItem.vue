<template>
  <q-card class="my-card flex flex-wrap" flat bordered dark>
    <q-card-section vertical>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ travel.place_departure }} <q-icon name="keyboard_arrow_right" />
          {{ travel.place_arrival }}
        </div>
        <div class="text-overline">Время в пути: {{ travel.duration }}</div>
      </q-card-section>

      <q-card-section class="col-5 flex flex-center">
        <q-img
          class="rounded-borders img"
          src="src/assets/travel.jpg"
          alt="alt"
        />
      </q-card-section>
    </q-card-section>

    <q-separator inset />

    <q-card-actions>
      <q-btn color="primary"
        >отбытие {{ parseDate(travel.time_departure).timeDate }}
      </q-btn>
      <q-btn color="primary"
        >прибытие {{ parseDate(travel.time_arrival).timeDate }}
      </q-btn>

      <q-btn color="warning"
        ><router-link :to="'/' + travel.id" class="link"
          ><q-icon name="open_in_new" />Подробнее</router-link
        ></q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useTravelStore } from "src/stores/TravelStore";

const travelStore = useTravelStore();
const { parseDate } = travelStore;
const props = defineProps({
  travel: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.my-card {
  width: 30rem;
  height: 50%;
  margin: 10px;
  .img {
    width: 25rem;
    height: 15rem;
  }
  .link {
    text-decoration: none;
  }
}
</style>
