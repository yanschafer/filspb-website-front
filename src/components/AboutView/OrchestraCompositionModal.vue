<template>
  <Dialog 
    v-model:visible="visible" 
    modal 
    header="Состав оркестров"
    :style="{ width: '90vw', maxWidth: '1200px' }"
    class="orchestra-modal"
  >
    <div class="orchestra-tabs">
      <TabView>
        <TabPanel>
          <template #header>
            <span>Симфонический оркестр "Таврический"</span>
          </template>
          <div class="orchestra-sections">
            <div class="inspector-section">
              <div class="musician-item">
                <div class="position">Инспектор творческого коллектива</div>
                <div class="name">Воробьев С.Р.</div>
              </div>
            </div>
            <Accordion>
              <AccordionTab v-for="section in tavricheskyOrchestra" :key="section.name" :header="section.name">
                <div class="musicians-list">
                  <div v-for="musician in section.musicians" :key="musician.name" class="musician-item">
                    <div class="position">{{ musician.position }}</div>
                    <div class="name">{{ musician.name }}</div>
                  </div>
                  <div class="section-total">{{ section.total }}</div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <span>Симфонический оркестр "ФДМ"</span>
          </template>
          <div class="orchestra-sections">
            <Accordion>
              <AccordionTab v-for="section in fdmOrchestra" :key="section.name" :header="section.name">
                <div class="musicians-list">
                  <div v-for="musician in section.musicians" :key="musician.name" class="musician-item">
                    <div class="position">{{ musician.position }}</div>
                    <div class="name">{{ musician.name }}</div>
                  </div>
                  <div class="section-total">{{ section.total }}</div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <span>Концертмейстеры</span>
          </template>
          <div class="musicians-list">
            <div v-for="musician in concertmasters" :key="musician.name" class="musician-item">
              <div class="position">{{ musician.position }}</div>
              <div class="name">{{ musician.name }}</div>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const visible = ref(false);

