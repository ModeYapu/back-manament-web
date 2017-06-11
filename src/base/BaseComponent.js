import store from '../store/meta'
export default {
    props: ['params'],
    replace: true,
    vue: null,
    data: function () {
        return {
            store: store
        }
    },
    ready: function () {
    },
    destroyed: function () {

    },
    methods: {
        /**
         * 添加window.openDialog
         * 参数如下形式
         {
            url: '模块地址',
            data: { info:{},user:'' } //参数,
            events:{ok:function(){} , cancel:function(){} } //事件
          }
         */
        openDialog: function (params) {
            window.eventBus.$emit('dialog.open', params)
        }
    }
}
