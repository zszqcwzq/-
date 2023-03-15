<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>

    <input
      type="text"
      placeholder="反方向的钟"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>

  <div class="searchHistory">
    <span>历史</span>
    <span v-for="item in keyWordList" :key="item" @click="seahis(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="clear">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>

  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="item">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="index">{{
            item1.name
          }}</span>
        </div>
      </div>

      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchList } from "../request/api/search";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("his"));
  },
  computed: {
    ...mapState(["playlist"]),
  },
  methods: {
    ...mapMutations(["pushPlayList", "updatePlayListIndex"]),

    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWordList.unshift(this.searchKey);
        // this.keyWordList = Array.from(new Set(this.keyWordList));
        this.keyWordList = [...new Set(this.keyWordList)];

        if (this.keyWordList.length > 8) {
          this.keyWordList.pop();
        }
        localStorage.setItem("his", JSON.stringify(this.keyWordList));

        let res = await getSearchList(this.searchKey);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    clear: function () {
      localStorage.removeItem("his");

      this.keyWordList = [];
    },
    seahis: async function (data) {
      let res = await getSearchList(data);
      this.searchList = res.data.result.songs;
      // console.log(res);
    },
    updateIndex: function (data) {
      data.al = data.album;
      data.al.picUrl = data.album.artist.img1v1Url;
      //   this.pushPlayList(data);

      //   this.updatePlayListIndex(this.playlist.length - 1);
      this.pushPlayList(data);
      this.updatePlayListIndex(this.playlist.length - 1);

      console.log(this.playlist.length);
    },
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("his")) || [];

    // console.log(localStorage.getItem("his"));
  },
};
</script>

<style lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  .icon {
    width: 50px;
  }
  input {
    width: 70%;
    margin-left: 20px;
    border: none;
    border-bottom: 1px solid #999;
    padding-left: 10px;
  }
}

.searchHistory {
  position: relative;
  width: 100%;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-right: 30px;
  span {
    height: 30px;
    display: flex;
    align-items: center;
    background-color: #cab4b4;
    margin: 5px 10px;
    border-radius: 10px;
    padding: 5px 10px;
  }
  span:nth-child(1) {
    font-weight: 700;
    background-color: white;
  }
  .icon {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 10px;
    top: 20px;
  }
}

.itemList {
  width: 100%;
  padding-bottom: 60px;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          margin-bottom: 2px;
        }
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
          // margin-top: 3px;
          margin-right: 3px;
        }
        margin-left: 0.3rem;
      }
    }
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
