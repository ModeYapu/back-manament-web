<template>
    <div class="menu-m">
        <template>
            <p class="menu_d">
                <el-form :inline="true" :model="search_menu" class="demo-form-inline">
                    <el-form-item label="名称">
                        <el-input v-model="search_menu.menu" placeholder="请输入目录名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="Added_menu">新增</el-button>
                </el-form>
            </p>
            <el-table
                    :data="tableData"
                    border>

                <el-table-column
                        prop="id"
                        label="目录id">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="目录名称">
                </el-table-column>
                <el-table-column
                        prop="menuAction"
                        label="目录行为">
                </el-table-column>
                <el-table-column
                        prop="parentId"
                        label="父目录">
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
        title: '目录',
        data(){
            return{
                tableData: [],
                search_menu: {
                    menu: ''
                }
            }
        },
        methods:{
            getList(){
                var self = this
                Http.ajax({
                    action: 'api/menu/menu-list',
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
                    action: 'api/menu/menu-list?'+'id='+self.search_menu.menu,
                    success: function (data) {
                        self.tableData = data.data
                    },
                    error: function (data) {
                        console.log(data.msg)
                    }
                });
            },
            Added_menu(){
                var self = this
                debugger
                this.openDialog({
                    url: 'dialogs/d_menu',
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
                    url: 'dialogs/d_menu',
                    data:{ruleForm_menu:row,isEdit:true},
                    methods: {
                        ok: function () {
                            self.$message('这是一条消息提示');
                        }
                    }
                })
            },
            handleDelete(index, row) {
                var _self = this
                Http.ajax({
                    action: 'api/menu/delete-nodeId',
                    data: {id: row.id},
                    success: function (data) {
                        _self.$message({
                            message: `删除用户${!data.result?'成功':'失败'}`,
                            type: 'success'
                        });
                        !data.result && _self.getList()
                    }
                })
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .menu-m {
        margin: auto;
        max-width: 900px;
        background-color: #fff;
        .menu_d {
            margin: 30px 30px 5px 30px;
        }
    }
</style>