<template>
    <div class="container-fluid" style="padding-top: 10px;" >
        <div class="row">
            <div class="col" >

            </div>
        </div>
        <div class="row" v-if="!loadInProccess">
            <div class="col-xs-12 col-sm-12 col-lg-6 col-md-6 col-xl-6" >
                <h3>System information</h3>
                <table style="width: 100%">
                    <tr  v-for="item of sysBlocks" :key="item.name">
                        <th class="blk-name">{{item.name}}</th>
                        <td class="blk-value">{{item.value}}</td>
                    </tr>
                </table>
            </div>
            <div class="col-xs-12 col-sm-12 col-lg-6 col-md-6 col-xl-6" v-if="modulesInfo !== null">
                <h3>Supported modules</h3>
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-lg-3 col-md-6 col-xl-3" style="color: darkgray; font-weight: bold; font-size: 12pt; text-decoration: underline" v-for="(d, num) in modulesInfo" :key="num">{{capitalizeFLetter(d.name)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    table {
        margin: 3px;
    }

</style>

<script>
    export default {
        props: {
            sysInfo: Object,
        },
        data: function() {
            return {
                sysBlocks: [],
                modulesInfo: null,
                loadInProccess: false,
            }
        },
        watch: {
            sysInfo(n) {
                this.loadInProccess = true;
                if(n === null) {
                    this.sysBlocks = [];
                    return
                }
                this.loadSysInfo(n);
                this.loadModulesInfo();
                this.loadInProccess = false;
            }
        },
        methods: {
            loadSysInfo: function(n) {
                var sysBlocks = [];
                this.$Api.enableWaiting();
                sysBlocks.push({name: 'Model', value: n.name});
                this.$Api.getDeviceStoreInfo(resp => {
                    let storeInf = resp.data;
                    sysBlocks.push({name: 'IP', value: storeInf.ip});
                    sysBlocks.push({name: 'MAC', value: storeInf.mac});
                    sysBlocks.push({name: 'Address', value: storeInf.addr + ', под. ' + storeInf.entrance});
                    sysBlocks.push({name: 'Uplink port', value: storeInf.uplink_port});
                })
                this.$Api.getAction('system', {}, resp => {
                    sysBlocks.push({name: 'Uptime', value: resp.data.uptime});
                    sysBlocks.push({name: 'Contact', value: resp.data.contact});
                    sysBlocks.push({name: 'Name', value: resp.data.name});
                    sysBlocks.push({name: 'Description', value: resp.data.descr});
                })
                this.$Api.waitResponses();
                this.sysBlocks = sysBlocks;
                console.log("sysInfo was changed in dev-sys-info component")
            },
            loadModulesInfo: function() {
                this.$Api.getDeviceModules(resp => {
                    this.modulesInfo = resp.data;
                })
            },
            capitalizeFLetter: function (string) {
                string = string.replace('_', ' ').replace('_', ' ');
                return string[0].toUpperCase() + string.slice(1);
            },
        },
        created() {
            this.loadInProccess = true;
            if(this.sysInfo !== null) {
                this.loadSysInfo(this.sysInfo);
                this.loadModulesInfo();
                this.loadInProccess = false;
            }
        },

    }
</script>

