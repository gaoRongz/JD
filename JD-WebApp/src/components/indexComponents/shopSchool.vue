<template>
  <div>
    <div v-for="(item,index) in products" class="shopSchool">
      <div class="t-center">
        <span class="big-title">{{item.dd1[0].bigtitle}}</span>
      </div>
      <div class="pul f-c m-b m-t">
        <div class="row f-r">
          <div v-for="(i,t) in item.dd1" class="d-padd fle-m ss no-r-border">
            <span class="color-title">{{i.title}}</span>
            <p class="no-w">{{i.subtitle}}</p>
            <div class="img-box f-r">
              <div class="fle-au t-center">
                <img :src="i.img1">
              </div>
              <div class="fle-au t-center" style="padding:0 .4rem">
                <img :src="i.img2">
              </div>
            </div>
          </div>
        </div>
        <div class="f-r">
          <div class="f-r fle-m ">
            <div v-for="(is,ts) in item.dd2" class="d-padd fle-m ss b-r no-r-border">
              <span class="color-title no-w">{{is.title}}</span>
              <p class="no-w">{{is.subtitle}}</p>
              <div class="f-r">
                <div class="fle-au t-center">
                  <img :src="is.img1">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import shopSchool from '../../apis/data-Apis'
    export default {
      name: "shopSchool",
      //props:["items","index"],
      data(){
        return{
          products:[]
        }
      },
      methods:{
        _getData() {
          shopSchool.getSchoolDatas(data => {
            this.products=data//是初始化数据
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
    @import "../../assets/css/shopSchool";
</style>
