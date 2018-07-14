<template>
<div>
    <div class="login-bg">&nbsp;</div>
    <div class="login-pt">
        <div class="login-cnt">
            <i class="logo"></i>
            <div class="login-frm" v-loading="loading" element-loading-text="正在验证用户信息,请稍候...">
                <span class="sicon icon-user"></span>
                <span class="sicon icon-pwd"></span>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                    <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
                    <el-form-item>
                        <el-button type="primary" @click="submitLogin" class="fl">登录系统</el-button>
                        <el-button @click="handleResetLogin" class="fr">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    const access_token = "access_token";
    import axios from 'axios';

    axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
    export default {
        data() {
            return {
                loading: false,
                loginForm: {
                    username: 'admin',
                    password: 'admin',
                    grant_type: 'password'
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            submitLogin() {
                axios.get('http://localhost:12548/api/user/get')
                    .then(function(response) {
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            handleResetLogin() {
                this.$refs.loginForm.resetFields();
            }
        }
    }
</script>