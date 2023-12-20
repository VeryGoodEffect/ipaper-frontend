<template>
    <div>
        <div v-for="(msg, index) in msgs" :key="index" class="message-container">
            <MessageItem :msg="msg"></MessageItem>
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
            msgs: [],
            unreadMsg: [],
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
            this.msgs.splice(this.unreadMsg.indexOf(msg), 1)
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
            this.unreadMsg = []
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
<style>
</style>
