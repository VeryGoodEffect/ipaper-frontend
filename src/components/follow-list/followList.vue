<template>
  <!-- <div class="follow-list-area"> -->
    <PaginationVue>
    <div v-for="(follower, idx) in followers" :key="idx">
      <div class="item-card">
        <div>
          <img class="item-image" />
        </div>
        <div class="item-text">
          <div class="follower-name">{{ follower.name }}</div>
          <div class="follower-profile">{{ follower.profile }}</div>
        </div>
          <button class="item-button" v-if="follower.isFollowed" @click="follow(follower)">
            {{ $t('cancel_follow') }}
          </button>
          <button class="item-button" v-else @click="unFollow(follower)">
            {{ $t('follow') }}
          </button>
      </div>
    </div>
    </PaginationVue>
  <!-- </div> -->
</template>

<script>
import PaginationVue from "../pagination/Pagination.vue"
export default {
  components: {
    PaginationVue
  },
  data() {
    return {
      followers: [
        {
          id: 1,
          name: '用户1',
          profile: '个人简介',
          isFollowed: false,
        },
        {
          id: 2,
          name: '用户2',
          profile: '个人简介',
          isFollowed: false,
        },
        {
          id: 3,
          name: '用户3',
          profile: '个人简介',
          isFollowed: false,
        },
        {
          id: 4,
          name: '用户4',
          profile: '个人简介',
          isFollowed: false,
        }
      ]
    }
  },
  methods: {
    follow(follower) {
      follower.isFollowed = !follower.isFollowed;
    },
    unFollow(follower) {
      follower.isFollowed = !follower.isFollowed;
    }
  }
}
</script>

<style scoped>
/* .follow-list-area {
  display: flex;
  justify-content: center;
} */
.item-card {
  height: 120px; 
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.item-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: 20px;
}
.item-button {
  margin-right: 20px;
}
.item-text {
  position: relative;
  width: 60%;
  margin: 0 10px;
}
.follower-profile {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>


