/**
 * Created by lianglong on 16/3/28.
 */
(function(){
    var json = changeJson();

    var locationListUl = $(".locationList ul");

    $.ajax({
        type: "POST",
        url: domain + "center_address!getAddressList.shtml",
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
                locationListUl.empty();
                var obj = data.data,
                    hasDefault = "",
                    hasChoose = "";
                for(var i=0;i<obj.length;i++){
                    if(obj[i].isDef==0){
                        hasDefault = "<a>[默认]</a>";
                    }else {
                        hasDefault = ""
                    }
                    if(obj[i].ser_num==json.data_ser){
                        hasChoose = "<img src='images/chooseBt.png'>"
                    }else {
                        hasChoose = "";
                    }
                    locationListUl.append('<li data-ser='+obj[i].ser_num+'>'+
                        '<p>'+
                        '<b>'+obj[i].con_name+'<a>'+obj[i].telephone+'</a></b>'+
                        '<span>'+hasDefault+''+obj[i].province+''+obj[i].cities+''+obj[i].counties+''+obj[i].street_add+'</span>'+
                        '</p>'+hasChoose+''+
                        '</li>');
                }
                locationListUl.find("li").click(function(){
                   window.location.href = "modifyLocation.html?&ser_num="+$(this).attr("data-ser");
                });
            }
        }
    });
})();