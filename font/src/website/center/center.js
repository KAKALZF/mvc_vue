import 'core-js/es6/promise';
import axios from 'axios';
import Vue from 'vue';
import VRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../static/css/common.css';
import {mytips} from '@/module/tools';
import comboList from './combo/comboList.vue'

Vue.use(ElementUI);
Vue.use(VRouter);
Vue.config.productionTip = false;

Vue.component("combolist",comboList);
var app = new Vue({
    el: '#app',
    // components: {comboList},
    data() {
        return {
            restNum: 1,
            username: '涛涛',
            nav: ['login', 'basic'],
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            //控制导航页的页面跳转
            console.log("控制导航页的页面跳转")
            this.$router.push(keyPath);
            // console.log(key, keyPath);
        }
    }
})
