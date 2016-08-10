


 
require.config({
// "baseUrl":"js",
"paths":{       
       "jquery": "jquery",
       "urlEncodeGBK_dbs160527":"urlEncodeGBK_dbs160527",
       "pikaday_dbs160527": "pikaday_dbs160527",     
       "calender_dbs160527":"calender_dbs160527",
       "cityPicker_dbs160527":"cityPicker_dbs160527",
       "myapp_dbs160527":"myapp_dbs160527"      
       }
});

require(['urlEncodeGBK_dbs160527','pikaday_dbs160527','calender_dbs160527','cityPicker_dbs160527','myapp_dbs160527'],function(urlEncodeGBK,pikaday,calender,cityPicker,myapp){
 
  calender(pikaday);
  cityPicker();
  //myapp(fquery,hidden_flag,urlEncodeGBK); 
   myapp(2,2,urlEncodeGBK); 
                  
});
