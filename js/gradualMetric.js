/**
 * Created by lianglong on 16/3/29.
 */
(function(){
    var qiuJR = $(".qiuJR"),
        zhuJR = $(".zhuJR"),
        qiuJL = $(".qiuJL"),
        zhuJL = $(".zhuJL"),
        metricPop = $(".metricPop"),
        metricPopBack = $(".metricPopBack"),
        metricPopCont = $(".metricPopCont"),
        popClose = $(".popClose"),
        metricPopContUl = $(".metricPopContUl"),
        metricPopContUlC = $(".metricPopContUl ul"),
        metric1 = $(".metric1"),
        metric2 = $(".metric2"),
        metric3 = $(".metric3"),
        metric4 = $(".metric4"),
        confirm = $(".confirm"),
        totalMoney = $(".totalMoney"),
        rightNumber = $("#rightNumber"),
        leftNumber = $("#leftNumber"),
        addCart = $(".addCart"),
        loading = $(".loading"),
        allAxial = $(".allAxial"),
        gradualIn = $(".gradual input"),
        numberInput = $(".numberInput"),
        under_can_light = $(".under_can_light"),
        choosePopContLi = $(".choosePopCont li"),
        choosePopCont = $(".choosePopCont"),
        choosePop = $(".choosePop"),
        choosePopBt = $(".choosePopBt"),
        choosePopCont1 = $(".choosePopCont1"),
        choosePopCont2 = $(".choosePopCont2"),
        metric11 = $(".metric11"),
        metric22 = $(".metric22"),
        metric33 = $(".metric33"),
        metric44 = $(".metric44"),
        glassInput = $(".glassInput"),
        removePopContinue = $(".removePopContinue");

    var json = changeJson();
    document.title = decodeURI(json.pro_name);

    var metricPopContUlH = null,
        qiuJFirst = false,
        zhuJFirst = false,
        sph_degree = "",
        cyl_degree = "+0.00",
        firstH = false,
        canScroll = false,
        defaultMet = "+0.00",
        defaultMetZhuJ = "+0.00";





    qiuJR.unbind("click").click(function(){
        var _that = $(this);
        qiuF(_that);
        choosePop.scrollTop(0);
        choosePop.animate({bottom:0},300);
        choosePopBt.animate({bottom:0},300);
        metricPopBack.fadeIn(300);
    });

    qiuJL.unbind("click").click(function(){
        var _that = $(this);
        qiuF(_that);
        choosePop.scrollTop(0);
        choosePop.animate({bottom:0},300);
        choosePopBt.animate({bottom:0},300);
        metricPopBack.fadeIn(300);
    });

    zhuJR.unbind("click").click(function(){
        var _that = $(this);
        sph_degree = $(this).parent().parent().find(qiuJR).val();
        if(sph_degree){
            zhuJF(_that);
            choosePop.scrollTop(0);
            choosePop.animate({bottom:0},300);
            choosePopBt.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        }else {
            alert("请先选择球镜的光度!");
        }

    });

    zhuJL.unbind("click").click(function(){
        var _that = $(this);
        sph_degree = $(this).parent().parent().find(qiuJL).val();
        if(sph_degree) {
            zhuJF(_that);
            choosePop.scrollTop(0);
            choosePop.animate({bottom: 0}, 300);
            choosePopBt.animate({bottom: 0}, 300);
            metricPopBack.fadeIn(300);
        }else {
            alert("请先选择球镜的光度!");
        }
    });




    function qiuF(_that){
        $.ajax({
            type: "GET",
            url: domain + "lens_product!getSphValueList.shtml",
            data: {"prod_id_1": json.prod_id_1},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if(data.code!=0){
                    window.location.href = "login.html";
                }else {



                    var data0 = data.data[".0"].split(",");
                    var data2 = data.data[".2"].split(",");
                    var data5 = data.data[".5"].split(",");
                    var data7 = data.data[".7"].split(",");
                    metric1.empty();
                    metric2.empty();
                    metric3.empty();
                    metric4.empty();
                    metric11.empty();
                    metric22.empty();
                    metric33.empty();
                    metric44.empty();
                    metric11.append('<li><b>0.00</b></li>');
                    for(var i=0;i<data0.length;i++){
                        if(data0[i].indexOf("-")<0){
                            metric1.append('<li><b>'+data0[i]+'</b></li>');
                        }else {
                            metric11.append('<li><b>'+data0[i]+'</b></li>');
                        }
                    }

                    metric1.children().first().css("color","transparent");

                    for(var ii=0;ii<data2.length;ii++){
                        if(data2[ii].indexOf("-")<0){
                            metric2.append('<li><b>'+data2[ii]+'</b></li>');
                        }else {
                            metric22.append('<li><b>'+data2[ii]+'</b></li>');
                        }
                    }

                    for(var iii=0;iii<data5.length;iii++){
                        if(data5[iii].indexOf("-")<0){
                            metric3.append('<li><b>'+data5[iii]+'</b></li>');
                        }else {
                            metric33.append('<li><b>'+data5[iii]+'</b></li>');
                        }
                    }

                    for(var iiii=0;iiii<data7.length;iiii++){
                        if(data7[iiii].indexOf("-")<0){
                            metric4.append('<li><b>'+data7[iiii]+'</b></li>');
                        }else {
                            metric44.append('<li><b>'+data7[iiii]+'</b></li>');
                        }
                    }





                        choosePopContLi = $(".choosePopCont li");


                    if(!_that.hasClass("qiuJFirstC")){
                        choosePopContLi.each(function(){
                            if($(this).find("b").html()=="-3.00"){
                                $(this).addClass("on");
                            }
                        });
                        _that.addClass("qiuJFirstC");
                    }


                    choosePopContLi.each(function(){
                            if($(this).find("b").html()==_that.val()){
                                choosePopContLi.removeClass("on");
                                $(this).addClass("on");
                            }
                        });

                    choosePopCont1.find("ul").height(choosePopCont1.height());
                    choosePopCont2.find("ul").height(choosePopCont2.height());

                    choosePopCont2.show();
                    choosePopContLi.click(function(){
                            choosePopContLi.removeClass("on");
                            $(this).addClass("on");
                        });


                    if(choosePop.find(".on").parent().parent().hasClass("choosePopCont2")){
                        choosePop.scrollTop(choosePopCont1.height()-80);
                    }else {
                        choosePop.scrollTop(0);
                    }

                        confirm.unbind("click").click(function(){
                            var hasChooseClick = false;
                            choosePopContLi.each(function(){
                                if($(this).hasClass("on")){
                                    _that.val($(this).find("b").html());
                                    sph_degree = $(this).find("b").html();
                                    hasChooseClick = true;
                                    _that.parent().next().find("input").val("");
                                    cyl_degree = "+0.00";
                                    if(_that.hasClass("qiuJR")){
                                        if(rightNumber.val()==0){
                                            rightNumber.val("1");
                                        }
                                    }else {
                                        if(leftNumber.val()==0){
                                            leftNumber.val("1");
                                        }
                                    }
                                }
                            });
                            if(hasChooseClick){
                                choosePop.animate({bottom:"-100%"},300);
                                choosePopBt.animate({bottom:"-100%"},300);
                                metricPopBack.fadeOut(300);
                                if(sph_degree&&cyl_degree){
                                    proInfo(_that);
                                }
                            }else {
                                alert("请选择光度!");
                            }
                        });
                }
            }
        });
    }



    function zhuJF(_that){
        if(sph_degree){
            $.ajax({
                type: "GET",
                url: domain + "lens_product!getCylValueList.shtml",
                data: {"prod_id": json.prod_id_1,"sph_degree":sph_degree},
                dataType: 'json',
                contentType: "text/plain; charset=utf-8",
                cache: false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    console.log(data);

                        var data0 = data.data[".0"].split(",");
                        var data2 = data.data[".2"].split(",");
                        var data5 = data.data[".5"].split(",");
                        var data7 = data.data[".7"].split(",");
                        metric1.empty();
                        metric2.empty();
                        metric3.empty();
                        metric4.empty();
                    metric11.empty();
                    metric22.empty();
                    metric33.empty();
                    metric44.empty();
                        for(var i=0;i<data0.length;i++){
                            metric1.append('<li><b>'+data0[i]+'</b></li>');
                        }

                        for(var ii=0;ii<data2.length;ii++){
                            metric2.append('<li><b>'+data2[ii]+'</b></li>');
                        }

                        for(var iii=0;iii<data5.length;iii++){
                            metric3.append('<li><b>'+data5[iii]+'</b></li>');
                        }

                        for(var iiii=0;iiii<data7.length;iiii++){
                            metric4.append('<li><b>'+data7[iiii]+'</b></li>');
                        }



                        choosePopContLi = $(".choosePopCont li");

                        choosePopContLi.each(function(){
                            if($(this).find("b").html()==_that.val()){
                                choosePopContLi.removeClass("on");
                                $(this).addClass("on");
                            }
                        });
                    choosePopCont1.find("ul").css("height","auto");

                    choosePopCont2.hide();


                    choosePopContLi.click(function(){
                            choosePopContLi.removeClass("on");
                            $(this).addClass("on");
                        });

                        confirm.unbind("click").click(function(){
                            var hasChooseClick = false;
                            choosePopContLi.each(function(){
                                if($(this).hasClass("on")){
                                    _that.val($(this).find("b").html());
                                    cyl_degree = $(this).find("b").html();
                                    choosePop.animate({bottom:"-100%"},300);
                                    choosePopBt.animate({bottom:"-100%"},300);
                                    metricPopBack.fadeOut(300);
                                    _that.parent().next().find("input").addClass("axialMust");
                                    proInfo(_that);
                                    hasChooseClick = true;
                                }
                            });
                            if(!hasChooseClick){
                                alert("请选择光度!");
                            }
                        });

                }
            });
        }
    }





    var unitPrice = 0,
        finalProdId = "",
        totalNumber = 0,
        thisCanBy = false;

    //确定唯一prodID
    function proInfo(_that){
        thisCanBy = false;
        $.ajax({
            type: "GET",
            url: domain + "lens_product!getLensProductInfoBySphCyl.shtml",
            data: {
                "prod_id_1": json.prod_id_1,
                "sph_degree": sph_degree,
                "prod_id_2": json.prod_id_2,
                "cyl_degree": cyl_degree
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);
                if(data.data.market_price){
                    unitPrice = data.data.market_price;
                    totalMoney.html(unitPrice*(parseInt(rightNumber.val())+parseInt(leftNumber.val())));
                    finalProdId = data.data.prod_id;
                    thisCanBy = true;
                }else {
                    alert("该光度无商品!");
                    if(_that.attr("class").indexOf("qiuJ")>=0){
                        _that.val("");
                        _that.parent().next().find("input").val("");
                        if(_that.attr("class").indexOf("R")>0){
                            rightNumber.val("0");
                        }else {
                            leftNumber.val("0");
                        }
                    }
                    if(_that.attr("class").indexOf("zhuJ")>=0){
                        _that.val("");
                        _that.parent().prev().find("input").val("");
                        if(_that.attr("class").indexOf("R")>0){
                            rightNumber.val("0");
                        }else {
                            leftNumber.val("0");
                        }
                    }
                    cyl_degree = "+0.00";
                }

            }
        });
    }


    rightNumber.blur(function(){
        totalMoney.html(unitPrice*(parseInt(rightNumber.val())+parseInt(leftNumber.val())));
    });

    leftNumber.blur(function(){
        totalMoney.html(unitPrice*(parseInt(rightNumber.val())+parseInt(leftNumber.val())));
    });


    addCart.click(function(){
        var canBy = true;
        canBy = checkF();
        var numberInputN = 0;
        numberInput.each(function(){
            if($(this).val()==0){
                numberInputN++;
            }
        });
        if(numberInputN==2){
            alert("请选择光度!");
        }else {
            if(canBy){
                if(thisCanBy){
                    loading.show();
                    totalNumber = parseInt(rightNumber.val())+parseInt(leftNumber.val());
                    var more_prod_info=[{
                        "prod_id":finalProdId,
                        "isFix":"1",
                        "total":""+totalNumber+"",
                        "jsonData":[{
                            "r_sph_degree":qiuJR.val(),
                            "r_cyl_degree":zhuJR.val(),
                            "r_axial":$(".r_axial").val(),
                            "r_under_can_light":$(".r_under_can_light").val(),
                            "l_sph_degree":qiuJL.val(),
                            "l_cyl_degree":zhuJL.val(),
                            "l_axial":$(".l_axial").val(),
                            "l_under_can_light":$(".l_under_can_light").val(),
                            "r_far_ipd":$(".r_far_ipd").val(),
                            "r_high_pupil":$(".r_high_pupil").val(),
                            "frame_max_dia_length":$(".frame_max_dia_length").val(),
                            "frame_width":$(".frame_width").val(),
                            "frame_height":$(".frame_height").val(),
                            "frame_bridge_size":$(".frame_bridge_size").val(),
                            "r_total":rightNumber.val(),
                            "l_total":leftNumber.val()
                        }]
                    }];
                    $.ajax({
                        type: "GET",
                        url: domain + "lens_cart!saveToCart.shtml?more_prod_info="+JSON.stringify(more_prod_info),
                        dataType: 'json',
                        contentType: "text/plain; charset=utf-8",
                        cache: false,
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (data) {
                            console.log(data);
                            if(data.data==""){

                                loading.hide();

                                removePopContinue.show();


                                $(".confirmContinue").unbind("click").click(function(){
                                    window.location.href = window.location.href;
                                });

                                $(".abortContinue").click(function(){
                                    gradualIn.val("");
                                    numberInput.val("0");
                                    window.location.href = "shopCart.html";
                                });
                            }
                        }
                    });
                }else {
                    alert("该光度无商品!");
                }

            }else {
                alert("轴位不能为空!");
            }
        }
    });

    function checkF(){
        var canBy = true;
        $(".axialMust").each(function(){
            if($(this).val()==""&&$(this).parent().prev().find("input").val()!=""){
                canBy = false;
            }
        });
        return canBy;
    }






    allAxial.keyup(function(){
        if($(this).val()>180||$(this).val()<0){
            alert("轴位的范围是0~180,请重新输入");
            $(this).val("");
            return false;
        }
        if(isNaN($(this).val())){
            $(this).val("");
            return false;
        }
    });


    $(".gradualOther input").keyup(function(){
        if($(this).val()<0){
            $(this).val("");
        }

        if(isNaN($(this).val())){
            $(this).val("");
            return false;
        }
    });

    numberInput.focus(function(){
       $(this).val("");
    });

    numberInput.blur(function(){
        if($(this).val()==""){
            $(this).val("0");
        }
    });

    $(".otherNum").keyup(function(){
       if($(this).val()>=100){
           alert("最大不能超过100!");
           $(this).val("");
           return false;
       }
    });

    numberInput.keyup(function(){
        if($(this).val()<0){
            $(this).val("");
        }
        if($(this).val().indexOf(".")>=0){
            $(this).val("");
        }
        if(isNaN($(this).val())){
            $(this).val("");
            return false;
        }
    });

    var metric1A = ["+1.00","+2.00","+3.00"],
        metric2A = ["+1.25","+2.25","+3.25"],
        metric3A = ["+1.50","+2.50","+3.50"],
        metric4A = ["+0.75","+1.75","+2.75"];

    under_can_light.click(function(){
        var _that = $(this);
        choosePop.animate({bottom:0},300);
        choosePopBt.animate({bottom:0},300);
        metricPopBack.fadeIn(300);
        metric1.empty();
        metric2.empty();
        metric3.empty();
        metric4.empty();
        choosePopCont2.hide();
        metric1.append('<li><b style="color: transparent">0.75</b></li>');
        metric2.append('<li><b style="color: transparent">0.75</b></li>');
        metric3.append('<li><b style="color: transparent">0.75</b></li>');
        for(var m1=0;m1<metric1A.length;m1++){
            metric1.append('<li><b>'+metric1A[m1]+'</b></li>');
        }
        for(var m2=0;m2<metric1A.length;m2++){
            metric2.append('<li><b>'+metric2A[m2]+'</b></li>');
        }
        for(var m3=0;m3<metric1A.length;m3++){
            metric3.append('<li><b>'+metric3A[m3]+'</b></li>');
        }
        for(var m4=0;m4<metric1A.length;m4++){
            metric4.append('<li><b>'+metric4A[m4]+'</b></li>');
        }

        choosePopContLi = $(".choosePopCont li");

        choosePopContLi.click(function(){
            choosePopContLi.removeClass("on");
            $(this).addClass("on");
        });

        choosePopContLi.each(function(){
            if($(this).find("b").html()==_that.val()){
                choosePopContLi.removeClass("on");
                $(this).addClass("on");
            }
        });

        confirm.unbind("click").click(function(){
            var hasChooseClick = false;
            choosePopContLi.each(function(){
                if($(this).hasClass("on")){
                    _that.val($(this).find("b").html());
                    choosePop.animate({bottom:"-100%"},300);
                    choosePopBt.animate({bottom:"-100%"},300);
                    metricPopBack.fadeOut(300);
                    hasChooseClick = true;
                }
            });
            if(!hasChooseClick){
                alert("请选择ADD!");
            }
        });
    });




    popClose.click(function(){
        choosePop.animate({bottom:"-100%"},300);
        choosePopBt.animate({bottom:"-100%"},300);
        metricPopBack.fadeOut(300);
        choosePopCont2.hide();
    });


})();