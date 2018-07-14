<template>
    <div class="demo">
        <div class="block">
          <span class="demonstration">默认显示颜色</span>
          <span class="wrapper">
            <el-button type="success">成功按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
            <el-button type="info">信息按钮</el-button>
          </span>
        </div>
        <div class="block">
          <span class="demonstration">hover 显示颜色</span>
          <span class="wrapper">
            <el-button :plain="true" type="success">成功按钮</el-button>
            <el-button :plain="true" type="warning">警告按钮</el-button>
            <el-button :plain="true" type="danger">危险按钮</el-button>
            <el-button :plain="true" type="info">信息按钮</el-button>
          </span>
        </div>
        <div class="block">
            <h2>图标按钮</h2>
            <el-button type="primary" icon="edit"></el-button>
            <el-button type="primary" icon="share"></el-button>
            <el-button type="primary" icon="delete"></el-button>
            <el-button type="primary" icon="search">搜索</el-button>
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <div class="block">
            <h2>加载中</h2>
            <el-button type="primary" :loading="true">加载中</el-button>
        </div>
        <div class="block">
            <h2>消息提示</h2>
            <el-button :plain="true" @click="open">打开消息提示</el-button>
            <el-button :plain="true" @click="openClosableMessage">可关闭的消息</el-button>
        </div>
        <div class="block">
            <h2>通知</h2>
            <el-button plain @click="openNotification1">可自动关闭</el-button>
            <el-button plain @click="openNotification2">不会自动关闭</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            open() {
                this.$message('这是一条消息提示');
            },
            openClosableMessage(){
                this.$message({
                  showClose: true,
                  message: '恭喜你，这是一条成功消息'
                });
            },
            openNotification1() {
                const h = this.$createElement;

                this.$notify({
                  title: '标题名称',
                  type:'success',
                  message: h('p', { style: 'color: red'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
                });
              },

              openNotification2() {
                this.$notify({
                  title: '提示',
                  message: '这是一条不会自动关闭的消息',
                  duration: 0
                });
              }
        }
    }
</script>
