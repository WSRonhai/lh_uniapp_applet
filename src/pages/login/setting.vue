<template>
    <view class="my-setting" :style="{ minHeight: windowHeight + 'px', paddingTop: navHeight + 'px' }">
        <topnavigationbar :iconBack="true" bgA="1" />
        <view class="content">
            <view class="logout" @click="logout"> 退出登录 </view>
            <view class="version">当前版本号：{{ version }}</view>
        </view>
    </view>
</template>

<script>
import { mapMutations } from 'vuex';
import { systemInfo } from '@/utils/mixins';
import { getRedictUrl } from '@/utils/storage';
import topnavigationbar from '@/components/public/topnavigationbar';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: { topnavigationbar },
    mixins: [systemInfo],
    data() {
        // 这里存放数据
        return {
            version: '',
        };
    },
    // 挂载方法
    mounted() {},
    // 方法集合
    methods: {
        ...mapMutations('user', ['USER_USER_CENTER', 'USER_USER_INFO', 'USER_REFRESH_TOKEN', 'USER_EXPIRES_IN', 'USER_ACCESS_TOKEN']),
        getRedictUrl,
        getVersion() {
            let that = this;
            // #ifdef MP-WEIXIN
            // 在需要获取微信版本号的地方调用该方法
            const accountInfo = uni.getAccountInfoSync();
            that.version = accountInfo.miniProgram.version;
            console.log('version', accountInfo.miniProgram.envVersion);
            // #endif
        },
        logout() {
            this.USER_USER_CENTER(null);
            this.USER_USER_INFO(null);
            this.USER_REFRESH_TOKEN(null);
            this.USER_EXPIRES_IN(null);
            this.USER_ACCESS_TOKEN(null);
            this.getRedictUrl();
        },
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    onLoad(options) {
        this.getSystemInfo();
        this.getVersion();
    },
    // 生命周期 - 页面展示（不可以访问DOM元素）
    onShow() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    onReady() {},
    onHide() {}, // 生命周期 - 监听页面隐藏
    onUnload() {}, // 生命周期 - 监听页面卸载
};
</script>
<style lang="scss" scoped>
.my-setting {
    width: 100%;

    box-sizing: border-box;
    background-color: #f1f1f1;
    .content {
        width: 100%;
        box-sizing: border-box;

        .logout {
            width: 100%;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            color: #333;
            font-weight: bold;
            font-size: 28rpx;
            background-color: $white;
            padding: 0 30rpx;
            box-sizing: border-box;
            margin-top: 30rpx;
        }
        .version {
            color: #999;
            font-size: 24rpx;
            text-align: center;
            height: 80rpx;
            line-height: 80rpx;
        }
    }
}
</style>
