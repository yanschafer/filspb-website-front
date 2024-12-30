<template>
    <HeaderComponent />
    <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Контакты"
    imgSrc="/src/assets/CircleImages/head_about.png"
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
            <p class="adress">{{ main.address }}</p>
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
    gap: 16px; /* Расстояние между карточками */
    width: 100%;
    justify-content: space-between;
    padding-left: 5rem;
    padding-right: 5rem;
    margin-bottom: 3rem;
}
.contact-wrapper-second {
padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mail-col {
    flex: 1; /* Занимает одинаковую долю */
    display: flex;
    justify-content: flex-start; /* Выравнивание содержимого влево */
    align-items: center; /* Центрирование по вертикали */
}

.phone-col {
    flex: 1; /* Занимает одинаковую долю */
    display: flex;
    justify-content: center; /* Центрирование содержимого по центру */
    align-items: center; /* Центрирование по вертикали */
}

.timetable-col {
    flex: 1; /* Занимает одинаковую долю */
    display: flex;
    justify-content: flex-end; /* Выравнивание содержимого вправо */
    align-items: center; /* Центрирование по вертикали */
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
    margin-top: 2rem;
    margin-left: 5rem;
    margin-right: 5rem;
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
    text-align: center; /* Центровка текста под изображением */
    width: 300px; /* Фиксированная ширина карточки */
}

.person-img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px; /* Фиксированная ширина контейнера */
    height: 200px; /* Фиксированная высота контейнера */
    overflow: hidden; /* Обрезка изображения */
    border-radius: 1rem; /* Если нужен круглый аватар */
    background-color: #f3f3f3; /* Фоновый цвет, если изображение отсутствует */
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
    object-fit: cover; /* Обеспечивает обрезку изображения под контейнер */
}

.contact-wrapper {
    display: flex;
    align-items: center; /* Центрирование содержимого по вертикали */
    background-color: #f3f3f3;
    padding: 2rem;
    border-radius: 2rem;
    margin-left: 5rem;
    margin-right: 5rem;
}

.main {
    background-color: #f3ca00;
}

.phone {
    font-size: 2rem;
    font-weight: 600;
}

.adress {
    font-size: 2rem;
}
.vk-logo {
    max-width: 3vw;
}
.social-text {
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    gap: 1rem;
    width: 100;
    justify-content: end;
    margin-left: 5rem;
    margin-right: 5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
</style>