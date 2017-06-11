<template>
    <el-dialog :title="title"   :visible.sync="dialogVisible" :before-close="close">
        <div>
            <el-form :model="ruleForm_mp" :rules="rules2" ref="ruleForm_mp" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account" v-show="hide">
                    <el-input type="text" v-model="ruleForm_mp.account"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="password">
                    <el-input type="password" v-model="ruleForm_mp.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_password">
                    <el-input type="password" v-model="ruleForm_mp.new_password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="check_password">
                    <el-input type="password" v-model="ruleForm_mp.check_password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="callEvent('ruleForm_mp')">提交</el-button>
                    <el-button @click="dialogVisible = false" :before-close="close">关闭</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<style>

</style>
<script>
    import BaseDialog from 'src/base/BaseDialog'
    import Http from 'src/toolBus/http'
    export default{
        mixins: [BaseDialog],
        components: {
        },
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm_mp.check_password !== '') {
                        this.$refs.ruleForm_mp.validateField('check_password');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm_mp.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                title: '修改密码',
                dialogVisible:true,
                hide:false,
                ruleForm_mp:{
                    account:'',
                    password:'',
                    new_password:'',
                    check_password:''
                },
                rules2: {
                    password: [
                     {required: true, message: '请输入原密码', trigger: 'blur'},
                    ],
                    new_password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    check_password: [
                        {required: true, message: '请输再次输入密码', trigger: 'blur'},
                    ]
                }
            }

        },
        methods:{
            callEvent: function (formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Http.ajax({
                            action:'api/user/mp-verification',
                            data: this.ruleForm_mp,
                            success: function (data) {
                                if(data.result){
                                    Http.ajax({
                                        action:'api/user/modify-password',
                                        data: self.ruleForm_mp,
                                        success: function (data) {
                                            self.$message("修改密码成功");
                                            self.close();
                                            self.ok()
                                        },
                                        error: function (data) {
                                            console.log(data.msg);
                                            self.$message("修改密码不成功")
                                        }
                                    });
                                    self.$message("原密码正确");
                                    self.close();
                                    self.ok()
                                }
                            },
                            error: function (data) {
                                console.log(data.msg);
                                self.close();
                                self.$message("原密码不正确")
                            }
                        });
                    }
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
</script>
