/*
 * Autor：Jabo
 * Time:2017/04/26
 * Desc:亿策在线教育逻辑
 */

////////////////////////////////////////////////////
//获得URL参数
///////////////////////////////////////////////////
$.fn.getUrlParam = function(para) {
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

$.getBasePath = function() {
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
	var basePath = localhostPath + "/";
	return basePath;
};


function closeAllLayerFrames() {
	layer.closeAll('iframe');
}

/*var ROUTEROOT = $.getBasePath();
var ROUTE = ROUTEROOT + "bmOnline/website/ashx/";
var ROUTEFILE = ROUTEROOT + "bmOnline/";*/

//全局ROUTE


/*
var ROUTE = "http://www.bomizx.net/bmonline/website/ashx/";
var ROUTEROOT = "http://www.bomizx.net/";
var ROUTEFILE = "http://www.bomizx.net/bmonline/";
*/

var ROUTE = "http://api.bmizx.tv/bmonline/website/ashx/";
var ROUTEROOT = "http://api.bmizx.tv/";
var ROUTEFILE = "http://api.bmizx.tv/bmonline/";


var RELETIVEROUTEROOT = $.getBasePath();

turnMobile();//移动端访问跳转到移动端
function turnMobile(){
	var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");

var browser = navigator.userAgent.toLowerCase();

var isMobile = false;

for(var i = 0; i < mobileAgent.length; i++) {
	if(browser.indexOf(mobileAgent[i]) != -1) {
		isMobile = true;
		location.href = 'http://m.bomizx.net';
		break;
	}
}
}

/////////////////////////////////////////////////
//浏览器低版本提示
////////////////////////////////////////////////
function lowBrowerTip() {
	var b_name = navigator.appName;
	var b_version = navigator.appVersion;
	var version = b_version.split(";");
	if(b_name == "Microsoft Internet Explorer") {
		/*如果是IE6或者IE7*/
		var trim_version = version[1].replace(/[ ]/g, "");
		if(trim_version == "MSIE7.0" || trim_version == "MSIE6.0" || trim_version == "MSIE8.0") {
			/* alert("IE浏览器版本过低，请到指定网站去下载相关版本"); */
			window.location.href = ROUTEROOT + "ycedu/incompatible.html";
			return false;
		}
	}
}
lowBrowerTip();

$.scrollTo = function(pos, time) {
	if(time == null || time == undefined || time == "") {
		time = 0;
	}
	if(pos == null || pos == undefined || pos == "") {
		pos = 0;
	}
	$('html,body').animate({
		scrollTop: pos
	}, time);
}

var imgVCKey = "",
	imgVCValue = "";

////////////////////////////////////////////////////
//flash 支持
///////////////////////////////////////////////////
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

////////////////////////////////////////////////////
//判断登入页面的显示内容
///////////////////////////////////////////////////
$.loginshow = function(para) {
	var $loginForm = $("#jloginForm"); //账号登入
	var $jphoneLoginForm = $("#jphoneLoginForm"); //手机登入
	var $jphoneRegForm = $("#jphoneRegForm"); //手机注册
	var $jforgetFrom = $("#jforgetFrom"); //忘记密码
	var $changeType = $(".dycchange-type"); //显示切换
	var $regbtn = $(".dyccurrentreg-box"); //立即注册

	var loginArr = new Array();
	loginArr.push($loginForm);
	loginArr.push($jphoneLoginForm);
	loginArr.push($jphoneRegForm);
	loginArr.push($jforgetFrom);

	//判断是否显示立即注册
	var isShowRegBtn = function() {
		if("none" == $regbtn.css("display")) {
			$regbtn.css("display", "block");
		}
	};

	//页面跳转显示
	var selectShow = function(number) {
		$(loginArr).each(function(index, ele) {
			if(index == number) {
				ele.css("display", "block")
				return;
			}
			ele.css("display", "none")
		})
	};

	//内部切换显示
	var innerSelectShow = function(index) {
		switch(index) {
			case "1":
				selectShow(1);
				break;
			case "2":
			case "3":
			case "4":
				selectShow(0);
				isShowRegBtn();
				break;
			case "5":
				selectShow(2);
				break;
			case "6":
				selectShow(3);
				break;
			default:
				console.log("error");
				break;
		}
	};

	//URL 判断
	if(para == null || para == "1") {
		selectShow(0);
	} else if(para == "2") {
		selectShow(2);
		$regbtn.css("display", "none")
	}

	//本页切换
	var tempIndex; //临时展示下标
	$changeType.on("click", function() {
		tempIndex = $(this).attr("data-index");
		innerSelectShow(tempIndex);
		$("#jweixinTips").text("推荐使用扫码登录");
		$("#jweixinTips2").text("微信扫描二维码安全登录！");
		$.loginType(0);
	});

	//立即注册
	$regbtn.on("click", function() {
		innerSelectShow("5");
		$.loginType(1);
		$("#jweixinTips").text("推荐使用扫码注册");
		$("#jweixinTips2").text("微信扫描二维码安全注册！");
		$(this).css("display", "none");
	});

	$(".imageVC").on("click", function() {
		getImgVC();
	})

	function getImgVC() {
		$.ajax({
			type: "get",
			//url: ROUTE + "Member.ashx?action=GetVerifyCode",
			url: ROUTE + "Member.ashx?action=GetVerifyCode",
			dataType: "json",
			data: {

			},
			success: function(result) {
				$(".imageVC").attr("src", ROUTEFILE + result[0].codeImg);
				imgVCKey = result[0].codeKey;
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	getImgVC();

	//忘记密码
	$(".dycpwd-forget").on("click", function() {
		innerSelectShow("6");
	});

}
$(function() {
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?540062d2060e426ce823cf5eb331749d";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();

	/*
	 * 搜索部分
	 */
	$("#jsearchBtn").on("click",
		function() {
			var con = $(".bmnavSearchInputBox input").val();
			var selects = $('.bmnavSearchSelect'); //获取选项值
			console.log(selects.val());
			if(selects.val() == 3) {
				location.href = "http://wpa.qq.com/msgrd?v=3&amp;uin=13836388&amp;site=qq&amp;menu=yes"
			} else {
				location.href = RELETIVEROUTEROOT + "ycedu/searchlist.html?searchval=" + con + "&options=" + selects.val();
			}
		});

	/*
	 * 检查登入状态并获取购物数
	 */
	var $jhadLogined = $("#jhadLogined"),
		$jquitLogin = $("#jquitLogin"),
		$dycloginBtn = $("#dyclogin-btn"),
		$dycregisterBtn = $("#dycregister-btn");

	window.$mid = undefined;
	window.$mName = undefined;
	window.$mNickName = undefined;
	window.$mUserIcon = undefined;
	window.$mLever = undefined; //会员等级
	window.$mMoney = undefined; //播米币余额

	//check登入状态
	function checkLoginStatu() {
		/*var s = getLever();*/
		var $shopNumber = $("#jsvtn_shop"); //购物数

		if(supportlocalStorage()) {
			if(localStorage.getItem("mid") != null) {
				$dycloginBtn.css("display", "none");
				$dycregisterBtn.css("display", "none");
				$jquitLogin.css("display", "inline-block");
				//$jhadLogined.css("display", "inline-block").html('<span>'+localStorage.getItem("mNickName")+'</span>'+'<span>'+localStorage.getItem("mLever")+'</span>');
				$jhadLogined.css("display", "inline-block").text(localStorage.getItem("mNickName"));
				$("#bmNickName").text(localStorage.getItem("mNickName"));
				$mid = localStorage.getItem("mid");
				$mName = localStorage.getItem("mName");
				$mNickName = localStorage.getItem("mNickName");
				$mUserIcon = localStorage.getItem("mUserIcon");
				$mLever = localStorage.getItem("mLever");
				$mMoney = localStorage.getItem("mMoney");

				$(".bmnavUserBox").addClass("active");

			} else if(sessionStorage.getItem("mid") != null) {
				$dycloginBtn.css("display", "none");
				$dycregisterBtn.css("display", "none");
				$jquitLogin.css("display", "inline-block");
				$jhadLogined.css("display", "inline-block").text(sessionStorage.getItem("mNickName"));
				$("#bmNickName").text(sessionStorage.getItem("mNickName"));
				$mid = sessionStorage.getItem("mid");
				$mName = sessionStorage.getItem("mName");
				$mNickName = sessionStorage.getItem("mNickName");
				$mUserIcon = sessionStorage.getItem("mUserIcon");
				$mLever = sessionStorage.getItem("mLever");
				$mMoney = sessionStorage.getItem("mMoney");
				$(".bmnavUserBox").addClass("active");
			}
		} else {
			if($.cookie("mid") != null) {
				$dycloginBtn.css("display", "none");
				$dycregisterBtn.css("display", "none");
				$jquitLogin.css("display", "inline-block");
				$jhadLogined.css("display", "inline-block").text($.cookie("mNickName"));
				$("#bmNickName").text($.cookie("mNickName"))
				$mid = $.cookie("mid");
				$mName = $.cookie("mName");
				$mNickName = $.cookie("mNickName");
				$mUserIcon = $.cookie("mUserIcon");
				$mLever = $.cookie("mLever");
				$mMoney = $.cookie("mMoney");
				$(".bmnavUserBox").addClass("active");
			}
		}
		//已登入时处理,购物车状态
		//暂时仅作本地处理：后端暂未处理
		if($mid != null && $mid != undefined && $mid != "") {
			$shopNumber.on("click", function() {
				//window.open("shoppingcart.html");
				//var newWindow = window.open('about:blank');
				//window.location.href = 'shoppingcart.html';
			})
			//			$.ajax({
			//				type: "POST",
			//				//url: ROUTE + "Notice.ashx?action=getRecentNotice",
			//				url: "server/getspcartNumber.json",
			//				dataType: "json",
			//				data: {
			//					mid: $mid
			//				},
			//				success: function(result) {
			//					$shopNumber.html("<span class='shops-num'>" + result[0].number + "</span>");
			//				},
			//				error: function(err) {
			//					console.log(err);
			//				}
			//			});
		}
	}
	checkLoginStatu();

	//判断登入状态跳转
	function judgeStatuHref() {
		if($mid != null && $mid != undefined && $mid != "") {
			return true;
		}
		return false;
	}

	//退出登入处理
	$jquitLogin.on("click", loginOut);
	$(".bmnavQuit").on("click", loginOut);

	function loginOut() {
		$dycloginBtn.css("display", "inline-block");
		$dycregisterBtn.css("display", "inline-block");
		$jquitLogin.css("display", "none");
		$jhadLogined.css("display", "none");

		if(supportlocalStorage()) {
			if(localStorage.getItem("mid") != null) {
				localStorage.removeItem("mid");
				localStorage.removeItem("mName");
				localStorage.removeItem("mNickName");
				localStorage.removeItem("mUserIcon");
				localStorage.removeItem("autoTime");
				localStorage.removeItem("mLever");
				localStorage.removeItem("mMoney");
				localStorage.removeItem("mUserType");
			} else {
				sessionStorage.removeItem("mid");
				sessionStorage.removeItem("mName");
				sessionStorage.removeItem("mNickName");
				sessionStorage.removeItem("mUserIcon");
				sessionStorage.removeItem("mLever");
				sessionStorage.removeItem("mMoney");
				sessionStorage.removeItem("mUserType");
			}
		} else {
			$.cookie("mid", null);
			$.cookie("mName", null);
			$.cookie("mNickName", null);
			$.cookie("mUserIcon", null);
			$.cookie("mLever", null);
			$.cookie("mMoney", null);
			$.cookie("mUserType", null);
		}
		//QC.Login.signOut();//注销QQ登录调用事件
		window.location.reload();

	}

	$.liveQuitLogin = loginOut;

	/*
	 * 导航部分
	 */
	/*$(".jToggleSearch").on("click", function() {
		var $dycsearch = $(".dycmobile-search")
		if($dycsearch.hasClass("searching")) {
			if($dycsearch.val() == "") {
				$dycsearch.removeClass("searching");
			} else {
				API search information
			}
		} else {
			$dycsearch.addClass("searching");
		}
	});*/

	$("#moblieMenu, #bmnavMask").on("click", function() {
		$("#moblieMenu, #bmnavMask, #bmnavWrap .bmnavBox").toggleClass("active");
	});

	//二级菜单Toggle
	$(".jOpenSecond").on("click", function() {
		$(this).siblings(".dycnav-second").css("right", "0");
	})
	$(".goBack").on("click", function() {
		$(this).parent(".dycnav-second").css("right", "-200px");
	})

	function prePage() {
		//var prePage = window.location.href;
		var prePage = window.document.location.href;
		//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
		var pathName = window.document.location.pathname;

		if(supportlocalStorage()) {
			localStorage.setItem("prePage", prePage);
			localStorage.setItem("pathName", pathName);
		} else {
			$.cookie("prePage", prePage);
			$.cookie("pathName", pathName);
		}
	}
	$("#dyclogin-btn, #dycregister-btn").on("click", function() { //登入与注册前URL
		prePage();
	});

	/*
	 * 页脚部分
	 */
	//footer 活动公告
	$.activeList = function() {
		var $jactiveList = $("#activelist"),
			$htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "Notice.ashx?action=getRecentNotice",
			dataType: "json",
			data: {},
			success: function(result) {
				result.forEach(function(value, index) {

					if(value.href != "") {
						$htmlStr += "<li><a href='" + RELETIVEROUTEROOT + "ycedu/dbadv.html' target='_blank'>" + value.name + "</a></li>";
					} else {
						$htmlStr += "<li><a href='" + RELETIVEROUTEROOT + "ycedu/tutorial.html?noticeId=" + value.noticeId + "' target='_blank'>" + value.name + "</a></li>";
					}

				})
				$jactiveList.html($htmlStr);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	$.activeList();

	/*
	 * 名师风采
	 */
	$(".jycmsfc").on("mouseenter", ".ycpanel-image", function() {
		var $index = $(this).attr("data-index");
		var $wrap = $(".dycmsinf .ycwrap");

		switch($index) {
			case "1":
				$wrap.css("-webkit-transform", "translateX(0)");
				$wrap.css("transform", "translateX(0)");
				break;
			case "2":
				$wrap.css("-webkit-transform", "translateX(-25%)");
				$wrap.css("transform", "translateX(-25%)");
				break;
			case "3":
				$wrap.css("-webkit-transform", "translateX(-50%)");
				$wrap.css("transform", "translateX(-50%)");
				break;
			case "4":
				$wrap.css("-webkit-transform", "translateX(-75%)");
				$wrap.css("transform", "translateX(-75%)");
				break;
			default:
				console.log("error");
				break;
		}
	});

	/*
	 * 购物车 spcart
	 */

	/*
	 * 注册登入界面
	 */
	function inputDeal($obj, $str) { //输入处理
		$obj.on("input", function() {
			$(this).siblings(".error").css("display", "none").text($str);
		})
	}

	function subcheckEmpty($obj) { //提交空处理
		if("" == $obj.val()) {
			$obj.focus();
			$obj.siblings(".error").css("display", "block");
			return true;
		}
		return false;
	}

	function formatCheck(reg, $obj, $str) { //验证格式
		if(!(reg.test($obj.val()))) {
			$obj.focus().siblings(".error").css("display", "block").text($str);
			return false;
		}
		return true;
	}

	function changeVCShow(obj) { //短信验证码计时
		var time = 120;
		var tempCount = setInterval(function() {
			obj.text(time-- + "s");
		}, 1000)

		setTimeout(function() {
			obj.text("获取短信验证码");
			clearInterval(tempCount);
		}, 121000);
	}

	function supportlocalStorage() { //是否支持本地存储
		if(window.Storage && window.localStorage && window.localStorage instanceof Storage) {
			return true;
		} else {
			return false;
		}
	}

	function checkExpire() { //判断长期制 是否过期
		var diffTimeStamp = (Date.parse(new Date()) / 1000) - (parseInt(localStorage.getItem("autoTime")));

		if(diffTimeStamp / (3600 * 24) > 15) { //过期
			localStorage.removeItem("autoTime");
		}

		return;
	}
	
	function islocalStorage(mid, mName, mNickName, mUserIcon, mLever, mMoney) { //长期制
		if(supportlocalStorage()) {
			var autoTime = Date.parse(new Date());
			localStorage.setItem("autoTime", autoTime / 1000);
			localStorage.setItem("mid", mid);
			localStorage.setItem("mName", mName);
			localStorage.setItem("mNickName", mNickName);
			localStorage.setItem("mUserIcon", mUserIcon);
			localStorage.setItem("mLever", mLever);
			localStorage.setItem("mMoney", mMoney);

		} else {
			$.cookie('mid', mid, {
				expires: 15
			}); //默认15天
			$.cookie('mName', mName, {
				expires: 15
			});
			$.cookie('mAvatar', mAvatar, {
				expires: 15
			});
			$.cookie('mMoblie', mMoblie, {
				expires: 15
			});
			$.cookie('mLever', mLever, {
				expires: 15
			});
			$.cookie('mMoney', mMoney, {
				expires: 15
			});
		}
	}

	function nolocalStorage(mid, mName, mNickName, mUserIcon, mLever, mMoney) { //回话制
		if(supportlocalStorage()) {
			sessionStorage.setItem("mid", mid);
			sessionStorage.setItem("mName", mName);
			sessionStorage.setItem("mNickName", mNickName);
			sessionStorage.setItem("mUserIcon", mUserIcon);
			sessionStorage.setItem("mLever", mLever);
			sessionStorage.setItem("mMoney", mMoney);
		} else {
			$.cookie('mid', mid);
			$.cookie('mName', mName);
			$.cookie("mNickName", mNickName);
			$.cookie("mUserIcon", mUserIcon);
			$.cookie("mLever", mLever);
			$.cookie("mMoney", mMoney);
		}
	}

	function gotoPrepage() { //返回登入前页面
		setTimeout(function() {
			if(supportlocalStorage()) {
				var prePage = localStorage.getItem("prePage");
				var pathName = localStorage.getItem("pathName");

				if((prePage != null) && (pathName != '/login.html') && (pathName != '/bindlogin.html')) {
					window.location.href = prePage;
				} else {
					window.location.href = "index.html";
				}
			} else {
				var prePage = $.cookie("prePage");
				var pathName = localStorage.getItem("pathName");

				if((prePage != null) && (pathName != '/login.html') && (pathName != '/bindlogin.html')) {
					window.location.href = prePage;
				} else {
					window.location.href = "index.html";
				}
			}
		}, 1000);
	}

	//手机密码登入
	$("#jloginForm-btn").on("click", function() {
		$.pwdsubmit();
	});
	
	//外部登录
	$.thirdLoginFunc = function(mid, mName, mNickName, mUserIcon, mLever, mMoney) {
		 islocalStorage(mid, mName, mNickName, mUserIcon, mLever, mMoney);
		 layer.msg("登录成功！");
		  
		 if(parent.location.pathname =="/login.html"){
			 setTimeout(function(){
			    gotoPrepage();
			 },1000);
		 }else{
			 parent.location.reload();
		 } 
	}

	/*$("#jloginForm-btn").on("click", function() {*/
	$.pwdsubmit = function() {
		var $jloginForm = $("#jloginForm"), //账号登入表单
			$loginname = $(".dyclogin-name-input"), //name
			$loginpwd = $(".dyclogin-pwd-input"), //pwd
			$jautologin = $("#jautologin"); //是否自动登入

		inputDeal($loginname, "用户名不能为空!");
		inputDeal($loginpwd, "密码不能为空!");
		if(subcheckEmpty($loginname) ? true : subcheckEmpty($loginpwd)) {
			return;
		} else {
			//console.log($jloginForm.serializeObject());
			//console.log($jloginForm.serialize());
			//$.post("server/serverlogin.php?action=sdasdf", $jloginForm.serialize());
			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=memberLogin",
				dataType: "json",
				cache: false,
				data: $jloginForm.serialize(),
				success: function(result) {
					if(803 == result) {
						$loginname.siblings(".error").text("该账号未注册！").css("display", "block").focus();
						return false;
					} else if(804 == result) {
						$loginpwd.siblings(".error").text("密码不正确！").css("display", "block").focus();
						return false;
					}

					var tempresult = result[0];
					if($jautologin.is(':checked')) { //存储
						islocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
					} else {
						nolocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
					}

					layer.msg("登入成功！");

					if($(this).getUrlParam("pageType") == "live") {
						setTimeout(function() {
							parent.location.reload();
							parent.closeAllLayerFrames();
						}, 1000);
					} else {
						gotoPrepage();
					}

				},
				error: function(err) {
					console.log(err);
				}
			});

		}
	}

	//手机号快速登入
	$("#jloginquickphone").on("click", function() {
		$.phonesubmit();
	});
	/*$("#jloginquickphone").on("click", function() {*/
	$.phonesubmit = function() {
		var $jloginphone = $("#jloginphone"), //手机号
			$jloginphonevc = $("#jloginphonevc"), //验证码
			$jphoneLoginForm = $("#jphoneLoginForm"), //手机登入form
			$jautologin = $("#jautologin"); //记住密码

		inputDeal($jloginphone, "手机号不能为空!");
		inputDeal($jloginphonevc, "验证码不能为空!");

		if(subcheckEmpty($jloginphone) ? true : subcheckEmpty($jloginphonevc)) {
			return;
		} else {
			if(!formatCheck(/^1[34578]\d{9}$/, $jloginphone, "请输入正确的手机号!")) {
				return;
			}
			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=memberValidLogin",
				dataType: "json",
				cache: false,
				data: $jphoneLoginForm.serialize(),
				success: function(result) {
					if(803 == result) {
						$jloginphone.siblings(".error").text("手机号未注册！").css("display", "block").focus();
						return false;
					} else if(805 == result) {
						$jloginphonevc.siblings(".error").text("验证码错误！").css("display", "block").focus();

						return false;
					}

					var tempresult = result[0];
					if($jautologin.is(':checked')) { //存储
						islocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
					} else {
						nolocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
					}

					layer.msg("登入成功！");
					if($(this).getUrlParam("pageType") == "live") {
						setTimeout(function() {
							parent.location.reload();
							parent.closeAllLayerFrames();
						}, 1000);
					} else {
						gotoPrepage();
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	}
	//快速登入获得验证码
	var templgvcflag1 = true; //是否可获取短信验证码标识
	$("#jgetPhoneLoginVC").on("click", function() {
		var $jloginphone = $("#jloginphone"), //手机号
			$this = $(this);

		inputDeal($jloginphone, "手机号不能为空!");
		if($("#jloginIMgVC").val() == "") {
			layer.msg("图形验证码不能为空!");
			return false;
		}

		if(subcheckEmpty($jloginphone)) {
			return;
		} else if(!formatCheck(/^1[34578]\d{9}$/, $jloginphone, "请输入正确的手机号!")) {
			return;
		}

		if(templgvcflag1) {
			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=getLoginValidCode",
				dataType: "json",
				cache: false,
				data: {
					"name": $jloginphone.val(),
					codeKey: imgVCKey,
					codeValue: $("#jloginIMgVC").val()
				},
				success: function(result) {
					if(result == '810' || result == 810) {
						layer.msg("图形验证码错!");
						return false;
					}

					if(result == '815' || result == 815) {
						layer.msg("请勿重复发送多次请求!");
						return false;
					}

					templgvcflag1 = false;
					changeVCShow($this);
					setTimeout(function() { //120s 后可重新发送
						templgvcflag = true;
						templgvcflag1 = true;
					}, 120000)
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});

	//注册
	$("#jsubRegForm").on("click", function() {
		$.subRegForm();
	});
	
	$.subRegForm = function() {
		var $jphoneRegForm = $("#jphoneRegForm"), //注册表单
			$jregMoblie = $("#jregMoblie"), //手机号
			$jregVC = $("#jregVC"), //验证码
			$jregName = $("#jregName"), //用户名
			$jregnickName = $("#jregnickName"), //昵称
			$jregPwd = $("#jregPwd"), //密码
			$jregIvc = $("#jregIvc"), //邀请码
			$jagreement = $("#jagreement"), //协议
			$jautologin = $("#jautologin"); //记住密码
			
			$jregName.val("");
			$jregnickName.val("");
			$jregPwd.val("123456");
			
		inputDeal($jregMoblie, "手机号不能为空!");
		inputDeal($jregVC, "验证码不能为空!");
		//inputDeal($jregName, "用户名不能为空!");
		//inputDeal($jregnickName, "昵称不能为空!");
		//inputDeal($jregPwd, "密码不能为空!");
		//inputDeal($jregIvc, "请输入5-12位邀请码!");

		/*
		if(subcheckEmpty($jregMoblie) ? true : subcheckEmpty($jregVC)) {
			return;
		} else if(subcheckEmpty($jregName) ? true : subcheckEmpty($jregPwd)) {
			return;
		} else {
			if(!formatCheck(/^1[34578]\d{9}$/, $jregMoblie, "请输入正确的手机号!")) {
				return false;
			} else if(!formatCheck(/^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/, $jregName, "请设置4-16位的用户名")) {
				return false;
			} else if(!formatCheck(/^\w{4,8}$/, $jregPwd, "请设置4-8位的密码")) {
				return false;
			} else if(!$jagreement.is(":checked")) {
				layer.msg("同意播米协议后才可注册哦！");
				return false;
			} else if(!(($jregIvc.val() == '') || ($jregIvc.val() == undefined))) {
				if(!formatCheck(/^\d{5,12}$/, $jregIvc, "请输入5-12位邀请码!")) {
					return false;
				}
			}
			*/
		if(subcheckEmpty($jregMoblie) ? true : subcheckEmpty($jregVC)) {
			return;
		} else {
			if(!formatCheck(/^1[34578]\d{9}$/, $jregMoblie, "请输入正确的手机号!")) {
				return false;
			} else if(!$jagreement.is(":checked")) {
				layer.msg("同意播米协议后才可注册哦！");
				return false;
			} 

			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=memberRegister",
				dataType: "json",
				cache: false,
				data: $jphoneRegForm.serialize(),
				success: function(result) {
					if(808 == result) {
						$jregMoblie.focus().siblings(".error").text("手机号已注册！").css("display", "block");
						return false;
					} else if(805 == result) {
						$jregVC.focus().siblings(".error").text("验证码错误！").css("display", "block");
						return false;
					} else if(809 == result) {
						$jregName.focus().siblings(".error").text("该用户已注册！").css("display", "block");
						return false;
					}

					var tempresult = result[0];
					if($jautologin.is(':checked')) { //存储
						islocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
					} else {
						nolocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
					}
					
					CHAT2.liveLoginTips(tempresult.nickName);
			
					layer.msg("恭喜您注册成功！");
					if($(this).getUrlParam("pageType") == "live") {
						setTimeout(function() {
							parent.location.reload();
							parent.closeAllLayerFrames();
						}, 1000);
					} else {
						gotoPrepage();
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	};

	//注册验证码
	var templgvcflag2 = true; //是否可获取短信验证码标识
	inputDeal($("#jregMoblie"), "请输入正确的手机号!");
	$("#jgetPhoneRegVC").on("click", function() {
		var $jregMoblie = $("#jregMoblie"), //手机号
			$this = $(this);
		if(subcheckEmpty($jregMoblie)) {
			return false;
		} else if(!formatCheck(/^1[34578]\d{9}$/, $jregMoblie, "请输入正确的手机号!")) {
			return false;
		} else if($("#jregIMgVC").val() == "") {
			layer.msg("图形验证码不能为空!");
			return false;
		}

		inputDeal($jregMoblie, "手机号不能为空!");

		if(templgvcflag2) {
			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=getRegisterValidCode",
				dataType: "json",
				cache: false,
				data: {
					"name": $jregMoblie.val(),
					codeKey: imgVCKey,
					codeValue: $("#jregIMgVC").val()
				},
				success: function(result) {
					if(result == '810' || result == 810) {
						layer.msg("图形验证码错!");
						return false;
					}

					if(result == '815' || result == 815) {
						layer.msg("请勿重复发送多次请求!");
						return false;
					}

					if(result == '808') {
						$('#jregMoblie').siblings(".error").css("display", "block").text('该账号已注册');
					} else {
						templgvcflag2 = false;
						changeVCShow($this);
						setTimeout(function() { //120s 后可重新发送
							templgvcflag = true;
							templgvcflag2 = true;
						}, 120000)
					}
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});

	//忘记密码
	$("#jforgetSubBtn").on("click", function() {
		var $jforgetFrom = $("#jforgetFrom"), //忘记表单
			$jforgetPhone = $("#jforgetPhone"), //手机号
			$jforgetVC = $("#jforgetVC"), //验证码
			$jforgetPwd = $("#jforgetPwd"), //密码
			$jforgetPwd2 = $("#jforgetPwd2"); //密码2

		inputDeal($jforgetPhone, "手机号不能为空!");
		inputDeal($jforgetVC, "验证码不能为空!");
		inputDeal($jforgetPwd, "密码不能为空!");
		inputDeal($jforgetPwd2, "密码不能为空!");

		if(subcheckEmpty($jforgetPhone) ? true : subcheckEmpty($jforgetVC)) {
			return;
		} else if(subcheckEmpty($jforgetPwd) ? true : subcheckEmpty($jforgetPwd2)) {
			return;
		} else {
			if(!formatCheck(/^1[34578]\d{9}$/, $jforgetPhone, "请输入正确的手机号!")) {
				return false;
			} else if(!formatCheck(/^\w{4,8}$/, $jforgetPwd, "请设置4-8位的密码")) {
				return false;
			} else if(!formatCheck(/^\w{4,8}$/, $jforgetPwd2, "请设置4-8位的密码")) {
				return false;
			} else if($jforgetPwd.val() != $jforgetPwd2.val()) {
				layer.msg("两次输入的密码不一致！");
				return false;
			}

			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=resetPassword",
				dataType: "json",
				cache: false,
				data: $jforgetFrom.serialize(),
				success: function(result) {
					if(803 == result) {
						$jforgetPhone.siblings(".error").text("该用户未注册！").css("display", "block").focus();
						return false;
					} else if(805 == result) {
						$jforgetVC.siblings(".error").text("验证码错误！").css("display", "block").focus();
						return false;
					}

					layer.msg("密码重置成功！");
					setTimeout(function() {
						window.location.reload();
					}, 2000);
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});

	//忘记验证码
	var templgvcflag3 = true; //是否可获取短信验证码标识
	$("#jgetPhoneForgetVC").on("click", function() {
		var $jforgetPhone = $("#jforgetPhone"), //手机号
			$this = $(this);
		if(subcheckEmpty($jforgetPhone)) {
			return;
		} else if(!formatCheck(/^1[34578]\d{9}$/, $jforgetPhone, "请输入正确的手机号!")) {
			return;
		} else if($("#jforgetImgVC").val() == "") {
			layer.msg("图形验证码不能为空!");
			return false;
		}

		inputDeal($jforgetPhone, "手机号不能为空!");

		if(templgvcflag3) {
			$.ajax({
				type: "POST",
				url: ROUTE + "Member.ashx?action=getResetValidCode",
				dataType: "json",
				cache: false,
				data: {
					"name": $jforgetPhone.val(),
					codeKey: imgVCKey,
					codeValue: $("#jforgetImgVC").val()
				},
				success: function(result) {
					if(result == '810' || result == 810) {
						layer.msg("图形验证码错!");
						return false;
					}

					if(result == '815' || result == 815) {
						layer.msg("请勿重复发送多次请求!");
						return false;
					}

					templgvcflag3 = false;
					changeVCShow($this);
					setTimeout(function() { //120s 后可重新发送
						templgvcflag = true;
						templgvcflag3 = true;
					}, 120000)
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});

	//登录绑定页面
	$.bindNumber = function(openId, nickName, iconPath) {
		var jloginbind = $('#jloginbind'), //登录
			jlbindname = $('#jloginForm .dyclogin-name-input'),
			jlbindpsd = $('#jloginForm .dyclogin-pwd-input'),
			jautologin = $("#jautologin"), //记住密码;
			$jsubRegbind = $('#jsubRegbind'), //注册
			$jregMoblie = $("#jregMoblie"), //手机号
			$jregVC = $("#jregVC"), //验证码
			$jregPwd = $("#jregPwd"), //密码
			$jregIvc = $("#jregIvc"), //邀请码
			$jagreement = $("#jagreement"); //记住密码;

		jloginbind.click(function() {
			inputDeal(jlbindname, "用户名不能为空!");
			inputDeal(jlbindpsd, "密码不能为空!");
			if(subcheckEmpty(jlbindname) ? true : subcheckEmpty(jlbindpsd)) {
				return;
			} else {
				$.ajax({
					type: "get",
					url: ROUTE + "Member.ashx?action=boundToAccount",
					data: {
						"OpenId": openId /*'A9B4FA369ED737876EB3AC8CABA9174C'*/ ,
						"mobile": jlbindname.val(),
						"password": jlbindpsd.val(),
						"boundType": 0 //qq-0,weixin-1
					},
					dataType: 'json',
					success: function(result) {
						if(result == '831') { //用户不存在
							jlbindname.siblings(".error").text("该用户未注册！").css("display", "block").focus();
							return false;
						} else if(result == '832') { //该播米用户已经绑定过其他账号

							jlbindname.siblings(".error").text("该播米用户已被绑定！").css("display", "block").focus();
							return false;
						} else if(result == '804') { //密码错误

							jlbindpsd.siblings(".error").text("密码错误！").css("display", "block").focus();
							return false;
						} else if(result == '807') {
							console.log('服务器出错啦~')
						} else { //账号绑定成功
							var tempresult = result[0];
							if(jautologin.is(':checked')) { //存储
								islocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
							} else {
								nolocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
							}

							layer.msg("绑定成功！");
							QC.Login.signOut(); //注销QQ登录调用事件
							gotoPrepage();

						}
					},
					error: function(err) {
						console.log(err)
					}
				});
			}
		});

		$jsubRegbind.click(function() { //注册

			inputDeal($jregMoblie, "手机号不能为空!");
			inputDeal($jregVC, "验证码不能为空!");
			inputDeal($jregPwd, "密码不能为空!");
			inputDeal($jregIvc, "请输入5-12位邀请码!");
			if(subcheckEmpty($jregMoblie) ? true : subcheckEmpty($jregVC)) {
				return;
			} else {
				if(!formatCheck(/^1[34578]\d{9}$/, $jregMoblie, "请输入正确的手机号!")) {
					return false;
				} else if(!formatCheck(/^\w{4,8}$/, $jregPwd, "请设置4-8位的密码")) {
					return false;
				} else if(!$jagreement.is(":checked")) {
					layer.msg("同意播米协议后才可注册哦！");
					return false;
				} else if(!(($jregIvc.val() == '') || ($jregIvc.val() == undefined))) {
					if(!formatCheck(/^\d{5,12}$/, $jregIvc, "请输入5-12位邀请码!")) {
						return false;
					}

				}

				$.ajax({
					type: "POST",
					url: ROUTE + "Member.ashx?action=thirdRegister",
					data: {
						"OpenId": 'A9B4FA369ED737876EB3AC8CABA9174C',
						"mobile": $jregMoblie.val(),
						"password": $jregPwd.val(),
						"boundType": 0, //qq-0,weixin-1
						"nickName": nickName,
						"iconPath": iconPath,
						"validateCode": $jregVC.val()

					},
					dataType: 'json',
					success: function(result) {
						if(808 == result) {
							$jregMoblie.focus().siblings(".error").text("手机号已注册！").css("display", "block");
							return false;
						} else if(805 == result) {
							$jregVC.focus().siblings(".error").text("验证码错误！").css("display", "block");
							return false;
						}

						var tempresult = result[0];

						nolocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPathtempresult.memberlevel, tempresult.sowingCoin);
						QC.Login.signOut(); //注销QQ登录调用事件
						layer.msg("恭喜您注册成功！");

						gotoPrepage();
					},
					error: function(err) {
						console.log(err)
					}
				});
			}

		});

	}

	//登录页面-qq登录
	$.qqLogin = function(id) {
		/*$('#qqLoginBtn').click(function(){*/
		QC.Login({
			//btnId：插入按钮的节点id，必选
			btnId: "qqLoginBtn",
			//用户需要确认的scope授权项，可选，默认all
			scope: "all",
			//按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
			size: "B_S"
		}, function(reqData, opts) { //登录成功
			//根据返回数据，更换按钮显示状态方法

			QC.Login.getMe(function(openId, accessToken) { //获取当前登录用户的Access Token以及OpenID
				$.ajax({
					type: "get",
					url: ROUTE + "Member.ashx?action=qqLogin",
					data: {
						"qqOpenId": openId,
						"nickName": reqData.nickname,
						"iconPath": reqData.figureurl_qq_2
					},
					dataType: 'json',
					success: function(result) {
						if(result == '830') { //账号未绑定
							console.log(result)
							if(id !=""){
								window.location.href = 'bindlogin.html?nickname=' + reqData.nickname + '&openId=' + openId + '&iconPath=' + reqData.figureurl_qq_2+'&'+id;
							}else{
								window.location.href = 'bindlogin.html?nickname=' + reqData.nickname + '&openId=' + openId + '&iconPath=' + reqData.figureurl_qq_2;
							}
							
						} else {
							var tempresult = result[0];
							nolocalStorage(tempresult.memberId, tempresult.mobile, tempresult.nickName, tempresult.iconPath, tempresult.memberlevel, tempresult.sowingCoin);
							QC.Login.signOut(); //注销QQ登录调用事件
							gotoPrepage();
						}
					},
					error: function(err) {
						console.log(err);
					}
				});

			});

		}, function(opts) {
			//alert('注销成功')
			//QC.Login.signOut():void;
			//QC.Login.signOut(); //注销QQ登录调用事件
		});

		/*})*/
	}
	
	//微信登录
	$.getwxUserInfo = function (code) {
					$.ajax({
						type: 'get',
						url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
						data: {
							appid: 'wx554d4850ae066122',
							secret: 'c7bf4a7eb362ab00cd5337b27fed022f',
							code: code,
							grant_type: 'authorization_code'
						}
					});
				}

	//判断用户是否登入已经

	/*
	 * 首页
	 */
	//首页banner
	$.indexBannerFunc = function() {
		var $jindexBanner = $("#jindexBanner"),
			$htmlStr = "";
		$.ajax({
			type: "GET",
			//			ROUTEFILE +'ycedu/server/banner.json?s=首页',
			url: ROUTE + "Banner.ashx?action=getBanner&bannerType=homepages",
			dataType: "json",
			data: {},
			success: function(result) {
				$jindexBanner.html("");
				result.forEach(function(value, index) {
					$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href=" + value.href + " target='_blank'></a></div>"
				});
				$jindexBanner.html($htmlStr);
				setTimeout(function() {
					indexSwiper(); //new swiper
				}, 300)
			},
			error: function(err) {
				console.log(err);
			}
		});
	};

	//首页播米咨询
	$.bminformation = function() {
		var $jindexfinanceList = $("#jindexfinance-list"), //财经快讯
			$jindextestList = $("#jindextest-list"), //考试资讯
			$jindexpointList = $("#jindexpoint-list"), //观点话题
			$htmlStr = "";

		$.ajax({
			type: "GET",
			url: ROUTE + "HomePage.ashx?action=getInformation",
			dataType: "json",
			data: {},
			success: function(result) {
				result.forEach(function(value, index) {
					if(0 == index) {
						$htmlStr = "";
						value.forEach(function(list, subIndex) {
							$htmlStr += "<li><a href='ycedu/newsdetail.html?newsId=" + list.newsId + "'>" + list.title + "</a></li>"
						})
						$jindexfinanceList.html($htmlStr);
					}
					if(1 == index) {
						$htmlStr = "";
						value.forEach(function(list, subIndex) {
							$htmlStr += "<li><a href='ycedu/newsdetail.html?newsId=" + list.newsId + "'>" + list.title + "</a></li>"
						})
						$jindextestList.html($htmlStr);
					}
					if(2 == index) {
						$htmlStr = "";
						value.forEach(function(list, subIndex) {
							$htmlStr += "<li><a href='ycedu/newsdetail.html?newsId=" + list.newsId + "'>" + list.title + "</a></li>"
						})
						$jindexpointList.html($htmlStr);
					}
				})
			},
			error: function(err) {
				console.log(err);
			}
		});

	}

	/*
	 * 新闻详情
	 */
	//详情
	$.newsDetail = function(charge, id) {
		if(id == null || id == "" || id == undefined) {
			return;
		}
		var $jnewsContent = $("#jnewsContent"), //内容区
			$jnewsTitle = $("#jnewsTitle"), //标题
			$jnewsTime = $("#jnewsTime"), //时间来源
			$jnewsPrePage = $("#jnewsPrePage"), //上一篇
			$jnewsNextPage = $("#jnewsNextPage"), //下一篇
			$dycprevTitle = $("#jnewsPrePage  .dycprev-title"), //上一篇标题
			$dycnextTitle = $("#jnewsNextPage .dycnext-title"); //下一篇标题

		$.ajax({
			type: "GET",
			url: ROUTE + "News.ashx?action=getCurrentNews",
			dataType: "json",
			data: {
				"newsId": id,
				"memberId": $mid
			},
			success: function(result) {
				if((($mid == undefined) || ($mid == null) || ($mid == "")) && (charge == 1)) { //如果是未登录且要收费(1收费)
					layer.confirm('登录后才可查看观点，是否立即前往登录', {
						btn: ['是', '否']
					}, function(index, layero) {
						layer.msg('正在为您跳转到登录页面...');
						setTimeout(function() {
							window.location.href = '../login.html';
						}, 2000);
					});
				} else {
					if(result == '817') { //未购买
						layer.confirm('购买才可以查看该观点，0.99/条，28/月，请选择购买方式', {
							btn: ['购买当条', '包月购买', '取消']
						}, function(index, layero) {
							buyView(id);
							layer.closeAll();

						}, function(index) {
							buyView(0); //0为包月
							layer.closeAll();
						});

					} else { //已购买
						$jnewsTitle.text(result[0][0].title);
						$jnewsTime.html(result[0][0].reportDate + '<br/>' + result[0][0].source)
						$jnewsContent.html(result[0][0].newsDetail);

						if(result[1][0] == null || result[1][0] == "" || result[1][0] == undefined) {
							$dycprevTitle.text("无");
							$jnewsPrePage.data("newid", "");
							$jnewsPrePage.css('display', 'none');
						} else {
							$jnewsPrePage.css('display', 'block');
							$dycprevTitle.text(result[1][0].title);
							$jnewsPrePage.data("newid", result[1][0].newsId);
						}

						if(result[2][0] == null || result[2][0] == "" || result[2][0] == undefined) {
							$dycnextTitle.text("无");
							$jnewsNextPage.data("newid", "");
							$jnewsNextPage.css('display', 'none');
						} else {
							$jnewsNextPage.css('display', 'block');
							$dycnextTitle.text(result[2][0].title);
							$jnewsNextPage.data("newid", result[2][0].newsId);
						}
					}
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	};
	//购买专家观点
	buyView = function(id) {
		$.ajax({
			type: "get",
			url: ROUTE + "Order.ashx?action=directBuyGoods",
			data: {
				"memberId": $mid,
				"goodsId": id,
				"orderType": 1
			},
			dataType: "json",
			success: function(result) {
				window.location.href = "viewpay.html?orderId=" + result[0].orderId + "&goodsId=" + id;
			},
			error: function(err) {
				console.log(err);
			}
		});

	};

	//相关新闻
	$.newsRelative = function(id) {
		var $jrelativeNews = $("#jrelativeNews"),
			$htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "News.ashx?action=getHotNews",
			dataType: "json",
			data: {
				"newsId": id
			},
			success: function(result) {
				result.forEach(function(value, index) {
					$htmlStr += "<li><a href='#this' data-newid=" + value.newsId + ">" + value.title + "</a></li>";
				})
				$jrelativeNews.html($htmlStr);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	//播米名师暂缺

	//播米直播
	$.newsLiveRadio = function(id) {
		var $jnewsLiveRadio = $("#jnewsLiveRadio"),
			$htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "Course.ashx?action=getHotLiveCourse",
			dataType: "json",
			data: {
				"newsId": id
			},
			success: function(result) {
				result.forEach(function(value, index) {
					$htmlStr += "<div class='swiper-slide'><a href='liveplay.html?courseId=" + value.courseId + "'><img src=" + ROUTEFILE + value.iconPath + " alt='直播'/></a></div>";
				})
				$jnewsLiveRadio.html($htmlStr);
				ndLASwiper();
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	/*
	 * 新闻列表
	 */
	$.newListHeader = function() {
		new Vue({
			el: "#jnewListHeader",
			data: {
				bannerArr: [], //banner
				newsRightArr: [], //right List
				newsHotArr: []
			},
			filters: {
				addRoute: function(value) {
					return ROUTEFILE + value;
				}
			},
			mounted: function() { //1.0ready --> 2.0 
				var _this = this;
				this.$nextTick(function() {
					_this.getBanner();
					_this.getRightNews();
				})
			},
			methods: {
				getBanner: function() { //newsList Banner
					var _this = this;
					this.$http.post(ROUTE + "News.ashx?action=getNewsBanner", {
						mid: $mid
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.bannerArr = res.body;
					}).then(function() {
						_this.bannerArr.forEach(function(item, index) {
							Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
							Vue.set(item, "newsId", 'ycedu/newsdetail.html?newsId=' + item.newsId + '&charge=' + item.isCharge); //注册变量
						})
						newListBanner();
					});
				},
				getRightNews: function() { //news right List
					var _this = this;
					this.$http.post(ROUTE + "News.ashx?action=getTopNews", {

					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.newsRightArr = res.body;
					}).then(function() {
						_this.newsRightArr.forEach(function(item, index) {
							Vue.set(item, "newsId", 'ycedu/newsdetail.html?newsId=' + item.newsId + '&charge=' + item.isCharge); //注册变量
						})
					});
				}
			}
		})
	}

	function newTypeFlag() { //新闻列表初始类型标志 active： 默认第一个
		$("#dycnewListType a:first-child").addClass("active");
	}

	function newTypeFlagChange(obj) { //新闻列表初始类型标志 active： 默认第一个 :改变
		if(obj.hasClass("active")) {
			return false;
		} else {
			$("#dycnewListType a.active").removeClass("active");
			obj.addClass("active");
		}
	}

	$.newList = function() {
		new Vue({
			el: "#jnewList",
			data: {
				newsArr: [], //
				newsTypeArr: [],
				current: 1, //当前条位置财经
				showItem: 6,
				allpage: 0, //总页码  默认热点
				charge: "", //是否收费
				typeId: "",
				viewArr: []

			},
			filters: {
				addRoute: function(value) {
					return ROUTEFILE + value;
				}
			},
			mounted: function() { //1.0ready --> 2.0 
				var _this = this;
				this.$nextTick(function() {
					_this.getNewsListType();
					_this.toggleNewsList();
				})
			},
			computed: {
				pages: function() {
					var pag = [];
					if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
						//总页数和要显示的条数那个大就显示多少条
						var i = Math.min(this.showItem, this.allpage);
						while(i) {
							pag.unshift(i--);
						}
					} else { //当前页数大于显示页数了
						var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
							i = this.showItem;
						if(middle > (this.allpage - this.showItem)) {
							middle = (this.allpage - this.showItem) + 1
						}
						while(i--) {
							pag.push(middle++);
						}
					}
					return pag
				}
			},
			methods: {
				getNewsListType: function(typeId, curentPage) { //news right List  热点 默认
					var _this = this;
					this.$http.post(ROUTE + "NewsType.ashx?action=getNewsType", {}, {
						emulateJSON: true
					}).then(function(res) {
						_this.charge = res.body[0].isCharge;
						_this.newsTypeArr = res.body;

					}).then(function() {
						_this.getNewsList("", _this.current, _this.charge); //初始默认热点 当前页1
						newTypeFlag();
					});
				},
				getNewsList: function(typeId, curentPage, charge) { //news right List  热点 默认
					var _this = this;
					this.$http.post(ROUTE + "News.ashx?action=getNewsByType", {
						newsTypeId: typeId,
						pageIndex: curentPage,
						pageSize: _this.showItem,
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.newsArr = res.body;
						_this.allpage = res.body.totalPageCount;
					}).then(function() {
						if(_this.newsArr.rows) {
							_this.newsArr.rows.forEach(function(item, index) {
								/*Vue.set(item, "nId", item.newsId); //注册变量*/
								Vue.set(item, "newsId", 'ycedu/newsdetail.html?newsId=' + item.newsId + '&charge=' + charge); //注册变量

							})
						}
					})
				},
				toggleNewsList: function() { //toggle 新闻列表
					var _this = this;
					$("#dycnewListType").off("click", "a");
					$("#dycnewListType").on("click", "a", function(e) {
						var obj = $(this).data("id");
						_this.charge = $(this).data("charge"); //是否收费
						_this.typeId = obj;
						_this.getNewsList(obj, 0, _this.charge);
						newTypeFlagChange($(this));
						_this.current = 1;
					});
				},
				alertConfirm: function() { //专家观点购买才可查看
					if($mid == null || $mid == undefined || $mid == "") {
						layer.confirm('购买才可以查看该观点，0.99/条，28/月，登录才可以购买~',
							function(index) {
								layer.msg('正在为您跳转到登录页面~');
								setTimeout(function() {
									window.location.href = 'login.html';
								}, 2000)

							});
					} else {
						layer.confirm('购买才可以查看该观点，0.99/条，28/月');
					}
				},
				/*alertConfirm: function(id) { //专家观点购买才可查看
					alert("购买才可以查看该观点~");
					var _this = this;
					layer.confirm('购买才可以查看该观点，一条1个播米币，包月300，请选择购买方式', {
						btn: ['购买当条', '包月购买','取消']
					}, function(index, layero) {
						alert("您已成功购买该条观点，消费一个播米币");
						_this.buyView(id);
						layer.closeAll();
						
					}, function(index) {
						_this.buyView(2);
						layer.closeAll();
					});

				},
				buyView:function(id){
					var _this = this;
					window.location.href = 'ycedu/viewpay.html';
					_this.$http.post(ROUTE + "Order.ashx?action=directBuyGoods", {
						memberId: $mid,
						goodsId: id,
						orderType: 1,
					}, {
						emulateJSON: true
					}).then(function(res){
						_this.viewArr = res.body;
					});
					
				},*/
				goto: function(index) { //枫叶处理
					if(index == this.current) return;
					if(index > this.allpage) {
						this.current = this.current - 2;
						layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
						return false;
					}
					this.current = index;
					this.getNewsList(this.typeId, index, this.charge);
					$.scrollTo($("#jnewListHeader").height() - 100, 0);
				}
			}
		})
	}

	//	$.newList = function() {
	//		new Vue({
	//			el: "#jnewList",
	//			data: {
	//				newsHotArr: [], //热点
	//				headlineArr: [], //头条
	//				financeArr: [], //财经
	//				current: 1, //当前条位置财经
	//				headlineCurrent: 1, //头条当前页
	//				financeCurrent: 1, //财经当前页
	//				showItem: 6,
	//				allpage: 0, //总页码  默认热点
	//				allpageHead: 0, //头条总页码
	//				allpageFinance: 0, //财经总页码
	//				pageFlag: true, //热点初始标识
	//				pageHeadFlag: true, //头条初始标识
	//				pageFinanceFlag: true, //财经初始标识
	//
	//			},
	//			mounted: function() { //1.0ready --> 2.0 
	//				var _this = this;
	//				this.$nextTick(function() {
	//					//"":是热点  1：头条 2：财经
	//					_this.getNewsList("", _this.current); //初始默认热点 当前页1
	//					_this.toggleNewsList();
	//				})
	//			},
	//			computed: {
	//				pages: function() {
	//					var pag = [];
	//					if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
	//						//总页数和要显示的条数那个大就显示多少条
	//						var i = Math.min(this.showItem, this.allpage);
	//						while(i) {
	//							pag.unshift(i--);
	//						}
	//					} else { //当前页数大于显示页数了
	//						var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
	//							i = this.showItem;
	//						if(middle > (this.allpage - this.showItem)) {
	//							middle = (this.allpage - this.showItem) + 1
	//						}
	//						while(i--) {
	//							pag.push(middle++);
	//						}
	//					}
	//					return pag
	//				},
	//
	//				pagesHead: function() { //头条页数
	//					var pag = [];
	//					if(this.headlineCurrent < this.showItem) { //如果当前的激活的项 小于要显示的条数
	//						//总页数和要显示的条数那个大就显示多少条
	//						var i = Math.min(this.showItem, this.allpageHead);
	//						while(i) {
	//							pag.unshift(i--);
	//						}
	//					} else { //当前页数大于显示页数了
	//						var middle = this.headlineCurrent - Math.floor(this.showItem / 2), //从哪里开始
	//							i = this.showItem;
	//						if(middle > (this.allpageHead - this.showItem)) {
	//							middle = (this.allpageHead - this.showItem) + 1
	//						}
	//						while(i--) {
	//							pag.push(middle++);
	//						}
	//					}
	//					return pag
	//				},
	//				pagesFinance: function() { //财经页数
	//					var pag = [];
	//					if(this.financeCurrent < this.showItem) { //如果当前的激活的项 小于要显示的条数
	//						//总页数和要显示的条数那个大就显示多少条
	//						var i = Math.min(this.showItem, this.allpageFinance);
	//						while(i) {
	//							pag.unshift(i--);
	//						}
	//					} else { //当前页数大于显示页数了
	//						var middle = this.financeCurrent - Math.floor(this.showItem / 2), //从哪里开始
	//							i = this.showItem;
	//						if(middle > (this.allpageFinance - this.showItem)) {
	//							middle = (this.allpageFinance - this.showItem) + 1
	//						}
	//						while(i--) {
	//							pag.push(middle++);
	//						}
	//					}
	//					return pag
	//				}
	//			},
	//			methods: {
	//				getNewsList: function(typeId, curentPage) { //news right List  热点 默认
	//					var _this = this;
	//					this.$http.post(ROUTEFILE  + "ycedu/server/newslistmore.json", {
	//						newsType: typeId,
	//						pageIndex: curentPage,
	//						pageSize: _this.showItem,
	//					}, {
	//						emulateJSON: true
	//					}).then(function(res) {
	//						console.log(res.body.rows);
	//						_this.newsHotArr = res.body;
	//						_this.allpage = res.body.totalPageCount;
	//
	//					}).then(function() {
	//						if(_this.pageFlag) {
	//							newListSwiper();
	//							_this.pageFlag = false;
	//						}
	//					});
	//				},
	//				getNewsListHead: function(typeId, curentPage) { //  热点 默认 -->头条
	//					var _this = this;
	//					this.$http.post(ROUTEFILE  + "ycedu/server/newslistmore.json", {
	//						newsType: typeId,
	//						pageIndex: curentPage,
	//						pageSize: _this.showItem,
	//					}, {
	//						emulateJSON: true
	//					}).then(function(res) {
	//						_this.headlineArr = res.body;
	//						_this.allpageHead = res.body.totalPageCount;
	//
	//					}).then(function() {
	//						window.newlistshowSwiper.update();
	//						_this.pageFlag = false;
	//					});
	//				},
	//				getNewsListFinance: function(typeId, curentPage) { //  热点 默认 -->财经
	//					var _this = this;
	//					this.$http.post(ROUTEFILE  + "ycedu/server/newslistmore.json", {
	//						newsType: typeId,
	//						pageIndex: curentPage,
	//						pageSize: _this.showItem,
	//					}, {
	//						emulateJSON: true
	//					}).then(function(res) {
	//						_this.financeArr = res.body;
	//						_this.allpageFinance = res.body.totalPageCount;
	//
	//					}).then(function() {
	//						window.newlistshowSwiper.update();
	//						_this.pageFlag = false;
	//					});
	//				},
	//				toggleNewsList: function() { //toggle 新闻列表
	//					var _this = this;
	//					$("#jnewsPagination").off("click", "li");
	//					$("#jnewsPagination").on("click", "li", function(e) {
	//						var obj = $(this).data("id");
	//						if(0 == obj) {
	//							window.newlistshowSwiper.update(true);
	//						} else if(1 == obj) { //头条
	//							if(_this.pageHeadFlag) {
	//								_this.getNewsListHead(1, _this.headlineCurrent);
	//								_this.pageHeadFlag = false;
	//							}
	//
	//						} else if(2 == obj) { //财经
	//							if(_this.pageFinanceFlag) {
	//								_this.getNewsListFinance(2, _this.financeCurrent);
	//								_this.pageFinanceFlag = false;
	//							}
	//						}
	//					});
	//				},
	//				goto: function(index) { //枫叶处理
	//					if(index == this.current) return;
	//					if(index > this.allpage) {
	//						this.current = this.current - 2;
	//						layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
	//						return false;
	//					}
	//					this.current = index;
	//					this.getNewsList("", index);
	//
	//				},
	//				gotoHead: function(index) { //枫叶处理 -->头条
	//					if(index == this.headlineCurrent) return;
	//					if(index > this.allpageHead) {
	//						this.headlineCurrent = this.headlineCurrent - 2;
	//						layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
	//						return false;
	//					}
	//					this.headlineCurrent = index;
	//					this.getNewsListHead(1, index);
	//
	//				},
	//				gotoFinance: function(index) { //枫叶处理 -->财经
	//					if(index == this.financeCurrent) return;
	//					if(index > this.allpageFinance) {
	//						this.financeCurrent = this.financeCurrent - 2;
	//						layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
	//						return false;
	//					}
	//					this.financeCurrent = index;
	//					this.getNewsListFinance(2, index);
	//
	//				}
	//			}
	//		})
	//	}

	/*
	 * 课程列表
	 */
	//课程列表
	$.courselist = function(cTypeId) {
		var courselistV = new Vue({
			el: "#jcourselist",
			data: {
				courseType: [],
				courseList: [],
				comFlag: true,
				priceFlag: true,
				countFlag: true,
				pageFlag: false,
				listType: 1, //1 是默认列表  2搜索列表
				current: 1,
				showItem: 9,
				allpage: 0,
				order: "price",
				asc: "asc",
				cId: cTypeId
			},
			filters: {
				addRoute: function(value) {
					return ROUTEFILE + value;
				}
			},
			mounted: function() { //1.0ready --> 2.0 
				this.$nextTick(function() {
					this.getCourseTypeData();
					this.getCourseListData("", 1, undefined); //2.0删除undefined
				})
			},
			computed: {
				pages: function() {
					var pag = [];
					if(this.current < this.showItem) { //如果当前的激活的项 小于要显示的条数
						//总页数和要显示的条数那个大就显示多少条
						var i = Math.min(this.showItem, this.allpage);
						while(i) {
							pag.unshift(i--);
						}
					} else { //当前页数大于显示页数了
						var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
							i = this.showItem;
						if(middle > (this.allpage - this.showItem)) {
							middle = (this.allpage - this.showItem) + 1
						}
						while(i--) {
							pag.push(middle++);
						}
					}
					return pag
				}
			},
			methods: {
				getCourseTypeData: function() { //分类数据
					var _this = this;
					this.$http.get(ROUTE + "CourseType.ashx?action=getSecondLevelCourseType").then(function(res) {
						_this.courseType = res.body;
					}).then(function() {
						ckTypeSwiper();
					});
				},
				getCourseListData: function(id, currentPage, eve) { //课程列表数据
					if(id != "") {
						this.cId = id;
					}
					if(eve == undefined) { //2.0删除
						setTimeout(function() {
							$("#jcoursetype .yctitle").eq(0).addClass("active");
						}, 200)
					} else { //2.0删除
						$("#jcoursetype .yctitle").removeClass("active");
						$(eve.target).addClass("active");
						this.current = 1;
					}

					var _this = this;
					this.$http.post(ROUTE + "Course.ashx?action=getCourseByType", {
						courseTypeId: _this.cId,
						pageIndex: currentPage,
						pageSize: _this.showItem,
						orderName: _this.order,
						ascType: _this.asc
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.courseList = res.body;
						_this.listType = 1;
						_this.allpage = _this.courseList.totalPageCount;
						if(_this.allpage > 0) {
							_this.pageFlag = true;
						} else {
							_this.pageFlag = false;
						}

					}).then(function() {
						if(_this.courseList.rows) {
							_this.courseList.rows.forEach(function(item, index) {
								Vue.set(item, "courseId", 'ycedu/coursedetail.html?courseId=' + item.courseId); //注册变量
							})
						}
					});
				},

				searchListData: function(pageInd) { //搜索Data
					var searchContent = $("#dyckSearch").val();
					if(searchContent == null || searchContent == "") {
						layer.msg("请输入正确的搜索内容哦！");
						return false;
					} else {
						var _this = this;
						this.$http.post(ROUTE + "Course.ashx?action=getCourseByName", {
							//courseTypeId: _this.cId,
							name: searchContent,
							pageIndex: pageInd,
							pageSize: _this.showItem,
							//orderName: _this.order,
							//ascType: _this.asc
						}, {
							emulateJSON: true
						}).then(function(res) {
							if(res.body.totalPageCount == 0) {
								layer.msg("没有相关搜索结果，换个关键词试试哦~");
								$('#jlist').css('display', 'block');
							} else {
								$('#jlist').css('display', 'none')
							}
							_this.courseList = res.body;
							_this.listType = 2;
							_this.allpage = _this.courseList.totalPageCount;

						}).then(function() {
							if(_this.courseList.rows) {
								_this.courseList.rows.forEach(function(item, index) {
									Vue.set(item, "courseId", 'ycedu/coursedetail.html?courseId=' + item.courseId); //注册变量
								})
							}
						});
					}
				},

				search: function(ev) { //搜索code
					if(ev.keyCode == 13) {
						this.searchListData(1);
					}
				},

				goto: function(index) {
					if(index == this.current) return;
					if(index > this.allpage) {
						this.current = this.current - 2;
						layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
						return false;
					}
					this.current = index;
					if(this.listType == 2) {
						this.searchListData(index);
					} else {
						this.getCourseListData(this.cId, index);
					}

				},

				changeComprehensive: function() { //综合
					if(this.comFlag) {
						this.listCurrent($('#dycsortAll'));
						this.order = "price";
						this.asc = "asc";
						this.comFlag = false;
						this.priceFlag = true;
						this.countFlag = true;
						this.getCourseListData(this.cId, 1);
					}
				},

				changeOrderPrice: function() { //价格
					/*	if(this.priceFlag) {*/
					this.listCurrent($('#dycsortPrice'));
					this.order = "price";
					if("asc" == this.asc) {
						this.asc = "desc";
						$('#dycsortPrice i').removeClass('uk-icon-long-arrow-up').addClass('uk-icon-long-arrow-down');
					} else {
						this.asc = "asc";
						$('#dycsortPrice i').removeClass('uk-icon-long-arrow-down').addClass('uk-icon-long-arrow-up');
					}
					this.comFlag = true;
					this.priceFlag = false;
					this.countFlag = true;
					this.getCourseListData(this.cId, 1);
					/*}*/
				},
				changeOrderClickCount: function() { //人气
					/*if(this.countFlag) {*/
					this.listCurrent($('#dycsortRq'));
					this.order = "clickCount";
					if("asc" == this.asc) {
						this.asc = "desc";
						$('#dycsortRq i').removeClass('uk-icon-long-arrow-up').addClass('uk-icon-long-arrow-down');
					} else {
						this.asc = "asc";
						$('#dycsortRq i').removeClass('uk-icon-long-arrow-down').addClass('uk-icon-long-arrow-up');
					}
					this.comFlag = true;
					this.priceFlag = true;
					this.countFlag = false;
					this.getCourseListData(this.cId, 1);
					/*}*/

				},
				listCurrent: function(obj) { //当前列表状态
					obj.siblings().removeClass('active');
					obj.addClass('active')
				},
				gridLayout: function() { //网格布局
					$("#jcklist").addClass("dycgridSort");
				},
				listLayout: function() { //列表布局
					$("#jcklist").removeClass("dycgridSort");
				},
			}
		});

	}

	/*
	 * 课程详情
	 */
	$.courseDetail = function(cId) {
		new Vue({
			el: "#jcourseDetail",
			data: {
				courseDetailArr: [], //总容器
				courseDetailContent: [], //课程详情
				courseNav: [], //面包屑导航
				fitObjHiddenFlag:true,
				fitObj: [], //适合对象
				leGoalHiddenFlag:true,
				leGoal: [], //学习目标
				teacherHiddenFlag:true,
				teacherArr: [], //老师介绍
				guessLikeArr: [], //猜你喜欢
				likeFlag: true, //猜你flag
				scroll: "",
				triggerFlag: true,
				outLine: [], //大纲
				orderArr: [] //订单

			},
			filters: {
				addRoute: function(value) {
					return ROUTEFILE + value;
				}
			},
			mounted: function() { //1.0ready --> 2.0 
				this.$nextTick(function() {
					this.getCourseDetail();
					this.teacherIntr();
					window.addEventListener('scroll', this.onScroll);
					this.slideShow();
					this.getCourseOutline();
				})
			},
			methods: {
				getCourseDetail: function() { //课程列表数据
					var _this = this;
					this.$http.post(ROUTE + "Course.ashx?action=getCourseDetailById", {
						courseId: cId
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.courseDetailArr = res.body;
						if(_this.courseDetailArr[0].length > 0) {
							_this.courseNav = _this.courseDetailArr[0];
						}
						if(_this.courseDetailArr[1].length > 0) { //数据不存在时特殊处理
							_this.courseDetailContent = _this.courseDetailArr[1][0];
							_this.fitObj = (_this.courseDetailContent.fitObject).split("\r\n");
							_this.leGoal = (_this.courseDetailContent.studyAim).split("\r\n");
							
							if(_this.fitObj.length == 1){
								_this.fitObjHiddenFlag = false;
							}
							if(_this.leGoal.length == 1){
								_this.leGoalHiddenFlag = false;
							}
						}
						_this.scroll = document.body.scrollTop;
					}).then(function() {
						if(_this.courseNav) {
							_this.courseNav.forEach(function(item, index) {
								Vue.set(item, "courseTypeId", '../courselist.html?courseTypeId=' + item.courseTypeId); //注册变量
							})
						}
						ckdetail();
					});

					//tab： 大纲 和评论
					/*$("#jtabCourseDetail").off("click", "li");
					$("#jtabCourseDetail").on("click", "li", function(obj) {
						if($(this).data("id") == "1") {
							_this.getCourseOutline();
						} else if($(this).data("id") == "2") {
							console.log("评论。。。")
						}
					})*/
				},
				getCourseOutline: function() { //课程大纲
					var _this = this;
					this.$http.post(ROUTE + "CourseCatalog.ashx?action=getCourseCatalogByCourseId", {
						courseId: cId,
						mid: $mid
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.outLine = res.body[1];

					}).then(function(res) {
						var ss = $('#dyckcdg-wrap ').find('.dycfree-listen');
						$('#jfree').attr('href', $(ss[0]).attr('href'));
						$('#jfree').click(function() {
							if($(this).attr('href') == '#this') {
								layer.msg('没有免费试听课程~');
							} else {
								$(this).attr('target', "_blank");
							}
						});
						window.kcxqSwiper.update();

					})
				},
				teacherIntr: function() { // 老师介绍
					var _this = this;
					this.$http.post(ROUTE + "Teacher.ashx?action=getTeacherByCourseId", {
						courseId: cId
					}, {
						emulateJSON: true
					}).then(function(res) {
						if(res.body.length > 0) {
							_this.teacherArr = res.body[0];
						}
					});
				},
				guessLike: function() { // 猜你喜欢
					var _this = this;
					this.$http.post(ROUTE + "GuessLike.ashx?action=getGuessLikeByCourseId", {
						courseId: cId
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.guessLikeArr = res.body;
					}).then(function() {
						guessCourseLike();
					}).then(function() {
						window.kcxqSwiper.update();
					});
				},
				addSpCart: function() { //加入购物车
					if(!judgeStatuHref()) { //未登入时
						layer.msg("Sorry ╮(╯_╰)╭ 您还未登入哦！<br />系统将为你自动跳到登入页");
						setTimeout(function() {
							window.location.href = "../login.html";
						}, 3000);
						return false;
					}
					var _this = this;
					this.$http.post(ROUTEFILE + "ycedu/server/success.json", {
						courseId: cId,
						mid: $mid
					}, {
						emulateJSON: true
					}).then(function(res) {
						console.log("加入购物车...");
						checkLoginStatu(); //更新购物数
					})
				},
				buyNow: function(e) { //立即购买
					if(!judgeStatuHref()) { //未登入时
						layer.msg("Sorry ╮(╯_╰)╭ 您还未登入哦！<br />系统将为你自动跳到登入页");
						setTimeout(function() {
							window.location.href = "../login.html";
						}, 3000);

						return false;
					}

					var _this = this;

					$.ajax({
						type: "POST",
						dataType: 'json',
						url: ROUTE + "Order.ashx?action=directBuyGoods",
						async: false, //同步请求
						data: {
							goodsId: cId,
							memberId: $mid,
							orderType: 0
						},
						success: function(data) {
							if(data == 818 || data == "818") {
								layer.msg("您已购买过该课程！");
								return false;
							} else {
								var dataobj = data[0];
								if(dataobj) {
									window.open("pay.html?orderId=" + dataobj.orderId);
								}
							}
						},
						error: function(data) {
							layer.msg("服务器出差了！");
						}
					});

				},
				onScroll: function() {
					this.scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					if(this.scroll > 700 && this.likeFlag) {
						this.guessLike();
						this.likeFlag = false;
					}

				},

				slideShow: function() {

					/*var on = new Array();
					var box = $(".dyccompro-box li");
					  for(var i=0 ; i<box.length;i++){
					  	on[i] = true
					  }
						box.click(function() {
							var data = $(this).attr('data-id');
							if(on[data]){
							$(this).children(".dyccp-brief").slideDown("normal", function() {
								kcxqSwiper.update();
							});
							}else{
								$(this).children(".dyccp-brief").slideUp("normal", function() {
								kcxqSwiper.update();
							});
							}
							on[data]= !on[data];
								
						});*/

					$(".dyccompro-box li").click(function() {
						$(this).children(".dyccp-brief").slideDown("normal", function() {});
						$(this).siblings().children(".dyccp-brief").slideUp("normal", function() {
							kcxqSwiper.update();
						});
					});

					/*$(".dyccompro-box li").hover(function() {
						if(!$(".dyccompro-box .dyccp-brief").is(":animated")) {
							$(this).children(".dyccp-brief").slideDown("normal", function() {
								kcxqSwiper.update();
							})
						}
					}, function() {
						$(this).children(".dyccp-brief").slideUp(0, function() {})
					});
					
					$(".dyccompro-box").mouseleave(function(){
						kcxqSwiper.update();
					})*/
				}

			}
		});

	}

	/*
	 * 拍下课程
	 */
	$.payCourse = function() {
		if(!judgeStatuHref()) { //未登入时跳转
			window.location.href = "../login.html";
			return false;
		}
		new Vue({
			el: "#jpaycourse",
			data: {
				payCourseArr: [],
				orderId: ""
			},
			filters: {
				addRoute: function(value) {
					return ROUTEFILE + value;
				},
				formatMoney: function(value) {
					return "￥" + value;
				}
			},
			mounted: function() { //1.0ready --> 2.0 
				this.$nextTick(function() {
					this.getCoursePayData();
				})
			},
			methods: {
				getCoursePayData: function() { //获取数据
					var _this = this;
					this.$http.post(ROUTEFILE + "ycedu/server/paycourse.json", {
						mid: $mid
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.payCourseArr = res.body;
						if(res.body.orderId) {
							_this.orderId = res.body.orderId;
						}
					})
				},
				/*lookDiscount: function() { //使用优惠券
					var $discoutObj = $("#jopenso-discount .dycdiscountinf"),
						$that = $(this);
					$discoutObj.slideToggle(function() {
						alert(1)
						if($discoutObj.is(":visible")) {
							$that.siblings('.dycusediscount').find('i').removeClass("uk-icon-angle-down").addClass("uk-icon-angle-up");
						} else {
							$that.siblings('.dycusediscount').find('i').removeClass("uk-icon-angle-up").addClass("uk-icon-angle-down");
						}
					});
				},*/
				subOrder: function() { //提交订单
					var _this = this;
					this.$http.post(ROUTEFILE + "ycedu/server/success.json", {
						money: _this.payCourseArr.allMoney,
						mid: $mid,
						payId: this.payCid
					}, {
						emulateJSON: true
					}).then(function(res) {
						window.location.href = "pay.html?orderId=" + _this.orderId;
					})
				}
			}
		})
	}

	/*
	 * 支付页面
	 */
	$.payBox = function(id) {
		if(!judgeStatuHref()) { //未登入时跳转
			window.location.href = "../login.html";
			return false;
		}
		new Vue({
			el: "#jpaybox",
			data: {
				payBoxArr: [],
				orderId: [],
				couponArr: [], //优惠券
				current: 1, //默认第一条
				allpage: 0, //总页码  默认热点
				showItem: 8,
				couponReceiveId: 0, //优惠券编号
				discount: 0, //优惠价格
				overage: 0, //余额
				pTypeId: 0 //支付方式 0:支付宝  1：微信 2：播米币
			},
			filters: {
				addRoute: function(value) {
					return ROUTEFILE + value;
				},
				formatMoney: function(value) {
					return "￥" + value;
				}
			},
			mounted: function() { //1.0ready --> 2.0 
				var _this = this;
				this.$nextTick(function() {
					_this.getPayBoxData();

				})
			},
			methods: {
				getPayBoxData: function() { //获取订单数据
					var _this = this;
					this.$http.post(ROUTE + "OrderDetail.ashx?action=getOrderListByOrderId", {
						mid: $mid,
						orderId: id,
						orderTypeId: 0
					}, {
						emulateJSON: true
					}).then(function(res) {
						if(res.body[0]) {
							_this.payBoxArr = res.body[0];
						} else {
							return false;
						}
						if(res.body.orderId) {
							_this.orderId = res.body.orderId;
						}
					})
				},
				lookDiscount: function() { //使用优惠券
					this.couponDefault();
					var $discoutObj = $("#jopenso-discount .dycdiscountinf"),
						$that = $(this);

					$discoutObj.slideToggle(function() {
						if($discoutObj.is(":visible")) {
							$that.removeClass("uk-icon-angle-down").addClass("uk-icon-angle-up");

						} else {
							$that.removeClass("uk-icon-angle-up").addClass("uk-icon-angle-down");
						}
					});
				},
				couponDefault: function() { //我的优惠券
					var _this = this;
					_this.$http.post(ROUTE + "CouponReceive.ashx?action=getCouponReceiveByMemberId", {
						memberId: $mid,
						pageIndex: _this.current,
						pageSize: _this.showItem,
						amount: _this.payBoxArr.preferentialTotalPrice
					}, {
						emulateJSON: true
					}).then(function(res) {
						_this.couponArr = res.body.rows;
						_this.allpage = res.body.totalPageCount;
					}).then(function() {
						_this.addActive();

					});
				},
				addMore: function() { //点击加载更多
					var _this = this;
					_this.current++;

				},
				addActive: function() { //点击选中优惠券,金额减少
					var _this = this;
					$('.dyccoupon-box-li').click(function() {
						if($(this).attr('data-isclick') == 'true') {
							$(this).siblings().removeClass('active');
							$(this).addClass('active');
							_this.discount = $(this).attr('data-amount');
							_this.couponReceiveId = $(this).attr('data-id');
							$(this).attr('data-isclick', 'false');
						} else {
							$(this).removeClass();
							_this.discount = 0;
							_this.couponReceiveId = 0;
							$(this).attr('data-isclick', 'true');
						}
					});
				},
				payType: function(el, pId) { //支付方式
					if($(el.target).hasClass("active")) {
						return;
					} else {
						$(el.target).siblings("li").removeClass("active");
						$(el.target).addClass("active");
						this.pTypeId = parseInt(pId);
					}
				},
				imPayment: function() {
					var _this = this;

					//处理余额数据，保留两位小数
					var num = _this.payBoxArr.preferentialTotalPrice - _this.discount;
					var bb = num + "";
					var point = bb.indexOf('.');
					if(point == -1) {
						_this.overage = num.toFixed(2);
					} else {
						var cc = bb.substring(point + 1, bb.length);
						if(cc.length >= 3) {
							_this.overage = (Number(num.toFixed(2)) + 0.01);
						} else {
							_this.overage = num.toFixed(2);
						}
					}

					if(this.pTypeId == 0) {
						var newWindow = window.open('about:blank');
					}
					this.$http.post(ROUTE + "Pay.ashx?action=directPay", {
						memberId: $mid,
						amount: _this.overage,
						discount: _this.discount,
						orderId: id,
						couponReceiveId: _this.couponReceiveId,
						payTypeId: this.pTypeId,
						orderTypeId: 0
					}, {
						emulateJSON: true
					}).then(function(res) {
						if(this.pTypeId == 0) { //支付宝
							newWindow.location.href = "turnpay.html?amount=" + _this.overage + '&orderId=' + id + "&memberId=" + $mid + "&discount=" + _this.discount + "&couponReceiveId=" + _this.couponReceiveId + '&orderTypeId=0';
							setTimeout(function() {
								layer.confirm("是否支付完成", {
									btn: ['重新选择支付方式', '支付完成'],
								}, function() {
									layer.closeAll('dialog')
									console.log("心选");
								}, function() {
									_this.$http.post(ROUTE + "Pay.ashx?action=checkPaySuccess", { //二次校验
										memberId: $mid,
										orderId: id
									}, {
										emulateJSON: true
									}).then(function(res) {
										/*console.log("支付ok");*/
										if(res.body == '812') {
											$(".dyc-success-bg").show().delay(3000).fadeOut();
											window.location.href = "../membercenter.html";
										}
										if(res.body == '814') {
											alert("未完成支付");
										} else {
											return false;
										}
									});
								})
							}, 3000);
						} else if(this.pTypeId == 1) { //微信
							setTimeout(function() {
								layer.open({
									type: 1,
									title: '微信支付',
									area: ['420px', '420px'], //宽高
									content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + res.body.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + _this.overage + "</span></p>",
									success: function() {

										var xunhuan = setInterval(function() {
											_this.$http.post(ROUTE + "Pay.ashx?action=checkPaySuccess", { //二次校验
												memberId: $mid,
												orderId: id
											}, {
												emulateJSON: true
											}).then(function(res) {
												/*console.log("支付ok");*/
												if(res.body == '812') {
													clearInterval(xunhuan);
													layer.closeAll();
													$(".dyc-success-bg").show().delay(3000).fadeOut();
													setTimeout(function() {
														window.location.href = "../membercenter.html";
													}, 3000);

												}
												if(res.body == '814') {
													//alert("未完成支付");
												} else {
													return false;
												}
											});
										}, 3000)
									}
								});
							}, 500);
						} else if(this.pTypeId == 2) { //播米币
							if(res.body == '819') {
								layer.msg("播米币余额不足，请换一种支付方式~");
							} else {
								this.$http.post(ROUTE + "Member.ashx?action=getMemberMobById", {
									memberId: $mid
								}, {
									emulateJSON: true
								}).then(function(res) {
									this.$http.post(ROUTE + "Member.ashx?action=getConfirmCoinValidCode", {
										name: res.body[0].mobile
									}, {
										emulateJSON: true
									}).then(function(res) {
										layer.open({
											type: 1,
											title: '播米币支付',
											area: ['360px', '360px'], //宽高
											content: "<div class='dycweixin-img' style='text-align:center;width:300px;height:200px;margin:50px auto 0;color:#606060;'><p>验证码已自动发送到您手机，<br/>确认支付请输入验证码</p><p style='text-align:center'>应付播米币：<span style='color: #df5e3f;font-size: 20px;'>￥" + _this.overage + "</span></p><div style='margin-top:30px'><input id='jvalue' name='name' type='text' placeholder='请输入验证码' /><a id='jbomipay' style='dispaly:inline-block;margin-left:10px;background-color:red;color:#fff;padding:4px 5px;'>确认支付</a></div></div>",
											success: function(result) {
												$('#jbomipay').click(function() {
													_this.$http.post(ROUTE + "Pay.ashx?action=checkPaySuccess", { //校验验证码是否正确
														memberId: $mid,
														orderId: id
														/*$('#jvalue').val()*/
													}, {
														emulateJSON: true
													}).then(function(res) {

														if(res.body == '812') {

															layer.closeAll();
															$(".dyc-success-bg").show().delay(3000).fadeOut();
															setTimeout(function() {
																window.location.href = "../membercenter.html";
															}, 3000);

														} else if(res.body == '814') {
															layer.msg("支付失败，请重新支付");
														} else {
															return false;
														}
													});

												});
											}
										});

									});

								});
							}
						}

					})
				}
			}
		})
	}
});


//修改备案名
var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8080
var localhostPath = curWwwPath.substring(0, pos);

if(curWwwPath.indexOf('http://188.ttcm755.cn/') != '-1') {
	$('.dyc-icp').html('金创互动科技（深圳）有限公司  备案号：粤ICP备16102940号-1');
}else if(curWwwPath.indexOf('http://163.qdnfcf.cn/') != '-1') {
	$('.dyc-icp').html('青岛南方财富商品经营有限公司  备案号：鲁ICP备15013726号-2');
}


mingshi($("p:not(:has(p)):contains('课件')"));
mingshi($("div:not(:has(div)):contains('课件')"));
mingshi($("p:not(:has(p)):contains('名师')"));
mingshi($("div:not(:has(div)):contains('名师')"));
mingshi($("p:not(:has(p)):contains('大宗')"));
mingshi($("div:not(:has(div)):contains('大宗')"));
mingshi($("p:not(:has(p)):contains('老师')"));
mingshi($("div:not(:has(div)):contains('老师')"));

setTimeout(function() {
	mingshi($("p:not(:has(p)):contains('课件')"));
	mingshi($("div:not(:has(div)):contains('课件')"));
	mingshi($("p:not(:has(p)):contains('名师')"));
	mingshi($("div:not(:has(div)):contains('名师')"));
	mingshi($("p:not(:has(p)):contains('大宗')"));
	mingshi($("div:not(:has(div)):contains('大宗')"));
	mingshi($("p:not(:has(p)):contains('老师')"));
	mingshi($("div:not(:has(div)):contains('老师')"));
	mingshi($("p:not(:has(p)):contains('外汇')"));
	mingshi($("div:not(:has(div)):contains('外汇')"));
}, 3000);

function mingshi(obj) {
	for(var i = 0; i < obj.length; i++) {
		obj[i].innerHTML = obj[i].innerHTML.replace(/名师/g, "嘉宾");
		obj[i].innerHTML = obj[i].innerHTML.replace(/老师/g, "嘉宾");
		obj[i].innerHTML = obj[i].innerHTML.replace(/大宗/g, "商品");
		obj[i].innerHTML = obj[i].innerHTML.replace(/课件/g, "课程");
		obj[i].innerHTML = obj[i].innerHTML.replace(/外汇/g, "汇市");
	}
}
// 清除2级页面导航active
$(document).ready(function() {
	var url = window.location.pathname.split('/');
	// console.log(url[url.length - 1]);
	var currentUrl = url[url.length - 1];
	$('#bmnavWrap .bmNavFirst li').removeClass('active');
	if(currentUrl == '') {
		$('#bmnavWrap .bmNavFirst a[href$="index.html"]').parent().addClass('active');
	} else {
		$('#bmnavWrap .bmNavFirst a[href$="' + currentUrl + '"]').parent().addClass('active');
	}
});