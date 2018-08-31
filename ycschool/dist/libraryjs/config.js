Vue.http.interceptors.push(function ( request, next ) {
	request.params = {
		ycToken:$(window).storager({key: 'ycToken'}).readStorage()
	}
    next(function (response) {   
        if(response.body.code == 901 || response.body.code == 902 || response.body.code == 903){
        	$(window).storager({ //prePage
				key: 'prePage',
				value: $.getBasePath(1),
				expires: 0
			}).addStorage();
        	layer.msg(response.body.message);
        	setTimeout(function(){
        		window.location.href ="login.html";
        	},300);
        }
    });
});

//获得URL参数
$.fn.getUrlParam = function(para) {
    var obj = typeof para === "undefined" ? "undefined" : _typeof(para);
    if (obj === "object") {
        return window.location.search.substr(1);
    }
    var reg = new RegExp("(^|&)" + para + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return; 
};

//get Anchors
function getAchors(){
   return window.location.hash;
}

function setIframeHeight(iframe) {
	var height = 600;
	if(!iframe){
		iframe = $("#jStudentIframe")[0];
	} else if(iframe == 1){
        iframe = $("#jTeacherIframe")[0];
    }
	var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    if (iframeWin.document.body) {
        //iframe.height = iframeWin.document.body.scrollHeight || iframeWin.document.documentElement.scrollHeight;
    	height = iframeWin.document.body.scrollHeight || iframeWin.document.documentElement.scrollHeight;
    	$(iframe).css("height", height + "px");
    }
}

function checkInIframe(){
	if (window.frames.length != parent.frames.length) { 
		return true;
	} 
	return false;
}


//滑动到指定位置
$.scrollTo = function(pos, time) {
    if (time == null || time == undefined || time == "") {
        time = 0;
    }
    if (pos == null || pos == undefined || pos == "") {
        pos = 0;
    }
    $('html,body').animate({
        scrollTop: pos
    }, time);
};

$.getCurrentTime = function(inputTime, type, separator, separator2) {
    //type 0 或者空默认当前时时间  1:返回年月日 2：时分秒  3：时分  4:年月日 时分秒  5:时间戳  6时间数组 separator：格式 默认 "-" separator2:分割2
    if (separator == undefined || separator == null || separator == "") {
        separator = "-";
        separator2 = ":";
    } else {
        if (separator2 == undefined || separator2 == null || separator2 == "") {
            separator2 = ":";
            if (type == 2 || type == 3) {
                separator2 = separator;
            }
        }
    }
    var dateObj = "",
        dateArr = [];
    if ("" == inputTime || undefined == inputTime) {
        dateObj = new Date();
    } else {
        inputTime = inputTime.replace(/-/g, "/");
        console.log(inputTime);
        inputTime = new Date(inputTime);
        dateObj = inputTime;
    }

    if (1 == type) {
        //年月日
        dateObj = dateObj.getFullYear() + separator + (dateObj.getMonth() + 1) + separator + dateObj.getDate();
    }

    if (2 == type) {
        //时分秒
        dateObj = dateObj.getHours() + separator2 + dateObj.getMinutes() + separator2 + dateObj.getSeconds();
    }

    if (3 == type) {
        //时分
        dateObj = dateObj.getHours() + separator2 + dateObj.getMinutes();
    }

    if (4 == type) {
        //年月日 时分秒
        dateObj = dateObj.getFullYear() + separator + (dateObj.getMonth() + 1) + separator + dateObj.getDate() + " " + dateObj.getHours() + separator2 + dateObj.getMinutes() + separator2 + dateObj.getSeconds();
    }

    if (5 == type) {
        //获得时间戳
        dateObj = dateObj.valueOf();
    }

    if (6 == type) {
        //时间数组
        dateArr.push(dateObj.getFullYear());
        dateArr.push(dateObj.getMonth() + 1);
        dateArr.push(dateObj.getDate());
        dateArr.push(dateObj.getHours());
        dateArr.push(dateObj.getMinutes());
        dateArr.push(dateObj.getSeconds());

        return dateArr;
    }
    return dateObj;
};

//日期时间截取工具 : '2018-12-20 12:28:26
$.getDateTimeFormat = function(dateStr, separator, separator2) {
    if (separator == undefined || separator == null) {
        separator = "-";
        separator2 = ":";
    } else {
        if (separator2 == undefined || separator2 == null) {
            separator2 = ":";
        }
    }

    var timeObj = dateStr;
    var timeArr = timeObj.replace(" ", separator2).replace(/\:/g, separator).split(separator);
    return timeArr;
};

//日期或时间截取工具 : '2018-12-20 或 18:30:12  默认日期 ，时间必须写格式
$.getDateFormat = function(dateStr, separator, type) {
    if (separator == undefined || separator == null) {
        separator = "-";
    }
    var timeObj = dateStr;
    var timeArr = timeObj.split(separator);
    return timeArr;
};

//获取网站目录
$.getBasePath = function(type) {
    //0或者空：根目录加/  1：当前路径  2：主机后面目录  3:根目录
    //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
    var pathName = window.document.location.pathname;

    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/ems
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

    var projectArr = new Array;
    projectArr = pathName.split('/');
    // console.log(projectArr[1])
    //获取项目的basePath   http://localhost:8080/ems/
    // if(projectArr[1] != 'feweb') { //访问线下二级页面时，projectName为空
    // 	if(projectArr.length > 2) {
    // 		projectName = '';
    // 	}
    // }
    var basePath = localhostPath + "/";
    // var basePath = localhostPath + projectName + "/";

    if (1 == type) {
        return curWwwPath;
    }

    if (2 == type) {
        return pathName;
    }

    if (3 == type) {
        return localhostPath;
    }

    //复合模式
    if (4 == type) {
        basePath = basePath + pathName + "/";
    }

    //获取当前页名称
    if (5 == type) {
        var hrefArr = pathName.split("/");
        var herfNameArr = hrefArr.slice(hrefArr.length - 1, hrefArr.length).toString(String).split(".");
        return herfNameArr.slice(0, 1);
    }
    
    return basePath;
};

////////////////////////////////////////////////////
//flash 支持
///////////////////////////////////////////////////
function flashChecker() {
    var hasFlash = 0; //是否安装了flash
    var flashVersion = 0; //flash版本

    //IE浏览器
    if ("ActiveXObject" in window) {
        try {
            var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        } catch (e) {}
        //非IE浏览器
    } else {
        try {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        } catch (e) {}
    }
    return {
        f: hasFlash,
        v: flashVersion
    };
}

var ROOT = $.getBasePath(); //根路径

var ROOTFILE = ROOT + "images/";
var ROOTDATA = ROOT + "data/";
var SERVERROOT = "http://zz.fetv.cn/YcE/";
var SERVERROOTFILE = "http://zz.fetv.cn/YcE/";
var SERVERROOTDATA = "http://zz.fetv.cn/YcE/";
var TempOrgId = 1; //临时组织，注意后期与其他组织机构区分






var COMMINITYROOTFILE = "http://www.fetv.cn/discuz/";


var SERVERFRONTURL = "http://www.fetv.cn/feweb/";
//开启线上模式
var onlineServer = "/feweb";
var FjcyImg = "http://www.fetv.cn/";
//下线模式
//var onlineServer = "";

//上传图片 全局存储变量
var photoArray="";

// 图片放大 缩小功能
function showPhoto(obj){
    var $pop=$("<div class='dycpop'><b>×</b><i class='uk-icon-minus'></i><s class='uk-icon-plus'></s></div>");
    // var src=$(obj).find('img').attr("src");
    var src=$(obj).attr("src");
    var pheight=$(parent.window).height();
    var pwidth=$(parent.window).width();
    var $img=$('<div style="width:'+ pwidth +'px;height:'+ pheight +'px;overflow: scroll;position: relative"><img src="'+ src +'"/></div>');
    $pop.append($img);
    // $('body').append($pop);
    parent.$('body').append($pop);
    $pop.on('click','b',function () {
        $pop.remove();
    });
    // 放大
    $pop.on('click','s',function () {
        var img=$(this).parent().find('img');
        if(img.width()<=pwidth-100){
            var owidth=img.width()+ 100;
            var oheight=img.height()+ 100/img.width()*img.height();
            img.width(owidth);
            img.height(oheight);
            parent.$('.dycpop img').css({'marginLeft':-owidth/2,'marginTop':-oheight/2});
        }else{
            layer.msg('不能再放大了！');
        }
    });
    // 缩小
    $pop.on('click','i',function () {
        var img=$(this).parent().find('img');
        if(img.width()>=300){
            var owidth=img.width()- 100;
            var oheight=img.height()- 100/img.width()*img.height();
            img.width(owidth);
            img.height(oheight);
            parent.$('.dycpop img').css({'marginLeft':-owidth/2,'marginTop':-oheight/2});
        }else{
            layer.msg('不能再缩小了！');
        }
    });
    var height=parent.$('.dycpop img').height();
    var width=parent.$('.dycpop img').width();
    parent.$('.dycpop img').css({'marginLeft':-width/2,'marginTop':-height/2});
}

// 老师主页
Vue.component('teacherqzone-template', {
    template: '<div class="teacherQzone">' +
        '<div class="container">' +
            '<div class="teacherQzoneHead">'+
                '<div class="image">' +
                    '<img :src="teacherInfo.iconPath|addRootFile" alt="">' +
                '</div>'+
                '<h1 v-cloak>{{teacherInfo.teacherName}}<span> / {{teacherInfo.subjectName}}老师</span></h1>' +
            '</div>'+
            '<div class="teacherQzoneNav">' +
                '<a :href="item.href|addRoot" v-for="item in list">' +
                    '<span>{{item.name}}</span>' +
                '</a>'+
            '</div>' +
        '</div>' +
    '</div>',
    data: function data() {
        return {
            teacherInfo:{},
            list:[
                {
                    "href":'teacherindex.html',
                    "name": "主页"
                },
                {
                    "href":'teachermicroclass.html',
                    "name": "课程"
                },
                {
                    "href":'teacheractivity.html',
                    "name": "教研"
                },
                {
                    "href":'teacherresource.html',
                    "name": "资源"
                },
                // {
                //     "href":'teacherphoto.html',
                //     "name": "照片"
                // }
            ]
        };
    },
    mounted: function mounted() {
        //1.0ready --> 2.0
        this.$nextTick(function() {
            //初始化
            this.addActive();
            this.info();
        });
    },
    filters: {
        addRoot: function addRoot(url) {
            return url + "?teacherId=" + $(this).getUrlParam("teacherId");
        },
        addRootFile:function addRootFile(img) {
            return SERVERROOTFILE + img ;
        }
    },
    methods: {
        addActive: function addActive() {
            var url = window.location.pathname.split('/');
            var tId = $(this).getUrlParam("teacherId");
            if(tId==''||tId==undefined||tId=='undefined'){
                layer.msg("不存在该老师");
                setTimeout(function () {
                    window.location.href='index.html';
                },1000)
            }
            // console.log(url[url.length - 1]);
            var currentUrl = url[url.length - 1];
            $('.teacherQzone .teacherQzoneNav a').removeClass('active');
            $('.teacherQzone .teacherQzoneNav a[href$="' + currentUrl + '?teacherId='+ tId +'"]').addClass('active');
        },
        info:function () {
            var teacherId = $(this).getUrlParam("teacherId");
            var _this = this;
            this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getTeacherIntroduceById", {
                teacherId:teacherId
            }, {
                emulateJSON: true
            }).then(function(res) {
                if(res.body.code==200){
                    if(res.body.rows.length>0){
                        _this.teacherInfo=res.body.rows[0];
                    }

                }
            })
        }
    }
});
var teacherqzone = new Vue({
    el: '#teacherqzone'
});

