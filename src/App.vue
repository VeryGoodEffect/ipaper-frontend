<template>
  <button class="basic-btn">666</button>
  <br><br>
  <button class="basic-btn-outline">777</button>
  <br><br>
  <input type="text" :value="msg">
  <br><br>
  <div class="huge-input-wrapper">
    <input class="huge-input" type="text" placeholder="文献、期刊、作者以及更多"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
let msg = ref('hhh')

</script>

<style scoped>
</style>