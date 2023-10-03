<template>
  <q-page padding class="one-travel styled-scrollbars">
    <q-btn
      round
      color="white-5"
      icon="arrow_back"
      @click="goBack"
      class="arrow-back"
    />
    <div class="q-pa-md row items-start q-gutter-md flex justify-center card">
      <q-card class="my-card" dark bordered>
        <!-- <q-img src="src/assets/oneTravel.jpg" class="q-pt-xl" /> -->

        <q-card-section>
          <div class="text-overline text-orange-9" v-if="travel_obj">
            {{ travel_obj.place_departure }}
            <q-icon name="keyboard_arrow_right" />
            {{ travel_obj.place_arrival }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs"></div>
          <div class="text-subtitle1">
            Подробная информация о поезде:
            <p
              class="text-caption text-grey"
              v-if="travel_obj && travel_obj.ticket"
            >
              Стоимость билета на данный рейс: {{ travel_obj.ticket.cost }}
            </p>
            <p
              class="text-caption text-grey"
              v-if="travel_obj && travel_obj.time_departure"
            >
              Время отправления:
              {{ getDateDeparture }}
            </p>
            <p
              class="text-caption text-grey"
              v-if="travel_obj && travel_obj.time_arrival"
            >
              Время прибытия: {{ getDateArrival }}
            </p>
            <p
              class="text-caption text-grey"
              v-if="travel_obj && travel_obj.duration"
            >
              Время в пути: {{ travel_obj.duration }}
            </p>
            <p
              class="text-caption text-grey"
              v-if="travel_obj && travel_obj.train"
            >
              Вид вагонов: {{ travel_obj.train.type }}
            </p>
          </div>
          <p class="text-caption" v-if="travel_obj && travel_obj.ticket">
            Количество доступных билетов: {{ getCountTickets }}
          </p>

          <table v-if="travel_obj && travel_obj.ticket.quantity > 0">
            <thead>
              <tr>
                <th>Место</th>
                <th>Свободно</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="index in 10" :key="index">
                <td>{{ index }}</td>
                <td>
                  <input
                    type="checkbox"
                    v-model="selectedSeats[index - 1]"
                    :disabled="
                      isSeatDisabled(index) ||
                      index > travel_obj.ticket.quantity
                    "
                  />
                </td>
              </tr>
            </tbody>
            <q-btn
              rounded
              color="primary"
              label="Купить"
              @click="buyTickets"
              class="buy-ticket"
            />
          </table>

          <div v-if="purchasedSeatsCount > 0" class="text-caption">
            Куплено билетов: {{ purchasedSeatsCount }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { useTravelStore } from "src/stores/TravelStore";
const travelStore = useTravelStore();
const { parseDate } = travelStore;
export default {
  name: "OneTravelPage",
  data() {
    return {
      travelId: null,
      travel_obj: null,
      buy_ticket: true,
      selectedSeats: [],
      purchasedSeats: [],
    };
  },
  computed: {
    purchasedSeatsCount() {
      return this.purchasedSeats.filter((seat) => seat).length;
    },
    getDateDeparture() {
      return parseDate(this.travel_obj.time_departure).fullDate;
    },
    getDateArrival() {
      return parseDate(this.travel_obj.time_arrival).fullDate;
    },
    getCountTickets() {
      return this.travel_obj.ticket.quantity;
    },
  },
  methods: {
    async findOneTravel() {
      const res = await api.get(
        `http://localhost:5000/api/travel/${this.travelId}`
      );
      this.travel_obj = res.data;
    },

    goBack() {
      this.$router.go(-1);
    },
    isSeatAvailable(index) {
      //  доступно ли место по индексу
      return index < this.travel_obj.ticket.quantity;
    },
    isSeatDisabled(index) {
      //  является ли место купленным
      return this.purchasedSeats[index - 1];
    },
    async buyTickets() {
      if (this.selectedSeats.length === 0) {
        return;
      }

      this.purchasedSeats = this.selectedSeats.slice();

      const buy = await api
        .delete(`http://localhost:5000/api/travel/buy/${this.travelId}`, {
          data: { remove_count: this.purchasedSeatsCount },
        })
        .then((res) => {
          console.log(res);
        });
      this.selectedSeats = [];
    },
  },
  created() {
    this.travelId = this.$route.params.travelId;
    this.findOneTravel();
  },
};
</script>

<style lang="scss" scoped>
.arrow-back {
  background: #464646;
}
.one-travel {
  width: 100%;
  overflow: auto;
}

.card {
  width: 100%;
  // border: 1px solid red;
  .my-card {
    width: 45%;
    position: relative;
    .buy-ticket {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}

.styled-scrollbars {
  scrollbar-color: #fff #000;
}
.styled-scrollbars::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.styled-scrollbars::-webkit-scrollbar-thumb {
  background: #999;
}
.styled-scrollbars::-webkit-scrollbar-track {
  background: #333;
}
</style>
