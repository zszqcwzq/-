import service from "..";

//获取歌单详情页
export function getSearchList(data) {
  return service({
    method: "GET",
    url: `/search?keywords= ${data}&limit=10`,
  });
}
