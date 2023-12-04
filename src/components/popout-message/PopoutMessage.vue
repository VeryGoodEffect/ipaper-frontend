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
  max-width: 500px;
  padding: 10px 10px;
  background-color: var(--theme-mode-like);
  border-radius: 10px;
  box-shadow: 1px 1px 3px var(--theme-mode-high-contrast);
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
}

.popout-message-title {
  max-width: 480px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: var(--theme-color);
  /* padding-bottom: 10px; */
}

.popout-message-content {
  max-width: 480px;
  font-size: 18px;
  text-align: center;
  color: var(--theme-mode-high-contrast);
  word-break: break-all;
}

.fade-out {
  transition: all linear 1s;
  opacity: 0;
}
</style>