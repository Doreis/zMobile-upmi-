/**
 * Created by lianglong on 16/3/30.
 */
(function(){

    var userMoney = $(".userMoney"),
        userName = $(".userName"),
        logOutBt = $(".logOutBt"),
        loading = $(".loading");

    var json = changeJson();
    //查询余额
    $.ajax({
        type: "GET",
        url: domain + "center_recharge!queryUserBalance.shtml",
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if(data.code!=0){
                if(json.reg_code){
                    window.location.href = "login.html?reg_code="+json.reg_code+"&refer_id="+json.refer_id;
                }else {
                    window.location.href = "login.html";
                }
            }else {
                userMoney.html(data.data.user_money+"元");
            }
        }
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
                userName.html(data.data.cust_name);
            }
        }
    });

    logOutBt.click(function(){
        loading.show();
        $.ajax({
            type: "GET",
            url: domain + "ajaxlogout.shtml",
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data){
                console.log(data);
                if(data.data==""){
                    alert("退出成功!");
                    loading.hide();
                    window.location.href = "login.html";
                }
            },
            error:function(){
                alert("退出失败!");
            }
        });
    });
})();