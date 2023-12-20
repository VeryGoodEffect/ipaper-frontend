<template>
  <div>
    <div class="sidebar" :class="{ closed: !isSidebarOpen }">
      <nav>
        <ul>
          <li @click="setSearchType(1)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M368 415.86V72a24.07 24.07 0 0 0-24-24H72a24.07 24.07 0 0 0-24 24v352a40.12 40.12 0 0 0 40 40h328" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path d="M416 464h0a48 48 0 0 1-48-48V128h72a24 24 0 0 1 24 24v264a48 48 0 0 1-48 48z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 128h64"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 192h64"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 256h192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 320h192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 384h192"></path><path d="M176 208h-64a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16z" fill="currentColor"></path></svg> 
            摘要搜索</li>
          <li @click="setSearchType(2)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448.08 256.08c0-106-86-192-192-192s-192 86-192 192s86 192 192 192s192-85.97 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path d="M300.81 358.29c-20.83 7.42-34.05 9.59-54.19 9.59c-61.17 0-106.39-50.07-101-111.84S205 144.21 266.14 144.21c68.92 0 106.79 45.55 101.47 106.55c-4 45.54-32.8 58.66-47.89 56c-14.2-2.55-25.92-15.52-23.75-40.35l5.62-44.66c-7.58-9.17-28.11-18-49.93-14.54C231.77 210.3 209 228 206.56 256s14.49 50.84 39.93 50.84s47.86-18.39 50.69-50.84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="28"></path></svg>
             全文搜索</li>
          <li @click="setSearchType(3)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M216.08 192v143.85a40.08 40.08 0 0 0 80.15 0l.13-188.55a67.94 67.94 0 1 0-135.87 0v189.82a95.51 95.51 0 1 0 191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path></svg>
             标题搜索</li>
             <li @click="setSearchType(4)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M216.08 192v143.85a40.08 40.08 0 0 0 80.15 0l.13-188.55a67.94 67.94 0 1 0-135.87 0v189.82a95.51 95.51 0 1 0 191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path></svg>
             作者搜索</li>
             <li @click="setSearchType(5)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M216.08 192v143.85a40.08 40.08 0 0 0 80.15 0l.13-188.55a67.94 67.94 0 1 0-135.87 0v189.82a95.51 95.51 0 1 0 191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path></svg>
             XX搜索</li>
             <li @click="setSearchType(6)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M216.08 192v143.85a40.08 40.08 0 0 0 80.15 0l.13-188.55a67.94 67.94 0 1 0-135.87 0v189.82a95.51 95.51 0 1 0 191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path></svg>
             XX搜索</li>
          <li @click="advancedSearch"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style="" ><path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192s192-86.13 192-192S361.87 64 256 64zm80 294.63l-54.15-54.15a88.08 88.08 0 1 1 22.63-22.63L358.63 336z" fill="currentColor"></path><circle cx="232" cy="232" r="56" fill="currentColor"></circle></svg>
            高級搜索</li>
            
        </ul>
      </nav>
    </div>

    <div class="toggle-button" @click="toggleSidebar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="icon"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="48"
          d="M88 152h336"
        ></path>
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="48"
          d="M88 256h336"
        ></path>
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="48"
          d="M88 360h336"
        ></path>
      </svg>
    </div>

    <AdvancedSearchModal 
    :show="is_advanced_search" 
    @close=" is_advanced_search = false" 
    @jumpToRigister="registerModalShouldShow = true"
    @jumpToRetrievePassword="retrievePasswordModalShouldShow = true">
    </AdvancedSearchModal>

  </div>

</template>
  
<script>
import PopoutModalVue from "../popout-modal/PopoutModal.vue";
import AdvancedSearchModal from "../../components/modals/AdvancedSearchModal.vue";
export default {
  components:{
    AdvancedSearchModal
  },
  data() {
    return {
      is_advanced_search: false,
      isSidebarOpen: true,
    };
  },
  
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },

    advancedSearch(){
      this.is_advanced_search = true
        console.log("???")
    },

    setSearchType(type){
      this.$emit('setSearchType',type);
    }
  },
};
</script>
  
  <style scoped>
.sidebar {
  width: 250px;
  color:  var(--theme-mode-high-contrast);
  transition: transform 0.3s ease-in-out;
  position: fixed;
  height: 100%;
  top: 80px;
  left: 0;
  bottom: 0;
  overflow: auto;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd; /* 条目之间的分隔线 */
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
}
.sidebar nav ul li svg{
    margin: 0;
    margin-right: 10px; 
    width: 40px; height: 40px;
}

.sidebar nav ul li:hover {
  background-color: #e0e0e0; /* 鼠标悬停的背景色 */
}

.sidebar.closed {
  transform: translateX(-100%);
}

.toggle-button {
  position: fixed;
  top: 80px;
  left: 250px;
  /* transform: translateY(-50%);  */
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 100;
  transition: transform 0.3s ease-in-out;
}

.toggle-button .icon {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-width: 48;
  height: 32px; /* 设置 SVG 图标的高度 */
  width: 32px; /* 设置 SVG 图标的宽度 */
}

.closed ~ .toggle-button {
    transform: translateX(-250px);
}
</style>
  