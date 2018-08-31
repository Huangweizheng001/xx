var str1 = "";
var str2 = "";
var refer = document.referrer;
var sosuo = refer.split(".")[1];
var grep = null;
var str = null;
var keyword = null;
var skey = "xx";
var ykey = "";
switch (sosuo) {
case "baidu":
	grep = /wd\=.*\&/i;
	str = refer.match(grep)
	keyword = str.toString().split("=")[1].split("&")[0];
	// console.log(decodeURIComponent(keyword));
	ykey = decodeURIComponent(keyword);
	addCookie('key', decodeURIComponent(keyword), 1);
	// alert(decodeURIComponent(keyword));
	break;
case "google":
	grep = /&q\=.*\&/i;
	str = refer.match(grep)
	keyword = str.toString().split("&")[1].split("=")[1];
	// console.log(decodeURIComponent(keyword));
	ykey = decodeURIComponent(keyword);
	addCookie('key', decodeURIComponent(keyword), 1);
	break;
case "sogou":
	grep = /query\=.*\&/i;
	str = refer.match(grep)
	keyword = str.toString().split("&")[1].split("&")[2];
	// console.log(decodeURIComponent(keyword));
	ykey = decodeURIComponent(keyword);
	addCookie('key', decodeURIComponent(keyword), 1);
	// alert(decodeURIComponent(keyword));
	break;
default:
	addCookie('key', '', 1);
}
var ckey = (getCookie('key'))
// alert(ckey);
if (ykey.indexOf(skey) > -1) {
} else {
}

function deleteCookie(name) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = name + "=v; expires=" + date.toGMTString();
}

function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for ( var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name)
			return arr[1];
	}
	return "";
}

function addCookie(name, value, expiresHours) {
	var cookieString = name + "=" + escape(value);
	// 判断是否设置过期时间
	if (expiresHours > 0) {
		var date = new Date();
		date.setTime(date.getTime + expiresHours * 3600 * 1000);
		cookieString = cookieString + "; expires=" + date.toGMTString();
	}
	document.cookie = cookieString;
}
console.log(sosuo);
console.log(refer);
console.log(ykey);