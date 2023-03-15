<template>
  <div class="topnav">
    <div class="topleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>

    <div class="topcontent">
      <span @click="$router.push('/infouser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="topright">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="less" scoped>
.topnav {
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topleft {
    margin-top: 7px;
  }
  .topcontent {
    width: 65%;
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;

    .active{
        font-weight: 700;
    }
  }
}
</style>
