<template>
	<div class="am-g">
		<router-link class="go_back" to='/profile'><返回</router-link>
		<!-- LOGO -->
		<div class="login_header">
	        <h2 class="login_logo">旅行社</h2>
	        <div class="login_header_title">
	          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
	          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
	        </div>
      </div>
		
		<div class="am-u-sm-11 am-u-sm-centered">
		<form class="am-form" @submit.prevent="login">
		<!-- 短信登陆框 -->
	
		 	<fieldset class="myapp-login-form am-form-set" :class="{show: !loginWay}">
				<div class="am-form-group am-form-icon">
					<i class="am-icon-user"></i>
					<input type="text" class="myapp-login-input-text am-form-field" placeholder="请输入您的手机号" v-model="phone">
				    <button class="get_verification" @click.prevent="getCode()">{{this.computeTime==0?'点击获取验证码':'已发送('+(this.computeTime)+'s)'}}</button>
				</div>
			    <div class="am-form-group am-form-icon">
					<i class="am-icon-lock"></i>
					<input type="text" class="myapp-login-input-text am-form-field" placeholder="6个字符" v-model="code">
				</div>
							
		    </fieldset>
		  
		  <!-- 密码登录 -->
		   <fieldset class="myapp-login-form am-form-set " :class="{show: loginWay}">
				<div class="am-form-group am-form-icon">
					<i class="am-icon-user"></i>
					<input type="text" class="myapp-login-input-text am-form-field" placeholder="请输入您的账号" v-model="name">
				</div>
			    <div class="am-form-group am-form-icon">
					<i class="am-icon-lock"></i>
					<input type="text" class="myapp-login-input-text am-form-field" placeholder="至少6个字符" v-model="pwd">
					<div class="switch_button">
                      <div class="switch_circle" ></div>
                      <span class="switch_text">abc</span>
                    </div>
				</div>
				<div class="am-form-group am-form-icon">
                  <input type="text" class="myapp-login-input-text am-form-field" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                  ref="captcha">
                </div>
		  </fieldset>
		  
		  <button  class="myapp-login-form-submit am-btn am-btn-primary am-btn-block ">登 陆</button>
	 	  
		</form>
		</div>
		
		<div class="am-text-center am-u-sm-11 am-u-sm-centered myapp-login-form-shortcut">
			<hr class="myapp-login-form-hr" />
			<span class="myapp-login-form-hr-font">第三方登陆</span>
		</div>
	
		<div class="am-u-sm-12 am-text-center myapp-login-form-listico" >
			 <div class="am-u-sm-4 am-text-center" >
			 <i class="am-icon-btn am-primary am-icon-qq size"></i>
			 </div>
			 <div class="am-u-sm-4 am-text-center" >
			 <i class="am-icon-btn am-danger am-icon-weibo size"></i>
			 </div>
			 <div class="am-u-sm-4 am-text-center" >
			 <i class="am-icon-btn am-success am-icon-weixin size"></i>
			 </div>
		</div>
		
		 <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </div>
</template>

<script>
	import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
	import AlertTip from '../../components/AlertTip/AlertTip.vue'
	export default{
		 data () {
      return {
        loginWay: false, // true代表短信登陆, false代表密码
        computeTime: 0, // 计时的时间
        showPwd: false, // 是否显示密码
        phone: '', // 手机号
        code:'', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图形验证码
        alertText: '', // 提示文本
        alertShow: false, // 是否显示警告框
      }
    },

    computed: {
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      // 异步获取短信验证码
      async getCode () {
        // 如果当前没有计时
        if(!this.computeTime) {
          // 启动倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0) {
              // 停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)

          // 发送ajax请求(向指定手机号发送验证码短信)
          const result = await reqSendCode(this.phone)
          if(result&&result.code===1) {
            // 显示提示
            this.showAlert(result.msg)
            // 停止计时
            if(this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }



      },

      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },
      // 异步登陆
      async login () {
        let result
        // 前台表单验证
        if(this.loginWay) {  // 短信登陆
          const {rightPhone, phone, code} = this
          if(!this.rightPhone) {
            // 手机号不正确
            this.showAlert('手机号不正确')
            return
          } else if(!/^\d{6}$/.test(code)) {
            // 验证必须是6位数字
            this.showAlert('验证必须是6位数字')
            return
          }
          // 发送ajax请求短信登陆
          result = await reqSmsLogin(phone, code)

        } else {// 密码登陆
          const {name, pwd, captcha} = this
          if(!this.name) {
            // 用户名必须指定
            this.showAlert('用户名必须指定')
            return
          } else if(!this.pwd) {
            // 密码必须指定
            this.showAlert('密码必须指定')
            return
          } else if(!this.captcha) {
            // 验证码必须指定
            this.showAlert('验证码必须指定')
            return
          }
          // 发送ajax请求密码登陆
          result = await reqPwdLogin({name, pwd, captcha})
        }
        console.log(result)
        // 停止计时
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }

        // 根据结果数据处理
        if(result&&result.code===0) {
          const user = result.data
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user)
          // 去个人中心界面
          this.$router.replace('/profile')
        } else {
          // 显示新的图片验证码
          this.getCaptcha()
          // 显示警告提示
          const msg = result.msg
          this.showAlert(msg)
        }
      },
      // 关闭警告框
      closeTip () {
        this.alertShow = false
        this.alertText = ''
      },
      // 获取一个新的图片验证码
      getCaptcha () {
        // 每次指定的src要不一样
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
      }
    },

    components: {
      AlertTip
    }
	}
</script>

<style type="text/css" scoped>
.login_logo{
	font-size: 40px;
	font-weight: bold;
	color:  #02a774;
	text-align: center;
	margin-top: 50px;
}	
	
.login_header_title{
	padding-top: 40px;
	text-align: center;
}
.login_header_title a{
	color: #333;
	font-size:14px;
	padding-bottom: 4px;
}
.on{
	color: #020a774;
	font-weight: 700;
	border-bottom: 2px solid #02a774;
}
.off{
	background: #fff;
	
}
.show{
	display: none;
}

/*密码显示与隐藏按钮*/
.switch_button{
	font-size:12px;
    border:1px solid #ddd;
    border-radius: 8px;
    transition: background-color .3s,border-color .3s;
    padding: 0 6px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    color: #fff;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
}
.switch_circle{
	position: absolute;
	top: -1px;
	left: -1px;
	width: 16px;
	height: 16px;
	border: 1px solid #ddd;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
	transition: transform .3s;
}
.right{
	transform: translateX(30px);
	
}

.switch_text{
	float: right;
	color: #ddd;
}

/*验证码*/
.get_verification{
	position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
               
}   

/*返回按钮*/
.go_back{
	position:absolute;
    top: 5px;
    left: 5px;
    height: 30px;
    
    font-size: 20px;
    color: #02a774;   
}

        
</style>