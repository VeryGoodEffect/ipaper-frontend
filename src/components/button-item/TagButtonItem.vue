<template>
<div class="item-container">
    <span>{{ tag.label }}</span>
    <svg @click="deleteTag(tag.key)" t="1703322824486" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8187" width="25" height="25">
        <path d="M736 480h-448c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h448c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#8a8a8a" p-id="8188"></path>
        <path d="M512 32C247.466667 32 32 247.466667 32 512S247.466667 992 512 992 992 776.533333 992 512 776.533333 32 512 32z m0 896C281.6 928 96 742.4 96 512S281.6 96 512 96 928 281.6 928 512 742.4 928 512 928z" fill="#8a8a8a" p-id="8189"></path>
    </svg>
</div>
</template>

<script>
export default {
    name: 'TagButtonItem',
    data() {
        return {

        }
    },
    props: ['tag'],
    methods: {
        deleteTag(key) {
            this.$bus.emit('sendDeleteSelectedTagRequest', key)
        }
    },
}
</script>

<style scoped>
.item-container {
    background-color: var(--theme-mode-contrast);
    margin-right: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    padding: 10px;
}
.item-container span {
    margin-left: 5px;
    margin-right: 5px;
}
.item-container svg {
    fill: var(--default-text-color) !important;
    cursor: pointer;

}
</style>
