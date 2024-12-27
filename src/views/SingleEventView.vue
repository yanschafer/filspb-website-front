<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import SingleEventHeroComponent from "@/components/SingleEventHeroComponent.vue";
import Divider from "primevue/divider";

export default {
  name: "SingleEvent",
  components: {
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    SingleEventHeroComponent,
    Divider,
  },
  data() {
    return {
      eventData: {
        time: "19:00",
        date: "28 декабря",
        duration: "1 час 10 мин",
        title: "Щелкунчик и мышиный король",
        chips: ["6+", "Пушкинская карта", "Новогоднее"],
        place: "КДЦ Московский",
        address: "Московский проспект, д. 152",
        imgSrc: "/src/assets/Events/placeholder.jpeg",
      },
      authors: [
        { job: "Композитор", name: "Александр Журбин" },
        { job: "Либреттист", name: "Жанна Жердер" },
        { job: "Режиссер", name: "Иван Иванов" },
        { job: "Художник", name: "Петр Петров" },
        { job: "Дирижер", name: "Сергей Сергеев" },
        { job: "Сценограф", name: "Елена Смирнова" },
        { job: "Хореограф", name: "Анна Иванова" },
      ],
      showAllAuthors: false, 
    };
  },
  computed: {
    displayedAuthors() {
      return this.showAllAuthors ? this.authors : this.authors.slice(0, 5);
    },
  },
  methods: {
    toggleAuthors() {
      this.showAllAuthors = !this.showAllAuthors;
    },
  },
};
</script>

<template>
    <HeaderComponent />
    <PageHeaderComponent
      class="animate__animated animate__fadeIn"
      title="Афиша"
      imgSrc="/src/assets/CircleImages/3.png"
    />
    <div class="content-section">
      <SingleEventHeroComponent :event="eventData" />
    </div>
    <Divider />
    <div class="content-section">
      <div class="text-wrapper">
        <!-- Список авторов -->
        <div class="authors-col-wrapper">
          <transition-group class="authors-col" name="fade" tag="div">
            <div
              v-for="(author, index) in displayedAuthors"
              :key="index"
              class="author"
            >
              <div class="job">{{ author.job }}</div>
              <div class="name">{{ author.name }}</div>
            </div>
          </transition-group>
          <!-- Кнопка "Показать все/Скрыть" -->
          <div v-if="authors.length > 5" class="show-more-btn" @click="toggleAuthors">
            {{ showAllAuthors ? "Скрыть" : "Показать все" }}
          </div>
        </div>
        <div class="text-col">
          <p class="text">
            Мюзикл в двух действиях с симфоническим оркестром. Либретто Жанны
            Жердер при участии Александра Журбина по одноименному произведению
            Эрнста Теодора Амадея Гофмана.<br /><br />
            Рождественская повесть-сказка, в которой реальность легко перетекает в
            фантазию обрела новое музыкальное воплощение, благодаря композитору
            Александру Журбину. Несмотря на глубокое философское содержание,
            спектакль понятен и интересен как маленьким зрителям, так и взрослым.
            <br /><br />
            Этот волшебный спектакль о любви, юности, победе добрых сил переносит
            зрителя в волшебную атмосферу рождества.
          </p>
        </div>
      </div>
    </div>
    <Divider />
    <div class="content-section">
      <div class="back-btn">
        << Назад к афише
      </div>
      <h3 class="heading">Как вам спектакль? <br />Оставьте отзыв</h3>
      <div class="form">
        <input placeholder="Ваше имя" type="text" class="text-input" />
        <textarea
          placeholder="Ваши впечатления"
          type="textarea"
          class="text-area"
        />
        <div class="send-button">отправить</div>
      </div>
    </div>
    <FooterComponent />
  </template>
  
<style scoped>
.content-section {
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.text-wrapper {
  display: flex;
  gap: 5rem;
}
.authors-col-wrapper {
    width: 60vw;
    gap: 2rem;
    display: flex;
    flex-direction: column;
}
.authors-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.job {
    font-size: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.name {
    font-size: 1.5rem;
    font-weight: 600;
}
.text {
    font-size: 1.5rem;
}
.text-input {
    border: 2px solid #000;
    height: 4.2rem;
    border-radius: 1rem;
    background: #fff;
    font-size: 1.5rem;
    padding: 0 2rem;
    width: 80%;
}
.text-area {
    border: 2px solid #000;
    height: 8.2rem;
    border-radius: 1rem;
    background: #fff;
    font-size: 1.5rem;
    padding: 0 2rem;
    padding-top: 1rem;
    width: 80%;
}
.heading {
    font-size: 3rem;
    line-height: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.send-button {
    color: #000;
    background-color: #f3ca00;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 40rem;
    width: max-content;
    font-size: 1.3rem;
    font-size: 1.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.5rem;
}
.back-btn {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
}
.back-btn:hover {
    cursor: pointer;
}
.show-more-btn {
  font-size: 1rem;
  font-weight: 600;
  color: #f3ca00;
  cursor: pointer;
  text-align: left;
  margin-top: 1rem;
}
.show-more-btn:hover {
  text-decoration: underline;
}
/* Анимация для плавного появления/исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
