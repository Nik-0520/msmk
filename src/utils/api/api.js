import {Request} from '@/utils/serve.js'

const getBanner = (data)=>Request({
    url:'/api/banner',
    method:'get',
    data:data,
    headers:{
        DeviceType:'H5'
    }
})

const cartList = (data)=>Request({
    url:'/api/recommend/appIndex',
    method:'get',
    data:data,
})

const getIndexDetail = (data)=>Request({
    url:`/api/teacher/${data}`,
    method:'get',
    data:data,
})

const setCollect = (data)=>Request({
    url:`/api/teacher/collect/${data}`,
    method:'get',
    data:data,
})

const getCourseInfo = (data)=>Request({
    url:`/api/courseInfo/basis_id=${data}`,
    method:'get',
    data:data,
})

const delCollect = (data)=>Request({ //取消收藏
    url:`/api/collect/cancel/${data.id}/${data.type}`, 
    method:'put',
    // data:data,
})
const getCollect = (data)=>Request({ //添加收藏
    url:`/api/collect`, //收藏
    method:'post',
    data:data,
})

const getCourseBasis = (data)=>Request({
    url:`/api/courseBasis`,
    method:'get',
    params:data,
})
const getCourseClassify = (data)=>Request({
    url:`/api/courseClassify`,
    method:'get',
    data:data,
})
const getSmsCode = (data)=>Request({
    url:`/api/smsCode`,
    method:'post',
    data:data,
})
const SmsLogin = (data)=>Request({
    url:`/api/login`,
    method:'post',
    data:data,
})
const setPass = (data)=>Request({
    url:`/api/password`,
    method:'post',
    data:data,
})
const GetuserInfo = (data)=>Request({ //获取用户数据
    url:`/api/getUCenterInfo`,
    method:'get',
    data:data,
})
const GetInfo = (data)=>Request({ //获取个人中心数据
    url:`/api/userInfo`,
    method:'get',
    data:data,
})
const editUser = (data)=>Request({ //获取个人中心数据
    url:`/api/user`,
    method:'Put',
    data:data,
})
const getCaty = (data)=>Request({ //获取个人中心数据
    url:`/api/sonArea/${data}`,
    method:'get',
    data:data,
})
const avatar = (data)=>Request({ //获取个人中心数据
    url:`/api/public/img`,
    method:'post',
    data:data,
})
const getCollectAll = (data)=>Request({ //我的关注
    url:`/api/collect`,
    method:'get',
    params:data,
})
const putCollect = (data)=>Request({ //我的关注取消关注
    url:`/api/collect/cancel/${data.id}/${data.type}`,
    method:'put',
    data:data,
})
const myStudy = (data)=>Request({ //我的学习
    url:`/api/myStudy/${data}`,
    method:'get',
    data:data,
})
const myrili = (data)=>Request({ //查看当天课程内容
    url:`/api/study/live/${data}`,
    method:'get',
    data:data,
})
const myrlistudy = (data)=>Request({ //查看当月的学习日历
    url:`/api/study/schedule?date=${data}`,
    method:'get',
    data:data,
})
const getRoom = (data)=>Request({ //我查看当天课程内容
    url:`/api/oto/getLiveRoomCode/${data}/0`,
    method:'get',
    data:data,
})
const getRoomCode = (data)=>Request({ //我查看当天课程内容
    url:`/api/getPcRoomCode/course_id=${data.id}/chapter_id=${data.chapterID}`,
    method:'get',
    data:data,
})

export {
    getBanner,
    cartList,
    getIndexDetail,
    getCourseInfo,
    getCourseBasis,
    getSmsCode,
    getCourseClassify,
    SmsLogin,
    setPass,
    GetuserInfo,
    GetInfo,
    editUser,
    getCaty,
    avatar,
    setCollect,
    getCollect,
    delCollect,
    getCollectAll,
    putCollect,
    myStudy,
    myrili,
    myrlistudy,
    getRoom,
    getRoomCode
}