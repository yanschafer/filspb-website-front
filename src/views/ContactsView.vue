<template>
    <HeaderComponent />
    <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Контакты"
    imgSrc="/filspb/CircleImages/head_about.png"
  />
  <div class="people-wrapper animate__animated animate__fadeIn">
    <template v-for="person in people">
        <div class="person-wrapper">
            <div class="person-img-wrapper">
                <img class="person-img" :src="getImage(person.image)" />
            </div>
            <h1 class="person-name">{{ person.name }}</h1>
            <p class="person-position">{{ person.position }}</p>
            <a :href="`mailto:${person.email}`" class="person-email link-default">{{ person.email }}</a>
            
        </div>
    </template> 
  </div>
    <div class="contact-wrapper main animate__animated animate__fadeIn">
        <div class="mail-col">
            <a :href="`mailto:${main.email}`" class="mail link-yellow">{{main.email }}</a>
        </div>
        <div class="phone-col">
            <a :href="`tel:${main.phone}`" class="phone link-yellow">{{ main.name }}</a>
        </div>
        <div class="timetable-col">
            <p class="adress">{{ main.address }}<br> (здание находится не капитальном ремонте)</p>
        </div>
        
    </div>
    <div class="depts-wrapper animate__animated animate__fadeIn">
    <template v-for="dep in deps">
        <div class="contact-wrapper-second">
            <div class="mail-col">
                <h1 class="mail">{{ dep.name }}</h1>
            </div>
            <div class="phone-col">
                <a :href="`tel:${dep.phone}`" class="phone link-default">{{ dep.phone }}</a>
            </div>
            <div class="timetable-col">
                <p v-html="dep.timeTable"></p>
            </div>
        </div>
    </template>
    </div>
    <p class="social-text">Мы в социальных сетях: <a target="_blank" :href="main.vk"><img class="vk-logo" src="../assets/Icons/vk.svg"></a></p>
    <FooterComponent />
</template>

<script lang="ts">
import DepContactsModel from '@/api/modules/contacts/dep-contacts.model';
import PeopleContactsModel from '@/api/modules/contacts/people-contacts.model';
import SystemModel from '@/api/modules/system/system.model';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import appConf from '@/api/conf/app.conf';
import PageHeaderComponent from '@/components/PageHeaderComponent.vue';

export default {
    name: "ContactsView",
    components: {HeaderComponent, FooterComponent, PageHeaderComponent},
    data: () => ({
        people: [],
        deps: [],
        main: {}
    }),
    async created() {
        const peopleModel = new PeopleContactsModel()
        const depsModel = new DepContactsModel()
        const systemModel = new SystemModel()

        this.people = (await peopleModel.getAll()).getData().slice(0, 3)
        this.deps = (await depsModel.getAll()).getData().slice(0, 3)
        this.main = (await systemModel.getSystemData()).getData()
    },
    methods: {
        getImage(url: string) {
            if (!url) return null
            if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
            else return url
        },
    }
}

</script>
<style scoped>
.people-wrapper {
    display: flex;
    gap: 16px;
    width: 100%;
    justify-content: space-between;
    padding: 0 5rem;
    margin-bottom: 3rem;
}

