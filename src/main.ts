import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import 'animate.css';

import App from './App.vue'
import router from './router'
const russianLocale = {
    accept: 'Принять',
    reject: 'Отклонить',
    choose: 'Выбрать',
    upload: 'Загрузить',
    cancel: 'Отменить',
    dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthNames: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ],
    monthNamesShort: [
      "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
      "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
    ],
    today: 'Сегодня',
    clear: 'Очистить',
    weekHeader: 'Нед',
    dateFormat: 'dd.mm.yy',
    firstDayOfWeek: 1,
  };

const app = createApp(App)
const FilSpb = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{amber.50}',
            100: '{amber.100}',
            200: '{amber.200}',
            300: '{amber.300}',
            400: '{amber.400}',
            500: '{amber.500}',
            600: '{amber.600}',
            700: '{amber.700}',
            800: '{amber.800}',
            900: '{amber.900}',
            950: '{amber.950}'
        }
    }
})
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    locale: russianLocale,
    theme: {
        preset: FilSpb
    }
});

app.mount('#app')
