<template>
    <div class="conversation-container" @click="handleClick">
        <h4>{{ conversationInfo.title }}</h4>
        <p>{{ conversationInfo.updated_at }}</p>
    </div>
  </template>
  
  <script>
    
  export default {
    props: ['conversationInfo'],
    data() {
      return {

      };
    },
    created() {
      
    },
    methods: {
        handleClick() {
            this.$emit('conversationClicked')
        }
    },
  };
  </script>

  <style scoped>
    .conversation-container {
        border: 3px solid var(--theme-mode-like);
        border-radius: 10px;
        width: 200px;
        height: 50px;
        cursor: pointer;
        background-color: var(--theme-mode);
        text-align: left;
    }
    .conversation-container h4 {
        margin-left: 10px;
        margin-top: 5px;
    }
    .conversation-container p {
        font-size: 13px;
        margin-left: 15px;
    }
  </style>