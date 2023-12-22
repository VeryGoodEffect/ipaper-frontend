<template>
    <div class="container">
      <div class="conversation-button" @click="checkAllConversation">
        {{ $t('chat_all_conversations') }}
        <div class="conversation-list scrollable-div" v-if="isCheckingRoom">
          <ChatListItem v-for="(conversation, index) in conversationList" :key="conversation.index"
          :conversationInfo="conversationList[index]"
          @conversationClicked="conversationClicked(index)"
          class="chat-list-item"></ChatListItem>
        </div>
      </div>
      <div class="dialog-box scrollable-div">
        <div v-for="dialog in dialogList" :key="dialog.index" :class="['dialog-bubble', { 'user-content': !dialog.isResponse }]">
            <p>{{ dialog.content }}</p>
        </div>
      </div>
      <div class="input-area">
        <textarea class="input-text" v-model="inputText" id="inputText"></textarea>
        <button type="button" @click="submit" class="send-button">{{ $t('chat_send') }}</button>
      </div>
    </div>
  </template>
  
  <script>
  import ChatListItem from '../../components/chat/ChatListItem.vue'
  import { Chat } from '../../api/chat.js'


  export default {
    components: {
      ChatListItem
    },
    data() {
      return {
        inputText: '',
        response: '',
        dialogList: [],
        responseItems: [],
        isCheckingRoom: false,
        conversationList: [],
        conversationID: null
      };
    },
    created() {
      
    },
    methods: {
      checkAllConversation() {
        if(this.isCheckingRoom) {
          this.isCheckingRoom = false
        }
        else {
          this.isCheckingRoom = true
          this.getChatConversations()
        }
      },
      getChatConversations() {
        Chat.getAllConversations(this.$cookies.get('user_id')).then(
          (response) => {
            console.log(response)
            this.conversationList = response.data
            // console.log(response.data.username)
          },
          (error) => {
            console.log(error)
          }
        )
      },
      submit() {
        if(this.inputText === ''){
          return
        }
        let data = {
            conversation: this.conversationID,
            content: this.inputText
        }
        this.dialogList.push({
            isResponse: false,
            content: this.inputText
        })
        Chat.createCompletion(data).then(
            (response) => {
              console.log(response)
              const processedResponse = `[${response.data.replace(/}{/g, '},{')}]`
              console.log(processedResponse)
              this.responseItems = JSON.parse(processedResponse)
              let content = ''
              for(let i = 0; i < this.responseItems.length; i++) {
                if(i != this.responseItems.length - 1)
                {
                  content += this.responseItems[i].delta.content
                }
                else {
                  this.conversationID = this.responseItems[i].delta.conversation.id
                  console.log(this.conversationID)
                }
              }
              this.dialogList.push({
                isResponse: true,
                content: content
              })
              console.log(this.dialogList)
              this.inputText = ''
                // const reader = response.body.getReader();

                // const read = () => {
                //     return reader.read().then((result) => {
                //     if (!result.done) {
                //         const value = result.value;
                //         const decoder = new TextDecoder('utf-8');
                //         const chunk = decoder.decode(value);
                //         console.log(chunk)

                //         return read();
                //     }
                //     });
                // };
            },
            (error) => {
              console.log(error)
            }
          )
      },
      conversationClicked(index) {
        this.conversationID = this.conversationList[index].id
        console.log(this.conversationID)
        this.dialogList = []
        Chat.getChatMessagesList(this.conversationID).then(
          (response) => {
            console.log(response)
            for(let i = 0; i < response.data.length; i++) {
              let flag = false
              if(response.data[i].role === 'assistant') {
                flag = true
              }
              this.dialogList.push({
                isResponse: flag,
                content: response.data[i].content
              })
            }
          },
          (error) => {
            console.log(error)
          }
        )
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
    max-width: 70%;
    /* min-height: 30px; */
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 20px;
    /* padding-bottom: 10px; */
  }
  .dialog-bubble p {
    margin: 10px;
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
    transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
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
  }
  .input-text {
    border-radius: 10px;
    width: 200px;
    font-size: 17px;
  }
  .send-button {
    background-color: var(--theme-color-80);
  }
  .bubble-container {
    align-self: flex-end;
  }
  .chat-list-item {
    margin-bottom: 10px;
    margin-left: 7px;
  }
  </style>