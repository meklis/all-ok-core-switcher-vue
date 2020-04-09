Vue.config.productionTip = true;

/**
 * ROUTER configuration
 * @type {VueRouter|VueRouter|VueRouter|VueRouter}
 */
const router = new VueRouter({
    routes:   [
        {
            path: '/switcher/ports_info',
            component: SwitcherPorts,
            props: true,
            name: 'ports_info',
        },

        {
            path: '*',
            component: SwitcherHome,
            props: true,
            name: 'home',
        },

        {
            path: '/switcher/sys_info',
            component: SwitcherSysInfo,
            props: true,
            name: 'sys_info',
        },

        {
            path: '/switcher/actions',
            component: SwitcherActions,
            props: true,
            name: 'actions',
        }
    ],
    linkActiveClass: 'active',
})
Vue.use(VueRouter)

var vm = new Vue({
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
