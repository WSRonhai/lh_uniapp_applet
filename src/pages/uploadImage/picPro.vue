<template>
	<view>
		<scroll-view class='body' v-if="hiddenShow">
			<view 
			  class='flex-direction-column flex-justify-between height-100 width-100'
			  @touchmove="touchmove"
			  @touchend="touchend" 
			>
				<view class='bg_dark width-100' v-bind:style="{height:(windowHeight-(windowWidth-margin.left-margin.right)/ratio)/2+'px'}"></view>
				<view class='flex-direction-row main flex-justify-between' v-bind:style="{height:(windowWidth-margin.left-margin.right)/ratio+'px'}">
					<view class='bg_dark main_item' v-bind:style="{width:margin.left+'px'}"></view>
					<view class='inner relative width-100' id='showArea'>
						<image 
						  v-bind:style="{ width:img.width+'px', height:img.height+'px',left:img.left+'px',top:img.top+'px' }" 
						  class='absolute imahefkj' 
						  :src='src'
						></image>
						<canvas canvas-id='imgCanvas' class='absolute img_canvas height-100 width-100'/>
						<view class='absolute inner_item left_top'></view>
						<view class='absolute inner_item right_top'></view>
						<view class='absolute inner_item right_bottom'></view>
						<view class='absolute inner_item left_bottom'></view>
					</view>
					<view class='bg_dark main_item' v-bind:style='{width:margin.right+"px"}'></view>
				</view>
				<view class='bg_dark width-100 flex-direction-column flex-justify-end' v-bind:style='{height:(windowHeight-(windowWidth-margin.left-margin.right)/ratio)/2+"px"}'>
					<view class='flex-justify-around text_white text_bg'>
						<view @click='outputImg' data-type='1'><text>{{lang('重新上传')||'重新上传'}}</text></view>
						<view @click='getImg'><text>{{lang('选择图片')||'选择图片'}}</text></view>
					</view>
				</view>
				<view class='absolute width-100 height-100 bg_black'></view>
			</view>
		</scroll-view>
		<image :src="lingSrc" v-else></image>
	</view>
</template>

