import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import i18n from './language'
import { walk } from 'vue/compiler-sfc'
const app = createApp(App)

app.config.globalProperties.$bus = new mitt()
app.config.globalProperties.$cookies = VueCookies
app.use(router).use(store).use(i18n)

/*省略号工具.可以传递的参数包括
maxWidth--optional 若未指定则按照初始ComputedStyle计算
note:由于可能使用flex属性，该属性可能不会正常生效
maxLine--optional
transitionMode--optional
transitionTime--optional
wrappable--optional
transition仅针对高度进行过渡。
*/
app.directive('ellipsis', {
  mounted(el, binding) {
    let isWrap = true
    // console.log(binding.value)
    let Wrappable = binding.value.wrappable!==undefined ? binding.value.wrappable : true
    // console.log(Wrappable)
    //由于外盒子可能为flex,因此需要单独设置内盒子
    const content = document.createElement(el.tagName)
    //此处targetStyle仍具有约束性
    const setComputedStyle = (targetStyleProperty, computedStyleProperty) => {
      content.style[targetStyleProperty] = window.getComputedStyle(content)[computedStyleProperty]
      console.log(content.style[targetStyleProperty])
    }
    //传递文字样式,设置过渡,设置DOM结构和最大宽度
    const transitionTime = binding.value.transitionTime ? binding.value.transitionTime : '0.5s'
    const transitionMicros = parseFloat(transitionTime) * 1000
    {
      const transition = `max-height ${transitionTime} ${binding.value.transitionMode ? binding.value.transitionMode : 'cubic-bezier(0.075, 0.82, 0.165, 1)'}`
      const computedStyles = window.getComputedStyle(el)
      content.style.fontFamily = computedStyles.fontFamily
      content.style.fontSize = 'inherit'
      content.style.color = 'inherit'
      content.style.fontWeight = 'inherit'
      content.style.textDecoration = 'inherit'
      content.style.transition = transition
      content.style.cursor = Wrappable?'pointer':'default'
      content.innerHTML = el.innerHTML
      el.innerHTML = ''
      el.appendChild(content)
      if (binding.value.maxWidth) {
        content.style.maxWidth = binding.value.maxWidth
      }
      else {
        setComputedStyle('max-width', 'width')
      }
    }
    const wrapText = () => {
      Wrappable = false
      content.style.overflow = 'hidden'
      content.style.textOverflow = 'ellipsis'
      if (binding.value.maxLine && binding.value.maxLine > 1) {
        content.style.display = '-webkit-box'
        content.style.webkitBoxOrient = 'vertical'
        content.style.webkitLineClamp = `${binding.value.maxLine}`
      }
      else {
        content.style.whiteSpace = 'nowrap'
      }
      if (binding.value.wrappable) {
        setTimeout(() => Wrappable = true, transitionMicros + 50)
      }
    }
    const unwarpText = () => {
      Wrappable = false
      content.style.whiteSpace = 'normal'
      content.style.webkitLineClamp = 'inherit'
      setTimeout(() => Wrappable = true, transitionMicros + 50);
    }
    content.addEventListener('click', () => {
      if (!Wrappable) return
      if (isWrap === false) {
        //仅用于获取省略状态下高度
        wrapText()
        setComputedStyle('max-height', 'height')
        unwarpText()
        setTimeout(wrapText, transitionMicros)//延迟切换为省略状态
      }
      else {
        unwarpText()
        //重新计算高度
        content.style.maxHeight = content.scrollHeight + 'px'
      }
      isWrap = !isWrap
    })
    wrapText()
    setComputedStyle('max-height', 'height')
  }
})
//悬浮框工具
app.directive('tooltip', {
  mounted(el, binding) {
    const tooltip = document.createElement('div')
    if (binding.value.c) {
      tooltip.innerHTML = binding.value.c
    }
    if (binding.value.fs) {
      tooltip.style.fontSize = binding.value.fs
    }
    if (binding.value.mw) {
      tooltip.style.maxWidth = binding.value.mw
      tooltip.style.overflowWrap = 'break-word'
    } else {
      tooltip.style.whiteSpace = 'nowrap'
    }


    tooltip.style.display = 'none'
    tooltip.style.padding = '5px'
    tooltip.style.borderRadius = '5px'
    tooltip.style.boxShadow = '1px 1px 5px grey'
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
      tooltip.style.left = `${e.clientX - el.getBoundingClientRect().left}px`
      tooltip.style.top = `${e.clientY - el.getBoundingClientRect().top}px`
      tooltip.className = 'tooltip-appear'
      tooltip.style.display = 'block'
    })
    el.addEventListener('click', () => {
      el.style.zIndex = 'inherit'
      tooltip.className = 'tooltip-disappear'
      setTimeout(() => {
        tooltip.style.display = 'none'
      }, 300);
    })
    el.addEventListener('mouseleave', () => {
      el.style.zIndex = 'inherit'
      tooltip.className = 'tooltip-disappear'
      setTimeout(() => {
        tooltip.style.display = 'none'
      }, 300);
    })
  }
})

app.mount('#app')

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';


// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
VMdPreview.use(createKatexPlugin());
app.use(VMdPreview);