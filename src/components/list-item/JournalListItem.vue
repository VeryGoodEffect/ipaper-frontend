<template>
  <div :class="['out-border', { 'out-border-full': isExpanded }]">
    <h3 @click="jumpDetailView" class="title">
      {{ journalListItemInfo.display_name }}
    </h3>
    <span class="profile">
      {{ $t("institution_region") }}{{ journalListItemInfo.country_code }}
    </span>
    <span class="profile">
      {{ $t("journal_type") }}{{ journalListItemInfo.type }}
    </span>
    <span class="profile">
      {{ $t("institution_works_count") }}{{ journalListItemInfo.works_count }}
    </span>
    <span class="profile">
      {{ $t("institution_cited_by_count")
      }}{{ journalListItemInfo.cited_by_count }}
    </span>
  </div>
</template>

<script>
import i18n from "../../language";

export default {
  props: ["journalListItemInfo"],
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
      this.$router.push({
        path: "/institution_detail/" + this.journalListItemInfo.id,
      });
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