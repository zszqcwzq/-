<template>
  <div class="musicList">
    <div class="top">
      <div class="title">发现好个歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="content">
      <van-swipe
        :loop="false"
        :width="130"
        :show-indicators="false"
        class="my-swipe"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemmusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="topright">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang3"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="bottom">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import { reactive, onMounted } from "vue";
export default {
  //vue2写法

  /* data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getGedan() {
      let res = await getMusicList();
      this.musicList = res.data.result;
      console.log(res.data.result[0]);
    },
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(2) + "万";
      }
    },
  },
  mounted() {
    this.getGedan();
  }, */

  //vue3写法
  setup() {
    const state = reactive({
      musicList: [],
    });

    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(2) + "万";
      }
    }

    onMounted(async () => {
      let res = await getMusicList();
      //   console.log(res.data.result[0]);
      state.musicList = res.data.result;
    });

    return { state, changeCount };
  },
};
</script>

<style lang="less">
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 20px;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .content {
    width: 100%;
    height: 200px;
    .my-swipe {
      height: 100%;

      .van-swipe-item {
        position: relative;
        margin-right: 10px;
        img {
          width: 100%;
          height: 130px;
          border-radius: 8px;
        }
        .topright {
          position: absolute;
          right: 3px;
          top: 6px;
          justify-content: center;
          align-items: center;
          display: flex;
          color: white;
          font-size: 13px;
          .icon {
            width: 16px;
            height: 16px;
            margin-right: 3px;
          }
        }

        .bottom {
          position: relative;
          left: 0;
          top: 5px;
          font-size: 12px;
          // padding: 0 5px;
          color: black;
        }
      }
    }
  }
}
</style>
