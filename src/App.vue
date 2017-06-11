<template>
    <div class="app">
        <div class="indexOne" >
            <el-row>
                <el-col :span="24">
                    <!-- header -->
                    <gx-header v-if="isLogin" class="header"></gx-header>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                    <!--sidebar-->
                    <sidebar v-if="isLogin" class="sidebar"></sidebar>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                        <!-- contant -->
                        <div class="app-body">
                            <transition>
                                <router-view class="router-view">
                                </router-view>
                            </transition>
                        </div>
                    </div>
                </el-col>
            </el-row>



            <!-- footer -->
            <gx-footer class="footer"></gx-footer>

            <!-- alert弹窗 -->
            <alert></alert>

            <!-- confirm弹窗 -->
            <confirm></confirm>

            <!-- 加载loading -->
            <loading></loading>

            <!-- 模态窗 dialogs-->
            <dialogs></dialogs>

            <!-- err 日志 -->
            <log></log>

        </div>
    </div>

</template>
<script>

    import gxFooter from './components/Footer.vue'
    import gxHeader from './components/Header.vue'
    import Sidebar from './components/Sidebar.vue'
    import Loading from './components/Loading.vue'
    import Alert from './components/Alert.vue'
    import Confirm from './components/Confirm.vue'
    import Dialogs from './components/Dialogs.vue'
    import Log from './components/Log.vue'

    export default {
        name: 'App',
        props: [],
        components: {
            Loading,Sidebar, Alert, Confirm, Dialogs, Log, gxFooter, gxHeader
        },
        data: function () {
            return {
                isLogin:false
            }
        },
        mounted: function () {
            this.isLogin = this.loginValidate()
            var self = this
            window.eventBus.$on('login.success', function (userInfo) {
                self.isLogin = true
            })
        },
        methods: {
            loginValidate:function () {
                return !!window.sessionStorage.auth
            }
        },
        beforeEnter (to, from, next) {
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
    .app {

    }
</style>
