<template>
  <section class="footer-section">
    <div class="footer-header">
    </div>
    <div class="content-row">
      <div class="info-col">
        <img class="logo" src="../assets/logo_osnovnoy_black.png" />
        <span class="title">
          <b>Государственная</b><br />
          <b>филармония</b><br />
          <nobr><b>Санкт-Петербурга</b></nobr><br />
          для детей и молодежи
        </span>
      </div>
      <div class="info-col qr-zone">
        <img class="qr-img" src="../assets/qr.png" />
        <span class="qr-subtitle">
          Оцените ФДМ!
        </span>
        <p class="qr-description">Ваше мнение формирует официальный рейтинг организации</p>
        <a class="qr-link" href="https://bus.gov.ru" target="_blank">bus.gov.ru</a> 
      </div>
      <div class="links-col">
        <div class="social-links">
          <div class="contrast-mode">
            <div class="eye-img-wrapper">
              <img class="eye-img" src="../assets/Icons/eye-solid.svg" />
            </div>
            <div @click="toggleContrastMode" class="contrast-mode-text">ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ</div>
          </div>
          <div class="links-group">
            <div @click="goTg" class="link-wrapper">
              <img class="icon" src="../assets/Icons/telegram.svg" />
            </div>
            <div @click="goVK" class="link-wrapper">
              <img class="icon" src="../assets/Icons/vk.svg" />
            </div>
          </div>
        </div>
        <span class="city">{{systemData.city}}</span>
        <a class="location-link">
          {{systemData.addressShort}}<br><span>(здание находится не капитальном ремонте)</span>
        </a>
        <a class="phone-link" :href="`telme:${systemData.name}`">
          {{systemData.name}}
        </a>
        <div class="nav-links-group">
          <a class="nav-link" @click="$router.push({path: '/documents'})">ДОКУМЕНТЫ</a>
          <a class="nav-link" href="https://zakupki.gov.ru/epz/main/public/home.html">ГОСЗАКАЗ</a>
          <a class="nav-link" @click="$router.push({path: '/contacts'})">КОНТАКТЫ</a>
        </div>
        <span>Разработала студия Волкова, 2024</span>
      </div>
    </div>

    <!-- Виджет Госуслуг -->
    <div class='gosuslugi-widget'>
      <div id='js-show-iframe-wrapper'>
        <div class='pos-banner-fluid bf-104'>
          <div class='bf-104__decor'>
            <div class='bf-104__logo-wrap'>
              <img class='bf-104__logo' src='https://pos.gosuslugi.ru/bin/banner-fluid/gosuslugi-logo-blue.svg'
                alt='Госуслуги' />
              <div class='bf-104__slogan'>Решаем вместе</div>
            </div>
          </div>
          <div class='bf-104__content'>
            <div class='bf-104__description'>
              <span class='bf-104__text'>
                Сложности с получением «Пушкинской карты» или приобретением билетов? Знаете, как улучшить работу учреждений культуры?
              </span>
              <span class='bf-104__text bf-104__text_small'>
                Напишите&nbsp;— решим!
              </span>
            </div>

            <div class='bf-104__bottom-wrap'>
              <div class='bf-104__btn-wrap'>
                <button class='pos-banner-btn_2' type='button'>Написать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useContrastStore } from "@/stores/contrastStore";
//@ts-nocheck
import SystemModel from '@/api/modules/system/system.model';

