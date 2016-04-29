/**
 * Created by lianglong on 16/3/21.
 */
(function(){
    var account = $("#account"),
        pwd = $("#pwd"),
        loginBt = $(".loginBt"),
        loginP = $(".login p"),
        loading = $(".loading"),
        registerBt = $(".registerBt"),
        loginDOM = $(".login");

    loginBt.click(function(){
        var canLogin = checkAccount();
        if(canLogin){
            login();
        }
    });

    var json = changeJson();

    registerBt.attr("href","register.html?reg_code="+json.reg_code+"&refer_id="+json.refer_id);

    loginDOM.height(document.body.clientHeight);


    function checkAccount(){
        if(account.val()==""){
            loginP.html("账号或密码不能为空");
            loginP.show();
            return false;
        }
        if(pwd.val()==""){
            loginP.html("账号或密码不能为空");
            loginP.show();
            return false;
        }
        return true;
    }

    account.focus(function(){
        account.css("border","1px solid #fff");
    });
    pwd.focus(function(){
        pwd.css("border","1px solid #fff");
    });

    function login(){
        loading.show();
        $.ajax({
            type:"GET",
            url:domain+"ajaxlogin.shtml",
            data:{account:account.val(),pwd:pwd.val()},
            dataType : 'json',
            contentType : "text/plain; charset=utf-8",
            cache:false,
            timeOut:10000,
            xhrFields:{
                withCredentials: true
            },
            success:function(data){
                console.log(data);
                loading.hide();
                if(data.code!=0){
                    loginP.html("账号或密码输入错误");
                    loginP.show();
                }else {
                    loginP.hide();
                    Setcookie ("custId", data.data.XYanJ_C_id);
                    window.location.href = "index.html";
                }
            },
            error:function(){
                alert("登录失败,请重新登录!");
                loading.hide();
            }
        });
    }

    function Setcookie (name, value)

    {

        var expdate = new Date();   //初始化时间
        expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间
        document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";

    }



})();