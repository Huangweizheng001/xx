function isEmpty(e, o) {
	return "" != e && null != e && void 0 != e || (layer.open({
		content: o,
		skin: "msg",
		time: 2
	}), !1)
}

function checkPhoneFormat(e) {
	return !!/^1[34578]\d{9}$/.test(e) || (layer.open({
		content: "请输入正确的手机号码",
		skin: "msg",
		time: 2
	}), !1)
}

function nickFormat(e) {
	return !!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,14}$/.test(e) || (layer.open({
		content: "请设置合法的昵称格式",
		skin: "msg",
		time: 2
	}), !1)
}

function pwdFormat(e) {
	return !!/^[\w]{4,14}$/.test(e) || (layer.open({
		content: "请设置合法的密码格式",
		skin: "msg",
		time: 2
	}), !1)
}

function goBack() {
	"" === document.referrer ? window.location.href = ROOT + "index.html" : window.history.go(-1)
}

function goBack2() {
	"" === document.referrer ? window.location.href = ROOT + "index.html" : window.location.href = document.referrer
}

function isLogined() {
	var e = localStorage.getItem("$ycuid");
	return "" != e && null != e && void 0 != e
}

function isNotrace() {
	if("object" == typeof localStorage) try {
		localStorage.setItem("localStorage", 1), localStorage.removeItem("localStorage")
	} catch(e) {
		Storage.prototype._setItem = Storage.prototype.setItem, Storage.prototype.setItem = function() {}, layer.open({
			content: "为了更好的用户体验,请先退出浏览器无痕模式！",
			btn: ["查看帮助", "我知道"],
			yes: function() {
				window.location.href = "http://jingyan.baidu.com/article/295430f121c9f50c7e00509a.html"
			}
		})
	}
}

function loadingTips() {
	layer.open({
		type: 2,
		className: "loadingTips",
		shadeClose: !1,
		content: "加载中"
	})
}

function closeLoadingTips() {
	layer.closeAll()
}

function loadingErrorTips() {
	layer.open({
		type: 2,
		className: "loadingTips loadErrorRefresh",
		shadeClose: !1,
		content: "加载错误，点击刷新"
	})
}

function loadingTipsAuto() {
	layer.open({
		type: 2,
		className: "loadingTips",
		shadeClose: !1,
		content: "加载中",
		time: 2
	})
}

function initIndexFunc() {
	getQuotes(), getDailyFresh(), getBigevent(), getGuestInterview(), getRecommendCourse(), getKnowledge(), getTeacher(), getStrategy()
}

function getQuotes() { //行情资讯
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Course.ashx?action=getFinancialKnowledge",
		dataType: "json",
		data: {
			type: "uptodate",
			pageIndex: 1,
			pageSize: 10,
			courseTypeId: 20
		},
		success: function(o) {
			for(var n = o.rows, t = 0; t < n.length; t++) {
				var imgSrc = n[t].mobileIconPath;
				if((imgSrc == "") || (imgSrc == undefined) || (imgSrc == "undefined")) {
					imgSrc = '../images/public/default.png';
				} else {
					imgSrc = SERVEROOTFILE + imgSrc;
				}
				e += '<div class="swiper-slide"><a href="html/pediaPlayer.html?ecId=' + n[t].courseId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + imgSrc + '"/></div><p class="bmbrief">' + n[t].name + "</p></a></div>";
			}
			$("#bmIndexQuotesBox").html(e), quotesSwiperFunc()
		}
	});
}

function quotesSwiperFunc() {
	new Swiper(".bmindexQuotesSwiper", {
		direction: "horizontal",
		slidesPerView: 2,
		spaceBetween: 0
	});
	$("#bmIndexQuotesBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function getDailyFresh() { //每日新鲜快讯
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Course.ashx?action=getFinancialKnowledge",
		dataType: "json",
		data: {
			type: "uptodate",
			pageIndex: 1,
			pageSize: 10,
			courseTypeId: 18
		},
		success: function(o) {
			for(var n = o.rows, t = 0; t < n.length; t++) {
				var imgSrc = n[t].mobileIconPath;
				if((imgSrc == "") || (imgSrc == undefined) || (imgSrc == "undefined")) {
					imgSrc = '../images/public/default.png';
				} else {
					imgSrc = SERVEROOTFILE + imgSrc;
				}
				e += '<div class="swiper-slide"><a href="html/pediaPlayer.html?ecId=' + n[t].courseId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + imgSrc + '"/></div><p class="bmbrief">' + n[t].name + "</p></a></div>";
			}
			$("#bmIndexFreshBox").html(e), dailyFreshSwiperFunc()
		}
	})
}

