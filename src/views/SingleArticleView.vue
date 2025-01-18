<template>
  <HeaderComponent />
  <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Новости"
    imgSrc="/filspb/CircleImages/13.png"
  />
  <Divider />
  <div class="content-section animate__animated animate__fadeIn">
    <div class="text-wrapper">
      <div class="back-btn" @click="$router.back()"><< Назад к новостям</div>
      <div v-if="article.image" class="article-image">
        <img :src="getImage(article.image)" :alt="article.name" />
      </div>
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
import appConf from '@/api/conf/app.conf';

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
  },
  methods: {
    getImage(url: string) {
      if (!url) return null;
      if (url[0] === "/")
        return `${appConf.proto}://${appConf.endpoint}/files${url}`;
      else return url;
    },
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

.article-image {
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.back-btn {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  cursor: pointer;
}

@media screen and (max-width: 1024px) {
  .content-section {
    padding: 2rem 3rem;
  }

  .article-image {
    height: 300px;
  }

  .heading {
    font-size: 2.5rem;
  }

  .text {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 768px) {
  .content-section {
    padding: 1.5rem 2rem;
  }

  .article-image {
    height: 250px;
  }

  .heading {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 1.5rem;
  }

  .text {
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .back-btn {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
}

@media screen and (max-width: 480px) {
  .content-section {
    padding: 1rem;
  }

  .article-image {
    height: 200px;
  }

  .heading {
    font-size: 1.8rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .text {
    font-size: 1.1rem;
  }

  .back-btn {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
}

/* Стили для изображений внутри контента */
.text :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 0.5rem;
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
.heading {
    font-size: 1.8rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .text {
    font-size: 1.1rem;
  }

  .back-btn {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

/* Стили для изображений внутри контента */
.text :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 0.5rem;
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



