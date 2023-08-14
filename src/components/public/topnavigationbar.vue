<template>
    <view
        class="nav"
        :style="{
            height: navHeight + 'px',
            backgroundColor:
                bgA == 0
                    ? 'rgba(' + bgR + ',' + bgG + ',' + bgB + ',' + (scrollTopHeight - 20) / navHeight + ')'
                    : 'rgba(' + bgR + ',' + bgG + ',' + bgB + ',' + bgA + ')',
        }"
    >
        <view class="status" :style="{ height: statusBarHeight + 'px' }"></view>
        <view class="content" :style="{ height: navigationBarHeight + 'px' }">
            <view class="icon" :style="{ color: iconColor }" v-if="iconBack || iconHome">
                <view class="left">
                    <span class="iconfont icon-left back" style="margin-right: 10rpx" @click="back" v-if="iconBack"></span>
                    <span class="iconfont icon-home back" @click="home" v-if="iconHome"></span>
                </view>
            </view>
            <view class="search">
                <view class="ipt" v-if="search">
                    <view class="local" v-if="local" @click="localPage">
                        <text class="txt">{{ cityName == '全部地区' ? '地区' : cityName }}</text>
                        <text class="icon iconfont icon-shaixuan"></text>
                    </view>
                    <u--input
                        v-model="searchText"
                        placeholder="输入关键字搜索"
                        shape="circle"
                        suffixIcon="search"
                        placeholderStyle="color: #CDCDCD"
                        suffixIconStyle="font-size: 20px;color: #CDCDCD"
                        disableDefaultPadding="true"
                        border="none"
                        color="#333333"
                        fontSize="12px"
                        confirmType="search"
                        @confirm="handleSearch"
                        @blur="handleSearch"
                        @focus="goSearchPage"
                    ></u--input>
                </view>
                <!-- <view v-else class="title-name" :style="{ color: nameColor, fontSize: nameSize,fontWeight: 'bold' }">
                    {{ title }}
                </view> -->
            </view>
            <view v-if="!search" class="title-name" :style="{ color: nameColor, fontSize: nameSize, fontWeight: 'bold' }">
                {{ title }}
            </view>
        </view>
    </view>
</template>

<script>
import { mapState } from 'vuex';
import { systemInfo } from '@/utils/mixins';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    mixins: [systemInfo],
    props: {
        backUrl: {
            type: String,
            default: null,
        },
        cityName: {
            type: String,
            default: '全部地区',
        },
        search: {
            type: Boolean,
            default: false,
        },
        local: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        iconHome: {
            type: Boolean,
            default: false,
        },
        iconBack: {
            type: Boolean,
            default: true,
        },
        iconColor: {
            type: String,
            default: 'white',
        },
        nameColor: {
            type: String,
            default: 'white',
        },
        nameSize: {
            type: String,
            default: '32rpx',
        },
        //背景颜色，需要传入rgba值
        bgR: {
            type: Number,
            default: 190,
        },
        bgG: {
            type: Number,
            default: 30,
        },
        bgB: {
            type: Number,
            default: 40,
        },
        bgA: {
            type: Number,
            default: 0,
        },
        //跳转搜索页面
        searchPage: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        // 这里存放数据
        return {
            searchText: '',
            scrollTopHeight: 0,
        };
    },
    // 监听属性 类似于data概念
    computed: {
        // ...mapState('match', ['scrollTop']),
    },
    // 监控data中的数据变化
    watch: {
        scrollTop(oldValue, newValue) {
            this.scrollTopHeight = newValue;
        },
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    mounted() {
        this.getSystemInfo();
        this.setNavigationBar();
    },
    // 方法集合
    methods: {
        //选择定位页
        localPage() {
            uni.navigateTo({
                url: `/components/match/localpage?backUrl=${this.backUrl}`,
            });
        },
        handleSearch() {
            if (!!this.searchText) {
                this.$emit('search', this.searchText);
            }
        },
        goSearchPage() {
            if (this.searchPage) {
                uni.navigateTo({
                    url: `/packages/match/pages/search/home`,
                });
            } else {
                this.handleSearch();
            }
        },
        //返回首页
        home() {
            uni.switchTab({
                url: '/pages/home/home',
            });
        },
        //返回上一页
        back() {
            let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
            // let curRoute = routes[routes.length - 1].route; //获取当前页面路由
            if (routes.length == 1) {
                uni.switchTab({
                    url: '/pages/home/home',
                });
            } else {
                uni.navigateBack({
                    delta: 1,
                });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.nav {
    width: 100%;
    position: fixed;
    z-index: 9999;
    // background-image: url('https://static.daoba.com//479269189730.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    top: 0;
    .content {
        width: 100%;
        height: 100%;
        font-size: 28rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        .icon {
            max-width: 174rpx;
            padding-left: 20rpx;
            height: 66rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 30px;
            z-index: 999;
            .left {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-top: 4rpx;
                font-weight: 500;
                .back {
                    width: 50rpx;
                    height: 50rpx;
                    font-size: 42rpx;
                }
            }
        }
        .search {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            box-sizing: border-box;
            color: #fff;

            .ipt {
                width: 70%;
                height: 70%;
                padding: 0 20rpx;
                display: flex;
                justify-content: flex-start;
                background-color: white;
                align-items: center;
                border-radius: 40rpx;
                box-sizing: border-box;
                .local {
                    max-width: 110rpx;
                    color: $black;
                    margin-right: 10rpx;
                    font-size: 24rpx;
                    font-weight: bold;
                    padding-right: 20rpx;
                    color: #666;
                    border-right: 1rpx solid #cdcdcd;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    box-sizing: border-box;
                    .txt {
                        max-width: 72rpx;
                        overflow: hidden; //多出的隐藏
                        text-overflow: ellipsis; //多出部分用...代替
                        white-space: nowrap; //不换行
                        text-align: center;
                    }
                    .icon {
                        width: 30rpx;
                        font-size: 14rpx;
                        height: 36rpx;
                        margin-left: -14rpx;
                    }
                }
            }
        }
        .title-name {
            position: absolute;
            width: 100%;
            font-size: 36rpx;
            font-weight: blod;
            box-sizing: border-box;
            text-align: center;
            z-index: 1;
        }
    }
}
</style>
