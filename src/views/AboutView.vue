<template>
  <HeaderComponent />
  <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="О нас"
    imgSrc="/src/assets/CircleImages/head_about.png"
  />
  <section class="text-section">
    <h1 class="heading">
      Государственная филармония для детей и молодежи ведет свою историю с 1989
      года
    </h1>
    <p class="text">
      По разным источникам инициатива создания первой в СССР филармонии для
      детей принадлежит Татьяне Дунаевской, советскому и российскому
      театральному режиссёру, Заслуженному деятелю искусств Российской
      Федерации.
    </p>
  </section>
  <section class="cards-section"></section>
  <div class="cards-wrapper">
    <div class="card">
      <img class="card-img" src="/src/assets/About/about_1.jpg" />
      <h2 class="card-heading">1965</h2>
      <p class="card-text">
        Изначально это был отдел Ленконцерта – отдел художественного воспитания
        детей и юношества, созданный в 1965 на базе концертного бюро
        Ленинградской филармонии и Ленинградского отделения Всероссийского
        гастрольно-концертного объединения
      </p>
    </div>
    <div class="card">
      <img class="card-img" src="/src/assets/About/about_2.jpg" />
      <h2 class="card-heading">1988</h2>
      <p class="card-text">
        В соответствии с приказом Ленсовета №241 от 31 октября 1988г.
        Ленинградское государственное концертное объединение «Ленконцерт» было
        реорганизовано, а Детская филармония была передана в ведение Комитета по
        культуре мэрии Санкт-Петербурга
      </p>
    </div>
    <div class="card">
      <img class="card-img" src="/src/assets/About/about_3.jpg" />
      <h2 class="card-heading">1989</h2>
      <p class="card-text">
        Свой сегодняшний статус Филармония приобрела 1989г. в соответствии с
        приказом №303 Комитета по культуре и туризму мэрии Санкт-Петербурга
      </p>
    </div>
    <div class="card">
      <img class="card-img" src="/src/assets/About/about_4.jpg" />
      <h2 class="card-heading">2020</h2>
      <p class="card-text">
        Названий у нашей организации было не мало: «Детская филармония
        Санкт-Петербурга», «Государственная детская филармония
        Санкт-Петербурга», «Государственная филармония Санкт-Петербурга для
        детей и юношества» и с конца 2020г. мы получили свое нынешнее имя
        «Государственная филармония для детей и молодежи», которое очень нам
        подходит
      </p>
    </div>
  </div>
  <section class="text-section kaef">
    <h1 class="heading">
      «Государственная филармония для детей и молодежи» является единственной в
      Санкт-Петербурге и одной из немногих в России, специализирующейся на
      репертуаре для детей и молодежи.
    </h1>
    <p class="text"><br><br>
      На протяжении более 55 лет артисты непрерывно погружают зрителей всех
      возрастов в искусство, посредством музыки, кукольных представлений,
      драматических спектаклей и литературных чтений.<br><br> Ежегодно в двух залах
      Филармонии, а также на площадках Петербурга для зрителей несколько
      творческих коллективов дают более 1000 авторских неповторимых
      представлений.<br><br> Приоритетным направлением Филармонии является создание и
      поддержка молодежных инициатив, реализация государственных программ в
      сфере культуры.<br><br><b>Воспитывать зрителя нужно с детства – чтобы вырастить молодежь, которая потом приведет в филармонические залы своих детей. Это системный процесс, требующий постоянного внимания</b>
    </p>
  </section>
  <section class="section">
    <div class="accordeon">
      <AccordionComponent :categories="categories" :getImage="getImage" />
    </div>

    <PartnersComponent />

    <VacancyListComponent :vacancies="vacancies" :getImage="getImage" />
  </section>
  <FooterComponent />
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import PartnersComponent from "@/components/AboutView/PartnersComponent.vue";
import AccordionComponent from "@/components/AboutView/AccordionComponent.vue";
import appConf from "@/api/conf/app.conf";
import PartnersModel from "@/api/modules/partners/partners.model";
import type PeopleCategoryDto from "@/api/modules/people/people-category.dto";
import PeopleModel from "@/api/modules/people/people.model";
import VacancyModel from "@/api/modules/vacancy/vacancy.model";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import VacancyListComponent from "@/components/AboutView/VacancyListComponent.vue";

export default {
  name: "AboutView",
  components: {
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    AccordionComponent,
    Swiper,
    SwiperSlide,
    PartnersComponent,
    VacancyListComponent,
  },
  data: () => ({
    people: [],
    categories: [],
    partners: [],
    vacancies: [],
    expandedVacancyId: null,
    modules: [Navigation],
  }),
  async created() {
    const peopleModel = new PeopleModel();
    this.categories = (await peopleModel.getAll()).getData();

    const vacancyModel = new VacancyModel();
    this.vacancies = (await vacancyModel.getAll()).getData().map((vacancy) => ({
      ...vacancy,
      expanded: false,
    }));

    const partnersModel = new PartnersModel();
    this.partners = (await partnersModel.getAll()).getData();
  },
  methods: {
    isTextOverflow(text) {
      return text.length > 200; // Условие для определения длинного текста
    },
    toggleVacancy(vacancyId) {
      this.expandedVacancyId =
        this.expandedVacancyId === vacancyId ? null : vacancyId;
    },
    isVacancyExpanded(vacancyId) {
      return this.expandedVacancyId === vacancyId;
    },
    getImage(url: string) {
      if (!url) return;
      if (url[0] === "/") {
        return `${appConf.proto}://${appConf.endpoint}/files${url}`;
      }
      return url;
    },
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
.card {
  background: #fbc800;
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
  padding-top: 1rem;
  border-radius: 2rem;
}
.card-img {
  border-radius: 1rem;
  margin-bottom: 1rem;
}
.card-heading {
  font-size: 2rem;
  font-weight: 600;
}
.card-text {
  font-size: 1.2rem;
}
.cards-wrapper {
    position: relative;
    bottom: 66px;
    display: flex;
    gap: 2rem;
    align-items: center;
    width: 100%;
    justify-content: center;
    /* height: max-content; */
    height: 33rem;
}
.accordeon {
  background-color: #f3f3f3;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.section {
}
/* Сетка для людей с фото */
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 24px;
  margin-top: 16px;
}
.heading {
  font-size: 3rem;
  line-height: 3rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
.text {
  font-size: 1.3rem;
}
.text-section {
  padding-left: 5rem;
  padding-right: 5rem;
  margin-bottom: 3rem;
}
/* Карточка человека с фото */
.person-card {
  text-align: center; /* Центровка текста для карточек */
}
.cards-section {
  background-image: url("../src/assets/about_bg.jpg");
  background-size: cover;
  height: 100vh;
  position: relative;
}
.person-image {
  width: 120px;
  height: 120px;
  border-radius: 32px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
.vacancies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 24px;
  margin-top: 24px;
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

/* Изображение вакансии */
.vacancy-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 1rem;
}

/* Заголовок вакансии */
.vacancy-title {
  margin: 12px 0 8px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

/* Описание вакансии */
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

/* Кнопка Подробнее */
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

/* Адаптивность */
@media (min-width: 768px) {
  .vacancy-card {
  }

  .vacancy-image {
    height: 200px;
  }
}
.partner-img-wrapper {
  display: flex;
  width: 100px;
  height: 100px;
}
.partner-logo {
  width: 100%;
  max-width: 100px;
  height: 100%;
  max-height: 100px;
  object-fit: contain;
  user-select: none;
}
</style>
