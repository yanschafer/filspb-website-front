<template>
  <div class="section">
    <h1 class="heading">Люди филармонии</h1>
    <Accordion v-model="activeIndex">
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
  data: () => ({
    activeIndex: 0,
  }),
  methods: {
    elite(category: PeopleCategoryDto) {
      return category.people.filter((el) => el.image != null);
    },
    popuski(category: PeopleCategoryDto) {
      return category.people.filter((el) => el.image == null);
    },
  },
};
</script>

<style scoped>
.section {
  padding-left: 5rem;
  padding-right: 5rem;
}
.p-accordionheader {
  background-color: transparent;
}
:deep(.p-accordionheader:hover) {
  background-color: transparent !important;
}
:deep(
    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active
      > .p-accordionheader
  ) {
  background-color: transparent !important;
}
:deep(.p-accordioncontent-content) {
  background-color: transparent !important;
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
  text-align: center; /* Центровка текста для карточек */
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
.p-accordionheader {
  font-size: 2rem;
}

/* Список для людей без фото */
.people-list {
  margin-top: 24px;
}

.person-list-item {
  text-align: left; /* Выравнивание текста по левому краю */
}

.person-list-item .person-name {
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 4px; /* Разделение имени и должности */
}

.person-list-item .person-position {
  font-size: 0.9em;
  color: #666;
}

/* Разделитель */
.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px 0;
}

/* Адаптивность */
@media (min-width: 768px) {
  .people-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 32px;
  }

  .person-image {
    width: 160px;
    height: 160px;
  }
}
</style>
