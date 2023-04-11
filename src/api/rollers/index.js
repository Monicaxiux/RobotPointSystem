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

// 新增点检项次 临时项次
export const addtemp = (eiInfo) => {
    return req({
        url: '/item/add/temp',
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


// 查询部分维护记录信息
export const maintainquerypart = (eiInfo) => {
    return req({
        url: '/maintain/query/part',
        method: 'post',
        data: eiInfo
    })
}


// 查询单条维护记录全部数据
export const maintainqueryall = (eiInfo) => {
    return req({
        url: '/maintain/query/all',
        method: 'post',
        data: eiInfo
    })
}

// 删除维护记录
export const recorddeleterecord = (eiInfo) => {
    return req({
        url: '/maintain/record/delete/record',
        method: 'post',
        data: eiInfo
    })
}

// 查询单条维护记录全部数据
export const recordqueryall = (eiInfo) => {
    return req({
        url: '/maintain/record/query/all',
        method: 'post',
        data: eiInfo
    })
}

// 查询一个故障的详细信息
export const faultquerysingle = (eiInfo) => {
    return req({
        url: '/fault/query/single',
        method: 'post',
        data: eiInfo
    })
}

// 创建精密维护记录
export const maintaincreatenew = (formData) => {
    return req({
        url: '/maintain/record/create/new',
        method: 'post',
        transformRequest: [function (data, headers) {
            // 去除post请求默认的Content-Type
            delete headers.post['Content-Type']
            return data
        }],
        data: formData
    })
}

// 维护完成后保存记录
export const recordupdaterecord = (formData) => {
    return req({
        url: '/maintain/record/update/record',
        method: 'post',
        transformRequest: [function (data, headers) {
            // 去除post请求默认的Content-Type
            delete headers.post['Content-Type']
            return data
        }],
        data: formData
    })
}

// 删除维护记录
export const deleterecord = (eiInfo) => {
    return req({
        url: '/maintain/delete/record',
        method: 'post',
        data: eiInfo
    })
}

// 维护完成后保存记录
export const updaterecord = (formData) => {
    return req({
        url: '/maintain/update/record',
        method: 'post',
        transformRequest: [function (data, headers) {

            // 去除post请求默认的Content-Type
            delete headers.post['Content-Type']
            return data
        }],
        data: formData
    })
}

// 查询部分维护记录信息
export const querypart = (eiInfo) => {
    return req({
        url: '/maintain/record/query/part',
        method: 'post',
        data: eiInfo
    })
}

// 查询精密维护模板信息
export const queryinfo = (eiInfo) => {
    return req({
        url: '/maintain/item/query/info',
        method: 'post',
        data: eiInfo
    })
}
// 修改一个精密维护模板
export const maintainitemupdate = (eiInfo) => {
    return req({
        url: '/maintain/item/update',
        method: 'post',
        data: eiInfo
    })
}

// 新增一个精密维护模板
export const maintainitemadd = (eiInfo) => {
    return req({
        url: '/maintain/item/add',
        method: 'post',
        data: eiInfo
    })
}
// 删除一个精密维护模板
export const maintainitemdelete = (eiInfo) => {
    return req({
        url: '/maintain/item/delete',
        method: 'post',
        data: eiInfo
    })
}

// 查询登录用户的待办点检
export const recordtobedone = (eiInfo) => {
    return req({
        url: '/user/to/be/done',
        method: 'post',
        data: eiInfo
    })
}

// 查询设备的典型故障
export const querytypical = (eiInfo) => {
    return req({
        url: '/fault/query/typical',
        method: 'post',
        data: eiInfo
    })
}
// 查询设备的所有故障记录清单
export const faultqueryall = (eiInfo) => {
    return req({
        url: '/fault/query/all',
        method: 'post',
        data: eiInfo
    })
}

// 新增一个故障记录
export const faultaddrecord = (formData) => {
    return req({
        url: '/fault/add/record',
        method: 'post',
        transformRequest: [function (data, headers) {
            // 去除post请求默认的Content-Type
            delete headers.post['Content-Type']
            return data
        }],
        data: formData
    })
}

// 修改一个故障记录
export const faultupdaterecord = (formData) => {
    return req({
        url: '/fault/update/record',
        method: 'post',
        transformRequest: [function (data, headers) {
            // 去除post请求默认的Content-Type
            delete headers.post['Content-Type']
            return data
        }],
        data: formData
    })
}

// 删除故障记录
export const faultdeleterecord = (eiInfo) => {
    return req({
        url: '/fault/delete/record',
        method: 'post',
        data: eiInfo
    })
}
// 删除故障记录照片
export const faultdeleterecordpic = (eiInfo) => {
    return req({
        url: '/fault/delete/record/pic',
        method: 'post',
        data: eiInfo
    })
}

// 删除点检记录照片
export const checkrecorddeletepic = (eiInfo) => {
    return req({
        url: '/check/record/delete/pic',
        method: 'post',
        data: eiInfo
    })
}
// 查询用户列表
export const userinfopart = (eiInfo) => {
    return req({
        url: '/user/info/part',
        method: 'post',
        data: eiInfo
    })
}

// 查询公司列表
export const companylist = (eiInfo) => {
    return req({
        url: '/company/list',
        method: 'post',
        data: eiInfo
    })
}

// 查询部门
export const departmentlist = (eiInfo) => {
    return req({
        url: '/department/list',
        method: 'post',
        data: eiInfo
    })
}

// 查询组
export const grouplist = (eiInfo) => {
    return req({
        url: '/group/list',
        method: 'post',
        data: eiInfo
    })
}

// 查询单个用户的全部信息
export const userinfoall = (eiInfo) => {
    return req({
        url: '/user/info/all',
        method: 'post',
        data: eiInfo
    })
}

// 管理员修改用户
export const userupdate = (eiInfo) => {
    return req({
        url: '/user/update',
        method: 'post',
        data: eiInfo
    })
}

// 管理员新增新用户
export const userregister = (eiInfo) => {
    return req({
        url: '/user/register',
        method: 'post',
        data: eiInfo
    })
}