<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import DateRangeFilter from "@/components/EventsView/DateRangeFilter.vue";
import ChipsFilter from "@/components/EventsView/ChipsFilter.vue";
import EventGrid from "@/components/EventsView/EventGrid.vue";

export default {
  name: "EventsView",
  components: { HeaderComponent, FooterComponent, PageHeaderComponent, DateRangeFilter, ChipsFilter, EventGrid },
  data() {
    return {
      chipsData: ['0+', '6+', '12+', '16+', 'Пушкинская карта', 'Школьная классика', 'Новогоднее'],
      events: [
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
  methods: {
    parseDate(dateString: string) {
  const months = {
    январь: 0,
    февраль: 1,
    март: 2,
    апрель: 3,
    май: 4,
    июнь: 5,
    июль: 6,
    август: 7,
    сентябрь: 8,
    октябрь: 9,
    ноябрь: 10,
    декабрь: 11,
  };

  
  const regex = /(\d+)\s([а-яА-Я]+)/; 
  const match = dateString.match(regex);

  if (match && match.length === 3) {
    const day = parseInt(match[1], 10);
    const month = months[match[2].toLowerCase()];
    const currentYear = new Date().getFullYear(); 

    if (month !== undefined) {
      return new Date(currentYear, month, day);
    } else {
      console.error(`Неизвестный месяц: ${match[2]}`);
    }
  } else {
    console.error(`Не удалось распарсить дату: ${dateString}`);
  }

  return new Date(); 
},
    
    isOutdated(event) {
      const eventDate = this.parseDate(event.date); 
      return eventDate < new Date(); 
    },
  },
};
</script>

<template>
  <!-- ааауаыыыы -->
  <HeaderComponent />
  <PageHeaderComponent class="animate__animated animate__fadeIn" title="Афиша" imgSrc="/src/assets/CircleImages/3.png" />
  <DateRangeFilter class="animate__animated animate__fadeIn" />
  <ChipsFilter :chips="chipsData" class="animate__animated animate__fadeIn" />
  <EventGrid :events="events" class="animate__animated animate__fadeIn" />
  <FooterComponent />
</template>

<style scoped></style>
