<template>
  <HeaderComponent />
  <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Доступная среда"
    imgSrc="/filspb/CircleImages/13.png"
  />
  <Divider />
  <div class="content-section animate__animated animate__fadeIn">
    <div class="text-wrapper">
      <div class="text-col">
        <p class="text">
          Здание Государственной филармонии для детей и молодежи закрыто на реконструкцию с года. 
          Спектакли и концерты Филармонии проходят на арендованных площадках, на которых доступную среду обеспечивают площадки самостоятельно.
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
import Divider from "primevue/divider";

export default {
  name: "AccessibilityView",
  components: {
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    Divider,
  }
};
</script>

<style scoped>
.content-section {
  padding: 2rem 5rem;
}

.text-wrapper {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

.text {
  font-size: 1.5rem;
  line-height: 1.6;
}

.heading {
  font-size: 3rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .content-section {
    padding: 2rem;
  }
  
  .heading {
    font-size: 2rem;
  }
  
  .text {
    font-size: 1.2rem;
  }
}
</style>
