/**
 * Created by lianglong on 16/3/21.
 */
var domain = "http://m.zyanjing.com/mob_zyanjing/";
//192.168.1.58:8080
$("header img").click(function(){
   window.history.back();
});



function changeJson(){
   var urlParameter = window.location.search;
   urlParameter = urlParameter.substr(1,urlParameter.length);
   var urlJSON = urlParameter.split("&"),
       json = {};
   for(var i=0;i<urlJSON.length;i++){
      var unite = [];
      unite = urlJSON[i].split("=");
      json[unite[0]] = unite[1];
   }
   return json;
}

function getCookie(c_name)
{
   if (document.cookie.length>0)
   {
      var c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1)
      {
         c_start=c_start + c_name.length+1;
         c_end=document.cookie.indexOf(";",c_start);
         if (c_end==-1) c_end=document.cookie.length;
         return unescape(document.cookie.substring(c_start,c_end))
      }
   }
   return "";
}