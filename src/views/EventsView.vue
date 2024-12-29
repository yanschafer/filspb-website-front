<template>
  <HeaderComponent />
  <PageHeaderComponent :utils="true" class="animate__animated animate__fadeIn" title="Афиша" imgSrc="/src/assets/CircleImages/3.png" />

  <ChipsFilter :chips="chipsData" class="animate__animated animate__fadeIn" />
  <EventGrid class="animate__animated animate__fadeIn" />
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

export default {
  name: "EventsView",
  components: { HeaderComponent, FooterComponent, PageHeaderComponent, ChipsFilter, EventGrid },
  data() {
    return {
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
  },
  computed: {
  }
};
</script>

<style scoped></style>
