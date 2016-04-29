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
        removePop = $(".removePopDe"),
        totalMoney = $(".totalMoney"),
        addCart = $(".addCart"),
        loading = $(".loading"),
        allAxial = $(".allAxial"),
        notMetricContIn = $(".notMetricCont input"),
        numberInput = $(".numberInput"),
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



    var single = $(".single"),
        dyeing = $(".dyeing"),
        qiuJR = $(".qiuJR"),
        zhuJR = $(".zhuJR"),
        qiuJL = $(".qiuJL"),
        zhuJL = $(".zhuJL");

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
        defaultMetZhuJ = "+0.00",
        thisQiu = null;


    DomClick();
    function DomClick(){
        qiuJ.unbind("click").click(function(){
            var _that = $(this);
            qiuF(_that);
            choosePop.scrollTop(0);
            choosePop.animate({bottom:0},300);
            choosePopBt.animate({bottom:0},300);
            metricPopBack.fadeIn(300);
        });
        zhuJ.unbind("click").click(function(){
            var _that = $(this);
            sph_degree = $(this).parent().parent().find(qiuJ).val();
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



        notMetricContIn.keyup(function(){
            var inVal = $(this).val().toString();
            if(inVal.indexOf(".")>0){
                var inValArray = inVal.split(".");
                var pointL = inValArray[0];
                if(pointL.length>1&&pointL.substr(0,1)==0){
                    alert("请输入正确的数字");
                    $(this).val("");
                }
            }else {
                if(inVal.length>1&&inVal.substr(0,1)==0){
                    alert("请输入正确的数字");
                    $(this).val("");
                }
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

        $(".otherNum").keyup(function(e){
            if($(this).val()<0){
                $(this).val("");
            }

            if($(this).val()>=100){
                alert("最大不能超过100!");
                $(this).val("");
                return false;
            }
            if(isNaN($(this).val())){
                $(this).val("");
                return false;
            }
        });

        $(".dyeingNum").focus(function(){
           $(this).val("");
        });

        $(".dyeingNum").blur(function(){
            if($(this).val()==""){
                $(this).val("0");
            }
        });

        $(".dyeingNum").keyup(function(){
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

        addButton.unbind("click").click(function(){
            notMetricContUl.append('<li>'+
                '<div class="single chooseOn">'+
                '<p>'+
                '<span>数量</span>'+
                '<input type="text" value="1" class="singleN numberInput"/>'+
                '</p>'+
                '<p>'+
                '<span>球镜</span>'+
                '<input type="text" value="" readonly class="qiuJ"/>'+
                '</p>'+
                '<p>'+
                '<span>柱镜</span>'+
                '<input type="text" value="" readonly class="zhuJ"/>'+
                '</p>'+
                '</div>'+
                '<div class="dyeing">'+
                '<div class="dyeingChoose">'+
                '<p>R</p>'+
                '<a>'+
                '<span>'+
                '<b>数量</b>'+
                '<input class="RNumber dyeingNum" value="1" type="text">'+
                '</span>'+
                '<span>'+
                '<b>球镜</b>'+
                '<input class="qiuJR" readonly>'+
            '</span>'+
            '<span>'+
            '<b>柱镜</b>'+
            '<input class="zhuJR zhuJInputs" readonly>'+
            '</span>'+
            '<span>'+
            '<b>轴向</b>'+
            '<input class="r_axial axialMust allAxial" value="0">'+
                '</span>'+
                '</a>'+
                '</div>'+
                '<div class="dyeingChoose">'+
                '<p>L</p>'+
                '<a>'+
                '<span>'+
                '<b>数量</b>'+
                '<input class="LNumber dyeingNum" value="0" type="text">'+
                '</span>'+
                '<span>'+
                '<b>球镜</b>'+
                '<input class="qiuJL" readonly>'+
            '</span>'+
            '<span>'+
            '<b>柱镜</b>'+
            '<input class="zhuJL zhuJInputs" readonly>'+
            '</span>'+
            '<span>'+
            '<b>轴向</b>'+
            '<input class="l_axial allAxial">'+
                '</span>'+
                '</a>'+
                '</div>'+
                '<div class="dyeingOther">'+
                '<span>'+
                '<b>瞳距</b>'+
                '<input class="r_far_ipd otherNum" type="text">'+
                '</span>'+
                '<span>'+
                '<b>瞳高</b>'+
                '<input class="r_high_pupil otherNum" type="text">'+
                '</span>'+
                '<span>'+
                '<b>最大对角长</b>'+
                '<input class="frame_max_dia_length otherNum" type="text">'+
                '</span>'+
                '<span>'+
                '<b>镜宽</b>'+
                '<input class="frame_width otherNum" type="text">'+
                '</span>'+
                '<span>'+
                '<b>镜高</b>'+
                '<input class="frame_height otherNum" type="text">'+
                '</span>'+
                '<span>'+
                '<b>梁宽</b>'+
                '<input class="frame_bridge_size otherNum" type="text">'+
                '</span>'+
                '</div>'+
                '</div>'+
                '<div class="button addButton"></div>'+
                '</li>');
            $(this).addClass("reduceButton");
            $(this).removeClass("addButton");
            addButton = $(".addButton");
            qiuJ = $(".qiuJ");
            zhuJ = $(".zhuJ");
            single = $(".single");
            dyeing = $(".dyeing");
            qiuJR = $(".qiuJR");
            zhuJR = $(".zhuJR");
            qiuJL = $(".qiuJL");
            zhuJL = $(".zhuJL");
            allAxial = $(".allAxial");
            notMetricContIn = $(".notMetricCont input");
            sph_degree = "";
            cyl_degree = "+0.00";
            numberInput = $(".numberInput");
            glassInput = $(".glassInput");
            DomClick();
        });

        $(".reduceButton").unbind("click").click(function(){
            removePop.fadeIn(300);
            var that = $(this).parent();
            confirmRemove.unbind("click").click(function(){
                that.remove();
                sph_degree = "+0.00";
                cyl_degree = "+0.00";
                thisQiu = null;
                removePop.fadeOut(300);
                proInfo();
            });

            addButton = $(".addButton");
            qiuJ = $(".qiuJ");
            zhuJ = $(".zhuJ");
            single = $(".single");
            dyeing = $(".dyeing");
            qiuJR = $(".qiuJR");
            zhuJR = $(".zhuJR");
            qiuJL = $(".qiuJL");
            zhuJL = $(".zhuJL");
            allAxial = $(".allAxial");
            notMetricContIn = $(".notMetricCont input");
            sph_degree = "";
            cyl_degree = "+0.00";
            numberInput = $(".numberInput");
            glassInput = $(".glassInput");

            abortRemove.unbind("click").click(function(){
                removePop.fadeOut(300);
            });
        });


        $(".singleN").blur(function(){
            proInfo();
        });

        $(".RNumber").blur(function(){
            proInfo();
        });

        $(".LNumber").blur(function(){
            proInfo();
        });


        $(".allAxial").blur(function(){
            proInfo();
        });

        numberInput.focus(function(){
            $(this).val("");
        });



        numberInput.keyup(function(){
            if($(this).val()<0){
                alert("数量不能小于0!");
                $(this).val("1");
            }
            if($(this).val().indexOf(".")>=0){
                alert("数量不能为小数!");
                $(this).val("1");
            }
        });

    }



    popClose.click(function(){
        choosePop.animate({bottom:"-100%"},300);
        choosePopBt.animate({bottom:"-100%"},300);
        metricPopBack.fadeOut(300);
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
                console.log(data);
                if(data.code!=0){
                    window.location.href = "login.html";
                }else {


                    choosePopCont2.show();

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
                        if(data0[i]!=""){
                            if(data0[i].indexOf("-")<0){
                                metric1.append('<li><b>'+data0[i]+'</b></li>');
                            }else {
                                metric11.append('<li><b>'+data0[i]+'</b></li>');
                            }
                        }
                    }

                    metric1.children().first().css("color","transparent");

                    for(var ii=0;ii<data2.length;ii++){
                        if(data2[ii]!=""){
                            if(data2[ii].indexOf("-")<0){
                                metric2.append('<li><b>'+data2[ii]+'</b></li>');
                            }else {
                                metric22.append('<li><b>'+data2[ii]+'</b></li>');
                            }
                        }
                    }

                    for(var iii=0;iii<data5.length;iii++){
                        if(data5[iii]!=""){
                            if(data5[iii].indexOf("-")<0){
                                metric3.append('<li><b>'+data5[iii]+'</b></li>');
                            }else {
                                metric33.append('<li><b>'+data5[iii]+'</b></li>');
                            }
                        }
                    }

                    for(var iiii=0;iiii<data7.length;iiii++){
                        if(data7[iiii]!=""){
                            if(data7[iiii].indexOf("-")<0){
                                metric4.append('<li><b>'+data7[iiii]+'</b></li>');
                            }else {
                                metric44.append('<li><b>'+data7[iiii]+'</b></li>');
                            }
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
                                    choosePop.animate({bottom:"-100%"},300);
                                    choosePopBt.animate({bottom:"-100%"},300);
                                    metricPopBack.fadeOut(300);
                                    hasChooseClick = true;
                                    sph_degree = $(this).find("b").html();
                                    _that.parent().next().find("input").val("");
                                    cyl_degree = "+0.00";
                                    if(_that.parent().parent().find(".dyeingNum").val()==0){
                                        _that.parent().parent().find(".dyeingNum").val(1);
                                    }
                                }
                            });
                        if(_that.parent().next().find("input").val()==""){
                            cyl_degree = "+0.00";
                        }else {
                            cyl_degree = _that.parent().next().find("input").val();
                        }
                            if(hasChooseClick){
                                thisQiu = _that;
                                proInfo();
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
                            if(data0[i]!=""){
                                metric1.append('<li><b>'+data0[i]+'</b></li>');
                            }
                        }

                        for(var ii=0;ii<data2.length;ii++){
                            if(data2[ii]!=""){
                                metric2.append('<li><b>'+data2[ii]+'</b></li>');
                            }
                        }

                        for(var iii=0;iii<data5.length;iii++){
                            if(data5[iii]!=""){
                                metric3.append('<li><b>'+data5[iii]+'</b></li>');
                            }
                        }

                        for(var iiii=0;iiii<data7.length;iiii++){
                            if(data7[iiii]!=""){
                                metric4.append('<li><b>'+data7[iiii]+'</b></li>');
                            }
                        }

                    choosePopCont2.hide();


                        choosePopContLi = $(".choosePopCont li");

                        choosePopContLi.each(function(){
                            if($(this).find("b").html()==_that.val()){
                                choosePopContLi.removeClass("on");
                                $(this).addClass("on");
                            }
                        });
                    choosePopCont1.find("ul").css("height","auto");

                        choosePopContLi.click(function(){
                            choosePopContLi.removeClass("on");
                            $(this).addClass("on");
                        });

                        confirm.unbind("click").click(function(){
                            var hasChooseClick = false;
                            choosePopContLi.each(function(){
                                if($(this).hasClass("on")){
                                    _that.val($(this).find("b").html());
                                    choosePop.animate({bottom:"-100%"},300);
                                    choosePopBt.animate({bottom:"-100%"},300);
                                    metricPopBack.fadeOut(300);
                                    cyl_degree = $(this).find("b").html();
                                    if(_that.hasClass("zhuJInputs")){
                                        _that.parent().next().find("input").addClass("axialMust");
                                    }
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














    var chooseOnA = [],
        more_prod_info = [],
        totalNumber = 0,
        totalM = 0,
        finalMoney = 0;



    function proInfo(_that){
        chooseOnA = [];
        more_prod_info = [];
        totalNumber = 0;
        totalM = 0;
        finalMoney = 0;
        $.ajax({
            type: "GET",
            url: domain + "lens_product!getLensProductInfoBySphCyl.shtml",
            data: {"prod_id_1": json.prod_id_1, "sph_degree": sph_degree,"prod_id_2": json.prod_id_2,"cyl_degree":cyl_degree},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            timeout : 100000,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.log(data);

                if(data.data.prod_id){
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
                                _that.val("");
                                _that.parent().prev().find("input").val("");
                            }
                        }else {
                            if((data.data.isFix==1&&data.data.isDyeing==1)||(data.data.isFix==1&&data.data.isPolarizedLight==1)||data.data.isDegreeFix==1){//
                                _that.parent().parent().next().find(".qiuJR").val(_that.parent().parent().find(".qiuJ").val());
                                _that.parent().parent().next().find(".zhuJR").val(_that.val());
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
                        if(thisQiu){
                            if(thisQiu.hasClass("qiuJ")){
                                thisQiu.parent().parent().attr({
                                    "proId":data.data.prod_id,
                                    "price":data.data.market_price,
                                    "isFix":data.data.isFix
                                });
                            }
                        }
                    }


                    $(".chooseOn").each(function(){
                        chooseOnA.push($(this));
                    });

                    console.log("chooseOnA===="+chooseOnA.length);


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
                        }
                        console.log("totalNumber1===="+totalNumber);
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
                                }
                                chooseOnA.splice(b,1);
                                b=a;
                            }
                        }
                        console.log("totalNumber2===="+totalNumber);
                        more_prod_info.push({
                            "prod_id":chooseOnA[a].attr("proId"),
                            "isFix":chooseOnA[a].attr("isFix"),
                            "total":""+totalNumber+"",
                            "jsonData":jsonData
                        });
                        finalMoney += totalM;
                    }

                    totalMoney.html(finalMoney);
                    console.log(more_prod_info);
                }else {
                    alert("当前光度无商品!");
                    if(_that){
                        _that.val("");
                        _that.parent().prev().find("input").val("");
                        thisQiu = _that.parent().prev().find("input");
                    }
                    if(thisQiu){
                        thisQiu.val("");
                        thisQiu.parent().next().find("input").val("");
                    }
                }

            }
        });
    }



    addCart.click(function(){
        var canBy = true;
        canBy = checkF();
        if(canBy) {
            var ZCanB = true;
            $(".axialMust").each(function(){
                if($(this).val()==""&&$(this).parent().prev().find("input").val()!=""){
                    ZCanB = false;
                }
            });
            if(!ZCanB){
                alert("轴位不能为空!");
            }else {
                var addJSON = {};
                for (var i = 0; i < more_prod_info.length; i++) {
                    addJSON += more_prod_info[i];
                }

                loading.show();

                $.ajax({
                    type: "GET",
                    url: domain + "lens_cart!saveToCart.shtml?more_prod_info=" + JSON.stringify(more_prod_info),
                    dataType: 'json',
                    contentType: "text/plain; charset=utf-8",
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.data == "") {
                            loading.hide();

                            removePopContinue.show();


                            $(".confirmContinue").unbind("click").click(function(){
                                window.location.href = window.location.href;
                            });

                            $(".abortContinue").click(function(){
                                appendSuccessF();
                                window.location.href = "shopCart.html";
                            });

                        }
                    }
                });
            }
        }
    });

    function checkF(){
        var canBy = true;
        var qiuJCan = true;

        numberInput = $(".numberInput");
        numberInput.each(function(){
            if($(this).parent().parent().hasClass("chooseOn")){
                if($(this).val()==""||$(this).val().indexOf(".")>=0){
                    canBy = false;
                    $(this).val("");
                }
            }
        });

        if(!canBy){
            alert("数量不正确!");
        }
        qiuJ = $(".qiuJ");
        qiuJ.each(function(){
            if($(this).parent().parent().hasClass("chooseOn")&&$(this).val()==""){
                qiuJCan = false;
                canBy = false;
            }
        });
        if(!qiuJCan){
            alert("光度不能为空!");
        }
        $(".dyeing").each(function(){
           if($(this).hasClass("chooseOn")){

           }
        });

        /*var dyeingNumCan = true;
        $(".dyeingNum").each(function(){
           if($(this).parent().parent().parent().parent().hasClass("chooseOn")&&$(this).parent().next().find("input").val()){
               if($(this).val()==0){
                   dyeingNumCan = false;
                   canBy = false;
               }
           }
        });

        if(!dyeingNumCan){
            alert("数量不能为0!");
        }*/

        var axialMustB = true;
        $(".axialMust").each(function(){
           if($(this).parent().parent().parent().hasClass("chooseOn")){
               if($(this).val()==""&&$(this).parent().parent().find(".dyeingNum").val()!=0){
                   axialMustB = false;
                   canBy = false;
               }
           }
        });
        if(!axialMustB){
            alert("轴位不能为空!");
        }


        $(".chooseOn").each(function(){
           if(!$(this).attr("price")){
               canBy = false;
           }
        });
        return canBy;
    }


    $(".dyeingNum").keyup(function(){
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

    $(".otherNum").keyup(function(e){
        if($(this).val()<0){
            $(this).val("");
        }
        if($(this).val()>=100){
            alert("最大不能超过100!");
            $(this).val("");
            return false;
        }
        if(isNaN($(this).val())){
            $(this).val("");
            return false;
        }
    });

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

    $(".dyeingNum").focus(function(){
        $(this).val("");
    });

    $(".dyeingNum").blur(function(){
        if($(this).val()==""){
            $(this).val("0");
        }
    });


    notMetricContIn.keyup(function(){
        var inVal = $(this).val().toString();
        if(inVal.indexOf(".")>0){
            var inValArray = inVal.split(".");
            var pointL = inValArray[0];
            if(pointL.length>1&&pointL.substr(0,1)==0){
                alert("请输入正确的数字");
                $(this).val("");
            }
        }else {
            if(inVal.length>1&&inVal.substr(0,1)==0){
                alert("请输入正确的数字");
                $(this).val("");
            }
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


    function appendSuccessF(){
        notMetricContUl.empty();
        notMetricContUl.append('<li>'+
            '<div class="single chooseOn">'+
            '<p>'+
            '<span>数量</span>'+
            '<input type="text" value="1" class="singleN numberInput"/>'+
            '</p>'+
            '<p>'+
            '<span>球镜</span>'+
            '<input type="text" value="" readonly class="qiuJ"/>'+
            '</p>'+
            '<p>'+
            '<span>柱镜</span>'+
            '<input type="text" value="" readonly class="zhuJ"/>'+
            '</p>'+
            '</div>'+
            '<div class="dyeing">'+
            '<div class="dyeingChoose">'+
            '<p>R</p>'+
            '<a>'+
            '<span>'+
            '<b>数量</b>'+
            '<input class="RNumber dyeingNum" value="1">'+
            '</span>'+
            '<span>'+
            '<b>球镜</b>'+
            '<input class="qiuJR" readonly>'+
            '</span>'+
            '<span>'+
            '<b>柱镜</b>'+
            '<input class="zhuJR zhuJInputs" readonly>'+
            '</span>'+
            '<span>'+
            '<b>轴向</b>'+
            '<input class="r_axial axialMust allAxial" value="0">'+
            '</span>'+
            '</a>'+
            '</div>'+
            '<div class="dyeingChoose">'+
            '<p>L</p>'+
            '<a>'+
            '<span>'+
            '<b>数量</b>'+
            '<input class="LNumber dyeingNum" value="0">'+
            '</span>'+
            '<span>'+
            '<b>球镜</b>'+
            '<input class="qiuJL" readonly>'+
            '</span>'+
            '<span>'+
            '<b>柱镜</b>'+
            '<input class="zhuJL zhuJInputs" readonly>'+
            '</span>'+
            '<span>'+
            '<b>轴向</b>'+
            '<input class="l_axial allAxial">'+
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
        $(this).addClass("reduceButton");
        $(this).removeClass("addButton");
        addButton = $(".addButton");
        qiuJ = $(".qiuJ");
        zhuJ = $(".zhuJ");
        single = $(".single");
        dyeing = $(".dyeing");
        qiuJR = $(".qiuJR");
        zhuJR = $(".zhuJR");
        qiuJL = $(".qiuJL");
        zhuJL = $(".zhuJL");
        allAxial = $(".allAxial");
        notMetricContIn = $(".notMetricCont input");
        sph_degree = "";
        cyl_degree = "+0.00";
        numberInput = $(".numberInput");
        glassInput = $(".glassInput");
        DomClick();
    }

})();