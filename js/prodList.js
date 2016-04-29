/**
 * Created by lianglong on 16/3/22.
 */
//(function(){
//    var ul = $("ul");
//
//
//
//    $.ajax({
//        type:"POST",
//        url:domain+"lens_brand_list!getTypeBrandList.shtml?type_value=0",
//        dataType : 'json',
//        contentType : "text/plain; charset=utf-8",
//        cache:false,
//        xhrFields:{
//            withCredentials: true
//        },
//        success:function(data){
//            if(data.code!=0){
//                window.location.href = "login.html";
//            }else {
//                var obj = data.data.brand_list;
//                ul.empty();
//                for (var i = 0; i < obj.length; i++) {
//                    if(obj[i].brand_name.indexOf("依视路")>=0||obj[i].brand_name.indexOf("碧碧及亚")>=0||obj[i].brand_name.indexOf("慧尔视")>=0||obj[i].brand_name.indexOf("百维视")>=0){
//                        var hrefS = "goods.html?prod_brand=" + obj[i].brand_value+"&prod_name="+obj[i].brand_name;
//                        ul.append('<li>' +
//                            '<a href=' + hrefS + '>' +
//                            '<span>' + obj[i].brand_name + '</span>' +
//                            '<img src="images/arrowR.png"/>' +
//                            '</a>' +
//                            '</li>');
//                    }
//                }
//            }
//        }
//    });
//})();