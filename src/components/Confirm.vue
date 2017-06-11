<template>

    <div class="payments" v-show='show'>

        <div class="bp-alert css3-center">
            <div class="bq-msg css3-center">
                {{msg || '是否确定保存？' }}
            </div>
            <div class="bq-ok">
                <span class="btn-one" @click="sureConfirm">确定</span>
                <span class="btn-two" @click="cancelConfirm">取消</span>
            </div>
        </div>
    </div>
</template>
<style scoped rel="stylesheet/less" lang="less">
    .payments {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        background: rgba(52, 52, 52, 0.5);
        .bp-alert {
            position: absolute;
            z-index: 10000;
            height: 7.5rem;
            width: 70%;
            top: 35%;
            left: 15%;
            border-radius: 5px;
            color: #444;
            background-color: white;
            opacity: 0.9;
            font-size: 0.9rem;
        }

        .bq-msg {
            position: absolute;
            top: 0px;
            width: 100%;
            height: 110px;
        }

        .bq-ok {
            position: absolute;
            width: 100%;
            bottom: 0px;
            left: 0px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            border-top: .5px rgba(153, 153, 153, 0.14) solid;
            color: rgb(16, 174, 255);
        }

        span {
            display: inline-block;
            width: 48%;
        }

        .btn-one {
            border-right: .5px rgba(153, 153, 153, 0.14) solid;
        }
    }

</style>
<script>
    export default{
        data(){
            return {
                msg: '',
                show: false,
                callback: undefined
            }
        },
        created: function () {
            var _self = this
            window.eventBus.$on('confirm.show', function (msg, callback) {
                _self.msg = msg
                _self.callback = callback
                _self.show = true
            })
            window.eventBus.$on('confirm.hide', function () {
                _self.show = false
            })
        },
        methods: {
            sureConfirm: function () {
                this.show = false
                if (typeof(this.callback) == 'function') {
                    this.callback()
                }
            },
            cancelConfirm: function () {
                this.show = false
            }
        }
    }


</script>
