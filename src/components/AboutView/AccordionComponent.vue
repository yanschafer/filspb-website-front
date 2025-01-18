<template>
  <div class="section">
    <h1 class="heading">Люди филармонии</h1>
    <!-- Указываем activeIndex через v-model -->
    <Accordion :value="0" v-model:activeIndex="activeIndex">
      <AccordionPanel
        v-for="(category, index) in categories"
        :key="category.id"
        :value="index"
      >
        <AccordionHeader>{{ category.categoryName }}</AccordionHeader>
        <AccordionContent>
          <div class="people-grid">
            <div
              v-for="person in elite(category)"
              :key="person.id"
              class="person-card"
            >
              <img
                :src="getImage(person.image)"
                alt="Person Photo"
                class="person-image"
              />
              <h3 class="person-name">{{ person.name }}</h3>
              <p class="person-position">{{ person.position }}</p>
            </div>
          </div>

          <!-- Список для людей без фото -->
          <div v-if="popuski(category).length" class="people-list">
            <div
              v-for="(person, index) in popuski(category)"
              :key="person.id"
              class="person-list-item"
            >
              <div>
                <h3 class="person-name">{{ person.name }}</h3>
                <p class="person-position">{{ person.position }}</p>
              </div>
              <!-- Разделитель -->
              <div
                v-if="index < popuski(category).length - 1"
                class="divider"
              ></div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script lang="ts">
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { ref, onMounted, watch } from "vue";
import type { PropType } from "vue";
import type PeopleCategoryDto from "@/api/modules/people/people-category.dto";

export default {
  name: "AccordionComponent",
  components: {
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
  },
  props: {
    categories: {
      type: Array as PropType<PeopleCategoryDto[]>,
      required: true,
    },
    getImage: {
      type: Function as PropType<(url: string) => string>,
      required: true,
    },
  },
  setup(props) {
    const activeIndex = ref(null); // Инициализация

    onMounted(() => {
      // Принудительное раскрытие первого элемента
      setTimeout(() => {
        if (props.categories.length > 0) {
          activeIndex.value = 0; // Устанавливаем первый элемент активным
        }
      }, 0);
    });

    // Обновляем activeIndex при изменении categories
    watch(
      () => props.categories,
      (newCategories) => {
        if (newCategories.length > 0 && activeIndex.value === null) {
          activeIndex.value = 0; // Устанавливаем первый элемент активным
        }
      }
    );

    const elite = (category: PeopleCategoryDto) =>
      category.people.filter((el) => el.image != null);
    const popuski = (category: PeopleCategoryDto) =>
      category.people.filter((el) => el.image == null);

    return {
      activeIndex,
      elite,
      popuski,
    };
  },
};
</script>

<style scoped>
.section {
  padding: 0 5rem;
}

.heading {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

/* Карточка человека с фото */
.person-card {
  text-align: center;
}

.person-image {
  width: 120px;
  height: 120px;
  border-radius: 32px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.person-name {
  margin-top: 12px;
  font-size: 1.1em;
  font-weight: 600;
}

.person-position {
  font-size: 0.9em;
  color: #666;
}

/* Стили для аккордеона */
:deep(.p-accordion) {
  font-family: inherit;
}

:deep(.p-accordionheader) {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  color: #000;
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

:deep(.p-accordioncontent-content) {
  border: none !important;
  background-color: transparent !important;
  color: inherit;
  padding: 1.5rem 0;
}

:deep(.p-accordion .p-accordion-header) {
  background: transparent !important;
}

:deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
  font-size: 2rem;
  padding: 1.5rem 0;
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  color: #000;
  font-weight: 500;
}

:deep(.p-accordion .p-accordion-content) {
  background: transparent !important;
  border: none;
  padding: 1.5rem 0;
}

:deep(.p-accordion .p-accordion-tab) {
  background: transparent !important;
}

:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
  background: transparent !important;
  border-color: #e0e0e0;
}

:deep(.p-accordion .p-accordion-header:not(.p-disabled) .p-accordion-header-link:hover) {
  background: transparent !important;
  border-color: #e0e0e0;
}

:deep(.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader) {
  background: transparent !important;
}

:deep(.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordion-header-link) {
  background: transparent !important;
}

/* Список для людей без фото */
.people-list {
  margin-top: 24px;
}

.person-list-item {
  text-align: left;
  padding: 1rem 0;
}

.person-list-item .person-name {
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 4px;
}

.person-list-item .person-position {
  font-size: 0.9em;
  color: #666;
}

/* Разделитель */
.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 1rem 0;
}

