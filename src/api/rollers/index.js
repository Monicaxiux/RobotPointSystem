import req from "@/utils/request"
// 创建任务
export const insertGrindData = (alex) => {
    return req({
        url: '/AgvMain/insertAgvMainAndData',
        method: 'post',
        data: alex
    })
}