import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/intro/IntroView.vue'
import SearchResultView from '../views/search-result/SearchResultView.vue'
import PersonInfoView from '../views/admin/PersonInfoView.vue'
import SearchView from '../views/search/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IntroView
    },
    {
      path: '/search_result',
      component: SearchResultView
    },
    {
      path: '/person_info',
      component: PersonInfoView
    },
    {
      path: '/search',
      component: SearchView
    }

  ]
})

export default router
