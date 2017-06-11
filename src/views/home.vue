<template>
    <div class="home">
        <br><br><br><br><br><br><br><br>
        <center> 欢迎进入后台管理系统</center>
    </div>
</template>
<script>
    import BasePage from 'src/base/BasePage'
    import Http from '../toolBus/http'
    export default{
        mixins: [BasePage],
        name: 'Home',
        title: '登录',
        data(){
            return {

            }
        },
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>