export default {
  name: "FooterComponent",
  data: () => ({
    systemData: {}
  }),
  async created() {
    const systemModel = new SystemModel()
    this.systemData = (await systemModel.getSystemData()).getData()
    const contrastStore = useContrastStore();
    contrastStore.initialize();
  },
  mounted() {
    // Инициализация виджета Госуслуг
    const script = document.createElement('script');
    script.textContent = `
      "use strict";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){_defineProperty(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var POS_PREFIX_104="--pos-banner-fluid-104__",posOptionsInitialBanner104={background:"transparent","content-bgc":"#FFFFFF","grid-template-columns":"100%","grid-template-rows":"264px auto","max-width":"1440px","text-font-size":"18px","text-small-font-size":"14px","text-margin":"0 0px 12px 0","description-margin":"0 0 16px 0","button-wrap-max-width":"245px","bg-url":"url('https://pos.gosuslugi.ru/bin/banner-fluid/100/banner-fluid-100-405.svg')","bg-url-position":"center center","content-padding":"36px 24px","logo-wrap-padding":"16px 12px 12px 12px","logo-width":"65px","logo-wrap-top":"0","slogan-font-size":"12px","logo-box-shadow":"none"},setStyles=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:POS_PREFIX_104;Object.keys(e).forEach((function(r){t.style.setProperty(n+r,e[r])}))},removeStyles=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:POS_PREFIX_100;Object.keys(e).forEach((function(e){t.style.removeProperty(n+e)}))};function changePosBannerOnResize(){var e=document.documentElement,t=_objectSpread({},posOptionsInitialBanner104),n=document.getElementById("js-show-iframe-wrapper"),r=n?n.offsetWidth:document.body.offsetWidth;r>499&&(t["bg-url"]="url('https://pos.gosuslugi.ru/bin/banner-fluid/100/banner-fluid-100-500.svg')"),r>584&&(t["grid-template-rows"]="auto",t["bg-url"]="url('https://pos.gosuslugi.ru/bin/banner-fluid/100/banner-fluid-100-273.svg')",t["text-font-size"]="20px",t["content-padding"]="46px 24px 46px 24px",t["grid-template-columns"]="53% 47%",t["content-grid-row"]="1"),r>649&&(t["bg-url"]="url('https://pos.gosuslugi.ru/bin/banner-fluid/100/banner-fluid-100-558.svg')"),r>799&&(t["text-font-size"]="20px",t["text-small-font-size"]="16px",t["bg-url"]="url('https://pos.gosuslugi.ru/bin/banner-fluid/100/banner-fluid-100-500.svg')"),r>1115&&(t["text-font-size"]="24px",t["text-small-font-size"]="18px",t["content-padding"]="46px 80px 46px 140px",t["bg-url"]="url('https://pos.gosuslugi.ru/bin/banner-fluid/100/banner-fluid-100-720.svg')"),setStyles(t,e)}changePosBannerOnResize(),window.addEventListener("resize",changePosBannerOnResize),window.onunload=function(){var e=document.documentElement,t=_objectSpread({},posOptionsInitialBanner104);window.removeEventListener("resize",changePosBannerOnResize),removeStyles(t,e)};
      Widget("https://pos.gosuslugi.ru/form", 337885);
    `;
    document.body.appendChild(script);
  },
  methods: {
    toggleContrastMode() {
      const contrastStore = useContrastStore();
      contrastStore.toggleContrastMode();
    },
    goTg() {
      window.location = this.systemData.telegram
    },
    goVK() {
      window.location = this.systemData.vk
    }
  }
};
</script>


<style scoped>
.location-link {
    text-align: right;
}
.nav-link {
    font-weight: 600;
    cursor: pointer;
}
.nav-links-group {
    display: flex;
    gap: 2rem;
    font-weight: 700;
}
.links-col {
  display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: flex-end;
    align-items: end;
    flex: 1;
    max-width: 400px;
    min-width: 300px;
}
.city {
    font-weight: 600;
    font-size: 1.5rem;
}
.social-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}
.link-wrapper {
    display: flex;
}
a {
    text-decoration: none;
    color: black;
    font-weight: 500;
}
.footer-section {
  background-color: #fbc800;
  padding-right: 5rem;
  padding-left: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  padding-top: 2rem;
}
.links-group {
    display: flex;
    gap: 1rem;
}
.footer-header {
  display: flex;
  justify-content: flex-end;
}
.content-row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.logo {
  width: 100%;
  max-width: 200px;
}
.title {
  font-size: 3rem;
  line-height: 3rem;
}
.qr-zone {
  text-align: center;
  gap: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.qr-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
}
.qr-description {
    font-size: 1rem;
}
.qr-link {
    font-size: 1rem;
}
.qr-img {
  width: 100%;
  max-width: 200px;
  border-radius: 1rem;
}
.icon {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    cursor: pointer;
}
.info-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  max-width: 400px;
  min-width: 300px;
}
.contrast-mode {
    display: flex;
    gap: 1rem;
    align-items: center;
}
.contrast-mode-text {
    font-weight: 500;
    cursor: pointer;
}
.eye-img {
        width: 100%;
        max-width: 20px;
    }
    .eye-img-wrapper {
    display: flex;
    justify-content: center;
}

