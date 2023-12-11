<template>
    <div :class="['out-border', { 'out-border-full': isExpanded }]">
        <h3 class="title" v-html="highlightedText(infoItem.keyword, infoItem.title)"></h3>
        <div class="author">
            {{ infoItem.author }}
        </div>
        <p v-html="highlightedText(infoItem.keyword, infoItem.excerpt)" 
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
        highlightedText(matcher, str) {
            if (!matcher) {
                return str;
            }
            const regex = new RegExp(matcher, 'gi');
            return str.replace(regex, match => `<em style="color: var(--theme-color); font-size: inherit; font-weight: bold;">${match}</em>`);
        }
    },
    computed: {
    
  }
}
</script>

<style scoped>
.out-border {
    /* border: 1px solid red; */
    width: 700px;
    height: 130px;
}
.out-border-full {
  /* border: 1px solid red; */
    width: 700px;
    height: unset;
}
.title {
    font-size: 20px;
    color: var(--theme-mode-very-high-contrast);
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    line-clamp: 1;
}
.author {
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
    /* width: 855px; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}

.excerpt.full {
  -webkit-line-clamp: unset; 
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