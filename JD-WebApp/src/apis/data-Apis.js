
import {sliderImgUrl} from '../commons/indexData'
import {shopActive} from "../commons/indexData";
import {shopschoolUrl} from '../commons/indexData'
import {indexMenu} from '../commons/indexData'
import {selectShopUrl} from "../commons/indexData";
import {shopcarlists} from "../commons/indexData";


export default {
  /**
   * 获取首页轮播图图片数据
   * @param calb
   */
  getSliderImg(calb){
    fetch(sliderImgUrl).then(res=> {
      res.json().then(data => {
        calb(data)
      })
    })
  },
  /**
   * 获取首页菜单数据
   * @param calb
   */
  getIndexMenu(calb){
    fetch(indexMenu).then(res=> {
      res.json().then(data => {
        calb(data)
      })
    })
  },
  /**
   * 获取首页活动商品的数据
   * @param callb
   */
  getshopActiveDatas(callb){
    fetch(shopActive).then(res=> {
      res.json().then(data => {
        callb(data)
      })
    })
},
  /**
  * 获取首页校园商品类似dom的数据
  * @param callb
  */
    getSchoolDatas(callb){
      fetch(shopschoolUrl).then(res=> {
        res.json().then(data => {
          callb(data)
        })
      })
    },
  /**
   * 获取分类页面的数据
   * @param callb
   */
  getSelectShopDatas(callb){
    fetch(selectShopUrl).then(res=> {
      res.json().then(data => {
        callb(data)
      })
    })
  },
  /**
   * 获取购物车页面的数据
   * @param callb
   */
  getshopcarlist(callb){
    fetch(shopcarlists).then(res=> {
      res.json().then(data => {
        callb(data)
      })
    })
  }

  }
