<template>
  <div class="filters">
    <div class="text-h5 text-white q-mt-sm q-mb-sm">
      <q-icon name="sort" /> Сортировка
    </div>
    <div class="column">
      <div class="col">
        <q-select
          rounded
          outlined
          v-model="filterDeparture"
          transition-show="scale"
          transition-hide="scale"
          :options="places_departure"
          label="Откуда"
          class="q-selecet filled"
          @update:model-value="handleFilterChange()"
          dark
        />
      </div>
      <div class="col">
        <q-select
          rounded
          outlined
          v-model="filterArrival"
          :options="place_arrival"
          transition-show="scale"
          transition-hide="scale"
          label="Куда"
          class="q-selecet filled"
          @update:model-value="handleFilterChange()"
          dark
        />
      </div>
      <div class="col">
        <q-select
          rounded
          outlined
          transition-show="scale"
          transition-hide="scale"
          v-model="filterTime"
          :options="travel_times"
          label="Время в пути"
          class="q-selecet text-white"
          @update:model-value="handleFilterChange()"
          dark
        />
      </div>
      <q-btn
        rounded
        label="Сбросить"
        color="primary"
        class="q-mt-xs"
        @click="handleFilterChange('reset')"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTravelStore } from "src/stores/TravelStore";
const travelStore = useTravelStore();
const { sortTravels } = travelStore;

export default {
  setup() {
    const filterDeparture = ref(null);
    const filterArrival = ref(null);
    const filterTime = ref(null);

    const handleFilterChange = (reset) => {
      if (filterDeparture.value) {
        sortTravels(filterDeparture.value, "placeDeparture");
      }
      if (filterArrival.value) {
        sortTravels(filterArrival.value, "placeArrival");
      }
      if (filterTime.value === "По возрастанию") {
        sortTravels(filterTime.value, "timeTravelAscending");
      }
      if (filterTime.value === "По убыванию") {
        sortTravels(filterTime.value, "timeTravelDescending");
      }
      if (reset === "reset") {
        filterDeparture.value = "";
        filterArrival.value = "";
        filterTime.value = "";
        sortTravels("reset");
      }
    };

    const places_departure = ["Липецк", "Рязань", "Владивосток", "Саратов"];
    const place_arrival = ["Воронеж", "Сызрань", "Казань", "Москва", "Пермь"];
    const travel_times = ["По возрастанию", "По убыванию"];

    return {
      filterDeparture,
      filterArrival,
      filterTime,
      handleFilterChange,
      places_departure,
      place_arrival,
      travel_times,
    };
  },
};
</script>

<style lang="scss">
.filters {
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .column {
    width: 80%;
    .q-selecet {
      margin: 10px 0;
    }
  }
}
</style>
