<template>
    <div :class="['out-border', { 'out-border-full': isExpanded }]">
        <h3 class="title">
            {{ infoItem.title }}
        </h3>
        <div class="author">
            {{ infoItem.author }}
        </div>
        <p v-html="highlightedText(infoItem.keyword)" 
        :class="['excerpt', { 'full': isExpanded }]" @click="toggleTextContainer">
        </p>
        <div class="info">
            <div class="download">
            下载
            </div>
            <div class="collect">
            收藏
            </div>
            <div class="time-cited">
            被引用次数：{{ infoItem.timeCited }}
            </div>
            <div class="related">
                相关文章
            </div>
            <div class="more">
                更多
            </div>
        </div>
    </div>
</template>

<script>


export default {
  props: ['infoItem'],
    data() {
      return {
        isExpanded: false,
      }
    },
    mounted() {
       console.log(this.infoItem)
    },
    methods: {
        toggleTextContainer() {
            this.isExpanded = !this.isExpanded;
            console.log("clicked");
        },
        highlightedText(str) {
            if (!str) {
                return this.infoItem.excerpt;
            }
            const regex = new RegExp(str, 'gi');
            return this.infoItem.excerpt.replace(regex, match => `<em style="color: rgb(255,82,88); font-size: 16px;">${match}</em>`);
        }
    },
    computed: {
    
  }
}
</script>

<style scoped>
.out-border {
    border: 1px solid red;
    width: 700px;
    height: 130px;
}
.out-border-full {
  border: 1px solid red;
    width: 700px;
    height: unset;
}
.title {
    font-size: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    line-clamp: 1;
}
.author {
    padding-left: 20px;
    font-size: 14px;
    color: rgb(98,186,70);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    line-clamp: 1;
}
.excerpt {
    font-size: 16px;
    /* width: 855px; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}
em {
    font-size: 16px !important;
    color: brown !important;
}
.excerpt.full {
  -webkit-line-clamp: unset; /* 取消行数限制 */
  line-clamp: unset;
}
.info {
    display: flex;
    margin-bottom: 20px;
    color: blue;
}
.download {
    margin-right: 10px;
    color: rgb(3,122,255);
    font-size: 15px;
}
.collect {
    margin-right: 10px;
    color: rgb(3,122,255);
    font-size: 15px;
}
.time-cited {
    margin-right: 10px;
    color: rgb(3,122,255);
    font-size: 15px;
}
.related {
    margin-right: 10px;
    color: rgb(3,122,255);
    font-size: 15px;
}
.more {
    display: none;
    color: rgb(3,122,255);
    font-size: 15px;
  }

@media screen and (max-width: 950px) {
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