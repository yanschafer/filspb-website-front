import EventModel from "@/api/modules/event/event.model";
import { defineStore } from "pinia";

const useEventsStore = defineStore('events', {
    state: () => ({
        events: [],
        selectedTags: {}
    }),
    getters: {
        getEvents: (state) => state.events.filter(el => el.tags.filter(t => state.selectedTags[t] != null).length > 0)
    },
    actions: {
        addTag(tag: string) {
            this.selectedTags[tag] = tag
        },
        removeTag(tag: string) {
            delete this.selectedTags[tag]
        },
        async loadLastFour() {
            const eventModel = new EventModel()
            this.event = []
            this.events = (await eventModel.getLastFour()).getData()
        },
        async updatePeriod(start: number, end: number) {
            const eventModel = new EventModel()
            this.event = []
            this.events = (await eventModel.getByPeriod(start, end)).getData()
        }
    }
})

export default useEventsStore