// 老师个人中心
// Vue.component('teachercenter-template', {
//     template:
//         '<div class="personCenter">' +
//             '<div class="personCenterTop clearfix">' +
//                 '<div class="span5 topLeft">' +
//                     '<div class="image">' +
//                         '<img src="../images/teacher-tx.jpg">' +
//                     '</div>' +
//                     '<div class="boxLeft">' +
//                         '<h1>王小飞</h1>' +
//                         '<h2>男 <span>|</span> 语文老师</h2>' +
//                         '<a>修改密码</a>' +
//                     '</div>' +
//                 '</div>' +
//                 '<div class="span7 topRight">' +
//                     '<div class="boxRight">' +
//                         '<div class="item">' +
//                             '<span>10h</span>' +
//                             '<h4>在线时长</h4>' +
//                         '</div>' +
//                         '<div class="item">' +
//                             '<span>19</span>' +
//                             '<h4>微课</h4>' +
//                         '</div>' +
//                         '<div class="item">' +
//                             '<span>15</span>' +
//                             '<h4>资源</h4>' +
//                         '</div>' +
//                     '</div>' +
//                     '<button>个人信息</button>' +
//                 '</div>' +
//             '</div>' +
//             // 左边导航
//             '<div class="personCenterLeft">' +
//                 '<ul class="leftCon">' +
//                     '<li v-cloak v-for="item in list"><a :href="item.href"><span :class="item.icon"></span>{{item.name}}</a><b></b></li>' +
//                 '</ul>' +
//             '</div>'+
//         '</div>',
//     data: function data() {
//         return {
//             teacherInfo:{},
//             list:[
//                 {
//                     "icon":"course",
//                     "href":'teachercentercourse.html',
//                     "name": "课程"
//                 },
//                 {
//                     "icon":"attendanc",
//                     "href":'teachercenterattendance.html',
//                     "name": "考勤"
//                 },
//                 {
//                     "icon":"homework",
//                     "href":'teachercenterhomework.html',
//                     "name": "作业"
//                 },
//                 {
//                     "icon":"score",
//                     "href":'teachercenterscore.html',
//                     "name": "成绩"
//                 },
//                 {
//                     "icon":"resource",
//                     "href":'teachercenterresource.html',
//                     "name": "资源"
//                 },
//                 {
//                     "icon":"activity",
//                     "href":'teachercenteractivity.html',
//                     "name": "活动"
//                 },
//                 {
//                     "icon":"office",
//                     "href":'teachercenteroffice.html',
//                     "name": "办公"
//                 }
//             ]
//         };
//     },
//     mounted: function mounted() {
//         //1.0ready --> 2.0
//         this.$nextTick(function() {
//             //初始化
//             this.addActive();
//         });
//     },
//     filters: {
//         addRootFile:function addRootFile(img) {
//             return SERVERROOTFILE + img ;
//         }
//     },
//     methods: {
//         addActive: function addActive() {
//             var url = window.location.pathname.split('/');
//             console.log(url[url.length - 1]);
//             var currentUrl = url[url.length - 1];
//             $('.personCenterLeft .leftCon li').removeClass('active');
//             $('.personCenterLeft .leftCon li a[href$="' + currentUrl + '"]').parent().addClass('active');
//         },
//         info:function () {
//             var teacherId = $(this).getUrlParam("teacherId");
//             var _this = this;
//             this.$http.post(SERVERROOTDATA + "/website/ashx/site/Teacher.ashx?action=getTeacherIntroduceById", {
//                 teacherId:teacherId
//             }, {
//                 emulateJSON: true
//             }).then(function(res) {
//                 if(res.body.code==200){
//                     if(res.body.rows.length>0){
//                         _this.teacherInfo=res.body.rows[0];
//                     }
//
//                 }
//             })
//         }
//     }
// });
// var teachercenter = new Vue({
//     el: '#teachercenter'
// });

function ECalendarisOpen1(obj) {
    if (obj.length > 0) {
        obj.ECalendar({
            type: "time", //模式，time: 带时间选择; date: 不带时间选择;
            stamp: false, //是否转成时间戳，默认true;
            offset: [0, 2], //弹框手动偏移量;
            format: "yyyy-mm-dd hh:ii", //时间格式 默认 yyyy-mm-dd hh:ii;
            //skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
            step: 1, //选择时间分钟的精确度;
            callback: function (v, e) { } //回调函数
        });
    }
}

//上传图像，并显示图像
//c:点击节点，即点击input type=fille 后内容存贮
//d:存贮图像的节点
var upload = function (c, d) {
    var $file = $(c);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $(d);

    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src',dataURL);
        // console.log(dataURL);
    }else{
        dataURL = $file.val();
        var imgObj = document.querySelector(d);
        // 两个坑:
        // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
        // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        // console.log(dataURL);
    }
};

// 用于父页面，控制子页面跳转
function goToapply() {
    layer.closeAll();
    setTimeout(function () {
        $("#jTeacherIframe").attr("src", "addapply.html?type=0");
    },300)
}

function rolling(distance) {
    $('body').animate({scrollTop: distance},1000)
}

