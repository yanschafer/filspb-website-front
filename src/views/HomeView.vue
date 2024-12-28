<template>
  <HeaderComponent class="animate__animated animate__fadeIn" />
  <HeroComponent class="animate__animated animate__fadeIn" />
  <section class="events-section">
    <div class="all-events-row">
      <div class="spacer"></div>
      <div class="btn-wrapper" @click="goToEvents">
        <h5 class="all-events-heading">вся афиша</h5>
        <div class="all-events-btn">
          <img class="arrow" src="../assets/Icons/arrow-right-solid.svg" />
        </div>
      </div>
    </div>
    <div class="cards-grid">
      <EventCard
        v-for="(event, index) in events"
        :key="index"
        :card-data="event"
      />
    </div>
  </section>
  <DatePickerComponent />
  <section class="news-section">
    <div class="news-header-row">
      <div class="heading-col">
        <h1 class="news-heading">Наши новости</h1>
        <div class="btn-news-wrapper">
          <h5 class="all-news-link">все новости</h5>
          <img class="arrow-news" src="../assets/Icons/arrow-right-solid.svg" />
        </div>
      </div>
      <div class="search-box">
        <div class="search-icon-wrapper">
          <img
            class="search-icon"
            src="../assets/Icons/magnifying-glass-solid.svg"
          />
        </div>
        <input class="search-input" type="text" />
      </div>
    </div>
    <div class="news-cards-grid">
      <NewsCard
        v-for="(event, index) in events"
        :key="index"
        :card-data="event"
      />
    </div>
  </section>
  <FooterComponent />
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import EventCard from "@/components/EventsView/EventCard.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import HeroComponent from "@/components/HomeView/HeroComponent.vue";
import NewsCard from "@/components/NewsView/NewsCard.vue";
import useEventsStore from "@/stores/events";
export default {
  name: "EventsSection",
  components: {
    EventCard,
    HeroComponent,
    HeaderComponent,
    NewsCard,
    FooterComponent,
  },
  data() {
    return {
      events: [
        // {
        //   title: "Капитанская дочка",
        //   location: "ДК Выборгский, ул. Комиссара Смирного, д. 15",
        //   authors: [
        //     {
        //       position: "Автор инсценировки и режиссер-постановщик",
        //       name: "Евгений Зимин",
        //     },
        //     { position: "Художник-постановщик", name: "Вера Курицина" },
        //   ],
        //   tags: ["Пушкинская карта", "Школьная карта", "12+"],
        //   price: "800 ₽",
        //   date: "19 декабря",
        //   time: "12:00",
        //   duration: "2 часа 20 мин",
        //   imageUrl: "/src/assets/Events/placeholder.jpeg",
        //   description:
        //     "Спектакль по мотивам знаменитого произведения А.С. Пушкина из школьной программы, в котором повествуется о воспоминаниях уже взрослого Гринева о двух светлых годах юности.",
        // },
        // {
        //   title: "Н. Римский-Корсаков. К 180-летию со дня рождения.",
        //   location: "Дворец Искусств Ленинградской области, пл. Стачек д. 4",
        //   tags: ["6+", "Пушкинская карта"],
        //   price: "800 ₽",
        //   date: "19 декабря",
        //   time: "19:27",
        //   duration: "1 час 30 мин",
        //   imageUrl: "/src/assets/Events/placeholder2.jpeg",
        //   description: "К юбилею Н.А. Римского-Корсакова",
        // },
        // {
        //   title: "Сокровища Флинта",
        //   location: "КДЦ Московский, Московский проспект д. 152",
        //   tags: ["6+", "Пушкинская карта"],
        //   price: "800 ₽",
        //   date: "25 декабря",
        //   time: "19:00",
        //   duration: "1 час 40 мин",
        //   imageUrl: "/src/assets/Events/placeholder3.jpeg",
        //   description:
        //     'Филармония для детей и молодежи приглашает на премьеру мюзикла по мотивам романа Роберта Стивенсона "Остров сокровищ"',
        // },
        // {
        //   title: "Рождественский концерт",
        //   location: "Дворец Искусств Ленинградской области, пл. Стачек д. 4",
        //   tags: ["6+", "Пушкинская карта"],
        //   price: "800 ₽",
        //   date: "27 декабря",
        //   time: "19:27",
        //   imageUrl: "/src/assets/Events/placeholder4.jpeg",
        //   description:
        //     "Рождественские песнопения, популярные арии и ансамбли русских и зарубежных композиторов.",
        // },
      ],
    };
  },
  setup() {
    const eventStore =  useEventsStore()
    eventStore.loadLastFour()
    return {
      eventStore
    }
  },
  computed: {
    events() {
      return this.eventStore.getEvents
    }
  },
  methods: {
    goToEvents() {
      this.$router.push("/events");
    },
  }
};
</script>

<style>
.all-news-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transform: translateY(-2px);
  text-decoration: none;
  font-weight: 600;
  color: black;
  transition: color 0.3s ease;
  cursor: pointer;
  font-size: 1.5rem;;
}

.all-news-link::after {
  content: "";
  position: absolute;
  bottom: -2px; 
  left: 0;
  width: 0;
  height: 2px; 
  background-color: black;
  transition: width 0.3s ease-in-out;
}

.all-news-link:hover::after {
  width: 100%;
}

.all-news-link:hover {
  color: black;
}

.arrow {
  transition: transform 0.3s ease;
}

.all-news-link:hover .arrow {
  transform: translateX(8px); 
}
.news-section {
  background-color: #fbc800;
  padding-right: 10rem;
  padding-left: 10rem;
  padding-top: 2rem;
}
.events-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4rem;
}
.news-header-row {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.search-box {
  border-bottom: 2px solid black;
  width: max-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
}
.btn-news-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.search-input {
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  font-size: 1.5rem;
}
.all-events-row {
  display: flex;
  padding-right: 3rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  flex-direction: row;
}
.placeholder {
  height: 800vh;
}
.arrow-news {
  width: 1rem;
}
.news-heading {
  font-size: 4rem;
}
.btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.btn-wrapper:hover .all-events-btn {
  background-color: black;
}

.btn-wrapper:hover .arrow {
  cursor: pointer;
  filter: brightness(0) saturate(100%) invert(57%) sepia(77%) saturate(2877%)
    hue-rotate(6deg) brightness(97%) contrast(93%);
}
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 2rem;
}
.news-cards-grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
  justify-content: space-between;
}
.arrow {
  width: 100%;
}
.search-icon-wrapper {
  width: 100%;
  min-width: 1rem;
}
.all-events-row {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
}
.all-events-heading {
  font-size: 18px;
  font-weight: 600;
  transform: translateY(-2px); 
  display: inline-block; /* Для работы с transform */
}
.all-events-btn {
  border: 2px solid black;
  height: 50px;
  border-radius: 40rem;
  padding: 0.8rem;
  width: 50px;
  display: flex;
  transition: all 0.3s ease-in-out;
}
.all-events-btn:hover {
  background-color: black;
}
</style>
