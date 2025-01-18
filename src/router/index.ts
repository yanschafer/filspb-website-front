import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '@/views/EventsView.vue'
import ContactsView from '@/views/ContactsView.vue'
import AboutView from '@/views/AboutView.vue'
import SingleEventView from '@/views/SingleEventView.vue'
import SingleArticleView from '@/views/SingleArticleView.vue'
import SearchView from '@/views/SearchView.vue'
import NewsView from '@/views/NewsView.vue'
import DocumentView from '@/views/DocumentView.vue'

const router = createRouter({
  history: createWebHistory('/filspb/'),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/event/:id',
      name: 'single-event',
      component: SingleEventView,
    },
    {
      path: '/article/:id',
      name: 'single-article',
      component: SingleArticleView,
    },
    {
      path: '/search/:query',
      name: 'search',
      component: SearchView
    },
    {
      path: '/documents',
      name: 'documents',
      component: DocumentView
    }
  ],
})

export default router