/* Медиа-запросы для адаптивности */
@media screen and (max-width: 1024px) {
  .section {
    padding: 0 3rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  :deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    font-size: 1.8rem;
    padding: 1.25rem 0;
  }

  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 20px;
  }

  .person-image {
    width: 100px;
    height: 100px;
    border-radius: 24px;
  }
}

@media screen and (max-width: 768px) {
  .section {
    padding: 0 2rem;
  }

  .heading {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  :deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    font-size: 1.5rem;
    padding: 1rem 0;
  }

  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 16px;
  }

  .person-image {
    width: 90px;
    height: 90px;
    border-radius: 20px;
  }

  .person-name {
    font-size: 1em;
  }

  .person-position {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 480px) {
  .section {
    padding: 0 1rem;
  }

  .heading {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  :deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    font-size: 1.3rem;
    padding: 0.8rem 0;
  }

  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }

  .person-image {
    width: 80px;
    height: 80px;
    border-radius: 16px;
  }

  .person-name {
    font-size: 0.9em;
    margin-top: 8px;
  }

  .person-position {
    font-size: 0.75em;
  }

  .person-list-item {
    padding: 0.8rem 0;
  }

  .person-list-item .person-name {
    font-size: 0.9em;
  }

  .person-list-item .person-position {
    font-size: 0.8em;
  }

  .divider {
    margin: 0.8rem 0;
  }
}
:deep(.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader) {
  background: transparent !important;
}

:deep(.p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordion-header-link) {
  background: transparent !important;
}

/* Список для людей без фото */
.people-list {
  margin-top: 24px;
}

.person-list-item {
  text-align: left;
  padding: 1rem 0;
}

.person-list-item .person-name {
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 4px;
}

.person-list-item .person-position {
  font-size: 0.9em;
  color: #666;
}

/* Разделитель */
.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 1rem 0;
}

/* Медиа-запросы для адаптивности */
@media screen and (max-width: 1024px) {
  .section {
    padding: 0 3rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  :deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    font-size: 1.8rem;
    padding: 1.25rem 0;
  }

  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 20px;
  }

  .person-image {
    width: 100px;
    height: 100px;
    border-radius: 24px;
  }
}

@media screen and (max-width: 768px) {
  .section {
    padding: 0 2rem;
  }

  .heading {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  :deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    font-size: 1.5rem;
    padding: 1rem 0;
  }

  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 16px;
  }

  .person-image {
    width: 90px;
    height: 90px;
    border-radius: 20px;
  }

  .person-name {
    font-size: 1em;
  }

  .person-position {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 480px) {
  .section {
    padding: 0 1rem;
  }

  .heading {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  :deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    font-size: 1.3rem;
    padding: 0.8rem 0;
  }

  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }

  .person-image {
    width: 80px;
    height: 80px;
    border-radius: 16px;
  }

  .person-name {
    font-size: 0.9em;
    margin-top: 8px;
  }

  .person-position {
    font-size: 0.75em;
  }

  .person-list-item {
    padding: 0.8rem 0;
  }

  .person-list-item .person-name {
    font-size: 0.9em;
  }

  .person-list-item .person-position {
    font-size: 0.8em;
  }

  .divider {
    margin: 0.8rem 0;
  }
}
</style>
