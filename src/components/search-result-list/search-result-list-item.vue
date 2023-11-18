<template>
    <div class="out-border">
        <h3 class="title">
            {{ info.title }}
        </h3>
        <div class="author">
            {{ info.author }}
        </div>
        <p v-html="highlightedText(keyword)" 
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
            被引用次数：{{ info.time_cited }}
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
    props: {
        // info: {type: Object, default: {}},
    },
    data() {
      return {
        info: {
            title: "低碳经济: 人类经济发展方式的新变革",
            author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
            excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
            time_cited: 537,
        },
        keyword: '低碳',
        isExpanded: false,
      }
    },
    mounted() {
       
    },
    methods: {
        toggleTextContainer() {
            this.isExpanded = !this.isExpanded;
            console.log("clicked");
        },
        highlightedText(str) {
            if (!str) {
                return this.info.excerpt;
            }
            const regex = new RegExp(str, 'gi');
            return this.info.excerpt.replace(regex, match => `<em style="color: rgb(255,82,88); font-size: 16px;">${match}</em>`);
        }
    },
    computed: {
    
  }
}
</script>

<style scoped>
.out-border {
    border: 1px solid red;
    width: 855px;
    height: 130px;
}
.title {
    font-size: 20px;
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