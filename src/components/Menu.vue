<template>
    <div class="container-fluid" >
        <div class="row">
            <div class="col-sm-12 col-lg-12 col-xs-12 col-xl-12 col-md-12" >
                <ul class="nav nav-tabs tab"  role="tablist"  style="margin-top: 5px; margin-bottom: 0px; width: 100%">
                    <li class="nav-item " v-if="sysInfo === null">
                        <router-link :to="{path: '/switcher'}" class="nav-link " >Welcome</router-link>
                    </li>
                    <li class="nav-item  " v-if="sysInfo !== null">
                        <router-link :to="{path: '/switcher/sys_info', query: {ip: sysInfo.ip}}" class="nav-link" >System</router-link>
                    </li>
                    <li class="nav-item  "  v-if="sysInfo !== null && sysInfo.modules.indexOf('link_info') !== -1">
                        <router-link :to="{path: '/switcher/ports_info', query: {ip: sysInfo.ip}}" class="nav-link">Port info</router-link>
                    </li>
                    <li class="nav-item" v-if="sysInfo !== null">
                        <router-link :to="{path: '/switcher/actions', query: {ip: sysInfo.ip}}" class="nav-link">Actions</router-link>
                    </li>
                    <li class="ml-auto nav-item " v-if="sysInfo !== null"  >
                        <a href="#" @click="reload()" class="nav-link">Reload</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sysInfo: Object,
        },
        methods: {

            reload: function() {
                this.$router.go()
            }
        }
    }
</script>
