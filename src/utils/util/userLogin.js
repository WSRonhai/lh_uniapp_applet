import mutual from '@/utils/util/mutual';
import { getRedictUrl, setStorage, removeStorage, getStorage } from '@/utils/storage';
import { getUserProfile, userinfo, centerMain } from '@/http/module/user.js';
import store from '@/store';
//用户登录
export const login = function () {
    mutual.showLoading('登录中');
    let data = {
        grant_type: 'wechat',
        client_id: 'applets',
        client_secret: '123456',
        wechat_type: 'applets_match_world',
        // wechat_type: 'appletsJlp',
        encryptedData: '',
        iv: '',
        code: '',
    };
    let login = wx.login();
    let getUser = wx.getUserProfile({
        desc: '用于完善会员资料',
        lang: 'zh_CN',
    });
    Promise.all([login, getUser]).then((res) => {
        data.code = res[0].code;
        data.encryptedData = res[1].encryptedData;
        data.iv = res[1].iv;
        try {
            Promise.all([getUserProfile(data)]).then((resul) => {
                let res = resul[0];
                if (res.status == 0) {
                    var timestamp = parseInt(new Date().getTime() / 1000) + res.data.expires_in;
                    store.commit('user/USER_ACCESS_TOKEN', res.data.access_token);
                    store.commit('user/USER_USER_INFO', res.data);
                    store.commit('user/USER_REFRESH_TOKEN', res.data.refresh_token);
                    store.commit('user/USER_EXPIRES_IN', timestamp);
                    if (res.data.isBind) {
                        Promise.all([userinfo(), centerMain()]).then((result) => {
                            if (result[0].status == 0 && result[0].status == 0) {
                                let userCenter = { ...result[0].data, ...result[1].data };
                                mutual.hideLoading();
                                mutual.showToast('登录成功');
                                store.commit('user/USER_USER_CENTER', userCenter);
                                return true;
                            }
                        });
                        getRedictUrl();
                    } else {
                        uni.navigateTo({
                            url: '/pages/login/bindPhone',
                        });
                    }
                } else {
                    store.commit('user/USER_USER_INFO', null);
                    store.commit('user/USER_REFRESH_TOKEN', null);
                    store.commit('user/USER_EXPIRES_IN', null);
                    store.commit('user/USER_ACCESS_TOKEN', null);
                    store.commit('user/USER_USER_CENTER', null);
                    mutual.showToast('登录失败');
                }
            });
        } catch (error) {
            mutual.showToast('登录失败');
            console.log('error', error);
        }
    });
};
