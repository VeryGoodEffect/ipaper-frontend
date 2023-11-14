<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>登录：探索更丰富的功能</h3>
      <input type="text" class="basic-input" placeholder="用户名">
      <input type="password" class="basic-input" placeholder="密码">
      <span>忘记密码？通过邮箱以<a>找回</a>。</span>
      <div class="btn-box">
        <button class="basic-btn-outline">注册</button>
        <button class="basic-btn">登录</button>
      </div>
    </div>
  </PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'

export default {
  name: 'LoginModal',
  emits: ['close'],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PopoutModal
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.container>* {
  min-width: 60%;
}

.container>h3 {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 50px;
}

.container>input {
  width: 70%;
  height: 60px;
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
}

.container>input::placeholder {
  color: var(--theme-mode-high-contrast);
}

.container>input:first-of-type {
  margin-bottom: 40px;
}
.container>input:last-of-type {
  margin-bottom: 5px;
}

.container>span {
  width: 70%;
  font-size: 16px;
  margin-bottom: 25px;
}

.btn-box {
  width: 70%;
  display: flex;
  justify-content: space-around;
}

.btn-box button {
  width: 120px;
  height: 50px;
  font-size: 24px;
}

</style>