/**
 * Created by lianglong on 16/3/30.
 */
(function(){
    var shopCartUl = $(".shopCart ul"),
        totalMoneyDOM = $(".totalMoney"),
        allChoose = $(".allChoose"),
        payBt = $(".shopPayBt"),
        loading = $(".loading"),
        deleteCart = $(".deleteCart"),
        removePop = $(".removePop"),
        abortRemove = $(".abortRemove"),
        confirmRemove = $(".confirmRemove"),
        noMessage = $(".noMessage");

    var totalMoney = 0;
    var json = changeJson();
    $.ajax({
        type: "GET",
        url: domain + "lens_cart!getCartList.shtml",
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
            }else {
                var obj = data.data.cart_item_list;
                shopCartUl.empty();
                if(obj.length==0){
                    noMessage.show();
                }else {
                    noMessage.hide();
                }
                for(var i=0;i<obj.length;i++){
                    shopCartUl.append('<li data-price = '+obj[i].total_price+' data-id='+obj[i].cart_id+' data-proId='+obj[i].prod_id+'>'+
                        '<a class="shopChooseBt"></a>'+
                        '<p>'+obj[i].prod_name+'</p>'+
                    '<span>数量:&nbsp;'+obj[i].quantity+'<b>￥'+obj[i].total_price+'</b></span>'+
                    '<a class="carViewBt" href="viewMetric.html?cart_id='+obj[i].cart_id+'&prod_id='+obj[i].prod_id+'">查看</a>');
                }
                shopCartUl.unbind("click").find("li").click(function(){
                    if($(this).hasClass("on")){
                        $(this).removeClass("on");
                    }else {
                        $(this).addClass("on");
                    }
                    allChoose.removeClass("on");
                    totalMoney = 0;
                    shopCartUl.find(".on").each(function(){
                        totalMoney += parseFloat($(this).attr("data-price"));
                    });
                    totalMoneyDOM.html("合计:￥"+totalMoney);
                });

                allChoose.unbind("click").click(function(){
                    if($(this).hasClass("on")==false){
                        $(this).addClass("on");
                        shopCartUl.find("li").addClass("on");
                        totalMoney = 0;
                        shopCartUl.find(".on").each(function(){
                            totalMoney += parseFloat($(this).attr("data-price"));
                        });
                        totalMoneyDOM.html("合计:￥"+totalMoney);
                    }else {
                        $(this).removeClass("on");
                        shopCartUl.find("li").removeClass("on");
                        totalMoney = 0;
                        shopCartUl.find(".on").each(function(){
                            totalMoney += parseFloat($(this).attr("data-price"));
                        });
                        totalMoneyDOM.html("合计:￥"+totalMoney);
                    }
                });

                $(".modifyBt").unbind("click").click(function(){
                     modiF($(this).parent().attr("data-id"),$(this).parent().attr("data-proId"));
                    return false;
                });
            }
        }
    });


    function modiF(Cid,proId){
        $.ajax({
            type: "GET",
            url: domain + "lens_cart!editCartItem.shtml",
            dataType: 'json',
            data:{"cart_id":Cid},
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    window.location.href = "modifyMetric.html?cart_id="+Cid+"&prod_id="+proId;
                }else {
                    alert(data.msg);
                }
            }
        });
    }

    payBt.click(function(){

        var canBy = hasLocation();
        if(canBy){
            if(shopCartUl.find(".on").length>0){
                loading.show();
                var cartIds = "";
                shopCartUl.find(".on").each(function () {
                    cartIds += $(this).attr("data-id") + ",";
                });
                $.ajax({
                    type: "GET",
                    url: domain + "lens_cart!createOrder.shtml",
                    data: {"cartIds": cartIds},
                    dataType: 'json',
                    contentType: "text/plain; charset=utf-8",
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.data) {
                            window.location.href = "submitOrder.html?order_id=" + data.data;
                        }
                    }
                });
            }else {
                alert("购物车未选择!");
            }
        }
    });



    function hasLocation(){
        var canBy = true;
        $.ajax({
            type: "POST",
            url: domain + "center_address!getAddressList.shtml",
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            async: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.data.length<1||!data.data){
                    alert("请先添加收货地址!");
                    canBy = false;
                    window.location.href = "newLocation.html?firstSet=1";
                }
            }
        });
        return canBy;
    }

    deleteCart.click(function(){
        if(shopCartUl.find(".on").length==0){
            alert("请选择要删除的项!");
        }else {
            removePop.show();
        }
    });

    abortRemove.click(function(){
        removePop.hide();
    });

    confirmRemove.click(function(){
        var cartIds = "";
        shopCartUl.find(".on").each(function(){
            cartIds += $(this).attr("data-id")+",";
        });
        $.ajax({
            type: "GET",
            url: domain + "lens_cart!deleteCartItem.shtml",
            data:{"cartIds":cartIds},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                window.location.href = window.location.href;
            },
            error: function (err) {
                alert("删除失败,请重试!");
            }
        });
        removePop.hide();
    });
})();