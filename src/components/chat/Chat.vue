<template>
  <div class="container">
    <div class="conversation-button" @click="checkAllConversation">
      {{ $t("chat_all_conversations") }}
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
    <div class="dialog-box scrollable-div">
      <div
        v-for="dialog in dialogList"
        :key="dialog.index"
        :class="['dialog-bubble', { 'user-content': !dialog.isResponse }]"
      >
        <!-- <svg
          v-if="dialog.content === ''"
          t="1703209866887"
          class="loading-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5281"
          width="200"
          height="200"
        >
          <path
            d="M480 96a32 32 0 0 1 64 0v192a32 32 0 0 1-64 0V96z m250.624 60.64a32 32 0 1 1 51.776 37.632L669.568 349.6a32 32 0 0 1-51.808-37.632L730.624 156.64zM897.76 353.024a32 32 0 1 1 19.776 60.864l-182.624 59.328a32 32 0 0 1-19.776-60.864l182.624-59.328z m19.776 257.088a32 32 0 1 1-19.776 60.864l-182.624-59.328a32 32 0 0 1 19.776-60.864l182.624 59.328zM782.4 829.76a32 32 0 0 1-51.776 37.632L617.76 712.064a32 32 0 1 1 51.808-37.632L782.4 829.76zM544 928a32 32 0 0 1-64 0V736a32 32 0 0 1 64 0v192z m-250.624-60.64a32 32 0 0 1-51.776-37.632L354.432 674.4a32 32 0 0 1 51.808 37.632L293.376 867.36zM126.24 670.976a32 32 0 1 1-19.776-60.864l182.624-59.328a32 32 0 0 1 19.776 60.864L126.24 670.976z m-19.776-257.088a32 32 0 0 1 19.776-60.864l182.624 59.328a32 32 0 1 1-19.776 60.864l-182.624-59.328zM241.6 194.24a32 32 0 1 1 51.776-37.632L406.24 311.936a32 32 0 1 1-51.808 37.632L241.6 194.24z"
            p-id="5282"
          ></path>
        </svg> -->
        <v-md-preview :text="dialog.content" class="md-preview"></v-md-preview>
      </div>
    </div>
    <div class="input-area">
      <textarea
        class="input-text"
        v-model="inputText"
        @keydown.enter.prevent="submit"
      ></textarea>
      <button type="button" @click="submit" class="send-button">
        {{ $t("chat_send") }}
      </button>
    </div>
  </div>
</template>
  
  <script>
import ChatListItem from "../../components/chat/ChatListItem.vue";
import { Chat } from "../../api/chat.js";
// import VueMarkdown from 'vue-markdown'

export default {
  components: {
    ChatListItem,
    // VueMarkdown
  },
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
    };
  },
  created() {},
  mounted() {
    const url = `wss://www.isound.live/ws/chat/?user_id=${this.$cookies.get(
      "user_id"
    )}`;
    if (!this.ws) {
      this.ws = new WebSocket(url);
      this.ws.onmessage = this.handleMessage;
    }
  },
  methods: {
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
          console.log(response);
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

      Chat.createCompletion(data);
    },
    conversationClicked(index) {
      this.conversationID = this.conversationList[index].id;
      console.log(this.conversationID);
      this.dialogList = [];
      Chat.getChatMessagesList(this.conversationID).then(
        (response) => {
          console.log(response);
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
          setTimeout(this.clearUselessStyle, 10);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    scrollToBottom() {
      this.$nextTick(function () {
        const container = document.querySelector(".dialog-box");
        console.log(container);
        container.scrollTop = container.scrollHeight;
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      });
    },
    clearUselessStyle() {
      var divElements = document.querySelectorAll(".github-markdown-body");
      // console.log(divElements)
      for (var i = 0; i < divElements.length; i++) {
        var divElement = divElements[i];
        // 对每个div元素进行操作
        divElement.style.paddingBottom = "0";
        divElement.style.fontSize = "15px";
      }
    },
  },
};
</script>

  <style scoped>
.container {
  border: 2px solid var(--theme-mode-high-contrast);
  border-radius: 10px;
  width: 400px;
  height: 730px;
}
.dialog-box {
  height: 600px;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  font-size: unset;
}
.scrollable-div::-webkit-scrollbar {
  width: 0.5em;
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
  justify-content: space-around;
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
  padding: 0;
}
.dialog-bubble p {
  margin: 10px;
}
.dialog-bubble * {
  /* padding: 0; */
}
.response {
  display: flex;
  flex-wrap: wrap;
}
.conversation-button {
  background-color: var(--theme-mode-contrast);
  width: 100px;
  min-width: 100px;
  text-align: center;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
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
  width: 225px;
  background-color: var(--theme-mode-slight-contrast);
  border-radius: 5px;
  border: 2px solid var(--theme-mode-high-contrast);
}
.user-content {
  right: 0;
  background-color: var(--theme-color-80);
  align-self: flex-end;
  border: unset;
}
.user-content p {
  color: white;
}
.input-text {
  border-radius: 10px;
  width: 200px;
  font-size: 17px;
  overflow: hidden;
}
.send-button {
  background-color: var(--theme-color-80);
  color: white;
}
.bubble-container {
  align-self: flex-end;
}
.chat-list-item {
  margin-bottom: 10px;
  margin-left: 7px;
}
.loading-icon {
  width: 30px;
  height: 30px;
  animation: rotate 2s infinite linear;
  animation-play-state: running;
  margin-left: 44%;
  margin-top: 15px;
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
</style>