const tavricheskyOrchestra = [
  {
    name: "Первые скрипки",
    musicians: [
      { position: "Артист оркестра 1-ые скрипка-Концертмейстер", name: "Мальцева Д.К." },
      { position: "Артист оркестра 1-ые скрипка", name: "Суботняя Н.Л." },
      { position: "Артист оркестра 1-ые скрипка", name: "Таманьян А.М." },
      { position: "Артист оркестра 1-ые скрипка", name: "Герман Е.Ю." },
      { position: "Артист оркестра 1-ые скрипка", name: "Востокова Е.С." },
      { position: "Артист оркестра 1-ые скрипка", name: "Кашковская Т.В." },
      { position: "Артист оркестра 1-ые скрипка", name: "Клен А.В." },
      { position: "Артист оркестра 1-ые скрипка", name: "Свидунович А.И." },
      { position: "Артист оркестра 1-ые скрипка", name: "Яговдик Н.А." }
    ]
  },
  {
    name: "Вторые скрипки",
    musicians: [
      { position: "Артист оркестра 2-ые скрипка-Концертмейстер", name: "Писарева Т.В." },
      { position: "Артист оркестра 2-ые скрипка-Заместитель концертмейстера", name: "Борисочкина В.В." }
    ]
  },
  {
    name: "Альты",
    musicians: [
      { position: "Артист оркестра Альт-Концертмейстер", name: "Лагута Т.В." },
      { position: "Артист оркестра Альт", name: "Черников И.Ю." },
      { position: "Артист оркестра Альт", name: "Василевская О.В." },
      { position: "Артист оркестра Альт", name: "Цеван М.В." }
    ]
  },
  {
    name: "Виолончели",
    musicians: [
      { position: "Артист оркестра Виолончель-Концертмейстер", name: "Усович Е.К." },
      { position: "Артист оркестра Виолончель-Заместитель концертмейстера", name: "Батырова Е.А." },
      { position: "Артист оркестра Виолончель", name: "Андреев А.А." },
      { position: "Артист оркестра Виолончель", name: "Алтухов К.В" },
      { position: "Артист оркестра Виолончель", name: "Лыков А.Д." },
      { position: "Артист оркестра Виолончель", name: "Сагайдо О.Н." }
    ]
  },
  {
    name: "Контрабасы",
    musicians: [
      { position: "Артист оркестра Контрабас-Заместитель концертмейстера", name: "Ленц А.А." },
      { position: "Артист оркестра Контрабас", name: "Корзун М.Н." },
      { position: "Артист оркестра Контрабас", name: "Высоцкий В.Д." },
      { position: "Артист оркестра Контрабас", name: "Хотунцов А.А." }
    ]
  },
  {
    name: "Флейты",
    musicians: [
      { position: "Артист оркестра Флейта-Концертмейстер", name: "Резетдинова Т.Л." },
      { position: "Артист оркестра Флейта-Заместитель концертмейстера", name: "Журавлева М.Н." }
    ]
  },
  {
    name: "Гобои",
    musicians: [
      { position: "Артист оркестра Гобой-Заместитель концертмейстера", name: "Платонова А.З." },
      { position: "Артист оркестра Гобой", name: "Кузнецова А.В" },
      { position: "Артист оркестра Гобой", name: "Никольская А.И." }
    ]
  },
  {
    name: "Кларнеты",
    musicians: [
      { position: "Артист оркестра Кларнет-Концертмейстер", name: "Ерофеев Р.В." },
      { position: "Артист оркестра Кларнет", name: "Ермолаев М.Н." },
      { position: "Артист оркестра Кларнет", name: "Колбая Г.А." },
      { position: "Артист оркестра Кларнет", name: "Полюга А.В" }
    ]
  },
  {
    name: "Фаготы",
    musicians: [
      { position: "Артист оркестра Фагот", name: "Леонтьев Б.И." },
      { position: "Артист оркестра Фагот", name: "Соколов Ф.С." },
      { position: "Артист оркестра Фагот", name: "Скоморов В.Н." },
      { position: "Артист оркестра Фагот", name: "Комаров Н.Н." }
    ]
  },
  {
    name: "Трубы",
    musicians: [
      { position: "Артист оркестра Труба-Концертмейстер", name: "Щербаков А.С." },
      { position: "Артист оркестра Труба (солист)", name: "Приходченко А.А." }
    ]
  },
  {
    name: "Валторны",
    musicians: [
      { position: "Артист оркестра Валторна", name: "Федоров П.М." },
      { position: "Артист оркестра Валторна", name: "Еремин Е.В." },
      { position: "Артист оркестра Валторна", name: "Герасимов А.И." },
      { position: "Артист оркестра Валторна", name: "Евграфов Н.А." },
      { position: "Артист оркестра Валторна", name: "Дубков О.Б." },
      { position: "Артист орекстра Валторна", name: "Ревацкий В." }
    ]
  },
  {
    name: "Тромбоны и Тубы",
    musicians: [
      { position: "Артист оркестра Тромбон", name: "Иванченко А.А." },
      { position: "Артист оркестра Тромбон", name: "Пацюк В.Д." },
      { position: "Артист оркестра Туба", name: "Бляха И.О." },
      { position: "Артист оркестра Туба", name: "Ряднов В.А." }
    ]
  },
  {
    name: "Ударные",
    musicians: [
      { position: "Артист оркестра Ударные-Концертмейстер", name: "Козиев А.В." },
      { position: "Артист оркестра Ударные", name: "Дмитриев Е.В." },
      { position: "Артист оркестра Ударные", name: "Регонен А.В." },
      { position: "Артист оркестра Ударные", name: "Савин Д.А." },
      { position: "Артист оркестра Ударные", name: "Нестеров А.А." },
      { position: "Артист оркестра Ударные", name: "Головина Е.В." }
    ]
  },
  {
    name: "Клавишные и Саксофон",
    musicians: [
      { position: "Артист оркестра Рояль", name: "Брилевская Л.А." },
      { position: "Артист оркестра Саксофон", name: "Соколов А.В." },
      { position: "Артист оркестра (солист)", name: "Гайворонский Д.Б." }
    ]
  },
  {
    name: "Арфы",
    musicians: [
      { position: "Артист оркестра Арфа", name: "Резетдинова О.Л." },
      { position: "Артист оркестра Арфа", name: "Филатова Я.А." }
    ]
  }
];

