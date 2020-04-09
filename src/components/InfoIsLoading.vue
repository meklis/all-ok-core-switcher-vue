<template>
    <div>
        <div align="center" style=" padding-top: 100px;  padding-bottom: 100px; "  v-if="loadInProccess">
            <h3>Info is loading, please wait...</h3>
            <img src="assets/line.svg">
        </div>
    </div>
</template>



<script>
    export default {
        props: {
            loadInProccess: Boolean,
        }
    }
</script>