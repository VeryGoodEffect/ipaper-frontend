<template>
    <ChatGPT></ChatGPT>
  </template>
  
  <script>
    import ChatGPT from '../../components/chat/Chat.vue'
    import i18n from '../../language'
  export default {
    components: {
        ChatGPT,
        i18n
    },
    data() {
      return {
        inputText: '',
        response: '',
        responseItems: []
      };
    },
    methods: {
      
    },
  };
  </script>
    
  <style scoped>
  </style>
