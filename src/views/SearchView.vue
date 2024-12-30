<template>
    <HeaderComponent />
    <PageHeaderComponent
      class="animate__animated animate__fadeIn"
      title="Поиск по сайту"
      imgSrc="/src/assets/CircleImages/3.png"
    />
    <input v-model="query" />
    <button @click="find">Find</button>
    <div v-for="item in res" :key="item.id" class="search-item-wrapper" @click="go(item)">
      <div class="search-item">
        <div class="img-wrapper">
          <img class="img" v-if="item.image" :src="getImage(item.image)" />
        </div>
        <div class="text-wrapper">
          <h1 class="item-title">{{ item.name }}</h1>
          <p class="item-description">{{ item.shortDescription }}</p>
        </div>
      </div>
    </div>
    <FooterComponent />
  </template>
  

<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import appConf from "@/api/conf/app.conf";
import type SearchResultDto from "@/api/modules/search/search-result.dto";
import SearchModel from "@/api/modules/search/search.model";

export default {
  name: "SearchView",
  components: { HeaderComponent, PageHeaderComponent, FooterComponent },
  data: () => ({
    query: "",
    res: [],
  }),
  created() {
    //@ts-ignore
    this.query = this.$route.params.query;
    if (this.query != "") this.search();
  },
  methods: {
    getImage(url: string) {
      if (!url) return null;
      if (url[0] == "/")
        return `${appConf.proto}://${appConf.endpoint}/files${url}`;
      else return url;
    },
    find() {
      this.$router.push({ path: `/search/${this.query}` }).finally(() => {
        this.search()
      });
    },
    async search() {
      const searchModel = new SearchModel();
      //@ts-ignore
      this.res = (await searchModel.find(this.query)).getData();
    },
    go(item: SearchResultDto) {
      if (!item.isArticle) this.$router.push({ path: `/event/${item.id}` });
      else this.$router.push({ path: `/article/${item.id}` });
    },
  },
};
</script>
<style scoped>
.search-item-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;
  padding-right: 5rem;
  padding-left: 5rem;
  margin-top: 3rem;
}

.search-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  transition: transform 0.2s;
}

.search-item:hover {
  transform: scale(1.02);
}

.img-wrapper {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-wrapper {
  padding: 1rem;
  flex-grow: 1;
}

.item-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.item-description {
  font-size: 1rem;
  color: #555;
  margin: 0;
}
</style>
