<template>
  <div class="homeMoudle">
    <div class="Header" >
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#225390" text-color="#fff" active-text-color="#ffd04b">

        <el-menu-item index="0" @click="jump('/index')" >
          首页
        </el-menu-item>

        <el-menu-item index="1" @click="jump('/Online')" >
          样本查询
        </el-menu-item>

        <el-menu-item index="2" @click="jump('/Report')" >
          报告自动化
        </el-menu-item>

        <el-menu-item index="3" @click="jump('/Database')" >
          数据库管理
        </el-menu-item>

      </el-menu>

      <div class="user">
        <el-dropdown  :hide-on-click="false">
          <span class="el-dropdown-link">
            <img :src="'http://120.77.144.112/OpenBRCA/php/Uploads/Home/User/'+ UserInfo.user_image" alt="" class="user-img">
            &nbsp;{{UserInfo.user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item >
              <span >个人资料</span>	
            </el-dropdown-item>

            <el-dropdown-item >
              <span >消息中心</span>	
            </el-dropdown-item>

            <el-dropdown-item divided>
              <span @click.stop="logout">注销登录</span>	
            </el-dropdown-item>
          </el-dropdown-menu>

        </el-dropdown>
      </div>
    </div>

    <!-- 页面内容部分  路由嵌套 -->
    <router-view> </router-view>
    

  </div>
  
</template>

<script>
export default {
  data() {
      return {
        activeIndex2: '0',
        UserInfo:{
          user_name: 'admin',
          user_image: 'default.jpg',    
        }
      };
    },
    created(){
      // 验证用户是否登录, 已登录跳转到后台首页，未登录跳转到登录界面
      this.checklogin ()
    },
    methods: {
      // 验证用户登录状态
      checklogin (){

        // 1. 发送后台请求
        // this.$http.get("check").then(result => {
        //   //console.log(result.body.test)
        //   if (result.body.statu == 0){
        //     // 实现路由跳转，跳转到登录页面
        //     console.log('账号已登录!')
        //     // this.$router.push({path : '/index'})
        //   }else{
        //     this.$router.push({path : '/login'})
        //   }
        // });

        // 1. 获取当前登录状态
        let statu = this.$store.getters.getStatu

        if(statu == 'Success'){
          this.$store.commit('update_statu', 'Success')
          localStorage.setItem('login', 'Success')
        }else{
          // 说明未登录
          this.$store.commit('update_statu', 'Failed')
          localStorage.setItem('login', 'Failed')
          this.$router.push({path : '/login'})
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 注销登录
      logout() {
        localStorage.setItem('login', 'Failed')
        this.$store.commit('update_statu', 'Failed')
        // 跳转到登录界面
        this.$message({
          showClose: true,
          message: '注销成功, 1s后跳转到登录界面!',
          type: 'success',
          offset: 150,
          duration : 1000
        });
        var intervalId = window.setTimeout(() => {
          this.$router.push({path : '/login'})
        }, 1000)

        // this.$http.get("logout").then(result => {
        //   if (result.body.statu == 0){
        //     this.$message({
        //       showClose: true,
        //       message: '注销成功, 1s后跳转到登录界面!',
        //       type: 'success',
        //       offset: 150,
        //       duration : 1000
        //     });

        //     // 跳转到登录页面
        //     var intervalId = window.setTimeout(() => {
        //       this.$router.push({path : '/login'})
        //     }, 1000)

        //   }else{
        //     // 发生未知错误
            
        //     this.$message({
        //       showClose: true,
        //       message: '发生未知错误, 1s后跳转到登录页面!',
        //       type: 'success',
        //       offset: 150,
        //       duration : 1000
        //     });

        //     // 跳转到首页
        //     var intervalId = window.setTimeout(() => {
        //       this.$router.push({path : '/login'})
        //     }, 1000)
        //   }
        
        // });
      },
      // 跳转到指定页面
      jump(page){
        this.$router.push({path : page})
      }
    }
}
</script>


<style lang="scss" scoped>
  .homeMoudle {
    width:100%;
    min-height:100%;

    .Header{
			position:relative;

			.user{
				width:20%;
				height:60.5px;
				text-align:center;
				line-height:60.5px;
				font-size:16px;
				color:white;
				position: absolute;
				outline:none;
				top:0;
				right:0;

				.Info{
					cursor: pointer;
				}

				.user-img{
					border-radius: 50%;
					width:30px;
				}
			}

			.el-dropdown-link {
				cursor: pointer;
				color: white;
			}
			.el-icon-arrow-down {
				font-size: 14px;
			}

		}






  }


</style>
