/**
 * Created by lianglong on 16/3/30.
 */
(function(){
    var oldPWD = $(".oldPWD"),
        newPWD = $(".newPWD"),
        newPWDAgain = $(".newPWDAgain"),
        confirm = $(".confirm"),
        modifyPWDUl = $(".modifyPWD ul");

    confirm.click(function(){
       var canModify = checkF();
        if(!canModify){
            $.ajax({
                type: "GET",
                url: domain + "center_upd_pwd!updatePwd.shtml",
                data:{"old_pwd":md5(oldPWD.val()),"new_pwd":md5(newPWD.val())},
                dataType: 'json',
                contentType: "text/plain; charset=utf-8",
                cache: false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);
                    if(data.data.result==1){
                        alert("密码修改成功!");
                        history.go(-1);
                    }else {
                        alert("密码修改失败,请重新修改!");
                    }
                }
            });
        }
    });

    function checkF(){
        var canModify = false;
        modifyPWDUl.find("input").each(function(){
           if($(this).val()==""){
               canModify = true;
           }
        });
        if(canModify){
            alert("不能为空!");
        }
        if(!canModify&&newPWD.val()!=newPWDAgain.val()){
            alert("两次输入的新密码不一致,请重新输入!");
            canModify = true;
        }
        return canModify;
    }
    modifyPWDUl.find("input").focus(function(){
       $(this).val("");
    });

})();