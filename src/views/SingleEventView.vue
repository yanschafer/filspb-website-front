<template>
  <HeaderComponent />
  <PageHeaderComponent
    class="animate__animated animate__fadeIn"
    title="Афиша"
    imgSrc="/src/assets/CircleImages/3.png"
  />
  <div class="content-section animate__animated animate__fadeIn">
    <SingleEventHeroComponent :event="eventData" />
  </div>
  <Divider />
  <div class="content-section">
    <div class="text-wrapper">
      <!-- Список авторов -->
      <div class="authors-col-wrapper">
        <transition-group class="authors-col" name="fade" tag="div">
          <div
            v-for="(author, index) in displayedAuthors"
            :key="index"
            class="author"
          >
            <div class="job">{{ author.position }}</div>
            <div class="name">{{ author.name }}</div>
          </div>
        </transition-group>
        <!-- Кнопка "Показать все/Скрыть" -->
        <div v-if="eventData.authors.length > 5" class="show-more-btn" @click="toggleAuthors">
          {{ showAllAuthors ? "Скрыть" : "Показать все" }}
        </div>
      </div>
      <div class="text-col">
        <p class="text" v-html="eventData.description">
        </p>
      </div>
    </div>
  </div>
  <Divider />
  <div class="content-section">
    <div @click='$router.push({path: "/events"})' class="back-btn">
      << Назад к афише
    </div>
    <h3 class="heading">Как вам спектакль? <br />Оставьте отзыв</h3>
    <div class="form">
      <input v-model="name" placeholder="Ваше имя" type="text" class="text-input" />
      <textarea
        v-model="review"
        placeholder="Ваши впечатления"
        type="textarea"
        class="text-area"
      />
      <div @click="sendReview" class="send-button">отправить</div>
    </div>
  </div>
  <FooterComponent />
</template>
  
<script lang="ts">
import EventModel from "@/api/modules/event/event.model";
import ReviewCreateDto from "@/api/modules/review/review-create.dto";
import ReviewModel from "@/api/modules/review/review.model";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import SingleEventHeroComponent from "@/components/SingleEventHeroComponent.vue";
import Divider from "primevue/divider";

export default {
  name: "SingleEvent",
  components: {
    HeaderComponent,
    FooterComponent,
    PageHeaderComponent,
    SingleEventHeroComponent,
    Divider,
  },
  data() {
    return {
      name: "",
      review: "",
      eventData: {},
      showAllAuthors: false, 
    };
  },
  async created() {
    const eventModel = new EventModel()
    //@ts-ignore
    this.eventData = (await eventModel.getOne(parseInt(this.$route.params.id))).getData()
    this.eventData.authors = JSON.parse(this.eventData.authors)
  },
  computed: {
    displayedAuthors() {
      //@ts-ignore
      return this.showAllAuthors ? this.eventData.authors : this.eventData.authors.slice(0, 5);
    },
  },
  methods: {
    async sendReview() {
      const reviewModel = new ReviewModel();
      const res = await reviewModel.create(new ReviewCreateDto(Date.now(), this.eventData.originalEventId, this.name, this.review))
      if (res.success) {
        //Успешное создание
      } else {
        //Говорим что все плохо, пусть чекнет поля или типо того 
      }
    },
    toggleAuthors() {
      this.showAllAuthors = !this.showAllAuthors;
    },
  },
};
</script>

<style scoped>
.content-section {
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.text-wrapper {
  display: flex;
  gap: 5rem;
}
.authors-col-wrapper {
    width: 60vw;
    gap: 2rem;
    display: flex;
    flex-direction: column;
}
.authors-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.job {
    font-size: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.name {
    font-size: 1.5rem;
    font-weight: 600;
}
.text {
    font-size: 1.5rem;
}
.text-input {
    border: 2px solid #000;
    height: 4.2rem;
    border-radius: 1rem;
    background: #fff;
    font-size: 1.5rem;
    padding: 0 2rem;
    width: 80%;
}
.text-area {
    border: 2px solid #000;
    height: 8.2rem;
    border-radius: 1rem;
    background: #fff;
    font-size: 1.5rem;
    padding: 0 2rem;
    padding-top: 1rem;
    width: 80%;
}
.heading {
    font-size: 3rem;
    line-height: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.send-button {
    color: #000;
    background-color: #f3ca00;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 40rem;
    width: max-content;
    font-size: 1.3rem;
    font-size: 1.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
}
.back-btn {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
}
.back-btn:hover {
    cursor: pointer;
}
.show-more-btn {
  font-size: 1rem;
  font-weight: 600;
  color: #f3ca00;
  cursor: pointer;
  text-align: left;
  margin-top: 1rem;
}
.show-more-btn:hover {
  text-decoration: underline;
}
/* Анимация для плавного появления/исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
