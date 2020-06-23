import Vue from 'vue'
import VueRouter from 'vue-router'

import Switcher from './Switcher.vue'
import DevPortsBlock from "./components/pages/ports";
import DevActionsBlock from "./components/pages/actions";
import Home from "./components/pages/home";
import SysInfo from "./components/pages/sysinfo";

Vue.config.productionTip = true;


const router = new VueRouter({
    routes:   [
                {
                    path: '/switcher/ports_info',
                    component: DevPortsBlock,
                    props: true,
                    name: 'ports_info',
                },

                {
                    path: '*',
                    component: Home,
                    props: true,
                    name: 'home',
                },

                {
                    path: '/switcher/sys_info',
                    component: SysInfo,
                    props: true,
                    name: 'sys_info',
                },

                {
                    path: '/switcher/actions',
                    component: DevActionsBlock,
                    props: true,
                    name: 'actions',
                }
    ],
    linkActiveClass: 'active',
})
Vue.use(VueRouter)

var allOkSwitcher = new Vue({
    router,
    render: h => h(Switcher),
    methods: {
        setApiConfig: function (apiUrl, token) {
            Vue.prototype.$ApiConfiguration = {
                baseUrl: apiUrl,
                token: token,
            };
            return this;
        }
    },
});


allOkSwitcher.setApiConfig("https://apiv2.golden.net.ua/v2", 'ab8fad89-6ffa-432c-9486-d05702dcaffe');
allOkSwitcher.$mount('#app');

