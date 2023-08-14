import mutual from '@/utils/util/mutual';
//本地存储
const getRedictUrl = function () {
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length - 2]; // 前一个页面
    setTimeout(() => {
        uni.navigateBack({
            success: function () {
                console.log(beforePage.options)
                beforePage.onLoad(beforePage.options); // 执行前一个页面的onLoad方法
            },
        });
    }, 600);
};
const setStorage = function (key, data) {
    try {
        uni.setStorageSync(key, data);
    } catch (e) {
        // error
    }
};
const getStorage = function (key) {
    try {
        const value = uni.getStorageSync(key);
        if (value) {
            return value;
        } else {
            return false;
        }
    } catch (e) {
        // error
    }
};
const removeStorage = function (key) {
    try {
        const value = uni.removeStorageSync(key);
        if (value) {
            console.log('removeStorage', value);
        }
    } catch (e) {
        // error
    }
};
export { getRedictUrl, setStorage, getStorage, removeStorage };
