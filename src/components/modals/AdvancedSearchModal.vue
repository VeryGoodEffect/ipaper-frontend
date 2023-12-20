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
      <span style="position: relative">
        <input
          type="password"
          class="basic-input"
          style="width: 30%; min-width: 30%"
          :placeholder="1997"
          v-model="start_time" 
          />
          
        <input
          type="password"
          class="basic-input"
          style="width: 30%; min-width: 30%; left: 70%"
          :placeholder="1998"
          v-model="end_time" 
      /></span>

      <span>{{ $t("advanced_search_publish_keyword") }}</span>
      <input type="password"
        class="basic-input"
        :placeholder="$t('confirm_password_text')"
        v-model="keyword" />

      <span>{{ $t("advanced_search_publish_keyword_isTitle") }}</span>
      <input
        type="checkbox"
        v-model="is_key_title" 
      />

      <button @click="sendMsg">Search</button>

      <!-- <div class="btn-box">
        <button class="basic-btn-outline" @click="handleJumpToLogin">
          {{ $t("login_text") }}
        </button>
        <button class="basic-btn" @click="register">
          {{ $t("register_text") }}
        </button>
      </div> -->
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
  min-width: 60%;
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

.container > input {
  width: 70%;
  height: 60px;
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
}

.container > input::placeholder {
  color: var(--theme-mode-high-contrast);
}

.container > input:first-of-type {
  margin-bottom: 5px;
}
.container > input:nth-of-type(2),
.container > input:nth-of-type(3),
.container > input:nth-of-type(4) {
  margin-bottom: 40px;
}

.container > span {
  width: 70%;
  font-size: 16px;
  margin-bottom: 35px;
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

@media screen and (max-width: 768px) {
  .container > h3 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .container > h3 span {
    display: none;
  }

  .container > input {
    height: 40px;
    font-size: 20px;
    padding-left: 10px;
  }

  .container > input:nth-of-type(2),
  .container > input:nth-of-type(3),
  .container > input:nth-of-type(4) {
    margin-bottom: 20px;
  }

  .container > span {
    margin-bottom: 15px;
  }

  .container > input,
  .container > span,
  .btn-box {
    min-width: 80%;
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
}
</style>