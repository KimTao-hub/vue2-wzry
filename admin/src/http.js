import axios from 'axios'

import Vue from 'vue'
import router from './router'
//axios的作用：
//Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
//从浏览器中创建 XMLHttpRequests
// 从 node.js 创建 http 请求
// 支持 Promise API
// 拦截请求和响应
// 转换请求数据和响应数据
// 取消请求
// 自动转换 JSON 数据
// 客户端支持防御 XSRF

//创建一个实例
const http = axios.create({
    baseURL: ' http://localhost:3000/admin/api',
});

//拦截请求
http.interceptors.request.use(function (config) {
    //设置请求头部信息
    if(sessionStorage.token){
        config.headers.Authorization = "Bearer "+ sessionStorage.token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
//相应拦截器
http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    //用于错误处理
    //console.log(error.response);
    Vue.prototype.$message({
        type:'error',
        message:error.response.data.message
    })
    if(error.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(error);
  });

export default http