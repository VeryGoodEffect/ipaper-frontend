<template>
<PopoutModal :show="show" @close="handleClose">
    <div class="container">
        审核进度：
        <div v-if="this.percentage == 100">{{ this.auditDetail.status }}</div>
        <div v-else>正在审核中</div>
        <n-progress type="line" :percentage="this.percentage" :indicator-placement="'inside'" processing />
    </div>
    <div>
        提交认证信息
    </div>
    <div>
        <p>审核管理员: {{ auditorUsername }}</p>
        <p>{{ real_name }}</p>
        <p>{{ institution }}</p>
        <p>{{ position }}</p>
        <p>{{ concepts }}</p>
        <p>{{ work_email }}</p>
        <p>{{ content }}</p>
        <p>{{ timestamp }}</p>
        <img v-if="image1 != null" :src="image1" style="height: 100px; width: 100px">
        <img v-if="image2 != null" :src="image2" style="height: 100px; width: 100px">
        <img v-if="image3 != null" :src="image3" style="height: 100px; width: 100px">
        <!-- 这里吧图片弄一下就ok -->
    </div>
    <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
    <button class="basic-btn authenticate-btn" @click="modifyAuthenticateModalShouldShow = true">重新认证</button>
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
                            this.percentage = 50
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

<style></style>
