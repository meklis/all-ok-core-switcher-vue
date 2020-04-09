<template>
    <div>
        <div v-if="reloadInProccess"  align="center">
            <img src="assets/cicle.svg" style="height: 32px">
        </div>
        <div v-if="!reloadInProccess ">
            <div v-for="(d, num) in info" :key="num">
                {{d.description}}
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
    }
</script>
