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

// 修改点检项次
export const itemupdate = (eiInfo) => {
    return req({
        url: '/item/update',
        method: 'post',
        data: eiInfo
    })
}
// 删除点检项次
export const itemdelete = (eiInfo) => {
    return req({
        url: '/item/delete',
        method: 'post',
        data: eiInfo
    })
}


// 新增点检项次
export const itemadd = (eiInfo) => {
    return req({
        url: '/item/add',
        method: 'post',
        data: eiInfo
    })
}

// 新增点检设备
export const deviceadd = (eiInfo) => {
    return req({
        url: '/device/add',
        method: 'post',
        data: eiInfo
    })
}
// 修改点检设备
export const deviceupdate = (eiInfo) => {
    return req({
        url: '/device/update',
        method: 'post',
        data: eiInfo
    })
}
// 删除点检设备
export const devicedelete = (eiInfo) => {
    return req({
        url: '/device/delete',
        method: 'post',
        data: eiInfo
    })
}

// 查询历史记录部分数据
export const recordhistory = (eiInfo) => {
    return req({
        url: '/check/record/history/part',
        method: 'post',
        data: eiInfo
    })
}
// 查询历史记录全部数据
export const recordhistoryall = (eiInfo) => {
    return req({
        url: '/check/record/history/all',
        method: 'post',
        data: eiInfo
    })
}

// 查询设备的所有信息 编辑前查询
export const devicequeryallinfo = (eiInfo) => {
    return req({
        url: '/device/query/all/info',
        method: 'post',
        data: eiInfo
    })
}