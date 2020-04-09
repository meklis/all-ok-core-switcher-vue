<template>
    <div class="container-fluid"  >
        <form onsubmit="return false;">
            <div id="sys-info-block" >
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-xl-12" >
                        <div align="center" class="info-page-block" >
                            <h3>Welcome to <i>Switcher V2</i> <br><small><i>(Switcher-Core web viewer)</i></small></h3>
                            <h4>Please, write device ip in input field and clink 'Get info' in header for start working</h4>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>


<script>
    export default {
        props: {
            sysInfo: Object,
        },
        data: function() {
            return {
                sysBlocks: [],
            }
        },
        watch: {
            sysInfo(n) {
                if(n === null) {
                    this.sysBlocks = [];
                    return
                }
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
            }
        },

    }
</script>

