<template>
  <LoadingBar :progress="progress"></LoadingBar>
  <header>
    <section>
      <div class="logo"></div>
      <h1>iPaper<span> 学术成果分享平台</span></h1>
    </section>
    <section>
      <button class="basic-btn" @click="loginModalShouldShow = true">登录</button>
      <button class="basic-btn-outline">注册</button>
      <div class="dropdown-icon">
        <ul>
          <li @click="loginModalShouldShow = true">登录</li>
          <li>注册</li>
        </ul>
      </div>
    </section>
  </header>
  <main>
    <div>
      <h2>一些吹牛的文案</h2>
      <div class="huge-input-wrapper">
        <input 
          class="basic-input huge-input" type="text" placeholder="文献、期刊、作者以及更多"
          v-model="searchKeyword" @keyup.enter="basicSearch"
        />
        <svg @click="basicSearch"
          t="1699356103686" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4162" width="200" height="200"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  p-id="4163"></path></svg>
      </div>
    </div>
  </main>
  <LoginModal :show="loginModalShouldShow" @close="loginModalShouldShow = false"/>

</template>

<script>
import LoginModal from '../../components/modals/LoginModal.vue'

import LoadingBar from '../../components/loading-bar/LoadingBar.vue';
export default {
  name: 'IntroView',
  components: {
    LoginModal
  },
  data() {
    return {
      searchKeyword: '', // 搜索关键字
      loginModalShouldShow: false
    }
  },
  methods: {
    basicSearch() {
      if (this.searchKeyword != '') {
        alert('搜索关键字：' + this.searchKeyword)
        this.searchKeyword = ''
      }
    }
  }
}
</script>

<style scoped>
header {
  height: 80px;
  background: rgba(255, 255, 255, .2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

header>section {
  display: flex;
  align-items: center;
}

header h1,
header h1 span {
  font-size: 30px;
  font-weight: bold;
  color: var(--theme-color);
}

header h1 {
  margin-left: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  background: green;
  border-radius: 50%;
  flex: none;
}

header button {
  margin: 0 10px;
}

main {
  height: calc(100vh - 80px);
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

main>div {
  display: flex;
  max-width: 850px;
  flex-wrap: wrap;
  justify-content: center;
}

main h2 {
  font-size: 80px;
  color: var(--theme-color);
  font-weight: bold;
  padding-bottom: 50px;

  transition-property: font-size;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-icon {
  width: 50px;
  height: 50px;
  background: url('../../components/svg/menu.svg');
  background-size: cover;
  display: none;
  cursor: pointer;
  position: relative;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-icon ul {
  position: absolute;
  top: calc(100%);
  right: 10px;
  padding: 10px;
  background: #555;
  border-radius: 5px;
  display: none;
}

.dropdown-icon ul li {
  width: 80px;
  display: flex;
  justify-content: center;
  background: #333;
  color: lightgrey;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  transition: .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-icon ul li:first-child {
  margin-bottom: 10px;
}

.dropdown-icon ul li:hover {
  scale: 1.05;
}

@media screen and (max-width: 768px) {
  .dropdown-icon {
    display: block;
  }

  .dropdown-icon:hover ul {
    display: block;
  }

  header button {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .dropdown-icon {
    width: 40px;
    height: 40px;
  }

  main h2 {
    font-size: 60px;
  }
}

@media screen and (max-width: 450px) {
  main h2 {
    font-size: 40px;
  }

  header h1 span {
    display: none;
  }
}

.icon {
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;
  position: absolute;
  right: 15px;
  z-index: 10;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  fill: #666;
}

.icon:hover {
  scale: 1.2;
  fill: var(--theme-color);
}

@media screen and (max-width: 850px) {
  .icon {
    width: 40px;
    height: 40px;
  }
}
</style>