.contact-wrapper-second {
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mail-col {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.phone-col {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.timetable-col {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.link-default {
    transition: all 0.3s ease-in-out;
}

.link-yellow {
    transition: all 0.3s ease-in-out;
}

.depts-wrapper {
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    margin: 2rem 5rem 0;
}

a {
    text-decoration: none;
    font-size: 2rem;
    color: black;
}

.link-yellow:hover {
    color: white;
}

.link-default:hover {
    color: #f3ca00;
}

.person-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 300px;
}

.person-img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 1rem;
    background-color: #f3f3f3;
    margin-bottom: 1rem;
}

.person-name {
    font-weight: 600;
    line-height: 2rem;
}

.person-position {
    font-size: 1.3rem;
}

.person-email {
    font-size: 1.3rem;
}

.person-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: white;
}

.contact-wrapper {
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
    padding: 2rem;
    border-radius: 2rem;
    margin: 0 5rem;
}

.main {
    background-color: #f3ca00;
}

.phone {
    font-size: 2rem;
    font-weight: 600;
}

.adress {
    text-align: right;
}

.vk-logo {
    width: 3rem;
    height: 3rem;
}

.social-text {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
    margin: 2rem 5rem;
}

@media screen and (max-width: 1024px) {
    .people-wrapper {
        padding: 0 3rem;
        gap: 1rem;
    }

    .person-wrapper {
        width: 250px;
    }

    .person-img-wrapper {
        width: 180px;
        height: 180px;
    }

    .contact-wrapper,
    .depts-wrapper {
        margin-left: 3rem;
        margin-right: 3rem;
    }

    .social-text {
        margin: 2rem 3rem;
        font-size: 1.8rem;
    }

    a {
        font-size: 1.8rem;
    }
}

@media screen and (max-width: 768px) {
    .people-wrapper {
        flex-direction: column;
        align-items: center;
        padding: 0 2rem;
    }

    .person-wrapper {
        width: 100%;
        max-width: 300px;
        margin-bottom: 2rem;
    }

    .contact-wrapper,
    .contact-wrapper-second {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        margin-left: 2rem;
        margin-right: 2rem;
        text-align: center;
    }

    .mail-col,
    .phone-col,
    .timetable-col {
        justify-content: center;
        width: 100%;
    }

    .depts-wrapper {
        margin: 2rem 2rem 0;
    }

    .phone,
    .adress {
        font-size: 1.6rem;
    }

    .social-text {
        margin: 2rem;
        font-size: 1.6rem;
        justify-content: center;
    }

    a {
        font-size: 1.6rem;
    }
}

@media screen and (max-width: 480px) {
    .people-wrapper {
        padding: 0 1rem;
    }

    .person-img-wrapper {
        width: 150px;
        height: 150px;
    }

    .person-name {
        font-size: 1.4rem;
        line-height: 1.6rem;
    }

    .person-position,
    .person-email {
        font-size: 1.1rem;
    }

    .contact-wrapper,
    .contact-wrapper-second {
        margin-left: 1rem;
        margin-right: 1rem;
        padding: 1rem;
    }

    .depts-wrapper {
        margin: 1rem 1rem 0;
        border-radius: 1rem;
    }

    .phone,
    .adress {
        font-size: 1.4rem;
    }

    .social-text {
        margin: 1.5rem 1rem;
        font-size: 1.4rem;
    }

    a {
        font-size: 1.4rem;
    }

    .vk-logo {
        width: 2.5rem;
        height: 2.5rem;
    }
}

@media screen and (max-width: 1024px) {
    .people-wrapper {
        padding: 0 3rem;
        gap: 1rem;
    }

    .person-wrapper {
        width: 250px;
    }

    .person-img-wrapper {
        width: 180px;
        height: 180px;
    }

    .contact-wrapper,
    .depts-wrapper {
        margin-left: 3rem;
        margin-right: 3rem;
    }

    .social-text {
        margin: 2rem 3rem;
        font-size: 1.8rem;
    }

    a {
        font-size: 1.8rem;
    }
}

@media screen and (max-width: 768px) {
    .people-wrapper {
        flex-direction: column;
        align-items: center;
        padding: 0 2rem;
    }

    .person-wrapper {
        width: 100%;
        max-width: 300px;
        margin-bottom: 2rem;
    }

    .contact-wrapper,
    .contact-wrapper-second {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        margin-left: 2rem;
        margin-right: 2rem;
        text-align: center;
    }

    .mail-col,
    .phone-col,
    .timetable-col {
        justify-content: center;
        width: 100%;
    }

    .depts-wrapper {
        margin: 2rem 2rem 0;
    }

    .phone,
    .adress {
        font-size: 1.6rem;
    }

    .social-text {
        margin: 2rem;
        font-size: 1.6rem;
        justify-content: center;
    }

    a {
        font-size: 1.6rem;
    }
}

@media screen and (max-width: 480px) {
    .people-wrapper {
        padding: 0 1rem;
    }

    .person-img-wrapper {
        width: 150px;
        height: 150px;
    }

    .person-name {
        font-size: 1.4rem;
        line-height: 1.6rem;
    }

    .person-position,
    .person-email {
        font-size: 1.1rem;
    }

    .contact-wrapper,
    .contact-wrapper-second {
        margin-left: 1rem;
        margin-right: 1rem;
        padding: 1rem;
    }

    .depts-wrapper {
        margin: 1rem 1rem 0;
        border-radius: 1rem;
    }

    .phone,
    .adress {
        font-size: 1.4rem;
    }

    .social-text {
        margin: 1.5rem 1rem;
        font-size: 1.4rem;
    }

    a {
        font-size: 1.4rem;
    }

    .vk-logo {
        width: 2.5rem;
        height: 2.5rem;
    }
}
</style>
