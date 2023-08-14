<template>
    <view class="my-center">
        <topnavigationbar :bgA="1" :iconHome="true" :iconBack="false" />
    </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { systemInfo } from '@/utils/mixins';
import mutual from '@/utils/util/mutual';
import getType from '@/utils/util/match';

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
    methods: {},
    // 监听属性 类似于data概念
    computed: {
        // ...mapGetters('user', ['userCenter']),
    },
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
<style lang="scss" scoped>
.my-center {
    width: 100%;
    box-sizing: border-box;
}
</style>
