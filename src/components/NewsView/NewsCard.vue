<template>
  <div
    class="card-wrapper"
    :class="{ 'horizontal-layout': layout === 'horizontal' }"
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
  width: 20rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card-wrapper.horizontal-layout {
  flex-direction: row;
  align-items: center;
  width: 100%;
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
  padding: 1rem 0;
}

.content-wrapper.horizontal-content {
  padding-left: 1rem;
  flex: 1;
}

.heading {
  font-size: 2rem;
  line-height: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.description {
  font-size: 1.1rem;
}
</style>
