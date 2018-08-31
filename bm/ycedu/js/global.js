/*
 * Autor：Jabo
 * Time:2017/04/26
 * Desc:亿策在线教育
 */
//全局ROUTE
/*var ROUTE = "http://localhost/bmOnline/";*/
/*var ROUTE = "http://www.bomizx.net/bmOnline/";*/

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

//分享
window._bd_share_config = {
	common: {
		bdText: '自定义分享内容',
		bdDesc: '自定义分享摘要',
		bdUrl: '自定义分享url地址',
		bdPic: '自定义分享图片'
	},
	share: [{
		"bdSize": 16
	}],
	//	slide: [{
	//		bdImg: 0,
	//		bdPos: "right",
	//		bdTop: 100
	//	}],
	//	selectShare: [{
	//		"bdselectMiniList": ['qzone', 'tqq', 'kaixin001', 'bdxc', 'tqf']
	//	}]
}
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];

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
	});

	//立即注册
	$regbtn.on("click", function() {
		innerSelectShow("5");
		$(this).css("display", "none");
	});

	//忘记密码
	$(".dycpwd-forget").on("click", function() {
		innerSelectShow("6");
	});

}