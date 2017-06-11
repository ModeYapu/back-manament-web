/**
 * 弹出框基础类
 */
import store from '../store/meta'
export default {
    props: ['params'],
    data: function () {
        return {
            show: true,
            store: store
        }
    },
    ready: function () {
    },
    methods: {
        close: function () {
            window.eventBus.$emit('dialog.close', this.$options.name)
        }
    }
}
