/*
 * Title:播米移动WEB版js
 * Autor:Jabo
 * DESC:公共或者特殊js部分
 */

$.getUrlParam = function(para) {
	var obj = typeof para;
	if(obj === "object") {
		return window.location.search.substr(1);
	}
	var reg = new RegExp("(^|&)" + para + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return decodeURI(r[2]);
	}
	return;
};

//获取网站目录
$.getBasePath = function(type) { //0或者空：根目录加/  1：当前路径  2：主机后面目录  3:根目录
	//获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
	var curWwwPath = window.document.location.href;
	//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8080
	var localhostPath = curWwwPath.substring(0, pos);
	//获取带"/"的项目名，如：/ems
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	//获取项目的basePath   http://localhost:8080/ems/
	var basePath = localhostPath + projectName + "/";

	if(1 == type) {
		return curWwwPath;
	}

	if(2 == type) {
		return pathName;
	}

	if(3 == type) {
		return localhostPath;
	}
	return basePath;
};

/*var SERVERROOT = "http://www.bomizx.net/",
	SERVEROOTDATA = "http://www.bomizx.net/bmonline/website/ashx/",
	SERVEROOTFILE = "http://www.bomizx.net/bmonline/";*/
	
var SERVERROOT = "http://api.bmizx.tv/ ",
	SERVEROOTDATA = "http://api.bmizx.tv/bmonline/website/ashx/",
	SERVEROOTFILE = "http://api.bmizx.tv/bmonline/";

var ROOT = $.getBasePath(); //根路径
var ROOTLOGIN =$.getBasePath(3); //登录根路径
var ROOTFILE = ROOT + "images/";
var ROOTDATA = ROOT + "data/";
var SERVERQQ = "4006430618";
var SERVERTEL = "4006430618";


turnMobile(); //pc端访问移动端地址跳转到pc端
function turnMobile() {
	var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");

	var browser = navigator.userAgent.toLowerCase();

	var isMobile = false;

	for(var i = 0; i < mobileAgent.length; i++) {
		if(browser.indexOf(mobileAgent[i]) != -1) {
			isMobile = true;
			break;
		}
	}
	if(!isMobile) {
		location.href = SERVERROOT;
	}else{
		console.log('手机');
	}
}

