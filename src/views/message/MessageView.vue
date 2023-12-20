<template>
    <div>
        <button @click="showAllMsg = true">全部消息</button>
        <button @click="showAllMsg = false">全部未读</button>
        <button @click="setAllMessageRead">设为全部已读</button>
        <button @click="deleteAllReadMessages">删除全部已读</button>
        <div class="container">
            <div v-if="showAllMsg">
                <div class="messageListTitle">全部消息</div>
                <div>有{{ unreadMsgs.length }}封未读消息</div>
                <MessageItem v-for="(msg, index) in msgs" :key="index" :msg="msg"></MessageItem>
            </div>
             <div v-else>
                <div class="messageListTitle">未读消息</div>
                <MessageItem v-for="(msg, index) in unreadMsgs" :key="index" :msg="msg"></MessageItem>
             </div>
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
        }
    },
    mounted() {
        this.getAllMessage()
        this.$bus.on('sendDeleteMessageRequest', this.handleDeleteMessage)
        this.$bus.on('sendSetMessageReadByIdRequest', this.setMessageReadById)
    },
    methods: {
        getAllMessage() {
            Messages.getAllReceivedMessages().then(
                response => {
                    this.msgs = response.data
                    this.unreadMsgs = this.msgs.filter(msg => msg.is_read == false)
                }
            )
        },
        handleDeleteMessage(msg) {
            this.msgs.splice(this.msgs.indexOf(msg), 1)
            this.unreadMsgs.splice(this.unreadMsgs.indexOf(msg), 1)
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
            Messages.setAllMessageRead().then(response => {})
        },
        setMessageReadById(msg) {
            Messages.setMessageReadById(msg.id, {is_read: true}).then(
                response => {
                    this.getAllMessage()
                },
                error => {
                    alert('设置为已读失败')
                }
            )
        },
        deleteAllReadMessages() {
            this.msgs = this.msgs.filter(message => message.is_read == false)
            Messages.deleteAllReadMessages().then(
                response => {
                },
                error => {
                }
            )
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
