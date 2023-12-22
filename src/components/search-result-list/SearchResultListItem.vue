<template>
    <div :class="['out-border', { 'out-border-full': isExpanded }]">
        <h3 class="title" @click="jumpArticle(infoItem.url)" v-html="highlightedText(infoItem.keyword, infoItem.title)"></h3>
        <div class="author">
          <span v-for="(author, idx) in infoItem.authorships" :key="idx">
            {{ author.author.display_name }}
          </span>  
        </div>
        <p v-html="highlightedText(infoItem.keyword, infoItem.abstract)" class="excerpt"
        v-ellipsis="{ maxLine: 3, maxWidth: '80%', wrappable: false}">
        </p>
        <div class="info">
            <div class="download">
              <svg t="1702361941375" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1181" width="200" height="200"><path d="M128 576.64v192a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64v-192h64v192a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128v-192h64zM511.392 128.64a32 32 0 0 1 32 32V564.16l138.752-136.544a32 32 0 0 1 42.272-2.304l3.008 2.688a32 32 0 0 1-0.384 45.248l-193.184 190.144a32 32 0 0 1-44.96-0.096l-192-190.112a32 32 0 1 1 45.024-45.472l137.504 136.128V160.608a32 32 0 0 1 28.256-31.776l3.712-0.224z" p-id="1182" fill="#1A0EAB"></path></svg>
            </div>
            <div class="collect"  @click="showCollectModal">
              <svg t="1702362218021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1461" width="200" height="200"><path d="M572.032 132.256l95.84 201.28 220.768 28.8c11.104 1.472 21.6 5.824 30.432 12.608l6.304 5.504a63.584 63.584 0 0 1 0 89.92l-159.36 159.36 38.56 221.536c1.92 11.2 0.832 22.72-3.104 33.248l-3.52 7.744a63.584 63.584 0 0 1-86.08 25.952l-196.928-105.632-203.456 106.56c-9.92 5.216-20.992 7.68-32.096 7.232l-8.32-0.896a63.584 63.584 0 0 1-51.744-73.568L257.92 629.76l-159.296-159.36a63.584 63.584 0 0 1-16.448-28.512l-1.632-8.224a63.584 63.584 0 0 1 54.848-71.264l221.12-28.896L457.728 131.2c5.088-10.144 12.768-18.688 22.176-24.832l7.36-4.16a63.584 63.584 0 0 1 84.8 30.08z m-57.44 28.288l-100.832 201.6a64 64 0 0 1-48.96 34.816l-220.352 28.736 158.72 158.784a64 64 0 0 1 18.56 50.592l-0.736 5.6-38.464 221.376 202.688-106.176a64 64 0 0 1 54.784-2.208l5.184 2.496 196.16 105.248-38.4-220.704a64 64 0 0 1 13.984-52.064l3.84-4.16 158.752-158.784-219.936-28.672a64 64 0 0 1-46.976-31.2l-2.528-4.768-95.488-200.512z" p-id="1462" fill="#1A0EAB"></path></svg>
            </div>
            <div class="time-cited">
              {{ $t('search_result_cited_times') }}{{ infoItem.cited_by_count }}
            </div>
            <div class="related">
                {{ $t('search_result_related_work') }}{{  infoItem.related_works_count }}
            </div>
            <div class="more">
              <svg t="1702362669780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1832" id="mx_n_1702362669781" width="200" height="200"><path d="M480 800h64a48 48 0 0 1 48 48v64A48 48 0 0 1 544 960h-64a48 48 0 0 1-48-48v-64A48 48 0 0 1 480 800z m0-368h64a48 48 0 0 1 48 48v64a48 48 0 0 1-48 48h-64a48 48 0 0 1-48-48v-64a48 48 0 0 1 48-48zM480 64h64a48 48 0 0 1 48 48v64A48 48 0 0 1 544 224h-64a48 48 0 0 1-48-48v-64A48 48 0 0 1 480 64z" p-id="1833" fill="#1A0EAB"></path></svg>
              <div class="dropdown-list">
                <div class="dropdown-list-div">
                  <svg t="1702361941375" class="icon dropdown-list-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1181" width="200" height="200"><path d="M128 576.64v192a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64v-192h64v192a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128v-192h64zM511.392 128.64a32 32 0 0 1 32 32V564.16l138.752-136.544a32 32 0 0 1 42.272-2.304l3.008 2.688a32 32 0 0 1-0.384 45.248l-193.184 190.144a32 32 0 0 1-44.96-0.096l-192-190.112a32 32 0 1 1 45.024-45.472l137.504 136.128V160.608a32 32 0 0 1 28.256-31.776l3.712-0.224z" p-id="1182" fill="#1A0EAB"></path></svg>
                  <svg t="1702362218021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1461" width="200" height="200"><path d="M572.032 132.256l95.84 201.28 220.768 28.8c11.104 1.472 21.6 5.824 30.432 12.608l6.304 5.504a63.584 63.584 0 0 1 0 89.92l-159.36 159.36 38.56 221.536c1.92 11.2 0.832 22.72-3.104 33.248l-3.52 7.744a63.584 63.584 0 0 1-86.08 25.952l-196.928-105.632-203.456 106.56c-9.92 5.216-20.992 7.68-32.096 7.232l-8.32-0.896a63.584 63.584 0 0 1-51.744-73.568L257.92 629.76l-159.296-159.36a63.584 63.584 0 0 1-16.448-28.512l-1.632-8.224a63.584 63.584 0 0 1 54.848-71.264l221.12-28.896L457.728 131.2c5.088-10.144 12.768-18.688 22.176-24.832l7.36-4.16a63.584 63.584 0 0 1 84.8 30.08z m-57.44 28.288l-100.832 201.6a64 64 0 0 1-48.96 34.816l-220.352 28.736 158.72 158.784a64 64 0 0 1 18.56 50.592l-0.736 5.6-38.464 221.376 202.688-106.176a64 64 0 0 1 54.784-2.208l5.184 2.496 196.16 105.248-38.4-220.704a64 64 0 0 1 13.984-52.064l3.84-4.16 158.752-158.784-219.936-28.672a64 64 0 0 1-46.976-31.2l-2.528-4.768-95.488-200.512z" p-id="1462" fill="#1A0EAB"></path></svg>
                </div>
              </div>
            </div>
        </div>
    </div>
    <ChooseFavoriteModal :paperId="infoItem.id" :show="collectModalShouldShow" @close="collectModalShouldShow = false"/>
