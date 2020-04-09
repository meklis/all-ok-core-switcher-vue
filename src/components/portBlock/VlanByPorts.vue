<template>
    <div>
        <div v-if="reloadInProccess"  align="center">
            <img src="assets/cicle.svg" style="height: 32px">
        </div>
        <div v-if="!reloadInProccess">
            <div v-for="(d, num) in info" :key="num">
                <span v-html="getVlans(d)"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VlanByPorts',
        props: {
            info: Array,
            reloadInProccess: Boolean,
        },
        methods: {
            getVlans: function (el) {
                var resp = "";
                el.untagged.forEach(e => {
                    resp += "<div style='color: black'>U: <b>" + e.name + "</b> (" + e.id + ")</div>"
                })
                el.tagged.forEach(e => {
                    resp += "<div style='color: darkmagenta'>T: <b>" + e.name + "</b> (" + e.id + ")</div>"
                })
                return resp;
            },
        }
    }
</script>
