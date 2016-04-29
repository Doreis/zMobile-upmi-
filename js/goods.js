/**
 * Created by lianglong on 16/3/22.
 */
(function(){
    var ul = $("ul"),
        title = $(".title");

    var json = changeJson();

    document.title = decodeURI(json.prod_name);
    $.ajax({
        type:"GET",
        url:domain+"lens_brand_list!getBigSeriesList.shtml",
        data:{"type_value":"0","prod_brand":json.prod_brand},
        dataType : 'json',
        contentType : "text/plain; charset=utf-8",
        cache:false,
        xhrFields:{
            withCredentials: true
        },
        success:function(data){
            if(data.code!=0){
                window.location.href = "login.html";
            }else {
                var obj = data.data.big_series_list;
                ul.empty();
                var list = obj.split(",");
                for (var i = 0; i < list.length; i++) {
                    var hrefS = "goodDetails.html?prod_brand=" + json.prod_brand + "&big_prod_series=" + encodeURI(list[i])+"&prod_name="+json.prod_name;
                    ul.append('<li>' +
                        '<a href=' + hrefS + '>' +
                        '<span>' + list[i] + '</span>' +
                        '<img src="images/arrowR.png"/>' +
                        '</a>' +
                        '</li>');
                }
            }
        }
    });
})();