<template>
  <div class="navBar">navBar</div>
  
</template>
<script>
export default {
  name: "SearchView",
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
}

.navBar {
  height: 80px;
  border: 2px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.mainArea {
  border: 2px solid blue;
  display: flex;
}
.condArea {
  border: 2px solid red;
  width: 300px;
  height: 600px;
  margin-top: 30px;
  margin-left: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.searchBar {
  border: 2px solid red;
  height: 60px;
  width: 500px;
  margin-top: 30px;
  margin-left: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.pagination {
  margin-top: 30px;
  margin-left: 30px;
}
</style>