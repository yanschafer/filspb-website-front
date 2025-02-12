<template>
    <HeaderComponent />
    <PageHeaderComponent :utils="false"  class="animate__animated animate__fadeIn" title="Абонементы" />
   
    <section class="section"> 
      <div class="content-wrapper">
        <div class="main-content">
          <h1 class="title">{{ event.name }}</h1>
          <img :src="getImage(event.image)" />
          <div class="description" v-html="event.description"></div>
          
          <div class="included-events">
            <h2 class="subtitle">Мероприятия в абонементе:</h2>
            <div class="events-list">
              <template v-for="included in event.events" :key="included.id">
                <div v-if="included.id" class="event-item" @click="goToEvent(included.id)">
                  <h3 class="event-name">{{ included.name }}</h3>
                </div>
                <div v-else class="event-item">
                  <h3 class="event-name">{{ included.name }}</h3>
                </div>
              </template>
            </div>
          </div>
        </div>
        
        <div class="side-content">
          <div class="price-box">
            <div class="price" v-if="event.price">{{ event.price }}₽</div>
            <div id="wb-button-root" class="wb-button-root" :data-performance_id="getPerformanceId(event.purchaseLink)">Купить билет</div>
          </div>
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
        },
        getPerformanceId(purchaseLink: string): string {
          return purchaseLink ? purchaseLink.replace('pl', '') : '';
        },
    }
};
</script>
  
  <style scoped>
  .section {
    padding: 4rem 5rem;
    margin-bottom: 3rem;
  }

  .content-wrapper {
    display: flex;
    gap: 4rem;
  }

  .main-content {
    flex: 2;
  }

  .side-content {
    flex: 1;
  }

  .title {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin: 2rem 0;
  }

  .description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .included-events {
    margin-top: 3rem;
  }

  .events-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .event-item {
    padding: 1.5rem;
    background: #f3f3f3;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .event-item:hover {
    transform: translateX(10px);
  }

  .event-name {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .price-box {
    position: sticky;
    top: 2rem;
    padding: 2rem;
    background: #f3f3f3;
    border-radius: 2rem;
  }

  .price {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .buy-button {
    width: 100%;
    padding: 1rem;
    background: #000;
    color: #fff;
    border: 2px solid #000;
    border-radius: 2rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .buy-button:hover {
    background: transparent;
    color: #000;
  }

  .inactive-notice {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .section {
      padding: 2rem;
    }

    .content-wrapper {
      flex-direction: column;
    }

    .side-content {
      order: -1;
    }

    .price-box {
      position: static;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }
  }
  </style>