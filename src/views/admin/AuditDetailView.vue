<template>
    <div ref="wrapper" class="wrapper">
        <div class="detail-view" ref="detailView">
            <div class="button-container">
                <button class="back-button" @click="$emit('back')">{{ $t('audit_return') }}</button>
            </div>
            <div class="main-container">
                <div class="details">
                    <div class="user-name">
                        <span>{{ $t('username_text') }}</span>
                        <span>{{ userName }}</span>
                    </div>
                    <div class="real-name">
                        <span>{{ $t('realName_text') }}</span>
                        <span>{{ realName }}</span>
                    </div>
                    <div class="institution">
                        <span>{{ $t('institution_text') }}</span>
                        <span>{{ institution }}</span>
                    </div>
                    <div class="position">
                        <span>{{ $t('position_text') }}</span>
                        <span>{{ position }}</span>
                    </div>
                    <div class="work-email">
                        <span>{{ $t('workEmail_text') }}</span>
                        <span>{{ workEmail }}</span>
                    </div>
                    <div class="concepts">
                        <span>{{ $t('concepts_text') }}</span>
                        <div>
                            <span v-for="concept in concepts" :key="concept">
                                {{ concept.display_name === '' ? $t('no_concepts') : concept.display_name }}
                            </span>
                        </div>
                    </div>
                    <div class="content">
                        <span>{{ $t('content_text') }}</span>
                        <span>{{ content }}</span>
                    </div>
                    <div class="image-informations">
                        <div> {{ $t('image_material') }}</div>
                        <div class="images-container">
                            <a v-for="image in images" style="cursor: pointer;height: 0;" :key="image" :href=image
                                target="_blank">
                                <div class="image" :style="{ 'background-image': `url('${image}')` }"></div>
                            </a>
                            <span v-if="images.length === 0">{{ $t('no_images') }}</span>
                        </div>
                    </div>
                    <div class="submit-time">
                        <span>{{ $t('submit_time') }} </span>
                        <span v-ellipsis="{ maxLine: 2, wrappable: true, maxWidth: '100%' }">{{ submitTime }}</span>
                    </div>
                </div>

            </div>
            <div class="audit-button-container">
                <button :class="{
                    'approve-button': approved === true,
                    'normal-button': approved !== true,
                    'disabled-button': status !== 0
                }" @click="handleClickApprove">{{ $t('approve_audit') }}</button>
                <button :class="{
                    'reject-button': approved === false,
                    'normal-button': approved !== false,
                    'disabled-button': status !== 0
                }" @click="handleClickDisapprove">{{ $t('disapprove_audit') }}</button>
            </div>
            <div class="audit-area">
                <div ref="approveArea">
                    <div class="check-approve">{{ status === 0 ? $t('check_approve') : $t('approve_submitted') }}</div>
                    <div class="submit-button-container">
                        <button class="submit-button" :class="{ 'disabled-button': status !== 0 }"
                            @click="handleApproveSubmit">{{ $t('submit_audit') }}</button>
                    </div>
                </div>
                <div ref="disapproveArea">
                    <div class="check-disapprove">{{ status === 0 ? $t('check_disapprove') : $t('disapprove_submitted') }}
                    </div>
                    <div class="textarea-container">
                        <textarea draggable="false" :placeholder="rejectReason === '' ? '......' : rejectReason"
                            v-model="reason" :readonly="status !== 0"></textarea>
                    </div>
                    <div class="submit-button-container">
                        <button class="submit-button" :class="{ 'disabled-button': status !== 0 }"
                            @click="handleRejectSubmit">{{ $t('submit_audit') }}</button>
                    </div>
                </div>

            </div>
        </div>
        <div ref="simpleView">
            <audit-list-item :avatar="avatar" :userName="userName" :realName="realName" :applicationType="applicationType"
                :status="status" :submitTime="submitTime" @click="$emit('show-detail')"
                class="simple-view"></audit-list-item>
        </div>
    </div>
</template>

