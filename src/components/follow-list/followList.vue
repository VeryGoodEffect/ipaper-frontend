<template>
  <div class="follow-list-area">
      <div class="item-card" v-for="(follower, idx) in followers" :key="idx">
        <!-- <div>
          <img class="item-image" />
        </div> -->
        <div class="item-text">
          <h4 class="follower-name">{{ follower.display_name }}</h4>
        </div>
          <button class="item-button basic-btn" v-if="follower.is_followed" @click="unFollow(follower)">
            {{ $t('cancel_follow') }}
          </button>
          <button class="item-button basic-btn-outline" v-else @click="follow(follower)">
            {{ $t('follow') }}
          </button>
      </div>
  </div>
</template>

<script>
import { User } from '../../api/users.js'

export default {
  props: ['userID'],
  data() {
    return {
      followers: [
        // {
        //   id: 1,
        //   name: '用户1',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },
        // {
        //   id: 2,
        //   name: '用户2',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },
        // {
        //   id: 3,
        //   name: '用户3',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },
        // {
        //   id: 4,
        //   name: '用户4',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },
        // {
        //   id: 4,
        //   name: '用户4',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },{
        //   id: 4,
        //   name: '用户4',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },{
        //   id: 4,
        //   name: '用户4',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },{
        //   id: 4,
        //   name: '用户4',
        //   profile: '个人简介',
        //   isFollowed: false,
        // },{
        //   id: 4,
        //   name: '用户4',
        //   profile: '个人简介',
        //   isFollowed: false,
        // }
      ]
    }
  },
  created() {
    this.getFollowers()
  },
  methods: {
    getFollowers() {
      // console.log(this.userID)
      // console.log(222)
      User.getUserFollowing(this.userID).then(
        (response) => {
          this.followers = response.data
          // console.log(this.followers)
          // for (let i = 0 ; i < response.data.count; i++) {
          //   this.followers.push({
          //     id: response.data.results[i].id,
          //     name: response.data.results[i].display_name,
          //     profile: '个人简介',
          //     isFollowed: true
          //   })
          // }
        },
        (error) => {
          console.log(error)
        }
      )
    },
    follow(follower) {
      follower.is_followed = !follower.is_followed;
      User.followUser({followed:follower.id})
    },
    unFollow(follower) {
      follower.is_followed = !follower.is_followed;
      User.cancelFollowUser({followed:follower.id})
    }
  }
}
</script>

<style scoped>
/* .follow-list-area {
  display: flex;
  justify-content: center;
} */

.follow-list-area {
  padding: 20px;
  overflow-y: auto;
  min-height: 250px; 
  max-height: 500px; 
  background: var(--theme-mode-like);
  margin-bottom: 20px;
  border-radius: 10px;
}

.item-card {
  height: 80px; 
  border-radius: 5px;
  background-color: var(--theme-mode-slight-contrast);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.item-card:last-child {
  margin-bottom: 0;
}

.item-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 20px;
}
.item-button {
  width: 80px;
  height: 40px;
  font-size: 16px;
  margin-right: 20px;
}
.item-text {
  position: relative;
  width: 65%;
}

.item-text h4:hover {
  text-decoration: underline;
}

.follower-name {
  margin-left: 15px;
  cursor: pointer;
}

</style>


