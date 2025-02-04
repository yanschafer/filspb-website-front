<template>
  <!-- ааауаыыыы -->
  <HeaderComponent />
  <PageHeaderComponent :utils="false" class="animate__animated animate__fadeIn" title="Новости" imgSrc="/filspb/CircleImages/13.png" />
  <NewsGrid 
    :news="news" 
    :is-news-page="true"
    class="news animate__animated animate__fadeIn" 
  />
  <FooterComponent />
</template>

<script lang="ts">
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import NewsGrid from "@/components/NewsView/NewsGrid.vue";
import NewsModel from "@/api/modules/news/news.model";
export default {
  name: "NewsView",
  components: { HeaderComponent, FooterComponent, PageHeaderComponent, NewsGrid },
  data() {
    return {
      news: [],
    };
  },
  async created() {
    const newsModel = new NewsModel()
    this.news = (await newsModel.getAll()).getData()
  }
};
</script>

<style scoped>
.news {
  margin-bottom: 2rem;
}
</style>
