import service from "..";
//获取轮播图
export function getBanner() {
  return service({
    method: "get",
    url: "/banner?type=2",
  });
}
//获取发现好歌单
export function getMusicList() {
  return service({
    method: "get",
    url: "/personalized?limit=10",
  });
}

//登录
export function Login(data) {
  return service({
    method: "get",
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
  });
}

//获取用户详情
export function getLoginUser(data) {
  return service({
    method: "get",
    url: `/user/detail?uid=${data}`,
  });
}
