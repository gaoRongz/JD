<template>
  <div class="login">
    <div class="login-header">
      <div class="iic"><i class="iconfont">&#xe63c;</i></div>
      <p>京东登录</p>
    </div>
    <div class="login-content">
      <div class="wrap loginPage">
        <div id="username_login" class="login-wrap login-wrap-active">
          <div class="input-container">
            <input id="username" class="acc-input username txt-input J_ping" type="text" value="" placeholder="用户名/邮箱/已验证手机" autocomplete="off" onkeyup="CtoH(this);" report-eventid="MLoginRegister_Username">
            <i class="icon icon-clear"></i>
          </div>
          <div class="input-container">
            <input id="password" type="password" class="acc-input password txt-input J_ping" placeholder="请输入密码" autocomplete="off" report-eventid="MLoginRegister_Password" onkeyup="CtoH(this);">
            <i class="icon icon-clear"></i>
            <label class="label-checkbox J_ping" report-eventid="MLoginRegister_Plaintext">
              <img src="../../static/img/look.png" width="24" height="24">
              <div class="checkbtn">
              </div>
            </label>
            <button class="J_ping findpwd" report-eventid="MLoginRegister_FindPassword">忘记密码</button>
          </div>
          <!--<div id="input-code" class="input-container" style="display:true;">-->
          <!--<div class="txt-imgverify">验证码</div>-->
          <!--<input id="code" class="acc-input imgverify J_ping" type="text" placeholder="请输入图片验证码" autocomplete="off" onkeyup="CtoH(this);" size="11" maxlength="6" report-eventid="MLoginRegister_VerificationCode">-->
          <!--<span class="code-box"><img id="imgCode" src="" alt="" class="J_ping" report-eventid="MLoginRegister_PicVerifyRefresh"></span>-->
          <!--<i class="icon icon-clear"></i>-->
          <!--</div>-->
        </div>
        <!--短信验证登录-->
        <div id="sms_login" class="login-wrap">
          <!--<div id="img_code_box" class="input-container"  style="display:true;">-->
          <!--<input class="acc-input sms-img-verify J_ping" id="smsCode" type="text" placeholder="请输入图片验证码" autocomplete="off" onkeyup="CtoH(this);" size="11" maxlength="6"  report-eventid="MLoginRegister_PicVerifyInput">-->
          <!--<span class="sms-code-box"><img id="smsImgCode" src="" alt="" class="J_ping" report-eventid="MLoginRegister_SMS_PicVerifyRefresh"></span>-->
          <!--<i class="icon icon-clear"></i>-->
          <!--</div>-->
          <div class="sms-input-box">
            <div class="input-container">
              <label class="area-box J_ping" report-eventid="MLoginRegister_AreaCode">
                <span class="area_code" code="86">+86</span>
                <i class="area_icon"></i>
              </label>
              <input type="tel" id="telphone" class="acc-input telphone sms-txt-input J_ping" placeholder="请输入手机号" report-eventid="MLoginRegister_SMSPhoneInput">
              <i class="icon icon-clear"></i>
            </div>
            <button data-mescode="true" class="mesg-code mesg-disable J_ping" report-eventid="MLoginRegister_GetVerification" data-eventid="MLoginRegister_SMSReceiveCode">获取验证码</button>
          </div>
          <div class="input-container">
            <input id="telCode" class="acc-input telCode sms-txt-input J_ping" type="tel" oninput="if(value.length>6) value=value.slice(0,6);" placeholder="请输入收到的验证码" autocomplete="off" report-eventid="MLoginRegister_VerificationInput">
            <i class="icon icon-clear"></i>
          </div>
        </div>

        <div class="notice">&nbsp;</div>
        <a href="javascript:;" id="loginBtn" class="btn J_ping" report-eventid="MLoginRegister_Login">登 录</a>
        <a href="javascript:;" id="loginOneStep" class="btn btn-onestep J_ping" report-eventid="MLoginRegister_MLogin" data-src="" style="display:block;">一键登录</a>
        <input type="hidden" id="oneStep_switch" value="block">
        <div class="quick-nav clearfix">
          <!--content-id="username_login"-->
          <a content-id="sms_login" href="javascript:;" class="J_ping planBLogin" report-eventid="MLoginRegister_SMSVerification" style="display:block">
            <span class="txt-planBLogin">短信验证码登录</span>
          </a>
          <a style="display:" href="javascript:;" class="J_ping quickReg" report-eventid="MLoginRegister_PhoneRegister"><span class="txt-quickReg">手机快速注册</span></a>
        </div>
        <div class="login-type">
          <div class="quick-login" style="display:">
            <h4 class="txt-otherLogin">其他登录方式</h4>
            <a href="javascript:;" class="J_ping quick-qq" report-eventid="MLoginRegister_QQLogin"><img src="../../static/img/qq.png" width="48" height="48"><br><span class="txt-qq">QQ</span></a>
            <a href="javascript:;" class="J_ping quick-wx" report-eventid="MLoginRegister_WxLogin" style="display:"><img src="../../static/img/weixin.png" width="48" height="48"><br><span class="txt-wechat">微信</span></a>
            <a href="//m.jdpay.com/wallet/login/index.htm" class="J_ping quick-money" style="display:none"><i class="icon icon-mlogin icon-money"></i><br><span class="txt-quickMoney">京东钱包</span></a>

          </div>
          <div class="agreement-tips">
            <p>登录即代表您已同意<a href="//in.m.jd.com/help/app/private_policy.html">京东隐私政策</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "me"
    }
</script>

<style lang="scss">
    @import "../assets/css/login.scss";
</style>

