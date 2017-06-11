<template>
    <el-dialog :title="title"   :visible.sync="dialogVisible" :before-close="close">
        <div>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm2.account" :disabled="disable"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input type="text" v-model="ruleForm2.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                    <el-input type="text" v-model="ruleForm2.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="ruleForm2.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="show_in">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="headImg">
                    <el-input type="text" v-model="ruleForm2.headImg"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="role">
                    <el-select placeholder="请选择" v-model="role">
                        <el-option
                                v-for="item in user_role"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            <span style="float: left">{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="callEvent('ruleForm2')">提交</el-button>
                    <el-button @click="dialogVisible = false" :before-close="close">关闭</el-button>
                </el-form-item>
            </el-form>
            <br>
            <br>
        </div>
    </el-dialog>
</template>
<script>
    import BaseDialog from 'src/base/BaseDialog'
    import Http from 'src/toolBus/http'
    export default {
        mixins: [BaseDialog],
        components: {},
        data () {
            return {
                title: '新建用户',
                dialogVisible:true,
                show_in:true,
                disable:false,
                idEdit:false,
                ruleForm2: {
                    account: '',
                    name:'花花',
                    tel:'11223344556',
                    email:'asdsa@qq.com',
                    password: 'sdgaasddaagf',
                    headImg:'adadfas.jpg',
                    role:{id:'',name:''}
                },
                role:-1,
                user_role: [{
                    id: '',
                    name: ''
                }],
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                    ],
                    tel: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                }
            }
        },
        mounted:function () {
            var self = this
             //新增人员role id的赋值
            this.getRoleList(function () {
                if(!self.isEdit){
                    self.role = self.user_role[0].id
                }
            })
            //编辑人员role id的赋值
            if(self.isEdit){
                self.role = self.ruleForm2.role.id
            }
        },
        methods: {
            getRoleList(fn){
                var self = this
                Http.ajax({
                    action: 'api/role/role-list',
                    success: function (data) {
                        self.user_role = data.data
                        fn && fn()
                    },
                    error: function (data) {
                        console.log(data.msg)
                    }
                })
            },
            callEvent: function (formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm2.role = this.role
                        Http.ajax({
                            action: self.isEdit ? 'api/user/update-user': 'api/user/register',
                            data: this.ruleForm2,
                            success: function (data) {
                                if(data.result){
                                    self.$message(self.isEdit?'编辑':'新增'+"成功")
                                    self.close();
                                    self.ok()
                                }else{
                                    self.$message(`${self.isEdit?'编辑':'新增'}失败`)
                                }
                            },
                            error: function (data) {
                                self.$message(`${self.isEdit?'编辑':'新增'}失败`)
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

<style lang="less">
    .dialog-one {

    }
</style>