function dailyFreshSwiperFunc() {
	new Swiper(".bmindexFreshSwiper", {
		direction: "horizontal",
		slidesPerView: 2,
		spaceBetween: 0
	});
	$("#bmIndexFreshBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function getBigevent() { //每周大事件
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Course.ashx?action=getFinancialKnowledge",
		dataType: "json",
		data: {
			type: "uptodate",
			pageIndex: 1,
			pageSize: 10,
			courseTypeId: 17
		},
		success: function(o) {
			for(var n = o.rows, t = 0; t < n.length; t++) {
				var imgSrc = n[t].mobileIconPath;
				if((imgSrc == "") || (imgSrc == undefined) || (imgSrc == "undefined")) {
					imgSrc = '../images/public/default.png';
				} else {
					imgSrc = SERVEROOTFILE + imgSrc;
				}
				e += '<div class="swiper-slide"><a href="html/pediaPlayer.html?ecId=' + n[t].courseId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + imgSrc + '"/></div><p class="bmbrief">' + n[t].name + "</p></a></div>";
			}
			$("#bmIndexBigeventBox").html(e), bigeventSwiperFunc()
		}
	})
}

function bigeventSwiperFunc() {
	new Swiper(".bmindexBigeventSwiper", {
		direction: "horizontal",
		slidesPerView: 2,
		spaceBetween: 0
	});
	$("#bmIndexBigeventBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function getGuestInterview() { //嘉宾访谈
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Course.ashx?action=getFinancialKnowledge",
		dataType: "json",
		data: {
			type: "uptodate",
			pageIndex: 1,
			pageSize: 10,
			courseTypeId: 19
		},
		success: function(o) {
			for(var n = o.rows, t = 0; t < n.length; t++) {
				var imgSrc = n[t].mobileIconPath;
				if((imgSrc == "") || (imgSrc == undefined) || (imgSrc == "undefined")) {
					imgSrc = '../images/public/default.png';
				} else {
					imgSrc = SERVEROOTFILE + imgSrc;
				}
				e += '<div class="swiper-slide"><a href="html/pediaPlayer.html?ecId=' + n[t].courseId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + imgSrc + '"/></div><p class="bmbrief">' + n[t].name + "</p></a></div>";
			}
			$("#bmIndexGuestBox").html(e), guestSwiperFunc()
		}
	})
}

function guestSwiperFunc() {
	new Swiper(".bmindexGuestSwiper", {
		direction: "horizontal",
		slidesPerView: 2,
		spaceBetween: 0
	});
	$("#bmIndexGuestBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function getRecommendCourse() {
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Course.ashx?action=getRecommendCourse",
		dataType: "json",
		data: {
			courseTypeId: "",
			pageSize: 5,
			pageIndex: 1
		},
		success: function(o) {
			o = o.rows;
			for(var n = 0; n < o.length; n++) e += '<div class="swiper-slide"><a href="html/coursedetail.html?courseId=' + o[n].courseId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + SERVEROOTFILE + o[n].mobileIconPath + '"/><p>' + o[n].teacherName + '</p></div><p class="bmbrief">' + o[n].name + '</p><p class="bmprice">￥' + o[n].preferentialPrice + "</p></a></div>";
			$("#bmIndexRecommendBox").html(e), recommendSwiperFunc()
		}
	})
}

function recommendSwiperFunc() {
	new Swiper(".bmindexRecommendSwiper", {
		direction: "horizontal",
		slidesPerView: 2,
		slidesPerGroup: 2,
		spaceBetween: 0,
		loop: !0
	});
	$("#bmIndexRecommendBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function getKnowledge() {
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Course.ashx?action=getFinancialKnowledge",
		dataType: "json",
		data: {
			type: "uptodate",
			pageIndex: 1,
			pageSize: 1,
			topTypeId: 21
		},
		success: function(o) {
			console.log(o);
			for(var n = o.rows, t = 0; t < n.length; t++) e += '<div class="swiper-slide"><a href="html/pediaPlayer.html?ecId=' + n[t].courseId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + SERVEROOTFILE + n[t].iconPath + '"/></div><p class="bmbrief">' + n[t].name + "</p></a></div>";
			$("#bmIndexKnowledgeBox").html(e), knowledgeSwiperFunc()
		}
	})
}

