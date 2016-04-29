(function(){

    var viewMetricUl = $(".viewMetric ul"),
        notMetric = $(".notMetric"),
        noMessage = $(".noMessage");

    var json = changeJson();


    if(!json.cart_id){
        $.ajax({
            type: "GET",
            url: domain + "lens_cart!getOrderItemInfo.shtml",
            data:{"order_id":json.order_id,"prod_id":json.prod_id,"orderDetailId":json.orderDetailId},
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            error:function(){
                noMessage.show();
                $(".viewMetric").hide();
            },
            success: function (data) {
                console.log(data);
                if(data.data.jsonData.length==0){
                    noMessage.show();
                }else {
                    noMessage.hide();
                }
                for(var i=0;i<data.data.jsonData.length;i++){
                    if(data.data.jsonData[i].l_total){
                        notMetric.append('<div class="gradualChoose">'+
                            '<span>R</span>'+
                            '<ul>'+
                            '<li>'+
                            '<p>球镜</p>'+
                            '<input type="text" readonly class="qiuJR" value='+data.data.jsonData[i].r_sph_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>柱镜</p>'+
                            '<input type="text" readonly class="zhuJR" value='+data.data.jsonData[i].r_cyl_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>轴位</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_axial+' class="r_axial" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>ADD</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_under_can_light+' class="r_under_can_light" readonly>'+
                            '</li>'+
                            '</ul>'+
                            '</div>'+
                            '<div class="gradualChoose">'+
                            '<span>L</span>'+
                            '<ul>'+
                            '<li>'+
                            '<p>球镜</p>'+
                            '<input type="text" readonly class="qiuJL" value='+data.data.jsonData[i].l_sph_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>柱镜</p>'+
                            '<input type="text" readonly class="zhuJL" value='+data.data.jsonData[i].l_cyl_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>轴位</p>'+
                            '<input type="text" value='+data.data.jsonData[i].l_axial+' class="l_axial" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>ADD</p>'+
                            '<input type="text" value='+data.data.jsonData[i].l_under_can_light+' class="l_under_can_light" readonly>'+
                            '</li>'+
                            '</ul>'+
                            '</div>'+
                            '<ul class="gradualOther">'+
                            '<li>'+
                            '<p>瞳距</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_far_ipd+' class="r_far_ipd" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>瞳高</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_high_pupil+' class="r_high_pupil" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>最大对角长</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_max_dia_length+' class="frame_max_dia_length" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>镜宽</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_width+' class="frame_width" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>镜高</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_height+' class="frame_height" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>梁宽</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_bridge_size+' class="frame_bridge_size" readonly>'+
                            '</li>'+
                            '</ul>'+

                            '<div class="gradualNumber">'+
                            '<span>数量</span>'+
                            '<div class="gradualNumberC">'+
                            '<a>R</a>'+
                            '<input type="text" value='+data.data.jsonData[i].r_total+' id="rightNumber" readonly/>'+
                            '</div>'+
                            '<div class="gradualNumberC">'+
                            '<a>L</a>'+
                            '<input type="text" value='+data.data.jsonData[i].l_total+' id="leftNumber" readonly/>'+
                            '</div>'+
                            '</div>');
                    }else {
                        viewMetricUl.append('<li><div class="single">'+
                            '<p>'+
                            '<span>数量</span>'+
                            '<input type="text" value='+data.data.jsonData[i].r_total+' class="singleN" readonly/>'+
                            '</p>'+
                            '<p>'+
                            '<span>球镜</span>'+
                            '<input type="text" value='+data.data.jsonData[i].r_sph_degree+' readonly class="qiuJ"/>'+
                            '</p>'+
                            '<p>'+
                            '<span>柱镜</span>'+
                            '<input type="text" value='+data.data.jsonData[i].r_cyl_degree+' readonly class="zhuJ"/>'+
                            '</p>'+
                            '</div></li>');
                    }
                }




                $(".qiuJ").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".zhuJ").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });

                $(".qiuJR").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".zhuJR").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".qiuJL").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".zhuJL").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });

                notMetric.find("input").each(function(){
                    if($(this).val()==undefined||$(this).val()=="undefined"||$(this).val()=="+undefined"){
                        $(this).val("");
                    }
                });

            }
        });
    }else {
        $.ajax({
            type: "GET",
            url: domain + "lens_cart!getCartItemInfo.shtml",
            data: {
                "cart_id": json.cart_id,
                "prod_id": json.prod_id
            },
            dataType: 'json',
            contentType: "text/plain; charset=utf-8",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            error: function () {
                noMessage.show();
                $(".viewMetric").hide();
            },
            success: function (data) {
                console.log(data);
                if(data.data.jsonData.length==0){
                    noMessage.show();
                }else {
                    noMessage.hide();
                }
                for(var i=0;i<data.data.jsonData.length;i++){
                    if(data.data.jsonData[i].l_total){
                        notMetric.append('<div class="gradualChoose">'+
                            '<span>R</span>'+
                            '<ul>'+
                            '<li>'+
                            '<p>球镜</p>'+
                            '<input type="text" readonly class="qiuJR" value='+data.data.jsonData[i].r_sph_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>柱镜</p>'+
                            '<input type="text" readonly class="zhuJR" value='+data.data.jsonData[i].r_cyl_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>轴位</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_axial+' class="r_axial" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>ADD</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_under_can_light+' class="r_under_can_light" readonly>'+
                            '</li>'+
                            '</ul>'+
                            '</div>'+
                            '<div class="gradualChoose">'+
                            '<span>L</span>'+
                            '<ul>'+
                            '<li>'+
                            '<p>球镜</p>'+
                            '<input type="text" readonly class="qiuJL" value='+data.data.jsonData[i].l_sph_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>柱镜</p>'+
                            '<input type="text" readonly class="zhuJL" value='+data.data.jsonData[i].l_cyl_degree+'>'+
                            '</li>'+
                            '<li>'+
                            '<p>轴位</p>'+
                            '<input type="text" value='+data.data.jsonData[i].l_axial+' class="l_axial" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>ADD</p>'+
                            '<input type="text" value='+data.data.jsonData[i].l_under_can_light+' class="l_under_can_light" readonly>'+
                            '</li>'+
                            '</ul>'+
                            '</div>'+
                            '<ul class="gradualOther">'+
                            '<li>'+
                            '<p>瞳距</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_far_ipd+' class="r_far_ipd" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>瞳高</p>'+
                            '<input type="text" value='+data.data.jsonData[i].r_high_pupil+' class="r_high_pupil" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>最大对角长</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_max_dia_length+' class="frame_max_dia_length" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>镜宽</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_width+' class="frame_width" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>镜高</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_height+' class="frame_height" readonly>'+
                            '</li>'+
                            '<li>'+
                            '<p>梁宽</p>'+
                            '<input type="text" value='+data.data.jsonData[i].frame_bridge_size+' class="frame_bridge_size" readonly>'+
                            '</li>'+
                            '</ul>'+

                            '<div class="gradualNumber">'+
                            '<span>数量</span>'+
                            '<div class="gradualNumberC">'+
                            '<a>R</a>'+
                            '<input type="text" value='+data.data.jsonData[i].r_total+' id="rightNumber" readonly/>'+
                            '</div>'+
                            '<div class="gradualNumberC">'+
                            '<a>L</a>'+
                            '<input type="text" value='+data.data.jsonData[i].l_total+' id="leftNumber" readonly/>'+
                            '</div>'+
                            '</div>');
                    }else {
                        viewMetricUl.append('<li><div class="single">'+
                            '<p>'+
                            '<span>数量</span>'+
                            '<input type="text" value='+data.data.jsonData[i].r_total+' class="singleN" readonly/>'+
                            '</p>'+
                            '<p>'+
                            '<span>球镜</span>'+
                            '<input type="text" value='+data.data.jsonData[i].r_sph_degree+' readonly class="qiuJ"/>'+
                            '</p>'+
                            '<p>'+
                            '<span>柱镜</span>'+
                            '<input type="text" value='+data.data.jsonData[i].r_cyl_degree+' readonly class="zhuJ"/>'+
                            '</p>'+
                            '</div></li>');
                    }
                }




                $(".qiuJ").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".zhuJ").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });

                $(".qiuJR").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".zhuJR").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".qiuJL").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });
                $(".zhuJL").each(function(){
                    if($(this).val().indexOf("-")<0){
                        $(this).val("+"+$(this).val().trim());
                    }
                });

                notMetric.find("input").each(function(){
                    if($(this).val()==undefined||$(this).val()=="undefined"||$(this).val()=="+undefined"){
                        $(this).val("");
                    }
                });
            }
        });
    }





})();