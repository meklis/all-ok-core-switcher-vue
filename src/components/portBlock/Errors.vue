<template>
    <div>
        <div v-if="reloadInProccess "  align="center">
            <img src="assets/cicle.svg" style="height: 32px">
        </div>
        <div v-if="!reloadInProccess">
            <div v-html="getErrors()"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            errors: Array,
            rmon: Array,
            reloadInProccess: Boolean,
        },
        methods: {
            getErrors: function () {

                if(this.rmon !== undefined && this.rmon.length !== 0) {
                    let errors = this.rmon[0].ether_stats_crc_align_errors + "/" +
                            this.rmon[0].ether_stats_collisions + "/" +
                            this.rmon[0].ether_stats_undersize_pkts + "/" +
                            this.rmon[0].ether_stats_oversize_pkts + "/" +
                            this.rmon[0].ether_stats_fragments + "/" +
                            this.rmon[0].ether_stats_jabber + "/" +
                            this.rmon[0].ether_stats_drop_events ;
                    let maxVal = this.getMaxValueFromArr([
                        this.rmon[0].ether_stats_crc_align_errors ,
                        this.rmon[0].ether_stats_collisions,
                        this.rmon[0].ether_stats_undersize_pkts ,
                        this.rmon[0].ether_stats_oversize_pkts,
                        this.rmon[0].ether_stats_fragments ,
                        this.rmon[0].ether_stats_jabber,
                        this.rmon[0].ether_stats_drop_events,
                    ]);
                    let color = this.colorByVal(maxVal);
                    let weight = this.boldBySizes(maxVal);
                    return "<span style='color: "+color+"; font-weight: "+ weight +"'>"+errors+"</span>";
                }  else if (this.errors !== undefined && this.errors.length !== 0) {
                    let maxVal = this.getMaxValueFromArr([
                        this.errors[0].in_errors,
                        this.errors[0].out_errors,
                    ]);
                    let color = this.colorByVal(maxVal);
                    let weight = this.boldBySizes(maxVal);
                    return "<span style='color: "+color+"; font-weight: "+ weight +"'>"+this.errors[0].in_errors + "/" + this.errors[0].out_errors+"</span>";
                } else {
                    return  "";
                }
            },
            colorByVal: function (val) {

                let color = '';
                if((val === 0)) {
                    color = "gray";
                } else if (val < 50) {
                    color = "blue";
                } else {
                    color = 'red';
                }
                return color
            },
            boldBySizes: function (val) {
                let weight = '400';
                if((val === 0)) {
                    weight = "400";
                } else if (val < 50) {
                    weight = "500";
                } else {
                    weight = '700';
                }
                return weight
            },
            getMaxValueFromArr(arr) {
                var maxVal = 0;
                arr.forEach(e=>{
                    if (e > maxVal) {
                        maxVal = e;
                    }
                });
                return maxVal;
            }
        },
    }
</script>
