import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/intro/IntroView.vue'
import SearchResultView from '../views/search-result/SearchResultView.vue'
import AdminView from '../views/admin/AdminView.vue'
import SearchView from '../views/search/SearchView.vue'
import PersonalHomepageView from '../views/personal-homepage/PersonalHomepageView.vue'
import MessageView from '../views/message/MessageView.vue'
import PaperDetailView from '../views/paper/PaperDetailView.vue'
import ScholarPortalView from '../views/scholar-portal/ScholarPortalView.vue'

import ChatTestView from '../views/scholar-portal/ChatTestView.vue'

import AuditDetailView from '../views/admin/AuditDetailView.vue'
import InstitutionView from '../views/institution/InstitutionView.vue'
import TagDetailView from '../views/tags/TagDetailView.vue'
import PasswordReset from '../views/password-reset/PasswordReset.vue'

import store from '../store'

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
      path: '/tag_detail/:id',
      component: TagDetailView
    },
    // {
    //   path: '/chat',
    //   component: ChatTestView
    // },
    // {
    //   path: '/password_reset',
    //   component: PasswordReset
    // },
    {
      path: '/admin',
      component: AdminView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn
  if (!isLoggedIn && (
      to.path === '/personal_homepage' ||
      to.path === '/message' || 
      to.path === '/admin' ||
      to.path === '/search'
    )  
  ) {
    console.log('not log', isLoggedIn)
    next('/')
  } else {
    next()
  }
})

export default router
