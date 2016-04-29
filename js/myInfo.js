/**
 * Created by lianglong on 16/3/30.
 */
(function(){
    var account = $(".account"),
        comName = $(".comName"),
        phoneN = $(".phoneN"),
        addressDOM = $(".address"),
        emailDOM = $(".email");
    $.ajax({
        type: "GET",
        url: domain + "getCustInfo.shtml",
        dataType: 'json',
        contentType: "text/plain; charset=utf-8",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data);
            if (data.code != 0) {
                window.location.href = "login.html";
            } else {
                account.html(data.data.cust_name);
                comName.html(data.data.cust_account);
                phoneN.html(data.data.phone);
                addressDOM.html(data.data.address);
                emailDOM.html(data.data.email);
            }
        }
    });
})();