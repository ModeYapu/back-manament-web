<template>
    <div class="role">
        <div class="main">
            <p class="role_d">
                <el-form :inline="true" :model="search_id" class="demo-form-inline">
                    <el-form-item label="权限id">
                        <el-input v-model="search_id.id" placeholder="请输入权限id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="Added_role">新增</el-button>
                </el-form>
            </p>
            <el-table
                    :data="tableData"
                    border>
                <el-table-column
                        prop="id"
                        label="权限id">
                </el-table-column>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名字">
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
        </div>
    </div>
</template>
<script>
    import BasePage from 'src/base/BasePage'
    import Http from '../toolBus/http'
    export default{
        mixins: [BasePage],
        title: '权限',
        data(){
            return {
                tableData: [],
                search_id: {
                    id: ''
                },
            }
        },
        methods: {
            getList(){
                var self = this
                Http.ajax({
                    action: 'api/role/role-list',
                    success: function (data) {
                        self.tableData = data.data
                    },
                    error: function (data) {
                        console.log(data.msg)
                    }
                })
            },
            onSubmitSearch() {
                console.log('submit');
                var self = this
                Http.ajax({
                    action: 'api/role/role-list?'+'id='+self.search_id.id,
                    success: function (data) {
                        self.tableData = data.data
                    },
                    error: function (data) {
                        console.log(data.msg)
                    }
                });
            },
            Added_role(){
                var self = this
                this.openDialog({
                    url: 'dialogs/d_role',
                    methods: {
                        ok: function () {
                            self.getList()
                        },
                    }
                })
            },
            handleEdit(index, row,) {
                console.log(index, row.id);
                var self = this
                this.openDialog({
                    url: 'dialogs/d_role',
                    data:{ruleForm_role:row,isEdit:true},
                    methods: {
                        ok: function () {
                            self.$message('更改权限成功');
                        }
                    }
                })
            },
            handleDelete(index, row) {
                var _self = this
                console.log(index, row.id);
                Http.ajax({
                    action: 'api/role/delete-role',
                    data: {id: row.id},
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
    .role {
        margin: auto;
        max-width: 900px;
        .role_d {
            margin: 30px;
            .search_user {
                width: 200px;
            }
        }
    }
</style>
