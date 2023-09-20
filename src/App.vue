<template>
  <button class="basic-btn">666</button>
  <br><br>
  <button class="basic-btn-outline">777</button>
  <br><br>
  <input type="text" :value="msg">
  <br><br>
  <div class="huge-input-wrapper">
    <input class="huge-input" type="text" placeholder="文献、期刊、作者以及更多" />
  </div>
  <pagination :default-items-per-page="5">
    <button v-for="i in 100" :key="i" @click="handleclick(i)">
    第 {{ i }} 个条目
    </button>
    <!-- <div>hhh</div>
    <button>
      按钮
    </button>
    <input type="text">
    <span>一个span</span>
    <select>
      <option>选项1</option>
      <option>这里是Illli</option>
    </select>
    <textarea>textarea</textarea>
    <table>table</table>
    <ol><li>ol li</li></ol>
    <ul><li>ul li</li></ul>
    <input type="color"> -->

  </pagination>
</template>

<script setup>
import { ref,} from 'vue';
import Pagination from './components/pagination/Pagination.vue';
let msg = ref('hhh')


let handleclick = (i)=>{
  alert('点击第'+i+'个条目')
}
</script>

<style scoped></style>