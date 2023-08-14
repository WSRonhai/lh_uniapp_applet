<template>
    <view class="home-page">
        <view class="header-top" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="logo">
                <image class="img" src="https://static.daoba.com/match_world/logo.png" mode="scaleToFill" />
            </view>
            <view class="title">赛事一站式服务平台</view>
            <view class="title-eng">One-Stop Service Platform for Events</view>
            <view class="statistics">
                <view class="statistics-item">
                    <view class="num">{{ data.pkNum }}</view>
                    <view class="name">比赛场次</view>
                </view>
                <view class="line">
                    <u-line color="#ffffff" direction="col"></u-line>
                </view>
                <view class="statistics-item">
                    <view class="num">{{ data.joinNum }}</view>
                    <view class="name">参赛人次</view>
                </view>
                <view class="line">
                    <u-line color="#ffffff" direction="col"></u-line>
                </view>
                <view class="statistics-item">
                    <view class="num">{{ data.agencyNum }}</view>
                    <view class="name">入驻机构</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { systemInfo } from '@/utils/mixins';

export default {
    components: {},
    mixins: [systemInfo],
    data() {
        return {
            videoStatus: false,
            src1: 'https://static.daoba.com/newdaobavideo.mp4',
        };
    },
    computed: {},
    mounted() {},
    methods: {},
    watch: {},

    // 页面周期函数--监听页面加载
    onLoad() {
        this.getSystemInfo();
    },
    // 页面周期函数--监听页面初次渲染完成
    onReady() {},
    // 页面周期函数--监听页面显示(not-nvue)
    onShow() {},
    // 页面周期函数--监听页面隐藏
    onHide() {},
    // 页面周期函数--监听页面卸载
    onUnload() {},
    // 页面处理函数--监听用户下拉动作
    // onPullDownRefresh() { uni.stopPullDownRefresh(); },
    // 页面处理函数--监听用户上拉触底
    // onReachBottom() {},
    // 页面处理函数--监听页面滚动(not-nvue)
    // onPageScroll(event) {},
    // 页面处理函数--用户点击右上角分享
    // onShareAppMessage(options) {},
};
</script>

<style scoped lang="scss">
.home-page {
    width: 100%;
    .header-top {
        width: 100%;
        height: 560rpx;
        background-color: $red;
        background-image: url('https://static.daoba.com/match_world/homebg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
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
            font-size: 68rpx;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20rpx;
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
                    font-size: 36rpx;
                    font-weight: bold;
                }
                .name {
                    font-size: 24rpx;
                }
            }
            .line {
                width: 2rpx;
                height: 50rpx;
            }
        }
    }
}
</style>
