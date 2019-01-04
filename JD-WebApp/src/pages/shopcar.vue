<template>
    <div class="wrapper" ref="wrapper">
      <div class="scroller">
        <div style="height: 5.2rem">
          <div class="download" v-if="pulldown" style="margin-top: 5.3rem;text-align: center;align-items: center;font-size: 1rem;color:#aaa;padding:.1rem;position: relative;display: flex;">
            <img src="../../static/img/loader.png" width="25" height="50" style="margin-left: auto;margin-right: .1em">
            <div style="margin-right: auto;">
              <p style="font-size: 1.1rem;color:#777">{{pulldownsubTxt}}</p>
              {{pulldownTxt}}
            </div>
          </div>
        </div>
        <div class="main">
          <shop-list :items="products[0]" ref="myInput" :totalchecknum="totalchecknum" :totalmoney="totalmoney" :totalnum="totalnum"></shop-list>
        </div>
        <div class="upload" v-if="pullup" style="text-align: center;font-size: 1rem;color:#aaa">{{pullupText}}</div>
      </div>
      <div class="header">
        <p class="topTitle">购物车<i class="iconfont">&#xe61f;</i></p>
        <div class="right-box">
          <a>编辑</a>
          <a href="javascript:void(0)">
            <i class="iconfont">&#xe5e3;</i>
          </a>
        </div>
      </div>
      <div class="PriceAll">
        <div class="box-l">
          <label for="quan" class="colorinput">
            <input class="colorinput-input" id="quan" type="checkbox" @click="checkAlls($event)">
            <span class="colorinput-color bg-indigo"></span>
          </label>
          <span class="sp1">全选</span>
          合计:<div class="priceAllstyle">￥<span class="sp2"></span></div>
        </div>
        <div class="btn">去结算(<span id="allnum"></span>)</div>
      </div>
    </div>
</template>

<script>
    import ShopList from "../components/shopcarComponents/shopList";
    import $ from "../../static/js/jquery-3.3.1.min"
    import shopcarlistData from "../apis/data-Apis"
    import BScroll from 'better-scroll'

    export default {
      name: "shopcar",
      data() {
        return {
          products: [],
          totalnum:0,
          totalmoney:0,
          totalchecknum:0,
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
      components: {ShopList}
      ,
      methods: {
        checkAlls($event){
          this.$refs.myInput.checkAll($event)
            console.log(this.$refs.myInput.data)
        },
        _getcarShop() {
          shopcarlistData.getshopcarlist(data => {
            //初始化数据
            this.products = data;
            data[0].forEach((item,index)=>{
              for(let i in item){
                this.totalnum+=item[i].num
                this.totalmoney+=item[i].price*item[i].num
                this.totalchecknum++
              }
            })
            //数据更新后再次刷新dom
            this.$nextTick(()=>{
              //循环显示小图标！！！！因为异步加载 这里不用foreach 因为foreach是根据数据调函数来操作dom，但此时dom已经创建
              //所以循环dom 赋值html("&#xe757;"
              let his=this;
              $(".fir").each(function (i) { //i此时的下标
                $(this).html(his.products[0][i][0].ico)
                console.log(his.products[0][i][0].ico)
              })
            })
            console.log(this.products)
          })
        },
        _refreshAlert(text) {
          text = text || '操作成功';
          //$(".nav-box").stop().fadeOut(0)
          $(".download").stop().slideUp(500,function () {
          })
        }
      },
      created(){
        this._getcarShop()
      },
      mounted(){
        //下拉与上拉
        this.$nextTick(()=>{
          var scroller =new BScroll(this.$refs.wrapper,{
            probeType:3
          })

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

          scroller.on("scroll", ()=> {
            // console.log("scrollY:"+scroller.y)
            // console.log("maxY:"+scroller.maxScrollY)
            //判断是下拉,还是上拉
            if(scroller.y > 0){
              //防止jquerybug先停止之前的动画
              $(".download").stop()
              this.pulldownTxt = "松手更新"
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

          scroller.on("/", ()=> {
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
      }
    }
</script>

<style lang="scss">
    @import "../assets/css/shopcar";
</style>
