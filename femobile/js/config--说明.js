/*
 * Autor:Jabo
 * Date: 2017-12-25
 * Desc: 福建教育网web移动版 基础配置文件
 */

//截取参数
$.getUrlParam = function(para) {
    var obj = typeof para === "undefined" ? "undefined" : typeof(para);
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

//获取网站目录
$.getBasePath = function(type) {
    //0或者空：根目录加/  1：当前路径  2：主机后面目录  3:根目录
    //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
    var pathName = window.document.location.pathname;
    //后置目录下标
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPath = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/ems
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);


    //获取项目的basePath   http://localhost:8080/ems/
    var basePath = localhostPath + "/";
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

//获取当前时间并做处理
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

//是否支持flash 判断： 1：是支持
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

//sub empty check
function emptyCheck(obj, tips) {
    if (obj == "") {
        layer.msg(tips);
        return true;
    }
};

//sub rule check
function ruleCheck(reg, obj, tips) {
    if (!reg.test(obj)) {
        layer.msg(tips);
        return true;
    }
}

//error tips
function errorTips(tips) {
    layer.msg(tips);
}

//success tips
function successTips(tips) {
    layer.msg(tips);
}

var ONLINEMODE = true;

//本地路径部分
var ROOT = $.getBasePath(); //根路径
var ROOTFILE = ROOT + "images/";
var ROOTDATA = ROOT + "data/";

//线上部分
var SERVERROOT = "http://www.fetv.cn/";
var SERVERROOTFILE = "http://www.fetv.cn/fe/";
var SERVERROOTDATA = SERVERROOT + "fe/website/ashx/";

//other config params
var TempOrgId = 1; //临时组织，注意后期与其他组织机构区分

//提示语
var PROMPTARR = ["图形验证码获取异常,请刷新！", "手机号不能为空!", "手机号/用户名不能为空!", "请输入合法的用户名!", "密码不能为空!", "请输入正确的手机号码！", "短信验证码不能为空!", "获取动态码","图形验证码不能为空!","两次密码不一致!","请设置合法的密码(4-16位字符)"];

//校验规则
//0: 2-16字符; 1:手机格式
var CHECKRULEARR = [/^[A-Za-z0-9_\u4e00-\u9fa5]{2,16}$/, /^1[345789]\d{9}$/, /^\w{4,16}$/];

//短信码时间
var MESSAGECODETIME = 90;
