<template>
    <div class="conversation-container" @click="handleClick">
        <img src="https://img2.baidu.com/it/u=118397013,4126789630&fm=253&fmt=auto&app=138&f=JPEG?w=243&h=243">
        <div class="info-container">
          <p>Assistant</p>
          <h4>{{ conversationInfo.title }}</h4>
          <p>{{ conversationInfo.updated_at }}</p>
        </div>
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
        /* border: 3px solid var(--theme-mode-like); */
        /* border-radius: 10px; */
        width: 230px;
        height: 70px;
        cursor: pointer;
        /* background-color: var(--theme-mode); */
        text-align: left;
        display: flex;
    }

    .conversation-container img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-top: 17px;
      /* top: 50%; */
    }
    .info-container h4 {
        margin-left: 10px;
        margin-top: 5px;
    }
    .info-container p {
      font-size: 13px;
      margin-top: 3px;
      margin-left: 10px;
    }
  </style>