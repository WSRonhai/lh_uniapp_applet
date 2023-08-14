<template>
    <view class="login" :style="{ paddingTop: navHeight + 'px' }">
        <topnavigationbar title="授权登录" :iconBack="true" bgA="1" />
        <view class="bg" :style="{ height: windowHeight - navHeight + 'px' }">
            <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
                <view class="logo">
                    <image class="img" src="https://static.daoba.com/match_world/logo.png" mode="scaleToFill" />
                </view>
                <view class="title">赛事一站式服务平台</view>
                <view class="title-eng">One-Stop Service Platform for Events</view>
            </view>
            <view class="login-btn" @click="userLogin">
                <!-- <u-icon name="weixin-fill" color="#FFFFFF" size="34px" bold></u-icon> -->
                <text class="txt">快捷登录</text>
            </view>
            <image class="bg-img" src="https://static.daoba.com/match_world/bg_logo.png" mode="scaleToFill" />
        </view>
    </view>
</template>

<script>
import { systemInfo } from '@/utils/mixins';
import { login } from '@/utils/util/userLogin.js';
import topnavigationbar from '@/components/public/topnavigationbar';
export default {
    name: 'login',
    props: {},
    mixins: [systemInfo],
    components: { topnavigationbar },
    data() {
        return {
            fullHeight: 0,
            isLogin: false,
        };
    },
    created() {},
    computed: {},
    methods: {
        async userLogin() {
            if (!this.isLogin) {
                this.isLogin = true;
                let res = await login();
                if (res) {
                    this.isLogin = false;
                }
            }
        },
    },
    watch: {},

    // 组件周期函数--监听组件挂载完毕
    mounted() {
        this.getSystemInfo();
    },
    // 组件周期函数--监听组件数据更新之前
    beforeUpdate() {},
    // 组件周期函数--监听组件数据更新之后
    updated() {},
    // 组件周期函数--监听组件激活(显示)
    activated() {},
    // 组件周期函数--监听组件停用(隐藏)
    deactivated() {},
    // 组件周期函数--监听组件销毁之前
    beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100%;

    .bg {
        background-color: $red;
        position: relative;
        .bg-img {
            position: absolute;
            left: -300rpx;
            bottom: -150rpx;
            width: 836rpx;
            height: 836rpx;
            transform: rotate(20deg);
        }
        .header {
            width: 100%;
            height: 560rpx;
            background-color: $red;

            color: #ffffff;

            .logo {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 30rpx;
                .img {
                    width: 166rpx;
                    height: 166rpx;
                }
            }

            .title {
                font-size: 66rpx;
                font-weight: bold;
                text-align: center;
                margin-bottom: 30rpx;
            }
            .title-eng {
                font-size: 24rpx;
                font-weight: bold;
                text-align: center;
                margin-bottom: 60rpx;
            }
            .statistics {
                width: 600rpx;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .statistics-item {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;
                    .num {
                        font-size: 34rpx;
                        font-weight: bold;
                    }
                    .name {
                        font-size: 20rpx;
                    }
                }
                .line {
                    width: 2rpx;
                    height: 50rpx;
                }
            }
        }
        .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            .img {
                width: 160rpx;
                height: 160rpx;
                border-radius: 50%;
                text-align: center;
                margin-bottom: 50rpx;
            }
        }
        .title {
            font-size: 48rpx;
            font-weight: bold;
            text-align: center;
            margin-bottom: 80rpx;
        }
        .login-btn {
            width: 694rpx;
            height: 100rpx;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 60rpx;
            background-color: $red;
            border: 1px solid #fff;
            position: relative;
            z-index: 999;
            .txt {
                color: #fff;
                margin-left: 20rpx;
            }
        }
    }
}
</style>
