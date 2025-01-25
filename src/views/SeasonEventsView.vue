<template>
    <HeaderComponent />
    <PageHeaderComponent  class="animate__animated animate__fadeIn" title="Абонементы" />
   
    <section class="section"> 
      <div class="cards-grid">
        <div @click="goToSeason(event.id)" class="season-card" v-for="event in events">
          <h3 class="heading">{{ event.name }}</h3>
          <p class="description" v-html="event.shortDescription"></p>
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
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    gap: 2rem;
  }

  .heading {
    font-size: 4rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .season-card {
    width: 20rem;
    height: 100%;
    min-height: 15rem;
    padding: 2rem;
    background: #f3f3f3;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .season-card:hover {
    transform: translateY(-5px);
  }

  .season-card .heading {
    font-size: 2rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 0;
    font-weight: 600;
  }

  .season-card .description {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    .section {
      padding-right: 2rem;
      padding-left: 2rem;
    }
  }
  </style>