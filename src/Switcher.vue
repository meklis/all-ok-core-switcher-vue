<template>
  <div id="app" style="margin-bottom: 15px">
    <Header v-on:set-ip="setDeviceIp($event)"  v-bind:loaded-dev-ip="deviceIp"  v-bind:err-message="errMessage" v-bind:modules-loading-list="modulesLoadingList"/>
    <DevSysBlock   v-bind:sys-info="systemInfo"/>
    <Menu v-bind:sys-info="systemInfo" />
    <router-view v-bind:sys-info="systemInfo"/>
  </div>
</template>
<style src="./switcher.css">
</style>
<script>
import Header from './components/Header'
import DevSysBlock from './components/DevSysBlock'
import Menu from "./components/Menu";
import ServerApi from "./modules/server-api";
import Vue from 'vue';

export default {
  name: 'App',
  data: function() {
    return {
      deviceIp: "",
      systemInfo: null,
      errMessage: "",
      modulesLoadingList: [],
    }
  },
  props: {
    apiUrl: String,
    token: String,
  },
  components: {
    Menu,
    DevSysBlock,
    Header,
  },
  methods: {
    setDeviceIp: function (ip) {
      console.log("New deviceIP setted: "+ip);
      this.deviceIp = ip;
      this.systemInfo = null;
      this.proccessDevice();
    },
    reloadDevice: function () {
      this.systemInfo = null;
      this.proccessDevice();
    },
    proccessDevice: function() {
      this.$Api.setDevIp(this.deviceIp);
      this.$Api.getDeviceInfo(resp => {
        this.systemInfo = resp.data;
        this.systemInfo.ip = this.deviceIp;
        this.errMessage = "";
      }).catch(err => {
        if (typeof err.response.data.error.type !== 'undefined' && err.response.data.error.type === 'RESOURCE_NOT_FOUND') {
          this.errMessage = "Device with IP "+this.deviceIp+" not found";
        } else if (typeof err.response.data.error.type !== 'undefined' && err.response.data.error.type === 'SERVER_ERROR' && err.response.data.error.description.indexOf("Request timeout") !== -1) {
          this.errMessage = "Device with IP "+this.deviceIp+" not responded by SNMP";
        } else {
          this.errMessage = "Unknown error with API";
        }

        this.systemInfo = null;
      });
    },
    getIpFromQuery() {
      console.log(this.$route);
        if (typeof  this.$route.query.ip !== 'undefined') {
          return this.$route.query.ip;
        }
        return  "";
    }
  },
  computed: {
    loadInProccess: function () {
       return this.modulesLoadingList.length !== 0
    },
  },
  created() {
    if(typeof this.$ApiConfiguration === 'undefined') {
      alert("Api configuration not setted!!!");
      new Error("Api configuration not setted");
    }
    let config = this.$ApiConfiguration;
    Vue.prototype.$Api = new ServerApi(config.baseUrl, config.token);
    this.modulesLoadingList = this.$Api.getInProccessMethods();
    this.deviceIp = this.getIpFromQuery();
    if(this.deviceIp !== "") {
      this.setDeviceIp(this.deviceIp);
    }
  },
  watch: {
    deviceIp: function (n) {
        let route = this.$route.name;
        if(route === 'home') {
          route = 'sys_info';
        }
        this.$router.push({
          name: route,
          query: {ip: n}
        }).catch( () => {
                  console.log("URL existed in history")
          }
        )
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
