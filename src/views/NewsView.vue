<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import NewsGrid from "@/components/NewsView/NewsGrid.vue";
export default {
  name: "NewsView",
  components: { HeaderComponent, FooterComponent, PageHeaderComponent, NewsGrid },
  data() {
    return {
      news: [
        {
          title: "Капитанская дочка",
          location: "ДК Выборгский, ул. Комиссара Смирного, д. 15",
          authors: [
            { position: "Автор инсценировки и режиссер-постановщик", name: "Евгений Зимин" },
            { position: "Художник-постановщик", name: "Вера Курицина" },
          ],
          tags: ["Пушкинская карта", "Школьная карта", "12+"],
          price: "800 ₽",
          date: "19 декабря",
          time: "12:00",
          duration: "2 часа 20 мин",
          imageUrl: "/src/assets/Events/placeholder.jpeg",
          description:
            "Спектакль по мотивам знаменитого произведения А.С. Пушкина из школьной программы, в котором повествуется о воспоминаниях уже взрослого Гринева о двух светлых годах юности.",
        },
        {
          title: "Н. Римский-Корсаков. К 180-летию со дня рождения.",
          location: "Дворец Искусств Ленинградской области, пл. Стачек д. 4",
          tags: ["6+", "Пушкинская карта"],
          price: "800 ₽",
          date: "19 декабря",
          time: "19:27",
          duration: "1 час 30 мин",
          imageUrl: "/src/assets/Events/placeholder2.jpeg",
          description: "К юбилею Н.А. Римского-Корсакова",
        },
        {
          title: "Сокровища Флинта",
          location: "КДЦ Московский, Московский проспект д. 152",
          tags: ["6+", "Пушкинская карта"],
          price: "800 ₽",
          date: "25 декабря",
          time: "19:00",
          duration: "1 час 40 мин",
          imageUrl: "/src/assets/Events/placeholder3.jpeg",
          description:
            'Филармония для детей и молодежи приглашает на премьеру мюзикла по мотивам романа Роберта Стивенсона "Остров сокровищ"',
        },
        {
          title: "Рождественский концерт",
          location: "Дворец Искусств Ленинградской области, пл. Стачек д. 4",
          tags: ["6+", "Пушкинская карта"],
          price: "800 ₽",
          date: "27 декабря",
          time: "19:27",
          imageUrl: "/src/assets/Events/placeholder4.jpeg",
          description:
            "Рождественские песнопения, популярные арии и ансамбли русских и зарубежных композиторов.",
        },
        {
          title: "Капитанская дочка",
          location: "ДК Выборгский, ул. Комиссара Смирного, д. 15",
          authors: [
            { position: "Автор инсценировки и режиссер-постановщик", name: "Евгений Зимин" },
            { position: "Художник-постановщик", name: "Вера Курицина" },
          ],
          tags: ["Пушкинская карта", "Школьная карта", "12+"],
          price: "800 ₽",
          date: "19 января",
          time: "12:00",
          duration: "2 часа 20 мин",
          imageUrl: "/src/assets/Events/placeholder.jpeg",
          description:
            "Спектакль по мотивам знаменитого произведения А.С. Пушкина из школьной программы, в котором повествуется о воспоминаниях уже взрослого Гринева о двух светлых годах юности.",
        },
        {
          title: "Рождественский концерт",
          location: "Дворец Искусств Ленинградской области, пл. Стачек д. 4",
          tags: ["6+", "Пушкинская карта"],
          price: "800 ₽",
          date: "27 января",
          time: "19:27",
          isOutdated: true,
          imageUrl: "/src/assets/Events/placeholder4.jpeg",
          description:
            "Рождественские песнопения, популярные арии и ансамбли русских и зарубежных композиторов.",
        },
      ],
    };
  },
};
</script>

<template>
  <!-- ааауаыыыы -->
  <HeaderComponent />
  <PageHeaderComponent class="animate__animated animate__fadeIn" title="Новости" imgSrc="/src/assets/CircleImages/13.png" />
  <NewsGrid :news="news" class="animate__animated animate__fadeIn" />
  <FooterComponent />
</template>

<style scoped></style>
