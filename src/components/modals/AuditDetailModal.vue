<template>
<PopoutModal :show="show" @close="handleClose">
    <div class="container">
        <h3>{{ $t('audit_detail_text') }}</h3>
        <div>
            {{ $t('audit_progress')}}: 
            <span v-if="this.status == 'processing'">{{ $t('audit_is_submit') }}</span>
            <span v-else-if="this.status == 'unconfirmed'">{{ $t('audit_unconfirmed') }}</span>
            <span v-else-if="this.status == 'failed'">{{ $t('audit_failed') }}</span>
            <span v-else-if="this.status == 'approved'">{{ $t('audit_approved') }}</span>
            <n-progress type="line" :percentage="this.percentage" :indicator-placement="'inside'" processing />
        </div>
        <div>
            <p>{{ $t('auditor_username') }} : {{ auditorUsername }}</p>
            <p>{{ $t('realName_text') }} : {{ real_name }}</p>
            <p>{{ $t('institution_text') }} : {{ institution }}</p>
            <p>{{$t('position_text')}} : {{ position }}</p>
            <p>{{$t('concepts_text')}} : {{ concepts }}</p>
            <p>{{$t('workEmail_text')}} : {{ work_email }}</p>
            <p>{{$t('audit_content')}} : {{ content }}</p>
            <p>{{$t('audit_timestamp')}} : {{ timestamp }}</p>
            <img v-if="image1 != null" :src="image1" style="height: 100px; width: 100px">
            <img v-if="image2 != null" :src="image2" style="height: 100px; width: 100px">
            <img v-if="image3 != null" :src="image3" style="height: 100px; width: 100px">
        </div>
        <div class="btn-box">
            <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
            <button class="basic-btn" @click="modifyAuthenticateModalShouldShow = true">{{ $t('re_audit')}}</button>
        </div>
    </div>
    <ModifyAuthenticateModal :show="modifyAuthenticateModalShouldShow" @close="modifyAuthenticateModalShouldShow = false" />
</PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'
import ModifyAuthenticateModal from './ModifyAuthenticateModal.vue'
import i18n from '../../language'
import {
    Application
} from '../../api/applications.js'
import {
    NProgress
} from 'naive-ui'
export default {
    name: 'AuditDetailModal',
    emits: ['close'],
    props: ['show', 'auditDetail'],
    components: {
        NProgress,
        PopoutModal,
        ModifyAuthenticateModal,
        i18n
    },
    data() {
        return {
            percentage: 0,
            status: null,
            modifyAuthenticateModalShouldShow: false,
            real_name: '',
            auditorUsername: '',
            institution: '',
            position: '',
            concepts: '',
            work_email: '',
            content: '',
            timestamp: '',
            image1: null,
            image2: null,
            image3: null
        }
    },
    mounted() {
        this.getAuditDetail()
        this.$bus.on('sendFlushAuditDetailRequest', this.flushAuditDetail)
    },
    methods: {
        handleClose() {
            this.$emit('close')
        },
        flushAuditDetail() {
            this.getAuditDetail()
        },
        getAuditDetail() {
            Application.getSubmittedList().then(
                response => {
                    if (response.data.length != 0) {
                        this.real_name = response.data[0].real_name
                        this.auditorUsername = response.data[0].auditor.username
                        this.institution = response.data[0].institution
                        this.position = response.data[0].position
                        this.concepts = response.data[0].concepts.concepts
                        this.work_email = response.data[0].work_email
                        this.content = response.data[0].content
                        this.timestamp = response.data[0].timestamp
                        this.image1 = response.data[0].image1
                        this.image2 = response.data[0].image2
                        this.image3 = response.data[0].image3
                        this.status = response.data[0].status
                        if (this.status == 'processing') {
                            this.percentage = 33
                        } else if (this.status == 'unconfirmed') {
                            this.percentage = 67
                        } else {
                            this.percentage = 100
                        }
                    }
                },
                error => {
                    console.log(error.message);
                }
            )
        },
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.container>* {
    min-width: 60%;
}

.container>h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}

.container>h3,
.container>h3 * {
    font-size: 40px;
    font-weight: bold;
}

.container>input {
    width: 70%;
    height: 60px;
    font-size: 24px;
    padding-left: 20px;
    padding-right: 20px;
}

.container>input::placeholder {
    color: var(--theme-mode-high-contrast);
}

.container>input:first-of-type {
    margin-bottom: 40px;
}

.container>input:last-of-type {
    margin-bottom: 5px;
}

.container>span {
    width: 70%;
    font-size: 16px;
    margin-bottom: 25px;
}

.btn-box {
    width: 70%;
    display: flex;
    justify-content: space-around;
}

.btn-box button {
    width: 120px;
    height: 50px;
    font-size: 24px;
}

p:first-of-type {
    margin-top: 10px;
}

p {
    margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
    .container>h3 {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 30px
    }

    .container>h3 span {
        display: none;
    }

    .container>input {
        height: 40px;
        font-size: 18px;
        padding-left: 10px;
    }

    .container>input:first-of-type {
        margin-bottom: 20px;
    }

    .container>input,
    .container>span,
    .btn-box {
        min-width: 80%;
    }

    .btn-box button {
        width: 80px;
        height: 30px;
        font-size: 16px;
    }

    .container>span,
    .container>span>a {
        font-size: 14px;
    }
}
</style>
