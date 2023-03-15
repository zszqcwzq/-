<template>
  <div class="userTop">
    <svg class="icon liebiao" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <img :src="user.pic" alt="" class="userbgi" />
    <div class="info">
      <span>用户名：{{ user.name }}</span>
      <span>性别：{{ user.sex }}</span>
    </div>
  </div>

  <div class="songlist">
    <div v-for="item in user.lovesongs" :key="item">{{ item.name }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style lang="less">
.userTop {
  width: 100%;
  height: 100px;
  position: relative;
.icon{
    margin: 10px;
    margin-top: 15px;
}
  .userbgi {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .info {
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
    span {
      margin-right: 10px;
    }
  }
}

.songlist {
  //   background-color: red;
  width: 100%;
  position: relative;
  top: 100px;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    // height: 50px;
    display: flex;
    align-items: center;
    padding: 15px;
  }
}
</style>
