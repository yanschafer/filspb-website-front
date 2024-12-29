<template>
  <div class="page-header-wrapper">
    <div class="page-header-col">
      <div class="heading-row">
        <div class="page-header-col">
          <a @click="$router.push({path: '/'})" class="logo-link">
            <b>Государственная филармония</b><br />
            <nobr><b>Санкт-Петербурга</b></nobr> <br />для детей и молодежи
          </a>
          <h1 class="heading">{{ title }}</h1>
        </div>
        <img class="heading-img" :src="imgSrc" alt="Header Image" />
      </div>
    </div>
    <div class="page-header-col">
      <div class="nubmer-wrapper">
        <span class="number-heading">
          Касса
          <a :href="`telme:${systemData.name}`" class="number-link">{{systemData.name}}</a>
        </span>
      </div>
    </div>
    <div v-if="utils" class="page-header-col">
        <Select v-model="selectedLocation" @update:modelValue="platformSelection" :options="locations" filter optionLabel="name" placeholder="все площадки" class="w-full md:w-56" />
    </div>
    <div v-if="utils" class="page-header-col">
      <DatePicker v-model="dates" @update:modelValue="datesSelection" selectionMode="range" placeholder="дата" :manualInput="false" class="w-full md:w-56" />
    </div>
  </div>
</template>


<script lang="ts">
import PlatformModel from '@/api/modules/platform/platform.model';
import SystemModel from '@/api/modules/system/system.model';
import useEventsStore from '@/stores/events';
import { Select, DatePicker } from 'primevue';
export default {
  name: "PageHeaderComponent",
  components: {Select, DatePicker},
  props: {
    title: {
      type: String,
      required: true,
      default: "Афиша", 
    },
    imgSrc: {
      type: String,
      required: true,
      default: "../assets/CircleImages/3.png", 
    },
    utils: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    return {
      eventStore: useEventsStore()
    }
  },
  data: () => ({
    dates: null,
    selectedLocation: null,
    prevLocation: null,
    locations: [],
    systemData: {}
  }),
  async created() {
    const systemModel = new SystemModel()
    const platformModel = new PlatformModel()
    //@ts-ignore
    this.systemData = (await systemModel.getSystemData()).getData()
    this.locations = (await platformModel.getAll()).getData()
  },
  methods: {
    platformSelection() {
      if (this.selectedLocation == this.prevLocation) {
        this.eventStore.selectPlatform("")
        this.selectedLocation = null
      } else {
        this.eventStore.selectPlatform(this.selectedLocation.name)
      }
      this.prevLocation = this.selectedLocation
    },
    datesSelection(data) {
      if (data[0] == null && data[1] == null) return this.eventStore.updatePeriod()
      if (data[0] == null || data[1] == null) return

      const start = data[0].getTime()
      const end = data[1].getTime()
      this.eventStore.updatePeriod(start, end)
    }
  }
};
</script>


<style scoped>
.logo-link {
  font-size: 1.3rem;
}
.page-header-wrapper {
  display: flex;
  width: 100%;
  gap: 2rem;
  padding-right: 5rem;
  padding-left: 5rem;
  margin-bottom: 2rem;
}
.page-header-col {
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.heading-row {
  display: flex;
  align-items: end;
}
.heading {
  font-size: 6rem;
}
.heading-img {
  width: 10vw;
}
.number-heading {
  font-size: 2rem;
}
.number-link {
  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in-out;
}
.number-link:hover {
  color: #f3ca00;
}
:deep(.p-select) {
    border-bottom: 2px solid black;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-radius: 0;
}
:deep(.p-select-label.p-placeholder) {
    color: black;
    font-weight: 600;
}
:deep(.p-select-dropdown) {
    color: black;
}
:deep(.p-datepicker-input) {
  border-bottom: 2px solid black;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-radius: 0;
    color: black!important;
}
:deep(.p-datepicker-input.p-placeholder) {
  color: black;
  font-weight: 600;
}
:deep(.p-datepicker-input.p-placeholder) {
  color: black !important;
  font-weight: 600 !important;
}
</style>
<style>
.p-datepicker-input.p-placeholder {
  color: black !important;
  font-weight: 600 !important;
}
</style>