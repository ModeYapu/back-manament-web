<template>
    <div class="user">
        <template>
            <p class="user_d">
                <el-form :inline="true" :model="search_account" class="demo-form-inline">
                    <el-form-item label="账号">
                        <el-input v-model="search_account.account" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="Added_user">新增</el-button>
                </el-form>
            </p>
            <el-table
                    :data="tableData"
                    border>
                <el-table-column
                        prop="account"
                        label="账号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="tel"
                        label="电话">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="role.name"
                        label="权限">
                </el-table-column>
                <el-table-column label="操作"
                                 width="150px">
                    <template scope="scope">
                        <el-button
                                size="small"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    import BasePage from 'src/base/BasePage'
    import Http from '../toolBus/http'
    export default{
        mixins: [BasePage],
        title: '人员',
        data(){
            return {
                tableData: [],
                search_account: {
                    account: ''
                }
            }
        },
        /*mounted:function () {
          this.getList()
        },*/
        methods: {
            getList(){
                var self = this
                Http.ajax({
                    action: 'api/user/user-list',
                    success: function (data) {
                       self.tableData = data.data
                    },
                    error: function (data) {
                        console.log(data.msg)
                    }
                })
            },
            onSubmitSearch() {
                var self = this
                Http.ajax({
                    action: 'api/user/user-list?'+'account='+self.search_account.account,
                    success: function (data) {
                        self.tableData = data.data
                    },
                    error: function (data) {
                        console.log(data.msg)
                    }
                });
            },
            Added_user(){
                var self = this
                this.openDialog({
                    url: 'dialogs/detail',
                    methods: {
                        ok: function () {
                            self.getList()
                        },
                    }
                })
            },
            handleEdit(index, row,) {
                console.log(index, row.account);
                var self = this
                this.openDialog({
                    url: 'dialogs/detail',
                    data:{ruleForm2:row,isEdit:true,disable:true,show_in:false},
                    methods: {
                        ok: function () {
                            self.$message('编辑成功');
                        }

                    }
                })
            },
            handleDelete(index, row) {
                var _self = this
                Http.ajax({
                    action: 'api/user/delete-user',
                    data: {account: row.account},
                    success: function (data) {
                        _self.$message({
                            message: `删除用户${data.result?'成功':'失败'}`,
                            type: 'success'
                        });
                        data.result && _self.getList()
                    }
                })

            }
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .user {
        margin: auto;
        max-width: 900px;
        .user_d {
            margin: 30px;
            .search_user {
                width: 200px;
            }
        }
    }
</style>
