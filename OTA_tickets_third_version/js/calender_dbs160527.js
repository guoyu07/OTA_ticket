


define('calender_dbs160527',['jquery'],function($){


 return function(pikaday){
			 
            $(document).ready(function(){

             var ONEDAY = 86400000, TODAY = new Date(),chufaDate = new Date(),start_num=1;  // 1天是86400秒  86400 000 毫秒
	         var i18n={        
	         	        previousMonth: '',
			            nextMonth: '',
			            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
			            weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			            weekdaysShort: ['日', '一', '二', '三', '四', '五', '六']
					   };

		
			 var chufapicker=new pikaday({
	                  field:document.getElementById('chufa-date-dbs2016'),
	                  defaultDate:tomorrowDate(),
	                  setDefaultDate:true,            //刚开始页面，input里出现的时间
	                  showDaysInNextAndPreviousMonths:true,
	                 // minDate:passXDay(1, TODAY),
	                  minDate:TODAY,
	                  maxDate:new Date('2020-13-31'),
	                  yearRange:[2000,2020],
	                  i18n:i18n, 
	                  onSelect: function () {	                               
		                          	chufaDate = this.getDate();
		                          	start_num=0;
		                            updatefanhuipicker(chufaDate);

	                     }
	              });

             var fanhuipicker=new pikaday({
                  field:document.getElementById('fanhui-date-dbs2016'),
                  defaultDate:passXDay(3, TODAY),
                  setDefaultDate:false,            //刚开始页面，input里出现的时间
                  showDaysInNextAndPreviousMonths:true,
                  minDate:passXDay(1, TODAY),
                  maxDate:new Date('2020-13-31'),
                  yearRange:[2000,2020],
                  i18n:i18n
			    });

            var huochepicker=new pikaday({
	                  field:document.getElementById('huoche-date-dbs2016'),
	                  defaultDate:tomorrowDate(),
	                  setDefaultDate:true,            //刚开始页面，input里出现的时间
	                  showDaysInNextAndPreviousMonths:true,
	                 // minDate:passXDay(1, TODAY),
	                  minDate:TODAY,
	                  maxDate:new Date('2020-13-31'),
	                  yearRange:[2000,2020],
	                  i18n:i18n          				             
                });
         
                $("#tabcon_huoche_dbs2016   .content li div:last a").click(function(){
                 
                  huochepicker.show();           
                });

                $("#r2_dbs2016").on('click',function(){         
                   if(start_num){
                	fanhuipicker.setDate(passXDay(5, chufaDate));
                   }else{
                   	fanhuipicker.setDate(passXDay(3, chufaDate));
                   }    
                  	
                });

			    function tomorrowDate() {
			    	var aa=2;
			        return passXDay(aa, TODAY);
			    }

			    function passXDay(x, date) {
			        return new Date(date.getTime() + ONEDAY * x);
			    }

			    function nextDay(date) {
                    return passXDay(1, date);
                 }

			    function updatefanhuipicker (date) {
                    fanhuipicker.setMinDate(nextDay(date));                   
                    if(document.getElementById('r2_dbs2016').checked){
                        fanhuipicker.setDate(passXDay(3, date));
                    }
                }
                
            

          });
     };
});