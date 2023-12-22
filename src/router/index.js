import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/intro/IntroView.vue'
import SearchResultView from '../views/search-result/SearchResultView.vue'
import PersonInfoView from '../views/admin/PersonInfoView.vue'
import SearchView from '../views/search/SearchView.vue'
import PersonalHomepageView from '../views/personal-homepage/PersonalHomepageView.vue'
import MessageView from '../views/message/MessageView.vue'
import PaperDetailView from '../views/paper/PaperDetailView.vue'
import ScholarPortalView from '../views/scholar-portal/ScholarPortalView.vue'

import ChatTestView from '../views/scholar-portal/ChatTestView.vue'

import InstitutionView from '../views/institution/InstitutionView.vue'
import TagDetailView from '../views/tags/TagDetailView.vue'

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
      path: '/search',
      component: SearchView
    },
    {
      path: '/message',
      component: MessageView
    },
    {
      path: '/paper_detail/:id',
      component: PaperDetailView
    },
    {
      path: '/scholar_portal/:id',
      component: ScholarPortalView
    },
    {
      path: '/institution_detail/:id',
      component: InstitutionView
    },
    {
      path: '/tag_detail',
      component: TagDetailView
    },
    {
      path: '/chat',
      component: ChatTestView
    }
  ]
})

export default router
