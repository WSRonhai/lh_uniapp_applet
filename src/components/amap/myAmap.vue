<template>
    <view>
        <view class="map_container">
            <map
                class="map"
                id="map"
                :width="100"
                :height="100"
                :longitude="longitude"
                :latitude="latitude"
                scale="14"
                show-location="true"
                :markers="markers"
                bindmarkertap="makertap"
            ></map>
        </view>
        <view class="map_text">
            <text class="h1">{{ textData.name }}</text>
            <text>{{ textData.desc }}</text>
        </view>
    </view>
</template>

<script>
import amapFile from '@/utils/amap/amap-wx.130.js';

export default {
    name: 'myAmap',
    components: {},
    data() {
        return {
            markers: [],
            latitude: '',
            longitude: '',
            textData: {
                name: '',
                desc: '',
            },
            iconPath: '../../../static/local.png',
            iconPathSelected: '../../../static/logo.png',
        };
    },
    mounted() {
        this.initAmapMap();
    },
    computed: {},
    methods: {
        initAmapMap() {
            var that = this;
            var myAmapFun = new amapFile.AMapWX({ key: 'd440977508ea18545858532e02a5f119' });
            myAmapFun.getRegeo({
                iconPathSelected: this.iconPathSelected, //选中 marker 图标的相对路径
                iconPath: this.iconPath, //款选中 marker 图标的相对路径
                iconWidth: 22,
                iconHeight: 32,
                success: function (data) {
                    let arr = [
                        {
                            id: data[0].id,
                            latitude: data[0].latitude,
                            longitude: data[0].longitude,
                            iconPath: data[0].iconPath,
                            width: data[0].width,
                            height: data[0].height,
                        },
                    ];
                    that.markers = arr;
                    that.latitude = data[0].latitude;
                    that.longitude = data[0].longitude;
                    that.textData.name = data[0].name;
                    that.textData.desc = data[0].desc;
                },
                fail: function (info) {
                    uni.showModal({ title: info.errMsg });
                },
            });
        },
        showMarkerInfo(data, i) {
            this.textData.name = data[i].name;
            this.textData.desc = data[i].address;
        },
        changeMarkerColor(data, i) {
            var that = this;
            var markers = [];
            for (var j = 0; j < data.length; j++) {
                if (j == i) {
                    data[j].iconPath = this.iconPath;
                } else {
                    data[j].iconPath = this.iconPath;
                }
                markers.push(data[j]);
            }
            that.setData({
                markers: markers,
            });
        },
        makertap(e) {
            var id = e.markerId;
            this.showMarkerInfo(markersData, id);
            this.changeMarkerColor(markersData, id);
        },
    },
    watch: {},

    // 页面周期函数--监听页面加载
    onLoad() {},
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
.map_container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.map {
    width: 100%;
    height: 100%;
}

.map_text {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 80px;
    background: #fff;
    padding: 0 15px;
}
text {
    margin: 5px 0;
    display: block;
    font-size: 12px;
}
.h1 {
    margin: 15px 0;
    font-size: 15px;
}
</style>
