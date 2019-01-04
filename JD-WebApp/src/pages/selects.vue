<template>
  <div>
    <div class="con">
      <keep-alive>
      <header-input :keys="t" v-for="(i,t) in altShop" :style="{backgroundImage:'url(' + i[0].List[0].backImg + ')', backgroundRepeat:'no-repeat'}"></header-input>
      </keep-alive>
      <keep-alive>
      <shop-list :keys="t"  v-for="(i,t) in altShop" :items="i"></shop-list>
      </keep-alive>
      <keep-alive>
      <shop-datas :keys="t" v-for="(i,t) in altShop" :items="i"></shop-datas>
      </keep-alive>
    </div>
  </div>
</template>

<script>
    import HeaderInput from "../components/header-input";
    import $ from "../../static/js/jquery-3.3.1.min"
    import ShopList from "../components/selectComponents/shopList";
    import ShopDatas from "../components/selectComponents/shopDatas";
    import products from "../apis/data-Apis"

    export default {
      name: "selects",
      meta: {
        keepAlive: true
      },
      data() {
        return {
          altShop: []
        }
      },
      components: {ShopDatas, ShopList, HeaderInput},
      methods: {
        _getAltShop() {
          products.getSelectShopDatas(data => {
            this.altShop = data;   //初始化数据
            //再次更新dom
            this._load()
            console.log(this.altShop)
          })
        },
        _load() {
          let his=this
          $(function () {
            let nums=window.localStorage.getItem("num")
            //如果点击过li，则初始化为之前的位置，否则为第一个
            if(nums){
              $(".sliderul").children("li").eq(nums).addClass('active')
              $("#j-parent").children().eq(nums).show();
              console.log(nums)
            }else{
              $(".sliderul").children("li").eq(0).addClass('active')
              $("#j-parent").children(":first").show();
            }
             //将当前商品滚动位置保存，下次进入为此次位置
            $(".j-content").scroll(function () {
              alert("1")
              window.localStorage.setItem("shopscroll",$(".menu-right ").scrollTop())
            })

            $('#sidebar ul li').click(function () {
              //当前添加class名，其他清除
              $(this).addClass('active').siblings('li').removeClass('active');
              var index = $(this).index();
              //将当前点击的li的下标保存，下次进入为此次位置
              window.localStorage.setItem("num",index)
              //对应的商品盒子显示
              $('.j-content').eq(index).show().siblings('.j-content').hide();
             // 智能滚动
             //  if(index<=5&&index>0){
             //    $('#sidebar ul').animate({
             //       bottom:0+"px"
             //    },300)
             //  }
            })
          })
        }
      },
      mounted() {
        this._getAltShop();
        this._load()
      }
    }
</script>

<style lang="scss">
  @import "../assets/css/ectouch";
  @import '../assets/css/select.scss';

</style>
