import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/intro/IntroView.vue'
import SearchResultView from '../views/searchResult/searchResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IntroView
    },
    {
      path: '/searchResult',
      component: SearchResultView
    }
  ]
})

export default router
