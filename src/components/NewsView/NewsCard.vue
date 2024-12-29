<template>
  <div class="card-wrapper" @click="goTo(cardData.id)">
    <div class="img-wrapper" v-if="cardData.image">
      <img class="card-img" :src="getImage(cardData.image)" />
    </div>
    <div class="header-row">
      <div class="header-col">
        <div class="date">{{ cardData.date }}</div>
      </div>
    </div>
    <h3 class="heading">{{ cardData.name }}</h3>
    <p class="description">{{ cardData.shortDescription }}</p>
  </div>
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';
import NewsModel from '@/api/modules/news/news.model';

export default {
  name: "NewsCard",
  props: ["id", "cardData"],
  methods: {
    goTo(nId: number) {
      this.$router.push({path: `/article/${nId}`})
    },
    getImage(url: string) {
      if (!url) return null
      if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
      else return url
    }
  }
};
</script>

<style scoped>
.card-wrapper {
  width: 20rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.header-row {
  display: flex;
  justify-content: space-between;
}

.header-col {
  display: flex;
  flex-direction: column;
}

.date {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1em;
}

.time {
  font-size: 2.5rem;
  font-weight: 600;
}

.img-wrapper {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 12rem; 
  overflow: hidden; 
  border-radius: 1rem;
}

.card-img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
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
