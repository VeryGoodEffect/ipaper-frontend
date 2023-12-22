<template>
  <div>
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <h3 @click="jumpToPaperPage(index)">{{ article.title }}</h3>
        <p class="abstract" v-ellipsis="{ maxLine: 3, maxWidth: '100%', wrappable: false}">
          {{ article.abstract }}
        </p>
        <span v-for="(author, index) in article.authorships" :key="index" class="author">
          {{ author.author.display_name }}
        </span>
        <p v-if="article.primary_location != null && article.primary_location.source != null" class="journal">
          {{ article.primary_location.source.display_name }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Article } from '../../api/article.js';
export default {
  name: 'ArticleRecommendation',
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
    jumpToPaperPage(i) {
      this.$router.replace('paper_detail/'+ this.articles[i].id)
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

li:last-of-type {
    border-bottom: 0;
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

@media screen and (max-width: 960px) {
  ul {
    width: 100%;
  }
}
</style>