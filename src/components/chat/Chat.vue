<template>
  <div class="container">
    <div class="header">
      <div class="conversation-button" @click="checkAllConversation">
        <svg t="1703383758860" class="icon" viewBox="0 0 1084 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7653" width="200" height="200"><path d="M184.83361091 241.54245141h697.95496331a34.89774795 34.89774795 0 1 0 0-69.79549591H184.83361091a34.89774795 34.89774795 0 1 0-1e-8 69.79549591zM184.83361091 546.89774795h414.41075932a34.89774795 34.89774795 0 1 0 0-69.7954959H184.83361091a34.89774795 34.89774795 0 1 0-1e-8 69.7954959zM184.83361091 852.25304449h196.29983373a34.89774795 34.89774795 0 1 0 1e-8-69.7954959H184.83361091a34.89774795 34.89774795 0 1 0-1e-8 69.7954959z" p-id="7654"></path></svg>
        <div class="conversation-list scrollable-div" v-if="isCheckingRoom">
          <ChatListItem
            v-for="(conversation, index) in conversationList"
            :key="conversation.index"
            :conversationInfo="conversationList[index]"
            @conversationClicked="conversationClicked(index)"
            class="chat-list-item"
          ></ChatListItem>
        </div>
      </div>
      <p class="chatGPT">
        ChatGPT
      </p>
      <p class="chatGPT-num">
        3.5
      </p>
    </div>
    
    <div class="dialog-box scrollable-div">
      <div
        v-for="dialog in dialogList"
        :key="dialog.index"
      >
        <div class="assistant-info" v-if="dialog.isResponse">
          <img src="https://img2.baidu.com/it/u=118397013,4126789630&fm=253&fmt=auto&app=138&f=JPEG?w=243&h=243">
          <p>Assistant</p>
        </div>
        <div class="user-info" v-else>
          <p>{{ currentUsername }}</p>
          <img src="https://img.zcool.cn/community/01884c5da1a0fba80121b7226a6bb6.png@1280w_1l_2o_100sh.png">
        </div>
        <div v-if="dialog.isResponse" class="dialog-bubble" v-html="renderedMarkdown(dialog.content)"></div>
        <div v-else class="dialog-bubble user-content" v-html="renderedMarkdown(dialog.content)"></div>
      </div>
    </div>
    <div class="input-area">
      <textarea
        class="input-text"
        v-model="inputText"
        @keydown.enter.prevent="submit"
      ></textarea>
      <div @click="submit" class="send-button">
        <svg t="1703386830104" class="icon-send" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9604" width="200" height="200"><path d="M507.904 882.688c-18.432 0-33.28-14.848-33.28-33.28v-655.36c0-18.432 14.848-33.28 33.28-33.28s33.28 14.848 33.28 33.28v654.848c0 18.432-14.848 33.792-33.28 33.792z" fill="" p-id="9605"></path><path d="M787.968 502.784c-8.704 0-16.896-3.072-23.552-9.728L507.904 236.544 251.392 493.056c-12.8 12.8-34.304 12.8-47.104 0-12.8-12.8-12.8-34.304 0-47.104l280.064-280.064c6.144-6.144 14.848-9.728 23.552-9.728s17.408 3.584 23.552 9.728l280.064 280.064c12.8 12.8 12.8 34.304 0 47.104-6.656 6.656-15.36 9.728-23.552 9.728z" p-id="9606"></path></svg>
      </div>
    </div>
  </div>
</template>
  
  <script>
