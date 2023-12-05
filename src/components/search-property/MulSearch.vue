<template>
  <div class="advanced-search-panel">
    <select v-model="selectedMainCategory" @change="onMainCategoryChange" style="background-color: transparent;" >
      <option v-for="category in mainCategories" :key="category.value" :value="category.value">
        {{ category.text }}
      </option>
    </select>
    <select v-model="selectedSubCategory" style="background-color: transparent;">
      <option v-for="subCategory in subCategories" :key="subCategory.value" :value="subCategory.value" >
        {{ subCategory.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMainCategory: null,
      selectedSubCategory: null,
      mainCategories: [
        { value: 'category1', text: '类别1' },
        // 更多类别...
      ],
      allSubCategories: {
        category1: [
          { value: 'sub1', text: '子类别1' },
          // 更多子类别...
        ],
        // 更多类别的子类别...
      },
      subCategories: []
    };
  },
  methods: {
    onMainCategoryChange() {
      this.subCategories = this.allSubCategories[this.selectedMainCategory] || [];
    }
  }
};
</script>
