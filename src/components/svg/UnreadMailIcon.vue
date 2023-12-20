<template>
    <div class="mail-box">
      <MailIcon />
      <div class="red-dot"></div>
    </div>
  </template>
  
  <script>
  import MailIcon from './MailIcon.vue'
  export default {
    name: 'UnreadMailIcon',
    components: { MailIcon }
  }
  </script>
  
  <style scoped>
  .mail-box {
    position: relative;
  }
  .red-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(215, 51, 51);
    position: absolute;
    right: -2px;
    top: 0;
  }
  </style>