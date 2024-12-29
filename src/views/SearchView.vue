<template>
    <input v-model="query"> 
    <button @click="find">Find</button>
    <template v-for="item in res">
        <div @click="go(item)">
            <h1>{{ item.name }}</h1>
            <p>{{ item.shortDescription }}</p>
            <img v-if="item.image" :src="getImage(item.image)" />
        </div>
    </template>
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';
import type SearchResultDto from '@/api/modules/search/search-result.dto';
import SearchModel from '@/api/modules/search/search.model';

export default {
    name: "SearchView",
    data: () => ({
        query: "",
        res: []
    }),
    created() {
        //@ts-ignore
        this.query = this.$route.params.query
        if (this.query != "")
            this.search()
    },
    methods: {
        getImage(url: string) {
            if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
            else return url
        },
        find() {
            this.$router.push({path: `/search/${this.query}`})
        },
        async search() {
            const searchModel = new SearchModel()
            //@ts-ignore
            this.res = (await searchModel.find(this.query)).getData()
        },
        go(item: SearchResultDto) {
            if (!item.isArticle)
                this.$router.push({path: `/event/${item.id}`})
            else
                this.$router.push({path: `/article/${item.id}`})
        }
    }
}
</script>