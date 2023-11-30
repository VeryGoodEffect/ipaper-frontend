import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/intro/IntroView.vue'
import SearchResultView from '../views/search-result/SearchResultView.vue'
import PersonalHomepageView from '../views/personal-homepage/PersonalHomepageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IntroView
    },
    {
      path: '/searchresult',
      component: SearchResultView
    },
    {
      path: '/personalHomepage',
      component: PersonalHomepageView
    }
  ]
})

export default router
