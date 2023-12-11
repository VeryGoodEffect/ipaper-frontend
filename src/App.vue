<template>
  <!-- <button class="basic-btn" v-tooltip="'hello'">666</button>
  <br><br>
  <button class="basic-btn-outline">777</button>
  <br><br>
  <input class="basic-input" type="text" :value="msg">
  <br><br>
  <div class="huge-input-wrapper">
    <input class="basic-input huge-input" type="text" placeholder="文献、期刊、作者以及更多"/>
  </div>
  <br><br> -->
  <!-- <Pagination :default-items-per-page="5">
    <button v-for="i in 100" :key="i" @click="handleclick(i)">
    第 {{ i }} 个条目
    </button>
  </Pagination> -->
  <!-- <div class="temp" 
    v-tooltip="{ c: '收藏/取消收藏', fs: '16px' }"
    @click="sendMsg"
  >
  </div> -->
  <NavBar/>

  <!-- <SandBoxLoading/> -->
  <RouterView />

  <div style="position: fixed; bottom: 300px; left: 300px">
    <MulSearch />
  </div>

  <div style="position: fixed; bottom: 30px; left: 30px">
    <ColorSetter />
  </div>
  <PopoutMessage :show="showMessage" :title="messageTitle" :content="messageContent" />
  <FollowListVue />
</template> 

<script setup>

import { ref, getCurrentInstance, watch } from 'vue'
import PopoutMessage from './components/popout-message/PopoutMessage.vue'
import ColorSetter from './components/color/ColorSetter.vue'
import NavBar from './components/nav-bar/NavBar.vue'
import {showLoading,hideLoading} from "./components/Loading/index"
import SandBoxLoading from "./components/Loading/SandboxLoading.vue"
// import FollowListVue from './components/follow-list/followList.vue'

let showMessage = ref(false)  // 展示消息
let messageTitle = ref('')    // 消息标题
let messageContent = ref('')  // 消息内容
const instance = getCurrentInstance() // 获取 'vm'
// 绑定全局消息事件
instance.proxy.$bus.on('message', (data) => {
  console.log('6666')
  messageTitle.value = data.title
  messageContent.value = data.content
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
    setTimeout(() => {
      messageTitle.value = ''
      messageContent.value = ''
    }, 1000)
  }, data.time)
})

let handleclick = (i) => {
  alert('点击第'+i+'个条目')
}

let sendMsg = () => {
  instance.proxy.$bus.emit('message', { title: 'hel lgfiubfgi chasiuchwd askbckj abckjgak jsgck jagckja bgcjkb vsdajcbvk jasvb ckjabckwqab fwid   fhdiugf iuwef i u广泛的 fgdqiahfdiq  iaeufwiufgh iuwfhqio', content: 'gfhaowhfia vgiowab kcabkjfv baw kjbfvjka wgvj uedsgg juvaeqiug fva eiugv iquhgi uqhiugqe hfuk qwa bqfjhqg uy', time: 300000 })
  console.log(instance.proxy.$bus)
}

</script>

<style scoped>
button {
  width: 200px;
}

.temp {
  width: 200px;
  height: 200px;
  background: blue;
}
</style>