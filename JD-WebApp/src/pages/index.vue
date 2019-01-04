<template>
  <div id="Wrapp" class="wrapper" ref="wrapper">
    <div class="scroller">
      <div id="indexChild" >
        <div class="download" v-if="pulldown" style="text-align: center;align-items: center;font-size: 1rem;color:#aaa;padding:.1rem;position: relative;display: flex">
          <img src="../../static/img/loader.png" width="25" height="50" style="margin-left: auto;margin-right: .1em">
          <div style="margin-right: auto;">
            <p style="font-size: 1.1rem;color:#777">{{pulldownsubTxt}}</p>
            {{pulldownTxt}}
          </div>
        </div>
        <header>
          <slider></slider>
        </header>
        <main>
          <menu-nav></menu-nav>
          <shop-active></shop-active>
          <shop-school></shop-school>
        </main>
        <div class="upload" v-if="pullup" style="text-align: center;font-size: 1rem;color:#aaa">{{pullupText}}</div>
      </div>
    </div>
    <header-input></header-input>
  </div>
</template>

<script>
    import $ from "../../static/js/jquery-3.3.1.min"
    import HeaderInput from "../components/header-input";
    import slider from "../components/slider";
    import MenuNav from "../components/indexComponents/menu-nav";
    import shopActive from '../components/indexComponents/shopActive'
    import ShopSchool from "../components/indexComponents/shopSchool";
    import BScroll from 'better-scroll'

    export default {
      name: "index",
      data() {
        return {
          pulldown:false,
          pulldownTxt:"松手更新",
          pulldownsubTxt:"让购物更便捷",
          pullup:false,
          pullupText:"获取更多....",
          pullDirection:0,
          pageIndex:1,
          lastY:0,
          list:[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        }
      },
      methods: {
        changes(){
          alert(1)
          $(".wrapper").scrollTop(100)
        },
        _headerChange() {
          if ($(".wrapper").scrollTop() > 0) {
            $(".nav-box").addClass("header-boxChange")
          }
          else {
            $(".nav-box").removeClass("header-boxChange")
          }
          if($(".scroller").scrollTop() > 0){
            $(".nav-box").addClass("header-boxChange")
          }
        },
        _scrollChange() {
          let his = this
          //子盒子发生滚动事件时
          $(".wrapper").scroll(function (event) {
            let scrollT = $(this).scrollTop()
            //存储滚动位置
            window.localStorage.setItem("scrollT", scrollT)
            //改变头部样式
            his._headerChange()

          })
          // //下拉盒子发生滚动事件
          // $(".scroller").scroll(function () {
          //   alert("1")
          // })

        },
        _refreshAlert(text) {
          text = text || '操作成功';
          //$(".nav-box").stop().fadeOut(0)
            $(".download").stop().slideUp(500,function () {
              $(".nav-box").stop().fadeIn(100)
            })
        }
      },
        components: {
          HeaderInput,
          slider,
          MenuNav,
          shopActive,
          ShopSchool
        },
        mounted() {
          this._headerChange()
          this._scrollChange()
         // $(".wrapper").scrollTop(scrollT)

          //下拉与上拉
          this.$nextTick(()=>{
            var scroller =new BScroll(this.$refs.wrapper,{
              probeType:3
            })
            let scrollT = window.localStorage.getItem("scrollT")
            console.log(scrollT)
            scroller.scrollTo(0,-1*scrollT)
            scroller.hasVerticalScroll=true

            scroller.on("scrollStart", ()=> {
              //判断是下拉,还是上拉

              let translatey=$('.scroller').css('transform').replace(/[^0-9\-,]/g,'').split(',')[1]
              console.log(translatey)
              // if(translatey>0){
              //    $(".nav-box").addClass("header-boxChange")
              // }else if(translatey==0){
              //   $(".nav-box").removeClass("header-boxChange")
              // }
            })
          //touch滑动
            scroller.on("scroll", ()=> {
              //存储滚动位置
              window.localStorage.setItem("scrollT", -1*scroller.y)
             // console.log("scrollY:"+scroller.y)
             // console.log("maxY:"+scroller.maxScrollY)
              //判断是下拉,还是上拉
              if(scroller.y > 0){
                //防止jquerybug先停止之前的动画
                $(".download").stop()
                this.pulldownTxt = "松手更新"
                $(".nav-box").stop().fadeOut(100)
                this.pulldown = true;
                this.pullDirection = 1
              }

              if(scroller.y > 10 && scroller.y <=30){
                //高度大于10再显示
                $(".download").stop().show()
                this.pulldownTxt = "松手更新"
                this.pullDirection = 1
              }

              //上拉
              if(scroller.y-scroller.maxScrollY <0){
                this.pullup = true;
                this.pullDirection = -1;
                this.pullupText="释放分页...."
               // console.log("是否在底部:"+(scroller.y-scroller.maxScrollY))
              }

              if(scroller.y-scroller.maxScrollY > -50 && scroller.y-scroller.maxScrollY < -10 ){
                this.pullup = true;
                this.pullDirection = -1;
                this.pullupText="释放分页...."
               // console.log("是否在底部:"+(scroller.y-scroller.maxScrollY))
              }
            })

            scroller.on("scrollEnd", ()=> {
              if(this.pullDirection ==1){
                this.pulldownTxt = "更新中..."
                setTimeout(()=>{
                  /*
                   * 这里发送ajax刷新数据
                   * 刷新后,后台只返回第1页的数据,无论用户是否已经上拉加载了更多
                  */
                  // 恢复文本值
                  this.pulldownTxt = '刷新暂且成功';
                  // 刷新成功后的提示
                  this._refreshAlert('刷新成功');
                  // 刷新列表后,重新计算滚动区域高度
                  //scroll.refresh();
                }, 1000);
              }else if(this.pullDirection == -1){

                //如果当前下拉的数比总的scrollerY小,获取新数据
                if(scroller.y <=scroller.maxScrollY){
                  this.pullupText = "分页加载中..."
                  this.pageIndex++
                  for(var i=3;i<100;i++){
                   this.list.push(i)
                  }
                 // scroller.refresh()
                  console.log(`加载了第 ${this.pageIndex} 页`)
                }
              }
             // console.log("scrollEnd")
            })
          })

        },
      updated(){
        $(".scroller").scrollTop(100)
        console.log("updated")
      }
    }
</script>
<style lang="scss">
  @import "../assets/css/index.scss";

</style>
