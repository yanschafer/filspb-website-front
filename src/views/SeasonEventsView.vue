<template>
    <HeaderComponent />
    <PageHeaderComponent :utils="true" class="animate__animated animate__fadeIn" title="Афиша" imgSrc="/src/assets/CircleImages/3.png" />
   
    <section class="section"> 
      <h1 class="heading">Наши абонементы</h1>
      <div class="cards-grid">
        <div @click="goToSeason(event.id)" class="card" v-for="event in events">
            <h1>{{ event.name }}</h1>
            <img :src="getImage(event.image)" />
            <p>{{ event.shortDescription }}</p>
        </div>
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
  
export default {
    name: "SeasonEventsView",
    components: { HeaderComponent, FooterComponent, PageHeaderComponent, ChipsFilter, EventGrid, RepertoireCard},
    data() {
        return {
            events: [],
        };
    },
    async created() {
        const events = new SeasonEventModel()
        this.events = (await events.getAll()).getData()
    },
    methods: {
        getImage(url: string) {
            if (!url) return null
            if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
            else return url
        },
        goToEvent(id) {
            this.$router.push({path: `/event/${id}`})
        },
        goToSeason(id) {
            this.$router.push({path: `/season-event/${id}`})
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
  