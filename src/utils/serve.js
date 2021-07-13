import axios from 'axios'
import { Toast } from 'vant';

axios.interceptors.request.use(config=>{
    Toast.loading({
        message: '加载中...',
        duration: 3000
    });
    config.headers.Authorization = "Bearer" + localStorage.adminToken
    return config
},err=>{
    Promise.reject(err)
})

axios.interceptors.response.use(res=>{
    Toast.clear({
        clearAll: true
    })
    return res
},err=>{
    Promise.reject(err)
})

let Request = (params)=>{
    return new Promise((resolve,reject)=>{
        axios({
            ...params
        }).then(res =>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export { Request }