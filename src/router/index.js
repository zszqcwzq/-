import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import ItemMusicVue from "@/views/ItemMusic.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/itemmusic",
    name: "ItemMusic",
    component: () => import("../views/ItemMusic.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/infouser",
    name: "InfoUser",
    /* beforeEnter: (to, from, next) => {
      if (
        store.state.isLogin &&
        store.state.token == localStorage.getItem("token")
      ) {
        next();
      } else {
        next("/login");
      }
    }, */
    component: () => import("../views/InfoUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  if (to.path == "/login") {
    store.state.isFooterShow = false;
  } else {
    store.state.isFooterShow = true;
  }
});

export default router;
