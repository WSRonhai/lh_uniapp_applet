<template>
    <view class="course">
        <topnavigationbar :bgA="1" title="课程" :iconBack="true" :iconHome="true" />
        <view :style="{ paddingTop: navHeight + 'px', minHeight: windowHeight + 50 + 'px' }"> </view>
    </view>
</template>

<script>
import { systemInfo } from '@/utils/mixins';
import mutual from '@/utils/util/mutual/';

import topnavigationbar from '@/components/public/topnavigationbar';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: { topnavigationbar },
    mixins: [systemInfo],
    data() {
        // 这里存放数据
        return {};
    },
    // 挂载方法
    mounted() {},
    // 方法集合
    methods: {
        //获取酒店列表
        async gethotelList() {
            try {
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
