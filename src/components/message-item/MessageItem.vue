<template>
    <div>
        <button v-if="!msg.is_read" @click="setMessageRead">设为已读</button>
        <button v-else>已读</button>
        <button @click="deleteMessage">删除</button>
        <div>
            {{ msg.sender.username }}
        </div>
        <div>
            {{ msg.timestamp }}
        </div>
        <div>
            {{ msg.subject }}
        </div>
        <div>
            {{ msg.content }}
        </div>
        <div>
            {{ msg.is_read }}
        </div>
    </div>
</template>
<script>
import { Messages } from '../../api/messages.js'
export default {
    name: 'MessageItem',
    props: ['msg'],
    methods: {
        setMessageRead() {
            this.$bus.emit('sendSetMessageReadByIdRequest', this.msg)
            this.msg.is_read = true
        },
        deleteMessage() {
            this.$bus.emit('sendDeleteMessageRequest', this.msg)
        }
    }
}
</script>
<style>
</style>