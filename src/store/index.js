import { createStore } from "vuex";
import { getMusiclyric } from "@/request/api/item";
import { Login } from "@/request/api/home";
export default createStore({
  state: {
    playlist: [
      {
        al: {
          id: 19076,
          name: "学友 热",
          pic: 19047939439853430,
          picUrl:
            "https://p2.music.126.net/blZlhdVmYSUwgqSUxFs88Q==/19047939439853431.jpg",
          pic_str: "19047939439853431",
        },
        id: 188432,
        name: "如果这都不算爱",
        ar: [{ id: 6460, name: "张学友", tns: Array(0), alias: Array(0) }],
      },
    ],
    playlistIndex: 0,
    isPlay: true,
    isDetail: false,
    lyricList: {},
    currentTime: 0,
    duration: 215.823673,
    isLogin: false,
    isFooterShow: true,
    token: "",
    user: {
      name: "张三",
      pic: "https://p1.music.126.net/Fg_8XLbz9uwJvHVLXhz5Cg==/109951163349262839.jpg",
      sex: "man",
      lovesongs: [{ name: "两只老虎" }, { name: "小鸭子" }, { name: "晚安" }],
    }, //用户信息
  },
  getters: {},
  mutations: {
    updateIsPlay: function (state, value) {
      state.isPlay = value;
    },
    updatePlayList: function (state, value) {
      state.playlist = value;
    },
    pushPlayList: function (state, value) {
      state.playlist.push(value);

      // console.log(value);
      // console.log(state.playlist.length - 1);
    },
    updatePlayListIndex: function (state, value) {
      state.playlistIndex = value;
    },
    updateDetail: function (state) {
      state.isDetail = !state.isDetail;
    },
    updateLyric: function (state, value) {
      state.lyricList = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    updateLogin: function (state, value) {
      state.isLogin = value;
    },
    updateToken: function (state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    updateUser: function (state, value) {
      state.user = value;
    },
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusiclyric(value);

      context.commit("updateLyric", res.data.lrc.lyric);

      // console.log(this.state.lyricList);
    },
    getLogin: async function (context, value) {
      return await Login(value);
    },
  },
  modules: {},
});
