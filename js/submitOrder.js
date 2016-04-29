/**
 * Created by lianglong on 16/3/25.
 */
(function(){
    var locationH3 = $(".location h3"),
        locationP = $(".location p"),
        shopCartUl = $(".submitOrder ul"),
        orderTotal = $(".orderTotal"),
        location = $(".location"),
        lastBt = $(".lastBt"),
        totalBt = $(".totalBt"),
        loading = $(".loading"),
        removePop = $("#removePopss"),
        abortOrderBt = $(".abortOrderBt"),
        confirmCatch = $(".confirmCatch");




    var json = changeJson();



    if(json.homeCome){
        location.find("img").hide();
    }else {
        location.click(function(){
            window.location.href = "locationList.html?order_id="+json.order_id+"&data_ser="+$(this).attr("data_ser");
        });
    }

    var ser_num = "",
        totalM = 0;

    var orderPrice = 0,
        payway = 0,
        onlineM = 0,
        totalMo = 0,
        couponId = "",
        thisOrderID = "";

    if(json.ser_num){
        ser_num = json.ser_num;
    }else {
        ser_num = "";
    }

    $.ajax({
        type: "GET",
        url: domain + "center_order_detail!getCenterOrderDetail.shtml",
        data: {"order_id": json.order_id,"ser_num":ser_num},
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if (data.code != 0) {
                window.location.href = "login.html";
            } else {
                console.log(data);
                var obj = data.data;
                thisOrderID = obj.data.orderId;
                if(obj.address_info.cities){
                    locationH3.hide();
                    locationP.append('<b>'+obj.address_info.con_name+'<a>'+obj.address_info.telephone+'</a></b>'+
                        '<span>'+obj.address_info.province+''+obj.address_info.cities+''+obj.address_info.counties+''+obj.address_info.street_add+'</span>');
                    location.attr("data_ser",obj.address_info.ser_num);
                    locationP.show();
                }else {
                    locationH3.show();
                    locationP.hide();
                }
                for(var i=0;i<obj.data.prod_list.length;i++){
                    shopCartUl.append('<li>'+
                        '<p>'+
                        '<span>'+obj.data.prod_list[i].prodName+'</span>'+
                        '<a>￥'+obj.data.prod_list[i].totalPrice+'</a>'+
                    '</p>'+
                    '<b><a>数量:'+obj.data.prod_list[i].prodAmount+'</a><a>运费:'+obj.data.prod_list[i].freightFee+'元</a></b>'+
                    '</li>');
                }

                orderTotal.append('<h3>商品总额:&nbsp;'+obj.data.goodssum+'&nbsp;元</h3>'+
                    '<h3>运费:&nbsp;'+obj.data.freightSum+'&nbsp;元<b>(满500包邮)</b></h3>'+

                '<a>合计:&nbsp;'+obj.data.totalMoney+'&nbsp;元</a>');
                totalM = obj.data.totalMoney;


                if(obj.data.orderStatus==1 || obj.data.orderStatus==0) {
                    if (obj.data.payStatus == 0) {
                        if (obj.data.onlinePayAmount == 0) {
                            if (obj.data.sendStatus == '') {
                                lastBt.show();
                                lastBt.html("按合同发货");
                            }
                            totalBt.show();
                            $(".submitOrderCoupon").show();
                            $(".coupons a").css("display","inline-block");
                            $(".coupons img").show();
                        }
                        else if (obj.data.onlinePaySum == 0 && obj.data.onlinePayAmount > 0) {
                            lastBt.show();
                            lastBt.html("部分支付");
                            totalBt.show();
                            $(".submitOrderCoupon").show();
                            $(".coupons a").css("display","inline-block");
                            $(".coupons img").show();
                        }
                    }

                    if(obj.data.sendStatus==0)
                    {
                        if(obj.data.onlinePaySum==0 && obj.data.orderStatus==0) {
                            //abortOrderBt.css("visibility","visible");
                            //取消订单
                            abortOrderBt.show();

                        }
                    }
                    else if(obj.data.sendStatus==1)
                    {
                        //确认收货
                        console.log("确认收货");
                        confirmCatch.show();
                    }
                }





                onlineM = obj.data.onlinePayAmount;
                totalMo = obj.data.totalMoney;
            }
        }
    });


    //选择优惠券
    var coupon = $(".coupon"),
        couponBt = $(".couponBt"),
        submitOrderCoupon = $(".submitOrderCoupon"),
        coupons = $(".coupons");

    var couponId_list = [],
        couMoney = 0,
        relPay = 0;

        $.ajax({
            type: "GET",
            url: domain + "center_coupon!getOrderCanUsedCoupon.shtml",
            data: {"order_id": json.order_id},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                coupon.empty();
                var obj = data.data;
                for(var i=0;i<obj.length;i++){
                    coupon.append(' <li class="canUs" data-value='+obj[i].uc_coupon_id+' data-money='+obj[i].bonus_money+'>'+
                        '<p>'+
                        '<span><b>￥</b>'+obj[i].bonus_money+'</span>'+
                        '<span>消费满'+obj[i].use_min+'可用</span>'+
                        '<span>【 '+obj[i].strEndTime+' 】</span>'+
                        '</p>'+
                        '<p>'+
                        '<span><b>券&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</b><b></b></span>'+
                        '<span><b>使用范围:</b><b>'+obj[i].use_type_text+'</b></span>'+
                        '<span><b>券&nbsp;&nbsp;类&nbsp;&nbsp;型:</b><b>'+obj[i].name+'</b></span>'+
                        '</p>'+
                        '<a></a>'+
                        '</li>');
                }
                coupons.find("a").html(obj.length+"张可用");
                coupon.find(".canUs").each(function(){
                    couponId_list.push($(this).attr("data-value"));
                    couMoney += parseFloat($(this).attr("data-money"));
                    coupons.find("b").html("已优惠"+couMoney.toFixed(2)+"元");
                });
                for(var j=0;j<couponId_list.length;j++){
                    couponId += ","+couponId_list[j];
                }
                coupon.find("li").click(function(){
                    if($(this).hasClass("canUs")){
                        $(this).removeClass("canUs");
                    } else {
                        $(this).addClass("canUs");
                    }
                });

            }
        });



    coupons.click(function(){
        submitOrderCoupon.animate({left:"0"},300);
        couMoney = 0;
    });

    couponBt.click(function(){
        couponId_list = [];
        coupon.find(".canUs").each(function(){
            couponId_list.push($(this).attr("data-value"));
            couMoney += parseFloat($(this).attr("data-money"));
        });
        couponId = "";
        for(var i=0;i<couponId_list.length;i++){
            couponId += ","+couponId_list[i];
        }
        submitOrderCoupon.animate({left:"100%"},300);
        coupons.find("b").html("已优惠"+couMoney.toFixed(2)+"元");
    });




    lastBt.click(function(){

        if($(".location").attr("data_ser")) {
            if($(this).html()=="部分支付"){
                orderPrice = onlineM;
                payway = 1;
                relPay = orderPrice-couMoney;
                submitF();
            }else {
                loading.show();
                hetongF();
            }
        }else {
            alert("请选择收货地址!");
        }

    });

    totalBt.click(function(){
        if($(".location").attr("data_ser")) {
            orderPrice = totalMo;
            relPay = orderPrice - couMoney;
            payway = 0;
            submitF();
        }else {
            alert("请选择收货地址!");
        }
    });

    function submitF(){
        window.location.href = "pay.html?orderId="+json.order_id+"&orderPrice="+orderPrice.toFixed(2)+"&couponId="+couponId+"&payway="+payway+"&relPay="+relPay.toFixed(2)+"&couMoney="+couMoney.toFixed(2);
    }

    function hetongF(){
        $.ajax({
            type: "GET",
            url: domain + "CenterOrderAction!confirmSend.shtml",
            data: {"orderId": json.order_id},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                loading.hide();
                if(data.data.result == 0){
                    removePop.show();
                    setTimeout(function(){
                        window.location.href = "myOrder.html";
                    },3000);
                }else {
                    alert("按合同发货失败,请重新操作!");
                    window.location.href = window.location.href;
                }
            },error:function(){
                alert("按合同发货失败,请重新操作!");
                window.location.href = window.location.href;
            }
        });
    }

    //取消订单
    abortOrderBt.click(function(){
        $("#removePop").show();
    });

    $(".abortRemove").click(function(){
        $("#removePop").hide();
    });

    $(".confirmRemove").click(function(){
        loading.show();
        $.ajax({
            type: "GET",
            url: domain + "center_order!cancelOrder.shtml",
            data: {"orderId": thisOrderID},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.data.result==0){
                    loading.hide();
                    alert("已取消该订单!");
                    history.go(-1);
                }else {
                    alert("取消失败!");
                    window.location.href = window.location.href;
                }
            },error:function(){
                alert("取消失败!");
                window.location.href = window.location.href;
            }
        });
    });


    //确认收货
    confirmCatch.click(function(){
        loading.show();
        $.ajax({
            type: "GET",
            url: domain + "center_order!centerConfirmOrder.shtml",
            data: {"orderId": json.order_id},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.data.result==0){
                    loading.hide();
                    alert("确认收货成功!");
                    history.go(-1);
                }else {
                    alert("确认收货失败!");
                    window.location.href = window.location.href;
                }
            },error:function(){
                alert("确认收货失败!");
                window.location.href = window.location.href;
            }
        });
    });
})();