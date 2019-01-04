import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
  state:{
    ShopListIndex:null
  },
  getters:{
    get_list(state) {
      //先从state里面获取用户登录信息
      let loginInfo = state.ShopListIndex;
      //如果 state 里面获取不到，那么从localStorage里面获取
      if(!loginInfo){
        loginInfo = JSON.parse(window.localStorage.getItem('loginInfo') || null)
      }
      return loginInfo;
    }
  },
  mutations:{
    // state指的是state的数据
    // name传递过来的数据
    setShopListIndex(state, num){
      state.ShopListIndex = num;//将传参设置给state的city
    }
  },
  actions:{
    // 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setShopList({commit,state}, name){
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit("setShopListIndex", name);
    }
  }

})
