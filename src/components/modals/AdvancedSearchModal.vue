<template>
  <PopoutModal :show="show" @close="handleClose"
  >
    <div class="container">
      <h3>{{ $t("advanced_search") }}</h3>
      <span>{{ $t("advanced_search_author") }}</span>
      <input
          type="text"
          class="basic-input"
          :placeholder="$t('advanced_search_author_example')"
          v-model="author"
      />
      <span>{{ $t("advanced_search_publication") }}</span>
      <input
          type="text"
          class="basic-input"
          :placeholder="$t('advanced_search_publication_example')"
          v-model="publication"
      />
      <span>{{ $t("advanced_search_publish_time") }}</span>
      <div class="time-input-wrapper">
        <input
          type="text"
          class="basic-input time-input"
          :placeholder="1997"
          v-model="start_time" 
          />
        <span class="wave">&nbsp;～&nbsp;</span>
        <input
          type="text"
          class="basic-input time-input"
          style="width: 30%; min-width: 30%; left: 70%"
          :placeholder="1998"
          v-model="end_time" 
        />
      </div>

      <span>{{ $t("advanced_search_publish_keyword") }}</span>
      <input type="text"
        class="basic-input time-input"
        v-model="keyword" />
      <div class="check-input-wrapper">
        <span>
          {{ $t("advanced_search_publish_keyword_isTitle") }}
        </span>
        <input
          type="checkbox"
          class="check-input"
          v-model="is_key_title" 
        />
      </div>
      
      <button class="search-btn">
        <div @click="sendMsg">
          {{ $t('search_text') }}
          <svg t="1703115810535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7524" id="mx_n_1703115810536" width="200" height="200"><path d="M793.3 191.8h-185c-17.7 0-32 14.3-32 32s14.3 32 32 32h184.9c4.6 0 8.4 3.8 8.4 8.4v303.1c0 4.6-3.8 8.4-8.4 8.4h-507L458 403.9c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L213.2 558.3c-13.1 13.1-20.3 30.5-20.3 49s7.2 35.9 20.3 49l201.4 201.4c6.2 6.2 14.4 9.4 22.6 9.4 8.2 0 16.4-3.1 22.6-9.4 12.5-12.5 12.5-32.8 0-45.3L287.2 639.7h506.1c39.9 0 72.4-32.5 72.4-72.4V264.2c0-39.9-32.5-72.4-72.4-72.4z" p-id="7525"></path></svg>
        </div>
      </button>
    </div>
  </PopoutModal>
</template>
  
  <script>
import PopoutModal from "../popout-modal/PopoutModal.vue";
import i18n from "../../language";

export default {
  name: "AdvancedSearch",
  emits: ["close", "jumpToLogin","senddata"],
  data() {
    return {
      author: "",
      publication: "",
      start_time: "",
      end_time: "",
      keyword: "",
      is_key_title: true
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PopoutModal,
    i18n,
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    logSearchParams(){
      console.log(this.searchParams)
    },
    sendMsg(){
      this.$emit('senddata',this.searchParams)
      this.handleClose()
    }
  
  },
  computed: {
    // 计算属性用于取反 is_key_title 的值
    is_key_title_inverted: {
      get() {
        return !this.is_key_title;
      },
      set(value) {
        this.is_key_title = !value;
      }
    },
    searchParams() {
      return {
        author: this.author,
        publication: this.publication,
        start_time: this.start_time,
        end_time: this.end_time,
        keyword: this.keyword,
        is_key_title: this.is_key_title
      };
    }
  }
};
</script>
  
  <style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.container > * {
  min-width: 70%;
}

.container > h3 {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.container > h3,
.container > h3 * {
  font-size: 35px;
  font-weight: bold;
}

.container > input:not([type="checkbox"]) {
  width: 70%;
  height: 50px;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.container > input::placeholder {
  color: var(--theme-mode-high-contrast);
}

.container > input {
  margin-bottom: 20px;
}


.container > span {
  width: 70%;
  font-size: 16px;
  margin-bottom: 5px;
}

.btn-box {
  width: 70%;
  display: flex;
  justify-content: space-around;
}

.btn-box button {
  width: 120px;
  height: 50px;
  font-size: 24px;
}

.time-input-wrapper {
  margin-bottom: 20px;
  width: 70%;
}

.time-input {
  height: 40px;
  width: 30%;
  min-width: 60px;
}

.wave {
  color: var(--default-text-color);
  font-size: 24px;
}

div.check-input-wrapper {
  min-width: 70%;
  display: flex;
  align-items: center;
}

input[type="checkbox"].check-input {
  height: 15px;
  min-width: 20px;
  margin-left: 5px;
}

.search-btn {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-end;
  cursor: default;
}

.search-btn div {
  background: transparent;
  color: var(--theme-color);
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-content: flex-end;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 80px;
  cursor: pointer;
}

.search-btn div:hover {
  scale: 1.2;
  text-decoration: underline;
  font-weight: bold;
}

.search-btn svg {
  width: 25px;
  height: 25px;
  margin-top: 2px;
  fill: var(--theme-color);
}

@media screen and (max-width: 768px) {
  .container > h3 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .container > h3 span {
    display: none;
  }

  .container > input {
    height: 40px;
    font-size: 18px !important;
    padding-left: 10px !important;
  }

  .container > input,
  .container > span,
  .btn-box {
    min-width: 70%;
  }

  .btn-box button {
    width: 100px;
    height: 40px;
    font-size: 20px;
  }

  .container > span,
  .container > span > a {
    font-size: 14px;
  }

  .wave {
    font-size: 18px ;
  }

  .time-input-wrapper input {
    font-size: 14px;
  }
  
}
</style>