<template>
    <HeaderComponent />
    <PageHeaderComponent class="animate__animated animate__fadeIn" title="О нас" imgSrc="/src/assets/CircleImages/head_about.png" />
    <template v-for="category in categories">
        <div>
            <h1>{{ category.name }}</h1>
            <tempate v-for="person in elite(category.id)">
                <h3>{{ person.name }}</h3>
                <p>Elite: {{ person.position }}</p>
                <img :src="person.image" />
            </tempate>
            <tempate v-for="person in popuski(category.id)">
                <h3>{{ person.name }}</h3>
                <p>Popusk: {{ person.position }}</p>
            </tempate>
        </div>
    </template>
    <template v-for="partner in partners">
        <img :src="partner.image" />
    </template>
    <template v-for="vacancy in vacancies">
        <img :src="vacancy.image" />
        <h1>{{ vacancy.name }}</h1>
        <p>{{ vacancy.description }}</p>
    </template>
    <FooterComponent />
</template>

<script lang="ts">
import PartnersModel from '@/api/modules/partners/partners.model';
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
        this.people = (await peopleModel.getAll()).getData()
        this.categories = (await peopleModel.getCategories()).getData()

        const vacancyModel = new VacancyModel()
        this.vacancies = (await vacancyModel.getAll()).getData()

        const parnersModel = new PartnersModel()
        this.partners = (await parnersModel.getAll()).getData()
    },
    methods: {
        elite(cId: number) {
            return this.people.filter(el => el.categoryId == cId && el.image != null)
        },
        popuski(cId: number) {
            return this.people.filter(el => el.categoryId == cId && el.image == null)
        }
    }
}

</script>

<style scoped></style>