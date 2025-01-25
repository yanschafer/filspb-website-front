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
            <!-- Сначала выводим людей с фото -->
            <div
              v-for="person in withPhotos(category)"
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
            
            <!-- Затем выводим людей без фото -->
            <div
              v-for="person in withoutPhotos(category)"
              :key="person.id"
              class="person-card no-photo"
            >
              <h3 class="person-name">{{ person.name }}</h3>
              <p class="person-position">{{ person.position }}</p>
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

    const withPhotos = (category: PeopleCategoryDto) =>
      category.people.filter((el) => el.image !== null && el.image !== '');
    const withoutPhotos = (category: PeopleCategoryDto) =>
      category.people.filter((el) => el.image === null || el.image === '');

    return {
      activeIndex,
      withPhotos,
      withoutPhotos,
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

.person-card.no-photo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 120px;
}

.person-card.no-photo .person-name,
.person-card.no-photo .person-position {
  margin: 4px 0;
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
  border: none !important;
  background: transparent !important;
  padding: 1.5rem 0;
}

:deep(.p-accordion-header-text) {
  margin-right: auto;
}

:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
  background: transparent;
  border-color: transparent;
  color: #000;
}

:deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link) {
  border: none;
}

:deep(.p-accordion .p-accordion-header:not(.p-highlight):not(.p-disabled):hover .p-accordion-header-link) {
  background: transparent;
  border-color: transparent;
  color: #000;
}

:deep(.p-accordion .p-accordion-header:not(.p-disabled) .p-accordion-header-link:focus) {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none;
}

:deep(.p-accordion-header:hover) {
  opacity: 0.7;
}
</style>