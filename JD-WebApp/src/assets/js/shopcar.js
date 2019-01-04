//1、定义全选的插件
jQuery.fn.extend({
  bindCheck:function($subCheckBox,$btnUncheck){
    let $allCheckBox = this;
    //1、给全选复选框绑定click事件
    //this:是全选复选框（jQuery对象）
    this.click(function(){
      let isChecked = this.checked;
      $subCheckBox.each(function(){
        this.checked = isChecked;
      });
    });
    //2、给反选
    if(arguments.length==2){
      $btnUncheck.click(function(){
        $subCheckBox.each(function(){
          this.checked = !this.checked;
        });
        reversCheck();
      });
    }
    //3、给每个选择项的复选框绑定事件
    $subCheckBox.click(function(){
      //reversCheck();
      //});
      //function reversCheck(){
      //1、判断是否全部的复选框被选中
      let isAllChecked = true;
      $subCheckBox.each(function(){
        if(!this.checked){
          isAllChecked = false;
        }
      });
      //2、处理全选复选框
      $allCheckBox.attr("checked",isAllChecked);
      //}
    })
  }
});		//$("#chkAll").bindCheck($(".addTrbox :checkbox"))
//			$(".first-tr").nextAll().addClass("tr-style");
//			$("tr").last().removeClass("tr-style");
    $($(".shop-Name")[i]).html(obj[i].goodsName);
    $($(".D-price")[i]).html(obj[i].goodsPrice);
    $($(".D-Allprice")[i]).html(obj[i].goodsPrice);
    $($(".num-input")[i]).val(obj[i].goodsCount);
    $($(".phone")[i]).attr("src",obj[i].goodsImg)
    $($("i[name='cc']")[i]).addClass("changecolor")
    //allPrice(obj);//页面一出来总计
    //增减商品
    $(".min-btn")[i].onclick=function(){	//减
      let utNum=parseInt($(".num-input")[i].value);
      let utPrice=parseFloat($($(".D-price")[i]).html())	//该商品单价
      if($(".flcheck")[i].checked){
        $(".sum-price")[0].style.display="inline-block"
      }

      if(utNum>1){
        utNum--;
        $(".num-input")[i].value=utNum;
        $(".D-Allprice")[i].innerHTML=utNum*utPrice+".00";
        allPrice()
//					$.ajax({
//						type:"get",
//						url:"../php/updateGoodsCount.php",
//						data:{vipName:$(".username").html(),goodsId:obj[i].goodsId,goodsCount:$(".num-input")[i].value},
//						success:function(){
//							console.log("ok")
//							}
//						})
      }else if(utNum==1){
        $(".changecolor")[i].style.color="#eee"
      }
    }
    $(".max-btn")[i].onclick=function(){	//加
      let utNum=parseInt($(".num-input")[i].value);
      let utPrice=parseFloat($($(".D-price")[i]).html())	//该商品单价
      if($(".flcheck")[i].checked){
        $(".sum-price")[0].style.display="inline-block"
      }
      if(utNum<99){
        utNum++;
        $(".changecolor")[i].style.color="#9fa09f"
        $(".num-input")[i].value=utNum;
        $(".D-Allprice")[i].innerHTML=utNum*utPrice+".00";
        allPrice()
//						$.ajax({
//						type:"get",
//						url:"../php/updateGoodsCount.php",
//						data:{vipName:$(".username").html(),goodsId:obj[i].goodsId,goodsCount:$(".num-input")[i].value},
//						success:function(){
//							console.log("ok")
//							}
//						})
      }
    }

    $($(".flcheck")[i]).click(function(){		//单选框
      //allPrice([1])
      if($(this).is(":checked")){
        $(".sum-price")[0].style.display="inline-block"
      }else if($(".flcheck").is(":checked")==false){
        $(".sum-price")[0].style.display="none"
      }
      allPrice()

    })
    $("#chkAll").bindCheck($(".addTrbox :checkbox"))	//全选插件必须放在调用该插件函数的前面
    $("#chkAll").click(function(){			//全选框
      allPrice()
      if($(this).is(":checked")){
        $(".sum-price")[0].style.display="inline-block"
      }else{
        $(".sum-price")[0].style.display="none"
      }
    })

    $(".num-input")[i].onkeyup=function(){	//输入数量
      let utNum=parseInt($(".num-input")[i].value);
      let utPrice=parseFloat($($(".D-price")[i]).html())	//该商品单价
      $(".D-Allprice")[i].innerHTML=utNum*utPrice+".00";
      if(utNum<99){
        allPrice()
      }
    }

    $(".num-input")[i].onblur=function(){		//数字失去焦点
      let utNum=parseInt($(".num-input")[i].value);
      if(utNum<99){
//					$.ajax({
//						type:"get",
//						url:"../php/updateGoodsCount.php",
//						data:{vipName:$(".username").html(),goodsId:obj[i].goodsId,goodsCount:$(".num-input")[i].value},
//						success:function(){
//							console.log("update-ok")
//							}
//						})
      }
    }
    $(".deleteshop")[i].onclick=function(){		//删除商品
//				$.ajax({			//后台删除
//						type:"get",
//						url:"../php/deleteGoods.php",
//						data:{vipName:$(".username").html(),goodsId:obj[i].goodsId},
//						success:function(){
//							console.log("delete-ok")
//							}
//						})
      //页面删除
      if(confirm("亲!确定将本商品移出购物车吗?")){
        $($(".addTrbox")[i]).fadeOut(400,function(){
          $(".num-input")[i].value=0
          $(".addTrbox")[i].style.display="none";
          allPrice();
        })
      }
    }
  }
  function allPrice(){
    let allprice=0;			//所有商品价格总计
    let money=0;			//单种商品价格总计
    for(let i=0;i<$(".flcheck").length;i++){
      let utNum=parseInt($($(".num-input")[i]).val());	//单种商品数量
      let utPrice=parseFloat($($(".D-price")[i]).html())	//该商品单价
      if($($(".flcheck")[i]).is(":checked")){	//同一个i
        money=utNum*utPrice;
        allprice+=money
      }
      //$($(".D-Allprice")[i]).html(money+".00");
    }
    $(".sum-price").html(allprice+".00")
  }
}
$(function(){
  $("#logoA").click(function(){
    var date=new Date(); 			//删除shopId
    date.setTime(date.getTime()-10000);
    document.cookie=cookieJson["shop-id"]+"=s; expires="+date.toGMTString()+";path="+"/";//如果给cookie设置了path，删除也要设置同样的格式
  })
//		$.ajax({
//			type:"get",
//			url:"../php/getShoppingCart.php",
//			data:{vipName:$(".username").html()},
//			dataType:"json",
//			success:function(obj){
//				console.log(obj)
//				showshopcar(obj);
//			}
//		})
  var obj=[{
    'goodsId':'01001',
    'goodsName':' OPPO R11全网通4G+64G 双卡双待' ,
    'goodsCount':1,
    'goodsPrice':'5598.00' ,
    'goodsImg':'img/s.png'
  },{
    'goodsId':'01001',
    'goodsName':' Apple iPhone 8（A1863）64GB 金色' ,
    'goodsCount':1,
    'goodsPrice':'5598.00' ,
    'goodsImg':'img/ss.png'
  }]
  showshopcar(obj)//自己给一个参数


})
