/**
 * Created by lianglong on 16/3/24.
 */
(function(){
    var orderList = $(".orderList"),
        remainPay = $(".remainPay"),
        remainSend = $(".remainSend"),
        allPay = $(".allPay"),
        myOrderTab = $(".myOrderTab");

    var json = changeJson();

    var index = 1,
        ajax1 = null,
        ajax2 = null,
        ajax3 = null,
        urlF = domain + "center_order!getCenterOrderList.shtml?index=";

    allOrder();


    myOrderTab.find("li").click(function(){
        myOrderTab.find("li").removeClass("on");
        $(this).addClass("on");
    });

    allPay.click(function(){
        urlF = domain + "center_order!getCenterOrderList.shtml?index=";
        orderList.empty();
        index = 1;
        allOrder();
    });

    remainPay.click(function(){
        urlF = domain + "center_order!getCenterOrderList.shtml?pay_status=0&index=";
        orderList.empty();
        index = 1;
        allOrder();
    });

    remainSend.click(function(){
        urlF = domain + "center_order!getCenterOrderList.shtml?send_status=0&index=";
        orderList.empty();
        index = 1;
        allOrder();
    });


    function allAbort(){
        if(ajax1!=null&&ajax1!="null"){
            ajax1.abort();
        }
    }

    function allOrder(){
        allAbort();
        ajax1 = $.ajax({
            type: "POST",
            url: urlF+index,
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.code!=0){
                    if(json.reg_code){
                        window.location.href = "login.html?reg_code="+json.reg_code+"&refer_id="+json.refer_id;
                    }else {
                        window.location.href = "login.html";
                    }
                }else if(data.data.data.length>0){
                    var obj = data.data.data;

                    for(var i=0;i<obj.length;i++){
                        var html1 = "",
                            html2 = "",
                            html3 = "",
                            orderNumber = 0;
                        html1 = '<li>'+
                            '<h3>订单编号:'+obj[i].orderId+'<span class="orderStatus">'+obj[i].orderStatusText+'</span></h3>';

                        for(var j=0;j<obj[i].prod_list.length;j++){
                            var thisIndex = 0;
                            for(var s=0;s<j;s++){
                                if(obj[i].prod_list[s].prodId==obj[i].prod_list[j].prodId){
                                    thisIndex++;
                                }
                            }
                            html2 += '<p>'+
                                '<span>'+obj[i].prod_list[j].prodName+'</span>'+
                                '<a href="viewMetric.html?order_id='+obj[i].orderId+'&prod_id='+obj[i].prod_list[j].prodId+'&orderDetailId='+obj[i].prod_list[j].orderDetailId+'">查看光度</a>'+
                                '</p>';
                            orderNumber += obj[i].prod_list[j].prodAmount;
                        }

                            html3 = '<b><a>数量:'+orderNumber+'</a>&nbsp;&nbsp;<a>金额:'+obj[i].totalMoney+'元</a></b>'+
                                '<a class="orderListBt" href="submitOrder.html?order_id='+obj[i].orderId+'&homeCome=1">查看订单</a>'+
                                '</li>';


                        orderList.append(html1+html2+html3);
                    }

                    $(window).unbind("scroll").scroll(function(){
                        if($(window).scrollTop()==$(document).height() - $(window).height()){
                            index++;
                            allOrder();
                        }
                    });
                }
            }
        });
    }





})();