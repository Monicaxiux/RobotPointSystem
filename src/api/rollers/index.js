import req from "@/utils/request"
// 查询全部产线的编号与名称
export const queryallline = (eiInfo) => {
    return req({
        url: '/factory/line/query/all/line',
        method: 'get',
        data: eiInfo
    })
}
// 查询设备的id宝罗工号名称信息
export const querysimpleinfo = (eiInfo) => {
    return req({
        url: '/device/query/simple/info',
        method: 'post',
        data: eiInfo
    })
}

// 最新的点检记录
export const newestrecord = (eiInfo) => {
    return req({
        url: '/check/record/newest/record',
        method: 'post',
        data: eiInfo
    })
}