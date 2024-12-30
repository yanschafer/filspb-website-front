import { defineStore } from "pinia";

export const useContrastStore = defineStore("contrast", {
  state: () => ({
    isContrastMode: false, // Состояние режима для слабовидящих
    isOverlayVisible: false, // Состояние видимости оверлея
  }),
  actions: {
    toggleContrastMode() {
      this.isContrastMode = !this.isContrastMode;
      this.isOverlayVisible = true; // Показать оверлей

      if (this.isContrastMode) {
        this.applyContrastMode();
      } else {
        this.removeContrastMode();
      }

      // Сохранить состояние в localStorage
      localStorage.setItem("contrastMode", this.isContrastMode.toString());

      // Перезагрузить страницу с задержкой, чтобы оверлей исчез
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Даем время на анимацию (1 секунда)
    },
    applyContrastMode() {
      const body = document.body;

      // Убрать элементы
      document.querySelectorAll(".hero-img, .slide-img-col, .heading-img").forEach(el => el.classList.add("hidden"));

      // Установить белый фон
      document.querySelectorAll(".news-section, .footer-section, .event-hero-wrapper").forEach(el => {
        el.style.backgroundColor = "white";
      });

      document.querySelectorAll(".send-button").forEach(el => {
        el.style.backgroundColor = "white";
        el.style.border = '2px solid black';
      });

      // Заменить все background-color: #fbc800 на white
      document.querySelectorAll("*").forEach(el => {
        if (getComputedStyle(el).backgroundColor === "rgb(251, 200, 0)") {
          el.style.backgroundColor = "white";
        }
      });

      // Убрать анимации
      document.querySelectorAll(".animate__animated").forEach(el => el.classList.remove("animate__animated"));

      // Применить grayscale
      body.style.filter = "grayscale(1)";
    },
    removeContrastMode() {
      const body = document.body;

      // Восстановить стандартный режим
      document.querySelectorAll(".hero-img, .slide-img-col").forEach(el => el.classList.remove("hidden"));
      document.querySelectorAll(".news-section, .footer-section").forEach(el => {
        el.style.backgroundColor = "";
      });
      document.querySelectorAll("*").forEach(el => {
        el.style.backgroundColor = "";
      });

      // Убрать grayscale
      body.style.filter = "";
    },
    // Метод для инициализации состояния при загрузке страницы
    initialize() {
      const savedContrastMode = localStorage.getItem("contrastMode");
      if (savedContrastMode === "true") {
        this.isContrastMode = true;
        this.applyContrastMode();
      }
    },
  },
});
