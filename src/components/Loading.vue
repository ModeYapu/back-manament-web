<template>
    <div class="css3-center bq-loading" v-show='show'>
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
        <span>加载中........</span>

    </div>

</template>
<style scoped rel="stylesheet/less" lang="less">
    .bq-loading {
        z-index: 10000;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        color: #fff;
        background-color: rgba(100, 100, 100, .5);
    }

    span {
        position: absolute;
        top: 59%;
        left: 40%;
    }

</style>
<script>
    export default{
        data(){
            return {
                msg: '',
                show: false
            }
        },
        created: function () {
            var _self = this
            window.eventBus.$on('loading.show', function (msg) {
                _self.msg = msg
                _self.show = true
            })
            window.eventBus.$on('loading.hide', function () {
                _self.show = false
            })
        }
    }


</script>
