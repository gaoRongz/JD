<template>
    <div class="nav-box">
    <a href="javascript:void(0)">
      <i class="iconfont">&#xe680;</i>
      <span>扫啊扫</span>
    </a>
    <div class="input-box">
      <div class="lr-box search-box">
        <i class="iconfont">&#xe637;</i>
      </div>
      <input type="text" placeholder="小米8屏幕指纹板"/>
      <div class="lr-box dingdong-box">
        <img src="../../static/img/jdr.png"/>
      </div>
    </div>
    <a href="javascript:void(0)">
      <i class="iconfont">&#xe5e3;</i>
      <span>消息</span>
    </a>
  </div>
</template>

<script>
    export default {
        name: "header-input",
      props:["items"]
    }
</script>

<style lang="scss">
    @import "../assets/css/headerInput.scss";
</style>
