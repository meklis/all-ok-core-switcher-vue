<template>

    <div class="container-fluid"  >
        <form onsubmit="return false;">
            <div v-if="!showBlock">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-xl-12  d-none d-xs-none d-sm-none d-md-block  d-lg-block d-xl-block" >
                        <div align="center" class="info-page-block">
                            <h3>Switcher V2 <br><small>(Port info)</small></h3>
                            <h4>Waiting for device сhoosed</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="port-info-block" v-if="showBlock" >
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-xl-12  d-none d-xs-none d-sm-none d-md-block  d-lg-block d-xl-block" >
                        <div align="center" style=" padding-top: 100px;  padding-bottom: 100px; "  v-if="loadInProccess">
                            <h3>Info is loading, please wait...</h3>
                            <img src="assets/line.svg">
                        </div>
                        <div style="overflow-x: auto; margin-top: -1px" v-if="!loadInProccess">
                            <table class="  portsTable  " style="text-align: left; width: 100%" width="100%">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description<br><small>(device/DB)</small></th>
                                        <th>Link Info<br><small>(Admin/Oper)</small></th>
                                        <th v-if="modules.indexOf('vlans_by_port') !== -1">VLANS<br><small>(VlanName/ID)</small></th>
                                        <th v-if="modules.indexOf('counters')  !== -1">Counters<br><small>(IN/OUT)</small></th>
                                        <th v-if="modules.indexOf('errors')  !== -1 || modules.indexOf('rmon')  !== -1">Errors<br><small>(CRC/Coll/U/O/F/J/D)</small></th>
                                        <th v-if="modules.indexOf('fdb')  !== -1">FDB<br><small>(MAC/VlanID)</small></th>
                                        <th v-if="modules.indexOf('cable_diag')  !== -1">Cable diag</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, portNum) in ports" :key="portNum">
                                        <td> <a href="javascript:void(0);"  @click="reloadPort(portNum)" title="reload"><img src="assets/reload.png" height="22"></a> {{portNum}}  </td>
                                        <td>
                                            <Description v-bind:info="data.link_info" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                        <td>
                                            <LinkInfo v-bind:info="data.link_info" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                        <td v-if="modules.indexOf('vlans_by_port') !== -1">
                                            <VlanByPorts v-bind:info="data.vlans_by_port" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                        <td v-if="modules.indexOf('counters')  !== -1">
                                            <Counters v-bind:info="data.counters" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                        <td v-if="modules.indexOf('errors')  !== -1 || modules.indexOf('rmon')  !== -1">
                                            <Errors v-bind:errors="data.errors" v-bind:rmon="data.rmon" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                        <td v-if="modules.indexOf('fdb')  !== -1">
                                            <FDB v-bind:info="data.fdb" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                        <td v-if="modules.indexOf('cable_diag')  !== -1">
                                            <CableDiag v-bind:info="data.cable_diag" v-bind:port-num="portNum" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xs-12  col-md-12   d-xs-block d-sm-block d-md-none d-lg-none d-xl-none" >
                        <InfoIsLoading v-bind:load-in-proccess="loadInProccess"></InfoIsLoading>
                        <div v-if="!loadInProccess">
                            <div class="row" v-for="(data, portNum) in ports" :key="portNum">
                                <div class="col-sm-12 col-xs-12" style="margin-top: 5px">
                                    <button class="btn btn-block port-general-info" data-toggle="collapse" aria-expanded="false" v-bind:aria-controls="'#port-detailed-info-' + portNum" v-bind:data-target="'#port-detailed-info-' + portNum">
                                                <div style="display: inline-flex; float: left; padding: 5px;"># <b>{{portNum}}</b></div>
                                                <div style="display: inline-flex; float: left; text-align: left;  padding: 5px"><LinkInfo v-bind:info="data.link_info"/></div>

                                                <div data-toggle="none" style="display: inline-flex; float: right; text-align: right;  padding: 5px"><Description v-bind:info="data.link_info"/></div>

                                    </button><!--Port general info block -->
                                </div>
                                <div class="col-sm-12 col-xs-12">
                                   <!--Port detailed info block -->
                                    <div class="collapse port-detailed-info" :id="'port-detailed-info-' + portNum" >
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6">
                                                    <a href="javascript:void(0);"  @click="reloadPort(portNum)" title="reload">
                                                        <img src="assets/reload.png" height="22" />
                                                    </a>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6">
                                                Description
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <Description v-bind:info="data.link_info" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6">
                                                Link info
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <LinkInfo v-bind:info="data.link_info" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0" v-if="modules.indexOf('vlans_by_port') !== -1" >
                                        <div class="row" v-if="modules.indexOf('vlans_by_port') !== -1 " v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]">
                                            <div class="col-xs-6 col-sm-6">
                                                Vlan info
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <VlanByPorts v-bind:info="data.vlans_by_port" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0" v-if="modules.indexOf('counters') !== -1" >
                                        <div class="row" v-if="modules.indexOf('counters') !== -1">
                                            <div class="col-xs-6 col-sm-6">
                                                Counters <small>(in/out)</small>
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <Counters v-bind:info="data.counters" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0" v-if="modules.indexOf('errors')  !== -1 || modules.indexOf('rmon')  !== -1" >
                                        <div class="row" v-if="modules.indexOf('errors')  !== -1 || modules.indexOf('rmon')  !== -1">
                                            <div class="col-xs-6 col-sm-6">
                                                Errors <small>(CRC/Coll/U/O/F/J/D)</small>
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <Errors v-bind:errors="data.errors" v-bind:rmon="data.rmon" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0" v-if="modules.indexOf('fdb')  !== -1" >
                                        <div class="row" v-if="modules.indexOf('fdb')  !== -1">
                                            <div class="col-xs-6 col-sm-6">
                                               FDB
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <FDB v-bind:info="data.fdb" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                        <hr style="margin: 3px; padding: 0" v-if="modules.indexOf('cable_diag')  !== -1" >
                                        <div class="row" v-if="modules.indexOf('cable_diag')  !== -1" >
                                            <div class="col-xs-6 col-sm-6">
                                               Cable diag
                                            </div>
                                            <div class="col-xs-6 col-sm-6" >
                                                <CableDiag v-bind:info="data.cable_diag" v-bind:port-num="portNum" v-bind:reload-in-proccess="reloadOnePortInProccess[portNum]"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import LinkInfo from "./../portBlock/LinkInfo";
    import Description from "./../portBlock/Description";
    import VlanByPorts from "./../portBlock/VlanByPorts";
    import Counters from "./../portBlock/Counters";
    import Errors from "./../portBlock/Errors";
    import FDB from "./../portBlock/FDB";
    import CableDiag from "./../portBlock/CableDiag";
    import InfoIsLoading from "./../InfoIsLoading";
    export default {
        name: 'DevPortsBlock',
        props: {
            sysInfo: Object,
        },
        data: function() {
            return {
                showBlock: false,
                ports: {},
                modules: [],
                loadInProccess: false,
                portInfoModules: [
                    'link_info',
                    'vlans_by_port',
                    'counters',
                    'errors',
                    'rmon',
                    'fdb',
                    'cable_diag',
                ],
                reloadOnePortInProccess: {},
            }
        },
        watch: {
            sysInfo(n) {
                if(n !== null) {
                    this.showBlock = true;
                    this.startLoad();
                } else {
                    this.showBlock = false;
                }
            },
        },

        methods: {
            startLoad: function() {
                this.ports = [];
                this.modules = this.getPortModules(this.sysInfo);
                this.ports = this.preparePortsArray(this.sysInfo.ports);
                this.fillPortsFromAPI();
            },
            getPortModules: function (sysInfo) {
                var modules = [];
                this.portInfoModules.forEach(function (element) {
                    if(sysInfo.modules.indexOf(element) !== -1) {
                        modules.push(element)
                    }
                });
                return modules;
            },
            preparePortsArray: function (countPorts) {
                var portsBlock = {};
                for (var i = 1;i <= countPorts; i++) {
                    portsBlock[i] = {};
                    this.$set(this.reloadOnePortInProccess, i, false);
                    this.modules.forEach(el => {
                        portsBlock[i][el] = [];
                    })
                }
                return portsBlock;
            },
            fillPortsFromAPI: async function () {
                this.$Api.enableWaiting();
                this.loadInProccess = true;
                this.modules.forEach(module => {
                    this.$Api.getAction(module, {}, resp => {
                        resp.data.forEach(el => {
                            if( this.ports[el.port] !== undefined) {
                                this.ports[el.port][module].push(el);
                            }
                        });
                    }).catch(e => {
                        console.log("ERROR LOADING MODULE "+module);
                        console.log(e);
                    });
                });
                await this.$Api.waitResponses();
                this.$Api.disableWaiting();
                this.loadInProccess = false;
            },
             reloadPort: async function (portNum) {
                if( this.reloadOnePortInProccess[portNum]) {
                    return  true;
                }
                this.reloadOnePortInProccess[portNum] = true;
                this.$Api.enableWaiting();
                this.modules.forEach(module => {
                    if( this.ports[portNum] !== undefined) {
                        this.ports[portNum][module] = [];
                    }
                    this.$Api.getAction(module, {port: portNum}, resp => {
                        resp.data.forEach(el => {
                            if( this.ports[el.port] !== undefined) {
                                this.ports[el.port][module].push(el);
                            }
                        });
                    }).catch(e => {
                        console.log("ERROR LOADING MODULE "+module);
                        console.log(e);
                    });
                });
                await this.$Api.waitResponses();
                this.$Api.disableWaiting();
                this.reloadOnePortInProccess[portNum] = false;
            }
        },
        components: {
            VlanByPorts,
            LinkInfo,
            Description,
            Counters,
            Errors,
            FDB,
            CableDiag,
            InfoIsLoading
        },
        created() {
            if(this.sysInfo !== null) {
                this.showBlock = true;
                this.startLoad();
            }
        }


    }
</script>

