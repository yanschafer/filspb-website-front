<template>
  <HeaderComponent />
  <PageHeaderComponent :utils="true" class="animate__animated animate__fadeIn" title="Афиша" imgSrc="/filspb/CircleImages/3.png" />

  <ChipsFilter :chips="chipsData" class="animate__animated animate__fadeIn" />
  <EventGrid class="animate__animated animate__fadeIn" />
 
  <section class="section repertoire-section"> 
    <h1 class="heading">Наш репертуар</h1>
    <div class="cards-grid">
      <RepertoireCard
        v-for="(event, index) in repertoire"
        :key="index"
        :card-data="event"
      />
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
import TagsModel from "@/api/modules/tags/tags.model";
import RepModel from "@/api/modules/rep/rep.model";
import RepertoireCard from "@/components/EventsView/RepertoireCard.vue";

export default {
  name: "EventsView",
  components: { HeaderComponent, FooterComponent, PageHeaderComponent, ChipsFilter, EventGrid, RepertoireCard},
  data() {
    return {
      repertoire: [],
      chipsData: [],//['0+', '6+', '12+', '16+', 'Пушкинская карта', 'Школьная классика', 'Новогоднее'],
    };
  },
  setup() {
    const eventStore = useEventsStore() 
    eventStore.updatePeriod()
    return {
      eventStore
    }
  },
  async created() {
    const tagModel = new TagsModel()
    this.chipsData = (await tagModel.getAll()).getData()
    const rep = new RepModel()
    this.repertoire = (await rep.getAll()).getData()
  },
  computed: {
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
