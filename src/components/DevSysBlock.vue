<template>
    <div class="container-fluid"  >
        <form onsubmit="return false;">
            <div id="sys-info-block"  >
                <div class="row">
                    <div class="col-sm-12 col-lg-12 col-xs-12 col-md-12 col-xl-12" >
                        <div id="sys-info">
                            <div class="sys-block" v-for="item of sysBlocks" :key="item.name">
                                <div class="sys-block-name">{{item.name}}</div>
                                <div class="sys-block-value">{{item.value}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'DevSysBlock',
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
                sysBlocks.push({name: 'IP', value: n.ip});
                this.$Api.getDeviceStoreInfo(resp => {
                  let storeInf = resp.data;
                  sysBlocks.push({name: 'MAC', value: storeInf.mac});
                  sysBlocks.push({name: 'Address', value: storeInf.addr + ', под. ' + storeInf.entrance});
                })
                this.$Api.waitResponses();
                this.sysBlocks = sysBlocks;
                console.log("sysInfo was changed in dev-sys-info component")
            }
        },

    }
</script>

