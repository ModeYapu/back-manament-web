/**
 * 日志模块
*/
export var log = function (...a) {
    var argsArray = Array.prototype.slice.call(arguments)
    window.eventBus.$emit('log.addLogs', {type: 'log', content: JSON.stringify(argsArray)})
}

export var error = function () {
    var argsArray = Array.prototype.slice.call(arguments)
    window.eventBus.$emit('log.addLogs', {type: 'error', content: JSON.stringify(argsArray)})
}

export default {
    log, error
}