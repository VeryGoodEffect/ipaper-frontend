<template>
<div class="main-part">
    <div class="info-tag-list">
        <div class="personal-info">
            <div class="personal-image">
                <img :src="personalInfo.avatarUrl" alt="Personal Image" @mouseover="avatarIsHovered = true" @mouseleave="handleMouseLeaveAvatar" @click="uploadAvatar">
                <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange" />
            </div>
            <div class="personal-info-text">
                <p class="personal-info-text-nickname">
                    <!-- {{ $t('personal_info_nick_name') }}:  -->
                    <template v-if="!isEditing">{{ personalInfo.nickName }}</template>
                    <input class="basic-input edit-input-nickname" v-else type="text" v-model="personalInfo.nickName" />
                </p>
                <p class="personal-info-text-real-name">
                    <!-- {{ $t('personal_info_real_name') }}:  -->
                    <template v-if="!isEditing">{{ personalInfo.realName }}</template>
                    <input class="basic-input edit-input-real-name" v-else type="text" v-model="personalInfo.realName" :placeholder="$t('personal_info_real_name')" />
                </p>
                <p class="personal-info-text-region">
                    <em>{{ $t('personal_info_region') }}</em>&nbsp;&nbsp;
                    {{ personalInfo.region }}
                </p>
                <p class="personal-info-text-gender">
                    <em>{{ $t('personal_info_gender') }}</em>&nbsp;&nbsp;
                    <template v-if="!isEditing">{{ $t(personalInfo.gender) }}</template>
                    <template v-else>
                        <input id="male" type="radio" value="gender_male" v-model="personalInfo.gender" />
                        <label for="male">{{ $t('gender_male') }}</label>
                        <input id="female" type="radio" value="gender_female" v-model="personalInfo.gender" />
                        <label for="female">{{ $t('gender_female') }}</label>
                        <input id="unset" type="radio" value="gender_unset" v-model="personalInfo.gender" />
                        <label for="unset">{{ $t('gender_unset') }}</label>
                    </template>

                </p>
                <p class="personal-info-text-institution" v-if="personalInfo.institution || isEditing">
                    <em>{{ $t('personal_info_institution') }}</em>&nbsp;&nbsp;
                    <template v-if="!isEditing">{{ personalInfo.institution }}</template>
                    <input class="basic-input edit-input-text" v-else type="text" v-model="personalInfo.institution" />
                </p>
                <!-- <p class="personal-info-text-major">
                <em>{{ $t('personal_info_major') }}</em>&nbsp;&nbsp;
                {{ personalInfo.major }}
              </p> -->
                <p class="personal-info-text-email">
                    <em>{{ $t('personal_info_email') }}</em>&nbsp;&nbsp;
                    <template v-if="!isEditing">{{ personalInfo.email }}</template>
                    <input class="basic-input edit-input-text" v-else type="text" v-model="personalInfo.email" />
                </p>
                <p class="personal-info-text-url" v-if="personalInfo.urls.length !== 0 || isEditing">
                    <em>{{ $t('personal_info_url') }}</em>
                    <ul class="personal-info-text-url-list">
                        <li v-for="(url, index) in personalInfo.urls" :key="index">
                            &nbsp;&nbsp;&nbsp;
                            <svg t="1702890339983" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227">
                                <path d="M377.6 473.6C377.6 448 384 422.4 403.2 403.2l70.4-70.4 57.6-57.6c19.2-19.2 38.4-25.6 64-25.6 25.6 0 44.8 6.4 64 25.6 38.4 38.4 38.4 89.6 0 128l-128 128C512 550.4 492.8 556.8 467.2 556.8L416 608C428.8 614.4 448 620.8 467.2 620.8 512 620.8 544 601.6 576 576l128-128c57.6-57.6 57.6-153.6 0-211.2-57.6-57.6-153.6-57.6-211.2 0l-128 128C320 403.2 307.2 467.2 326.4 524.8L377.6 473.6z" p-id="4228"></path>
                                <path d="M646.4 550.4c0 25.6-6.4 51.2-25.6 70.4l-128 128c-19.2 19.2-38.4 25.6-64 25.6-25.6 0-44.8-6.4-64-25.6-38.4-38.4-38.4-89.6 0-128l128-128c19.2-19.2 44.8-25.6 70.4-25.6l51.2-51.2C588.8 409.6 576 403.2 556.8 403.2 512 403.2 473.6 422.4 448 448L320 576c-57.6 57.6-57.6 153.6 0 211.2 57.6 57.6 153.6 57.6 211.2 0l128-128c44.8-44.8 57.6-108.8 32-160L646.4 550.4z" p-id="4229"></path>
                            </svg>
                            <a :href="url" target="_blank" v-if="!isEditing">{{ url }}</a>
                            <input class="basic-input url-input" v-else type="text" v-model="personalInfo.urls[index]" />
                            <svg v-if="isEditing" @click="personalInfo.urls.splice(index, 1);" t="1703220686999" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3523" id="mx_n_1703220687001" width="200" height="200">
                                <path d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128" p-id="3524"></path>
                                <path d="M649.824 361.376a31.968 31.968 0 0 0-45.248 0L505.6 460.352l-98.976-98.976a31.968 31.968 0 1 0-45.248 45.248l98.976 98.976-98.976 98.976a32 32 0 0 0 45.248 45.248l98.976-98.976 98.976 98.976a31.904 31.904 0 0 0 45.248 0 31.968 31.968 0 0 0 0-45.248L550.848 505.6l98.976-98.976a31.968 31.968 0 0 0 0-45.248" p-id="3525"></path>
                            </svg>
                        </li>
                        <li class="add-url" v-if="isEditing">
                            &nbsp;&nbsp;&nbsp;
                            <svg t="1702890339983" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227">
                                <path d="M377.6 473.6C377.6 448 384 422.4 403.2 403.2l70.4-70.4 57.6-57.6c19.2-19.2 38.4-25.6 64-25.6 25.6 0 44.8 6.4 64 25.6 38.4 38.4 38.4 89.6 0 128l-128 128C512 550.4 492.8 556.8 467.2 556.8L416 608C428.8 614.4 448 620.8 467.2 620.8 512 620.8 544 601.6 576 576l128-128c57.6-57.6 57.6-153.6 0-211.2-57.6-57.6-153.6-57.6-211.2 0l-128 128C320 403.2 307.2 467.2 326.4 524.8L377.6 473.6z" p-id="4228"></path>
                                <path d="M646.4 550.4c0 25.6-6.4 51.2-25.6 70.4l-128 128c-19.2 19.2-38.4 25.6-64 25.6-25.6 0-44.8-6.4-64-25.6-38.4-38.4-38.4-89.6 0-128l128-128c19.2-19.2 44.8-25.6 70.4-25.6l51.2-51.2C588.8 409.6 576 403.2 556.8 403.2 512 403.2 473.6 422.4 448 448L320 576c-57.6 57.6-57.6 153.6 0 211.2 57.6 57.6 153.6 57.6 211.2 0l128-128c44.8-44.8 57.6-108.8 32-160L646.4 550.4z" p-id="4229"></path>
                            </svg>
                            <input class="basic-input url-input" type="text" v-model="urlAdding" />
                            <svg class="cross" @click="if (urlAdding !== '') personalInfo.urls.push(urlAdding); urlAdding=''" t="1703220134641" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7499" id="mx_n_1703220134642" width="200" height="200">
                                <path d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128" p-id="7500"></path>
                                <path d="M683.936 470.944H544v-139.968a32 32 0 1 0-64 0v139.968h-139.936a32 32 0 0 0 0 64H480v139.968a32 32 0 0 0 64 0v-139.968h139.968a32 32 0 0 0 0-64" p-id="7501"></path>
                            </svg>
                        </li>
                    </ul>
                </p>
                <svg v-if="!isEditing" @click="enterEditingMode" t="1703218462193" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6301" id="mx_n_1703218462195" width="200" height="200">
                    <path d="M853.333333 501.333333c-17.066667 0-32 14.933333-32 32v320c0 6.4-4.266667 10.666667-10.666666 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h320c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666666-74.666667V533.333333c0-17.066667-14.933333-32-32-32z" p-id="6302"></path>
                    <path d="M405.333333 484.266667l-32 125.866666c-2.133333 10.666667 0 23.466667 8.533334 29.866667 6.4 6.4 14.933333 8.533333 23.466666 8.533333h8.533334l125.866666-32c6.4-2.133333 10.666667-4.266667 14.933334-8.533333l300.8-300.8c38.4-38.4 38.4-102.4 0-140.8-38.4-38.4-102.4-38.4-140.8 0L413.866667 469.333333c-4.266667 4.266667-6.4 8.533333-8.533334 14.933334z m59.733334 23.466666L761.6 213.333333c12.8-12.8 36.266667-12.8 49.066667 0 12.8 12.8 12.8 36.266667 0 49.066667L516.266667 558.933333l-66.133334 17.066667 14.933334-68.266667z" p-id="6303"></path>
                </svg>
            </div>
            <div class="btn-wrapper">
                <button v-if="isEditing" class="basic-btn authenticate-btn" @click="submitChangePersonalInfo">{{ $t('confirm_text' )}}</button>
                <button v-if="isEditing" class="basic-btn authenticate-btn" @click="cancelChangePersonalInfo">{{ $t('cancel_text' )}}</button>
                <button v-if="!isEditing" class="basic-btn authenticate-btn" @click="authenticateModalShouldShow = true">{{ $t('authenticate_text') }}</button>
                <button v-if="!isEditing" class="basic-btn authenticate-btn" @click="modifyAuthenticateModalShouldShow = true">{{ $t('authenticate_text') }}</button>
            </div>
        </div>
        <div class="tag-and-list">
            <div class="list">
                <div class="favourites-header">
                    <div class="favourites-subscribe-tab">
                        <h4 :class="[{'tab tab-not-selected': !isFavourite}, { 'tab tab-selected': isFavourite }]" @click="isFavourite = true">
                            {{ $t('favourites') }}
                        </h4>
                        <h4 :class="[{'tab tab-selected': !isFavourite}, { 'tab tab-not-selected': isFavourite }]" @click="isFavourite = false">
                            {{ $t('personal_follow_list') }}
                        </h4>
                    </div>
                    <button class="favourites-creation" @click="isCreating = true" v-if="isFavourite">
                        {{ $t('create_favourites') }}
                    </button>
                </div>
                <div class="favorites-list" v-if="isFavourite">
                    <FavouriteList @cancelCreation="cancelCreation" @updateCreation="updateCreation" :isCreating="isCreating" :favouritesInfo="favouritesInfo" />
                </div>
                <div class="follow-list" v-else>
                    <FollowList :userID="personalInfo.id" />
                </div>
            </div>
            <div class="personal-tag">
                <h3>{{ $t('personal_interest_tags') }}</h3>
                <button @click="interestTagSelectorModalShow = true">添加兴趣标签</button>
                <div class="tag-container">
                    <p v-for="(tag, index) in interestTag" :key="index" class="tag-item">
                        {{ tag.name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<AuthenticateIdentityModal :show="authenticateModalShouldShow" @close="authenticateModalShouldShow = false" />

<ModifyAuthenticateModal :show="modifyAuthenticateModalShouldShow" @close="modifyAuthenticateModalShouldShow = false" />

<InterestTagSelectorModal :show="interestTagSelectorModalShow" @close="interestTagSelectorModalShow = false" />
</template>

<script>
import FavouriteListItem from '../../components/favorites/FavouriteListItem.vue'
import i18n from '../../language'
import FavouriteList from '../../components/favorites/FavouriteList.vue'
import {
    User
} from '../../api/users.js'
import {
    Article
} from '../../api/article.js'
import FollowList from '../../components/follow-list/FollowList.vue'
import AuthenticateIdentityModal from '../../components/modals/AuthenticateIdentityModal.vue'
import ModifyAuthenticateModal from '../../components/modals/ModifyAuthenticateModal.vue'
import InterestTagSelectorModal from "../../components/modals/InterestTagSelectorModal.vue";
import {
    dataTool
} from 'echarts'
export default {
    components: {
        FavouriteListItem,
        FavouriteList,
        FollowList,
        AuthenticateIdentityModal,
        ModifyAuthenticateModal,
        InterestTagSelectorModal,
        i18n,
    },
    data() {
        return {
            isEditing: false,
            urlAdding: '',
            authenticateModalShouldShow: false,
            modifyAuthenticateModalShouldShow: false,
            interestTagSelectorModalShow: false,
            infoItem: {
                title: "低碳经济: 人类经济发展方式的新变革",
                author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
                excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
                timeCited: 57,
                keyword: "经济",
            },
            avatarFile: null,
            avatarUrl: '',
            personalInfo: {
                id: '',
                avatarUrl: '',
                nickName: '',
                realName: '',
                region: '',
                institution: '',
                email: '',
                gender: '',
                urls: [],
                major: ''
            },
            savePersonalInfo: {},
            avatarIsHovered: false,
            isChangeing: false,
            isCreating: false,
            moveVisible: false,
            isFavourite: true,
            favouritesInfo: [],
        }
    },

    created() {
        this.getUserInfo()
        // this.$bus.on('auditedProcessing', setButtonProcessingStatus)
        // this.$bus.on('')
    },
    methods: {
        getUserInfo() {
            console.log(this.$cookies.get('user_id'))
            let userId = this.$cookies.get('user_id')
            if (userId) {
                User.getUser(userId).then(
                    (response) => {
                        this.personalInfo.id = userId
                        this.personalInfo.nickName = response.data.username
                        this.personalInfo.realName = response.data.real_name
                        this.personalInfo.region = response.data.region
                        this.personalInfo.gender = response.data.gender
                        this.personalInfo.institution = response.data.institution
                        this.personalInfo.email = response.data.email
                        this.personalInfo.urls = response.data.websites
                        for (let i = 0; i < this.personalInfo.urls.length; i++) {
                            if (!this.personalInfo.urls[i].startsWith('http://') &&
                                !this.personalInfo.urls[i].startsWith('https://')) {
                                this.personalInfo.urls[i] = "http://" + this.personalInfo.urls[i]
                            }
                        }
                        this.personalInfo.avatarUrl = 'api/users/' + userId + '/avatar/'
                    },
                    (error) => {
                        console.log(error)
                    }
                )
                User.getFavoriteList(0).then(
                    (response) => {
                        console.log(response)
                        // console.log(response.data.username)
                        for (var i = 0; i < response.data.length; i++) {
                            this.favouritesInfo.push({
                                name: response.data[i].name,
                                id: response.data[i].id
                            })
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }
        },
        changePersonalInfo() {
            this.isChangeing = true
            this.cur2savePersonalInfo()
        },
        submitChangePersonalInfo() {
            this.isEditing = false
            let userId = this.$cookies.get('user_id')
            if (this.urlAdding !== '') {
                this.personalInfo.urls.push(this.urlAdding)
                this.urlAdding = ''
            }
            for (let i = 0; i < this.personalInfo.urls.length; i++) {
                if (!this.personalInfo.urls[i].startsWith('http://') &&
                    !this.personalInfo.urls[i].startsWith('https://')) {
                    this.personalInfo.urls[i] = "http://" + this.personalInfo.urls[i]
                }
            }
            let data = {
                username: this.personalInfo.nickName,
                real_name: this.personalInfo.realName,
                gender: this.personalInfo.gender,
                institution: this.personalInfo.institution,
                websites: this.personalInfo.urls
            }
            if (userId) {
                User.changePersonalInfo(userId, data).then(
                    response => {
                        this.cur2savePersonalInfo()
                    },
                    error => {
                        this.save2curPersonalInfo()
                        alert(error.message)
                    }
                )
            }
        },
        changePersonalAvatar() {
            let userId = this.$cookies.get('user_id')
            // 由于这里涉及到了传输头像，就是传输文件，所以这里不能再用json传输数据，需要使用FormData
            let data = new FormData()
            if (this.avatarChanged) {
                data.append('avatar', this.avatarFile)
            }
            if (userId) {
                User.changePersonalInfo(userId, data).then(
                    response => {
                        this.cur2savePersonalInfo()
                        alert('头像修改成功')
                    },
                    error => {
                        this.save2curPersonalInfo()
                            (error.message)
                    }
                )
            }
        },
        cancelChangePersonalInfo() {
            this.isEditing = false
            this.save2curPersonalInfo()
        },
        handleMove() {
            this.moveVisible = true
        },
        handleMoveClick(index) {
            this.moveVisible = false
        },
        cancelCreation() {
            this.isCreating = false
        },
        updateCreation(name) {
            this.isCreating = false
            let data = {
                name: name
            }
            User.createFavorite(0, data).then(
                (response) => {
                    console.log(response)
                    // console.log(response.data.username)
                },
                (error) => {
                    console.log(error)
                }
            )
            this.favouritesInfo.unshift({
                name: name,
                showContextMenu: false
            })
        },
        returnToMainPage() {
            this.$router.push('/');
        },
        // 下面是用来处理头像悬浮和头像上传更改
        handleMouseLeaveAvatar() {
            this.avatarIsHovered = false
        },
        uploadAvatar() {
            this.$refs.fileInput.click()
        },
        handleFileChange(e) {
            this.avatarChanged = true
            this.avatarFile = e.target.files[0]
            this.avatarUrl = URL.createObjectURL(this.avatarFile)
            this.cur2savePersonalInfo()
            this.personalInfo.avatarUrl = this.avatarUrl
            this.changePersonalAvatar()
        },
        // 为了能够恢复修改的内容以及取消修改
        cur2savePersonalInfo() {
            this.savePersonalInfo.avatarUrl = this.personalInfo.avatarUrl
            this.savePersonalInfo.nickName = this.personalInfo.nickName
            this.savePersonalInfo.realNmae = this.personalInfo.realName
            this.savePersonalInfo.gender = this.personalInfo.gender
            this.savePersonalInfo.urls = this.personalInfo.urls
        },
        save2curPersonalInfo() {
            this.personalInfo.avatarUrl = this.savePersonalInfo.avatarUrl
            this.personalInfo.nickName = this.savePersonalInfo.nickName
            this.personalInfo.realName = this.savePersonalInfo.realName
            this.personalInfo.gender = this.savePersonalInfo.gender
            this.personalInfo.urls = this.savePersonalInfo.urls
        },
        enterEditingMode() {
            this.isEditing = true
            this.cur2savePersonalInfo()
        }
    },
}
window.addEventListener('scroll', function () {
    var container = document.querySelector('.model')

    if (container === null || getComputedStyle(container).display === 'none') {
        return;
    }

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop
    var windowHeight = window.innerHeight;

    var topPosition = scrollTop + (windowHeight / 2)
    container.style.top = topPosition + 'px'
});
</script>

<style scoped>
* {
    box-sizing: border-box;
    max-width: 100%;
}

em {
    font-weight: bold;
}

.return-part {
    display: flex;
    width: 80px;
    cursor: pointer;
    height: 35px;
}

.icon {
    width: 30px;
    height: 30px;
    background-size: cover;
    cursor: pointer;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    fill: #666;
}

.return-text {
    font-size: 20px;
    /* color: #666; */
    margin-top: 2px;
}

.main-part {
    /* min-height: 800px; */
    width: 100%;
    /* min-width: 500px; */
    display: flex;
    justify-content: center;
    margin-top: 30px;
    /* margin-left: 10%; */
}

.title-part {
    display: flex;
    /* margin-top: 50px; */
    /* margin-left: 80px; */
    justify-content: space-around;
    flex-wrap: wrap;
}

.title {
    display: flex;
    width: 300px;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}

.info-tag-list {
    display: flex;
    width: 80%;
    justify-content: space-around;

}

.personal-info {
    /* border: 1px solid red; */
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
}

.personal-image img {
    height: 250px;
    width: 250px;
    border-radius: 50%;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;
}

.personal-image img:hover {
    transform: translate(-3px, -3px) scale(1.02);
    box-shadow: 3px 3px 8px grey;
}

.personal-info-text {
    /* min-height: 400px; */
    width: 300px;
    margin-top: 10px;
    position: relative;
}

.personal-info-text>svg {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
    right: 0;
    background: transparent;
    cursor: pointer;
    fill: var(--default-text-color);
}

.personal-info-text p:not(:nth-child(1), :nth-child(2)) {
    background: var(--theme-mode-like);
    padding-left: 20px;
    padding-top: 15px;
}

.personal-info-text p:nth-child(3) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.personal-info-text p:last-of-type {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding-bottom: 15px;
}

.personal-info-text * {
    color: var(--default-text-color);
}

.personal-info-text-nickname {
    font-size: 25px;
    text-align: center;
    font-weight: bold;
}

.personal-info-text-real-name {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
}

.personal-info-text-url-list li {
    margin-left: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.personal-info-text-url-list li svg {
    width: 30px;
    height: 30px;
    fill: var(--default-text-color);
}

.personal-info-text-url-list li svg:last-of-type.cross {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    fill: var(--default-text-color);
}

.personal-info-text-url-list li:last-child {
    margin-bottom: 0;
}

.personal-info-text-url-list li:hover svg:first-of-type {
    font-size: 17px;
    font-weight: bold;
    color: var(--theme-color);
    fill: var(--theme-color);
}

/* .personal-info-text-item {
  margin-bottom: 5px;
  margin-left: 20px;
} */
.tag-and-list {
    width: 60%;
}

.personal-tag {
    min-height: 100px;
    width: 100%;
    /* border: 2px solid red; */
    /* width: 50%;  */
}

.personal-tag h3 {
    font-size: 25px;
    font-weight: bold;
}

.tag-container {
    display: flex;
    flex-wrap: wrap;
}

.tag-item {
    margin-top: 10px;
    margin-right: 10px;
    color: var(--theme-color);
    cursor: pointer;
}

.tag-item :hover {
    text-decoration: underline;
    cursor: pointer;
}

.list {
    margin-top: 0;

    /* display: flex; */
    /* justify-content: space-around;
  flex-wrap: wrap; */
    /* width: 50%; */
    min-height: 300px;

}

.favourites-subscribe-tab {
    display: flex;
}

.favourites-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.tab {
    height: 40px;
    font-size: 18px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.tab:last-of-type {
    margin-left: 20px;
}

.tab-selected {
    background-color: var(--theme-color);
    font-weight: bold;
}

.tab-selected:hover {
    background-color: var(--theme-color-80);
}

.tab-not-selected {
    color: var(--default-text-color);
    background-color: var(--theme-mode-contrast);
}

.tab-not-selected:hover {
    background-color: var(--theme-mode-high-contrast);
}

.favourites-creation {
    background-color: rgb(98, 186, 70);
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    /* margin-right: 70px; */
    cursor: pointer;
    color: white;
}

.favourites-creation:hover {
    background-color: rgb(131, 192, 113);
    color: white;
}

.model {
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 600px;
    min-height: 400px;
    border-radius: 20px;
    position: absolute;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: center;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {

    transition: opacity 0.5s linear 0s;
}

.inner-box {
    width: 70%;
}

.move-title {
    color: black;
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
}

.authenticate-btn {
    font-size: 16px;
    margin-top: 10px;
    margin-left: auto;
}

input[type="file"] {
    display: none;
}

.edit-input-nickname {
    width: 80%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}

.edit-input-real-name {
    width: 80%;
    margin-top: 10px;
    height: 30px;
    font-style: 16px;
    text-align: center;
}

.edit-input-text {
    width: 80%;
    height: 40px;
}

.url-input {
    width: 70%;
    height: 30px;
    font-weight: normal !important;
    font-size: 16px !important;
    color: var(--default-text-color) !important;
}

.add-url {
    position: relative;
}

.add-url svg:last-of-type {
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 0;
    width: 30px;
    height: 30px;
    margin-right: 9px;
    fill: var(--theme-color) !important;
}

label {
    margin-right: 10px;
}

.btn-wrapper {
    width: 80%;
    display: flex;
    justify-content: space-around;
}

.btn-wrapper button {
    margin: 20px 0;
}

@media screen and (max-width: 1450px) {
    .personal-info {
        justify-content: center;
    }
}

@media screen and (max-width: 768px) {
    .main-part {
        width: 100%;
        /* border: 1px solid red; */
        margin-left: 0;
    }

    .personal-info {
        width: 80%;
        margin-left: 10%;
        /* border: 1px solid red; */
        margin-bottom: 30px;
    }

    .info-tag-list {
        display: block;
        width: 100%;
    }

    .personal-info-text {
        width: 80%;
        min-height: 300px;
    }

    .personal-image {
        margin-left: 0px;
    }

    .personal-info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .tag-and-list {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .list {
        width: 80%;
    }

    .personal-tag {
        width: 80%;
    }
}

@media screen and (max-width: 700px) {
    .personal-info {
        justify-content: center;
    }

    .personal-image {
        margin-left: 0px;
    }

    .personal-info-text {
        margin-left: 0px;
    }
}

@media screen and (max-width: 600px) {
    .main-part {
        width: 100%;
        margin-left: 0;
    }
}

@media screen and (max-width: 450px) {

    .download,
    .collect {
        display: none;
    }

    .more {
        display: block;
    }
}
</style>
