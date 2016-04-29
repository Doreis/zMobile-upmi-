/**
 * Created by lianglong on 16/3/30.
 */
(function(){

    var coupon = $(".coupon"),
        neverUse = $(".neverUse"),
        expired = $(".expired"),
        hasUsed = $(".hasUsed"),
        couponTabA = $(".couponTab a");

    unused();
    expiredF();
    hasUsedF();

    couponTabA.each(function(index){
        $(this).click(function(){
            couponTabA.removeClass("on");
            $(this).addClass("on");
            coupon.empty();
            switch (parseInt(index)){
                case 0:unused(index);break;
                case 1:expiredF(index);break;
                case 2:hasUsedF(index);break;
            }
        });
    });


    function unused(that){
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
                console.log(data);
                if(data.code!=0){
                    window.location.href = "login.html";
                }else {
                    var obj = data.data.coupon_list;

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
                            '</li>');
                    }
                    neverUse.html(obj.length);
                }

            }
        });
    }

    function expiredF(that){
        $.ajax({
            type: "GET",
            url: domain + "center_coupon!getMyCouponList.shtml",
            data: {"us": 2},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data){
                var obj = data.data.coupon_list;
                if(that){
                    for(var i=0;i<obj.length;i++){
                        coupon.append(' <li data-value='+obj[i].uc_coupon_id+' data-money='+obj[i].bonus_money+'>'+
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
                            '</li>');
                    }
                }
                expired.html(obj.length);
            }
        });
    }

    function hasUsedF(that){
        $.ajax({
            type: "GET",
            url: domain + "center_coupon!getMyCouponList.shtml",
            data: {"us": 1},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data){
                var obj = data.data.coupon_list;
                if(that){
                    for(var i=0;i<obj.length;i++){
                        coupon.append(' <li data-value='+obj[i].uc_coupon_id+' data-money='+obj[i].bonus_money+'>'+
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
                            '</li>');
                    }
                }
                hasUsed.html(obj.length);
            }
        });
    }
})();