<template>
  <img :src="msg.al.picUrl" alt="" class="bgi" />

  <div class="Top">
    <div class="le" @click="showDetail">
      <svg class="icon liebiao" aria-hidden="true" @click="goback">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>

      <div class="ar">
        <Vue3Marquee duration="10" id="mar">
          {{ msg.name }}
        </Vue3Marquee>
        <div>
          <span v-for="(item, i) in msg.ar">{{ item.name }}</span>
          <svg class="icon liebiao" aria-hidden="true" id="you">
            <use xlink:href="#icon-youjiantou1"></use>
          </svg>
        </div>
      </div>
    </div>

    <div class="ri">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>

  <div class="Content" v-show="!isLyricShow" @click="showLyric">
    <img
      src="@/assets/tanzhen.png"
      alt=""
      class="tanzhen"
      :class="{ tanzhen_active: !isPlay }"
    />
    <img src="@/assets/yuanpan.png" alt="" class="yuanpan" />
    <img
      :src="msg.al.picUrl"
      alt=""
      class="touxiang"
      :class="{ touxiang_paused: isPlay }"
    />
  </div>

  <div class="lyric" v-show="isLyricShow" @click="showLyric" ref="musicLyric">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active: item.pre > currentTime * 1000 && currentTime * 1000 > item.time,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>

  <div class="detailFooter">
    <div class="dFT">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>

    <div class="dFC">
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>

    <div class="dFF">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="pre">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="play" v-if="isPlay">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="next">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="showList">
        <use xlink:href="#icon-zu"></use>
      </svg>

      <div v-show="listshow" class="list">
        <div v-for="item in playlist">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { showDetail } from "./FooterMusic.vue";

import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      isLyricShow: false,
      listshow: false,
    };
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "duration",
      "playlistIndex",
      "playlist",
    ]),
    //将拿到的歌词数据处理
    lyric: function () {
      let arr = [];
      if (this.lyricList) {
        arr = this.lyricList.split(/[(\r\n\r\n)]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            (parseInt(min) * 60 + parseInt(sec)) * 1000 + parseInt(mill);
          //拿到分秒毫秒 歌词 对毫秒做安全处理
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time = (parseInt(min) * 60 + parseInt(sec)) * 1000 + parseInt(mill);
          }
          //   console.log(min, sec, mill, lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i == arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 10000000000;
          } else {
            item.pre = arr[i + 1].time;
          }
        
        });
      }

      console.log(arr);
      //   console.log(this.currentTime);
      return arr;
    },
  },
  props: ["msg", "play", "isPlay"],
  mounted() {
    console.log(this.msg);
  },
  components: {
    Vue3Marquee,
  },
  methods: {
    ...mapMutations([
      "updateDetail",
      "updateCurrentTime",
      "updatePlayListIndex",
    ]),
    ...mapActions(["getLyric"]),
    goback: function () {
      this.updateDetail();
    },

    showLyric: function () {
      this.isLyricShow = !this.isLyricShow;
    },
    next: function () {
      if (this.playlistIndex != this.playlist.length - 1) {
        this.updatePlayListIndex(this.playlistIndex + 1);
      }
    },
    pre: function () {
      if (this.playlistIndex != 0) {
        this.updatePlayListIndex(this.playlistIndex - 1);
      }
    },
    showList: function () {
      this.listshow = !this.listshow;
    },
  },
  watch: {
    currentTime: function () {
      let p = document.querySelector("p.active");

      if (p && p.offsetTop > 300) {
        // console.log(this.$refs.musicLyric);
        this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
      }
    },
  },
};
</script>

<style lang="less">
.bgi {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.Top {
  height: 50px;
  width: 100%;
  //   background-color: pink;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  fill: #fff;
  .le {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;

    .ar {
      display: flex;
      //   align-items: center;
      flex-direction: column;
      font-size: 13px;
      width: 110px;
      margin-top: 5px;
      //   overflow: hidden;

      #mar {
        color: white;
      }
      div {
        display: flex;
        align-items: center;

        span {
          color: #999;
        }
        span::after {
          content: ",";
        }

        span:nth-last-child(2)::after {
          content: "";
        }

        .icon {
          width: 10px;
          height: 10px;
          margin-left: 5px;
          fill: #999;
        }
      }
    }
  }
  .ri {
    display: flex;
    align-items: center;
  }
}
.Content {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  .tanzhen {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 1.5s;
    z-index: 2;
  }

  .tanzhen_active {
    transform: rotate(3deg);
    transition: all 1.5s;
    z-index: 2;
  }

  .yuanpan {
    position: absolute;
    z-index: 1;
    width: 250px;
    height: 250px;
    bottom: 2.3rem;
    z-index: -1;
  }

  .touxiang {
    border-radius: 50%;
    width: 3.2rem;
    height: 3.2rem;
    position: absolute;
    bottom: 160px;
    animation: rotate_tx 10s linear infinite;
  }

  @keyframes rotate_tx {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  /* .touxiang_active {
    animation-play-state: running;
  } */

  .touxiang_paused {
    animation-play-state: paused;
  }
}

.detailFooter {
  width: 100%;
  height: 130px;
  //   background-color: pink;
  position: absolute;
  bottom: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .dFT {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 0.4rem;
      height: 0.4rem;
      fill: white;
    }

    .icon:nth-child(3) {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  .dFC {
    // width: 100%;
    // height: 2px;
    // background-color: red;
    .range {
      height: 3px;
      width: 100%;
    }
  }

  .dFF {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      fill: white;
    }

    .icon:nth-child(3) {
      width: 0.7rem;
      height: 0.7rem;
    }

    .list {
      position: absolute;
      background-color: rgba(89, 15, 81, 0.7);
      width: 180px;
      right: 0px;
      bottom: 40px;
      display: flex;
      // justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #e8d8d8;
      border-radius:  5px 0 0 5px;
      max-height: 180px;
      overflow: scroll;
    }
  }
}

.lyric {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  overflow: scroll;

  padding-top: 5px;
  padding-bottom: 150px;
  p {
    margin: 5px;
    color: rgb(186, 174, 174);
    font-size: 17px;
  }
  .active {
    color: rgb(248, 243, 243);
    font-size: 25px;
  }
}
</style>
