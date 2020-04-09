<template>

    <div style="max-height: 180px; overflow-y: auto; ">
        <div v-if="reloadInProccess"  align="center">
            <img src="assets/cicle.svg" style="height: 32px">
        </div>
        <div v-if="!reloadInProccess">
            <div v-for="(d, num) in info" :key="num" v-html="getLine(d)" >
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            info: Array,
            reloadInProccess: Boolean,
        },
        data: function () {
            return {

            }
        },
        methods: {
            getLine: function (d) {
                 return "<span style='font-weight: bold'>"+d.mac+"</span> ("+d.vlan_id+")"
            }
        }
    }
</script>
