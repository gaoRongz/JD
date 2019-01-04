<template>
    <div id="j-parent">
      <section class="menu-right padding-all j-content" v-for="(is,ts) in items[1]" style="display: none">
          <div>
            <img :src="is | fil(is)" style="width:100%;height:10rem">
          </div>
          <ul :vl="iss" v-for="(iss,tss) in is">
            <h4>{{iss | sum(iss)}}</h4>
            <li class="w-3" v-for="(isss,tsss) in iss"><a href="#"></a> <img :src="isss.img" /><span>{{isss.name}}</span></li>
          </ul>
      </section>
    </div>
</template>

<script>
    export default {
      name: "shopDatas",
      props:["items"],
      filters:{
        sum:function (s) {
          return s[0]['h5']
        },
        fil:function (a) {
          return a[0][0]["titleImg"]
        }
      },
      beforeDestroy(){   /*页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数*/
        console.log('实例销毁之前');
      }
    }
</script>

<style scoped>
</style>
