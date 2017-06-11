<template>
    <component :is="currPage"></component>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    import noPage from '../views/404'
    export default {
        name: 'PageRouter',
        data: function () {
            return {
                currPage: '',
                loginUrl:'login'
            }
        },
        components: {'404': noPage},
        mounted: function () {
            this.loadPage(this.$route.params)
        },
        watch: {
            '$route' (to, from) {
                //debugger
                if (to.path != from.path) {
                    // 如果页面改变。load新页面加入
                    this.loadPage(to.params)
                }
            }
        },
        methods: {
            loadPage: function (data) {
                //登录验证
                var islogin = this.$root.$children[0].loginValidate()
                if(!islogin && this.$route.path.substr(1)!=this.loginUrl) {
                    window.location.hash = '#/'+this.loginUrl
                    return false
                }

                let path = this.getPath()
                console.log(path)
                System.import('../views/' + path + '').then(module => {
                    Vue.component(path, module)
                    this.currPage = path
                }).catch(() => {
                    this.currPage = '404'
                })
            },
            getPath:function () {

                //获取路由地址
                var pathParam = this.$route.params
                var paths = []
                for (var k in pathParam) {
                    paths.push(pathParam[k])
                }
                if (paths.length == 0) paths.push('home')
                return paths.join('/')
            }
        }
    }
</script>
