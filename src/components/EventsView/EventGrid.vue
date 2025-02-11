<template>
  <div class="event-grid">
    <template v-for="year in groupedEvents">
      <div v-for="month in year.months" :key="month" class="month-section">
        <h2 class="month-title">{{ renderYear(year.year) }} {{ months[month.month] }}</h2>
        <div class="event-cards">
          <EventCard
            v-for="(event, index) in month.events"
            @click="goTo(event.id)"
            :key="index"
            :cardData="event"
            :isOutdated="isOutdated(event)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import useEventsStore from '@/stores/events';
import EventCard from './EventCard.vue';

export default {
  name: "EventGrid",
  components: {
    EventCard,
  },
  setup() {
    return {
      eventStore: useEventsStore()
    }
  },
  data: () => ({
    months: {
      0: 'Январь',
      1: 'Февраль',
      2: "Март",
      3: "Апрель",
      4: 'Май',
      5: 'Июнь',
      6: 'Июль',
      7: 'Август',
      8: 'Сентябрь',
      9: 'Октябрь',
      10: 'Ноябрь',
      11: 'Декабрь',
    }
  }),
  computed: {
    events() {
      return this.eventStore.getEvents
    },
    groupedEvents() {
      if (!this.events || this.events.length === 0) {
        return {};
      }

      const grouped: { [key: string]: any } = {};
      const currentDate = new Date('2025-02-06'); // Using the provided current time
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      // Group events by year and month, but only include current and future events
      this.events.forEach((event) => {
        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();

        // Skip events from past months
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          return;
        }

        if (!grouped[year]) {
          grouped[year] = {[month]: [event]};
        } else {
          if (!grouped[year][month]) {
            grouped[year][month] = [event];
          } else {
            grouped[year][month].push(event);
          }
        }
      });

      // Sort years ascending (current year first, then future years)
      return Object.entries(grouped).sort().map(el => ({
        year: el[0],
        months: Object.entries(el[1])
          .sort((a, b) => Number(a[0]) - Number(b[0])) // Sort months chronologically
          .map(m => ({
            month: m[0],
            events: m[1]
          }))
      }));
    },
  },
  methods: {
    // Проверка на устаревшие мероприятия, чтобы сделать карточку outdated, но я где-то обосрался и это не работает
    isOutdated(event) {
      return false
    },
    renderYear(year) {
      console.log(year)
      if ((new Date()).getFullYear() != year) return year 
      else return null
    },
    goTo(eId: number) {
      this.$router.push({path: `/event/${eId}`})
    }
  },
};
</script>

<style scoped>
/* Грииды гриды гридочки */
.event-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 5rem;
  padding-right: 5rem;
}

.month-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 1rem;
}

@media (max-width: 1200px) {
  .event-cards {
    grid-template-columns: repeat(3, 1fr); 
  }
}

@media (max-width: 900px) {
  .event-cards {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 600px) {
  .event-cards {
    grid-template-columns: 1fr; 
  }
}
.month-title {
  font-size: 2rem;
  font-weight: 700;
}
</style>
