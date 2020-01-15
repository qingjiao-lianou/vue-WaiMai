import axios from '@/ulits/myaxios.js'

//获取城市列表
export const getCityList = (type) => {
    return axios({
        url: '/v1/cities',
        params: { type }
    })
}

