//交互处理
class Mutual {
    constructor() {
        this.requestCounter = 0; // 请求计数器
    }
    //提示消息
    showLoading(title = '加载中') {
        uni.showLoading({
            title,
            mask: true,
        });
    }
    hideLoading() {
        uni.hideLoading();
    }
    // 显示loading
    startLoad(title) {
        if (this.requestCounter === 0) {
            this.showLoading(title);
        }
        this.requestCounter++;
    }
    // 结束相关请求
    endLoad() {
        if (this.requestCounter > 0) {
            this.requestCounter--;
        }
        if (this.requestCounter === 0) {
            this.hideLoading();
        }
    }
    showToast(title = '提示消息', duration = 15) {
        uni.showToast({
            title: title,
            icon: 'none',
            duration: duration * 100,
        });
    }
    hideToast() {
        uni.hideToast();
    }
}

const mutual = new Mutual();
export default mutual;
