/*
 * Autor：黄佳宝(Jabo)
 * Time:2017/04/26
 * Desc: swiper instance
 */

//Index Banner
//var indexSwiper = new Swiper('.dycbanner-container', {
//	pagination: '.swiper-pagination',
//	paginationClickable: '.swiper-pagination',
//	autoplay: 3000,
//	loop: true,
//	spaceBetween: 30
//	//effect: 'fade'
//});

function indexSwiper() {
	var indexSwiper = new Swiper('.dycbanner-container', {
		pagination: '.swiper-pagination',
		paginationClickable: '.swiper-pagination',
		autoplay: 3000,
		loop: true,
		spaceBetween: 2
		//effect: 'fade'
	});
}

//投资理财与考试Tab
var tzksSwiper = new Swiper('.dyctzks-container', {
	pagination: '.yctzks-swiper-pagination',
	paginationClickable: true,
	paginationBulletRender: function(tzksSwiper, index, className) {
		switch(index) {
			case 0:
				name = '理财投资';
				break;
			case 1:
				name = '考证从业';
				break;
			default:
				name = '';
		}
		return '<li class="' + className + '">' + name + '</li>';
	}
})

//金融优势
var ysSwiper = new Swiper('.ycys-container', {
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	slidesPerView: 4,
	spaceBetween: 20,
	breakpoints: {
		960: {
			slidesPerView: 3,
			spaceBetween: 10
		},
		767: {
			slidesPerView: 2,
			spaceBetween: 10
		},
		479: {
			slidesPerView: 1,
			spaceBetween: 10
		}
	},
	//loop: true
});

//视频课程type
function ckTypeSwiper() {
	new Swiper('.yccktype-container', {
		slidesPerView: 4,
		spaceBetween: 20
		//loop: true
	})
}

//课程详情Tab
function ckdetail() {
	var kcxqSwiper = new Swiper('.dyckcxq-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		pagination: '.yckcxq-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '课程详情';
					break;
				case 1:
					name = '课程大纲';
					break;
				case 2:
					name = '课程评价';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + ' jcIndex' + index + '" data-id=' + index + '>' + name + '</li>';
		}
	})
	window.kcxqSwiper = kcxqSwiper;
}

//课程详情: 猜你喜欢
function guessCourseLike() {
	var kcglSwiper = new Swiper('.dyckcgl-container', {
		slidesPerView: 4,
		nested: true,
		noSwiping: false,
		spaceBetween: 20,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
	})
}

//新闻列表Banner
function newListBanner() {
	var newlistSwiper = new Swiper('.dycnewslist-container', {
		pagination: '.swiper-pagination',
		autoplay: 3000,//可选选项，自动滑动
		paginationClickable: true
	});
}

//新闻列表2
function newListSwiper() {
	var newlistshowSwiper = new Swiper('.dycnewlist-container', {
		mousewheelControl: false,
		noSwiping: true,
		pagination: '.ycnews-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '热点资讯';
					break;
				case 1:
					name = '头条新闻';
					break;
				case 2:
					name = '财经快讯';
					break;
				case 3:
					name = '行情数据';
					break;
				case 4:
					name = '考试资讯';
					break;
				case 5:
					name = '观点话题';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '" data-id="' + index + '">' + name + '</li>';
		}
	})

	window.newlistshowSwiper = newlistshowSwiper;
}

//新闻详情1 --播米名师
function newsdetailSwiper(){
	var newdetailSwiper = new Swiper('.dycnewsdetail-container', {
	pagination: '.ycnewsdetail-swiper-pagination',
	paginationClickable: true,
	loop: true
})
}


//新闻详情2 ---播米直播
function ndLASwiper() {
	var newdetailSwiper = new Swiper('.dycnewsdetail2-container', {
		pagination: '.ycnewsdetail2-swiper-pagination',
		paginationClickable: true,
		loop: true
	})
}

//会员我的订单Tab
function memberSwiper() {
	var mborderSwiper = new Swiper('.dycorder-container', {
		mousewheelControl: false,
		noSwiping: true,
		speed:400,
		pagination: '.ycmborder-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '全部订单';
					break;
				case 1:
					name = '待付款';
					break;
				case 2:
					/*name = '待评价';*/
					name='已支付';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '" data-id="' + index + '">' + name + '</li>';
		}
	})

	window.mborderSwiper = mborderSwiper;
}

//会员我的邀请码Tab
function invitationSwiper() {
	var mbinvitationSwiper = new Swiper('.dycinvitation-code-container', {
		mousewheelControl: false,
		noSwiping: true,
		pagination: '.ycmbinvitation-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '我的邀请码';
					break;
				case 1:
					name = '邀请记录和奖励';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '">' + name + '</li>';
		}
	})
	window.mbinvitationSwiper = mbinvitationSwiper;
}

//会员我的题库Tab
function questionsSwiper() {
	var mbquestionsSwiper = new Swiper('.dycquestions-container', {
		mousewheelControl: false,
		noSwiping: true,
		pagination: '.ycmbquestions-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '大宗';
					break;
				case 1:
					name = '证券';
					break;
				case 2:
					name = '外汇';
					break;
				case 3:
					name = '私募';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '" data-id="'+(index+1)+'">' + name + '</li>';
		}
	})
	window.mbquestionsSwiper = mbquestionsSwiper;
}

//会员我的课程Tab
function courseSwiper() {
	var mbcourseSwiper = new Swiper('.dyccourse-container', {
		mousewheelControl: false,
		noSwiping: true,
		pagination: '.dycmykc-swiper-pagination',
		paginationClickable: true,
		uniqueNavElements: false,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '大宗';
					break;
				case 1:
					name = '证券';
					break;
				case 2:
					name = '外汇';
					break;
				case 3:
					name = '私募';
					break;
				default:
					name = '';
			}
			return '<li class="jmblistChange ' + className + '" data-id="' + index + '">' + name + '</li>';
		}
	})
	window.mbcourseSwiper = mbcourseSwiper;
}

/*
 * 购物车
 */
//var spcartSwiper = new Swiper('.dycspcart-container', {
//	mousewheelControl: false,
//	noSwiping: true,
//	autoHeight: true,
//	pagination: '.ycspcart-swiper-pagination',
//	paginationClickable: true,
//	paginationBulletRender: function(tzksSwiper, index, className) {
//		switch(index) {
//			case 0:
//				name = '全部课程';
//				break;
//			case 1:
//				name = '打折课程';
//				break;
//			case 2:
//				name = '即将过期';
//				break;
//			default:
//				name = '';
//		}
//		return '<li class="' + className + '">' + name + ' <span class="dycspcartnum jspcartnum' + index + '">2</span></li>';
//	}
//})

function spcartFunc() {
	var spcartSwiper = new Swiper('.dycspcart-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		pagination: '.ycspcart-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '全部课程';
					break;
				case 1:
					name = '打折课程';
					break;
				case 2:
					name = '即将过期';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + ' jspcartli' + index + '">' + name + ' <span class="dycspcartnum jspcartnum' + index + '"></span></li>';
		}
	})

	window.spcartSwiper = spcartSwiper;
}