<template>
  <div :class="['out-border', { 'out-border-full': isExpanded }]">
    <a :href=infoItem.homepage_url><h3 @click="jumpDetailView" class="title">
      {{ infoItem.display_name }}
    </h3></a>
    <span class="profile">
      {{ $t("institution_region") }}{{ infoItem.country_code }}
    </span>
    <span class="profile">
      {{ $t("journal_type") }}{{ infoItem.type }}
    </span>
    <span class="profile">
      {{ $t("institution_works_count") }}{{ infoItem.works_count }}
    </span>
    <span class="profile">
      {{ $t("institution_cited_by_count")
      }}{{ infoItem.cited_by_count }}
    </span>
  </div>
</template>

<script>
import i18n from "../../language";

export default {
  props: ["infoItem"],
  components: {
    i18n,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  mounted() {
    console.log(this.infoItem);
  },
  methods: {
    jumpDetailView() {
      console.log(this.infoItem.homepage_url)
      // alert(this.infoItem.url)
      // this.$router.push({
      //   path: "/institution_detail/" + this.infoItem.id,
      // });
    },
  },
  computed: {},
};
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

.title:hover {
  text-decoration: underline;
}

.profile {
  font-size: 14px;
  color: var(--theme-mode-very-high-contrast);
  margin-right: 10px;
}
</style>