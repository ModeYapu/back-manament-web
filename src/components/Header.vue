<template>
    <div class='app-header'>
        <span class="logo"><img src="../assets/images/后台管理.png"/></span>
        <span class="p_management">企业后台人员管理</span>
        <div class="u_info">
            <span class="u_name">{{user.name}},{{store.menuMap[user.role.id]}}</span>
            <span class="u_headImg" @click="_show_drop">
                <img :src="user.headImage" alt="">
            </span>
        </div>
        <div class="drop_out" v-if="drop" @click="_show_drop">
            <span @click="dropOut">注销</span>
            <span @click="Modify_password">修改密码</span>
        </div>
    </div>
</template>
<script>
    import BaseComponent from 'src/base/BaseComponent'
    export default{
        mixins: [BaseComponent],
        data: function () {
            return {
                user: {},
                drop: false
            }
        },
        created: function () {
            let _self = this;
            window.eventBus.$on('login.success', function (userInfo) {
                _self.user = userInfo
            });
            this.initUser()
        },
        methods: {
            initUser: function () {
                let user = JSON.parse(window.sessionStorage.auth) || {}
                this.user = user
            },
            _show_drop(){
                this.drop = !this.drop
            },
            dropOut(){
                confirm("确定注销吗", function () {
                    this.drop = false;
                    sessionStorage.clear();
                    window.location.hash = '#/login'
                })
            },
            Modify_password(){
                let self = this
                this.openDialog({
                    url: 'dialogs/d_m_password',
                    data:{ruleForm_mp:self.user},
                    methods: {
                        ok: function () {
                            self.$message('修改成功');
                        },
                    }
                })
            }
        }
    }
</script>
<style scoped rel="stylesheet/less" lang="less">
    .app-header {
        height:2rem;
        background-color: #20A0FF;
        line-height: 2rem;
        .logo{
            width:40px;
            height:40px;
            float:left;
            img{
                width:30px;
                height:30px;
                padding:5px;
            }
        }
        .p_management {
            color: #fdfdff;
            font-size:0.8rem;
            float:left;
        }
        .u_info {
            float: right;
            width:200px;
            display:flex;
            span {
                display: inline-block;
                height: 2rem;
            }
            .u_name {
                float: left;
                text-align: center;
                flex:1;
            }
            .u_headImg {
                float: right;
                width: 2rem;
                img {
                    height: 1.8rem;
                    border-radius: 50%;
                    border: solid 2px #999;
                }
            }
        }
        .drop_out {
            background-color: #58B7FF;
            position:absolute;
            right:0;
            top: 2rem;
            font-size: .8rem;
            z-index: 10000;
            span {
                width: 4rem;
                display:block;
                border-top:1px solid #fff;
                text-align: center;
            }
        }
    }
</style>

