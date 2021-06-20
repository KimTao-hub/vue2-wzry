import axios from 'axios'

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

export default http