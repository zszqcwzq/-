<template>
  <!-- {{ state.playlist }} -->
  <Top :playlist="state.playlist" />
  <List :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import { useRoute } from "vue-router";
import { reactive,onBeforeMount } from "vue";
import { getItem, getItemList } from "../request/api/item.js";
import Top from "../components/item/ItemMuiscTop.vue";
import List from "../components/item/ItemMusicList.vue";

export default {
  name: "ItemMusic",
  setup() {
    const state = reactive({
      playlist: {},
      itemList: [],
    });
    onBeforeMount(async () => {
      //获取歌单id
      let id = useRoute().query.id;
      console.log(id);
      //获取歌单详情
      let res = await getItem(id);
      console.log(res.data.playlist);

      state.playlist = res.data.playlist;

      //获取歌单歌曲
      let result = await getItemList({ id, limit: 10, offset: 0 });
      console.log(result);
      state.itemList = result.data.songs
      //防止页面刷新数据丢失
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
    });

    return { state };
  },
  components: {
    Top,
    List,
  },
};
</script>
