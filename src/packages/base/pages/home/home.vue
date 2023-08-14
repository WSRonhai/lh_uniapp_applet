<template>
    <view class="rank">
        <topnavigationbar :bgA="1" title="排行榜" />
        <view class="home" :style="{ minHeight: windowHeight + 'px', paddingTop: navHeight + 'px' }">
            <view class="tabs">
                <u-tabs
                    size="large"
                    lineColor="#FFFFFF"
                    :inactiveStyle="{
                        color: '#FFFFFF',
                    }"
                    text=""
                    lineWidth="60"
                    :activeStyle="{
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                    }"
                    :current="tabIndex"
                    keyName="name"
                    :list="tabList"
                    @change="changeTab"
                >
                </u-tabs>
            </view>
            <!-- 筛选 -->
            <view class="select">
                <scroll-view scroll-x="true" class="year-x" enable-flex style="flex-direction: row">
                    <view class="year-list" :style="{ width: yearList.length * 140 + 60 + 'rpx' }">
                        <view class="year-left">
                            <view>⁣⁣⁣⁣　</view>
                            <view class="line"></view>
                            <view class="dot"></view>
                        </view>
                        <view
                            class="year-item"
                            v-for="(item, index) in yearList"
                            :key="index"
                            @click="handleYear(item, index)"
                            :style="{ fontWeight: index == yearIndex ? 'bold' : '' }"
                        >
                            <view>{{ item.name }}</view>
                            <view class="line"></view>
                            <view class="dot" :class="yearIndex == index ? 'active' : ''"></view>
                        </view>
                        <view class="year-right">
                            <view>⁣⁣⁣⁣　</view>
                            <view class="line"></view>
                            <view class="dot"></view>
                        </view>
                    </view>
                </scroll-view>
                <view class="screen">
                    <view class="left">
                        <view class="select-item">
                            <view @click="matchShow = true" class="year">
                                <view class="txt">{{ columns1[0][matchIndex].name }}</view>
                                <u-icon name="arrow-up" size="24rpx" style="display: inline-block; margin-right: -10rpx" v-if="matchShow"></u-icon>
                                <u-icon name="arrow-down" size="24rpx" style="display: inline-block; margin-right: -10rpx" v-else></u-icon>
                            </view>
                        </view>
                        <view class="select-item">
                            <view @click="cityShow = true" class="year">
                                <view class="txt">{{ columns2[0][cityIndex].areaName }}</view>
                                <u-icon name="arrow-up" size="24rpx" style="display: inline-block; margin-right: -10rpx" v-if="cityShow"></u-icon>
                                <u-icon name="arrow-down" size="24rpx" style="display: inline-block; margin-right: -10rpx" v-else></u-icon>
                            </view>
                        </view>
                    </view>
                    <view class="right">
                        <u-input
                            placeholder="搜索关键字"
                            prefixIcon="search"
                            prefixIconStyle="font-size: 12px;color: #666666"
                            placeholderStyle="color: #666666"
                            v-model="keywords"
                            shape="circle"
                            fontSize="12px"
                            confirmType="search"
                            border="none"
                        >
                            <template slot="suffix">
                                <view @click="handleSearch" class="search">搜索</view>
                            </template>
                        </u-input>
                    </view>
                </view>
            </view>
            <u-picker :show="matchShow" :columns="columns1" @confirm="matchPicket" defaultIndex="[5]" keyName="name" @cancel="matchShow = false">
            </u-picker>
            <u-picker :show="cityShow" :columns="columns2" @confirm="cityPicket" defaultIndex="[5]" keyName="areaName" @cancel="cityShow = false">
            </u-picker>
            <view class="home" :style="{ minHeight: windowHeight + 'px' }">
                <!-- 运动员榜 -->
                <view v-if="tabIndex == 0" class="player">
                    <template v-if="playerList.length > 0">
                        <scroll-view scroll-x="true" scroll-y="false" class="scroll-x">
                            <view class="row title">
                                <view class="col-1">排名</view>
                                <view class="col-2">运动员</view>
                                <!-- <view class="col-3">机构</view> -->
                                <view class="col-4">籍贯</view>
                                <view class="col-5">胜/负场(PK)</view>
                                <view class="col-6">胜率</view>
                                <view class="col-7">总积分</view>
                            </view>
                            <view
                                class="row"
                                v-for="(item, index) in playerList"
                                :key="index"
                                :style="{ backgroundColor: index % 2 == 0 ? '#EEEEEE' : 'white' }"
                                @click="playerDetail(item, index)"
                            >
                                <view class="col-1">
                                    <!-- <image :src="getIcon(index)" v-if="index < 3" mode="scaleToFill" /> -->
                                    <span class="name">{{ index + 1 }}</span>
                                </view>
                                <view class="col-2">
                                    <image class="avatar" :src="item.image" mode="scaleToFill" />
                                    <view class="name">{{ item.name }}</view>
                                </view>
                                <!-- <view class="col-3">{{ item.unitName }}</view> -->
                                <view class="col-4">{{ item.areaName }}</view>
                                <view class="col-5">{{ item.winNum }}/{{ item.lostNum }}</view>
                                <view class="col-6">{{ getWinLost(item) }}%</view>
                                <view class="col-7">{{ item.score }}</view>
                            </view>
                        </scroll-view>
                    </template>
                    <view v-else>
                        <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"> </u-empty>
                    </view>
                </view>
                <!-- 机构榜 -->
                <view v-if="tabIndex == 1" class="agency">
                    <template v-if="agencyList.length > 0">
                        <scroll-view scroll-x="true" scroll-y="false" class="scroll-x">
                            <view class="row title">
                                <view class="col-1">排名</view>
                                <view class="col-2">机构</view>
                                <view class="col-3">类型</view>
                                <view class="col-4">
                                    <image src="../../static/image/jin.png" mode="scaleToFill" />
                                </view>
                                <view class="col-5">
                                    <image src="../../static/image/yin.png" mode="scaleToFill" />
                                </view>
                                <view class="col-6">
                                    <image src="../../static/image/tong.png" mode="scaleToFill" />
                                </view>
                                <view class="col-7"> 总积分 </view>
                            </view>

                            <view
                                class="row"
                                v-for="(item, index) in agencyList"
                                :key="index"
                                :style="{ backgroundColor: index % 2 == 0 ? '#EEEEEE' : 'white' }"
                                @click="angencyDetail(item, index)"
                            >
                                <view class="col-1">
                                    {{ index + 1 }}
                                </view>
                                <view class="col-2">
                                    <image class="avatar" :src="item.unitlogo" mode="scaleToFill" />
                                    <view class="name">{{ item.unitName }}</view>
                                </view>
                                <view class="col-3">{{ type[item.unitType] }}</view>
                                <view class="col-4">{{ item.gold }}</view>
                                <view class="col-5">{{ item.silver }}</view>
                                <view class="col-6">{{ item.bronze }}</view>
                                <view class="col-7">{{ item.score }}</view>
                            </view>
                        </scroll-view>
                    </template>
                    <view v-else>
                        <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"> </u-empty>
                    </view>
                </view>
                <view style="padding-bottom: 50rpx" v-if="agencyList.length > 0 || playerList.length > 0">
                    <u-loadmore :status="loadStatus" :loading-text="loadingText" :loadmore-text="loadmoreText" :nomore-text="nomoreText" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { systemInfo } from '@/utils/mixins';
