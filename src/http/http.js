import Request from 'luch-request'; // 使用npm
import config from './config';
import mutual from '../utils/util/mutual';
import { getUserProfile } from '@/http/module/user.js';
import store from '@/store';

const http = new Request(config);
let isRefreshing = false;
// 被挂起的请求数组
let refreshSubscribers = [];
// 刷新请求(refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据)
function onRrefreshed(token) {
    refreshSubscribers.map((cb) => cb(token));
}
// push所有请求到数组中
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

let refreshlogin = async function (refreshToken) {
    isRefreshing = true;
    let data = {
        grant_type: 'refresh_token',
        client_id: 'applets',
        client_secret: '123456',
        wechat_type: 'applets_match_world',
        refresh_token: refreshToken,
    };
    try {
        let res = await getUserProfile(data);
        if (res.status == 0) {
            isRefreshing = false;
            var timestamp = parseInt(new Date().getTime() / 1000) + res.data.expires_in;
            store.commit('user/USER_ACCESS_TOKEN', res.data.access_token);
            store.commit('user/USER_EXPIRES_IN', timestamp);
            store.commit('user/USER_REFRESH_TOKEN', res.data.refresh_token);
            let userInfo = store.getters['user/userInfo'];
            userInfo.access_token = res.data.access_token;
            userInfo.refresh_token = res.data.refresh_token;
            userInfo.expires_in = res.data.expires_in;
            userInfo.jti = res.data.jti;
            store.commit('user/USER_USER_INFO', userInfo);
            // 执行数组里的函数,重新发起被挂起的请求
            onRrefreshed(res.data.access_token);
            // 执行onRefreshed函数后清空数组中保存的请求
            refreshSubscribers = [];
            return true;
        } else {
            mutual.showToast('登录状态过期');
            store.commit('user/USER_ACCESS_TOKEN', null);
            store.commit('user/USER_REFRESH_TOKEN', null);
            setTimeout(() => {
                uni.navigateTo({
                    url: '/pages/login/index',
                });
            }, 1000);
            return false;
        }
    } catch (error) {
        console.log('error', error);
    }
};
/**
 * 在请求之前拦截
 */
http.interceptors.request.use(
    async (config) => {
        const {
            custom: { auth, isReturn },
        } = config;

        let accessToken = store.getters['user/accessToken'];
        let expiresIn = store.getters['user/expiresIn'];
        let refreshToken = store.getters['user/refreshToken'];
        //没有登录
        if (auth && !accessToken) {
            uni.navigateTo({
                url: '/pages/login/home',
            });
        }
        //没有绑定手机号码
        if (auth && accessToken && store.getters['user/userInfo'].isBind === 0 && !isReturn) {
            uni.navigateTo({
                url: '/pages/login/bindPhone',
            });
        }
        if (auth && accessToken) {
            //登录过期重新获取
            if (expiresIn - parseInt(new Date().getTime() / 1000) < 30) {
                if (!isRefreshing) {
                    refreshlogin(refreshToken, config);
                }
                // 把请求(token)=>{....}都push到一个数组中
                return new Promise((resolve, reject) => {
                    // (token) => {...}这个函数就是回调函数
                    subscribeTokenRefresh((accessToken) => {
                        // console.log('挂起请求');
                        config.header.Authorization = 'Bearer ' + accessToken;
                        //  将请求挂起
                        resolve(config);
                    });
                });
            } else {
                //token访问
                config.header = {
                    ...config.header,
                    Authorization: 'bearer ' + accessToken,
                };
            }
        }
        return config;
    },
    (error) => {
        // 可使用async await 做异步操作
        return Promise.reject(error);
    }
);

/**
 * 在请求之后拦截
 */
http.interceptors.response.use(
    (response) => {
        /* 对响应成功做点什么 可使用async await 做异步操作*/
        if (response.statusCode == 200) {
            // 服务端返回的状态码不等于200，则reject()
            return Promise.resolve(response.data);
        } else {
            // 服务端返回的状态码不等于200，则reject()
            return Promise.reject(response);
        }
    },
    (error) => {
        /*  对响应错误做点什么 （statusCode !== 200）*/
        return Promise.reject(error);
    }
);
export default http;
