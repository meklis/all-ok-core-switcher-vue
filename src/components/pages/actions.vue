<template>
    <div class="container-fluid">
        <div v-if="!showBlock">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-xl-12 col-xs-12 col-sm-12">
                    <div align="center" class="info-page-block">
                        <h3>Switcher V2 <br><small>(Actions)</small></h3>
                        <h4>Waiting for device сhoosed</h4>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showBlock">
            <div class="row" v-if="loadInProccess">
                <div class="col-lg-12 col-md-12 col-xl-12 col-xs-12 col-sm-12">
                    <InfoIsLoading v-bind:load-in-proccess="loadInProccess"></InfoIsLoading>
                </div>
            </div>
            <div class="row" v-if="!loadInProccess">
                <div class="col-lg-4 col-md-6 col-xl-4 col-xs-12 col-sm-12" v-for="action in actions"
                     :key="action.name">
                    <div class="action-name">{{capitalizeFLetter(action.name)}}</div>
                    <div class="action-form">
                        <Action v-bind:action="action"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InfoIsLoading from "./../InfoIsLoading";
    import Action from './../actions/Action';
    export default {
        name: 'DevPortsBlock',
        props: {
            sysInfo: Object,
        },
        data: function () {
            return {
                showBlock: false,
                loadInProccess: true,
                actions: [],
                actionModels: {},
            }
        },
        methods: {
            async getActionList() {
                var modules = null;
                var actions = {};
                await this.$Api.getDeviceModules(resp => {
                    modules = resp.data;
                });
                modules.forEach(e => {
                    if (this.ACTION_MODULES.indexOf(e.name) !== -1) {
                        actions[e.name] = e;
                    }
                });
                return actions;
            },
            buildParam(actionName, param) {
                let required = '';
                if (param.required) {
                    required = 'required';
                }
                if (param.type === 'input') {
                    return '<label for="' + actionName + '-' + param.name + '">' + param.name + '</label><input ' + required + ' class="form-control" v-model="actionModels[actionName][param.name]" id="' + actionName + '-' + param.name + '">';
                }
                return "";
            },
            capitalizeFLetter(string) {
                string = string.replace('_', ' ').replace('_', ' ');
                return string[0].toUpperCase() + string.slice(1);
            },
            createActions(sysInfo) {
                if (sysInfo !== null) {
                    this.showBlock = true;
                    this.loadInProccess = true;
                    this.getActionList().then(actions => {
                        this.ACTION_MODULES.forEach(e => {
                            if (actions[e] === undefined) {
                                return
                            }
                            var params = [];
                            if (actions[e]['arguments'] !== undefined) {
                                actions[e]['arguments'].forEach(e => {
                                    if (e.values !== null) {
                                        e.type = 'select';
                                    } else {
                                        e.type = 'input';
                                    }
                                    params.push(e);
                                })
                            }

                            this.actions.push({
                                name: actions[e].name,
                                params: params,
                            });
                        });
                    });
                    this.loadInProccess = false;
                } else {
                    this.showBlock = false;
                }
            }
        },
        watch: {
            sysInfo: function (n) {
                this.createActions(n);
            },
        },
        computed: {
            ACTION_MODULES: () => [
                'clear_counters',
                'save_config',
                'reboot',
                'ctrl_port_state',
                'ctrl_port_speed',
                'ctrl_port_descr',
                'ctrl_vlan_state',
                'ctrl_vlan_port',
                'arp_info',
                'arp_ping',
                'lease_info',
            ],
        },
        components: {
            InfoIsLoading,
            Action,
        },
        created() {
            this.createActions(this.sysInfo);
        }
    }
</script>

