<template>
  <div class="color-container">
    <button class="color-mode-switch" @click="changeColorMode"></button>
    <ul ref="color-list">
      <li v-for="(color, index) in colors" :key="index">
        <button @click="changeThemeColor(color)"></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ColorSetter',
  data() {
    return {
      colors: [
        '3,122,255', // 蓝色
        '165,80,166', // 紫色
        '247,79,158', // 粉色
        '255,82,88', // 红色
        '246,131,27', // 橙色
        '255,199,1', // 黄色
        '98,186,70', // 绿色
        '139,140,140'  // 灰色
      ]
    }
  },
  methods: {
    changeColorMode() {
      let mode = getComputedStyle(document.documentElement).getPropertyValue('--theme-mode')
      if (mode === '#181818') {
        document.documentElement.style.setProperty('--theme-mode', '#f3f3f3')
        document.documentElement.style.setProperty('--theme-mode-translucent', '#f3f3f388')
        document.documentElement.style.setProperty('--theme-mode-like', '#eee')
        document.documentElement.style.setProperty('--theme-mode-slight-contrast', '#e3e3e3')
        document.documentElement.style.setProperty('--theme-mode-contrast', '#ccc')
        document.documentElement.style.setProperty('--theme-mode-high-contrast', '#777')
        document.documentElement.style.setProperty('--theme-mode-very-high-contrast', '#222')
        document.documentElement.style.setProperty('--default-text-color', '#111')
      } else {
        document.documentElement.style.setProperty('--theme-mode', '#181818')
        document.documentElement.style.setProperty('--theme-mode-translucent', '#18181888')
        document.documentElement.style.setProperty('--theme-mode-like', '#222')
        document.documentElement.style.setProperty('--theme-mode-slight-contrast', '#333')
        document.documentElement.style.setProperty('--theme-mode-contrast', '#444')
        document.documentElement.style.setProperty('--theme-mode-high-contrast', '#bbb')
        document.documentElement.style.setProperty('--theme-mode-very-high-contrast', '#c8c8c8')
        document.documentElement.style.setProperty('--default-text-color', '#eaeaea')
      }
    },
    changeThemeColor(color) {
      document.documentElement.style.setProperty('--theme-color', 'rgba(' + color + ',1)')
      document.documentElement.style.setProperty('--theme-color-80', 'rgba(' + color + ',.8)')
      document.documentElement.style.setProperty('--theme-color-60', 'rgba(' + color + ',.6)')
      document.documentElement.style.setProperty('--theme-color-50', 'rgba(' + color + ',.5)')
      document.documentElement.style.setProperty('--theme-color-30', 'rgba(' + color + ',.3)')
      document.documentElement.style.setProperty('--theme-color-10', 'rgba(' + color + ',.1)')
    }
  },
  mounted() {
    let ul = this.$refs['color-list']
    for (let i = 0; i < this.colors.length; i++) {
      ul.children[i].children[0].style.background = 'rgb(' + this.colors[i] + ')'
    }
  }
}
</script>

<style scoped>
.color-container {
  position: relative;
  border-radius: 50%;
  cursor: pointer;
}

.color-mode-switch {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: url('/src/components/svg/light_dark.svg');
  background-size: cover;
  background-color: #333;
  transition: .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  position: relative;
}

.color-mode-switch:hover {
  scale: 1.2;
}

.color-container:hover ul {
  display: flex;
}

ul {
  background: lightgrey;
  border-radius: 5px;
  padding: 0 5px;
  width: 200px;
  height: 30px;
  display: none;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 90%;

}

ul li {
  display: inline-block;
}

ul li button {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

ul li button:hover {
  scale: 1.2;
}
</style>