<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">Peliplat管理后台</h3>
        <p class="sub-title">Peliplat Management System</p>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          :prefix-icon="User" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          :prefix-icon="Lock"
          @keyup.enter.native="handleLogin" />
        <span class="show-pass-icon" @click="showPwd">
          <el-icon>
            <Hide v-show="passwordType === 'password'" />
            <View v-show="passwordType === 'text'" />
          </el-icon>
        </span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin(loginFormRef)">Login</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
   
<script  setup lang="ts">
  import { ref, reactive } from "vue";
  import type { FormInstance, FormRules } from 'element-plus'
  import { User, Lock, View, Hide } from '@element-plus/icons-vue'
  import  useUserStore  from '@/stores/user'
  import {useRouter} from 'vue-router'

  // init data
  const loginFormRef = ref<FormInstance>()
  const loginForm = reactive({
    username: '',
    password: ''
  })

  // rules
  const loginRules = reactive<FormRules>({
    username: [{ required: true, message: 'Enter your account', trigger: 'blur' }],
    password: [
      { required: true, message: 'Enter your password', trigger: 'blur' },
      { min: 6, message: 'The password can not be less than 6 digits', trigger: 'blur' }
    ]
  })
  
  // change pass type
  let passwordType = ref('password')
  const showPwd = () => {
    passwordType.value = passwordType.value == 'password' ? 'text' : 'password'
  }

  // sumit
  let loading = false
  const userStore = useUserStore()
  const router = useRouter()
  const handleLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        const params =  {
          email: loginForm.username,
          password: loginForm.password
        }
        loading = true
        userStore.login(params).then(res => {
          loading = false;
          console.log(999, res)
          let redirectUrl: string = (router.currentRoute.value.query.redirect || '/') as string;
          res && router.push({
            path: redirectUrl
          })
        })
      } else {
        return false
      }
    })
  }

</script>
   
<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    min-height: 100vh;
    width: 100%;
    background-color: $bg;
    .login-form {
      margin: 0 auto;
      width: 520px;
      padding: 160px 35px 0;
      .title-container {
        margin-bottom: 40px;
        text-align: center;
        color: $light_gray;
        .title {
          margin-bottom: 20px;
          font-size: 26px;
          font-weight: bold;
        }
        .sub-title{
          font-size: 20px;
        }
      }
      :deep(.el-form-item){
        margin-bottom: 24px;
        input, button{
          height: 40px;
        }
      }
      .show-pass-icon{
        position: absolute;
        right: 10px;
        line-height: 100%;
        font-size: 16px;
        color: #a8abb2;
        cursor: pointer;
      }
      .login-btn{
        width: 100%;
      }
    }
  }
</style>