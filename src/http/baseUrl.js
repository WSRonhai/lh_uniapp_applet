// 区分环境 ,HbuilderX编辑运行时dev开发环境，发行后自动时生成环境
let baseUrl = {
    env: 'development', // 环境配置 生产环境：production，开发环境：development
    apiVersion: '/v1/services',
    // prefix: '/app-api',
    // baseUrl: process.env.VUE_APP_BASE_URL,
    // baseUrl: 'https://app.matchn.cn',
    baseUrl: 'http://192.168.2.6:90',
    // 图片上传地址
    // baseImgURL: process.env.VUE_APP_BASE_URL + '/match/file/upload',
};

export default baseUrl;
