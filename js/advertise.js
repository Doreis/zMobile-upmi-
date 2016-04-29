/**
 * Created by lianglong on 16/4/15.
 */

(function(){
    var advProdP = $(".advProd li p"),
        advLjP = $(".advLjP"),
        advHead = $(".advHead"),
        advProd = $(".advProd");




    var json = changeJson();

    advHead.empty();
    advHead.append('<a href="myOrder.html?reg_code='+json.reg_code+'&refer_id='+json.refer_id+'"><img src="images/myOrderBt.png"/></a>'+
        '<a href="shopCart.html?reg_code='+json.reg_code+'&refer_id='+json.refer_id+'"><img src="images/shopCarBt.png"/></a>'+
        '<a href="message.html?reg_code='+json.reg_code+'&refer_id='+json.refer_id+'"><img src="images/messageBt.png"/></a>'+
        '<a href="userCenter.html?reg_code='+json.reg_code+'&refer_id='+json.refer_id+'"><img src="images/userCenterBt.png"/></a>');


    advProd.find("a").each(function(){
       $(this).attr("href",$(this).attr("href")+"&reg_code="+json.reg_code+"&refer_id="+json.refer_id);
    });


})();
