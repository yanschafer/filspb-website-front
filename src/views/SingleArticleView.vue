<template>
  <HeaderComponent />
  <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Новости"
    imgSrc="/src/assets/CircleImages/13.png"
  />
  <Divider />
  <div class="content-section animate__animated animate__fadeIn">
    <div class="text-wrapper">
      <div class="back-btn" @click="$router.back()"><< Назад к новостям</div>
      <div class="text-col">
        <h1 class="heading">
          {{ article.name }}
        </h1>
        <p class="text" v-html="article.description"></p>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script lang="ts">
import NewsModel from "@/api/modules/news/news.model";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import SingleEventHeroComponent from "@/components/SingleEventHeroComponent.vue";
import Divider from "primevue/divider";

export default {
  name: "SingleArticle",
  components: {
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    SingleEventHeroComponent,
    Divider,
  },
  data() {
    return {
      article: {},
    };
  },
  async created() {
    const newsModel = new NewsModel()
    this.article = (await newsModel.getOne(parseInt(this.$route.params.id))).getData()
  }
};
</script>

<style scoped>
.content-section {
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.text-wrapper {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.authors-col-wrapper {
  width: 60vw;
  gap: 2rem;
  display: flex;
  flex-direction: column;
}
.authors-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.job {
  font-size: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.name {
  font-size: 1.5rem;
  font-weight: 600;
}
.text {
  font-size: 1.5rem;
}
.text-input {
  border: 2px solid #000;
  height: 4.2rem;
  border-radius: 1rem;
  background: #fff;
  font-size: 1.5rem;
  padding: 0 2rem;
  width: 80%;
}
.text-area {
  border: 2px solid #000;
  height: 8.2rem;
  border-radius: 1rem;
  background: #fff;
  font-size: 1.5rem;
  padding: 0 2rem;
  padding-top: 1rem;
  width: 80%;
}
.heading {
  font-size: 3rem;
  line-height: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.send-button {
  color: #000;
  background-color: #f3ca00;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 40rem;
  width: max-content;
  font-size: 1.3rem;
  font-size: 1.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.5rem;
}
.back-btn {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
}
.back-btn:hover {
  cursor: pointer;
}
.show-more-btn {
  font-size: 1rem;
  font-weight: 600;
  color: #f3ca00;
  cursor: pointer;
  text-align: left;
  margin-top: 1rem;
}
.show-more-btn:hover {
  text-decoration: underline;
}
/* Анимация для плавного появления/исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
