<template>
    <section class="vacancies">
         <h1 class="heading">Вакансии</h1>
    <div class="vacancies-grid">
      <template v-for="vacancy in vacancies">
        <div class="vacancy-card">
          <img
            :src="getImage(vacancy.image)"
            alt="Vacancy Image"
            class="vacancy-image"
          />
          <h3 class="vacancy-title">{{ vacancy.name }}</h3>
          <p
            v-html="vacancy.description"
            class="vacancy-description"
            :class="{ expanded: isVacancyExpanded(vacancy.id) }"
          ></p>
          <button
            v-if="isTextOverflow(vacancy.description)"
            class="vacancy-toggle"
            @click="toggleVacancy(vacancy.id)"
          >
            {{ isVacancyExpanded(vacancy.id) ? "Скрыть" : "Подробнее" }}
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
    data() {
      return {
        expandedVacancyId: null,
      };
    },
    methods: {
      isTextOverflow(text: string) {
        return text.length > 200; // Условие для определения длинного текста
      },
      toggleVacancy(vacancyId: number) {
        this.expandedVacancyId =
          this.expandedVacancyId === vacancyId ? null : vacancyId;
      },
      isVacancyExpanded(vacancyId: number) {
        return this.expandedVacancyId === vacancyId;
      },
    },
  };
  </script>
  
  <style scoped>
  .vacancies {
    padding-left: 5rem;
    padding-right: 5rem;
    margin-bottom: 5rem;
    margin-top: 5rem;
  }
  .heading {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
}
  .vacancies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 24px;
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
    transition: all 0.3s ease-in-out;
    width: 20rem;
  }
  
  .vacancy-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 1rem;
  }
  
  .vacancy-title {
    margin: 12px 0 8px;
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
  }
  
  .vacancy-description {
    font-size: 0.95em;
    color: #666;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: max-height 0.3s;
  }
  
  .vacancy-description.expanded {
    max-height: none;
    overflow: visible;
  }
  
  .vacancy-toggle {
    margin-top: 8px;
    padding: 6px 12px;
    font-size: 0.9em;
    color: #007bff;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }
  
  .vacancy-toggle:hover {
    color: #0056b3;
  }
  
  @media (min-width: 768px) {
    .vacancy-image {
      height: 200px;
    }
  }
  </style>
  