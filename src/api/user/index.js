import req from "@/utils/request"
// 用户登录
export const login = (alex) => {
    return req({
        url: '/user/login',
        method: 'post',
        data: alex
    })
}