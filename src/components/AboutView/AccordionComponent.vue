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
          <div class="accordion-content">
            <div class="people-grid">
              <div
                v-for="person in sortPeopleByPosition(category.people)"
                :key="person.name"
                :class="['person-card', { 'no-photo': !person.image }]"
              >
                <img
                  v-if="person.image"
                  :src="getImage(person.image)"
                  alt="Person Photo"
                  class="person-image"
                />
                <h3 class="person-name">{{ person.name }}</h3>
                <p class="person-position">{{ person.position }}</p>
              </div>
            </div>
          </div>
          <Button 
            v-if="category.categoryName === 'Симфонический оркестр'"
            class="view-orchestra-btn p-button-outlined"
            @click="showOrchestraComposition"
          >
            Просмотреть состав
          </Button>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
    <OrchestraCompositionModal ref="orchestraModal" />
  </div>
</template>

<script lang="ts">
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Button from "primevue/button";
import OrchestraCompositionModal from "./OrchestraCompositionModal.vue";
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
    Button,
    OrchestraCompositionModal
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
    const activeIndex = ref(null); 
    const orchestraModal = ref(null);

    const positionOrder = {
      'Отдел продаж и работе со зрителями': [
        'Руководитель отдела',
        'Главный специалист',
        'Главный специалист по реализации билетов',
        'Главный администратор',
        'Администратор',
        'Кассир билетный',
        'Ведущий концерта'
      ],
      'Симфонический оркестр': [
        'Заместитель директора по музыкальной части',
        'Дирижер симфонического оркестра',
        'Библиотекарь (нотный)'
      ]
    };

    const sortPeopleByPosition = (people) => {
      // Получаем текущую активную категорию
      const currentCategory = props.categories[activeIndex.value];
      const categoryName = currentCategory?.categoryName || '';
      
      // Получаем порядок позиций для данной категории
      const categoryOrder = positionOrder[categoryName];
      
      // Если это категория с заданным порядком должностей
      if (categoryOrder) {
        return [...people].sort((a, b) => {
          const posA = categoryOrder.indexOf(a.position);
          const posB = categoryOrder.indexOf(b.position);
          
          // Если обе позиции найдены в заданном порядке
          if (posA !== -1 && posB !== -1) {
            return posA - posB;
          }
          // Если только одна позиция найдена, она должна быть первой
          if (posA !== -1) return -1;
          if (posB !== -1) return 1;
          
          // Для позиций не из списка, сортируем по алфавиту
          return a.position.localeCompare(b.position);
        });
      }
      
      // Для остальных категорий сортируем только по наличию фото
      const withPhotos = people.filter(person => person.image);
      const withoutPhotos = people.filter(person => !person.image);
      
      return [...withPhotos, ...withoutPhotos];
    };

    const showOrchestraComposition = () => {
      orchestraModal.value?.show();
    };

    onMounted(() => {
      // Принудительное раскрытие первого элемента
      setTimeout(() => {
        if (props.categories.length > 0) {
          activeIndex.value = 0; 
        }
      }, 0);
    });

    // Обновляем activeIndex при изменении categories
    watch(
      () => props.categories,
      (newCategories) => {
        if (newCategories.length > 0 && activeIndex.value === null) {
          activeIndex.value = 0; 
        }
      }
    );

    return {
      activeIndex,
      sortPeopleByPosition,
      orchestraModal,
      showOrchestraComposition
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

.accordion-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 24px;
  width: 100%;
}

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

.view-orchestra-btn {
  margin-top: 1rem;
  align-self: center;
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