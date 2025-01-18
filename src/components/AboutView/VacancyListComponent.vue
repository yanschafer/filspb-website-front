<template>
  <section class="vacancies">
    <h1 class="heading">Вакансии</h1>
    <div class="vacancies-grid">
      <template v-for="vacancy in vacancies" :key="vacancy.id">
        <div class="vacancy-card" :class="{ expanded: vacancy.isExpanded }">
          <img
            :src="getImage(vacancy.image)"
            alt="Vacancy Image"
            class="vacancy-image"
          />
          <h3 class="vacancy-title">{{ vacancy.name }}</h3>
          <div 
            class="vacancy-description-container"
            :class="{ expanded: vacancy.isExpanded }"
          >
            <p class="vacancy-description" v-html="vacancy.description"></p>
          </div>
          <button
            v-if="isTextOverflow(vacancy.description)"
            class="vacancy-toggle"
            @click="toggleVacancy(vacancy, $event)"
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
    // Добавляем свойства для анимации к каждой карточке
    this.vacancies.forEach((vacancy) => {
      vacancy.isExpanded = false;
      vacancy.maxHeight = null;
    });
  },
  methods: {
    isTextOverflow(text: string) {
      return text.length > 200;
    },
    toggleVacancy(vacancy, event) {
      const card = event.currentTarget.closest('.vacancy-card');
      const description = card.querySelector('.vacancy-description');
      
      if (!vacancy.isExpanded) {
        // Сохраняем текущую высоту для анимации
        description.style.maxHeight = description.scrollHeight + 'px';
        vacancy.maxHeight = description.scrollHeight;
      } else {
        // Возвращаем к изначальной высоте
        description.style.maxHeight = null;
        vacancy.maxHeight = null;
      }
      
      // Переключаем состояние после небольшой задержки
      setTimeout(() => {
        vacancy.isExpanded = !vacancy.isExpanded;
      }, 50);
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
  gap: 2rem;
  margin-top: 24px;
}

.vacancy-card {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  padding: 1.5rem;
  background: #f3f3f3;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  position: relative;
  height: 500px;
}

.vacancy-card.expanded {
  height: auto;
}

.vacancy-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1.5rem;
  margin-bottom: 1rem;
}

.vacancy-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  padding: 0 1rem;
}

.vacancy-description-container {
  padding: 0 1rem;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
}

.vacancy-description {
  margin: 0;
  line-height: 1.5;
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;
}

.vacancy-description-container:not(.expanded) .vacancy-description {
  max-height: 150px;
}

.vacancy-description-container.expanded .vacancy-description {
  max-height: none;
}

.vacancy-description-container:not(.expanded)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3em;
  background: linear-gradient(transparent, #f3f3f3);
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.vacancy-description-container.expanded::after {
  opacity: 0;
}

.vacancy-toggle {
  background: none;
  border: none;
  color: #fbc800;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-top: auto;
  font-weight: 600;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
}

.vacancy-toggle:hover {
  color: #e0b000;
}

/* Адаптивность */
@media screen and (max-width: 1366px) {
  .vacancies {
    padding: 4rem;
  }

  .vacancies-grid {
    gap: 1.5rem;
  }

  .vacancy-card {
    min-width: 280px;
    max-width: 350px;
    height: 450px;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 130px;
  }
}

@media screen and (max-width: 1024px) {
  .vacancies {
    padding: 3rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  .vacancies-grid {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .vacancy-card {
    min-width: 260px;
    max-width: 300px;
    height: 400px;
  }

  .vacancy-image {
    height: 180px;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 110px;
  }
}

@media screen and (max-width: 768px) {
  .vacancies {
    padding: 2rem;
    margin: 3rem 0;
  }

  .heading {
    font-size: 2rem;
  }

  .vacancies-grid {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .vacancy-card {
    width: 100%;
    max-width: 100%;
    height: 380px;
  }

  .vacancy-image {
    height: 160px;
  }

  .vacancy-title {
    font-size: 1.3rem;
    margin: 0.8rem 0;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 100px;
  }
}

@media screen and (max-width: 480px) {
  .vacancies {
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .heading {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .vacancy-card {
    height: 350px;
    padding: 1rem;
  }

  .vacancy-image {
    height: 140px;
  }

  .vacancy-title {
    font-size: 1.2rem;
    margin: 0.6rem 0;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 90px;
  }
}
/* Адаптивность */
@media screen and (max-width: 1366px) {
  .vacancies {
    padding: 4rem;
  }

  .vacancies-grid {
    gap: 1.5rem;
  }

  .vacancy-card {
    min-width: 280px;
    max-width: 350px;
    height: 450px;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 130px;
  }
}

@media screen and (max-width: 1024px) {
  .vacancies {
    padding: 3rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  .vacancies-grid {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .vacancy-card {
    min-width: 260px;
    max-width: 300px;
    height: 400px;
  }

  .vacancy-image {
    height: 180px;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 110px;
  }
}

@media screen and (max-width: 768px) {
  .vacancies {
    padding: 2rem;
    margin: 3rem 0;
  }

  .heading {
    font-size: 2rem;
  }

  .vacancies-grid {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .vacancy-card {
    width: 100%;
    max-width: 100%;
    height: 380px;
  }

  .vacancy-image {
    height: 160px;
  }

  .vacancy-title {
    font-size: 1.3rem;
    margin: 0.8rem 0;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 100px;
  }
}

@media screen and (max-width: 480px) {
  .vacancies {
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .heading {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .vacancy-card {
    height: 350px;
    padding: 1rem;
  }

  .vacancy-image {
    height: 140px;
  }

  .vacancy-title {
    font-size: 1.2rem;
    margin: 0.6rem 0;
  }

  .vacancy-description-container:not(.expanded) .vacancy-description {
    max-height: 90px;
  }
}
</style>

