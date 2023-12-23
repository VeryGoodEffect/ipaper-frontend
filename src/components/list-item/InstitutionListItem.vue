<template>
    <div :class="['out-border', { 'out-border-full': isExpanded }]">
        <h3 @click="jumpDetailView" class="title">
            {{ infoItem.display_name }}
        </h3>
        <br>
        <span class="profile">
            {{ $t('institution_region') }}{{ infoItem.country_code }}
        </span>
        <span class="profile">
          {{ $t('institution_works_count') }}{{ infoItem.works_count }}
        </span>
        <span class="profile">
          {{ $t('institution_cited_by_count') }}{{ infoItem.cited_by_count }}
        </span>
    </div>
</template>

<script>
import i18n from '../../language'

export default {
  props: ['infoItem'],
    components: {
        i18n
    },
    data() {
      return {
        isExpanded: false,
      }
    },
    mounted() {
       console.log(this.infoItem)
    },
    methods: {
      jumpDetailView(){
        this.$router.push({
          path: "/institution_detail/"+this.infoItem.id
        })
      }
    },
    computed: {
    
  }
}
</script>

<style scoped>
.out-border {
    /* border: 1px solid red; */
    width: 90%;
    min-height: 50px;
    position: relative;
    border-bottom: 2px solid var(--theme-mode-contrast);
    margin-bottom: 10px;
}
.out-border-full {
  /* border: 1px solid red; */
    width: 700px;
    height: unset;
}
.title {
    font-size: 20px;
    color: var(--theme-mode-very-high-contrast);
    display: inline-block;
    cursor: pointer;
}
.title:hover {
  text-decoration: underline;
}

.profile {
    font-size: 14px;
    color: var(--theme-mode-very-high-contrast);
}
.profile:not(:first-of-type) {
  margin-left: 10px;
}
</style>