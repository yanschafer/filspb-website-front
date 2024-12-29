<template>
    <HeaderComponent />
    <PageHeaderComponent class="animate__animated animate__fadeIn" title="О нас" imgSrc="/src/assets/CircleImages/head_about.png" />
    <template v-for="category in categories">
        <div>
            <h1>{{ category.categoryName }}</h1>
            <template v-for="person in elite(category)">
                <h3>{{ person.name }}</h3>
                <p>Elite: {{ person.position }}</p>
                <img :src="getImage(person.image)" />
            </template>
            <template v-for="person in popuski(category)">
                <h3>{{ person.name }}</h3>
                <p>Popusk: {{ person.position }}</p>
            </template>
        </div>
    </template>
    <template v-if="false" v-for="partner in partners">
        <img :src="getImage(partner.image)" />
    </template>
    <template v-for="vacancy in vacancies">
        <img :src="getImage(vacancy.image)" />
        <h1>{{ vacancy.name }}</h1>
        <p v-html="vacancy.description"></p>
    </template>
    <FooterComponent />
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';
import PartnersModel from '@/api/modules/partners/partners.model';
import type PeopleCategoryDto from '@/api/modules/people/people-category.dto';
import PeopleModel from '@/api/modules/people/people.model';
import VacancyModel from '@/api/modules/vacancy/vacancy.model';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";

export default {
    name: "AboutView",
    components: {HeaderComponent, FooterComponent, PageHeaderComponent},
    data: () => ({
        people: [],
        categories: [],
        partners: [],
        vacancies: []
    }),
    async created() {
        const peopleModel = new PeopleModel()
        this.categories = (await peopleModel.getAll()).getData()

        const vacancyModel = new VacancyModel()
        this.vacancies = (await vacancyModel.getAll()).getData()

        const parnersModel = new PartnersModel()
        this.partners = (await parnersModel.getAll()).getData()
    },
    methods: {
        getImage(url: string) {
            if (!url) return
            if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
            else return url
        },
        elite(category: PeopleCategoryDto) {
            return category.people.filter(el => el.image != null)
        },
        popuski(category: PeopleCategoryDto) {
            return category.people.filter(el => el.image == null)
        }
    }
}

</script>

<style scoped></style>