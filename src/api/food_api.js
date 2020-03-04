import axios from '@/ulits/myaxios.js'

// 获取详细地址
export const getAddress = (geohash) => {
    return axios({
        url: `v2/pois/${geohash}`
    })
};

// 获取食品分类列表
export const getFoodCataList = () => {
    return axios({
        url: '/v2/index_entry'
    })
};

// 获取商铺列表
export const getShopList = (params) => {
    return axios({
        url: '/shopping/restaurants',
        params
    })
};

// 获取商店分类列表
export const getShopCate = (params) => {
    return axios({
        url: "/shopping/v2/restaurant/category",
        params 
    })
}