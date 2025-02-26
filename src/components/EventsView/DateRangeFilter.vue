<template>
  <div class="events_date">
    <swiper
  class="events_date__wrap"
  :slides-per-view="'auto'"
  :space-between="10"
  :freeMode="true"
  :mousewheel="true"
  :modules="modules"
  ref="swiper"
>
      <swiper-slide class="events_date__block" v-for="(month, index) in months" :key="index">
        <div
          class="events_date__title"
          :data-from="month.from"
          :data-to="month.to"
          @click="selectMonth(month.from, month.to)"
        >
          {{ month.name }}
        </div>
        <div class="events_date__list">
          <div
            v-for="(date, idx) in month.dates"
            :key="idx"
            :data-id="date.id"
            :data-value="date.value"
            class="events_date__date"
            :class="{
              active: isActive(date.value),
              range: isInRange(date.value),
              we: isWeekend(date.value),
              past: isPastDate(date.value)
            }"
            @click="selectDate(date)"
          >
            <font>{{ date.day }}</font>
            <span>{{ date.weekday }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import 'swiper/css/free-mode';
import 'swiper/swiper-bundle.css';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export default {
  name: "DateRangeFilter",
  components: { Swiper, SwiperSlide },
  setup() {
      return {
        modules: [FreeMode],
      };
    },
  data() {
    const today = new Date();
    const months = [];

    for (let i = 0; i < 3; i++) {
      const start = startOfMonth(addDays(today, i * 30));
      const end = endOfMonth(start);
      const dates = eachDayOfInterval({ start, end }).map((date, id) => ({
        id,
        value: format(date, "yyyy-MM-dd"),
        day: format(date, "dd"),
        weekday: format(date, "EEEEEE", { locale: ru }),
      }));

      months.push({
        from: format(start, "yyyy-MM-dd"),
        to: format(end, "yyyy-MM-dd"),
        name: format(start, "LLLL", { locale: ru }),
        dates,
      });
    }

    return {
      months,
      selectedDates: [],
    };
  },
  methods: {
    selectDate(date) {
      // Не позволяем выбирать прошедшие даты
      if (this.isPastDate(date.value)) {
        return;
      }
      
      if (this.selectedDates.length === 0) {
        this.selectedDates = [date.value];
      } else if (this.selectedDates.length === 1) {
        if (isSameDay(parseISO(this.selectedDates[0]), parseISO(date.value))) {
          this.selectedDates = [];
        } else {
          this.selectedDates = [this.selectedDates[0], date.value].sort();
        }
      } else {
        this.selectedDates = [date.value];
      }
      this.$emit("update:dates", this.selectedDates);
    },
    selectMonth(from, to) {
      // Проверяем, не является ли весь месяц прошедшим
      if (this.isPastDate(to)) {
        return;
      }
      this.selectedDates = [from, to];
      this.$emit("update:dates", this.selectedDates);
    },
    isActive(value) {
      return this.selectedDates.includes(value);
    },
    isInRange(value) {
      if (this.selectedDates.length === 2) {
        const [start, end] = this.selectedDates.map(parseISO);
        const current = parseISO(value);
        return current > start && current < end;
      }
      return false;
    },
    isWeekend(value) {
      return isWeekend(parseISO(value));
    },
    isPastDate(value) {
      const currentDate = new Date('2025-02-14'); // Используем текущую дату из метаданных
      const dateToCheck = parseISO(value);
      return dateToCheck < currentDate;
    },
  },
};

</script>

<style>
.events_date {
  position: relative;
  overflow: hidden;
  list-style: none;
  padding-left: 5rem;
  padding-right: 5rem;
  z-index: 1;
  margin-bottom: 1rem;
}
@media screen and (max-width: 767px) {
  .events_date {
    margin: -2rem -2rem 3rem;
    padding: 0 2rem;
  }
}
.events_date__wrap {
  cursor: grab;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
  user-select: none;
  overflow: hidden;
  scroll-behavior: smooth;
  display: flex;
  -webkit-box-sizing: content-box;
          box-sizing: content-box;
}
.events_date__block {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-width: auto;
}
.events_date__title {
  font-size: 1rem;
}
.events_date__list {
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.events_date__date {
  width: 4rem;
  height: 5rem;
  text-align: center;
  border-radius: 2.5rem;
  padding-top: 1rem;
  user-select: auto;
  position: relative;
  transition: all 0.1s ease-in-out;
}
.events_date__date.active {
  background: #f3ca00;
  transition: all 0.1s ease-in-out;
  z-index: 2;
}
.events_date__date.we span {
  color: #f00;
}
.events_date__date.range {
  border-radius: 0;
}
.events_date__date.range:before {
  content: ' ';
  display: block;
  position: absolute;
  left: -2.5rem;
  right: 0rem;
  top: 0;
  background: #fffae6;
  width: 6rem;
  height: 5rem;
  z-index: 1;
  transition: all 0.1s ease-in-out;
}
.events_date__date font {
  display: block;
  text-align: center;
  font-size: 2rem;
  line-height: 1em;
  font-family: 'Times', 'Georgia';
  position: relative;
  z-index: 4;
}
.events_date__date span {
  display: block;
  text-align: center;
  opacity: 0.75;
  position: relative;
  z-index: 4;
}
.events_date__date.past {
  opacity: 0.5;
  pointer-events: none;
}

.events_date__date.past.active {
  background: none;
}

.events_date__date.past:before {
  display: none;
}
</style>