function knowledgeSwiperFunc() {
	new Swiper(".bmindexKnowledgeSwiper", {
		direction: "horizontal",
		slidesPerView: 1,
		spaceBetween: 0

	});
	$("#bmIndexKnowledgeBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function getTeacher() {
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Teacher.ashx?action=getHotTeacher",
		dataType: "json",
		data: {},
		success: function(o) {
			for(var n = 0; n < o.length; n++) e += '<div class="swiper-slide"><a href="./html/teacherdetail.html?teacherId=' + o[n].teacherId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + SERVEROOTFILE + o[n].mobileIconPath + '"/></div><p>' + o[n].note + "</p></a></div>";
			$("#bmIndexTeacherBox").html(e), teacherSwiperFunc()
		}
	})
}

function getStrategy() {
	var e = "";
	$.ajax({
		type: "get",
		url: SERVEROOTDATA + "Teacher.ashx?action=getGuestOpinion",
		dataType: "json",
		data: {},
		success: function(o) {
			o = o.rows;
			for(var n = 0; n < 2; n++) e += '<div class="swiper-slide"><a href="./html/strategydetail.html?&newsTypeId=' + o[n].newsTypeId + '&teacherId=' + o[n].teacherId + '"><div class="imageBox"><img class="lazyload" src="../images/public/default.png" data-original="' + SERVEROOTFILE + o[n].mobileIconPath + '"/></div><p class="bmname">' + o[n].name + '</p><p class="bmnote">' + o[n].note + "</p></a></div>";
			$("#bmIndexStrategyBox").html(e), strategySwiperFunc();
		}
	})
}

function strategySwiperFunc() {
	new Swiper(".bmindexStrategySwiper", {
		direction: "horizontal",
		slidesPerView: 2,
		spaceBetween: 0,
	});
	$("#bmIndexStrategyBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

function teacherSwiperFunc() {
	new Swiper(".bmindexTeacherSwiper", {
		direction: "horizontal",
		slidesPerView: 1,
		spaceBetween: 0,
	});
	$("#bmIndexTeacherBox .lazyload").picLazyLoad({
		threshold: 10
	})
}

$.getUrlParam = function(e) {
	if("object" === typeof e) return window.location.search.substr(1);
	var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
		n = window.location.search.substr(1).match(o);
	return null != n ? decodeURI(n[2]) : void 0
}, $.getBasePath = function(e) {
	var o = window.document.location.href,
		n = window.document.location.pathname,
		t = o.indexOf(n),
		a = o.substring(0, t),
		i = a + n.substring(0, n.substr(1).indexOf("/") + 1) + "/";
	return 1 == e ? o : 2 == e ? n : 3 == e ? a : i
};
/*var SERVERROOT = "http://www.bomizx.net/",
	SERVEROOTDATA = "http://www.bomizx.net/bmonline/website/ashx/",
	SERVEROOTFILE = "http://www.bomizx.net/bmonline/",*/
var SERVERROOT = "http://api.bmizx.tv/ ",
	SERVEROOTDATA = "http://api.bmizx.tv/bmonline/website/ashx/",
	SERVEROOTFILE = "http://api.bmizx.tv/bmonline/",
	
	ROOT = $.getBasePath(),
	ROOTFILE = ROOT + "images/",
	ROOTDATA = ROOT + "data/",
	SERVERQQ = "4006430618",
	SERVERTEL = "4006430618";

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
	} else {
		console.log('手机');
	}
}

$(".cancel").on("click", function() {
	goBack()
}), $("#toggleQuickBtns").on("click", function() {
	$(this).toggleClass("active"), $(".quickBoxWrap").toggleClass("active")
}), $(".quickBoxWrap").on("click", function() {
	$(this).toggleClass("active"), $("#toggleQuickBtns").toggleClass("active")
}), isNotrace(), $("body").on("click", ".loadErrorRefresh", function() {
	window.location.reload()
});