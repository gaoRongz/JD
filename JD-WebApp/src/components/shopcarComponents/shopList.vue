<template>
  <div id="content" >
      <div class="rowBox" v-for="(is,ts) in items" @make="cc(ts)">
        <label class="big-label">
          <div class="merchant">
            <label class="colorinput">
            <input class="colorinput-input" :num="ts" @click="dianNum(ts,$event)" :value="is[0].val" type="checkbox" v-model="checkData" style=margin-right:5px;vertical-align:middle>
            <span class="colorinput-color bg-indigo"></span>
            </label>
            <i class="iconfont fir">&#xe679;</i>{{is[0].merchant}}<!--<i class="iconfont las">&#xe606;</i>-->
          </div>
          <div class="shopducts" v-for="(iss,tss) in is">
            <div class="checkbox">
              <label class="colorinput">
              <input  class="checkItem colorinput-input" :num="ts" :value="iss.val" type="checkbox"  v-model="checkData">
              <span class="colorinput-color bg-indigo"></span>
              </label>
            </div>
            <div class="shopductsBox">
              <img :src="iss.img">
              <div class="textBox">
                <div style="width:100%;">
                  <p class="title">{{iss.name}}</p>
                  <div class="sub-title">
                    <div>{{iss.subname}}</div>
                    <div>选服务</div>
                  </div>
                </div>
                <div class="foo">
                  <div class="d-price-style">
                    ￥<span class="d-price">{{iss.price}}</span>
                  </div>
                  <div class="addm">
                    <i class="iconfont">&#xe675;</i>
                    <input :value="iss.num" class="numInput"/>
                    <i class="iconfont">&#xe64f;</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
  </div>
</template>

<script>

    export default {
        name: "shopList",
        props:["items","totalchecknum","totalmoney","totalnum"],
        data(){
          return {
            checkData: [], // 双向绑定checkbox数据数组
            specheckData:[],
            ts:null
          }
        },
      watch: { // 监视双向绑定的数据数组
        checkData: {
          handler(){ // 数据数组有变化将触发此函数
            $("#allnum").html(this.checkData.length)
            console.log(this.checkData)
            if(this.checkData.length == this.totalchecknum){  //！！！shax
              document.querySelector('#quan').checked = true;
             // console.log(document.querySelector('#quan').checked)
            }else {
              document.querySelector('#quan').checked = false;
            }
          },
          deep: true // 深度监视
        },
        //   deep:true
        // }
        // specheckData: {
        //   handler(){ // 数据数组有变化将触发此函数
        //     if(this.checkData.length == 5){  //！！！shax
        //       document.querySelector('#quan').checked = true;
        //       // console.log(document.querySelector('#quan').checked)
        //     }else {
        //       document.querySelector('#quan').checked = false;
        //     }
        //   },
        //   deep: true // 深度监视
        // }
      },
      methods:{
        dianNum(ts,e){
          //根据v-for下传入下标找到此时勾选的店铺
          //找到这个店铺里的所有商品的checkbox
            let aa=$($(".big-label")[ts]).find(".checkItem")
          //数量框
            let bb=$($(".big-label")[ts]).find(".numInput")
          let cc=$($(".big-label")[ts]).find(".d-price")

          let moneys=0;
          let remove=0;
          //循环
          for(let i=0;i<aa.length;i++){
            //如果店铺的checkbox勾选
            if(e.target.checked){
              //把此时的店铺的所有商品的value push到this.checkdata中
              this.checkData.push(aa[i].value)

              //计算总价
              moneys+=bb[i].value*cc[i].innerHTML
              $(".sp2").html(moneys)
            }
            //否则取消店铺勾选的话
            else {
              //寻找到当时存进去的aa[i].value 然后找到下标 删除，即取消当前店铺下所有商品勾选
              var index = this.checkData.indexOf(aa[i].value);
              if (index > -1) {
                this.checkData.splice(index, 1);
              }
              let s=$(".sp2").html()
              remove+=bb[i].value*cc[i].innerHTML
              $(".sp2").html(s-remove)
            }
          }
        },
        checkAll(e){ // 点击全选事件函数
          var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
          if(e.target.checked){ // 判定全选checkbox的勾选状态
            $(".sp2").html(this.totalmoney)
            for(var i=0;i<checkObj.length;i++){
              if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
                this.checkData.push(checkObj[i].value);
              }
              console.log(!checkObj[i].value)
            }
          }else { // 如果是去掉全选则清空checkbox选项绑定数组
            $(".sp2").html(0)
            this.checkData = [];
          }
        }
      },
      mounted(){
          this.$nextTick(()=>{
            console.log(this.items)
          })
      }
    }
</script>

<style lang="scss">
    @import "../../assets/css/shopcarList";
</style>
