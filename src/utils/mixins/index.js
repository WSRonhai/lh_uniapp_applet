import { mapState, mapMutations } from 'vuex';
//公共参数
export const systemInfo = {
    data: () => ({
        statusBarHeight: 0,
        navigationBarHeight: 0,
        navHeight: 0,
        windowHeight: 0, // 可使用窗口高度
        chatName: '',
    }),
    mounted() {
        this.setNavigationBar();
    },
    methods: {
        // 获取设备信息
        getSystemInfo() {
            this.statusBarHeight = getApp().globalData.statusBarHeight;
            this.navigationBarHeight = getApp().globalData.navigationBarHeight;
            this.windowHeight = uni.getSystemInfoSync().windowHeight;
            this.navHeight = getApp().globalData.navHeight;
            this.chatName = getApp().globalData.chatName;
            this.isLogin = getApp().globalData.isLogin;
        },
        // 获取设备信息
        setNavigationBar() {
            uni.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#ff0000',
                //动画的样式，可以给他去掉的
                animation: {
                    duration: 400,
                    timingFunc: '00ff0000',
                },
            });
        },
    },
};
//小程序分享
export const share = {
    data() {
        return {
            //设置默认的分享参数
            share: {
                title: '首页',
                path: '/pages/home/home',
                imageUrl: '',
                desc: '',
                content: '',
            },
        };
    },
    //#ifdef MP-WEIXIN
    onShareAppMessage(res) {
        return {
            title: this.title,
            imageUrl: this.imageUrl,
            desc: this.desc,
            content: this.content,
            path: this.path,
            success(res) {
                uni.showToast({
                    title: '分享成功',
                    icon: 'success',
                });
            },
            fail(res) {
                uni.showToast({
                    title: '分享失败',
                    icon: 'error',
                });
            },
        };
    },
    //#endif

    //#ifdef MP-WEIXIN
    onShareTimeline() {
        return {
            title: this.title,
            imageUrl: this.imageUrl,
            desc: this.desc,
            content: this.content,
            path: this.path,
            success(res) {
                uni.showToast({
                    title: '分享成功',
                    icon: 'success',
                });
            },
            fail(res) {
                uni.showToast({
                    title: '分享失败',
                    icon: 'error',
                });
            },
        };
    },
    //#endif
};
//页面滚动监听
export const scrollListener = {
    data() {
        return {};
    },
    methods: {
        ...mapMutations('match', ['MATCH_CHANGE_SCROLLTOP']),
    },
    created() {
        this.MATCH_CHANGE_SCROLLTOP(0);
    },
    beforeDestroy() {
        uni.$off('onPageScroll');
    },
    computed: {
        // ...mapState('match', ['scrollTop']),
    },
    onPageScroll(res) {
        this.MATCH_CHANGE_SCROLLTOP(res.scrollTop);
    },
};
