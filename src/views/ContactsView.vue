<template>
    <HeaderComponent />
    <template v-for="person in people">
        <div>
            <h1>{{ person.name }}</h1>
            <img :src="person.image" />
            <p>{{ person.email }}</p>
        </div>
    </template> 
    <div>
        <h1>{{ main.email }}</h1>
        <p>{{ main.name }}</p>
        <p>{{ main.address }}</p>
    </div>
    <template v-for="dep in deps">
        <div>
            <h1>{{ dep.name }}</h1>
            <p>{{ dep.phone }}</p>
            <p>{{ dep.timeTable }}</p>
        </div>
    </template>
    <p>Our socials: <a :href="main.vk">VK</a></p>
    <FooterComponent />
</template>

<script lang="ts">
//@ts-nocheck
import DepContactsModel from '@/api/modules/contacts/dep-contacts.model';
import PeopleContactsModel from '@/api/modules/contacts/people-contacts.model';
import SystemModel from '@/api/modules/system/system.model';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
    name: "ContactsView",
    components: {HeaderComponent, FooterComponent},
    data: () => ({
        people: [],
        deps: [],
        main: null
    }),
    async created() {
        const peopleModel = new PeopleContactsModel()
        const depsModel = new DepContactsModel()
        const systemModel = new SystemModel()

        this.people = (await peopleModel.getAll()).getData().slice(0, 3)
        this.deps = (await depsModel.getAll()).getData().slice(0, 3)
        this.main = (await systemModel.getSystemData()).getData()
    }
}

</script>
<style scoped></style>