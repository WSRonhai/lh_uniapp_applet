import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import http from './http/index';
import store from './store';
import { share } from '@/utils/mixins';
Vue.use(uView);
Vue.mixin(share);
Vue.config.productionTip = false;
Vue.prototype.$http = http;
App.mpType = 'app';
Vue.prototype.$store = store;
import '@/static/css/iconfont.css';
const app = new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    store,
    ...App,
});
app.$mount();
