<template>
    <svg
        t="1703039408230" 
        class="icon" 
        viewBox="0 0 1024 1024" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        p-id="1498" :width="size" :height="35">
    <path d="M864 153.6H160c-51.2 0-96 44.8-96 96v524.8c0 51.2 44.8 96 96 96h704c51.2 0 96-44.8 96-96V249.6c0-51.2-44.8-96-96-96zM512 556.8L166.4 217.6h684.8L512 556.8z m352 249.6H160c-19.2 0-32-12.8-32-32V268.8l358.4 358.4c6.4 6.4 12.8 6.4 25.6 6.4 6.4 0 19.2 0 25.6-6.4L896 262.4v512c0 19.2-12.8 32-32 32z"  p-id="1499"></path>
    </svg>
</template>

<script>
export default {
    name: 'MailIcon',
    props: {
        size: {
            type: String,
            default: '35'
        }
    }
}
</script>