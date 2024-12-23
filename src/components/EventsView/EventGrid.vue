<script lang="ts">
import EventCard from './EventCard.vue';

export default {
  name: "EventGrid",
  components: {
    EventCard,
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  computed: {
  groupedEvents() {
    if (!this.events || this.events.length === 0) {
      return {};
    }

    const grouped: { [key: string]: any[] } = {};

    // Сортировка по дате, которая не работает
    const sortedEvents = this.events.sort((a, b) => {
      const parsedDateA = this.parseDate(a.date);
      const parsedDateB = this.parseDate(b.date);
      return parsedDateA.getTime() - parsedDateB.getTime(); 
    });

    // Группировка по месяцам, которую ебал в рот
    sortedEvents.forEach((event) => {
      const parsedDate = this.parseDate(event.date); 
      const month = parsedDate.toLocaleString('default', { month: 'long' });
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(event);
    });

    return grouped;
  },
},
  methods: {
    // Проверка на устаревшие мероприятия, чтобы сделать карточку outdated, но я где-то обосрался и это не работает
    isOutdated(event) {
      const parsedDate = this.parseDate(event.date);
      return parsedDate < new Date(); 
    },
    parseDate(dateString: string) {
  // Массив месяцев, потому что я пытался сделать автоматический вывод на месяцы
  const months = {
    январь: 0,
    февраль: 1,
    март: 2,
    апрель: 3,
    май: 4,
    июнь: 5,
    июль: 6,
    август: 7,
    сентябрь: 8,
    октябрь: 9,
    ноябрь: 10,
    декабрь: 11,
  };

  const regex = /(\d+)\s([а-яА-Я]+)/;
  const match = dateString.match(regex);
  
  if (match && match.length === 3) {
    const day = match[1];
    const month = months[match[2].toLowerCase()];
    const currentYear = new Date().getFullYear();

    if (month !== undefined) {
      return new Date(currentYear, month, parseInt(day)); 
    }
  }

  return new Date();
}

  },
};
</script>

<template>
  <div class="event-grid">
    <div v-for="(events, month) in groupedEvents" :key="month" class="month-section">
      <h2 class="month-title">{{ month }}</h2>
      <div class="event-cards">
        <EventCard
          v-for="(event, index) in events"
          :key="index"
          :cardData="event"
          :isOutdated="isOutdated(event)"
        />
      </div>
    </div>
  </div>
</template>

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
