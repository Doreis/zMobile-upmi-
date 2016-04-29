/**
 * Created by lianglong on 16/4/6.
 */
(function(){
    var cartNumber = $(".cartNumber"),
        couponNumber = $(".couponNumber"),
        homeUl = $(".home"),
        footer = $("footer"),
        header = $("header"),
        banner = $(".banner"),
        body = $("body");

    //购物车数量
    $.ajax({
        type: "GET",
        url: domain + "lens_cart!getCartListCount.shtml",
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            cartNumber.html(data.data);
            if(data.data<1){
                cartNumber.hide();
            }else {
                if(data.data>99){
                    cartNumber.html("99+");
                }
                cartNumber.show();
            }
        }
    });

    $.ajax({
        type: "GET",
        url: domain + "center_coupon!getMyCouponList.shtml",
        data: {"us": 0},
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data){
            if(data.code!=0){
                window.location.href = "login.html";
            }else {

                couponNumber.html(data.data.coupon_list.length);
                if(data.data.coupon_list.length<1){
                    couponNumber.hide();
                }else {
                    if(data.data.coupon_list.length>99){
                        cartNumber.html("99+");
                    }
                    couponNumber.show();
                }
            }
        }
    });



})();