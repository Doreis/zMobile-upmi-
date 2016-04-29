/**
 * Created by lianglong on 16/3/23.
 */
(function(){
    var metricPopContUl = $(".metricPopContUl"),
        metricPopContUlC = $(".metricPopContUl ul"),
        metric1 = $(".metric1"),
        metric2 = $(".metric2"),
        metric3 = $(".metric3"),
        metric4 = $(".metric4"),
        qiuJ = $(".qiuJ"),
        zhuJ = $(".zhuJ"),
        metricPop = $(".metricPop"),
        metricPopBack = $(".metricPopBack"),
        metricPopCont = $(".metricPopCont"),
        confirm = $(".confirm"),
        popClose = $(".popClose"),
        addButton = $(".addButton"),
        notMetricContUl = $(".notMetricCont ul"),
        abortRemove = $(".abortRemove"),
        confirmRemove = $(".confirmRemove"),
        removePop = $(".removePop"),
        totalMoney = $(".totalMoney"),
        addCart = $(".addCart"),
        loading = $(".loading");


    var single = $(".single"),
        dyeing = $(".dyeing"),
        qiuJR = $(".qiuJR"),
        zhuJR = $(".zhuJR"),
        qiuJL = $(".qiuJL"),
        zhuJL = $(".zhuJL");

    var json = changeJson();

    var metricPopContUlH = null,
        qiuJFirst = false,
        zhuJFirst = false,
        sph_degree = 0,
        cyl_degree = 0,
        firstH = false,
        canScroll = false,
        chooseNll = 0;


    var thisCartId = "",
        thisProd_id = "";


    var modifyMetricUl = $(".modifyMetric ul");

    DomClick();
    function DomClick(){

        single = $(".single");
            dyeing = $(".dyeing");
            qiuJR = $(".qiuJR");
            zhuJR = $(".zhuJR");
            qiuJL = $(".qiuJL");
            zhuJL = $(".zhuJL");
        qiuJ = $(".qiuJ");
            zhuJ = $(".zhuJ");

        qiuJ.unbind("click").click(function(){
            var _that = $(this);
            qiuF(_that);
            metricPop.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });
        zhuJ.unbind("click").click(function(){
            var _that = $(this);
            sph_degree = $(this).parent().parent().find(qiuJ).val();
            zhuJF(_that);
            metricPop.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });
        qiuJR.unbind("click").click(function(){
            var _that = $(this);
            qiuF(_that);
            metricPop.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });

        qiuJL.unbind("click").click(function(){
            var _that = $(this);
            qiuF(_that);
            metricPop.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });

        zhuJR.unbind("click").click(function(){
            var _that = $(this);
            sph_degree = $(this).parent().parent().find(qiuJR).val();
            zhuJF(_that);
            metricPop.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });

        zhuJL.unbind("click").click(function(){
            var _that = $(this);
            sph_degree = $(this).parent().parent().find(qiuJL).val();
            zhuJF(_that);
            metricPop.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });




        $(".singleN").keydown(function(){
            proInfo();
        });

        $(".RNumber").keydown(function(){
            proInfo();
        });

        $(".LNumber").keydown(function(){
            proInfo();
        });


    }



    popClose.click(function(){
        var _that = $(this);
        qiuF(_that);
        metricPop.animate({bottom:"-400px"},300);
        metricPopBack.fadeOut(300);
    });



    $.ajax({
        type: "GET",
        url: domain + "lens_cart!getCartItemInfo.shtml",
        data: {"cart_id": json.cart_id,"prod_id":json.prod_id},
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
                thisCartId = data.data.cart_id;
                thisProd_id = data.data.prod_id;
                notMetricContUl.empty();
                for(var i=0;i<data.data.jsonData.length;i++){
                    if(data.data.jsonData[i].l_cyl_degree){
                        notMetricContUl.append('<li>'+
                            '<div class="single firstSingle">'+
                            '<p>'+
                            '<span>数量</span>'+
                            '<input type="text" value="1" class="singleN"/>'+
                            '</p>'+
                            '<p>'+
                            '<span>球镜</span>'+
                            '<input type="text" value="0.0" readonly class="qiuJ"/>'+
                            '</p>'+
                            '<p>'+
                            '<span>柱镜</span>'+
                            '<input type="text" value="0.0" readonly class="zhuJ"/>'+
                            '</p>'+
                            '</div>'+
                            '<div class="dyeing chooseOn">'+
                            '<div class="dyeingChoose">'+
                            '<p>R</p>'+
                            '<a>'+
                            '<span>'+
                            '<b>数量</b>'+
                            '<input class="RNumber" value='+data.data.jsonData[i].r_total+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>球镜</b>'+
                            '<input class="qiuJR" readonly value='+data.data.jsonData[i].r_sph_degree+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>柱镜</b>'+
                            '<input class="zhuJR" readonly value='+data.data.jsonData[i].r_cyl_degree+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>轴向</b>'+
                            '<input class="r_axial" value='+data.data.jsonData[i].r_axial+'>'+
                            '</span>'+
                            '</a>'+
                            '</div>'+
                            '<div class="dyeingChoose">'+
                            '<p>L</p>'+
                            '<a>'+
                            '<span>'+
                            '<b>数量</b>'+
                            '<input class="LNumber" value='+data.data.jsonData[i].l_total+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>球镜</b>'+
                            '<input class="qiuJL" readonly value='+data.data.jsonData[i].l_sph_degree+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>柱镜</b>'+
                            '<input class="zhuJL" readonly value='+data.data.jsonData[i].l_cyl_degree+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>轴向</b>'+
                            '<input class="l_axial" value='+data.data.jsonData[i].l_axial+'>'+
                            '</span>'+
                            '</a>'+
                            '</div>'+

                            '<div class="dyeingOther">'+
                            '<span>'+
                            '<b>瞳距</b>'+
                            '<input class="r_far_ipd" value='+data.data.jsonData[i].r_far_ipd+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>瞳高</b>'+
                            '<input class="r_high_pupil" value='+data.data.jsonData[i].r_high_pupil+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>最大对角长</b>'+
                            '<input class="frame_max_dia_length" value='+data.data.jsonData[i].frame_max_dia_length+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>镜宽</b>'+
                            '<input class="frame_width" value='+data.data.jsonData[i].frame_width+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>镜高</b>'+
                            '<input class="frame_height" value='+data.data.jsonData[i].frame_height+'>'+
                            '</span>'+
                            '<span>'+
                            '<b>梁宽</b>'+
                            '<input class="frame_bridge_size" value='+data.data.jsonData[i].frame_bridge_size+'>'+
                            '</span>'+
                            '</div>'+
                            '</div>'+
                            '</li>');
                    }else {
                        notMetricContUl.append('<li>'+
                            '<div class="single chooseOn firstSingle">'+
                            '<p>'+
                            '<span>数量</span>'+
                            '<input type="text"  value='+data.data.jsonData[i].r_total+' class="singleN"/>'+
                            '</p>'+
                            '<p>'+
                            '<span>球镜</span>'+
                            '<input type="text"  value='+data.data.jsonData[i].r_sph_degree+' readonly class="qiuJ"/>'+
                            '</p>'+
                            '<p>'+
                            '<span>柱镜</span>'+
                            '<input type="text"  value='+data.data.jsonData[i].r_cyl_degree+' readonly class="zhuJ"/>'+
                            '</p>'+
                            '</div>'+
                            '<div class="dyeing">'+
                            '<div class="dyeingChoose">'+
                            '<p>R</p>'+
                            '<a>'+
                            '<span>'+
                            '<b>数量</b>'+
                            '<input class="RNumber" value="1">'+
                            '</span>'+
                            '<span>'+
                            '<b>球镜</b>'+
                            '<input class="qiuJR" readonly>'+
                            '</span>'+
                            '<span>'+
                            '<b>柱镜</b>'+
                            '<input class="zhuJR" readonly>'+
                            '</span>'+
                            '<span>'+
                            '<b>轴向</b>'+
                            '<input class="r_axial">'+
                            '</span>'+
                            '</a>'+
                            '</div>'+
                            '<div class="dyeingChoose">'+
                            '<p>L</p>'+
                            '<a>'+
                            '<span>'+
                            '<b>数量</b>'+
                            '<input class="LNumber" value="1">'+
                            '</span>'+
                            '<span>'+
                            '<b>球镜</b>'+
                            '<input class="qiuJL" readonly>'+
                            '</span>'+
                            '<span>'+
                            '<b>柱镜</b>'+
                            '<input class="zhuJL" readonly>'+
                            '</span>'+
                            '<span>'+
                            '<b>轴向</b>'+
                            '<input class="l_axial">'+
                            '</span>'+
                            '</a>'+
                            '</div>'+

                            '<div class="dyeingOther">'+
                            '<span>'+
                            '<b>瞳距</b>'+
                            '<input class="r_far_ipd">'+
                            '</span>'+
                            '<span>'+
                            '<b>瞳高</b>'+
                            '<input class="r_high_pupil">'+
                            '</span>'+
                            '<span>'+
                            '<b>最大对角长</b>'+
                            '<input class="frame_max_dia_length">'+
                            '</span>'+
                            '<span>'+
                            '<b>镜宽</b>'+
                            '<input class="frame_width">'+
                            '</span>'+
                            '<span>'+
                            '<b>镜高</b>'+
                            '<input class="frame_height">'+
                            '</span>'+
                            '<span>'+
                            '<b>梁宽</b>'+
                            '<input class="frame_bridge_size">'+
                            '</span>'+
                            '</div>'+
                            '</div>'+
                            '<div class="button addButton"></div>'+
                            '</li>');
                    }
                }
                modifyMetricUl.find("input").each(function(){
                   if($(this).val()==undefined||$(this).val()=="undefined"){
                       $(this).val("");
                   }
                });
                proInfo();
                DomClick();
            }
        }
    });



    function qiuF(_that){
        $.ajax({
            type: "GET",
            url: domain + "lens_product!getSphValueList.shtml",
            data: {"prod_id_1": thisProd_id},
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

                    console.log(data);


                    var data0 = data.data[".0"].split(",");
                    var data2 = data.data[".2"].split(",");
                    var data5 = data.data[".5"].split(",");
                    var data7 = data.data[".7"].split(",");
                    metric1.empty();
                    metric2.empty();
                    metric3.empty();
                    metric4.empty();
                    for(var i=0;i<data0.length;i++){
                        metric1.append('<li>'+data0[i]+'</li>');
                    }

                    for(var ii=0;ii<data2.length;ii++){
                        metric2.append('<li>'+data2[ii]+'</li>');
                    }

                    for(var iii=0;iii<data5.length;iii++){
                        metric3.append('<li>'+data5[iii]+'</li>');
                    }

                    for(var iiii=0;iiii<data7.length;iiii++){
                        metric4.append('<li>'+data7[iiii]+'</li>');
                    }



                    metricPopContUl.find("li").css({
                        "height":metricPopContUlH,
                        "line-height":metricPopContUlH+"px"
                    });

                    metricPopContUl.find("ul").each(function(){
                        var that = $(this);
                        that.find("li").each(function(index){
                            var thatL = _that?_that:qiuJ;
                            if($(this).html()==thatL.val()){
                                that.find("li").removeClass("textOn");
                                $(this).addClass("textOn");
                                $(this).parent().scrollTop(metricPopContUlH*index);
                                canScroll = true;
                                metricPopContUl.removeClass("on");
                                that.parent().parent().addClass("on");
                            }
                        });
                    });

                    setTimeout(dingWe,0);

                    confirm.unbind("click").click(function(){
                        metricPopContUl.each(function(){
                           if($(this).hasClass("on")){
                               _that.val($(this).find(".textOn").html());
                               metricPop.animate({bottom:"-400px"},300);
                               metricPopBack.fadeOut(300);
                               canScroll = false;
                           }
                        });
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
                data: {"prod_id": thisProd_id,"sph_degree":sph_degree},
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
                        for(var i=0;i<data0.length;i++){
                            metric1.append('<li>'+data0[i]+'</li>');
                        }

                        for(var ii=0;ii<data2.length;ii++){
                            metric2.append('<li>'+data2[ii]+'</li>');
                        }

                        for(var iii=0;iii<data5.length;iii++){
                            metric3.append('<li>'+data5[iii]+'</li>');
                        }

                        for(var iiii=0;iiii<data7.length;iiii++){
                            metric4.append('<li>'+data7[iiii]+'</li>');
                        }



                    metricPopContUl.find("li").css({
                        "height":metricPopContUlH,
                        "line-height":metricPopContUlH+"px"
                    });

                    metricPopContUl.find("ul").each(function(){
                        var that = $(this);
                        that.find("li").each(function(index){
                            var thatL = _that?_that:zhuJ;
                            if($(this).html()==thatL.val()){
                                that.find("li").removeClass("textOn");
                                $(this).addClass("textOn");
                                $(this).parent().scrollTop(metricPopContUlH*index);
                                canScroll = true;
                                metricPopContUl.removeClass("on");
                                that.parent().parent().addClass("on");
                            }else {

                            }
                        });
                    });


                    setTimeout(dingWe,0);

                    confirm.unbind("click").click(function(){
                        metricPopContUl.each(function(){
                            if($(this).hasClass("on")){
                                _that.val($(this).find(".textOn").html());
                                metricPop.animate({bottom:"-400px"},300);
                                metricPopBack.fadeOut(300);
                                canScroll = false;
                                cyl_degree = $(this).find(".textOn").html();
                                proInfo(_that);
                            }
                        });
                    });
                }
            });
        }
    }



    function dingWe(){
        if(!firstH){
            metricPopContUlH = $(".metricChoose img").height();
            firstH = true;
        }

        metricPopContUl.find("li").css({
            "height":metricPopContUlH,
            "line-height":metricPopContUlH+"px"
        });
    }





    metricPopContUlC.on('scroll',function(){
        var _this = $(this);
        _this.find("li").removeClass("textOn");
        _this.find("li").eq(parseInt($(this).scrollTop()/(metricPopContUlH))).addClass("textOn");
        $("body").unbind("touchend").on("touchend",function(){
            _this.find("li").each(function(index){
                if($(this).hasClass("textOn")){
                    _this.animate({scrollTop:index*metricPopContUlH});
                }
            });
        });
    });


    metricPopContUl.on("touchstart",function(){
        metricPopContUl.removeClass("on");
        $(this).addClass("on");
    });





    var chooseOnA = [],
        more_prod_info = [],
        totalNumber = 0,
        totalM = 0;



    function proInfo(_that){
        chooseOnA = [];
        more_prod_info = [];
        totalNumber = 0;
        totalM = 0;
        $.ajax({
            type: "GET",
            url: domain + "lens_product!getLensProductInfoBySphCyl.shtml",
            data: {"prod_id_1": thisProd_id, "sph_degree": sph_degree,"cyl_degree":cyl_degree},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);

                if(_that){
                    if(_that.attr("class").toString().indexOf("R")>0||_that.attr("class").toString().indexOf("L")>0){
                        if(data.data.isFix==0){//
                            _that.parent().parent().addClass("isSingle");
                        }
                        if(data.data.isFix==1){//左右其中一个是定制,已定制的为准
                            _that.parent().parent().parent().parent().attr({
                                "proId":data.data.prod_id,
                                "price":data.data.market_price,
                                "isFix":data.data.isFix
                            });
                        }
                        if(_that.parent().parent().parent().parent().find(".isSingle").length==2){
                            _that.parent().parent().parent().parent().parent().find(".dyeing").removeClass("chooseOn");
                            _that.parent().parent().parent().parent().parent().find(".single").addClass("chooseOn");
                            _that.parent().parent().parent().parent().parent().find(".single").find(".zhuJ").val("0.0");
                        }
                    }else {
                        if(data.data.isFix==1){//
                            qiuJR.val(_that.parent().parent().find(".qiuJ").val());
                            zhuJR.val(_that.val());
                            qiuJL.val(_that.parent().parent().find(".qiuJ").val());
                            zhuJL.val(_that.val());
                            _that.parent().parent().parent().find(".single").removeClass("chooseOn");
                            _that.parent().parent().parent().find(".dyeing").addClass("chooseOn");
                            _that.parent().parent().parent().find(".dyeing").attr({
                                "proId":data.data.prod_id,
                                "price":data.data.market_price,
                                "isFix":data.data.isFix
                            });
                        }else {
                            _that.parent().parent().parent().find(".single").attr({
                                "proId":data.data.prod_id,
                                "price":data.data.market_price,
                                "isFix":data.data.isFix
                            });
                        }
                    }
                }else {
                    $(".firstSingle").attr({
                        "proId":data.data.prod_id,
                        "price":data.data.market_price,
                        "isFix":data.data.isFix
                    });
                }



                $(".chooseOn").each(function(){
                    chooseOnA.push($(this));
                });



                for(var a=0;a<chooseOnA.length;a++){
                    var jsonData = [];
                    totalNumber = 0;
                    totalM = 0;
                    if(chooseOnA[a].hasClass("single")){
                        jsonData.push({
                            "r_sph_degree":chooseOnA[a].find(".qiuJ").val(),
                            "r_cyl_degree":chooseOnA[a].find(".zhuJ").val(),
                            "r_total":chooseOnA[a].find(".singleN").val()
                        });
                        totalNumber += parseInt(chooseOnA[a].find(".singleN").val());
                        totalM += parseInt(chooseOnA[a].find(".singleN").val())*parseFloat(chooseOnA[a].attr("price"));
                        console.log("totalM===="+totalM);

                    }else {
                        jsonData.push({
                            "r_sph_degree":chooseOnA[a].find(".qiuJR").val(),
                            "r_cyl_degree":chooseOnA[a].find(".zhuJR").val(),
                            "r_axial":chooseOnA[a].find(".r_axial").val(),
                            "l_sph_degree":chooseOnA[a].find(".qiuJL").val(),
                            "l_cyl_degree":chooseOnA[a].find(".zhuJL").val(),
                            "l_axial":chooseOnA[a].find(".l_axial").val(),
                            "r_far_ipd":chooseOnA[a].find(".r_far_ipd").val(),
                            "r_high_pupil":chooseOnA[a].find(".r_high_pupil").val(),
                            "frame_max_dia_length":chooseOnA[a].find(".frame_max_dia_length").val(),
                            "frame_width":chooseOnA[a].find(".frame_width").val(),
                            "frame_height":chooseOnA[a].find(".frame_height").val(),
                            "frame_bridge_size":chooseOnA[a].find(".frame_bridge_size").val(),
                            "r_total":chooseOnA[a].find(".RNumber").val(),
                            "l_total":chooseOnA[a].find(".LNumber").val()
                        });
                        totalNumber += parseInt(chooseOnA[a].find(".RNumber").val())+parseInt(chooseOnA[a].find(".LNumber").val());
                        totalM += (parseInt(chooseOnA[a].find(".RNumber").val())+parseInt(chooseOnA[a].find(".LNumber").val()))*parseFloat(chooseOnA[a].attr("price"));
                        console.log("totalM===="+totalM);

                    }
                    for(var b=a+1;b<chooseOnA.length;b++){
                        if(chooseOnA[b].attr("proId")==chooseOnA[a].attr("proId")){
                            if(chooseOnA[b].hasClass("single")){
                                jsonData.push({
                                    "r_sph_degree":chooseOnA[b].find(".qiuJ").val(),
                                    "r_cyl_degree":chooseOnA[b].find(".zhuJ").val(),
                                    "r_total":chooseOnA[b].find(".singleN").val()
                                });
                                totalNumber += parseInt(chooseOnA[b].find(".singleN").val());
                                totalM += parseInt(chooseOnA[b].find(".singleN").val())*parseFloat(chooseOnA[b].attr("price"));
                                console.log("totalM===="+totalM);

                            }else {
                                jsonData.push({
                                    "r_sph_degree":chooseOnA[b].find(".qiuJR").val(),
                                    "r_cyl_degree":chooseOnA[b].find(".zhuJR").val(),
                                    "r_axial":chooseOnA[b].find(".r_axial").val(),
                                    "l_sph_degree":chooseOnA[b].find(".qiuJL").val(),
                                    "l_cyl_degree":chooseOnA[b].find(".zhuJL").val(),
                                    "l_axial":chooseOnA[b].find(".l_axial").val(),
                                    "r_far_ipd":chooseOnA[b].find(".r_far_ipd").val(),
                                    "r_high_pupil":chooseOnA[b].find(".r_high_pupil").val(),
                                    "frame_max_dia_length":chooseOnA[b].find(".frame_max_dia_length").val(),
                                    "frame_width":chooseOnA[b].find(".frame_width").val(),
                                    "frame_height":chooseOnA[b].find(".frame_height").val(),
                                    "frame_bridge_size":chooseOnA[b].find(".frame_bridge_size").val(),
                                    "r_total":chooseOnA[b].find(".RNumber").val(),
                                    "l_total":chooseOnA[b].find(".LNumber").val()
                                });
                                totalNumber += parseInt(chooseOnA[b].find(".RNumber").val())+parseInt(chooseOnA[b].find(".LNumber").val());
                                totalM += (parseInt(chooseOnA[b].find(".RNumber").val())+parseInt(chooseOnA[b].find(".LNumber").val()))*parseFloat(chooseOnA[b].attr("price"));
                                console.log("totalM===="+totalM);

                            }
                            chooseOnA.splice(b,1);
                        }
                    }
                    console.log("totalNumber2===="+totalNumber);
                    more_prod_info.push({
                        "prod_id":chooseOnA[a].attr("proId"),
                        "isFix":chooseOnA[a].attr("isFix"),
                        "total":""+totalNumber+"",
                        "jsonData":jsonData
                    });
                }
                console.log(more_prod_info);
                console.log("totalM===="+totalM);
                totalMoney.html(totalM);
            }
        });
    }



    addCart.click(function(){
        var addJSON = {};
        for(var i=0;i<more_prod_info.length;i++){
            addJSON += more_prod_info[i];
        }

        loading.show();

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
                    alert("加入购物车成功!");
                }
            }
        });
    })




})();