// 生成报名ID
export async function createPayOrder(orderId, openid, that) {
	try {
		console.log("订单ID", orderId);
		let payParams = await that.$http.match.otherPay({orderId: orderId, openid: openid})
		return new Promise((resolve, reject) => {
			if (payParams.status === 0) {
				console.log("payParams", payParams);
				resolve(payParams.data)
			} else {
				uni.showToast({
					icon: 'error',
					title: payParams.msg
				})
				reject(false)
			}
		})
	} catch (e) {
		//TODO handle the exception
	}
}
//调用微信支付接口
export function onPayment(params) {
	return new Promise((reslove, reject) => {
		wx.requestPayment({
			timeStamp: params.timeStamp,
			nonceStr: params.nonceStr,
			package: params.package,
			signType: params.signType,
			paySign: params.paySign,
			success(res) {
				uni.showToast({
					title: '支付成功',
					icon: 'success',
					duration: 500
				});
				reslove(true)
			},
			fail(res) {
				uni.showToast({
					title: '支付失败',
					icon: 'error',
					duration: 500
				});
				reject(false)
			}
		})
	})

}