</template>

<script>
import i18n from '../../language'
import ChooseFavoriteModal from '../modals/ChooseFavoriteModal.vue'

export default {
  props: ['infoItem'],
    components: {
        i18n,
        ChooseFavoriteModal
    },
    data() {
      return {
        isExpanded: false,
        collectModalShouldShow: false
      }
    },
    methods: {
        toggleTextContainer() {
            this.isExpanded = !this.isExpanded;
            console.log("clicked");
        },
        highlightedText(matcher, str) {
            if (!matcher || !str) {
                return str;
            }
            const regex = new RegExp(matcher, 'gi');
            return str.replace(regex, match => `<em style="color: var(--theme-color); font-size: inherit;">${match}</em>`);
        },
        jumpArticle(url){
          this.$router.push({
            path: "/paper_detail/"+this.infoItem.id,
            url: this.url
          })
        },
        showCollectModal() {
          this.collectModalShouldShow = true
        }
    }
}
</script>

<style scoped>
.out-border {
    /* border: 1px solid red; */
    width: 700px;
    min-height: 130px;
    position: relative;
}
.out-border-full {
  /* border: 1px solid red; */
    width: 700px;
    height: unset;
}
.title {
    font-size: 20px;
    font-weight: bold;
    color: var(--theme-mode-very-high-contrast);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1; 
    line-clamp: 1;
    cursor: pointer;
}
.author span {
    font-size: 16px;
    color: var(--theme-mode-very-high-contrast);
    margin-right: 10px;
}
.excerpt {
    font-size: 14px;
    color: var(--theme-mode-high-contrast);

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
  /* cursor: pointer; */
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