<script>
import AuditListItem from '../../components/list-item/AuditListItem.vue';
import i18n from '../../language';
import { Application } from '../../api/applications';
export default {
    name: 'AuditDetailView',
    components: {
        i18n, AuditListItem
    },
    data() {
        return {
            avatar: `/api/users/${this.userId}/avatar`,
            approved: this.status === 0 ? undefined :
                this.status === 2 ? false : true,
            reason: '',
        }
    },
    unmounted() {
        removeEventListener('resize', this.resize)
    },
    methods: {
        resize() {
            let wrapper = this.$refs.wrapper
            let detailView = this.$refs.detailView
            let simpleView = this.$refs.simpleView
            let approveArea = this.$refs.approveArea
            let disapproveArea = this.$refs.disapproveArea
            switch (this.approved) {
                case true:
                    approveArea.style.display = 'block'
                    disapproveArea.style.display = 'none'
                    break
                case false:
                    approveArea.style.display = 'none'
                    disapproveArea.style.display = 'block'
                    break
                case undefined:
                    approveArea.style.display = 'none'
                    disapproveArea.style.display = 'none'
                    break
            }

            if (this.isDetail === true) {
                detailView.style.display = 'block'
                simpleView.style.display = 'none'
                wrapper.style.height = detailView.scrollHeight + 'px'
            }
            else {
                detailView.style.display = 'none'
                simpleView.style.display = 'block'
                wrapper.style.height = simpleView.scrollHeight + 'px'
            }
        },
        handleClickApprove() {
            if (this.status !== 0) {//说明已经审核过了
                return
            }
            if (this.approved !== true) {
                this.approved = true
            } else {
                this.approved = undefined
            }
        },
        handleClickDisapprove() {
            if (this.status !== 0) {
                return
            }
            if (this.approved !== false) {
                this.approved = false
            } else {
                this.approved = undefined
            }
        },
        handleApproveSubmit() {
            if (this.status !== 0) {
                return
            }
            Application.approveAudited(this.auditId, {
                real_name: this.realName,
                institution: this.institution,
                position: this.position,
                concepts: this.concepts,
                work_email: this.workEmail,
                content: this.content,
                timestamp: this.submitTime,
            }).then(() => {
                this.$emit('approve')
            })

        },
        handleRejectSubmit() {
            if (this.status !== 0) {
                return
            }
            Application.failAudited(this.auditId, {
                failed_reason: this.reason
            }).then(() => {
                this.$emit('disapprove')
            })
        }
    },
    props: {
        userId: {
            type: Number,
            required: true
        },
        auditId: {
            type: Number,
            required: true
        },
        userName: {
            type: String,
            default: '未提供用户名'
        },
        isDetail: {
            type: Boolean,
            required: true,
        },
        realName: {
            type: String,
            required: true,
            default: '未提供真实姓名',
        },
        institution: {
            type: String,
            default: '未提供机构信息',
        },
        position: {
            type: String,
            default: '未提供职务信息',
        },
        concepts: {
            type: Array,
            default: '未提供科研领域信息',
        },
        workEmail: {
            type: String,
            default: '未提供工作邮箱',
        },
        content: {
            type: String,
            default: '没有备注',
        },
        submitTime: {
            type: String,
            required: true,
            default: '提交时间'
        },
        status: {
            type: Number,
            required: true,
            default: '审核状态'
        },
        applicationType: {
            type: String,
            default: '学者门户认证'
        },
        images: {
            type: Array,
            default: []
        },
        rejectReason: {
            type: String,
            default: ''
        }
    },
    computed: {
        language() {
            return this.$t('web_name_text')
        }
    },
    watch: {
        isDetail() {
            this.resize()
        },
        approved() {
            this.resize()
        },
        language() {
            setTimeout(() => {
                this.resize()
            }, (100));
        }
    },
    mounted() {
        this.resize()
        window.addEventListener('resize', this.resize)
    }
}
</script>

<style scoped>
.wrapper {
    margin: 5%;
    border: 2px var(--theme-color) solid;
    background: var(--theme-mode-like);
    border-radius: 15px;
    overflow: hidden;
    transition: all ease-out 0.25s;
}

.detail-view {
    flex-direction: column;
    background: var(--theme-mode-like);
    position: relative;
    padding: 3%;
    padding-bottom: 1%;
    transition: all linear 0.2s;
}

.back-button {
    color: var(--theme-color);
    background: var(--theme-color-10);
}

.back-button:hover {
    background: var(--theme-color);
    color: var(--theme-mode);
}

.normal-button {
    background: var(--theme-color-10);
    color: var(--theme-color);
}

.normal-button:hover {
    background: var(--theme-color);
    color: var(--theme-mode);
}

.approve-button {
    background: #58d24a;
    color: var(--theme-mode);
}

.reject-button {
    background: #ce312d;
    color: var(--theme-mode);
}

.submit-button-container {
    text-align: center;
}

.submit-button {
    background: var(--theme-color);
    color: var(--theme-mode);
}

.approve-button,
.reject-button,
.normal-button,
.submit-button {
    margin: 3% 0 2% 0;
}

.approve-button:hover,
.reject-button:hover,
.submit-button:hover {
    opacity: 0.5;
}

.disabled-button {
    cursor: not-allowed;
}

.disabled-button:hover {
    background: var(--theme-mode-high-contrast);
    color: var(--theme-mode);
}

.check-approve,
.check-disapprove {
    margin: 5% 0;
    text-align: center;
}

.textarea-container {
    width: 70%;
    margin: 0 auto;
}

.textarea-container textarea {
    width: 90%;
    border-radius: 10px;
    padding: 2% 5%;
}

.user-name,
.real-name,
.institution,
.position,
.submit-time,
.work-email,
.content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    word-break: break-all;
    align-items: end;
}

.submit-time {
    margin-top: 10%;
}

.concepts {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.concepts>div>span {
    background: var(--theme-color);
    color: var(--theme-mode);
    border-radius: 5px;
    padding: 3px 5px;
}


.image {
    border-radius: 10%;
    border: 2px var(--theme-color) solid;
    margin-right: 5%;
    display: inline-block;
    height: 5em;
    aspect-ratio: 1;
    background-size: cover;
    background-repeat: no-repeat;
}

.images-container {
    margin-top: 20px;
}

.details>div {
    margin: 3% 1%;
}

.details>div>:nth-child(1) {
    font-weight: 700;
    color: var(--theme-color);
    max-width: 100%;
}


.audit-button-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

@keyframes entry {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>