//空判断
function isEmpty(obj, txt) {
	if(obj == "" || obj == null || obj == undefined) {
		layer.open({
			content: txt,
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	}

	return true;
}

//手机格式验证
function checkPhoneFormat(obj) {
	if(!(/^1[34578]\d{9}$/.test(obj))) {
		layer.open({
			content: "请输入正确的手机号码",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	}
	return true;
}

//昵称格式
function nickFormat(obj) {
	if(!(/^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,14}$/.test(obj))) {
		layer.open({
			content: "请设置合法的昵称格式",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	}
	return true;
}

//密码格式
function pwdFormat(obj) {
	if(!(/^[\w]{4,14}$/.test(obj))) {
		layer.open({
			content: "请设置合法的密码格式",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	}
	return true;
}

function goBack() {
	document.referrer === '' ?
		window.location.href = ROOT + "index.html" :
		window.history.go(-1);
}

function goBack2() {
	document.referrer === '' ?
		window.location.href = ROOTLOGIN + "/index.html" :
		window.location.href = document.referrer;
}

$(".cancel").on("click", function() {
	goBack();
})

$("#toggleQuickBtns").on("click", function() {
	$(this).toggleClass("active");
	$(".quickBoxWrap").toggleClass("active");
})

$(".quickBoxWrap").on("click", function() {
	$(this).toggleClass("active");
	$("#toggleQuickBtns").toggleClass("active");
})

//is logined
function isLogined() {
	var isLoginUserId = localStorage.getItem('$ycuid');
	if(isLoginUserId == "" || isLoginUserId == null || isLoginUserId == undefined) {
		return false;
	}
	return true;
}

function isNotrace() {
	if(typeof localStorage === 'object') {
		try {
			localStorage.setItem('localStorage', 1);
			localStorage.removeItem('localStorage');
		} catch(e) {
			Storage.prototype._setItem = Storage.prototype.setItem;
			Storage.prototype.setItem = function() {};
			layer.open({
				content: '为了更好的用户体验,请先退出浏览器无痕模式！',
				btn: ['查看帮助', '我知道'],
				yes: function() {
					window.location.href = "http://jingyan.baidu.com/article/295430f121c9f50c7e00509a.html";
				}
			});
		}
	}
}

isNotrace();

/*//loading
function loadingTips() {
	layer.open({
		type: 2,
		className: "loadingTips",
		shadeClose: false,
		content: '加载中',
	});

}

//close loading
function closeLoadingTips() {
	layer.closeAll();
}

//loading error tips and refresh
function loadingErrorTips() {
	layer.open({
		type: 2,
		className: "loadingTips loadErrorRefresh",
		shadeClose: false,
		content: '加载错误，点击刷新',
	});
}

//loading
function loadingTipsAuto() {
	layer.open({
		type: 2,
		className: "loadingTips",
		shadeClose: false,
		content: '加载中',
		time:2
	});

}

$("body").on("click", ".loadErrorRefresh", function() {
	window.location.reload();
})

//上啦加载和下拉刷新
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function pullUploaded(){
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
console.log(pullUpOffset)
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		 mouseWheel: true, //开启鼠标滚轮支持
         scrollbars: true, //开启滚动条
		//刷新的时候，加载初始化刷新更多的提示div
		onRefresh: function() {
			
			if(this.maxScrollY > -40) {
				pullUpEl.style.display = 'none';
			} else {
				pullUpEl.style.display = 'block';
				if(pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			}
		},
		//拖动，滚动位置判断
		onScrollMove: function() {
			
			if(this.maxScrollY < 0 && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to load more...';
				this.maxScrollY = this.maxScrollY;
			} else if(this.maxScrollY < 0 && this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
				
			}
		},
		onScrollEnd: function() {
			if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
				$.pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function() {
		document.getElementById('wrapper').style.left = '0';
	}, 800);
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		 mouseWheel: true, //开启鼠标滚轮支持
         scrollbars: true, //开启滚动条
		//刷新的时候，加载初始化刷新更多的提示div
		onRefresh: function() {
			if(this.maxScrollY > -40) {
				pullUpEl.style.display = 'none';
			} else {
				pullUpEl.style.display = 'block';
				if(pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				} else if(pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			}
		},
		//拖动，滚动位置判断
		onScrollMove: function() {
			if(this.y > 5 && !pullDownEl.className.match('flip')) { //判断是否向下拉超过5,问题：这个单位好像不是px
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if(this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if(this.maxScrollY < 0 && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to load more...';
				this.maxScrollY = this.maxScrollY;
			} else if(this.maxScrollY < 0 && this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.style.display = 'block';
				pullUpEl.querySelector("span").className = 'pullUpIcon';
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function() {
			if(pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
				$.pullDownAction(); // Execute custom function (ajax call?)
			} else if(pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
				$.pullUpAction(); // Execute custom function (ajax call?)
			}
		}
	});

	setTimeout(function() {
		document.getElementById('wrapper').style.left = '0';
	}, 800);
}*/

function flashChecker() {
	var hasFlash = 0; //是否安装了flash
	var flashVersion = 0; //flash版本

	//IE浏览器
	if("ActiveXObject" in window) {
		try {
			var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			hasFlash = 1;
			VSwf = swf.GetVariable("$version");
			flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
		} catch(e) {}
		//非IE浏览器
	} else {
		try {
			if(navigator.plugins && navigator.plugins.length > 0) {
				var swf = navigator.plugins["Shockwave Flash"];
				if(swf) {
					hasFlash = 1;
					var words = swf.description.split(" ");
					for(var i = 0; i < words.length; ++i) {
						if(isNaN(parseInt(words[i]))) continue;
						flashVersion = parseInt(words[i]);
					}
				}
			}
		} catch(e) {}
	}
	return {
		f: hasFlash,
		v: flashVersion
	};
}

//document.addEventListener('touchmove', function(e) {
//	e.preventDefault();
//}, false);