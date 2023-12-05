<template>
    <div>
      <div>
        <label for="searchQuery">Search:</label>
        <input
          type="text"
          id="searchQuery"
          v-model="searchQuery"
          @input="handleInput"
          placeholder="Search..."
          style="background-color: transparent;"
        />
      </div>
      <div>
        <label for="filter1">Filter 1:</label>
        <select id="filter1" v-model="filter1" @change="handleInput">
          <option value="">All</option>
          <option v-for="option in filter1Options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div>
        <label for="filter2">Filter 2:</label>
        <select id="filter2" v-model="filter2" @change="handleInput">
          <option value="">All</option>
          <option v-for="option in filter2Options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <ul v-if="showResults">
        <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        filter1: '',
        filter2: '',
        filter1Options: ['Option 1', 'Option 2', 'Option 3'],
        filter2Options: ['Option A', 'Option B', 'Option C'],
        searchResults: [],
        showResults: false
      };
    },
    methods: {
      handleInput() {
        this.searchResults = [
          { id: 1, name: 'Result 1' },
          { id: 2, name: 'Result 2' },
          { id: 3, name: 'Result 3' }
        ];
        this.showResults = true;



        //todo 搜索逻辑
      }
    }
  };
  </script>