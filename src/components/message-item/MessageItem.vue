<template>
    <div class="message-container">
        <button class="basic-btn-outline" v-if="!msg.is_read" @click="setMessageRead">{{ $t('read_it') }}</button>
        <button class="basic-btn" v-else>{{ $t('already_read') }}</button>
        <button class="basic-btn" @click="deleteMessage">{{ $t('delete_it') }}</button>
        <h4 class="sender">
            {{ msg.sender.username }}
        </h4>
        <span class="time">
            {{ msg.timestamp }}
        </span>
        <p class="subject" v-ellipsis="{ maxLine: 1, maxWidth: '100%', wrappable: true, transitionTime: '1s' }">
            {{ msg.subject }}
        </p>
        <p v-ellipsis="{ maxLine: 3, maxWidth: '100%', wrappable: true, transitionTime: '1s' }">
            {{ msg.content }}
        </p>
    </div>
</template>
<script>
import i18n from '../../language'
export default {
    name: 'MessageItem',
    props: ['msg'],
    components: {
        i18n
    },
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

<style scoped>
.message-container {
    width: 100%;
    position: relative;
}

button {
    width: 80px;
    height: 30px;
    box-sizing: content-box;
    font-size: 16px;
    padding-top: 5px;
    padding-bottom: 5px;
    position: absolute;
    top: 0;
}

button:first-of-type {
    right: 100px;
}
button:nth-of-type(2) {
    right: 0;
}

.sender {
  font-size: 24px;
  font-weight: bold;
  color: var(--theme-color);
  display: inline-block;
}

.time {
  font-size: 16px;
  color: var(--theme-mode-high-contrast);
  padding-left: 10px;
}

.subject {
  margin-top: 15px;
  font-weight: bold;
  font-size: 20px;
}

@media screen and (max-width: 768px) {
    .message-container  {
        padding-bottom: 40px;
    }
    button:first-of-type {
        top: unset;
        bottom: -10px;
        right: 100px;
    }
    button:nth-of-type(2) {
        top: unset;
        bottom: -10px;
        right: 0;
    }
}

</style>