import baseUrl from './baseUrl';
import mutual from '@/utils/util/mutual';
let header = {
    //   Authorization: authorize,
    'Content-Type': 'application/json; charset=UTF-8',
    // 'content-type': method === 'POST' ? 'application/json' : 'application/x-www-form-urlencoded', // 默认值,
};
export default {
    baseURL: baseUrl.baseUrl,
    header: header,
    method: 'GET',
    dataType: 'json',

    // #ifndef MP-ALIPAY
    responseType: 'text',
    // #endif

    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: { auth: true }, // 全局自定义参数默认值

    // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
    timeout: 20000,
    // #endif

    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif

    // #ifdef H5
    // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
    withCredentials: false,
    // #endif

    // #ifdef APP-PLUS
    firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
    // #endif

    // 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
    validateStatus: (statusCode) => {
        if (statusCode == 400) mutual.showToast('参数错误');
        if (statusCode == 404) mutual.showToast('资源不存在');
        if (statusCode >= 500) mutual.showToast('服务器错误');
        // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300;
    },
};
