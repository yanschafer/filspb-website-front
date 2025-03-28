<template>
  <div class="event-hero-wrapper">
    <div class="event-hero-img-col">
      <img class="event-hero-img" :src="getImage(event.image)" />
    </div>
    <div class="event-hero-content">
      <div class="event-hero-header">
        <div class="event-hero-date-col">
          <h3 class="time">{{ event.time }}</h3>
          <h4 class="date">{{ formatDate(event.date) }}</h4>
        </div>
        <div class="event-hero-time-col">
          <h2 class="time-long">{{ event.eventTime }}</h2>
        </div>
      </div>
      <div class="event-hero-heading">
        <h1 class="heading">{{ event.name }}</h1>
      </div>
      <div class="event-hero-chips">
        <div class="chip" v-for="(chip, index) in event.tags" :key="index">
          {{ chip.name }}
        </div>
      </div>
      <div class="event-hero-place">
        <span class="place">{{ event.platformName }}</span>
      </div>
      <div class="event-hero-adress">
        <span class="adress">{{ event.platformAddress }}</span>
      </div>
      <div id="wb-button-root" class="wb-button-root" :data-performance_id="getPerformanceId(event.purchaseLink)">Купить билет</div>
    </div>
  </div>
</template>

<script lang="ts">
import appConf from '@/api/conf/app.conf';
import type EventDto from '@/api/modules/event/event.dto';

export default {
  name: "SingleEventHero",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log('Event soldOut status:', this.event.soldOut, typeof this.event.soldOut);
  },
  methods: {
    formatDate(timestamp: number) {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    },
    getImage(url: string) {
      if (!url) return null
      if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
      else return url
    },
    getPerformanceId(purchaseLink: string): string {
      return purchaseLink ? purchaseLink.replace('pl', '') : '';
    },
    buy(event: EventDto) {
      event.purchaseLink
    }
  }
};
</script>

<style scoped>
.event-hero-wrapper {
  background-color: #f3ca00;
  display: flex;
  height: 40rem;
  border-radius: 3rem;
  overflow: hidden;
}

.event-hero-img-col {
  width: 590px;
  min-width: 590px;
}

.event-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1378px){
  .event-hero-content {
    padding: 5rem 3rem!important;
  }
}

.event-hero-content {
  display: flex;
  flex-direction: column;
  padding: 5rem 7rem;
  width: 100%;
  justify-content: center;
  gap: 1rem;
}

.event-hero-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.time {
  font-size: 1.6rem;
  font-weight: 600;
}

.date {
  font-size: 1.5rem;
  font-weight: 600;
}

.time-long {
  font-size: 1.5rem;
  font-weight: 600;
}

.heading {
  font-size: 3rem;
  line-height: 3rem;
  font-weight: 700;
}

.event-hero-chips {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.chip {
  height: 2rem;
  border: 1px solid #000;
  font-size: 1.2rem;
  line-height: 2rem;
  padding: 0 1.1rem;
  border-radius: 1.8rem;
  font-family: 'Times', 'Georgia';
  font-weight: 400;
  display: inline-block;
  vertical-align: middle;
}

.event-hero-place {
  font-size: 1.3rem;
}

.event-hero-adress {
  font-size: 1.3rem;
}

#wb-button-root {
  font-size: 1.3rem!important;
  padding: 0.3rem 1rem 0.5rem!important;
  background-color: black!important;
  color: white!important;
  font-weight: 200!important;
  max-width: fit-content!important;
  border-radius: 40rem!important;
  border: 1px solid black!important;
  cursor: pointer!important;
  transition: all 0.3s ease-in-out!important;
}

#wb-button-root:hover {
  background: transparent;
  color: black;
}

@media screen and (max-width: 1024px) {
  .event-hero-wrapper {
    height: auto;
    flex-direction: column;
  }

  .event-hero-img-col {
    width: 100%;
    min-width: 100%;
    position: relative;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }

  .event-hero-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .event-hero-content {
    padding: 2rem;
  }

  .heading {
    font-size: 2.5rem;
    line-height: 2.8rem;
  }
}

@media screen and (max-width: 768px) {
  .event-hero-wrapper {
    border-radius: 2rem;
  }

  .event-hero-content {
    padding: 1.5rem;
  }

  .event-hero-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .heading {
    font-size: 2rem;
    line-height: 2.2rem;
  }

  .time, .date, .time-long {
    font-size: 1.2rem;
  }

  .chip {
    font-size: 1rem;
    height: 1.8rem;
    line-height: 1.8rem;
    padding: 0 0.8rem;
  }

  .event-hero-place,
  .event-hero-adress {
    font-size: 1.1rem;
  }

  .button {
    font-size: 1.1rem;
    padding: 0.2rem 0.8rem 0.4rem;
  }
}

@media screen and (max-width: 480px) {
  .event-hero-wrapper {
    border-radius: 1.5rem;
  }

  .event-hero-content {
    padding: 1rem;
  }

  .heading {
    font-size: 1.8rem;
    line-height: 2rem;
  }

  .time, .date, .time-long {
    font-size: 1.1rem;
  }
}

.button:hover {
  background: transparent;
  color: black;
}

@media screen and (max-width: 1024px) {
  .event-hero-wrapper {
    height: auto;
    flex-direction: column;
  }

  .event-hero-img-col {
    width: 100%;
    min-width: 100%;
    position: relative;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }

  .event-hero-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .event-hero-content {
    padding: 2rem;
  }

  .heading {
    font-size: 2.5rem;
    line-height: 2.8rem;
  }
}

@media screen and (max-width: 768px) {
  .event-hero-wrapper {
    border-radius: 2rem;
  }

  .event-hero-content {
    padding: 1.5rem;
  }

  .event-hero-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .heading {
    font-size: 2rem;
    line-height: 2.2rem;
  }

  .time, .date, .time-long {
    font-size: 1.2rem;
  }

  .chip {
    font-size: 1rem;
    height: 1.8rem;
    line-height: 1.8rem;
    padding: 0 0.8rem;
  }

  .event-hero-place,
  .event-hero-adress {
    font-size: 1.1rem;
  }

  .button {
    font-size: 1.1rem;
    padding: 0.2rem 0.8rem 0.4rem;
  }
}

@media screen and (max-width: 480px) {
  .event-hero-wrapper {
    border-radius: 1.5rem;
  }

  .event-hero-content {
    padding: 1rem;
  }

  .heading {
    font-size: 1.8rem;
    line-height: 2rem;
  }

  .time, .date, .time-long {
    font-size: 1.1rem;
  }
}
</style>
