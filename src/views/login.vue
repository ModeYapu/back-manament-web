<template>
    <div class="log-in">
        <div class="main">
            <p>系统登录</p>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="20%" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm2.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import BasePage from 'src/base/BasePage'
    import Http from '../toolBus/http'
    export default {
        mixins: [BasePage],
        title: '登录',
        data() {
            return {
                ruleForm2: {
                    account: 'xiaoming',
                    password: '123123',
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'},
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Http.ajax({
                            action: 'api/user/login',
                            data: this.ruleForm2,
                            success: function (data) {
                                if(data.result){
                                    let uesr_data = data.data;
                                    window.sessionStorage.auth = JSON.stringify(uesr_data);
                                    window.eventBus.$emit('login.success', uesr_data);
                                    window.location.hash = '#/home'
                                }
                            },
                            error: function (data) {
                                console.log(data.msg)
                            }
                        });
                    }
                });

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted: function () {


        },
        activated: function () {
        },
        destroyed: function () {
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .log-in {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999999999999;
        background: white;
        .main {
            width: 600px;
            margin: auto;
            padding-top:150px;
            p {
                margin-top: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 30px;
            }
            .demo-ruleForm{
                margin:0 30px;
            }
        }
    }

</style>
