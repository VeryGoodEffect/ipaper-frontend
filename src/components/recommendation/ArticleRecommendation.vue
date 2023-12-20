<template>
  <div v-if="show">
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <h3 @click="jumpToPaperPage">{{ article.title }}</h3>
        <p class="abstract" v-ellipsis="{ maxLine: 3, maxWidth: '100%', wrappable: false}">
          {{ article.abstract }}
        </p>
        <span v-for="(author, index) in article.authorships" :key="index" class="author">
          {{ author.author.display_name }}&nbsp&nbsp
        </span>
        <p v-if="article.primary_location != null && article.primary_location.source != null" class="journal">
          From: {{ article.primary_location.source.display_name }}
        </p>
        <p v-else class="journal">
            暂无出处
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Article } from '../../api/article.js';
export default {
  name: 'ArticleRecommendation',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      articles: [],
    }
  },
  mounted() {
      Article.getHotspotRecommend().then(
        response => {
          this.articles = response.data
        }
      )
  },
  methods: {
    jumpToPaperPage() {

    }
  }
}
</script>

<style scoped>
ul {
  width: 80%;
}

li {
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--theme-mode-contrast);
}

li h3 {
  color: var(--defaut-text-color);
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}

li:hover h3 {
  text-decoration: underline;
}

.abstract {
  color: var(--theme-mode-very-high-contrast);
  font-size: 14px;
}

.author, .journal {
  font-size: 14px;
  font-weight: bold;
  color: var(--defaut-text-color);
}

.journal {
  /*margin-left: 15px;*/
}

@media screen and (max-width: 960px) {
  ul {
    width: 100%;
  }
}
</style>