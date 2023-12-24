<template>
    <div class="container">
        <button class="basic-btn" @click="setAllMessageRead">{{ $t('set_read_all') }}</button>
        <button class="basic-btn" @click="deleteAllReadMessages">{{ $t('delete_read') }}</button>
        <div v-if="showAllMsg">
            <h2 class="message-list-title">
                {{ $t('message_all') }}
                <svg @click="showAllMsg = false"
                    t="1703149418371" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" id="mx_n_1703149418372" width="200" height="200"><path d="M123.751 409.147h259.974c15.85 0 25.364-12.682 25.364-25.364 0-15.854-12.682-25.363-25.364-25.363H183.99c60.236-123.646 183.882-209.248 326.551-209.248 180.713 0 332.891 136.328 358.254 310.699h53.898C897.331 256.965 722.958 98.447 510.541 98.447c-155.35 0-288.506 85.602-361.426 212.417V123.809c0-12.681-9.509-25.363-25.364-25.363-12.681 0-25.363 12.682-25.363 25.363v259.974c0.001 25.364 25.363 25.364 25.363 25.364m776.748 206.076h-259.97c-15.854 0-25.363 12.682-25.363 25.364 0 15.848 12.682 25.362 25.363 25.362h196.563C780.025 789.592 653.21 872.026 510.541 872.026c-180.713 0-332.891-136.328-358.254-310.7h-50.725C126.925 767.403 301.293 925.92 510.541 925.92c155.35 0 291.674-85.598 361.427-212.417v187.054c0 15.854 12.682 25.363 25.363 25.363 15.851 0 25.363-12.681 25.363-25.363V640.588c3.169-25.365-22.195-25.365-22.195-25.365m0 0z" p-id="4409"></path></svg>
            </h2>
            <!-- 这里注意英文复数 -->
            <p>{{ $t('unread_cnt_1') }}{{ unreadMsgs.length }}{{$t(unreadMsgs.length > 1 ? 'unread_cnt_3' : 'unread_cnt_2')}}</p>
            <div class="message-wrapper" v-for="(msg, index) in msgs" :key="index">
                <MessageItem :msg="msg"></MessageItem>
            </div>
        </div>
            <div v-else>
            <h2 class="message-list-title unread-msg">
                {{ $t('message_unread') }}
                <svg @click="showAllMsg = true" t="1703149418371" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" id="mx_n_1703149418372" width="200" height="200"><path d="M123.751 409.147h259.974c15.85 0 25.364-12.682 25.364-25.364 0-15.854-12.682-25.363-25.364-25.363H183.99c60.236-123.646 183.882-209.248 326.551-209.248 180.713 0 332.891 136.328 358.254 310.699h53.898C897.331 256.965 722.958 98.447 510.541 98.447c-155.35 0-288.506 85.602-361.426 212.417V123.809c0-12.681-9.509-25.363-25.364-25.363-12.681 0-25.363 12.682-25.363 25.363v259.974c0.001 25.364 25.363 25.364 25.363 25.364m776.748 206.076h-259.97c-15.854 0-25.363 12.682-25.363 25.364 0 15.848 12.682 25.362 25.363 25.362h196.563C780.025 789.592 653.21 872.026 510.541 872.026c-180.713 0-332.891-136.328-358.254-310.7h-50.725C126.925 767.403 301.293 925.92 510.541 925.92c155.35 0 291.674-85.598 361.427-212.417v187.054c0 15.854 12.682 25.363 25.363 25.363 15.851 0 25.363-12.681 25.363-25.363V640.588c3.169-25.365-22.195-25.365-22.195-25.365m0 0z" p-id="4409"></path></svg>
            </h2>
            <div class="message-wrapper" v-for="(msg, index) in unreadMsgs" :key="index">
                <MessageItem :msg="msg"></MessageItem>
            </div>
            </div>
    </div>
</template>

<script>
import MessageItem from '../../components/message-item/MessageItem.vue'
import { Messages } from '../../api/messages.js'
import i18n from '../../language'

export default {
    name: 'MessageView',
    components: {
        MessageItem,
        i18n
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
                    // alert('删除成功')
                },
                error => {
                    // alert('删除失败')
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
                    // alert('设置为已读失败')
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
  width: 60%;
  /* min-width: 530px; */
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
}

.container button {
    position: absolute;
    right: 0;
    font-size: 14px;
    margin-top: 10px;
}
.container button:first-of-type {
    right: 120px;
}


.message-list-title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 0;
}

.message-list-title svg {
    width: 35px;
    height: 35px;
    margin-left: 5px;
    cursor: pointer;
    fill: var(--default-text-color)
}

.container p {
    margin-bottom: 20px;
    color: var(--theme-color);
    font-weight: bold;
}

.unread-msg {
    margin-bottom: 45px;
}

.message-wrapper {
    padding: 20px 0;
    border-bottom: 1px solid var(--theme-mode-contrast);
}
.message-wrapper:last-child {
    border-bottom: 0;
}

@media screen and (max-width: 768px) {
    .container {
        width: 80%;
    }
    .message-list-title {
        font-size: 30px;
    }
    .message-list-title svg {
        width: 30px;
        height: 30px;
    }
}

@media screen and (max-width: 500px) {
    .message-wrapper:first-of-type {
        margin-top: 40px;
    }

    .container button {
        right: unset;
        left: 0;
        top: 60px;
    }

    .container button:nth-of-type(2) {
        left: 120px;
    }
}
</style>
