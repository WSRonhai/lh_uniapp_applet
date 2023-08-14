<template>
    <view class="my-backtop">
        <u-back-top
            :scroll-top="scrollTop"
            icon="arrow-up"
            :top="500"
            :iconStyle="iconStyle"
            :bottom="150"
            :right="10"
            :customStyle="bgcustomStyle"
        ></u-back-top>
    </view>
</template>

<script>
import { systemInfo, scrollListener } from '@/utils/mixins';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        top: {
            type: Number,
            default: 500,
        },
        bottom: {
            type: Number,
            default: 150,
        },
        right: {
            type: Number,
            default: 10,
        },
    },
    mixins: [systemInfo, scrollListener],
    data() {
        // 这里存放数据
        return {
            iconStyle: {
                fontSize: '32rpx',
                color: '#ffffff',
            },
            bgcustomStyle: {
                backgroundColor: '#be1e28',
            },
        };
    },
    // 挂载方法
    mounted() {},
    // 方法集合
    methods: {},
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    onLoad(options) {
        this.getSystemInfo();
    },
    // 生命周期 - 页面展示（不可以访问DOM元素）
    onShow() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    onReady() {},
    onHide() {}, // 生命周期 - 监听页面隐藏
    // 生命周期 - 上拉加载更多
    //onReachBottom() {
    //  if (this.hotelParasm.pageNum * this.hotelParasm.pageSize >= this.total) {
    //  this.loadStatus = 'nomore' return;
    //  if (this.isloading) return;
    //if (this.isloading) return;
    //此处判断，上锁，防止重复请求
    //  if (!this.isloading) {
    //      this.hotelParasm.pageNum += 1
    //          this.gethotelList();
    //      }
    //},
    // 生命周期 - 下拉刷新数据
    //onPullDownRefresh() {
    //},
    onUnload() {}, // 生命周期 - 监听页面卸载
};
</script>
<style lang="scss" scoped></style>
