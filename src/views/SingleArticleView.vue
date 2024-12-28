<template>
  <HeaderComponent />
  <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Новости"
    imgSrc="/src/assets/CircleImages/13.png"
  />
  <Divider />
  <div class="content-section">
    <div class="text-wrapper">
      <div class="back-btn"><< Назад к новостям</div>
      <div class="text-col">
        <h1 class="heading">
          ФДМ примет участие в V юбилейном Хоровом фестивале Ленинградской
          области
        </h1>
        <p class="text">
          В этом году фестиваль приобретет межрегиональный статус. Впервые в
          музыкальном празднике примут участие хор Белгородской филармонии и
          детский хор «Терские голоса» из города Нальчика. Кроме того, на
          фестивальной сцене состоится возрождение знаменитого молодёжного
          камерного хора «Петербургские Голоса», основанного Михаилом Голиковым
          в 1999 году.
          <br /><br />
          Вечернюю программу фестиваля откроет опера Сергея Рахманинова «Алеко».
          Балет и артисты вокальной труппы ФДМ представят яркую и волнующую
          историю о любви, измене, ревности и мести. Постановка затрагивает
          глубокие темы поиска счастья, границ свободы и неизбежности страстей.
          <br /><br />

          Роли исполняют: Приглашенный солист Мариинского театра Владимир
          Целебровский (Алеко). Солисты ФДМ: Александр Минченко (Старый цыган),
          Анастасия Васильева (Земфира), Григорий Яцентковский (Молодой цыган).
          <br /><br />
          Режиссер-постановщик – Мурат Калов, Балетмейстер-постановщик – Карина
          Петрусенкова, Сценография и костюмы – Карина Автандилова.
          <br /><br />
          В программе гала-концерта зрителей ждет разнообразие музыкальных
          жанров — от классики до рока и кинохитов. В сопровождении
          Симфонического оркестра большой сводный хор, солисты и приглашенные
          рок-группы исполнят произведения М. Глинки, К. Орфа, М. Таривердиева,
          И. Дунаевского, а также популярные хиты групп «Алиса», «Король и Шут»,
          «Любэ» и многих других.
          <br /><br />
          Режиссер – Александра Победоносцева.<br /><br />

          14.00 – Начало дневной программы на малой сцене. Выступление хоров.
          17.00 – Опера «Алеко» 19.00 – Гала-концерт
        </p>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import SingleEventHeroComponent from "@/components/SingleEventHeroComponent.vue";
import Divider from "primevue/divider";

export default {
  name: "SingleArticle",
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

<style scoped>
.content-section {
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.text-wrapper {
  display: flex;
  gap: 1rem;
  flex-direction: column;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  margin-bottom: 2rem;
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
