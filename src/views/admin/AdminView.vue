<template>
    <div class="audit-list">
        <ul>
            <pagination :items-per-page="itemsPerPage" :total-pages="totalPages" :current-page="currentPage"
                @change-page="handleChangePage" @change-item-per-page="handleChangePerPage">
                <li v-for="data in auditDatas" :key="data.submitTime">
                    <audit-detail-view v-bind="data" @back="data.isDetail = false"
                        @show-detail="data.isDetail = true"></audit-detail-view>
                </li>
            </pagination>
        </ul>
    </div>
</template>
<script>
import { Application } from '../../api/applications';
import Pagination from '../../components/pagination/Pagination.vue';
import AuditDetailView from './AuditDetailView.vue';
export default {
    name: 'AdminView',
    components: {
        Pagination,
        AuditDetailView
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
            totalPages: 1,
            auditDatas: []
        }
    },
    methods: {
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
                    let statusNumber
                    switch (result.status) {
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
                        id: result.applicant.id,
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
                        images: image
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
.audit-list {
    margin: 0 20%;
    background: var(--theme-color-10);
    padding: 20px;
    border-radius: 15px;
}
</style>