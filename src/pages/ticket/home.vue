<template>
    <view class="join-match">
        <topnavigationbar :bgA="1" title="票务中心" :iconBack="false" />
        <view class="home" :style="{ paddingTop: navHeight + 'px', minHeight: windowHeight + 'px' }">
            <view style="padding-top: 300rpx">
                <u-empty text="功能建设中..." icon="https://static.daoba.com/match_world/empty/permission.png"> </u-empty>
            </view>
        </view>
        <homebottomtabbar :tabId="4" />
    </view>
</template>

<script>
import { systemInfo } from '@/utils/mixins';
import topnavigationbar from '@/components/public/topnavigationbar';
import homebottomtabbar from '@/components/public/homebottomtabbar';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: { topnavigationbar, homebottomtabbar },
    mixins: [systemInfo],
    data() {
        // 这里存放数据
        return {};
    },
    // 挂载方法
    mounted() {},
    // 方法集合
    methods: {
        //获取数据方法
        async gethotelList() {
            try {
                if (res.status == 0) {
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
    },
    // 生命周期 - 页面展示（不可以访问DOM元素）
    onShow() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    onReady() {},
    onHide() {}, // 生命周期 - 监听页面隐藏
    onUnload() {}, // 生命周期 - 监听页面卸载
};
</script>
<style lang="scss" scoped></style>
