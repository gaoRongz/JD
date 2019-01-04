<template>
  <div class="menu-nav pul m-b">
    <div class="swiper-container s2">
      <div class="swiper-wrapper">
        <div v-for="(i,t) in menus[0]" class="swiper-slide" >
          <ul v-for="(is,ts) in i" class="row">
            <li v-for="(iss,tss) in is"><a href="#"><img :src="iss.img">{{iss.title}}</a></li>
          </ul>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="menu-footer" @click="_clearInter">
      <a href="#" class="title no-w">京东快报</a>
      <a href="#" class="f-c no-w">
        <ul id="textS">
          <li v-for="(i,t) in menus[1]">
            <span>{{i.title}}</span>{{i.content}}
          </li>
        </ul>
      </a>
      <a href="#" class="f-r no-w"><span>更多</span></a>
    </div>
  </div>
</template>

<script>
    import Swiper from '../../../static/js/swiper'
    import Menu from '../../apis/data-Apis'

    export default {
        name: "menu-nav",
        data(){
          return {
            p:null,
            bb:null,
            bb2:null,
            count:1,
            t:0,
            menus:[]
          }
        },
      methods:{
          _menuSwiper(){
            var swiper=new Swiper('.s2', {
              pagination: {
                el: '.swiper-pagination',
              },
              preventLinksPropagation: false,   // 阻止点击事件冒泡(防止手动快速来回滑动后自动滑动紊乱)
              observer:true,                //修改swiper自己或子元素时，自动初始化swiper
              observeParents:true           //修改swiper的父元素时，自动初始化swiper
            });
          },
        _getData() {
          Menu.getIndexMenu(data => {
            this.menus=data;   //初始化数据
            this.$nextTick(() => { // 下一个UI帧再初始化swiper
              this._menuSwiper();
            });
            console.log(this.menus)
          })
        },
        _textSlide(){
          //调文字滚动
          let his=this
          his.bb=function(){
            his.p=setInterval(()=>{   //!!!得用箭头函数 不转移this
              his.t=his.t-1;
              $("#textS")[0].style.top=his.t+"px";
              if((his.t)%-25==0){
                his.t=-25*his.count;
                his.count++;
                clearInterval(his.p);
                his.bb2=setTimeout(his.bb,3000)//重新调函数
              }if(his.t<=-75){
                his.t=0;
                his.count=1
              }
            },10)
          }
          his.bb2=setTimeout(his.bb,2000);//调用计时器
        },
        _clearInter(){
          clearTimeout(this.bb2)
          clearInterval(this.p)
          this.p=null
          this.bb2=null
        }
      },
        mounted(){
          this._menuSwiper();
          this._getData();
          this._textSlide()
        },
      beforeDestroy(){
        this._clearInter()  //组件销毁前清除定时器
      }
    }
</script>

<style scoped>

</style>
