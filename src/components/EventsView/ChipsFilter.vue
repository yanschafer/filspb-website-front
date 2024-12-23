<script lang="ts">
export default {
  name: "ChipsFilter",
  props: {
    chips: {
      type: Array,
      required: true, 
    },
  },
};
</script>

<template>
  <div class="chips-row">
    <div class="chip" v-for="(chip, index) in chips" :key="index">
      <span class="chip-text">{{ chip }}</span>
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
}
.chip-text {
  color: black;
  font-weight: 600;
}
</style>
