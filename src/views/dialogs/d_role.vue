<template>
    <el-dialog :title="title"   :visible.sync="dialogVisible" :before-close="close">
        <div>
            <el-form :model="ruleForm_role" :rules="rules2" ref="ruleForm_role" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限id" prop="id">
                    <el-input type="text" v-model="ruleForm_role.id"></el-input>
                </el-form-item>
                <el-form-item label="名字" prop="name">
                    <el-input type="text" v-model="ruleForm_role.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="callEvent('ruleForm_role')">提交</el-button>
                    <el-button @click="dialogVisible = false" :before-close="close">关闭</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
    import BaseDialog from 'src/base/BaseDialog'
    import Http from 'src/toolBus/http'
    export default {
        mixins: [BaseDialog],
        components: {
        },
        data () {
            return {
                title: '权限',
                dialogVisible:true,
                ruleForm_role: {
                    id: '',
                    name:''
                },
                rules2: {
                    id: [
                        {required: true, message: '请输入id号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入权限名称', trigger: 'blur'},
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
                            action:self.isEdit?'api/role/update-role': 'api/role/Add_to_Role',
                            data: this.ruleForm_role,
                            success: function (data) {
                                self.$message(self.isEdit?'编辑':'新增'+"成功")
                                self.close();
                                self.ok()
                            },
                            error: function (data) {
                                self.$message(self.isEdit?'编辑':'新增'+"失败")
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
    .dialog-two {

    }
</style>
