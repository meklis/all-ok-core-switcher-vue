<template>
    <div class="container-fluid" >
        <form  @submit="checkForm">
            <div id="header-block" >
                <div class="row">
                    <div class=" col-xs-12 col-sm-12 col-md-7 col-lg-8 col-xl-8" style="padding: 5px;">
                        <div v-if="modulesLoadingList.length !== 0" style="text-align: left; padding: 5px;">
                            <img src="assets/cicle.svg" style="height: 24px; padding: 2px">Loading...
                            <small>
                             <span  style="color: lightgray" v-for="(module, num) in modulesLoadingList" :key="num">{{capitalizeFLetter(module)}} </span>
                            </small>
                        </div>
                        <h4 style="color: darkred" v-if="errMessage !== ''">{{errMessage}}</h4>
                        <span style="color: darkred" v-if="errIncorrectIp !== ''">{{errIncorrectIp}}</span>
                    </div>
                    <div class="col-xs-8 col-sm-8 col-md-3 col-lg-2 col-xl-2">
                        <input v-model="devIp" id="dev-ip" class="form-control" placeholder="10.1.1.1">
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-2 col-lg-2  col-xl-2">
                        <button   type="submit"  class="btn btn-block btn-primary" :disabled="modulesLoadingList.length !== 0">Get info</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
    input, button, label {margin-bottom: 3px; margin-top: 3px;}
    label {margin-top: 7px;  }
</style>

<script>
    import Validator from "../modules/valid";
    export default {
        name: 'Header',
        props: {
            loadedDevIp: {
                type: String,
                required: true,
            },
            modulesLoadingList: Array,
            errMessage: String,
        },
        data: function () {
            return {
                devIp: "",
                errIncorrectIp: "",
            }
        },
        watch: {
            errMessage: function () {
                this.errIncorrectIp = "";
            }
        },
        created() {
            if(this.loadedDevIp !== "") {
                this.devIp = this.loadedDevIp;
            }
        },
        methods: {
          capitalizeFLetter: function (string) {
              string = string.replace('_', ' ').replace('_', ' ');
            return  string[0].toUpperCase()  + string.slice(1);
        },
        checkForm: function (e) {
            this.errors = [];

            if(!this.devIp) {
                this.errIncorrectIp = "IP is required";
            }

            if(!Validator.Ip(this.devIp)) {
                this.errIncorrectIp = "Incorrect IP address";
            } else {
                this.$emit('set-ip', this.devIp);
                return true;
            }


            e.preventDefault();
        }
    }
    }
</script>
