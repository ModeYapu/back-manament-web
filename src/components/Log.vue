<script src="../../node_modules/element-ui/lib/index.js"></script>
<template>
    <div class="page logWarp" v-if="isDebug">
        <div v-show="showLog" class="itemWarp">
            <div class="btnWarp">
                <el-button @click.native="clearAll" class="btns" type="primary">清除</el-button>
            </div>
            <div class="item" :class="log.type" v-for="log in logs">
                {{log.content}}
            </div>
        </div>
        <div class="hander" @click="toggle"></div>
    </div>

</template>

<script type="text/ecmascript-6">
    import Log from '../toolBus/Log'
    import Config from '../config/index'

    export default {
        className: 'log',
        components: {},
        title: '',
        data: function () {
            return {
                showLog: false,
                logs: [],
                isDebug: Config.debug
            }
        },
        /**
         * 初始化事件绑定
         */
        created: function () {
            var me = this
            var maxLogs = 100
            window.eventBus.$on('log.addLogs', function (data) {
                var temp = {
                    type: 'log',
                    content: ''
                }
                if (typeof data == 'string') {
                    temp.content = data
                } else {
                    Object.assign(temp, data)
                }
                me.logs.unshift(temp)

                if (me.logs.length > maxLogs) {
                    me.logs.pop()
                }
            })
        },
        methods: {
            toggle: function () {
                var me = this
                me.showLog = !me.showLog
            },
            clearAll: function () {
                var me = this
                me.logs = []
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">

    .logWarp {
        text-align: center;
        color: #f6ffed;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        z-index: 9999999999;
    }

    .logWarp {
        .btnWarp {
            background-color: #777979
        }
    }

    .logWarp .hander {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 3rem;
        height: 3rem;
        background-color: red;
        z-index: 9999999999;
    }

    .logWarp .itemWarp {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 9999999999;
        top: 0;
        display: block;
        overflow: auto;
        -webkit-overflow-scrolling: touch
    }

    .logWarp .itemWarp .item {
        padding: rem(10);
        background-color: #C3BEBE;
        border: 1px solid #988E8E;
        text-align: left;
        word-wrap: break-word;
    }

    .logWarp .itemWarp .item.error {
        background-color: #c30009;
    }

    .logWarp .itemWarp .item.log {
        background-color: #777979;
    }

    .logWarp .itemWarp .item.info {
        background-color: #c3951f;
    }
</style>

