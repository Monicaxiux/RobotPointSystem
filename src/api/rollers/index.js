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

// 查询一条点检记录中的全部数据
export const recordallinfo = (eiInfo) => {
    return req({
        url: '/check/record/all/info',
        method: 'post',
        data: eiInfo
    })
}

// 点检记录上传
export const recorduploaddata = (formData) => {
    return req({
        url: '/check/record/upload/data',
        method: 'post',
        transformRequest: [function (data, headers) {
            // 去除post请求默认的Content-Type
            delete headers.post['Content-Type']
            return data
        }],
        data: formData
    })
}

// 查询项次的部分信息
export const itempartinfo = (eiInfo) => {
    return req({
        url: '/item/part/info',
        method: 'post',
        data: eiInfo
    })
}

// 查询项次的全部信息
export const itemallinfo = (eiInfo) => {
    return req({
        url: '/item/all/info',
        method: 'post',
        data: eiInfo
    })
}