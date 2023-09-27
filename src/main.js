import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
const app = createApp(App)

app.config.globalProperties.$bus = new mitt()
app.config.globalProperties.$cookies = VueCookies
app.use(router).use(store)

app.directive('tooltip', {
  mounted(el, binding) {
    const tooltip = document.createElement('div')
    tooltip.innerHTML = binding.value

    tooltip.style.display = 'none'
    tooltip.style.padding = '5px'
    tooltip.style.borderRadius = '5px'
    tooltip.style.boxShadow = '1px 1px 5px grey'
    tooltip.style.whiteSpace = 'nowrap'
    tooltip.style.color = 'var(--theme-color)'
    tooltip.style.fontWeight = 'bold'

    tooltip.style.top = '0'
    tooltip.style.left = '0'
    tooltip.style.position = 'absolute'
    tooltip.style.background = 'white'
    tooltip.style.zIndex = '9999'

    if (el.style.position !== 'fixed' || el.style.position !== 'absolute' || el.style.position !== 'sticky') {
      el.style.position = 'relative'
    } 
    el.appendChild(tooltip)
    el.addEventListener('mouseenter', (e) => {
      el.style.zIndex = '9998'
      tooltip.style.left = `${ e.clientX - el.getBoundingClientRect().left }px`
      tooltip.style.top = `${ e.clientY - el.getBoundingClientRect().top }px`
      tooltip.className = 'tooltip-appear'
      tooltip.style.display = 'block'
    })
    el.addEventListener('click', () => {
      el.style.zIndex = 'inherit'
      tooltip.className = 'tooltip-disappear'
      tooltip.style.display = 'none'
    })
    el.addEventListener('mouseleave', () => {
      el.style.zIndex = 'inherit'
      tooltip.className = 'tooltip-disappear'
      tooltip.style.display = 'none'
    })
  }
})

app.mount('#app')
