<template>
  <div class="Footer">
    <div class="FooterLeft" @click="showDetail">
      <img :src="playlist[playlistIndex].al.picUrl" alt="" />
      <div class="msg">
        <p>{{ playlist[playlistIndex].name }}</p>
        <span>横滑可以切换</span>
      </div>
    </div>
    <div class="FooterRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isPlay">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="showList">
        <use xlink:href="#icon-zu"></use>
      </svg>

      <div v-show="listshow" class="list">
        <div v-for="item in playlist">{{ item.name }}</div>
      </div>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"
      @timeupdate="updateTime"
    ></audio>
    <van-popup
      v-model:show="isDetail"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <Detail
        :msg="playlist[playlistIndex]"
        :play="play"
        :isPlay="isPlay"
      ></Detail>
    </van-popup>
  </div>
</template>
<script>
// console.log(state);
import { mapMutations, mapState } from "vuex";
import Detail from "./MusicDetail.vue";
export default {
  data() {
    return {
      listshow: false,
    };
  },
  components: {
    Detail,
  },
  computed: {
    ...mapState([
      "playlist",
      "playlistIndex",
      "isPlay",
      "isDetail",
      "duration",
    ]),
  },
  mounted() {
    // console.log(this.$refs.audio.paused);
    // console.log(this);
    // console.log("-----------");
    this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id);
    this.updateDuration(this.$refs.audio.duration);
  },
  updated() {
    //检测组件信息是否更改，是的话调用歌词函数
    this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id);
    this.updateDuration(this.$refs.audio.duration);
  },
  methods: {
    ...mapMutations([
      "updateIsPlay",
      "updateDetail",
      "updateCurrentTime",
      "updateDuration",
    ]),
    showList: function () {
      this.listshow = !this.listshow;
    },
    play: function () {
      if (this.isPlay) {
        this.$refs.audio.play();

        this.updateIsPlay(!this.isPlay);
      } else {
        this.$refs.audio.pause();
        this.updateIsPlay(!this.isPlay);
      }
    },
    showDetail: function () {
      this.updateDetail();
    },
    updateTime: function () {
      //当前歌曲播放时间数据
      this.updateCurrentTime(this.$refs.audio.currentTime);
      //   let bfb = this.$refs.audio.currentTime / this.$refs.audio.duration;
      // console.log(this.$refs.audio.duration);
      if (this.$refs.audio.currentTime >= this.$refs.audio.duration) {
        this.updateIsPlay(true);
      }
    },
  },
  watch: {
    playlistIndex: function () {
      this.updateIsPlay(false);
      this.$refs.audio.autoplay = true;
      this.updateDuration(this.$refs.audio.duration);
    },
    playlist: function () {
      this.updateIsPlay(false);
      this.$refs.audio.autoplay = true;
      this.updateDuration(this.$refs.audio.duration);
    },
  },
};
</script>
<style lang="less">
.Footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: white;

  border-top: 1px solid;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .FooterLeft {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 250px;
    height: 100%;
    img {
      width: 50px;
      height: 50px;
      border-radius: 80%;
    }

    .msg {
      width: 150px;
    }
  }

  .FooterRight {
    // background-color: pink;
    display: flex;
    width: 80px;
    justify-content: space-around;
    margin-right: 5px;
    .list {
      position: absolute;
      background-color: rgba(89, 15, 81, 0.7);
      width: 180px;
      right: 0px;
      bottom: 50px;
      display: flex;
      // justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #e8d8d8;
      border-radius: 5px 0 0 5px;
      max-height: 180px;
      overflow: scroll;
    }
  }
}
</style>
