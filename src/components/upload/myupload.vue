<template>
    <view class="my-upload">
        <u-upload
            :fileList="fileUrlList"
            @afterRead="afterRead"
            @delete="deletePic"
            name="6"
            :multiple="multiple"
            :maxCount="maxCount"
            :width="width + 'rpx'"
            :height="height + 'rpx'"
            :accept="accept"
        >
            <slot name="content">
                <view class="content">
                    <view class="box">
                        <view class="icon">
                            <u-icon name="plus" color="#999"></u-icon>
                        </view>
                        <view class="up">点击上传</view>
                    </view>
                </view>
            </slot>
        </u-upload>
    </view>
</template>

<script>
// https://github.com/gpake/qiniu-wxapp-sdk 微信小程序下载地址
// https://www.npmjs.com/package/qiniu-js 网页版下载地址
import qiniuUploader from '@/utils/qiniu/qiniuUploader';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        // 上传的宽度
        width: {
            type: Number,
            default: 210,
        },
        // 上传的高度
        height: {
            type: Number,
            default: 140,
        },
        // 图片宽度
        imgWidth: {
            type: Number,
            default: 210,
        },
        // 图片高度
        imgHeight: {
            type: Number,
            default: 140,
        },
        //最大长传数量
        maxCount: {
            type: Number,
            default: 10,
        },
        //是否多选
        multiple: {
            type: Boolean,
            default: true,
        },
        //文件类型
        accept: {
            type: String,
            default: 'image',
        },
    },
    data() {
        // 这里存放数据
        return {
            fileUrlList: [],
            upToken: null,
        };
    },
    // 挂载方法
    mounted() {},
    // 方法集合
    methods: {
        // 删除图片
        deletePic(event) {
            this.fileUrlList.splice(event.index, 1);
        },
        // 新增图片
        async afterRead(event) {
            let lists = [].concat(event.file);
            let fileListLen = this.fileUrlList.length;
            lists.map((item) => {
                this.fileUrlList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中',
                });
            });
            for (let i = 0; i < lists.length; i++) {
                let result = await this.uploadFilePromise(lists[i]);
                let item = this.fileUrlList[fileListLen];
                this.fileUrlList.splice(
                    fileListLen,
                    1,
                    Object.assign(item, {
                        status: 'success',
                        message: '',
                        url: result,
                    })
                );
                fileListLen++;
            }
        },
        async uploadFilePromise(file) {
            if (!this.upToken) {
                await this.getfileUpToken();
            }
            return new Promise((resolve, reject) => {
                let key = new Date().getTime() + '_' + Math.floor(Math.random() * 1000000000000) + '.' + file.url.substring(file.url.lastIndexOf('.') + 1) // 文件资源名
                qiniuUploader.upload(
                    file.url,
                    (res) => {
                        resolve(res.imageURL);
                    },
                    (error) => {
                        console.log('error', error);
                    },
                    {
                        region: 'SCN',
                        domain: 'https://static.daoba.com',
                        uptoken: this.upToken,
                        key: key
                    }
                );
            });
        },
        //获取token
        async getfileUpToken() {
            try {
                let res = await this.$http.user.fileUpToken();
                if (res.status === 0) {
                    this.upToken = res.data.upToken;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {
        fileUrlList() {
            this.$emit('changeUpload', this.fileUrlList);
        },
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    onLoad(options) {},
    // 生命周期 - 页面展示（不可以访问DOM元素）
    onShow() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    onReady() {},
    onHide() {}, // 生命周期 - 监听页面隐藏
    onUnload() {}, // 生命周期 - 监听页面卸载
};
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    .box {
        width: 210rpx;
        height: 140rpx;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        border-radius: 10rpx;
        margin: 10rpx 0;
        .icon {
            margin-right: 10rpx;
        }
    }
}
</style>
