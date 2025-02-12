<template>
    <HeaderComponent />
    <PageHeaderComponent
      class="animate__animated animate__fadeIn"
      title="Поиск по сайту"
      :utils="false"
      imgSrc="/CircleImages/3.png"
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
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import appConf from "@/api/conf/app.conf";
import type SearchResultDto from "@/api/modules/search/search-result.dto";
import SearchModel from "@/api/modules/search/search.model";
import heroBg from '@/assets/Hero/hero_bg-min.png';

export default defineComponent({
  name: "SearchView",
  components: { HeaderComponent, PageHeaderComponent, FooterComponent },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const query = ref("");
    const res = ref([]);

    const getImage = (url: string) => {
      if (!url) return null;
      if (url[0] === "/")
        return `${appConf.proto}://${appConf.endpoint}/files${url}`;
      return url;
    };

    const find = async () => {
      if (!query.value.trim()) return;
      
      try {
        // Сначала выполняем поиск
        const searchModel = new SearchModel();
        const results = await searchModel.find(query.value);
        res.value = results.getData();
        
        // Затем обновляем URL
        router.push({ path: `/search/${query.value}` });
      } catch (error) {
        console.error('Ошибка при поиске:', error);
        res.value = [];
      }
    };

    const search = async () => {
      if (!query.value.trim()) return;
      
      try {
        const searchModel = new SearchModel();
        const results = await searchModel.find(query.value);
        res.value = results.getData();
      } catch (error) {
        console.error('Ошибка при поиске:', error);
        res.value = [];
      }
    };

    const go = (item: SearchResultDto) => {
      if (!item.isArticle) {
        router.push({ path: `/event/${item.id}` });
      } else {
        router.push({ path: `/article/${item.id}` });
      }
    };

    // Watch for route changes
    watch(() => route.params.query, (newQuery) => {
      if (newQuery) {
        query.value = newQuery as string;
        search();
      }
    }, { immediate: true });

    return {
      query,
      res,
      getImage,
      find,
      go,
      heroBg
    };
  }
});
</script>
  
<style scoped>
.section {
  position: relative;
  height: 30vh;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 2rem;
}

.search-icon-wrapper {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
}

.search-icon {
  width: 100%;
  height: 100%;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.2rem;
}

.search-results {
  padding: 2rem 5rem;
}

.search-item-wrapper {
  cursor: pointer;
  margin-bottom: 2rem;
}

.search-item {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  transition: 0.3s;
}

.search-item:hover {
  background-color: #f5f5f5;
}

.img-wrapper {
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-wrapper {
  flex: 1;
}

.item-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.item-description {
  font-size: 1.2rem;
  color: #555;
  margin: 0;
}

.no-results {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #555;
}

@media (max-width: 768px) {
  .search-results {
    padding: 2rem;
  }
  
  .search-item {
    flex-direction: column;
  }
  
  .img-wrapper {
    width: 100%;
    height: 300px;
  }
}
</style>