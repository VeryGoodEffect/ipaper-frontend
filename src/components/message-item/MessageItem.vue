<template>
    <div>
        <button @click="setMessageRead">已读</button>
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
            Messages.setMessageReadById(this.msg.id, {is_read: true}).then(
                response => {
                    alert('成功设置为已读')
                    // 这里应该有一个反应
                    this.msg.is_read = true
                },
                error => {
                    alert('设置为已读失败')
                }
            )
        },
        deleteMessage() {
            this.$bus.emit('sendDeleteMessageRequest', this.msg)
        }
    }
}
</script>
<style>
</style>