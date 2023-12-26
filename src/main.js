import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import i18n from './language'
import { walk } from 'vue/compiler-sfc'
import VaTex from 'vatex';


const app = createApp(App)

app.config.globalProperties.$bus = new mitt()
app.config.globalProperties.$cookies = VueCookies
app.use(router).use(store).use(i18n)



app.use(VaTex);
/*省略号工具.可以传递的参数包括
maxWidth--optional 若未指定则按照初始ComputedStyle计算
note:由于可能使用flex属性，该属性可能不会正常生效
maxLine--optional
transitionMode--optional
transitionTime--optional
wrappable--optional
transition仅针对高度进行过渡。
*/
const handleEllipsis = (el, binding) => {
  let isWrap = true
  let Wrappable = binding.value.wrappable !== undefined ? binding.value.wrappable : true
  //由于盒子可能为flex,因此需要单独设置外盒子并标识特殊类
  const outside = document.createElement(el.tagName)
  el.classList.add('v-ellipsis')
  //此处targetStyle仍具有约束性
  const setComputedStyle = (targetStyleProperty, computedStyleProperty) => {
    outside.style[targetStyleProperty] = window.getComputedStyle(outside)[computedStyleProperty]
    // console.log(outside.style[targetStyleProperty])
  }
  //传递文字样式,设置过渡,设置DOM结构和最大宽度
  const transitionTime = binding.value.transitionTime ? binding.value.transitionTime : '0.5s'
  const transitionMicros = parseFloat(transitionTime) * 1000
  {
    const transition = `max-height ${transitionTime} ${binding.value.transitionMode ? binding.value.transitionMode : 'cubic-bezier(0.075, 0.82, 0.165, 1)'}`
    const computedStyles = window.getComputedStyle(el)
    outside.style.fontFamily = computedStyles.fontFamily
    outside.style.fontSize = 'inherit'
    outside.style.color = 'inherit'
    outside.style.fontWeight = 'inherit'
    outside.style.textDecoration = 'inherit'
    outside.style.transition = transition
    outside.style.cursor = Wrappable ? 'pointer' : 'default'
    // outside.innerHTML = el.innerHTML
    //更改节点关系
    el.parentNode.insertBefore(outside, el)
    // el.parentNode.removeChild(el)
    outside.appendChild(el)
    // replaceChild(outside, el)
    if (binding.value.maxWidth) {
      outside.style.maxWidth = binding.value.maxWidth
    }
    else {
      setComputedStyle('max-width', 'width')
    }
  }
  const wrapText = () => {
    Wrappable = false
    outside.style.overflow = 'hidden'
    el.style.overflow = 'hidden'
    el.style.textOverflow = 'ellipsis'
    if (binding.value.maxLine && binding.value.maxLine > 1) {
      // outside.style.display = el.style.display
      el.style.display = '-webkit-box'
      el.style.webkitBoxOrient = 'vertical'
      el.style.webkitLineClamp = `${binding.value.maxLine}`
    }
    else {
      el.style.whiteSpace = 'nowrap'
    }
    if (binding.value.wrappable) {
      setTimeout(() => Wrappable = true, transitionMicros + 50)
    }
  }
  const unwarpText = () => {
    Wrappable = false
    el.style.whiteSpace = 'normal'
    el.style.webkitLineClamp = 'inherit'
    setTimeout(() => Wrappable = true, transitionMicros + 50);
  }
  outside.addEventListener('click', () => {
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
      outside.style.maxHeight = outside.scrollHeight + 'px'
    }
    isWrap = !isWrap
  })
  wrapText()
  setComputedStyle('max-height', 'height')
}

const handleRemoveEllipsis = (el, binding) => {
  if (el.classList.contains('v-ellipsis')) {
    const outside = el.parentNode
    el.style.display = outside.style.display
    // console.log(outside)
    if (outside) {
      const outsideParent = outside.parentNode
      outside.removeChild(el)
      outsideParent.insertBefore(el, outside)
      outsideParent.removeChild(outside)
    }
  }
}
const ellipsis = {
  mounted(el, binding) {
    handleEllipsis(el, binding)
  },
  updated(el, binding) {
    handleEllipsis(el, binding)
  },
  beforeUpdate(el, binding) {
    handleRemoveEllipsis(el, binding)
  },
}
app.directive('ellipsis', ellipsis)
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

// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import '@kangc/v-md-editor/lib/theme/style/github.css';
// import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

// highlightjs
// import hljs from 'highlight.js';

// VMdPreview.use(githubTheme, {
//   Hljs: hljs,
// });
// VMdPreview.use(createKatexPlugin());
// app.use(VMdPreview);