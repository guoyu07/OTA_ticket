define('myapp_dbs160527', ['jquery'], function ($) {

    /**
     * time:20160523
     * @author:duanbaosheng
     */

    return function (fquery, urlEncodeGBK, pvid) {

        var pvid = pvid;

        function EncodeUtf8(s1) {
            var s = escape(s1);
            var sa = s.split("%");
            var retV = "";
            if (sa[0] != "") {
                retV = sa[0];
            }
            for (var i = 1; i < sa.length; i++) {
                if (sa[i].substring(0, 1) == "u") {
                    retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));

                }
                else retV += "%" + sa[i];
            }

            return retV;
        }

        function Str2Hex(s) {
            var c = "";
            var n;
            var ss = "0123456789ABCDEF";
            var digS = "";
            for (var i = 0; i < s.length; i++) {
                c = s.charAt(i);
                n = ss.indexOf(c);
                digS += Dec2Dig(eval(n));

            }
            //return value;
            return digS;
        }

        function Dec2Dig(n1) {
            var s = "";
            var n2 = 0;
            for (var i = 0; i < 4; i++) {
                n2 = Math.pow(2, 3 - i);
                if (n1 >= n2) {
                    s += '1';
                    n1 = n1 - n2;
                }
                else
                    s += '0';

            }
            return s;

        }

        function Dig2Dec(s) {
            var retV = 0;
            if (s.length == 4) {
                for (var i = 0; i < 4; i++) {
                    retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
                }
                return retV;
            }
            return -1;
        }

        function Hex2Utf8(s) {
            var retS = "";
            var tempS = "";
            var ss = "";
            if (s.length == 16) {
                tempS = "1110" + s.substring(0, 4);
                tempS += "10" + s.substring(4, 10);
                tempS += "10" + s.substring(10, 16);
                var sss = "0123456789ABCDEF";
                for (var i = 0; i < 3; i++) {
                    retS += "%";
                    ss = tempS.substring(i * 8, (eval(i) + 1) * 8);


                    retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                    retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
                }
                return retS;
            }
            return "";
        }


        var tickets_feiji_search = function (departcity, destination, departtime, backtime, surl) {
            // var VR_TICKETS_DOMAIN = "http://u.ctrip.com/union/CtripRedirect.aspx?";              //实验搜索域名
            var VR_TICKETS_DOMAIN = surl;

            var params = "encoding=gbk&TypeID=20" + "&FlightWay=" + flightway +
                "&StartCity=" + urlEncodeGBK(departcity) + "&DestCity=" + urlEncodeGBK(destination) +
                "&DepartDate=" + departtime + "&ReturnDate=" + backtime;
            var url = VR_TICKETS_DOMAIN + "&ext=" + encodeURIComponent(params);

            window.open(url);   //在新的页面打开url
        }
        var tickets_huoche_search = function (fromCn, toCn, day, surl) {

            // var VR_TICKETS_DOMAIN="http://trains.ctrip.com/TrainBooking/Search.aspx?allianceid=4901&sid=803429";              //实验搜索域名
            var VR_TICKETS_DOMAIN = surl;
            var params = "encoding=gbk&fromCn=" + urlEncodeGBK(fromCn) + "&toCn=" + urlEncodeGBK(toCn) + "&day=" + day;
            var url = VR_TICKETS_DOMAIN + '&ext=' + encodeURIComponent(params);
            //window.location.href = url;
            // alert(url);
            window.open(url);

        }
        //点击搜索的时候，调用的函数，这里主要是处理各种参数和编码，还有落地页有关的东西


        function stopPropagation(event) {
            event = event || window.event;
            event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        }

        //* 阻止冒泡 *//
        function findInArr(arr, item) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    return true;
                }
            }
            ;
            return false;
        };

        function getByClass(ele, cName) {
            if (ele.getElementsByClassName) {
                return ele.getElementsByClassName(cName);
            } else {
                var result = [],
                    aEle = document.getElementsByTagName("*"),
                    aEleLen = aEle.length, i;
                for (i = 0; i < aEleLen; i++) {
                    var aEleClass = aEle[i].className.split(" ");
                    if (!(Number(aEleClass[0]) === 0)) {
                        //console.log(aEleClass);
                        if (findInArr(aEleClass, cName)) {
                            result.push(aEle[i]);
                        }
                        ;
                    }
                    ;

                }
                ;
                return result;
            }
        };

        // Tab 切换 用到的两个函数

        $("#tabLi2_dbs2016").on('click', 'li', function () {

            var num = $(this).index();
            $(this).siblings().removeClass('cur');
            $(this).addClass('cur');

            var tabCon = $("#tabCon2_dbs2016"),
                eachCon = getByClass(tabCon, "tab-con");

            for (i = 0; i < 2; i++) {
                eachCon[i].style.display = "none";
            }
            ;
            eachCon[num].style.display = "block";
        });
        //tab 切换  机票，火车票

        var flightway = 0;
        $("#r1_dbs2016").on('click', function () {

            flightway = 0;
            $("#fanhui-date-dbs2016").val('');
            $("#fanhui-date-dbs2016").attr({"disabled": true});
            $("#fanhui-date-dbs2016").parent().addClass('input-disabled');
        });

        $("#r2_dbs2016").on('click', function () {

            flightway = 1;
            /*   var ONEDAY = 86400000,TODAY = new Date();
             var newdate=new Date(TODAY.getTime() + ONEDAY * 4);
             if(newdate.getMonth()<=8){
             newdate=newdate.getFullYear()+'-'+0+(newdate.getMonth()+1)+'-'+newdate.getDate();
             } else{
             newdate=newdate.getFullYear()+'-'+(newdate.getMonth()+1)+'-'+newdate.getDate();
             }

             $("#fanhui-date-dbs2016").val(newdate);*/


            $("#fanhui-date-dbs2016").attr({"disabled": false});
            $("#fanhui-date-dbs2016").parent().removeClass('input-disabled');
        });
        // 单程  往返 使能绑定,   false后有阴影效果


        $("#chufa-date-img-dbs2016").click(function () {
            $("#chufa-date-dbs2016").trigger("click");
        });

        $("#fanhui-date-img-dbs2016").click(function () {
            $("#fanhui-date-dbs2016").trigger("click");
        });


        // 点击日历、地点小照片，激活日历

        $(document).ready(function () {
            $("#r1_dbs2016").trigger("click");

            /*if(hidden_flag=="only_train"){
             $("#tabLi2_dbs2016 li:first-child").hide();
             $("#tabcon_jipiao_dbs2016").hide();
             $("#tabLi2_dbs2016 li").addClass('cur');
             $("#tabcon_huoche_dbs2016").show();

             }

             if(hidden_flag=="only_flight"){
             $("#tabLi2_dbs2016 li:last-child").hide();
             $("#tabcon_huoche_dbs2016").hide();
             }
             */
        });
        //  加载完文档 自动运行

        $("#jipiao_search_dbs2016").on('click',
            function (event) {
                /*stopPropagation(event);*/
                event.preventDefault();

                /*      var pburl = 'http://data.galaxy.brand.sogou.com/pb/pb.php?',
                 styleId = 32,
                 pos = $(this).data('pos'),
                 src = pburl + 'vid=' + pvid + '&pid=' + pos + '&sid=' + styleId,
                 pingImg = new Image();
                 pingImg.src = src;
                 */

                tickets_feiji_search($("#city_input1_dbs2016").val(), $("#city_input2_dbs2016").val(), $("#chufa-date-dbs2016").val(), $("#fanhui-date-dbs2016").val(), $(this).attr('href'));
            }
        );


        $("#huochepiao_search_dbs2016").on('click',
            function (event) {
                /*stopPropagation(event);*/
                event.preventDefault();
                /*       var pburl = 'http://data.galaxy.brand.sogou.com/pb/pb.php?',
                 styleId = 32,
                 pos = $(this).data('pos'),
                 src = pburl + 'vid=' + pvid + '&pid=' + pos + '&sid=' + styleId,
                 pingImg = new Image();
                 pingImg.src = src;*/

                tickets_huoche_search($("#city_input3_dbs2016").val(), $("#city_input4_dbs2016").val(), $("#huoche-date-dbs2016").val(), $(this).attr('href'));

            }
        );

        //点击搜索按钮，跳转到相应的网页

        $(".vr-ota-tickets160427_dbs2016 .mid").on('click',
            function (event) {
                stopPropagation(event);
                event.preventDefault();
                var city1 = $("#city_input1_dbs2016").val();
                var city2 = $("#city_input2_dbs2016").val();
                $("#city_input1_dbs2016").val(city2);
                $("#city_input2_dbs2016").val(city1);

            }
        );


        var huoche_ticket_filter = function () {


            if ($("#c1_dbs2016").prop("checked")) {
                var c1 = 1;
            } else {
                var c1 = 0;

            }
            if ($("#c2_dbs2016").prop("checked")) {
                var c2 = 1;
            } else {
                var c2 = 0;

            }
            if ($("#c3_dbs2016").prop("checked")) {
                var c3 = 1;
            } else {
                var c3 = 0;

            }
            if ($("#c4_dbs2016").prop("checked")) {
                var c4 = 1;
            } else {
                var c4 = 0;

            }

            var traintype = c1.toString() + c2.toString() + c3.toString() + c4.toString();
            /*  var  r_f_url="http://10.139.16.86:8098/ticketjoin?rtype=1&query="+fquery;
             var  titleurl1=$(".vr-ota-tickets160427_dbs2016 .vrTitle a");
             var  titleurl=titleurl1[0].getAttribute("href");
             var  url = r_f_url+"&userip=3348327972"+"&traintype="+traintype+"&url="+encodeURIComponent(titleurl);
             */

            var r_f_url = "https://brandapi.sogou.com/galaxy_ota/ticketjoin?rtype=1&query=" + EncodeUtf8(fquery);
            var titleurl1 = $(".vr-ota-tickets160427_dbs2016 .vrTitle a");
            var titleurl = titleurl1[0].getAttribute("href");
            var url = r_f_url + "&user_ip=&traintype=" + traintype + "&url=" + encodeURIComponent(titleurl);

            $.ajax({
                method: 'get',
                url: url,
                cache: false,
                dataType: "jsonp",
                success: function (response) {
                    huoche_ticket_template(response);
                },
                error: function () {
                    huoche_ticket_template_error();
                }
            });
        }
        //火车的二次 重新请求

        var order_flight_url = $("#tabcon_huoche_dbs2016 .modules-statistics .btn").eq(0).attr("href");

        var huoche_ticket_template = function (data) {

            if (data["success"] && data["totalNumber"] >= 1) {


                $(".vr-ota-tickets160427_dbs2016 .modules-statistics tbody tr").nextAll().remove();
                $(".vr-ota-tickets160427_dbs2016 .modules-statistics table").nextAll().remove();
                $("#tabcon_huoche_dbs2016 .moreLink").show();
                var len = data["datalist"].length;
                for (var i = 0; i < len; i++) {
                    var item = data["datalist"][i];

                    var template = "<tr> <td> <div class='over-txt'> <a href='#'> " + item["trainNum"] + ' </a> </div> </td> <td style="padding-left: 0;"> ' + item["leaveArriveStation"];

                    template += "</td> <td>" + item["leaveArriveTime"] + "</td> <td>" + item["costTime"] + "</td> <td>" + item["priceRange"] + "</td> <td class='text-orange'>" + item["tickets"] + "</td>";
                    template += "<td> <a target='_blank' onclick='return sogou_adclk(event,this)' href='" + order_flight_url + "' class='btn pv_ota_dbs' data-pos='train-" + (i + 1) + "' style=''> 预订 </a> </td> </tr>";

                    $(".vr-ota-tickets160427_dbs2016 .modules-statistics tbody").append(template);
                }

            } else {

                huoche_ticket_template_error();

            }

        };
        var huoche_ticket_template_error = function () {
            $(".vr-ota-tickets160427_dbs2016 .modules-statistics tbody tr").nextAll().remove();
            $("#tabcon_huoche_dbs2016 .moreLink").hide();                            //清除原有物料,填充没有查询结果的提示
            $(".vr-ota-tickets160427_dbs2016 .modules-statistics table").nextAll().remove();
            // alert(123);
            var p = "<div  style='margin:35px auto;width:250px;'>很抱歉，暂时没有符合要求的数据！<br> 点击 <a target='_blank'   class='pv_ota_dbs' data-pos='moretrain' href='" + $("#tabcon_huoche_dbs2016 .moreLink a").attr("href") + "' style=''> 查看全部车次信息>> </a> </div>";                                                     //查询失败
            $(".vr-ota-tickets160427_dbs2016 .modules-statistics ").append(p);


        };

        // 火车票后天请求后，重新加载数据

        $("#c1_dbs2016").change(function () {
                // $id=$(this).attr("id");
                // if($("#c1_dbs2016").prop("checked")){
                //  alert(111);
                // }else{
                //    alert($("#c1_dbs2016").prop("checked"));
                // }
                huoche_ticket_filter();
            }
        );

        $("#c2_dbs2016").change(function () {
                huoche_ticket_filter();
            }
        );

        $("#c3_dbs2016").change(function () {
                huoche_ticket_filter();
            }
        );

        $("#c4_dbs2016").change(function () {
                huoche_ticket_filter();
            }
        );

        //checkBox 的值改变后重新加载数据

        /*$('#ota_ticket_pv_dbs160722').on('click', '.pv_ota_dbs', function (event) {
         event.stopPropagation();
         var pburl = 'https://brandapi.sogou.com/pb/pb.php?',
         styleId = 32,
         pos = $(this).data('pos');
         if(pos&&pvid){
         var src = pburl + 'vid=' + pvid + '&pid=' + pos + '&sid=' + styleId,
         pingImg = new Image();
         pingImg.src = src;
         }

         });*/
        // by zmh改进pingback，添加一个全局变量持有image对象，防止在请求达到前image对象被回收，多传一个time参数
        try {
            var pingBack = function () {
                if (!window['pingbackOtaMap'])
                    window['pingbackOtaMap'] = {};
                var uuid = function () {
                    var now = (new Date()).getTime();
                    return function () {
                        var i, random;
                        var uuid = '';
                        for (i = 0; i < 32; i++) {
                            random = Math.random() * 16 | 0;
                            if (i === 8 || i === 12 || i === 16 || i === 20) {
                                uuid += '-';
                            }
                            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
                        }
                        return now + '-' + uuid;
                    }
                }();
                var pingBack = function (styleId, pvid) {
                    $('#ota_ticket_pv_dbs160722').on('click', '.pv_ota_dbs', function (event) {
                        // if (!allowBuble)
                        event.stopPropagation();
                        var pburl = 'https://brandapi.sogou.com/data.galaxy/g.gif?',
                            sid = styleId,
                            time = uuid(),
                            pos = $(this).data('pos');
                        if (pos && pvid) {
                            var src = pburl + 'vid=' + pvid + '&pid=' + pos + '&sid=' + sid + '&time=' + time,
                                data = window['pingbackOtaMap'],
                                pingImg = data[time] = new Image();

                            pingImg.onload = pingImg.onerror = function () {//销毁一些对象
                                pingImg.onload = pingImg.onerror = null;
                                pingImg = null;
                                delete data[time];
                            };
                            pingImg.src = src;
                        }
                    });
                };
                return pingBack;
            }();
            pingBack(32, pvid);
        } catch (e) {
        }

        //pv统计


        var browser = navigator.appName;
        $(document).ready(function () {

            if (browser == "Microsoft Internet Explorer") {
                $.extend($, {
                    placeholder: {
                        browser_supported: function () {
                            return this._supported !== undefined ?
                                this._supported :
                                ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
                        },
                        shim: function (opts) {
                            var config = {
                                color: '#888',
                                cls: 'placeholder',
                                selector: 'input[placeholder], textarea[placeholder]'
                            };
                            $.extend(config, opts);
                            return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
                        }
                    }
                });

                $.extend($.fn, {
                    _placeholder_shim: function (config) {
                        function calcPositionCss(target) {
                            var op = $(target).offsetParent().offset();
                            var ot = $(target).offset();

                            return {
                                top: ot.top - op.top,
                                left: ot.left - op.left,
                                width: $(target).width()
                            };
                        }

                        function adjustToResizing(label) {
                            var $target = label.data('target');
                            if (typeof $target !== "undefined") {
                                label.css(calcPositionCss($target));
                                $(window).one("resize", function () {
                                    adjustToResizing(label);
                                });
                            }
                        }

                        return this.each(function () {
                            var $this = $(this);

                            if ($this.is(':visible')) {

                                if ($this.data('placeholder')) {
                                    var $ol = $this.data('placeholder');
                                    $ol.css(calcPositionCss($this));
                                    return true;
                                }

                                var possible_line_height = {};
                                if (!$this.is('textarea') && $this.css('height') != 'auto') {
                                    possible_line_height = {lineHeight: $this.css('height'), whiteSpace: 'nowrap'};
                                }

                                var isBorderBox = ($this.css('box-sizing') === 'border-box');
                                var isTextarea = $this.is('textarea');

                                var ol = $('<label />')
                                    .text($this.attr('placeholder'))
                                    .addClass(config.cls)
                                    .css($.extend({
                                        position: 'absolute',
                                        display: 'inline',
                                        'float': 'none',
                                        overflow: 'hidden',
                                        textAlign: 'left',
                                        color: config.color,
                                        cursor: 'text',
                                        paddingTop: !isTextarea && isBorderBox ? '0' : $this.css('padding-top'),
                                        paddingRight: $this.css('padding-right'),
                                        paddingBottom: !isTextarea && isBorderBox ? '0' : $this.css('padding-bottom'),
                                        paddingLeft: $this.css('padding-left'),
                                        fontSize: $this.css('font-size'),
                                        fontFamily: $this.css('font-family'),
                                        fontStyle: $this.css('font-style'),
                                        fontWeight: $this.css('font-weight'),
                                        textTransform: $this.css('text-transform'),
                                        backgroundColor: 'transparent',
                                        zIndex: 99
                                    }, possible_line_height))
                                    .css(calcPositionCss(this))
                                    .attr('for', this.id)
                                    .data('target', $this)
                                    .click(function () {
                                        if (!$(this).data('target').is(':disabled')) {
                                            $(this).data('target').focus();
                                        }
                                    })
                                    .insertBefore(this);
                                $this
                                    .data('placeholder', ol)
                                    .on('keydown', function () {
                                        ol.hide();
                                    })
                                    .on('blur change', function () {
                                        ol[$this.val().length ? 'hide' : 'show']();
                                    })
                                    .triggerHandler('blur');
                                $(window).one("resize", function () {
                                    adjustToResizing(ol);
                                });
                            }
                        });
                    }
                });
                $.placeholder.shim();
            }
            ;

        }); //jQuery(document)

        // 这段主要是 兼容IE的placeholder属性


    };  // return括号
});//  define 括号