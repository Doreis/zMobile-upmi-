/**
 * Created by lianglong on 16/4/10.
 */
(function(){
    var paySuccessSpan = $(".paySuccess span");
    var time = 2;
    setInterval(function(){
        if(time==0){
            window.location.href = "index.html";
        }else {
            paySuccessSpan.html(time+"s");
            time--;
        }
    },1000);
})();