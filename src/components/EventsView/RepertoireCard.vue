<template>
    <div class="card-wrapper">
      <div class="img-wrapper">
        <img class="card-img" :src="getImage(cardData.image)" />
      </div>
      <h3 class="heading">{{ cardData.name }}</h3>
      <p class="description" v-html="cardData.shortDescription"></p>
    </div>
  </template>
  
  <script lang="ts">
  import appConf from '@/api/conf/app.conf';
  
  export default {
    name: "EventCard",
    props: {
      repertoire: {
        type: Boolean,
        default: false
      },
      cardData: {
        type: Object,
        required: true,
      },
      isOutdated: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      goTo(eventId: number) {
        this.$router.push({path: `/event/${eventId}`})
      },
      getImage(url: string) {
        if (!url) return ""
        if (url[0] == "/") return `${appConf.proto}://${appConf.endpoint}/files${url}`
        else return url
      }
    }
  };
  </script>
  
  <style scoped>
  .card-wrapper {
    width: 20rem;
    height: 100%;
    min-height: 40rem;
    padding: 1rem 1rem 2rem 1rem;
    background: #f3f3f3;
    border-radius: 2rem;
    position: relative;
    overflow: hidden;
    filter: none;
    transition: filter 0.3s;
  }
  
  .card-wrapper.outdated {
    filter: grayscale(100%);
    pointer-events: none;
  }
  
  .overlay {
    padding: 1rem 1rem 2rem 1rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fbc800;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;
  }
  
  .card-wrapper:hover .overlay {
    opacity: 1;
    visibility: visible;
  }
  
  .overlay-button {
    padding: 1rem 2rem;
    background-color: #000;
    color: #fff;
    width: 100%;
    border: none;
    border-radius: 40rem;
    cursor: pointer;
    border: 2px solid black;
    font-size: 1.2rem;
    transition: all 0.3s ease-in-out;
  }
  
  .overlay-button:hover {
    background-color: transparent;
    border: 2px solid black;
    color: black;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
  }
  
  .header-col {
    display: flex;
    flex-direction: column;
  }
  
  .clock-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .clock-text {
    font-weight: 500;
  }
  
  .date {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1em;
  }
  
  .time {
    font-size: 2.5rem;
    font-weight: 600;
  }
  
  .img-wrapper {
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 12rem; 
    overflow: hidden; 
    border-radius: 1rem;
  }
  
  .card-img {
    width: 100%;
    border-radius: 1rem;
  }
  
  .heading {
    font-size: 2rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  .description {
    font-size: 1.1rem;
  }
  
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  
  .chip {
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 40rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0.5rem;
    padding-top: 0.3rem;
    font-size: 17px;
    text-align: center;
    width: 100%;
    max-width: fit-content;
  }
  </style>
  