<template>
  <!-- DO NOT DELETE THIS SEEMINGLY USELESS FUNCTION `doNothing`!!!!  -->
  <div class="sidebar-container" @click.stop="doNothing" id="sidebar-container">
    <div class="sidebar" :class="{ closed: !isSidebarOpen }" id="sidebar">
      <nav>
        <ul>
          <li @click="setSearchType(0)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M15 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm-2.5-4C9.424 2 7 4.424 7 7.5c0 .397.04.796.122 1.175c.058.27-.008.504-.142.638l-4.54 4.54A1.5 1.5 0 0 0 2 14.915V16.5A1.5 1.5 0 0 0 3.5 18h2A1.5 1.5 0 0 0 7 16.5V16h1a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-.18c.493.134 1.007.18 1.5.18c3.076 0 5.5-2.424 5.5-5.5S15.576 2 12.5 2zM8 7.5C8 4.976 9.976 3 12.5 3S17 4.976 17 7.5S15.024 12 12.5 12c-.66 0-1.273-.095-1.776-.347A.5.5 0 0 0 10 12.1v.9H9a1 1 0 0 0-1 1v1H7a1 1 0 0 0-1 1v.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.586a.5.5 0 0 1 .146-.353l4.541-4.541c.432-.432.522-1.044.412-1.556A4.619 4.619 0 0 1 8 7.5z" fill="currentColor"></path></g></svg> 
            {{ $t('kerword_search') }}</li>
          <li @click="setSearchType(1)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M368 415.86V72a24.07 24.07 0 0 0-24-24H72a24.07 24.07 0 0 0-24 24v352a40.12 40.12 0 0 0 40 40h328" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path d="M416 464h0a48 48 0 0 1-48-48V128h72a24 24 0 0 1 24 24v264a48 48 0 0 1-48 48z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 128h64"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 192h64"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 256h192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 320h192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 384h192"></path><path d="M176 208h-64a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16z" fill="currentColor"></path></svg> 
              {{ $t('abstract_search') }}</li>
          <li @click="setSearchType(2)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448.08 256.08c0-106-86-192-192-192s-192 86-192 192s86 192 192 192s192-85.97 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path d="M300.81 358.29c-20.83 7.42-34.05 9.59-54.19 9.59c-61.17 0-106.39-50.07-101-111.84S205 144.21 266.14 144.21c68.92 0 106.79 45.55 101.47 106.55c-4 45.54-32.8 58.66-47.89 56c-14.2-2.55-25.92-15.52-23.75-40.35l5.62-44.66c-7.58-9.17-28.11-18-49.93-14.54C231.77 210.3 209 228 206.56 256s14.49 50.84 39.93 50.84s47.86-18.39 50.69-50.84" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="28"></path></svg>
             {{ $t('full_text_search')}}</li>
          <li @click="setSearchType(3)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M5 5.5C5 6.33 5.67 7 6.5 7h4v10.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h4c.83 0 1.5-.67 1.5-1.5S18.33 4 17.5 4h-11C5.67 4 5 4.67 5 5.5z" fill="currentColor"></path></svg>
             {{ $t('title_search') }}</li>
            <li @click="setSearchType(4)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.5 5a1.5 1.5 0 0 0 .968 1.403c.35.085.714.085 1.063 0A1.5 1.5 0 1 0 10.5 5zm-1.474.399a3 3 0 1 1 5.947 0l2.877-1.221a2.266 2.266 0 0 1 2.962 1.184a2.24 2.24 0 0 1-1.181 2.954l-3.628 1.54v3.717l1.874 5.444a2.25 2.25 0 1 1-4.255 1.465L12 15.772l-1.622 4.71a2.25 2.25 0 1 1-4.255-1.465l1.88-5.457V9.857L4.37 8.316a2.24 2.24 0 0 1-1.182-2.954A2.266 2.266 0 0 1 6.15 4.178l2.876 1.22zm1.996 2.438a3.75 3.75 0 0 1-.487-.168l-4.971-2.11a.766.766 0 0 0-1 .399a.74.74 0 0 0 .392.977L8.74 8.542c.462.196.761.649.761 1.15v3.91c0 .138-.023.275-.068.406l-1.892 5.497a.75.75 0 1 0 1.418.488l2.108-6.123c.306-.888 1.56-.884 1.864 0l2.108 6.123a.75.75 0 1 0 1.419-.488l-1.888-5.483a1.25 1.25 0 0 1-.069-.407V9.691c0-.502.3-.955.762-1.151l3.78-1.605a.74.74 0 0 0 .391-.977a.766.766 0 0 0-.999-.4l-4.97 2.11c-.16.068-.323.125-.489.17a2.995 2.995 0 0 1-1.955-.001z" fill="currentColor"></path></g></svg>
            {{ $t('author_search') }}</li>
            <li @click="setSearchType(5)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M216.08 192v143.85a40.08 40.08 0 0 0 80.15 0l.13-188.55a67.94 67.94 0 1 0-135.87 0v189.82a95.51 95.51 0 1 0 191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path></svg>
            {{ $t('journal_search') }}</li>
            <li @click="setSearchType(6)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M216.08 192v143.85a40.08 40.08 0 0 0 80.15 0l.13-188.55a67.94 67.94 0 1 0-135.87 0v189.82a95.51 95.51 0 1 0 191 0V159.74" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path></svg>
            {{ $t('institution_search') }}</li>
          <li @click="advancedSearch" ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" style="" ><path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192s192-86.13 192-192S361.87 64 256 64zm80 294.63l-54.15-54.15a88.08 88.08 0 1 1 22.63-22.63L358.63 336z" fill="currentColor"></path><circle cx="232" cy="232" r="56" fill="currentColor"></circle></svg>
            {{ $t('advanced_search_text') }}</li>
        </ul>
      </nav>
    </div>

    <div class="toggle-button" @click.stop="toggleSidebar" v-if="!isSidebarOpen && toggleShouldShow">
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
    @senddata="advsearch"
    @close=" is_advanced_search = false" >
    </AdvancedSearchModal>

  </div>

