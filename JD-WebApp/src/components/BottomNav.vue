<template>
  <div class="navigation">
    <router-link class="nav" to="/index"><i class="navIcon iconfont">&#xe678;</i>首页</router-link>
    <router-link class="nav" to='/selects'><i class="navIcon iconfont">&#xe6d4;</i>分类</router-link>
    <router-link class="nav" to='/find'><i class="navIcon iconfont">&#xe717;</i>发现</router-link>
    <router-link class="nav" to='/shopcar'><i class="navIcon iconfont">&#xe60a;</i>购物车</router-link>
    <router-link class="nav" to='/me'><i class="navIcon iconfont">&#xe619;</i>我的</router-link>
  </div>
</template>

<script>
    export default {
        name: "BottomNav",
      methods : {
        goTo(path){
          this.$router.replace(path)
          this.$refs.title.style.backgroundColor="red"
        }
      },
    }
</script>

<style scoped>
  .navigation{
    display:flex;/*设置五个导航条的内容由列排列变为行排列*/
    height: 8vh;
    font-size: 1.1rem;
    background-color: #fff;
    position: relative;
    z-index: 1000;
  }
  .nav{
    display: flex;/*这个和下面的 flex-direction属性设置将图片与文字平行排布*/
    flex-direction: column;
    flex: 1;/*设置五个导航条的内容等分*/
    line-height: 1.6rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 1em;
    color:#2e2d2d;
  }
  .navIcon{
    margin:0 auto;
    font-size: 2.4rem;
  }
  .router-link-active{
    color: #cf392a
  }
</style>