import ChatListItem from "../../components/chat/ChatListItem.vue";
import { Chat } from "../../api/chat.js";
import { User } from "../../api/users.js";
// import VueMarkdown from 'vue-markdown'
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // 或者你选择的其他样式
export default {
  components: {
    ChatListItem,
    // VueMarkdown
  },
  computed: {},
  data() {
    return {
      inputText: "",
      response: "",
      dialogList: [],
      responseItems: [],
      isCheckingRoom: false,
      conversationList: [],
      conversationID: null,
      ws: null,
      currentUsername: '',
    };
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    const url = `wss://www.isound.live/ws/chat/?user_id=${this.$cookies.get(
      "user_id"
    )}`;
    if (!this.ws) {
      this.ws = new WebSocket(url);
      this.ws.onmessage = this.handleMessage;
    }
    marked.setOptions({
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    });
  },
  methods: {
    getUserInfo() {
      User.getUser(this.$cookies.get('user_id')).then(
        (response) => {
          this.currentUsername = response.data.username
        },
        (error) => {
          console.log(error)
        }
      )
    },
    renderedMarkdown(markdown) {
      this.$nextTick(() => {
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightBlock(block);
        });
      });
      return marked(markdown);
    },
    handleMessage(event) {
      if (event.data.finish_reason === "stop") {
        this.clearUselessStyle();
        this.scrollToBottom();
      } else {
        const data = JSON.parse(event.data);
        // console.log(data);
        if (data.delta.content) {
          this.dialogList[this.dialogList.length - 1].content +=
            data.delta.content;
            this.conversationID = data.delta.conversation.id
        }
      }

      this.scrollToBottom();
    },
    wsHandleClose() {
      if (this.ws) {
        this.ws.close();
      }
    },
    checkAllConversation() {
      if (this.isCheckingRoom) {
        this.isCheckingRoom = false;
      } else {
        this.isCheckingRoom = true;
        this.getChatConversations();
      }
    },
    getChatConversations() {
      Chat.getAllConversations(this.$cookies.get("user_id")).then(
        (response) => {
          // console.log(response);
          this.conversationList = response.data;
          // console.log(response.data.username)
        },
        (error) => {
          console.log(error);
        }
      );
    },
    submit() {
      if (this.inputText === "") {
        return;
      }
      // console.log(111111111)
      // console.log(this.conversationID)
      let data = {
        conversation: this.conversationID,
        content: this.inputText,
      };
      this.dialogList.push({
        isResponse: false,
        content: this.inputText,
      });
      this.inputText = "";
      this.dialogList.push({
        isResponse: true,
        content: "",
      });
      setTimeout(this.clearUselessStyle, 10);
      this.scrollToBottom();
      if (!this.ws) {
        const url = `wss://www.isound.live/ws/chat/?user_id=${this.$cookies.get(
          "user_id"
        )}`;
        this.ws = new WebSocket(url);
        this.ws.onmessage = this.handleMessage;
      }
      if (this.ws.readyState === WebSocket.CLOSED) {
        const url = `wss://www.isound.live/ws/chat/?user_id=${this.$cookies.get(
          "user_id"
        )}`;
        this.ws = new WebSocket(url);
        this.ws.onmessage = this.handleMessage;
      }

      Chat.createCompletion(data)
    },
    conversationClicked(index) {
      this.conversationID = this.conversationList[index].id
      // console.log(this.conversationID)
      this.dialogList = []
      Chat.getChatMessagesList(this.conversationID).then(
        (response) => {
          // console.log(11111)
          // console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            let flag = false;
            if (response.data[i].role === "assistant") {
              flag = true;
            }
            this.dialogList.push({
              isResponse: flag,
              content: response.data[i].content,
            });
          }

          this.scrollToBottom();
          setTimeout(this.clearUselessStyle, 10)
        },
        (error) => {
          console.log(error);
        }
      );
    },
    scrollToBottom() {
      this.$nextTick(function () {
        const container = document.querySelector(".dialog-box")
        // console.log(container)
        container.scrollTop = container.scrollHeight
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
      });
    },
    clearUselessStyle() {
      var divElements = document.querySelectorAll(".github-markdown-body");
      // console.log(divElements)
      for (var i = 0; i < divElements.length; i++) {
        var divElement = divElements[i]
        // 对每个div元素进行操作
        divElement.style.paddingBottom = "0"
        divElement.style.fontSize = "15px"
      }
    },
  },
};
</script>

  <style scoped>
