<template>
    <div style="max-height: 180px; overflow-y: auto; ">
        <div v-if="showPreload || reloadInProccess"  align="center">
            <img src="assets/cicle.svg" style="height: 32px">
        </div>
        <div v-if="!showPreload && !reloadInProccess" >
            <a href="javascript:void(0);"  @click="diagPort(portNum)" title="Click for reload info">
                <div v-for="(d, num) in portInfo" :key="num"  >
                    <div v-for="(pair, pairNum) in d.pairs" :key="pairNum" v-html="getLine(pair)">
                    </div>
                </div>
                <span v-if="portInfo.length === 0">Опросить</span>
            </a>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            info: Array,
            portNum: String,
            reloadInProccess: Boolean,
        },
        data: function () {
            return {
                showPreload: false,
                portInfo: Array
            }
        },
        methods: {
            getLine: function (d) {
                let style = "";
                switch (d.status) {
                    case "OK":
                        style = "color: darkgreen; font-weight: bold";
                        break;
                    case "Short":
                        style = "color: red; font-weight: bold";
                        break;
                    case "Open":
                        style = "color: gray; font-weight: bold";
                        break;
                    case "NoCable":
                        style = "color: blue; font-weight: bold";
                        break;

                }
                if(d.status === "NoCable" || d['length'] == 0) {
                    return "<span style='"+style+"'>"+d.number+": " +d.status+" </span>";
                }
                return "<span style='"+style+"'>"+d.number+": " +d.status+" - "+d['length']+"M</span>";
            },
            diagPort: function (portNum) {
                this.showPreload = true;
                this.portInfo = [];
                this.$Api.getAction('cable_diag', {port: portNum}, resp => {
                    resp.data.forEach(el => {
                        this.portInfo.push(el);
                    });
                    this.showPreload = false;
                })
                console.log("Start diag port with number "+portNum);
            },
        },
        created() {
            this.showPreload = false;
            this.portInfo = this.info;
        },
        watch: {
            info: function (n) {
                this.portInfo = n;
            }
        }
    }
</script>
