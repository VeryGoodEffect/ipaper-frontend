<template>
    <div :class="['out-border', { 'out-border-full': isExpanded }]">
      <h3 @click="jumpDetailView" class="title">
          {{ scholarInfo.display_name }}
      </h3>
      <h3 class="profile">
            {{ $t('institution_region') }}{{ scholarInfo.country_code }}
        </h3>
      <h3 class="profile">
        {{ $t('institution_works_count') }}{{ scholarInfo.works_count }}
      </h3>
      <h3 class="profile">
        {{ $t('institution_cited_by_count') }}{{ scholarInfo.cited_by_count }}
      </h3>
    </div>
</template>

<script>
import i18n from '../../language'

export default {
  props: ['scholarInfo'],
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
          path: "/scholar_portal/" + this.scholarInfo.id
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    line-clamp: 1;
    cursor: pointer;
}

.out-border :hover {
    text-decoration: underline;
}
.profile {
    /* padding-left: 20px; */
    font-size: 14px;
    color: var(--theme-mode-very-high-contrast);
    /* color: rgb(98,186,70); */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    line-clamp: 1;
}
.excerpt {
    font-size: 14px;
    color: var(--theme-mode-high-contrast);
    /* width: 855px; */
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2; */
}

.excerpt.full {
  -webkit-line-clamp: unset; 
  line-clamp: unset;
}
.info {
    display: flex;
    /* margin-bottom: 20px; */
    color: blue;
}
.download {
    margin-right: 10px;

    font-size: 15px;
}
.collect {
    margin-right: 10px;
    font-size: 15px;
}
.time-cited {
    margin-right: 10px;
    color: rgb(26,14,171);
    font-size: 15px;
}
.related {
    margin-right: 10px;
    color: rgb(26,14,171);
    font-size: 15px;
    cursor: pointer;
}
.more {
    display: none;
    color: rgb(3,122,255);
    font-size: 15px;
    position: relative;
    transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

.icon {
  /* border: 2px red solid; */
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  border: 1px solid var(--theme-mode-very-high-contrast);
  top: calc(100%);
  right: -0px;
  padding: 10px;
  background: var(--theme-mode-like);
  border-radius: 5px;
  display: none;
  z-index: 999;
}

.dropdown-list-div {
  display: flex;
}
.dropdown-list-icon {
  margin-right: 10px;
}
.dropdown-list li:first-child {
  margin-bottom: 10px;
}

.dropdown-list li:hover {
  scale: 1.05;
}

.more:hover .dropdown-list {
  display: block;
}

@media screen and (max-width: 1000px) {
  .out-border {
    width: 90%;
  }
  .more {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .download, .collect {
    display: none;
  }
  .more {
    display: block;
  }
}
@media screen and (max-width: 450px) {
  .download, .collect {
    display: none;
  }
  .more {
    display: block;
  }
}
</style>