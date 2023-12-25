<template>
<PopoutModal :show="show" @close="handleClose">
    <div class="container">
        <h3>
            {{ $t('interest_tag_select_text') }}
        </h3>
        <div class="select-container">
            <div class="select-content" v-if="this.showSelectTag.length !== 0">
                <TagButtonItem v-for="tag in this.showSelectTag" :key="tag.key" :tag="tag"></TagButtonItem>
            </div>
            <div v-else>
                <!-- 暂未选择兴趣标签 -->
            </div>
        </div>
        <div class="interest-tag-options">
            <n-tree ref="interestTreeRef" block-line :data="this.showInterestTag" expand-on-click checkable :on-update:checked-keys="handleNodeSelect" />
        </div>
        <div class="btn-box">
            <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
            <button class="basic-btn" @click="submitInterestTagSelect">{{ $t('confirm_text') }}</button>
        </div>
    </div>
</PopoutModal>
</template>


<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'
import TagButtonItem from '../button-item/TagButtonItem.vue'
import i18n from '../../language'
import {
    Article
} from '../../api/article.js'
import {
    NTree
} from 'naive-ui';
export default {
    name: 'InterestTagSelectorModal',
    emits: ['close'],
    data() {
        return {
            formInterestTag: [],
            showInterestTag: [],
            selectInterestTag: [],
            showSelectTag: [],
        }
    },
    mounted() {
        this.getInteretTag()
        this.$bus.on('sendDeleteSelectedTagRequest', this.deleteSelectedTag)
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        PopoutModal,
        TagButtonItem,
        NTree,
        i18n
    },
    methods: {
        handleClose() {
            this.deleteSelectedTags()
            this.$emit('close')
        },
        getInteretTag() {
            Article.getInterestList().then(
                response => {
                    this.formInterestTag = response.data
                    this.showInterestTag = this.transformInterestTag()
                },
                error => {
                    // alert('Error')
                }
            )
        },
        transformInterestTag() {
            const result = []
            let nodeId = 1
            this.formInterestTag.forEach(category => {
                for (const key in category) {
                    const label = key
                    const children = category[key].map(item => {
                        return {
                            label: item.name,
                            key: item.id,
                        }
                    })
                    result.push({
                        label,
                        key: nodeId++,
                        children,
                        checkboxDisabled: true
                    })
                }
            })
            return result
        },
        submitInterestTagSelect() {
            let data = {
                interests: this.selectInterestTag
            }
            Article.modifyInterest(data).then(
                response => {
                    this.handleClose()
                    this.$bus.emit('sendFlushInterestRequest')
                },
                error => {
                    // alert('Error')
                }
            )
        },
        handleNodeSelect(keys, options) {
            this.selectInterestTag = keys
            this.showSelectTag = options
        },
        deleteSelectedTag(key) {
            if (this.selectInterestTag.indexOf(key) != -1) {
                this.selectInterestTag.splice(this.selectInterestTag.indexOf(key), 1)
            }
            this.showSelectTag = this.showSelectTag.filter(item => item.key !== key)
        },
        deleteSelectedTags() {
            this.selectInterestTag.forEach(key => {
                this.deleteSelectedTag(key);
            });
            this.selectInterestTag = [];
            this.showSelectTag = [];
            this.showInterestTag.forEach(category => {
                category.children.forEach(tag => {
                    tag.isChecked = false;
                });
            });
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    max-width: 800px;
}

.container>* {
    min-width: 60%;
}

.container>h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
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

.select-container {
    max-width: 60%;
    height: 45px;
    overflow-x: auto;
    white-space: nowrap;
    /* 避免换行 */
    margin-bottom: 5px;
}

.select-container {
    max-width: 60%;
    height: 45px;
    overflow-x: auto;
    white-space: nowrap;
    /* 避免换行 */
    margin-bottom: 5px;
}

.select-content {
    display: flex;
    /* 确保内容可以横向排列 */
}
.select-container::-webkit-scrollbar {
    display: none;
}

/* 每个滚动项的容器 */
.scroll-wrapper {
    margin-right: 20px;
    /* 每个项之间的间距，根据需要调整 */
}

.interest-tag-options {
    height: 350px;
    width: 75%;
    overflow-y: auto;
    margin-bottom: 5px
}

.interest-tag-options::-webkit-scrollbar {
    display: none;
}

svg {
    fill: var(--theme-color) !important;
}

@media screen and (max-width: 768px) {
    .container {
        max-width: 80vw;
    }
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
