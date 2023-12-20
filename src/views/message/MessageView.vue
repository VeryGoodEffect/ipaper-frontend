<template>
    <div>
        <button @click="showAllMsg = true">全部消息</button>
        <button @click="showAllMsg = false">全部未读</button>
        <button>设为全部已读</button>
        <button>设为全部未读</button>
        <div class="container">
            <div v-if="showAllMsg">
                <div class="messageListTitle">全部消息</div>
                <MessageItem v-for="(msg, index) in msgs" :key="index" :msg="msg"></MessageItem>
            </div>
             <div v-else>
                <div class="messageListTitle">未读消息</div>
                <MessageItem v-for="(msg, index) in msgs" :key="index" :msg="unreadMsgs"></MessageItem>
             </div>
        </div>
        <div >
            <MessageItem v-for="(msg, index) in msgs" :key="index" :msg="msg"></MessageItem>
        </div>
    </div>
</template>
<script>
import MessageItem from '../../components/message-item/MessageItem.vue'
import { Messages } from '../../api/messages.js'

export default {
    name: 'MessageView',
    components: {
        MessageItem,
    },
    data() {
        return {
            showAllMsg: true,
            msgs: [],
            unreadMsgs: [],
            hasReadMsg: []
        }
    },
    mounted() {
        Messages.getAllReceivedMessages().then(
            response => {
                this.msgs = response.data
            }
        )
        this.$bus.on('sendDeleteMessageRequest', this.handleDeleteMessage)
    },
    methods: {
        handleDeleteMessage(msg) {
            this.msgs.splice(this.msgs.indexOf(msg), 1)
            this.msgs.splice(this.unreadMsgs.indexOf(msg), 1)
            this.msgs.splice(this.hasReadMsg.indexOf(msg), 1)
            Messages.deleteMessageById(msg.id).then(
                response => {
                    alert('删除成功')
                },
                error => {
                    alert('删除失败')
                }
            )
        },
        setAllMessageRead() {
            this.msgs.filter(msg => msg.is_read == false).forEach(msg => msg.is_read = true)
            this.unreadMsgs = []
            this.hasReadMsg = this.msgs
            Messages.setAllMessageRead().then(response => {})
        },
        deleteAllReadMessage() {
            this.msgs = this.msgs.filter(message => message.is_read == false)
            this.hasReadMsg = [];
            Messages.deleteAllReadMessages().then(response => {})
        },
    }
}
</script>
<style scoped>
.container {
  width: 850px;
  margin: 0 auto;
  margin-top: 20px;
}

.messageListTitle {
  font-size: 50px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 10px;
}
</style>
