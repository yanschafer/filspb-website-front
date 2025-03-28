<template>
  <div class="event-grid">
    <LoadingSpinner :show="eventStore.isLoading" />
    <div v-if="!eventStore.isLoading" class="events-container">
      <template v-for="year in groupedEvents">
        <div v-for="month in year.months" :key="month" class="month-section">
          <h2 class="month-title">{{ renderYear(year.year) }} {{ months[month.month] }}</h2>
          <div class="event-cards">
            <EventCard
              v-for="(event, index) in month.events"
              @click="goTo(event.id)"
              :key="index"
              class="animate__animated animate__fadeIn"
              :cardData="event"
              :isOutdated="isOutdated(event)"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import useEventsStore from '@/stores/events';
import EventCard from './EventCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

export default {
  name: "EventGrid",
  components: {
    EventCard,
    LoadingSpinner,
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
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Сбрасываем время до начала дня
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      // Keep track of added event IDs to prevent duplicates
      const addedEventIds = new Set();

      // Group events by year and month, but only include current and future events
      this.events.forEach((event) => {
        const eventDate = new Date(event.date);
        
        // Skip past events
        if (eventDate < currentDate) {
          return;
        }

        const year = eventDate.getFullYear();
        const month = eventDate.getMonth();
        const day = eventDate.getDate();

        // Skip if we've already added this event
        if (addedEventIds.has(event.id)) {
          return;
        }

        // Skip events that are more than 2 months ahead when not date filtered
        if (!this.eventStore.isDateFiltered) {
          const twoMonthsLater = new Date(currentDate);
          twoMonthsLater.setMonth(currentMonth + 2, 1);
          if (eventDate > twoMonthsLater) {
            return;
          }
        }

        // Add event ID to our tracking set
        addedEventIds.add(event.id);

        if (!grouped[year]) {
          grouped[year] = {[month]: [event]};
        } else {
          if (!grouped[year][month]) {
            grouped[year][month] = [event];
          } else {
            // Проверяем, нет ли уже такого события в этом месяце
            if (!grouped[year][month].some(e => e.id === event.id)) {
              grouped[year][month].push(event);
            }
          }
        }
      });

      // Convert to array and sort
      const result = Object.entries(grouped).sort().map(el => {
        const year = el[0];
        const months = Object.entries(el[1])
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(m => ({
            month: Number(m[0]),
            events: m[1].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          }));

        // Если нет фильтрации по датам в DatePicker, показываем только текущий и следующий месяц
        if (!this.eventStore.isDateFiltered) {
          return {
            year,
            months: months.filter(m => {
              const monthNum = Number(m.month);
              const yearNum = Number(year);
              
              // Для текущего года
              if (yearNum === currentYear) {
                // Показываем только текущий и следующий месяц
                return monthNum >= currentMonth && monthNum <= currentMonth + 1;
              }
              
              // Для следующего года (только если текущий месяц декабрь)
              if (yearNum === currentYear + 1 && currentMonth === 11) {
                return monthNum === 0;
              }
              
              return false;
            })
          };
        }
        
        // Если есть фильтрация по датам, показываем все отфильтрованные месяцы
        return {
          year,
          months
        };
      });

      return result;
    },
  },
  methods: {
    isOutdated(event) {
      const eventDate = new Date(event.date);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Сбрасываем время до начала дня
      return eventDate < currentDate;
    },
    renderYear(year) {
      if (new Date().getFullYear() != year) return year 
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
