<template>
    <div class="container">
        <div class="status-select-container">
            <span class="select-tip">{{ $t('select_audit_status') }}</span>
            <select v-model="selectStatus">
                <option :value="-1">{{ $t('all_status') }}</option>
                <option :value="0">{{ $t('not_reviewed') }}</option>
                <option :value="1">{{ $t('access') }}</option>
                <option :value="2">{{ $t('not_access') }}</option>
                <option :value="3">{{ $t('not_confirmed') }}</option>
            </select>
        </div>
        <div class="audit-list">
            <ul>
                <pagination :items-per-page="itemsPerPage" :total-pages="totalPages" :current-page="currentPage"
                    @change-page="handleChangePage" @change-item-per-page="handleChangePerPage">
                    <li v-for="data in auditDatas" :key="data.submitTime">
                        <audit-detail-view v-bind="data" @back="data.isDetail = false" @show-detail="data.isDetail = true"
                            @approve="data.status = 3" @disapprove="data.status = 2"></audit-detail-view>
                    </li>
                </pagination>
                <li v-if="auditDatas.length === 0" class="no-result-tip">{{ $t('no_audit_results') }}</li>
            </ul>
        </div>
    </div>
</template>
<script>

import i18n from '../../language';
import { Application } from '../../api/applications';
import Pagination from '../../components/pagination/Pagination.vue';
import AuditDetailView from './AuditDetailView.vue';
export default {
    name: 'AdminView',
    components: {
        Pagination,
        AuditDetailView,
        i18n
    },
    data() {
        return {
            AvailableStatus: [-1, 0, 1, 2, 3],
            selectStatus: -1,
            currentPage: 1,
            itemsPerPage: 5,
            totalPages: 1,
            auditDatas: []
        }
    },
    methods: {
        parseStatus(statusString) {
            let statusNumber
            switch (statusString) {
                case 'processing':
                    statusNumber = 0
                    break
                case 'approved':
                    statusNumber = 1
                    break
                case 'failed':
                    statusNumber = 2
                    break
                case 'unconfirmed':
                    statusNumber = 3
                    break
                default:
                    statusNumber = 0
                    break
            }
            return statusNumber
        },
        packStatus(statusNumber) {
            let statusString
            switch (statusNumber) {
                case 0:
                    statusString = 'processing'
                    break
                case 1:
                    statusString = 'approved'
                    break
                case 2:
                    statusString = 'failed'
                    break
                case 3:
                    statusString = 'unconfirmed'
                    break
                default:
                    statusString = 'processing'
                    break
            }
            return statusString
        },
        handleChangePage(page) {
            this.currentPage = page
            const param = {
                limit: this.itemsPerPage,

                offset: this.itemsPerPage * (this.currentPage - 1)
            }
            this.getResult(param)
        },
        handleChangePerPage(perPage) {
            this.itemsPerPage = perPage
            const param = {
                limit: this.itemsPerPage,
                offset: 0
            }
            this.getResult(param)
        },
        getResult(param) {
            Application.getAuditedList(param).then((data) => {
                this.totalPages = Math.ceil(data.data.count / this.itemsPerPage)
                console.log(this.totalPages)
                this.auditDatas = data.data.results.map((result) => {
                    let statusNumber = this.parseStatus(result.status)
                    let image = []
                    if (result.image1 !== null) {
                        image.push(result.image1)
                    }
                    if (result.image2 !== null) {
                        image.push(result.image2)
                    }
                    if (result.image3 !== null) {
                        image.push(result.image3)
                    }
                    return {
                        auditId: result.id,
                        userId: result.applicant.id,
                        userName: result.applicant.username,
                        isDetail: false,
                        institution: result.institution,
                        realName: result.real_name,
                        applicationType: '学者门户认证',
                        status: statusNumber,
                        position: result.position,
                        workEmail: result.work_email,
                        content: result.content,
                        submitTime: result.timestamp,
                        concepts: result.concepts,
                        images: image,
                        rejectReason: result.rejectReason
                    }
                }, (err) => { alert(err) })
            })
        }
    },
    mounted() {
        const param = {
            limit: this.itemsPerPage,
            offset: this.itemsPerPage * (this.currentPage - 1)
        }
        this.getResult(param)
    },
}
</script >
<style scoped>
.container {
    position: relative;
}

.audit-list {
    margin: 0 20%;
    background: var(--theme-color-10);
    padding: 20px;
    border-radius: 15px;
}

.status-select-container {
    display: flex;
    justify-content: end;
    margin: 2% 3%;
}

select {
    background: var(--theme-mode);
    color: var(--theme-color);
    border-radius: 5px;
    cursor: pointer;
}

.select-tip {
    color: var(--theme-color);
    font-weight: 700;
    margin-right: 2%;
}
</style>