<script lang="ts">
import useEventsStore from '@/stores/events';
import { Select } from 'primevue';

export default {
  name: "ChipsFilter",
  props: {
    chips: {
      type: Array,
      required: true, 
    },
  },
  setup() {
    return {
      eventsStore: useEventsStore()
    }
  },
  methods: {
    select(chip) {
      if (chip.selected) {
        chip.selected = false
        this.eventsStore.removeTag(chip.id)
      } else {
        chip.selected = true
        this.eventsStore.addTag(chip.id)
      }
    }
  }
};
</script>

<template>
  <div class="chips-row">
    <div @click="select(chip)" class="chip" :class="{'chip-active': chip.selected}" v-for="(chip, index) in chips" :key="index">
      <span class="chip-text">{{ chip.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.chips-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem; 
  margin-bottom: 1rem;
}
.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 40rem;
  border: 2px solid black;
  padding: 1rem;
  height: 30px;
  cursor: pointer;
  transition-duration: .3s;
}
.chip-active {
  background-color: #fbc800;
}
.chip-text {
  color: black;
  font-weight: 600;
}
</style>
