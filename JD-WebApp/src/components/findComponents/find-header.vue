<template>
    <div class="headers">
      <div class="row1">
        <a href="" class="l-pub"><i class="iconfont">&#xe8da;</i></a>
        <div class="l-center">
          <img style="width:6.1rem;height:3.2rem" src="../../../static/img/find.png">
        </div>
        <div class="l-pub l-right">
          <a href=""><i class="iconfont">&#xe637;</i></a>
          <a href="" class="right-ico"><i class="iconfont">&#xe5e3;</i></a>
        </div>
      </div>
      <div>
        <div class="rows2 swiper-container">
          <div class="swiper-wrapper s1-content buf1">
            <span class="footercolor"></span>
            <div class="swiper-slide first" num="0">关注</div>
            <div class="swiper-slide" num="1">精精</div>
            <div class="swiper-slide" num="2">搭配</div>
            <div class="swiper-slide"  num="3">视频</div>
            <div class="swiper-slide"  num="4">美食派</div>
            <div class="swiper-slide"  num="5">直播</div>
            <div class="swiper-slide"  num="6">官方</div>
          </div>
          <div class="right-slidedown"><i class="iconfont">&#xe604;</i></div>
        </div>
      </div>
    </div>

</template>

<script>
  import Swiper from '../../../static/js/swiper'
    export default {
        name: "find-header"
      ,

    }
</script>

<style lang="scss">
    @import "../../assets/css/find-header.scss";
</style>
