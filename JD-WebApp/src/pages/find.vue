<template>
  <div class="all-box" id="wra">
    <find-header></find-header>
    <div class="wrapper" ref="wrapper">
        <find-main class="scroller"></find-main>
    </div>
  </div>
</template>

<script>
    import $ from '../../static/js/jquery-3.3.1.min'
    import Swiper from '../../static/js/swiper'
    import FindHeader from "../components/findComponents/find-header";
    import FindMain from "../components/findComponents/find-main";
    import BScroll from 'better-scroll'
    export default {
        name: "find",
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
      components: {FindMain, FindHeader},
      methods:{
        _refreshAlert(text) {
          text = text || '操作成功';
          //$(".nav-box").stop().fadeOut(0)
          $(".download").stop().slideUp(500,function () {
          })
        },
          _changes(){
            //导航栏手动滑动
            var swiper = new Swiper('.rows2', {
              slidesPerView: 5,
              spaceBetween:10,
            });
            //导航栏点击引发的事件
            //1）绿条滑动并且字体颜色改变
            //2）导航栏滑动
            //3）页面滑动
            //页面滑动引发的事件
            new Swiper('.yemian', {
              on: {
                transitionStart:function(){
                  ss(this.activeIndex)       //导航栏同步滑动 底线与字体颜色的同步改变
                },
              }
            });
            $(".s1-content").children("div").each(function(){
              $(this).click(function(){
                var width = document.documentElement.clientWidth;
                let numb=$(this).attr("num")
                //页面滑动
                $(".buf2").css({//"translate3d(-375px,0px,0px)",
                  transform:function(){
                    let transX=numb*width*-1;
                    return "translate3d("+transX+"px,0px,0px)"    //拼接字符串
                  },
                  transitionDuration:"300ms"
                })
                //导航栏同步滑动 底线与字体颜色的同步改变
                ss(numb);
              })
            })
            function ss(numb){
              //当前字体变颜色
              $(".s1-content").children("div").eq(numb)[0].style.color="#dc4037"
              //其他字体变颜色
              $(".s1-content").children("div").eq(numb).siblings().css({
                color:"#495057"
              })
              //底线滑动
              $(".footercolor").animate({
                left:65*numb+"px"
              },200)
              if(numb==5){
                $(".footercolor").addClass('changeWidth')
              }else{
                $(".footercolor").removeClass('changeWidth')
              }

              //导航栏滑动
              if(numb>2&&numb<5) {
                $(".buf1").css({//"translate3d(-375px,0px,0px)",
                  transform: function () {
                    let transX = -65 * (numb - 2)
                    return "translate3d(" + transX + "px,0px,0px)"
                  },
                  transitionDuration: "200ms"
                })
              }else if(numb==5){
                $(".buf1").css({//"translate3d(-375px,0px,0px)",
                  transform:function(){
                    let transX=-65*(numb-3)
                    return "translate3d("+transX+"px,0px,0px)"
                  },
                  transitionDuration:"200ms"
                })
              }else if(numb==6){
                $(".buf1").css({//"translate3d(-375px,0px,0px)",
                  transform:function(){
                    let transX=-65*(numb-4)
                    return "translate3d("+transX+"px,0px,0px)"
                  },
                  transitionDuration:"200ms"
                })
              }else if(numb<=2&&numb>0){
                $(".buf1").css({//"translate3d(-375px,0px,0px)",
                  transform:function(){
                    let transX=0
                    return "translate3d("+transX+"px,0px,0px)"
                  },
                  transitionDuration:"200ms"
                })
              }
            }
          }
      },
      mounted(){
        this._changes()

          //下拉与上拉
          this.$nextTick(()=> {
            var scroller = new BScroll(this.$refs.wrapper, {
              probeType: 3
            })

            scroller.on("scrollStart", () => {
              //判断是下拉,还是上拉

              let translatey = $('.scroller').css('transform').replace(/[^0-9\-,]/g, '').split(',')[1]
              console.log(translatey)
              // if(translatey>0){
              //    $(".nav-box").addClass("header-boxChange")
              // }else if(translatey==0){
              //   $(".nav-box").removeClass("header-boxChange")
              // }
            })

            scroller.on("scroll", () => {
              // console.log("scrollY:"+scroller.y)
              // console.log("maxY:"+scroller.maxScrollY)
              //判断是下拉,还是上拉
              if (scroller.y > 0) {
                //防止jquerybug先停止之前的动画
                $(".download").stop()
                this.pulldownTxt = "松手更新"
                this.pulldown = true;
                this.pullDirection = 1
              }

              if (scroller.y > 10 && scroller.y <= 30) {
                //高度大于10再显示
                $(".download").stop().show()
                this.pulldownTxt = "松手更新"
                this.pullDirection = 1
              }

              //上拉
              if (scroller.y - scroller.maxScrollY < 0) {
                this.pullup = true;
                this.pullDirection = -1;
                this.pullupText = "释放分页...."
                // console.log("是否在底部:"+(scroller.y-scroller.maxScrollY))
              }

              if (scroller.y - scroller.maxScrollY > -50 && scroller.y - scroller.maxScrollY < -10) {
                this.pullup = true;
                this.pullDirection = -1;
                this.pullupText = "释放分页...."
                // console.log("是否在底部:"+(scroller.y-scroller.maxScrollY))
              }
            })

            scroller.on("scrollEnd", () => {
              if (this.pullDirection == 1) {
                this.pulldownTxt = "更新中..."
                setTimeout(() => {
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
              } else if (this.pullDirection == -1) {

                //如果当前下拉的数比总的scrollerY小,获取新数据
                if (scroller.y <= scroller.maxScrollY) {
                  this.pullupText = "分页加载中..."
                  this.pageIndex++
                  for (var i = 3; i < 100; i++) {
                    this.list.push(i)
                  }
                  // scroller.refresh()
                  console.log(`加载了第 ${this.pageIndex} 页`)
                }
              }
              // console.log("scrollEnd")
            })
          })
        //头部向上滚动
        var before = $("#wra").scrollTop();
        $("#wra").scroll(function(){
          var after = $("#wra").scrollTop();
          if (before<after) {
            $(".headers").stop().animate({
              top:-45
            },300)
            $(".row1").stop().animate({
              top:-80
            },150)
            console.log('上');
            before = after;
          }
          if (before>after) {
            $(".headers").stop().animate({
              top:0
            },200)
            $(".row1").stop().animate({
              top:0
            },300)
            console.log('下');
            before = after;
          }
        })
        }
    }
</script>

<style scoped>
    .all-box{

    }
</style>
