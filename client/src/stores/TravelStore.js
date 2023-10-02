import { defineStore } from "pinia";

export const useTravelStore = defineStore("travelStore", {
  state: () => ({
    travels: [],
    sortTravelArray: [],
  }),
  getters: {},
  actions: {
    parseDate: function (dateString) {
      const date = new Date(dateString);

      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      const fullDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${formattedHours}:${formattedMinutes}`;
      const timeDate = `${formattedHours}:${formattedMinutes}`;

      return { fullDate, timeDate };
    },
    sortTravels: function (sort, action) {
      let sortArr = [...this.travels];

      if (sort) {
        switch (action) {
          case "placeDeparture":
            sortArr = sortArr.filter((travel) =>
              travel.place_departure.includes(sort)
            );
            break;

          case "placeArrival":
            sortArr = sortArr.filter((travel) =>
              travel.place_arrival.includes(sort)
            );
            break;

          case "timeTravelAscending":
            sortArr = sortArr.sort((a, b) => {
              const durationA = parseInt(a.duration.match(/\d+/)[0], 10);
              const durationB = parseInt(b.duration.match(/\d+/)[0], 10);
              return durationA - durationB;
            });
            break;

          case "timeTravelDescending":
            sortArr = sortArr.sort((a, b) => {
              const durationA = parseInt(a.duration.match(/\d+/)[0], 10);
              const durationB = parseInt(b.duration.match(/\d+/)[0], 10);
              return durationB - durationA;
            });
            break;

          default:
            break;
        }

        if (sort === "reset") {
          this.sortTravelArray = this.travels;
        }

        if (sortArr.length > 0) {
          this.sortTravelArray = sortArr;
        } else {
          this.sortTravelArray = [];
        }
      }
    },
  },
});