</template>
  
<script>
import AdvancedSearchModal from "../../components/modals/AdvancedSearchModal.vue";
import i18n from '../../language'
export default {
  components:{
    AdvancedSearchModal,
    i18n
  },
  data() {
    return {
      is_advanced_search: false,
      isSidebarOpen: false,
      toggleShouldShow: true
    };
  },
  watch: {
    isSidebarOpen: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          if (newValue == true) {
            document.getElementById('sidebar-container').style.width = '250px'
            document.getElementById('sidebar').style.width = '250px'
          } else {
            setTimeout(() => {
              document.getElementById('sidebar-container').style.width = '0px'
              document.getElementById('sidebar').style.width = '0px'
            }, 310);
          }
        })
      },
      immediate: true
    }
  },

  mounted() {
    window.addEventListener('click', this.closeSidebar)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeSidebar)
  },
  
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
      this.toggleShouldShow = false
    },

    closeSidebar() {
      if (this.isSidebarOpen) {
        this.isSidebarOpen = false
        setTimeout(() => {
          this.toggleShouldShow = true
        }, 310);
      }
    },

    advancedSearch(){
      this.is_advanced_search = true
    },

    setSearchType(type){
      this.$emit('setSearchType',type)
      this.closeSidebar()
    },
    advsearch(data){
      this.$emit('advsearch',data)
      alert("data send to aside bar")
    },
    doNothing() {
      /* DO NOT DELETE THIS !!!!!!!! */
    }
  },
};
</script>
  
<style scoped>
.sidebar-container {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  z-index: 90;
  /* overflow: hidden; */
}
  
.sidebar {
  width: 250px;
  color: var(--theme-mode-high-contrast);
  transition: transform 0.3s ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background: var(--theme-mode-like);
  border-radius: 0 20px 20px 0;
}

.sidebar::-webkit-scrollbar {
  display: none;
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
  background-color: var(--theme-mode-slight-contrast); /* 鼠标悬停的背景色 */
}

.sidebar.closed {
  transform: translateX(-100%);
}

.toggle-button {
  position: absolute;
  top: 0px;
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
  