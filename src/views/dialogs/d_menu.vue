<template>
    <el-dialog :title="title"   :visible.sync="dialogVisible" :before-close="close">
        <div>
            <el-form :model="ruleForm_menu" :rules="rules2" ref="ruleForm_menu" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名字" prop="name">
                    <el-input type="password" v-model="ruleForm_menu.name"></el-input>
                </el-form-item>
                <el-form-item label="行为" prop="menuAction">
                    <el-input type="password" v-model="ruleForm_menu.menuAction"></el-input>
                </el-form-item>
                <el-form-item label="父目录" prop="parentId">
                    <el-input type="password" v-model="ruleForm_menu.parentId"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="callEvent('ruleForm_menu')">提交</el-button>
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
                title: '目录',
                dialogVisible:true,
                show_me : false ,
                ruleForm_menu: {
                    id: '',
                    name:'',
                    menuAction:'',
                    parentId:''
                },
                rules2: {
                    /*id: [
                        {required: true, message: '请输入id号', trigger: 'blur'},
                    ],*/
                    name: [
                        {required: true, message: '请输入目录名称', trigger: 'blur'},
                    ],
                    parentId: [
                        {required: true, message: '请输入父目录', trigger: 'blur'},
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
                            action:self.isEdit ? 'api/menu/update-menu' : 'api/menu/Add_to_menu',
                            data: this.ruleForm_menu,
                            success: function (data) {
                                self.$message(self.isEdit?'编辑':'新增'+"成功")
                                self.close();
                                self.ok()
                            },
                            error: function (data) {
                                console.log(data.msg)
                                self.$message(self.isEdit?'编辑':'新增'+"失败")
                            }
                        });
                    }
                });
            }
        }
    }
</script>
<style lang="less">
    .dialog-three {

    }
</style>
