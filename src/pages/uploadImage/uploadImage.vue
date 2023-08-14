<template>
	<view>
		<picPro v-if="showUpload" :hidden="true" :width="150" :height="height" :src="upImage" @picpro='picPro'></picPro>
	</view>
</template>

<script>
	import picPro from './picPro.vue'
	export default {
		data() {
			return {
				height: null,
				showUpload: false,
				upImage: null,
				valueName: null,
				type:null,
				cardId:''
			}
		},
		components: {
			picPro
		},
		onLoad(option) {
			this.height = option.height;
			this.valueName = option.valueName
			this.type = option.type
			this.cardId = option.cardId
			if (option.upImage) {
				this.showUpload = true
				this.upImage = option.upImage
			} else {
				this.init();
			}
		},
		methods: {
			init() {
				const that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: function(res) {
						that.showUpload = true;
						that.upImage = res.tempFilePaths[0];
					},
					fail() {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			//返回图片路径
			picPro(val) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.setData({
					imageSrc: val,
					valueName: this.valueName
				})
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