import { getlaterYear } from '@/utils/date';
import topnavigationbar from '@/components/public/topnavigationbar';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: { topnavigationbar },
    mixins: [systemInfo],
    data() {
        // 这里存放数据
        return {
            tabIndex: 0,
            tabList: [
                { id: 1, name: '运动员' },
                { id: 2, name: '机构' },
            ],
            columns1: [],
            columns2: [],
            programAll: [],
            yearList: [],
            yearIndex: 0,
            cityList: [],
            keywords: '',
            matchIndex: 0,
            cityIndex: 0,
            matchShow: false,
            cityShow: false,
            rankBgList: [
                { index: 0, src: '../../static/image/1.png' },
                { index: 1, src: '../../static/image/2.png' },
                { index: 2, src: '../../static/image/3.png' },
            ],
            tabIndex: 0,
            playerParams: {
                pageNum: 1,
                pageSize: 20,
                agencyId: -1,
                year: -1,
                programId: 1,
                name: -1,
                province: -1,
            },
            agencyParams: {
                pageNum: 1,
                pageSize: 20,
                agencyId: -1,
                year: -1,
                programId: 1,
                name: -1,
                province: -1,
                type: -1,
            },
            playerList: [], //运动员数据
            agencyList: [], //机构数据
            loadStatus: 'loadmore',
            total: 0, //当前数量
            loadingText: '加载中',
            loadmoreText: '上拉加载更多',
            nomoreText: '没有更多',
            type: {
                CLUB: '俱乐部',
                ASSOCIATION: '协会',
                SCHOOL: '学校',
                ENTERPRISE: '企业',
                INSTITUTION: '事业单位',
                GOVERNMENT: '政府机关',
            },
            placeholder: '运动员姓名',
        };
    },
    // 挂载方法
    mounted() {},
    // 方法集合
    methods: {
        getlaterYear,
        ///运动员详情
        playerDetail(item, index) {
            item.programName = this.columns1[0][this.matchIndex].name;
            item.programId = this.columns1[0][this.matchIndex].id;
            item.rank = index + 1;
            let params = JSON.stringify(item);
            let detail = encodeURIComponent(params);
            uni.navigateTo({
                url: `/packages/rank/pages/player/detail/home?detail=${detail}`,
            });
        },
        ///机构详情
        angencyDetail(item) {
            // return;
            item.programName = this.columns1[0][this.matchIndex].name;
            item.programId = this.columns1[0][this.matchIndex].id;
            let params = JSON.stringify(item);
            let detail = encodeURIComponent(params);
            uni.navigateTo({
                url: `/packages/rank/pages/agency/detail/home?detail=${detail}`,
            });
        },
        //选择年份
        handleYear(item, index) {
            this.yearIndex = index;
            if (this.tabIndex == 0) {
                this.playerList = [];
                this.playerParams.year = item.id;
                this.playerParams.province = -1;
                this.playerParams.pageNum = 1;
                this.getPlayerRankList();
            } else {
                this.agencyList = [];
                this.agencyParams.year = item.id;
                this.agencyParams.province = -1;
                this.agencyParams.pageNum = 1;
                this.getAgencyRankList();
            }
        },
        //切换tab
        changeTab(item) {
            this.yearIndex = 0;
            this.cityIndex = 0;
            this.matchIndex = 0;
            this.keywords = '';
            let index = this.tabList.findIndex((ele) => {
                return ele.id == item.id;
            });
            this.tabIndex = index;
            this.total = 0;
            if (index == 0) {
                this.placeholder = '运动员姓名';
                this.playerParams = {
                    pageNum: 1,
                    pageSize: 20,
                    agencyId: -1,
                    year: -1,
                    programId: 1,
                    name: -1,
                    province: -1,
                };
                this.playerList = [];
                this.getPlayerRankList();
            }
            if (index == 1) {
                this.placeholder = '机构名称';
                this.agencyParams = {
                    pageNum: 1,
                    pageSize: 20,
                    agencyId: -1,
                    year: -1,
                    programId: 1,
                    name: -1,
                    province: -1,
                    type: -1,
                };
                this.agencyList = [];
                this.getAgencyRankList();
            }
        },
        //选择赛事项目
        matchPicket(columns) {
            this.keywords = '';
            this.matchIndex = columns.indexs[0];
            let programId = columns.value[0].id;
            if (this.tabIndex == 0) {
                this.playerList = [];
                this.playerParams.programId = programId;
                this.getPlayerRankList();
            } else {
                this.agencyList = [];
                this.agencyParams.programId = programId;
                this.getAgencyRankList();
            }
            this.matchShow = false;
        },
        //选择城市
        cityPicket(columns) {
            this.keywords = '';
            this.cityIndex = columns.indexs[0];
            let province = columns.value[0].areaCode;
            if (this.tabIndex == 0) {
                this.playerList = [];
                this.playerParams.province = province;
                this.getPlayerRankList();
            } else {
                this.agencyList = [];
                this.agencyParams.province = province;
                this.getAgencyRankList();
            }
            this.cityShow = false;
        },
        //搜索字段
        handleSearch() {
            if (this.tabIndex == 0) {
                this.playerList = [];
                if (!this.keywords) {
                    this.playerParams.name = -1;
                } else {
                    this.playerParams.name = this.keywords;
                }
                this.playerParams.pageNum = 1;
                this.getPlayerRankList();
            } else {
                this.agencyList = [];
                if (!this.keywords) {
                    this.agencyParams.name = -1;
                } else {
                    this.agencyParams.name = this.keywords;
                }
                this.agencyParams.pageNum = 1;
                this.getAgencyRankList();
            }
        },

        //胜率
        getWinLost(item) {
            if (item.winNum === 0) {
                return 0;
            }
            let num = 0;
            num = (item.winNum / (item.winNum + item.lostNum)) * 100;
            return parseInt(num);
        },

        //前三名
        getIcon(index) {
            let src = '';
            this.rankBgList.forEach((rank) => {
                if (rank.index == index) {
                    src = rank.src;
                }
            });
            return src;
        },
        //运动员数据
        async getPlayerRankList() {
            try {
                this.loadStatus = 'loading';
                this.isloading = true;
                let res = await this.$http.rank.findPlayerRankList(this.playerParams);
                if (res.status == 0) {
                    this.total = res.total;
                    this.loadStatus = 'loadmore';
                    this.isloading = false;
                    //上拉更多合并
                    if (this.playerList.length > 0) {
                        this.playerList = [...this.playerList, ...res.data];
                    } else {
                        this.playerList = res.data;
                    }
                } else {
                }
            } catch (error) {
                console.log('getPlayerRankList', error);
            }
        },
        //机构数据
        async getAgencyRankList() {
            try {
                this.loadStatus = 'loading';
                this.isloading = true;
                let res = await this.$http.rank.findAgencyRankList(this.agencyParams);
                if (res.status == 0) {
                    this.total = res.total;
                    this.loadStatus = 'loadmore';
                    this.isloading = false;
                    //上拉更多合并
                    if (this.agencyList.length > 0) {
                        this.agencyList = [...this.agencyList, ...res.data];
                    } else {
                        this.agencyList = res.data;
                    }
                } else {
                }
            } catch (error) {
                console.log('getAgencyRankList', error);
            }
        },
        //所有赛事项目
        async getprogramAll() {
            try {
                let res = await this.$http.match.programAll();
                if (res.status == 0) {
                    this.programAll = res.data;
                    this.columns1.push(res.data);
                } else {
                }
            } catch (error) {
                console.log('error', error);
            }
        },
        //获取地址省份
        async areaInfoProvince() {
            try {
                let res = await this.$http.match.areaInfoProvince(100000);
                if (res.status == 0) {
                    this.cityList = res.data;
                    this.cityList.unshift({
                        areaCode: -1,
                        areaName: '地区',
                    });
                    this.columns2.push(this.cityList);
                } else {
                }
            } catch (error) {
                console.log('error', error);
            }
        },
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    onLoad(options) {
        this.getSystemInfo();
        this.getPlayerRankList();
        this.getprogramAll();
        this.areaInfoProvince();
        this.yearList = this.getlaterYear();
        this.yearList.unshift({
            id: -1,
            name: '全部',
            value: -1,
        });
    },
    // 生命周期 - 页面展示（不可以访问DOM元素）
    onShow() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    onReady() {},
    onHide() {}, // 生命周期 - 监听页面隐藏
    // 生命周期 - 上拉加载更多
    //下拉加载更多
    onReachBottom() {
        if (this.tabIndex == 0) {
            if (this.playerParams.pageNum * this.playerParams.pageSize >= this.total) {
                this.loadStatus = 'nomore';
                return;
            }
            if (this.isloading) return;

            //此处判断，上锁，防止重复请求
            if (!this.isloading) {
                this.playerParams.pageNum += 1;
                this.getPlayerRankList();
            }
        } else {
            if (this.agencyParams.pageNum * this.agencyParams.pageSize >= this.total) {
                this.loadStatus = 'nomore';
                return;
            }
            if (this.isloading) return;

            //此处判断，上锁，防止重复请求
            if (!this.isloading) {
                this.agencyParams.pageNum += 1;
                this.getAgencyRankList();
            }
        }
    },
    // 生命周期 - 下拉刷新数据
    //onPullDownRefresh() {
    //},
    onUnload() {}, // 生命周期 - 监听页面卸载
};
</script>
<style lang="scss" scoped>
.home {
    box-sizing: border-box;
    .tabs {
        background-color: $red;
        color: #fff;
        padding-bottom: 8rpx;
        box-sizing: border-box;
    }
    .year-x {
        white-space: nowrap;
    }
    .select {
        background-color: #f1f1f1;
        .year-list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10rpx 30rpx 0;
            box-sizing: border-box;
            color: #333;
            padding-bottom: 36rpx;
            font-size: 26rpx;
            .line {
                height: 1rpx;
                width: 100%;
                background-color: #cdcdcd;
            }
            .year-left {
                width: 30rpx;
                height: 70rpx;
                line-height: 70rpx;
                position: relative;
                box-sizing: border-box;
                .dot {
                    width: 8rpx;
                    height: 8rpx;
                    background-color: #cdcdcd;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -4rpx;
                    left: -4rpx;
                    transform: translateX(-50%);
                    box-sizing: border-box;
                    z-index: 9999;
                }
            }
            .year-right {
                width: 30rpx;
                height: 70rpx;
                line-height: 70rpx;
                position: relative;
                box-sizing: border-box;
                .dot {
                    width: 8rpx;
                    height: 8rpx;
                    background-color: #cdcdcd;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -4rpx;
                    right: -4rpx;
                    transform: translateX(-50%);
                    box-sizing: border-box;
                    z-index: 9999;
                }
            }
            .year-item {
                width: 140rpx;
                height: 70rpx;
                box-sizing: border-box;
                text-align: center;
                line-height: 70rpx;
                position: relative;
                .dot {
                    width: 12rpx;
                    height: 12rpx;
                    border: 1rpx solid #cdcdcd;
                    background-color: white;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -6rpx;
                    left: 50%;
                    transform: translateX(-50%);
                    box-sizing: border-box;
                }
                .active {
                    width: 20rpx;
                    height: 20rpx;
                    border: 1rpx solid $red;
                    background-color: $red;
                    box-sizing: border-box;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -10rpx;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }

        .screen {
            width: 100%;
            height: 110rpx;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;
            font-size: 24rpx;
            padding: 0 20rpx;
            box-sizing: border-box;
            padding-bottom: 20rpx;
            .left {
                width: 50%;
                height: 56rpx;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
                .select-item {
                    width: 160rpx;
                    height: 56rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 10rpx;
                    box-sizing: border-box;
                    .year {
                        width: 100%;
                        display: flex;
                        height: 56rpx;
                        justify-content: center;
                        align-items: center;
                        border-radius: 28rpx;
                        background-color: #e4e4e4;
                        box-sizing: border-box;

                        .txt {
                            width: 60%;
                            margin-right: 4rpx;
                            margin-left: 8rpx;
                            box-sizing: border-box;
                            overflow: hidden; //多出的隐藏
                            text-overflow: ellipsis; //多出部分用...代替
                            white-space: nowrap; //不换行
                            text-align: center;
                            box-sizing: border-box;
                        }
                    }
                }
            }
            .right {
                width: 50%;
                margin-left: 10rpx;
                display: flex;
                height: 56rpx;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                background-color: #e4e4e4;
                border-radius: 28rpx;
                position: relative;
                padding-left: 20rpx;
                .search {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: #c40e00;
                    color: #fff;
                    width: 100rpx;
                    height: 50rpx;
                    line-height: 50rpx;
                    text-align: center;
                    border-radius: 28rpx;
                    margin-top: -1px;
                    z-index: 9999;
                }
            }
        }
    }
    //运动员榜
    .player {
        .scroll-x {
            .row {
                // width: 1060rpx;
                height: 100rpx;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: nowrap;
                font-size: 24rpx;
                .col-1 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                    }
                }
                .col-2 {
                    width: 200rpx;
                    flex-shrink: 1;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .avatar {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-3 {
                    width: 300rpx;
                    flex-shrink: 1;
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .col-4 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-5 {
                    width: 160rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-6 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-7 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                }
            }
            .title {
                font-weight: bold;
            }
        }
    }
    //机构榜
    .agency {
        .scroll-x {
            .row {
                width: 900rpx;
                height: 100rpx;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: nowrap;
                font-size: 24rpx;
                .col-1 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                }
                .col-2 {
                    width: 300rpx;
                    flex-shrink: 1;
                    line-height: 100rpx;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    .avatar {
                        display: inline-block;
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                        margin-right: 8rpx;
                    }
                    .name {
                        width: 230rpx;
                        display: inline-block;
                    }
                }
                .col-3 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .col-4 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 39rpx;
                        height: 50rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-5 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 39rpx;
                        height: 50rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-6 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                    image {
                        width: 39rpx;
                        height: 50rpx;
                        border-radius: 4rpx;
                        margin-right: 8rpx;
                    }
                }
                .col-7 {
                    width: 100rpx;
                    flex-shrink: 1;
                    text-align: center;
                }
            }
            .title {
                font-weight: bold;
                .col-2 {
                    justify-content: center;
                }
            }
        }
    }
}
</style>
