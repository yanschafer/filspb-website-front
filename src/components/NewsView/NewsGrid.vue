<template>
  <div class="event-grid">
    <div class="month-section">
      <!-- Фейковый подгрузчик -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loader"></div>
      </div>
      <div class="event-cards" :class="{ 'loading': isLoading }">
        <!-- Отображаем элементы и Divider между ними -->
        <template v-for="(item, index) in paginatedNews" :key="index">
          <NewsCard :card-data="item" layout="horizontal" />
          <!-- Divider добавляется между карточками, кроме последней -->
          <Divider v-if="index < paginatedNews.length - 1" />
        </template>
      </div>
      <!-- Добавляем пагинатор -->
      <Paginator
        :rows="rowsPerPage"
        :totalRecords="news.length"
        :first="currentPage * rowsPerPage"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import NewsCard from './NewsCard.vue';
import { Paginator, Divider } from 'primevue';

export default {
  name: "NewsGrid",
  components: {
    NewsCard,
    Paginator,
    Divider,
  },
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 0, // Текущая страница (индекс, начиная с 0)
      rowsPerPage: 10, // Количество элементов на странице
      isLoading: false, // Состояние загрузки
    };
  },
  computed: {
    paginatedNews() {
      // Вычисляем элементы для отображения на текущей странице
      const start = this.currentPage * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.news.slice(start, end);
    },
  },
  methods: {
    async onPageChange(event: any) {
      // Показываем загрузчик
      this.isLoading = true;

      // Задержка для имитации загрузки данных
      setTimeout(() => {
        this.currentPage = event.page;
        this.isLoading = false;

        // Прокручиваем страницу вверх
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 1000); // 1 секунда задержки
    },
  },
};
</script>

<style scoped>
.event-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 5rem;
  padding-right: 5rem;
  position: relative;
}

.month-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: opacity 0.3s ease;
}

.event-cards.loading {
  opacity: 0.5;
}

/* Пагинатор */
.p-paginator {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

/* Фейковый подгрузчик */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loader {
  border: 5px solid #f3f3f3; /* Светлый фон */
  border-top: 5px solid #fbc800; /* Цвет */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
