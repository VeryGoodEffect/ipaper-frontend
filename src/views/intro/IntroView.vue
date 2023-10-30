<template>
  <header>
    <section>
      <div class="logo"></div>
      <h1>iPaper<span> 学术成果分享平台</span></h1>
    </section>
    <section>
      <button class="basic-btn">登录</button>
      <button class="basic-btn-outline">注册</button>
      <div class="dropdown-icon">
        <ul>
          <li>登录</li>
          <li>注册</li>
        </ul>
      </div>
    </section>
  </header>
  <main>
    <div>
      <h2>一些吹牛的文案</h2>
      <div class="huge-input-wrapper">
        <input class="basic-input huge-input" type="text" placeholder="文献、期刊、作者以及更多"/>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'IntroView'
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

header > section {
  display: flex;
  align-items: center;
}

header h1, header h1 span {
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

main > div {
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
</style>