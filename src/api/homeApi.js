import axios from '@/ulits/myaxios.js'

//获取城市列表
export const getCityList = (type) => {
    return axios({
        url: '/v1/cities',
        params: { type }
    })
}

// 获取验证码
export const getAuthCode = () => {
    return axios({
        url: "/v1/captchas",
        method: 'post'
    })
}

// 获取商店列表
export const getShopList = (params) => {
    return axios({
        url: "/v1/pois",
        params 
    })
}

