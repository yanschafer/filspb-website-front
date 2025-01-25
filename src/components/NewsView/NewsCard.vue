<template>
  <div
    class="card-wrapper"
    :class="{ 
      'horizontal-layout': layout === 'horizontal',
      'news-page-card': isNewsPage 
    }"
    @click="goTo(cardData.id)"
  >
    <div
      class="img-wrapper"
      :class="{ 'horizontal-img': layout === 'horizontal' }"
      v-if="cardData.image"
    >
      <img class="card-img" :src="getImage(cardData.image)" />
    </div>
    <div
      class="content-wrapper"
      :class="{ 'horizontal-content': layout === 'horizontal' }"
    >
      <div class="header-row">
        <div class="header-col">
          <div class="date">{{ formatDate(cardData.date) }}</div>
        </div>
      </div>
      <h3 class="heading">{{ cardData.name }}</h3>
      <p class="description">{{ cardData.shortDescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';
import NewsModel from '@/api/modules/news/news.model';

export default {
  name: "NewsCard",
  props: {
    id: Number,
    cardData: Object,
    layout: {
      type: String,
      default: "vertical", // "vertical" или "horizontal"
    },
    isNewsPage: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    goTo(nId: number) {
      this.$router.push({ path: `/article/${nId}` });
    },
    formatDate(timestamp: number) {
      const date = new Date(timestamp);
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
    },
    getImage(url: string) {
      if (!url) return null;
      if (url[0] === "/")
        return `${appConf.proto}://${appConf.endpoint}/files${url}`;
      else return url;
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 18rem; /* Возвращаем фиксированную ширину по умолчанию */
}

/* Специальные стили для страницы новостей */
.card-wrapper.news-page-card {
  width: 100% !important;
}

.card-wrapper.horizontal-layout {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.card-wrapper.horizontal-layout.news-page-card {
  width: 100% !important;
}

.img-wrapper {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 12rem;
  overflow: hidden;
  border-radius: 1rem;
}

.img-wrapper.horizontal-img {
  margin: 0;
  height: 8rem;
  width: 8rem;
  flex-shrink: 0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-col {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date {
  color: var(--text-color);
  opacity: 0.7;
}

.heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.description {
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
  line-height: 1.4;
}

/* Медиа-запросы для страницы новостей */
@media screen and (max-width: 1600px) {
  .card-wrapper.news-page-card {
    width: 100% !important;
    min-height: auto !important;
  }
}

@media screen and (max-width: 1024px) {
  .card-wrapper.news-page-card {
    width: 100% !important;
  }
}

@media screen and (max-width: 768px) {
  .card-wrapper.news-page-card {
    width: 100% !important;
  }
  
  .img-wrapper.horizontal-img {
    height: 6rem;
    width: 6rem;
  }
  
  .heading {
    font-size: 1.2rem;
  }
}
</style>
