import EventModel from "@/api/modules/event/event.model";
import { defineStore } from "pinia";

const useEventsStore = defineStore('events', {
    state: () => ({
        events: [],
        selectedTags: {},
        selectedPlatform: "",
        useFilters: false,
        isDateFiltered: false,
        isLoading: false,
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
            this.isLoading = true
            try {
                // Загружаем все события за ближайшие 90 дней
                const allEvents = (await eventModel.getByPeriod(
                    Date.now(),
                    Date.now() + 90 * 24 * 60 * 60 * 1000
                )).getData()

                // Сортируем по дате (ближайшие первыми)
                const sortedEvents = allEvents.sort((a, b) => {
                    const dateA = new Date(a.date).getTime()
                    const dateB = new Date(b.date).getTime()
                    return dateA - dateB
                })

                // Берем только первые 4 события
                this.events = sortedEvents.slice(0, 4)
            } finally {
                this.isLoading = false
            }
        },
        async updatePeriod(start: number = Date.now() - 30 * 24 * 60 * 60 * 1000, end: number = Date.now() + 90 * 24 * 60 * 60 * 1000) {
            const eventModel = new EventModel()
            this.useFilters = true
            this.isDateFiltered = true
            this.isLoading = true
            try {
                const newEvents = (await eventModel.getByPeriod(start, end)).getData()
                this.events = newEvents
            } finally {
                this.isLoading = false
            }
        }
    }
})

export default useEventsStore