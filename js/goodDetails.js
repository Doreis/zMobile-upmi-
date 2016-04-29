/**
 * Created by lianglong on 16/3/22.
 */
(function(){
    var ulLi = $("ul li"),
        refractive = $(".refractive"),
        surfaceDOM = $(".surface"),
        channelDOM = $(".channel"),
        layerDOM = $(".layer"),
        goodName = $(".goodName"),
        metricBt = $(".metricBt");



    function spanCss(){
        ulLi.find("span").css({
            "height":0,
            "line-height":0
        });
        ulLi.each(function(){
            $(this).find("span").css({
                "height":$(this).height(),
                "line-height":$(this).height()+"px"
            });
        });
    }



    var json = changeJson(),
        gradual = 0;

    var goodsInfoAjax = null,
        surfaceAjax = null,
        layerAjax = null,
        channelAjax = null;


    var lens_refra_index = "",
        lens_type = "",
        prod_film = "",
        prod_passageway = "",
        prod_id = "";

    var prod_id_2 = "";


    document.title = decodeURI(json.prod_name)+decodeURI(json.big_prod_series);

    //折射率
    $.ajax({
        type: "GET",
        url: domain + "lens_brand_list!getRefractivityList.shtml",
        data: {"type_value": "0", "prod_brand": json.prod_brand,"big_prod_series":decodeURI(json.big_prod_series)},
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            var list = null;
            if(data.code!=0){
                if(json.reg_code){
                    window.location.href = "login.html?reg_code="+json.reg_code+"&refer_id="+json.refer_id;
                }else {
                    window.location.href = "login.html";
                }
            }else {
                if(data.data.refractivity_list.indexOf(",")) {
                    list = data.data.refractivity_list.split(",");
                }else {
                    list = data.data.refractivity_list;
                }
                for(var l=0;l<list.length;l++){
                    if(list[l]!=""){
                        refractive.find("p").append('<a><b>'+list[l]+'</b></a>');
                    }
                }

                //css操作
                refractive.find("p").children().first().addClass("on");
                refractive.find("a").unbind("click").click(function(){
                    $(this).parent().find("a").removeClass("on");
                    $(this).addClass("on");
                    lens_refra_index = $(this).find("b").html();
                    surfaceAjax.abort();
                    surface();
                    metricBt.hide();
                });

                lens_refra_index = refractive.find("p").children().first().find("b").html();
                surface();
            }
            spanCss();
        },
        error: function () {
            goodName.html("");
            metricBt.hide();
            refractive.hide();
        }
    });


    function surface(){
        surfaceAjax = $.ajax({
            type: "GET",
            url: domain + "lens_brand_list!getSurfaceDesignList.shtml",
            data: {
                "type_value": "0",
                "prod_brand": json.prod_brand,
                "big_prod_series": decodeURI(json.big_prod_series),
                "lens_refra_index":lens_refra_index
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                surfaceDOM.find("p").empty();
                var list = data.data.surface_design_list;
                for(var l=0;l<list.length;l++){
                    if(list[l]!=""){
                        surfaceDOM.find("p").append('<a><b data-value='+list[l].dict_value+'>'+list[l].dict_label+'</b></a>');
                    }
                }

                //css操作
                surfaceDOM.find("p").children().first().addClass("on");
                surfaceDOM.find("a").unbind("click").click(function(){
                    $(this).parent().find("a").removeClass("on");
                    $(this).addClass("on");
                    lens_type = $(this).find("b").attr("data-value");
                    layerAjax.abort();
                    layer();
                    metricBt.hide();
                });


                lens_type =  surfaceDOM.find("p").children().first().find("b").attr("data-value");
                layer();
                spanCss();
            },
            error: function () {
                goodName.html("");
                metricBt.hide();
                surfaceDOM.hide();
            }
        });
    }

    function layer(){
        layerAjax = $.ajax({
            type: "GET",
            url: domain + "lens_brand_list!getProdFilmList.shtml",
            data: {
                "type_value": "0",
                "prod_brand": json.prod_brand,
                "big_prod_series": decodeURI(json.big_prod_series),
                "lens_refra_index": lens_refra_index,
                "lens_type":lens_type
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                layerDOM.find("p").empty();
                var list = null;
                if(data.data.prod_film_list.indexOf(",")) {
                    list = data.data.prod_film_list.split(",");
                }else {
                    list = data.data.prod_film_list;
                }
                for(var l=0;l<list.length;l++){
                    if(list[l]!=""){
                        layerDOM.find("p").append('<a><b>'+list[l]+'</b></a>');
                    }
                }

                //css操作
                prod_passageway = "";
                layerDOM.find("p").children().first().addClass("on");
                layerDOM.find("a").unbind("click").click(function(){
                    $(this).parent().find("a").removeClass("on");
                    $(this).addClass("on");
                    prod_film = $(this).find("b").html();
                    if(lens_type=="4"){
                        gradual = 1;
                        channelAjax.abort();
                        channel();
                    }else {
                        gradual = 0;
                        channelDOM.hide();
                        goodsInfoAjax.abort();
                        goodsInfo();
                    }
                    metricBt.hide();
                });
                prod_film = layerDOM.find("p").children().first().find("b").html();
                if(lens_type=="4"){
                    gradual = 1;
                    channel();
                }else {
                    gradual = 0;
                    channelDOM.hide();
                    goodsInfo();
                }
                spanCss();
            },
            error: function () {
                goodName.html("");
                metricBt.hide();
                layerDOM.hide();
            }
        });
    }

    function channel(){
        channelAjax = $.ajax({
            type: "GET",
            url: domain + "lens_brand_list!getProdPassagewayList.shtml",
            data: {
                "type_value": "0",
                "prod_brand": json.prod_brand,
                "big_prod_series": decodeURI(json.big_prod_series),
                "lens_refra_index": lens_refra_index,
                "lens_type": lens_type,
                "prod_film":prod_film
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.data.prod_passageway_list) {

                    channelDOM.show();
                    channelDOM.find("p").empty();
                    var list = null;
                    if (data.data.prod_passageway_list.indexOf(",")) {
                        list = data.data.prod_passageway_list.split(",");
                    } else {
                        list = data.data.prod_passageway_list;
                    }
                    for (var l = 0; l < list.length; l++) {
                        if(list[l]!=""){
                            channelDOM.find("p").append('<a><b>' + list[l] + '</b></a>');
                        }
                    }

                    //css操作
                    channelDOM.find("p").children().first().addClass("on");
                    channelDOM.find("a").unbind("click").click(function () {
                        goodsInfoAjax.abort();
                        $(this).parent().find("a").removeClass("on");
                        $(this).addClass("on");
                        prod_passageway = $(this).find("b").html();
                        goodsInfo();
                        metricBt.hide();
                    });
                    prod_passageway = channelDOM.find("p").children().first().find("b").html();
                    goodsInfo();
                    spanCss();
                }else {
                    channelDOM.hide();
                    goodsInfo();
                }
                spanCss();
            },
            error: function () {
                goodName.html("");
                metricBt.hide();
                channelDOM.hide();
            }
        });
    }


    //获取商品名和ID
    function goodsInfo(){
        goodsInfoAjax = $.ajax({
            type: "GET",
            url: domain + "lens_brand_list!getProdInfo.shtml",
            data: {
                "type_value": "0",
                "prod_brand": json.prod_brand,
                "big_prod_series": decodeURI(json.big_prod_series),
                "lens_refra_index": lens_refra_index,
                "lens_type": lens_type,
                "prod_film": prod_film,
                "prod_passageway":prod_passageway
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {

                console.log(data);
                if(!data.data.product_list){
                    goodName.html("");
                    metricBt.hide();
                }else {
                    metricBt.show();
                    var obj = data.data.product_list;
                    var allName = "";
                    ulLi.find(".on").each(function(){
                        allName += $(this).find("b").html();
                    });
                    goodName.html(obj[0].prod_name);
                    prod_id = obj[0].prod_id;
                    prod_id_2 = "";
                    if(obj.length>1){
                        prod_id_2 = obj[1].prod_id;
                    }
                }
            },
            error: function () {
                goodName.html("");
                metricBt.hide();
            }
        });
    }

    metricBt.click(function(){
        if(gradual==0){
            window.location.href = "metric.html?prod_id_1="+prod_id+"&prod_id_2="+prod_id_2+"&pro_name="+goodName.html();
        }else {
            window.location.href = "gradualMetric.html?prod_id_1="+prod_id+"&prod_id_2="+prod_id_2+"&pro_name="+goodName.html();
        }
    });
})();