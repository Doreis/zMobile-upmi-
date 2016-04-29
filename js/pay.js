/**
 * Created by lianglong on 16/3/29.
 */
(function(){
    var remaining = $(".remaining"),
        relPayMoney = $(".relPayMoney"),
        needPay = $(".needPay"),
        weixinPay = $(".weixinPay"),
        payUl = $(".pay ul"),
        remainPay = $(".remainPay"),
        payBt = $(".payBt"),
        loading = $(".loading");

    var json = changeJson(),
        payType = "",
        hasOnMo = 0;


    if(parseFloat(json.couMoney)>parseFloat(json.orderPrice)){
        relPayMoney.html("0元");
        payUl.hide();
    }else {
        relPayMoney.html(json.relPay+"元");
    }

    $.ajax({
        type: "GET",
        url: domain + "center_recharge!queryUsedBalance.shtml",
        data:{"orderId":json.orderId},
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        async: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data);
            hasOnMo = data.data.used_money;
        }
    });

    $.ajax({
        type: "GET",
        url: domain + "center_recharge!queryUserBalance.shtml",
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        async: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data);
            if (data.code != 0) {
                window.location.href = "login.html";
            } else {
                var obj = data.data;
                var yuE = (parseFloat(obj.user_money)+parseFloat(hasOnMo)).toFixed(2);
                remaining.html("账户余额: "+yuE+"元");
                if(yuE>=parseFloat(json.relPay)){
                    remainPay.find(".needPay").html("还需支付: 0 元");
                    payType = "yue";
                }else {
                    remainPay.find(".needPay").hide();
                    payUl.append('<li class="weixinPay">'+
                        '<a></a>'+
                        '<p>'+
                        '<span>微信支付</span>'+
                        '<span><b>还需支付: '+(parseFloat(json.relPay)-yuE).toFixed(2)+' 元</b></span>'+
                    '</p>'+
                    '</li>');
                    payType = "weixin";
                }

                payBt.unbind("click").click(function(){
                    loading.show();
                    window.location.href = domain + "CenterOrderAction!submitOrder.shtml?orderId="+json.orderId+"&orderPrice="+parseFloat(json.orderPrice).toFixed(2)+"&paytype="+payType+"&custId="+getCookie("custId")+"&payway="+json.payway+"&couponId="+json.couponId;
                });
            }
        }
    });


})();