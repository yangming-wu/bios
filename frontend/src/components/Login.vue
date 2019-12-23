<template>
  <div class="loginMoudle">

    <div class="loginblock">
      
      <div class="loginline" style="margin-top:50px;">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" size="medium" v-model="user"> </el-input>
      </div>

      <div class="loginline">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-key" size="medium" v-model="passwd" show-password> </el-input>
      </div>

      <div class="loginline">
        <el-button type="primary" style="width:100%" @click="login" >立即登录</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
          user : "", // 用户名
          passwd : "", // 密码
          passcode : "",  // 验证码
      }
    },
    methods : {
      login() {

        // 1. 验证信息是否合法
        if (this.user.length < 5){
          this.$message({
            showClose: true,
            message: '警告：用户名不能少于5位!',
            type: 'warning',
            offset: 150
          });
          return
        }else if(/[^\d\w_]+/.test(this.user)) {
          this.$message({
            showClose: true,
            message: '警告：用户名只能包含数字、下划线、字母!',
            type: 'warning',
            offset: 150
          });
          return
        }

        if (this.passwd.length == 0){
          this.$message({
            showClose: true,
            message: '警告：密码不能为空!',
            type: 'warning',
            offset: 150
          });
          return
        }

        // if (this.passcode.length == 0){
        //   this.$message({
        //     showClose: true,
        //     message: '警告：验证码不能为空!',
        //     type: 'warning',
        //     offset: 150
        //   });
        //   return
        // }

        // 2. 提交信息到后台验证
        // this.$http.get(`login?user_name=${this.user}&passwd=${this.passwd}`).then(result => {
        this.$http.post('api/login',{'user_name':this.user, 'passwd': this.passwd}).then(result => {
          if (result.body.statu == 0){
                this.$message({
                showClose: true,
                message: '登录成功, 1s后跳转到首页!',
                type: 'success',
                offset: 150,
                duration : 1000
              });

              // 登录成功,将登录状态保存到localStorage中,并更新仓库中的状态
              localStorage.setItem('login','Success')
              this.$store.commit('update_statu', 'Success')

              // 跳转到首页
              var intervalId = window.setTimeout(() => {
                this.$router.push({path : '/index'})
              }, 1000)
          }else{
            localStorage.setItem('login','Failed')
            this.$store.commit('update_statu', 'Failed')
            this.$message({
              showClose: true,
              message: '错误：登录失败!',
              type: 'error',
              offset: 150
            });
            return
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .loginMoudle {
    width:100%;
    height:100%;
    background-image: url(http://120.77.144.112/OpenBRCA//img/Back/login.jpg);
    background-position: center;
    background-size: 100%;

    .loginblock{
      
      padding: 8px 20px;
      position: absolute;
      top : 25%;
      left : 38.5%;
      width : 350px;
      height : 300px;
      border-radius: 10px;
      background-color: rgba(0,0,0,0.3);
      z-index: 1001;

      h2{
        color: #EEEEEE;
      }

      .loginline {
        height : 45px;
        line-height: 45px;
        margin-top : 15px;

        .el-input{
          padding:100 !important;
        }
      }
    }

  }


</style>