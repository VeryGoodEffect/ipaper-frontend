<template>
  <teleport to="html">
    <div class="popout-message" ref="message" v-if="showMessage" :class="{ 'fade-out': !show }">
      <div class="popout-message-title">{{ title }}</div>
      <div class="popout-message-content">{{ content }}</div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'PopoutMessage',
  data() {
    showMessage: false
  },
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: '' },
    content: { type: String, default: '' }
  },
  watch: {
    show(value) {
      if (value === false) {
        setTimeout(() => {
          this.showMessage = value
        }, 1000)
      }
      else {
        this.showMessage = value
      }
    }
  }
}
</script>

<style scoped>
.popout-message {
  max-width: 400px;
  padding: 10px 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px grey;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
}

.popout-message-title {
  max-width: 360px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: rgba(199, 29, 35, 1);
  /* padding-bottom: 10px; */
}

.popout-message-content {
  max-width: 360px;
  font-size: 16px;
  text-align: center;
  color: grey;
  word-break: break-all;
}

.fade-out {
  transition: all linear 1s;
  opacity: 0;
}
</style>