const fdmOrchestra = [
  {
    name: "Первые скрипки",
    musicians: [
      { position: "Артист оркестра 1-ые скрипка", name: "Черникова Г.В." },
      { position: "Артист оркестра 1-ые скрипка", name: "Залуская Т.В." },
      { position: "Артист оркестра 1-ые скрипка", name: "Маньковский А.А." }
    ]
  },
  {
    name: "Вторые скрипки",
    musicians: [
      { position: "Артист оркестра 2-ые скрипка", name: "Власенко Т.В." },
      { position: "Артист оркестра 2-ые скрипка", name: "Раковец Н.А." },
      { position: "Артист оркестра 2-ые скрипка", name: "Серебреникова Н.Ю." },
      { position: "Артист оркестра 2-ые скрипка", name: "Кулешова Е.В." },
      { position: "Артист оркестра 2-ые скрипка", name: "Измайлова В.В." },
      { position: "Артист оркестра 2-ые скрипка", name: "Соколова В.К." }
    ]
  },
  {
    name: "Альты",
    musicians: [
      { position: "Артист оркестра Альт-Заместитель концертмейстера", name: "Прийма Е.А." },
      { position: "Артист оркестра Альт", name: "Соболевский К.А." },
      { position: "Артист оркестра Альт", name: "Гудкин В.А." }
    ]
  },
  {
    name: "Виолончели",
    musicians: [
      { position: "Артист оркестра Виолончель", name: "Зорич Ю.В." },
      { position: "Артист оркестра Виолончель", name: "Красовский Я.В." },
      { position: "Артист оркестра Виолончель", name: "Шпади А.А." }
    ]
  },
  {
    name: "Контрабасы",
    musicians: [
      { position: "Артист оркестра Контрабас-Концертмейстер", name: "Залуский А.В." },
      { position: "Артист оркестра Контрабас", name: "Бровкович В.М." },
      { position: "Артист оркестра Контрабас", name: "Габитов В.Е." }
    ]
  },
  {
    name: "Флейты",
    musicians: [
      { position: "Артист оркестра Флейта", name: "Васильева О.Е." },
      { position: "Артист оркестра Флейта", name: "Фоканова И.А." }
    ]
  },
  {
    name: "Гобои",
    musicians: [
      { position: "Артист оркестра Гобой-Концертмейстер", name: "Забайкин И.В." }
    ]
  },
  {
    name: "Кларнеты",
    musicians: [
      { position: "Артист оркестра Кларнет-Заместитель концертмейстера", name: "Дудин Д.А." }
    ]
  },
  {
    name: "Фаготы",
    musicians: [
      { position: "Артист оркестра Фагот", name: "Ганусевич С." },
      { position: "Артист оркестра Фагот", name: "Никитченко Д.О." }
    ]
  },
  {
    name: "Трубы",
    musicians: [
      { position: "Артист оркестра Труба", name: "Андреев А.В." },
      { position: "Артист оркестра Труба", name: "Ситников Е.В." },
      { position: "Артист оркестра Труба", name: "Чернолихов Д.А." }
    ]
  },
  {
    name: "Валторны",
    musicians: [
      { position: "Артист оркестра Валторна", name: "Кононко А.В." },
      { position: "Артист оркестра Валторна", name: "Суровягина Д.О." }
    ]
  },
  {
    name: "Тромбоны",
    musicians: [
      { position: "Артист оркестра Тромбон-Концертмейстер", name: "Востриков И.В." },
      { position: "Артист оркестра Тромбон-Заместитель Концертмейстер", name: "Богданов А.М." },
      { position: "Артист оркестра Тромбон", name: "Баринов Н.А." }
    ]
  },
  {
    name: "Клавишные",
    musicians: [
      { position: "Артист оркестра Рояль", name: "Шапорев О.С." }
    ]
  }
];

const concertmasters = [
  { position: "Концертмейстер", name: "Грачева Н.М." },
  { position: "Концертмейстер", name: "Шапорев О." },
  { position: "Аккомпаниатор", name: "Розенберг О.М." },
  { position: "Аккомпаниатор-концертмейстер", name: "Домбровская Е.С." }
];

defineExpose({
  show: () => {
    visible.value = true;
  },
  hide: () => {
    visible.value = false;
  }
});
</script>

<style scoped>
.orchestra-modal {
  :deep(.p-dialog-content) {
    padding: 2rem;
  }
}

.orchestra-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.inspector-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.musicians-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.musician-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.position {
  font-size: 0.9em;
  color: #666;
}

.name {
  font-size: 1.1em;
  font-weight: 500;
  margin-top: 0.25rem;
}

.section-total {
  margin-top: 1rem;
  font-weight: 600;
  color: #333;
  font-style: italic;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
}

:deep(.p-accordion) {
  .p-accordion-header {
    .p-accordion-header-link {
      padding: 1rem;
      font-weight: 600;
    }
  }

  .p-accordion-content {
    padding: 1.5rem;
  }
}

:deep(.p-tabview) {
  .p-tabview-nav {
    li {
      .p-tabview-nav-link {
        padding: 1rem;
      }
    }
  }

  .p-tabview-panels {
    padding: 2rem;
  }
}
</style>