<script>
import store from '@/store'
import qiniuUploader from '@/utils/qiniu/qiniuUploader';
	export default {
		data() {
			return {
				upToken: null,
				windowWidth:0,
				windowHeight:0,
				// 可用区域body
				window: {
					width: 0,
					height: 0
				},
				// 原始图片信息
				originImg: {
					width: 0,
					height: 0
				},
				// 第一次图片缩放信息
				firstScaleImg: {
					width: 0,
					height: 0
				},
				// 截取区域信息
				interArea: {
					width: 0,
					height: 0
				},
				// 单手触摸位置
				touchLast: {
					x: 0,
					y: 0
				},
				// 滑动距离
				touchMove: {
					x: 0,
					y: 0
				},
				// 滑动离开时图片状态
				moveImgthat: {
					width: 0,
					height: 0,
					top: 0,
					left: 0,
				},
				// 双手触摸位置
				touchList: [{
					x: 0,
					y: 0
				}, {
					x: 0,
					y: 0
				}],
				// 图片缩放比例
				scale: 1,
				margin: {
					left: 15,
					right: 15,
					top: 200,
					bottom: 200,
				},
				touchRange: 8,
				img: {
					width: 100,
					height: 400,
					top: 0,
					left: 0,
				},
				canvas: {},
				ratio: 1,
				baseStyles:{
					width:347,
					height:490,
					left:0,
					top:-63
				},
				hiddenShow:null,
				lingSrc:'',
			};
		},
		mounted() {
			this.baseStyles.width = this.img.width+'px';
			this.baseStyles.height = this.img.height+'px';
			this.baseStyles.left = this.img.left+'px';
			this.baseStyles.top = this.img.top+'px';
			
			this.hiddenShow = this.hidden;
			this.initialize();
		},
		props: ['width', 'height', 'src', 'hidden'],
		methods: {
			//语言调用方法
			lang(val){
				return val
			},
			
			touchmove(e) {
				if (e.touches.length === 1) {
					this.singleSlip(e.touches[0])
				} else {
					this.doubleSlip(e.touches)
				};
			},
			touchend(e) {
				
				// console.log("touchend", e);
				const x = 0,
					y = 0;
				const that = this;
				that.touchLast = {
					x,
					y
				};
				that.touchMove = {
					x,
					y
				};
				that.touchList = [{
					x,
					y
				}, {
					x,
					y
				}];
				that.moveImgthat = this.img;
			},
			// 单手滑动操作
			singleSlip(e) {
				const {clientX: x,clientY: y}=e;
				const that = this;
				if (that.touchLast.x && that.touchLast.y) {
					that.touchMove = {
						x: x - that.touchLast.x,
						y: y - that.touchLast.y
					};
					that.touchLast = {
						x,
						y
					};
					const move = (_x = false, _y = false) => {
						const bottom = that.img.height + that.img.top;
						const right = that.img.width + that.img.left;
						const h = that.interArea.height;
						const w = that.interArea.width;
						const param = {};
						if (_x) {
							if (right > w && that.img.left < 0) {
								param.left = that.img.left + that.touchMove.x * 0.5
							} else if (right <= w && that.touchMove.x > 0) {
								param.left = that.img.left + that.touchMove.x * 0.5
							} else if (that.img.left >= 0 && that.touchMove.x < 0) {
								param.left = that.img.left + that.touchMove.x * 0.5
							}
						};
						if (_y) {
							if (bottom > h && that.img.top < 0) {
								param.top = that.img.top + that.touchMove.y * 0.5
							} else if (bottom <= h && that.touchMove.y > 0) {
								param.top = that.img.top + that.touchMove.y * 0.5
							} else if (that.img.top >= 0 && that.touchMove.y < 0) {
								param.top = that.img.top + that.touchMove.y * 0.5
							}
						};
						// console.log(param);
						that.setImgPos(param)
					};
					if (that.scale == 1) {
						if (that.img.width == that.interArea.width) {
							move(false, true)
						} else {
							move(true, false)
						}
					} else {
						move(true, true)
					}
				} else {
					that.touchLast = {
						x,
						y
					}
				}
			},
			// 双手缩放操作
			doubleSlip(e) {
				const that = this;
				const {
					clientX: x0,
					clientY: y0
				} = e[0];
				const {
					clientX: x1,
					clientY: y1
				} = e[1];
				if (that.touchList[0].x && that.touchList[0].y) {
					let changeScale = (Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) - Math.sqrt((that.touchList[1].x -
						that.touchList[0].x) * (that.touchList[1].x - that.touchList[0].x) + (that.touchList[1].y - that.touchList[
						0].y) * (that.touchList[1].y - that.touchList[0].y))) * 0.005;
					changeScale = changeScale >= 1.5 ? 1.5 : (changeScale <= -1 ? -1 : changeScale);
					that.scale = that.img.width / that.firstScaleImg.width < 1 ? 1 : (that.scale > 2.5 ? 2.5 : 1 + changeScale);
					let width = that.firstScaleImg.width * (that.scale - 1) + that.moveImgthat.width;
					width = width < that.firstScaleImg.width ? that.firstScaleImg.width : width;
					let height = that.firstScaleImg.height * (that.scale - 1) + that.moveImgthat.height;
					height = height < that.firstScaleImg.height ? that.firstScaleImg.height : height;
					let left = width * (1 - that.scale) / 8 + that.moveImgthat.left;
					left = left * (-1) > width - that.interArea.width ? that.interArea.width - width : left > 0 ? 0 : left;
					let top = height * (1 - that.scale) / 8 + that.moveImgthat.top;
					top = top * (-1) > height - that.interArea.height ? that.interArea.height - height : top > 0 ? 0 : top;
					const setImgObj = {
						width,
						height,
						left,
						top
					};
					that.setImgPos(setImgObj)
				} else {
					that.touchList = [{
						x: x0,
						y: y0
					}, {
						x: x1,
						y: y1
					}]
				}
			},
			// 获取可用区域宽高
			getScreenInfo() {
				const that = this;
				return new Promise((resolve, reject) => {
					wx.getSystemInfo({
						success: function(res) {
							const {windowHeight,windowWidth} = res;
							that.window = {windowHeight,windowWidth};
							that.windowHeight =that.window.windowHeight;
							that.windowWidth = that.window.windowWidth;
							resolve(res);
						},
					})
				})
			},
			setShowArea() {
				const that = this;
				const w = that.window.windowWidth - that.margin.left - that.margin.right;
				const h = (that.height / that.width) * w;
			},
			outputImg() {
				uni.navigateBack({
				    delta: 1
				});
			},
			getImgInfo(path) {
				return new Promise((resolve, reject) => {
					wx.getImageInfo({
						src: path,
						success(res) {
							// console.log(res);
							resolve(res);
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 设置图片
			setImgPos({width,height,top,left}) {
				width = width || this.img.width;
				height = height || this.img.height;
				top = top || this.img.top;
				left = left || this.img.left;
				top = top < 0 ? (top * (-1) <= height - this.interArea.height ? top : this.interArea.height - height) : 0;
				left = left < 0 ? (left * (-1) <= width - this.interArea.width ? left : this.interArea.width - width) : 0;
				this.img.width = width;
				this.img.height = height;
				this.img.top = top;
				this.img.left = left;
			},
			// 初始化图片位置大小
			initialize() {
				const that = this;
				const ratio = that.width / that.height;//比例为1
				this.getScreenInfo().then(res => {
					that.interArea = {
						width: res.windowWidth - that.margin.left - that.margin.right + 2,
						height: (res.windowWidth - that.margin.left - that.margin.right) / ratio
					};
					that.getImgInfo(that.src).then(imgInfo => {
						const {width,height} = imgInfo;//700,500
						const imgRatio = width / height;//0.7
						that.originImg = {width,height};
						that.ratio = ratio;
						if (imgRatio > ratio) {
							that.setImgPos({
								height: that.interArea.height,
								width: that.interArea.height * imgRatio
							})
						} else {
							that.setImgPos({
								height: that.interArea.width / imgRatio,
								width: that.interArea.width,
							})
						};
						that.firstScaleImg.width = that.img.width;
						that.firstScaleImg.height = that.img.height;
					});
				});
			},
			// 截图
			getImg() {
				const that = this;
				const canvas = wx.createCanvasContext('imgCanvas', this);
				const {width,height,left,top} = that.img;
				const saveImg = () => {
					wx.canvasToTempFilePath({//把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
						canvasId: "imgCanvas",
						fileType:'jpg',
						quality:0.4,
						// quality:1,
						success(res) {
							that.lingSrc = res.tempFilePath;
							uni.showLoading({
								title: '加载中',
								mask:true
							});
							that.uploadQiniu(that.lingSrc)
						},
						fail(err) {

						}
					}, that)
				};
				canvas.drawImage(that.src,left, top, width, height);
				canvas.draw(false, () => {
					saveImg()
				}, that)
			},
			async uploadQiniu(tempFilePaths){
				let url = await this.uploadFilePromise(tempFilePaths)
				store.commit('match/MATCH_CHANGE_QINIU_IMG', url)
				this.$emit('picpro',url);
			},
			async uploadFilePromise(file) {
				if (!this.upToken) {
					await this.getfileUpToken();
				}
				return new Promise((resolve, reject) => {
					let key = new Date().getTime() + '_' + Math.floor(Math.random() * 1000000000000) + '.' + file.substring(file.lastIndexOf('.') + 1) // 文件资源名
					qiniuUploader.upload(
						file,
						(res) => {
							resolve(res.imageURL);
						},
						(error) => {
							console.log('error', error);
						},
						{
							region: 'SCN',
							domain: 'https://static.daoba.com',
							key: key,
							uptoken: this.upToken,
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
		}
	}
</script>

<style>
.absolute {
	position: absolute;
}
/* 定位 */
.relative {
	position: relative;
}
.height-100 {
	height: 100%;
}
.width-100 {
	width: 100%;
}
.flex-justify-around {
	display: -webkit-flex;
	display: flex;
	justify-content: space-around;
}
.flex-direction-column {
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
}
.flex-justify-end {
	display: -webkit-flex;
	display: flex;
	justify-content: flex-end;
}

.flex-justify-between {
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
}
.flex-direction-row {
	display: -webkit-flex;
	display: flex;
	flex-direction: row;
}
	.body {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.text_white {
		color: white;
	}

	.main {}

	.bg_dark {
		background-color: rgba(0, 0, 0, 0.85)
	}

	.main_item {
		width: 15px;
	}

	.inner {
		outline: 3rpx solid white;
		background-color: rgba(0, 0, 0, 0.12);
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.5) inset;
	}

	.inner_item {
		width: 8px;
		height: 8px;
	}

	.inner_item.left_top {
		border-left: 3px solid white;
		border-top: 3px solid white;
		left: -3px;
		top: -3px;
	}

	.inner_item.right_top {
		border-right: 3px solid white;
		border-top: 3px solid white;
		right: -3px;
		top: -3px;
	}

	.inner_item.right_bottom {
		border-right: 3px solid white;
		border-bottom: 3px solid white;
		right: -3px;
		bottom: -3px;
	}

	.inner_item.left_bottom {
		border-left: 3px solid white;
		border-bottom: 3px solid white;
		left: -3px;
		bottom: -3px;
	}

	.img {
		z-index: -1;
	}

	.bg_black {
		background-color: black;
		z-index: -2;
	}

	.text_bg {
		padding-bottom: 2em;
		font-size: 0.9em;
	}

	.img_canvas {
		opacity: 0.5;
		visibility: hidden;
	}

	.newImg {
		z-index: 2
	}
	.imahefkj{
		z-index: -1;
	}
</style>
