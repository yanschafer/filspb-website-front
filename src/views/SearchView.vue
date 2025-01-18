<template>
    <HeaderComponent />
    <PageHeaderComponent
      class="animate__animated animate__fadeIn"
      title="Поиск по сайту"
      imgSrc="/filspb/CircleImages/3.png"
    />
    <section class="section">
      <div class="search-box">
        <div class="search-icon-wrapper">
          <img
            class="search-icon"
            src="@/assets/Icons/magnifying-glass-solid.svg"
          />
        </div>
        <input
          @keyup.enter="find"
          v-model="query"
          class="search-input"
          type="text"
          placeholder="Введите запрос"
        />
      </div>
    </section>
    <div v-if="res.length" class="search-results">
      <div
        v-for="item in res"
        :key="item.id"
        class="search-item-wrapper"
        @click="go(item)"
      >
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
    </div>
    <div v-else class="no-results">
  <p>Ничего не найдено по вашему запросу.</p>
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
  import heroBg from '@/assets/Hero/hero_bg-min.png'

  export default {
    name: "SearchView",
    components: { HeaderComponent, PageHeaderComponent, FooterComponent },
    data() {
      return {
        heroBg,
        query: "",
        res: [],
      }
    },
    created() {
      //@ts-ignore
      this.query = this.$route.params.query;
      if (this.query) this.search();
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
          this.search();
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
  .section {
    position: relative;
    height: 30vh;
    background-image: v-bind('url(' + heroBg + ')');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .search-box {
    border-bottom: 2px solid black;
    width: max-content;
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 8;
  }
  
  .search-icon-wrapper {
    width: 1.3rem;
  }
  .no-results {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 5rem;
}
  .search-icon {
    width: 100%;
    max-width: 2rem;
    height: auto;
  }
  
  .search-input {
    border: none;
    background-color: transparent;
    padding: 0.5rem;
    outline: none;
    font-size: 1.5rem;
  }
  
  .search-results {
    padding: 2rem;
  }
  
  .search-item-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
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