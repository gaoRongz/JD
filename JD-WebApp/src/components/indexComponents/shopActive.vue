<template>
    <div class="pul f-c m-b">
      <div  v-for="(i,t) in products" class="row f-r">
        <div class="d-padd fle-m">
          <div class="title-wrap">
            <span class="title">京东秒杀</span>
          </div>
          <div class="img-box f-r">
            <div v-for="(is,ts) in i.data1" class="fle-au t-center">
              <img :src="is.img">
              <p><span class="d-con">￥</span><span class="d-price">{{is.price}}</span></p>
              <p><span class="d-con d-coon">￥</span><span class="d-door-price">{{is.dprice}}</span><span class="slid-c"></span></p>
            </div>
          </div>
        </div>
        <div v-for="(is,ts) in i.data2" class="r-right d-padd fle-m ss">
          <h4>{{is.title}}</h4>
          <p class="no-w">{{is.subtitle}}</p>
          <div class="f-r">
            <div class="fle-au t-center">
              <img :src="is.img1">
            </div>
            <div class="fle-au t-center">
              <img :src="is.img2">
            </div>
          </div>
        </div>
      </div>
      <div v-for="(i,t) in products" class="row f-r">
        <div v-for="(is,ts) in i.data3" class="fle-s d-padd ss">
          <h4>{{is.title}}</h4>
          <p class="no-w">{{is.subtitle}}</p>
          <div class="f-r">
            <div class="fle-au t-center">
              <img :src="is.img">
            </div>
          </div>
        </div>
        <div v-for="(is,ts) in i.data4" class="r-right d-padd fle-m ss">
          <h4>{{is.title}}</h4>
          <p class="no-w">{{is.subtitle}}</p>
          <div class="f-r">
            <div class="fle-au t-center">
              <img :src="is.img1">
            </div>
            <div class="fle-au t-center">
              <img :src="is.img2">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import shopActive from '../../apis/data-Apis'
    export default {
        name: "shopActive",
        data(){
          return {
            products:[]
          }
        },
      methods:{
        _getData() {
          shopActive.getshopActiveDatas(data => {
            this.products=data    //初始化数据
            console.log(this.products)
          })
        }
      },
      created(){
        this._getData()
      }
    }
</script>
<style lang="scss">
  @import "../../assets/css/shopActive";
</style>
