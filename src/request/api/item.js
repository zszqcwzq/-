import service from "..";

//获取歌单详情页
export  function getItem(data) {
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}

//获取歌单详情列表

export  function getItemList(data) {
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
    })
}

//获取歌词

export  function getMusiclyric(data) {
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}