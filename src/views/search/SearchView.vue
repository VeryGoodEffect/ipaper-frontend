<template>
  <main class="container">
    <section class="search-panel">
      <h2>
        {{ $t('ipaper_scholar_text') }}
      </h2>
      <div class="search-area">
        <input type="text" class="basic-input search-input" />
        <button class="basic-btn search-btn">
          <svg t="1699356103686" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4162" width="200" height="200"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  p-id="4163" fill="#fff"></path></svg>
        </button>
      </div>
    </section>
    <section class="recommendation">
      <h3>为你推荐</h3>
    </section>
  </main>
</template>
<script>
import i18n from '../../language'

export default {
  name: 'SearchView',
  components: {
      i18n
  }
}
</script>
<style>
.container {
  width: 80%;
  /* height: calc(100vh - 80px); */
  margin: 0 auto;
}


.search-panel h2 {
  color: var(--theme-color);
  text-align: center;
  padding: 50px 0;
  font-size: 50px;
  font-weight: bold;
}

.search-area {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}

.search-input {
  max-width: 640px;
  width: 80%;
  border-color: var(--theme-mode-contrast);
  border-width: 2px;
}

.search-btn {
  width: 50px;
  height: 50px;
  margin: 0;
  margin-left: 10px;
}

.search-btn svg {
  width: 30px;
  height: 30px;
  margin: auto;
}

.recommendation {
  width: 95%;
  margin: 0 auto;
}

.recommendation h3 {
  color: var(--theme-color);
  font-size: 30px;
  font-weight: bold;
}


@media screen and (max-width: 450px) {
  .search-panel h2 {
    font-size: 30px;
  }

  .recommendation {
    width: 100%;
  }
}

</style>