@media (max-width: 1200px) {
  .content-row {
    flex-wrap: wrap;
    justify-content: center;
  }

  .info-col, .links-col {
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .info-col, .links-col {
    min-width: 100%;
    align-items: center;
    text-align: center;
  }

  .links-col {
    align-items: center;
  }

  .location-link {
    text-align: center;
  }
}
/* Стили для виджета Госуслуг */
.gosuslugi-widget {
  margin-top: 2rem;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
}

#js-show-iframe-wrapper{position:relative;display:flex;align-items:center;justify-content:center;width:100%;min-width:293px;max-width:100%;background:linear-gradient(138.4deg,#38bafe 26.49%,#2d73bc 79.45%);color:#fff;cursor:pointer}#js-show-iframe-wrapper .pos-banner-fluid *{box-sizing:border-box}#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2{display:block;width:240px;min-height:56px;font-size:18px;line-height:24px;cursor:pointer;background:#0d4cd3;color:#fff;border:none;border-radius:8px;outline:0}#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2:hover{background:#1d5deb}#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2:focus{background:#2a63ad}#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2:active{background:#2a63ad}

#js-show-iframe-wrapper{background:var(--pos-banner-fluid-104__background)}#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2{width:100%;min-height:52px;background:#0d4cd3;color:#fff;font-size:16px;font-family:LatoWeb,sans-serif;font-weight:400;padding:0;line-height:1.2}#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2:active,#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2:focus,#js-show-iframe-wrapper .pos-banner-fluid .pos-banner-btn_2:hover{background:#1d5deb}#js-show-iframe-wrapper .bf-104{position:relative;display:grid;grid-template-columns:var(--pos-banner-fluid-104__grid-template-columns);grid-template-rows:var(--pos-banner-fluid-104__grid-template-rows);width:100%;max-width:var(--pos-banner-fluid-104__max-width);box-sizing:border-box;grid-auto-flow:row dense}#js-show-iframe-wrapper .bf-104__decor{background:var(--pos-banner-fluid-104__bg-url) var(--pos-banner-fluid-104__bg-url-position) no-repeat;background-size:cover;background-color:#f8efec;position:relative}#js-show-iframe-wrapper .bf-104__content{display:flex;flex-direction:column;padding:var(--pos-banner-fluid-104__content-padding);grid-row:var(--pos-banner-fluid-104__content-grid-row);background-color:var(--pos-banner-fluid-104__content-bgc)}#js-show-iframe-wrapper .bf-104__description{display:flex;flex-direction:column;margin:var(--pos-banner-fluid-104__description-margin)}#js-show-iframe-wrapper .bf-104__text{margin:var(--pos-banner-fluid-104__text-margin);font-size:var(--pos-banner-fluid-104__text-font-size);line-height:1.3;font-family:LatoWeb,sans-serif;font-weight:700;color:#0b1f33}#js-show-iframe-wrapper .bf-104__text_small{font-size:var(--pos-banner-fluid-104__text-small-font-size);font-weight:400;margin:0}#js-show-iframe-wrapper .bf-104__bottom-wrap{display:flex;flex-direction:row;align-items:center}#js-show-iframe-wrapper .bf-104__logo-wrap{box-shadow:var(--pos-banner-fluid-104__logo-box-shadow);position:absolute;top:var(--pos-banner-fluid-104__logo-wrap-top);left:0;padding:var(--pos-banner-fluid-104__logo-wrap-padding);background:#fff;border-radius:0 0 8px}#js-show-iframe-wrapper .bf-104__logo{width:var(--pos-banner-fluid-104__logo-width);margin-left:1px}#js-show-iframe-wrapper .bf-104__slogan{font-family:LatoWeb,sans-serif;font-weight:700;font-size:var(--pos-banner-fluid-104__slogan-font-size);line-height:1;color:#005ca9}#js-show-iframe-wrapper .bf-104__btn-wrap{width:100%;max-width:var(--pos-banner-fluid-104__button-wrap-max-width)}

</style>
