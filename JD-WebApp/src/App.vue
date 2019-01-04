<template>
  <div style="display: flex;flex-direction: column;min-height: 100vh;">
      <router-view class="swiper-slide" style="max-height: 92vh;overflow:auto;flex: 1;"/>
      <BottomNav></BottomNav>
  </div>
</template>
<script>
  import Swiper from '../static/js/swiper'
  import BottomNav from '@/components/BottomNav'
  export default {
   name: 'App',
    data(){
     return {
      refreshEnd:false,
      times:0,//加载次数
      oriSpeed:300
     }
    },
  components:{
    BottomNav
    },
    mounted(){
      var his=this;
      var swiper = new Swiper('.index',{
        speed: his.oriSpeed,
        slidesPerView: 'auto',
        freeMode: true,
        direction: 'vertical',
        setWrapperSize: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        on:{
          //下拉释放刷新
          // touchEnd: function(){
          //   swiper=this
          //   var refreshText=swiper.$el.find('.refresh')
          //   if(this.translate>100){
          //     swiper.setTransition(this.params.speed);
          //     swiper.setTranslate(100);
          //     swiper.touchEventsData.isTouched=false;//跳过touchEnd事件后面的跳转(4.0.5)
          //     refreshText.html('刷新中')
          //
          //     swiper.allowTouchMove=false;
          //     setTimeout(function(){//模仿AJAX
          //       swiper.removeAllSlides();
          //       for(let i=0;i<20;i++){
          //         swiper.appendSlide('<div class="swiper-slide">New Slide'+(i+1)+'</div>');
          //         refreshText.html('刷新完成');
          //         his.refreshEnd=true;
          //         swiper.allowTouchMove=true;
          //       }
          //     },1000)
          //
          //   }
          //
          // },
          touchStart: function(){
            if(his.refreshEnd==true){
              this.$el.find('.refresh').html('释放刷新');
              his.refreshEnd=false;
            }
          },
          //加载更多
          // momentumBounce: function(){//非正式反弹回调函数，上拉释放加载更多可参考上例
          //   swiper=this
          //   //slidesheight=0;
          //   //for(h=0;h<swiper.slides.length;h++){
          //   //	slidesheight+=swiper.slides[h].offsetHeight;
          //   //}
          //   //endTranslate=this.height-slidesheight-20
          //   //if(this.translate < endTranslate){}
          //   if(swiper.translate<-100){
          //
          //     swiper.allowTouchMove=false;//禁止触摸
          //     swiper.params.virtualTranslate=true;//定住不给回弹
          //     setTimeout(function(){//模仿AJAX
          //       for(m=0;m<20;m++){
          //         swiper.appendSlide('<div class="swiper-slide">moreSlide'+(his.times*20+m+1)+'</div>');
          //       }
          //       swiper.params.virtualTranslate=false;
          //       swiper.allowTouchMove= true;
          //       his.times++
          //     },1000)
          //   }
          // },
        }
      });
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
