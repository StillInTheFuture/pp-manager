<template>
    <div class="login-container">
      <div class="content">

        <el-input v-model="loginForm.account" placeholder="account" style="width: 350px"></el-input>
        <el-input type="password" v-model="loginForm.password" placeholder="password" style="width: 350px"></el-input>
        <el-button :disabled="loginForm.account === '' || loginForm.password === ''" 
                    style="width: 350px"
                    @click="handleSubmit">登陆</el-button>

      </div>
    </div>
</template>
   
<script  setup lang="ts">
    import { defineComponent, reactive } from "vue";
    import { login } from '@/api/user'
    import Storage from '@/utils/storage'

    const loginForm = reactive({
        account: '',
        password:''
    })

    console.log(222, process.env.NODE_ENV)
  
   
    const handleSubmit = (e: Event) => {
        const param =  {
            email: loginForm.account,
            password: loginForm.password
        }
        login(param).then(res => {
            console.log(111, res)
            if(res.retCode == 200){
                Storage.set('token', res.result)
            }
        //   const res: any = response.data
        //   if(res.code === 200){
        //     localStorage.setItem('ACCESS_TOKEN', res.data);
        //     router.push("/flow")
        //   }
        })
    }
   
  </script>
   
  <style lang="scss" scoped>
  /* 背景 */
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ccc;
    .content {
      position: absolute;
      width:400px;
      height:300px;
      left:50%;
      top:50%;
      margin-left:-200px;
      margin-top:-150px;
   
      border-radius: 10px;
      background: #f6efef;
      box-shadow:  5px 5px 10px #626060,
        -2px -2px 2px #de18ff;
    }
  }
   
   
  </style>