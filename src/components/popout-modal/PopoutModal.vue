<template>
  <teleport to="html">
    <div class="modal-mask" v-show="show" ref="mask">
      <div class="modal animate__animated animate__zoomIn" ref="modal">
        <slot></slot>
        <svg @click="handleClose"
          t="1699358244315" class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2290" width="200" height="200"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="2291"></path></svg>
      </div>
    </div>
  </teleport>
</template>

<script>
import 'animate.css'
export default {
  name: 'PopoutModal',
  props: {
    show: { type: Boolean, default: false },
  },
  emits: ['close'],
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }

}
</script>

<style>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: absolute;
  min-width: 600px;
  min-height: 400px;
  background: var(--theme-mode-like);
  box-shadow: 1px 1px 5px grey;
  border-radius: 15px;
  padding: 20px 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 1000;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  animation-duration: 0.5s;
}

.close-icon {
  fill: var(--theme-mode-contrast);
  position: absolute;
  right: 20px;
  top: 20px;
  height: 50px;
  width: 50px;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .modal {
    min-width: 50vw;
    min-height: 320px;
  }
  .close-icon {
    height: 30px;
    width: 30px;
  }
}


</style>