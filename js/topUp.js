/**
 * Created by lianglong on 16/3/29.
 */
(function(){
    var fastMoneyUl = $(".fastMoney ul"),
        otherMoney = $("#otherMoney"),
        topUpBt = $(".topUpBt"),
        loading = $(".loading"),
        cusAccount = $(".cusAccount"),
        cusName = $(".cusName");

    fastMoneyUl.find("li").click(function(){
        fastMoneyUl.find("li").removeClass("on");
        $(this).addClass("on");
        otherMoney.val("");
    });

    otherMoney.focus(function(){
        fastMoneyUl.find("li").removeClass("on");
    });
    otherMoney.keydown(function(e){
        var hasPoint = false;
        if(otherMoney.val().indexOf(".")>0){
            hasPoint = true;

            var otherMoneyA = otherMoney.val().split(".");
            if(otherMoneyA[1].toString().length==2&& e.keyCode!=8){
                return false;
            }
            if(hasPoint&&e.keyCode==190){
                return false;
            }
        }
    });

    otherMoney.keyup(function(){
        if($(this).val()<0){
            $(this).val("");
        }

        if(isNaN($(this).val())){
            $(this).val("");
            return false;
        }
    });

    otherMoney.blur(function(){
       if($(this).val()==0){
           $(this).val("");
       }
    });


    var order_amount = 0,
        orderId = 0,
        onlinePayAmount = 0;


    topUpBt.click(function(){
        loading.show();
        fastMoneyUl.find("li").each(function(){
            if($(this).hasClass("on")){
                order_amount = $(this).find("b").html();
            }
        });

        if(otherMoney.val()!=""){
            order_amount = otherMoney.val();
        }


        //生成充值订单
        $.ajax({
            type: "GET",
            url: domain + "center_recharge!createRechargeOrder.shtml",
            data:{
                "order_amount":order_amount,
                "pay_type":20
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {

                if(data.code!=0){
                    window.location.href = "login.html";
                }else {
                    onlinePayAmount = order_amount;
                    orderId = data.data.order_sn;
                    topUp();
                }
            }
        });
    });


    $.ajax({
        type: "GET",
        url: domain + "getCustInfo.shtml",
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data);
            if (data.code != 0) {
                window.location.href = "login.html";
            } else {
                console.log(data);
                cusAccount.html(data.data.cust_account);
                cusName.html(data.data.cust_name);
            }
        }
    });



    function topUp(){
        window.location.href = "http://m.zyanjing.com/mob_zyanjing/RechargeOAuth?orderId="+orderId+"&onlinePayAmount="+parseFloat(onlinePayAmount).toFixed(2);
    }

})();