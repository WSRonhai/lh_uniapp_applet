import { setStorage, getStorage, removeStorage } from '@/utils/storage/';
const state = {
    userCenter: getStorage('userCenter') || null,
    userInfo: getStorage('userInfo') || null,
    refreshToken: getStorage('refreshToken') || null,
    expiresIn: getStorage('expiresIn') || null,
    accessToken: getStorage('accessToken') || null,
};

const getters = {
    userInfo: (state) => state.userInfo,
    refreshToken: (state) => state.refreshToken,
    expiresIn: (state) => state.expiresIn,
    accessToken: (state) => state.accessToken,
    userCenter: (state) => state.userCenter,
};

const actions = {};

const mutations = {
    USER_USER_CENTER(state, data) {
        state.userCenter = data;
        setStorage('userCenter', state.userCenter);
    },
    USER_USER_INFO(state, data) {
        state.userInfo = data;
        setStorage('userInfo', state.userInfo);
    },
    USER_REFRESH_TOKEN(state, data) {
        state.refreshToken = data;
        setStorage('refreshToken', state.refreshToken);
    },
    USER_EXPIRES_IN(state, data) {
        state.expiresIn = data;
        setStorage('expiresIn', state.expiresIn);
    },
    USER_ACCESS_TOKEN(state, data) {
        state.accessToken = data;
        setStorage('accessToken', state.accessToken);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
