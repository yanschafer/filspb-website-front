<template>
    <HeaderComponent />
    <PageHeaderComponent :utils="true" class="animate__animated animate__fadeIn" title="Афиша" imgSrc="/src/assets/CircleImages/3.png" />
   
    <section class="section"> 
      <h1>{{ event.name }}</h1>
      <img :src="getImage(event.image)" />
      <p>{{ event.shortDescription }}</p>
      <p v-html="event.description"></p>
      <button v-if="event.isActive" @click="buy(event.purchaseLink)">Купить {{ event.price }}</button>
      <p v-else>Продажа остановлена</p>
      <div v-for="included in event.events">
          <a @click="goToEvent(included.id)">{{ included.name }}</a>
      </div>
    </section>
    <FooterComponent />
  </template>
  
<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import ChipsFilter from "@/components/EventsView/ChipsFilter.vue";
import EventGrid from "@/components/EventsView/EventGrid.vue";
import useEventsStore from "@/stores/events";
import RepertoireCard from "@/components/EventsView/RepertoireCard.vue";
import SeasonEventModel from "@/api/modules/season_events/season-event.model";
import appConf from "@/api/conf/app.conf";
import SeasonEventDto from "@/api/modules/season_events/season-event.dto";
  
export default {
    name: "SingleSeasonEventsView",
    components: { HeaderComponent, FooterComponent, PageHeaderComponent, ChipsFilter, EventGrid, RepertoireCard},
    data: () => ({
      event: null,
    }),
    async created() {
      const eventModel = new SeasonEventModel()
      this.event = (await eventModel.getOne(this.$route.params.id)).getData()
    },
    methods: {
        getImage(url: string) {
          if (!url) return null
          if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
          else return url
        },
        goToEvent(id) {
          this.$router.push({path: `/event/${id}`})
        }
    }
};
</script>
  
  <style scoped>
  .section {
    padding-left: 5rem;
    padding-right: 5rem;
    margin-bottom: 3rem;
  }
  .cards-grid {
    display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
  }
  .heading {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  </style>
  