<template>
  <div class="event-grid">
    <div class="month-section">
      <div class="event-cards">
        <NewsCard
          v-for="(news, index) in news"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NewsCard from './NewsCard.vue';

export default {
  name: "NewsGrid",
  components: {
    NewsCard,
  },
  props: {
    news: {
      type: Array,
      required: true,
    },
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
