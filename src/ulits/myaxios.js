import axios from 'axios'
import { Toast } from 'vant';

axios.defaults.baseURL = "https://elm.cangdu.org"

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
        message: "加载中...",
        forbidClick: false,
        duration: 0
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Toast.clear()
    return response;
}, function (error) {
    // 对响应错误做点什么
    const { message } = error
    if (message === 'Network Error') {
        Toast('请求超时');
    }
    return Promise.reject(error);
});

export default axios