.container {
  background: var(--theme-mode);
  /* border: 2px solid var(--theme-mode-high-contrast); */
  border-radius: 10px;
  width: 400px;
  height: calc(100vh - 100px);
  position: relative;
  z-index: 100;
}
.header {
  margin: 0 auto;
  width: 90%;
  border-bottom: 2px solid var(--theme-mode-contrast);
  display: flex;
  margin-bottom: 10px;
}
/* .header > p {
  
} */
.chatGPT {
  font-size: 20px;
  margin-top: 10px; 
  margin-left: 100px;
  margin-bottom: 10px;
  font-weight: bold;
}
.chatGPT-num {
  font-size: 20px;
  margin-top: 12px;
  margin-left: 5px;
  font-size: 18px;
  /* color: var(--theme-color-50); */
}
.dialog-box {
  height: 520px;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 10px;
  /* position: relative; */
  font-size: unset;
}
.dialog-box > div {
  display: flex;
  flex-direction: column;
}
.scrollable-div::-webkit-scrollbar {
  width: 0.5em;
  display: none;
}

.scrollable-div::-webkit-scrollbar-track {
  background-color: transparent;
}

.scrollable-div::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 0.25em;
}

.scrollable-div::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
.input-area {
  display: flex;
  margin: 0 auto;
  width: 86%;
  border: 2px solid var(--theme-mode-contrast);
  border-radius: 10px;
  padding: 10px;
  /* justify-content: space-around; */
}
.dialog-bubble {
  border: 2px solid var(--theme-mode-high-contrast);
  border-radius: 10px;

  background-color: var(--theme-mode-like);
  max-width: 100%;
  /* min-height: 30px; */
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 20px;
  /* padding-bottom: 10px; */
  /* padding: 0; */
  padding: 10px;
}

.response {
  display: flex;
  flex-wrap: wrap;
}
.conversation-button {
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  position: relative;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 999;
}
.conversation-list {
  position: absolute;
  top: calc(110%);
  /* right: -0px; */
  height: 500px;
  overflow-y: auto;
  width: 260px;
  background-color: var(--theme-mode-slight-contrast);
  border-radius: 5px;
  border: 2px solid var(--theme-mode-high-contrast);
}
.user-content {
  right: 0;
  /* width: 30px; */
  background-color: var(--theme-color-60);
  align-self: flex-end;
  border: unset;
}
.user-content p {
  color: white;
}
.input-text {
  border-radius: 5px;
  width: 300px;
  margin-right: 10px;
  font-size: 16px;
  overflow: hidden;
  background-color: var(--theme-mode);
}
.send-button {
  background-color: var(--theme-color-80);
  /* color: white; */
  border-radius: 15px;
  width: 40px;
  cursor: pointer;
  /* right: 0; */
  /* align-self: flex-end; */
}
.send-button :hover {
  background-color: var(--theme-color-100);
  
  /* right: 0; */
  /* align-self: flex-end; */
}
.icon-send {
  fill: white;
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-left: 5px;
}
.bubble-container {
  align-self: flex-end;
}
.chat-list-item {
  margin: 0 auto;
  border-bottom: 1px solid var(--theme-mode-contrast);
}
.assistant-info {
  display: flex;

}
.assistant-info > img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  margin-bottom: 5px;
}
.assistant-info > p{
  margin-left: 10px;
  margin-top: 9px;
}

.user-info {
  display: flex;
  right: 0;
  align-self: flex-end;
}
.user-info > img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  margin-bottom: 5px;
}
.user-info > p{
  margin-right: 10px;
  margin-top: 9px;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.md-preview {
  font-size: 15px !important;
}
.icon {
  width: 20px;
  height: 20px;
  fill: var(--default-text-color);
}

</style>