<!-- 审核列表表项 -->
<template>
    <div class="container">
        <div class="main-area">
            <div class="left-area">
                <div class="informations">
                    <div class="nick-name">
                        <span>{{ $t('username_text') }} </span>
                        <span>{{ userName }}</span>
                    </div>
                    <div class="real-name">
                        <span>{{ $t('realName_text') }} </span>
                        <span>{{ realName }}</span>
                    </div>
                    <div class="application-type">
                        <span>{{ $t('application_type') }}</span>
                        <span>{{ applicationType }}</span>
                    </div>
                </div>
            </div>
            <div class="right-area">
                <div class="avatar" ref="avatarContainer" :style="{ 'background-image': `url('${avatar}')` }"></div>
            </div>
        </div>
        <div class="status-bar">
            <div>
                <div class="status-dot"
                    :style="{ 'background-color': status === 0 ? '#f48216' : status === 1 ? '#58d24a' : status === 2 ? '#ce312d' : '#1177f0' }">
                </div>
                <!-- TODO:改成v-if -->
                <div class="status-text">
                    <span v-if="status === 0">{{ $t('not_reviewed') }}</span>
                    <span v-if="status === 1">{{ $t('access') }}</span>
                    <span v-if="status === 2">{{ $t('not_access') }}</span>
                    <span v-if="status === 3">{{ $t('not_confirmed') }}</span>
                </div>
            </div>
            <div class="submit-time">{{ $t('submit_time') }} : {{ submitTime }}</div>
        </div>
    </div>
</template>

<script>
import i18n from '../../language';
export default {
    name: "infoItem",
    components: {
        i18n,
    },
    data() {
        return {

        }
    },
    props: {
        userName: {
            type: String,
            default: '用户名'
        },
        realName: {
            type: String,
            default: '真实姓名'
        },
        applicationType: {
            type: String,
            default: '学者门户认证'
        },
        avatar: {
            type: String,
            default: "/public/3d models/avatar.jpg"
        },
        status: {
            type: Number,
            default: 0
        },
        submitTime: {
            type: String,
            required: true
        }
    },


}
</script>

<style scoped>
.container {
    padding: 5%;
    padding-bottom: 2%;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    transition: all linear 0.15s;
}

.container:hover {
    background: var(--theme-color-30);
}



.container * {
    white-space: nowrap;
    text-overflow: ellipsis;
}

.main-area {
    display: flex;
    overflow: hidden;
}

.avatar {
    max-height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    aspect-ratio: 1;
    border-radius: 50%;
}

.informations {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.informations>div {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
}

.informations>div :nth-child(1) {
    font-weight: 700;
    color: var(--theme-color);
}



.application-type {
    margin-top: 8%;
    border-top: 1px var(--theme-color) solid;
}

.status-bar {
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.status-dot {
    aspect-ratio: 1;
    height: 15px;
    border-radius: 50%;
    display: inline-block;
}

.status-text {
    display: inline-block;
    margin-left: 10px;
}

.status-text span {
    font-size: 13px;
    vertical-align: top;
}

.submit-time {
    font-size: 13px;
    vertical-align: top;
}


.left-area {
    height: 100%;
    flex: 4;
    padding: 0 5%;
}


.right-area {
    height: 100%;
    flex: 1;
}
</style>
