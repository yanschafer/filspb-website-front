<template>
  <section class="vacancies">
    <h1 class="heading">Вакансии</h1>
    <div class="vacancies-grid">
      <template v-for="vacancy in vacancies" :key="vacancy.id">
        <div class="vacancy-card">
          <img
            :src="getImage(vacancy.image)"
            alt="Vacancy Image"
            class="vacancy-image"
          />
          <h3 class="vacancy-title">{{ vacancy.name }}</h3>
          <!-- Используем vacancy.isExpanded для управления состоянием -->
          <div
            class="vacancy-description-container"
            :class="{ expanded: vacancy.isExpanded }"
          >
            <p class="vacancy-description" v-html="vacancy.description"></p>
          </div>
          <button
            v-if="isTextOverflow(vacancy.description)"
            class="vacancy-toggle"
            @click="toggleVacancy(vacancy)"
          >
            {{ vacancy.isExpanded ? "Скрыть" : "Подробнее" }}
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "VacancyListComponent",
  props: {
    vacancies: {
      type: Array,
      required: true,
    },
    getImage: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    // Добавляем свойство isExpanded к каждой карточке при монтировании
    this.vacancies.forEach((vacancy) => {
      vacancy.isExpanded = false;
    });
  },
  methods: {
    isTextOverflow(text: string) {
      return text.length > 200; // Условие для определения длинного текста
    },
    toggleVacancy(vacancy) {
      // Переключаем состояние конкретной карточки
      vacancy.isExpanded = !vacancy.isExpanded;
    },
  },
};
</script>

  
<style scoped>
.vacancies {
  padding: 5rem;
  margin: 5rem 0;
}

.heading {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.vacancies-grid {
  display: flex;
  gap: 5rem;
  margin-top: 24px;
}

.vacancy-card {
  padding: 1rem 1rem 2rem 1rem;
  background: #f3f3f3;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  height: fit-content;
  min-height: 30rem;
  transition: all 0.3s ease-in-out;
  width: 30rem;
  justify-content: space-between;
}

.vacancy-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 1rem;
}

.vacancy-title {
  margin: 12px 0 8px;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  color: #333;
}
.vacancy-description {
  font-size: 1.3rem;
}

.vacancy-description-container {
  overflow: hidden;
  max-height: 60px;
  transition: max-height 0.3s ease;
}

.vacancy-description-container.expanded {
  max-height: 100rem;
  transition: max-height 0.3s ease;
}

.vacancy-description {
  font-size: 1.3rem;
  color: #666;
}

.vacancy-toggle {
  margin-top: 8px;
  padding: 6px 12px;
  font-size: 0.9em;
  color: #fbc800;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.vacancy-toggle:hover {
  color: #9e7e00;
}

@media (min-width: 768px) {
  .vacancy-image {
    height: 200px;
  }
}
</style>

  