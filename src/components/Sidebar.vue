<!-- 侧栏  -->
<template>
    <div class= "app-sidebar">
        <!--侧栏-->
        <nav id="menu" class="menu">
            <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-submenu index="1">
                    <template slot="title">人员编辑</template>
                    <el-menu-item-group title="分组一">
                        <router-link to="/user">
                            <el-menu-item index="1-1">
                               <span>人员编辑</span>
                            </el-menu-item>
                        </router-link>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <router-link to="/role">
                    <el-menu-item index="2">
                        <span>权限</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/menu-m">
                    <el-menu-item index="3">
                        <span> 目录</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </nav>
    </div>
</template>
<style rel="stylesheet/less" lang="less">
    .sidebar{
        height:500px;
    }
    .menu {
        width:100%;
        height:100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #C0CCDA;
        .el-menu-vertical-demo{
            background-color: #C0CCDA;
            span{
                font-size:20px;
            }
        }
    }
</style>
<script>
    export default{
        data () {
            return {
                show:false,
                data: []
            }
        },
        mounted: function () {
            let _self = this;
        },
        components: {}
    }
</script>
