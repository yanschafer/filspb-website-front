import EventModel from "@/api/modules/event/event.model";
import { defineStore } from "pinia";

const useEventsStore = defineStore('events', {
    state: () => ({
        events: [],
        selectedTags: {},
        selectedPlatform: "",
        useFilters: false,
    }),
    getters: {
        getEvents: (state) => {
            console.log(state.events, state.useFilters, state.selectedTags, state.selectedPlatform)
            return state.events
                    .filter(el => !state.useFilters || Object.keys(state.selectedTags).length == 0 || 
                        el.tags.filter(t => state.selectedTags[t.id]).length == Object.keys(state.selectedTags).length
                    )
                    .filter(el => el.platformName == state.selectedPlatform || state.selectedPlatform == "")
        }
    },
    actions: {
        addTag(tag: string) {
            this.selectedTags[tag] = tag
        },
        removeTag(tag: string) {
            delete this.selectedTags[tag]
            this.useFilters = !(this.selectedTags.length == 0)
        },
        selectPlatform(platformName: string) {
            this.selectedPlatform = platformName
            console.log('Selected platform', this.selectedPlatform)
        },
        async loadLastFour() {
            const eventModel = new EventModel()
            this.useFilters = false
            this.events = []
            this.events = (await eventModel.getLastFour()).getData()
        },
        async updatePeriod(start: number = Date.now() - 30 * 24 * 60 * 60 * 1000, end: number = Date.now() + 30 * 24 * 60 * 60 * 1000) {
            const eventModel = new EventModel()
            this.useFilters = true
            this.event = []
            this.events = (await eventModel.getByPeriod(start, end)).getData()
        }
    }
})

export default useEventsStore