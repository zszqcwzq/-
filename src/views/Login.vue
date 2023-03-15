<template>
  <div class="top">
    <svg class="icon liebiao" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>

    <span>请输入账号密码</span>
  </div>

  <div class="info">
    <input
      type="text"
      name="phone"
      class="phone"
      placeholder="请输入账号"
      v-model="phone"
    />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="请输入密码"
      v-model="password"
    />
  </div>

  <button class="log" @click="Log">登录</button>
</template>
<script>
import { mapActions } from "vuex";
import { getLoginUser } from "../request/api/home";
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["getLogin"]),
    Log: async function () {
      if (this.phone != "" && this.password != "") {
        /*  let res = this.$store.dispatch("getLogin", {
          phone: this.phone,
          password: this.password,
        }); */

        let res = await this.getLogin({
          phone: this.phone,
          password: this.password,
        });
        // console.log(res);

        if (res.code === 200) {
          this.$store.commit("updateLogin", true);
          this.$store.commit("updateToken", res.data.token);

          let result = await this.getLoginUser(res.data.account.id);
          this.$store.commit("updateUser", result);
          this.$router.push("/infouser");
        } else {
          console.log("错误");
        }

        this.phone = "";
        this.password = "";
      } else {
        alert("请输入正确的账号密码");
      }
    },
  },
};
</script>

<style lang="less">
.top {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;

  .icon {
    width: 30px;
    margin-right: 90px;
  }

  span {
    font-weight: 700;
  }
}

.info {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    border: none;
    border-bottom: 1px solid;
    width: 85%;
    height: 50px;
    // background-color: red;
    margin-bottom: 10px;
    // padding-bottom: 0;
    // display: flex;
    // align-items: flex-end;
    vertical-align: middle;
    line-height: 50px;
  }
}
.log {
  width: 100px;
  height: 30px;
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  border: 1px solid;
  background-color: rgb(164, 220, 244);
}
</style>
