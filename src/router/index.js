import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/intro/IntroView.vue'
import SearchResultView from '../views/search-result/SearchResultView.vue'
import PersonInfoView from '../views/admin/PersonInfoView.vue'
import SearchView from '../views/search/SearchView.vue'
import PersonalHomepageView from '../views/personal-homepage/PersonalHomepageView.vue'
import PaperDetailView from '../views/paper/PaperDetailView.vue'
import ScholarPortalView from '../views/scholar-portal/ScholarPortalView.vue'

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
      path: '/personal_homepage',
      component: PersonalHomepageView
    },
    {
      path: '/scholar_portal',
      component: ScholarPortalView
    },
    {
      path: '/search',
      component: SearchView
    },
    {
      path: '/paper_detail',
      component: PaperDetailView
    }

  ]
})

export default router
