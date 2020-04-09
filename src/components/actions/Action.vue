<template>
    <form @submit.prevent="proccessAction">
        <div v-for="param in action.params" :key="param.name">
            <label :for="param.name" style="margin-top: 5px; margin-bottom: 0; padding-bottom: 0; font-weight: normal; font-style: italic">{{param.name}}</label>
            <input v-if="param.type === 'input'"
                   v-model="actionModel[param.name]"
                   :id="param.name"
                   :required="param.required"
                   :pattern="param.pattern"
                   :name="param.name"
                   class="form-control">
            <select class="form-control"
                    v-if="param.type === 'select'"
                    v-model="actionModel[param.name]"
                    :id="param.name"
                    :name="param.name"
            >
                <option v-for="key in param.values" :key="key"
                        :selected="actionModel[param.name] === key">{{key}}
                </option>
            </select>
        </div>
        <div>{{response}}</div>
        <button type="submit" name="action_name" :value="action.name" class="btn  btn-primary btn-block" style="margin-top: 10px">Go</button>
    </form>
</template>

<script>
    export default  {
        props: {
           action: Object,
        },
        data: function () {
            return {
                actionModel: [],
                response: null,
            }
        },
        methods: {
            proccessAction: function (ev) {
                this.response = null;
                var params = {};
                ev.target.elements.forEach(e => {
                   params[e.name] = e.value;
                });
                this.$Api.getAction(params.action_name, params).then(resp => {
                    if(resp.data.data === true) {
                        this.response = 'Success';
                    } else {
                        this.response = resp.data.data;
                    }
                }, err => {
                    this.response = err.response.data.error.description;
                })
            }
        }
    }
</script>