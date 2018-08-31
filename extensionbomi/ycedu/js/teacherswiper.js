//全局会员等级变量
var Lever = new Array("普通", "白银", "黄金", "钻石", "专属一", "专属二", "专属三");

function getLever() {
	var str = new Array();
	$mLever = localStorage.getItem("mLever");
	switch($mLever) {
		case "普通会员":
			str[0] = Lever[0];
			str[1] = 0;
			break;
		case "白银会员":
			str[0] = Lever[1];
			str[1] = 1;
			break;
		case "黄金会员":
			str[0] = Lever[2];
			str[1] = 2;
			break;
		case "钻石会员":
			str[0] = Lever[3];
			str[1] = 3;
			break;
		case "专属会员(一对一)":
			str[0] = Lever[4];
			str[1] = 4;
			break;
		case "专属会员(二对一)":
			str[0] = Lever[5];
			str[1] = 5;
			break;
		case "专属会员(三对一)":
			str[0] = Lever[6];
			str[1] = 6;
			break;
		default:
			return false
	}
	return str;
}

//客服
$("#jsvtn_shop").click(function() {
	var num = $('.shops-num').text();
	num++;
	$('.shops-num').html(num);
})

//直播专题页
$.livestopicList = function(id) {
	var $jliveslist = $("#jlivestopiclist"),
		num = 0,
		$btnStr = "",
		$htmlStr = "";

	var datee = new Date();
	var week = datee.getDay();

	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getLiveCoursePlayback",
		dataType: "json",
		data: {
			"pageIndex": 1,
			"pageSize": 5
		},
		success: function(result) {
			if(result.rows.length < 1) {
				return false;
			}
			result.rows.forEach(function(value, index) {
				switch(value.weekDay) {
					case '周一':
						num = 1;
						break;
					case '周二':
						num = 2;
						break;
					case '周三':
						num = 3;
						break;
					case '周四':
						num = 4;
						break;
					case '周五':
						num = 5;
						break;
					default:
						break;
				}
				if(num < week) { //已播
					$btnStr = "<div class='dyclivestopic-box-btn'><a class='over-btn'>公开课已结束</a><a class='replay-btn' href='player.html?courseId=" + value.courseId + "&videoId=" + value.videoId + "&courseCatalogId=" + value.courseCatalogId + "' target='_blank'>回看课程<i class='uk-icon-caret-right'></i></a></div>";
				} else if(num == week) { //当天正在播
					$btnStr = "<div class='dyclivestopic-box-btn'><a class='now-btn' href='bmliveroom.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'>进入公开课<i class='uk-icon-caret-right'></i></a></div>";
				} else if(num > week) { //未播
					$btnStr = "<div class='dyclivestopic-box-btn'><a class='will-btn'>课程暂未开始</a></div>";
				}

				$htmlStr += "<li class='dyclivestopic-box clearfix'><div class='span7 dyclivestopic-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /><p>" + value.note + "</p></div><div class='span5 dyclivestopic-box-brief'><h3>" + value.teacherName + "的实战演练课程</h3><p>嘉 宾：" + value.teacherName + "</p><p>主持人：" + value.anchorName + "</p><p>时 段：" + value.weekDay + ' ' + value.playBeginTime + '-' + value.playEndTime + "</p><p>课 程：" + value.courseName + "</p>" + $btnStr + "</div></li>";

			});
			$jliveslist.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//直播选择页banner
$.lpsBannerFunc = function() {
	var $jlpsBanner = $("#lpsBanner"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=live",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href=" + value.href + " target='_blank'></a></div>"
			})
			$jlpsBanner.html("");
			$jlpsBanner.html($htmlStr);
			indexSwiper(); //new swiper
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//视频课程banner
$.courseBanner = function() {
	var $jcourseBanner = $("#jcoursebanner"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=course",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				/*$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href=" + ROUTEROOT + value.href + " target='_blank'></a></div>"
			})*/
				$htmlStr += "<div class='swiper-slide' style='background-image: url(" + ROUTEFILE + value.iconPath + ");'><a href='#this'></a></div>"
			})
			$jcourseBanner.html("");
			$jcourseBanner.html($htmlStr);
			indexSwiper(); //new swiper
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//直播选择页-热门课程Tab-swiper
function hotzbSwiper() {
	var hotzbSwiper = new Swiper('.dycgkcourse-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		slidesPerView: 6,
		spaceBetween: 20,
	});
}

//打赏直播页-直播课程
function costliveSwiper(num) {
	var costliveSwiper = new Swiper('.dyccostprogram-container', {
		autoplay: 3000,
		loop: true,
		spaceBetween: 20,
		slidesPerView: num,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
	});
}

//直播选择页-热门Tab
/*$.dyzboTab = function(id) {
	var $jdyzboTab = $("#jliveselecttab"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannel",
		dataType: "json",
		data: {},
		success: function(result) {
			console.log(result);
			$htmlStr = "<div class='swiper-slide active' data-id='1'>热门直播</div>";
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' data-id=" + value.channelId + ">" + value.name + "</div>";
			});
			$jdyzboTab.html($htmlStr);
			gkcourseSwiper.update();
			lphotTab();
		},
		error: function(err) {
			console.log(err);
		}
	});
}*/

//直播选择
/*$.dyzboCon = function(id) {
	var $jdyzboCon = $("#jliveselectcon"),
	    $htmlStr = "";
	
	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannel",
		dataType: "json",
		data: {
			courseTypeId: id
		},
		success: function(result) {
			
				$jdyzboCon.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}*/

//直播选择-往期Tab
$.dyzoldTab = function(id) {
	var $jdyzhotsTab = $("#jliveoldtab"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseType.ashx?action=getChannelCourseType",
		dataType: "json",
		data: {},
		success: function(result) {
			$htmlStr = "<div class='swiper-slide active' data-id=''>往期课程</div>";
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' data-id=" + value.courseTypeId + ">" + value.name + "</div>";
			});
			$jdyzhotsTab.html($htmlStr);
			hotzbSwiper();
			/*hotzbSwiper.update();*/
			lpoldTab();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//直播选择-往期内容
$.dyzoldCon = function(id) {
	var $jdyzoldCon = $("#jliveoldcon"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getLiveChannelCourse",
		dataType: "json",
		data: {
			courseTypeId: id
		},
		success: function(result) {
			if(result.rows.length < 1) {
				$htmlStr = '';
			} else {
				result.rows.forEach(function(value, index) {
					$htmlStr += "<li><a href='ycedu/player.html?courseId=" + value.courseId + "&videoId=' data-id=" + value.courseId + " target='_blank' title=" + value.name + "><img src='" + ROUTEFILE + value.iconPath + "'></a></li>";
				});
			}

			$jdyzoldCon.html("<ul class='dycgklist'>" + $htmlStr + "</ul>");
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//直播选择页点击热门直播发起数据请求
function lphotTab(channelId, channelProgramId) {
	var $jdyzboCon = $("#jliveselectcon"),
		$htmlStr = "";

	$.ajax({ //默认获取第一个-嘉宾做客
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=guest",
		dataType: "json",
		async: false,
		success: function(result) {
			if(result.length == 0) {
				return false
			}
			$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
			$jdyzboCon.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});

	var oTabhs = $('#jliveselecttab .swiper-slide');
	//热门直播
	oTabhs.each(function(index) {
		$(this).click(function() {
			var dataId = $(this).attr("data-id");
			var $htmlStr = "";
			oTabhs.removeClass('active');
			$(this).addClass('active');
			//$.jSchedule(dataId); 切换的同时，右边菜单也切换
			//$.dyzboCon(dataId);
			switch(dataId) {
				case "1":
					$.ajax({ //嘉宾做客
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=guest",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				case "2":
					$.ajax({ //课程抢鲜
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=firstCourse",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				case "3":
					$.ajax({ //实时播报
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=broadcast",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				case "4":
					$.ajax({ //主播在线
						type: "GET",
						url: ROUTE + "Banner.ashx?action=getBanner&bannerType=anchorOnline",
						dataType: "json",
						async: false,
						success: function(result) {
							if(result.length == 0) {
								return false
							}
							$htmlStr = "<a class='dyclpsg-wrap' href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank' style='background-image:url(" + ROUTEFILE + result[0].iconPath + ")'></a>";
						},
						error: function(err) {
							console.log(err);
						}
					});
					break;
				default:
					console.log("error");
					break;
			}
			$jdyzboCon.html($htmlStr);
			//$.liveMenu(dataId);
		})
	});
}

//直播选择页点击往期回顾发起数据请求
function lpoldTab() {
	var oTabolds = $('#jliveoldtab .swiper-slide');
	//热门直播
	oTabolds.each(function(index) {
		$(this).click(function() {
			var dataId = $(this).attr("data-id");
			oTabolds.removeClass('active');
			$(this).addClass('active');
			$.dyzoldCon(dataId);
		})
	});
}

//直播选择-直播菜单（20170819修改删除）
/*$.liveMenu = function(id) {
	var $jliveMenu = $("#jlivemenu"),
		$nhtmlStr = "",
		$htmlStr = "";
	var datee = new Date();
	var strHours = datee.getHours();
	var strSeconds = datee.getSeconds();
	var channelarr = new Array();

	var arr = new Array();
	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			result.forEach(function(value, index) {
				var time = value.playTime.split("-");
				for(var i = 0; i < time.length; i++) {
					arr[i] = time[i].split(":");
				}
				var smallhour = arr[0][0];
				var smallhoursecond = arr[0][1];
				var bighour = arr[1][0];
				var bighoursecond = arr[1][1];
				if(id == 1) {
					$nhtmlStr = "<a class='dyclivemenu dyclivenow' href='ycedu/liveplay.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'><p class='dyclive-name'>" + value.name + "</p><p class='dyclive-time'>" + value.playTime + "</p><p class='dyclivemenu-btn'>直播</p></a>";
				} else {
					$nhtmlStr = "<a class='dyclivemenu dyclivenow' href='ycedu/bmliveroom.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'><p class='dyclive-name'>" + value.name + "</p><p class='dyclive-time'>" + value.playTime + "</p><p class='dyclivemenu-btn'>直播</p></a>";
				}

				if(((strHours > smallhour) && (strHours < bighour)) || ((strHours == smallhour) && (strSeconds >= smallhoursecond)) || ((strHours == bighour) && (strSeconds <= bighoursecond))) {
					$htmlStr += $nhtmlStr;
					channelarr[0] = value.channelProgramId;
					channelarr[1] = value.channelId;
				} else {
					$htmlStr += "<a class='dyclivemenu'><p class='dyclive-name'>" + value.name + "</p><p class='dyclive-time'>" + value.playTime + "</p></a>";
				}

			});
			$jliveMenu.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
	return channelarr;
}*/

$.jSchedule = function(id) {
	var $jliveMenu = $("#jSchedule"),
		$jScheduleLimit = $('#jScheduleLimit'),
		$nhtmlStr = "",
		$htmlStr = "";
	var datee = new Date();
	var week = datee.getDay() - 1;
	var xinqi = new Array();
	xinqi[0] = '周一';
	xinqi[1] = '周二';
	xinqi[2] = '周三';
	xinqi[3] = '周四';
	xinqi[4] = '周五';
	xinqi[5] = '周六';
	xinqi[6] = '周日';

	/*var channelarr = new Array();*/
	/*var arr = new Array();*/

	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannelPeriod",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			if(result.length == 0) {
				return false
			}
			$jScheduleLimit.html('<span></span>排班有效期：' + result[0].dayBegin + ' 到 ' + result[0].dayEnd);
		},
		error: function(err) {
			console.log(err);
		}
	});

	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			result.forEach(function(value, index) {
				switch(value.weekDay) {
					case '周一':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周一<span>MON</span></p>";
						break;
					case '周二':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周二<span>TUE</span></p>";
						break;
					case '周三':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周三<span>WED</span></p>";
						break;
					case '周四':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周四<span>THU</span></p>";
						break;
					case '周五':
						$nhtmlStr = "<p class='dychotzb-schedule-left'>周五<span>FRI</span></p>";
						break;
					default:
						console.log("error");
						break;
				}

				if(value.channelId == 6) {
					if(value.weekDay == xinqi[week]) { //当天才可以点击
						$htmlStr += "<a class='dychotzb-schedule-box active' href='ycedu/bmliveroom.html?channelId=" + value.channelId + "&channelProgramId=" + value.channelProgramId + "' target='_blank'>" + $nhtmlStr + "<div class='dychotzb-schedule-right'><p class='time'><span></span>时间：" + value.playTime + "</p><p class='person'><span></span>特约嘉宾：<em>" + value.teacherName + "</em><em>" + value.anchorName + "</em></p></div></a>";
						lphotTab(value.channelId, value.channelProgramId);

					} else { //不是当天不能点击
						$htmlStr += "<a class='dychotzb-schedule-box'>" + $nhtmlStr + "<div class='dychotzb-schedule-right'><p class='time'><span></span>时间：" + value.playTime + "</p><p class='person'><span></span>特约嘉宾：<em>" + value.teacherName + "</em><em>" + value.anchorName + "</em></p></div></a>";
					}

				}

			});

			$jliveMenu.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
	/*return channelarr;*/
}

/*//在线直播-直播源
$.courseBrief = function(id) {
	var $jcourseBrief = $("#jcoursebrief");
	$.ajax({
		type: "GET",
		url: ROUTE + "Channel.ashx?action=getLiveChannelProgram",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {

			$jcourseBrief.html(result[0].note);

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//在线直播-推荐课程
$.recommendCourse = function(id) {
	var $jrecommendCourse = $("#jrecommendcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getChannelRecommendCourse",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<li class='span4'><a class='dyccourse-list-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dyccourse-list-img'><img src='" + ROUTEFILE + value.iconPath + "'></div><p class='dyccourse-list-title'>" + value.name + "</p><p class='dyccourse-list-brief'>" + value.note + "</p></a></li>";
			});
			$jrecommendCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//在线直播-推荐老师
$.relatedTeacher = function(id) {
	var $jrelatedTeacher = $("#jrelatedteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getLiveRecommendTeacher",
		dataType: "json",
		data: {
			"channelId": id
		},
		success: function(result) {

			$htmlStr = "<a class='dycliveteacher' href='guestindex.html?teacherId=" + result[0].teacherId + "'><div class='dycliveteacher-img'><img src='" + ROUTEFILE + result[0].iconPath + "'></div><p class='dycliveteacher-name'>" + result[0].name + "</p><p class='dycliveteacher-brief'>" + result[0].note + "</p></a>";

			$jrelatedTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}
*/

//关于我们Tab
$.aboutSwiper = function() {

	var aboutSwiper = new Swiper('.dycaboutus-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		pagination: '.ycabout-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '> 播米在线';
					break;
				case 1:
					name = '> 播米优势';
					break;
				case 2:
					name = '> 合作伙伴';
					break;
				case 3:
					name = '> 展望未来';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '">' + name + '</li>';
		}
	});

}

//联系我们Tab
$.contactSwiper = function() {
	var aboutSwiper = new Swiper('.dyccontactus-container', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		pagination: '.ycabout-swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function(tzksSwiper, index, className) {
			switch(index) {
				case 0:
					name = '> 联系方式';
					break;
				case 1:
					name = '> 关注微信';
					break;
				case 2:
					name = '> 关注微博';
					break;
				case 3:
					name = '> 邮箱、QQ';
					break;
				default:
					name = '';
			}
			return '<li class="' + className + '">' + name + '</li>';
		}
	});
}
//课程详情-课程评价
$.courseComment = function(id, index) {
	var $jcourseComment = $("#jcoursecomment"),
		$iconStr = "",
		$nameStr = "",
		$num = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseEvaluation.ashx?action=getEvaluation",
		dataType: "json",
		data: {
			"courseId": id,
			"pageIndex": index,
			"pageSize": 5
		},
		success: function(result) {
			$num = index;
			if(result.rows.length == 0) {

				$jcourseComment.html($htmlStr);
				$('#jaddmore').css('display', 'none');
				return false;
			} else {
				if(result.totalPageCount == 1) {
					$('#jaddmore').css('display', 'none');
				}
				result.rows.forEach(function(value, index) {
					if(value.memberId != 0) {
						if((value.iconPath == '') || (value.memberId == 0)) {
							$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
						} else {
							$iconStr = ROUTEFILE + value.iconPath;
						}
					} else {
						$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
					}
					$htmlStr += "<div class='dycmli-box clearfix'><div class='dyccm-icon'><div class='dyccm-icon-img' style='background-image:url(" + $iconStr + ")'></div><span class='dyccm-icon-name'>" + value.nickName + "</span></div><div class='dyccm-content'><p>" + value.evaluation + "</p></div></div>";
				});
				$jcourseComment.html($htmlStr);
				$('#jaddmore').click(function() {
					$num++;
					if($num == result.totalPageCount) {
						$('#jaddmore').css('display', 'none');
					};
					$.courseCommentmore(id, $num);
				});
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//课程详情-课程评价-点击添加更多
$.courseCommentmore = function(id, $index) {
	var $jcourseComment = $("#jcoursecomment"),
		$iconStr = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseEvaluation.ashx?action=getEvaluation",
		dataType: "json",
		data: {
			"courseId": id,
			"pageIndex": $index,
			"pageSize": 5
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if(value.memberId != 0) {
					if((value.iconPath == '') || (value.memberId == 0)) {
						$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
					} else {
						$iconStr = ROUTEFILE + value.iconPath;
					}
				} else {
					$iconStr = ROUTEROOT + "ycedu/images/sz01.jpg";
				}
				$htmlStr += "<div class='dycmli-box clearfix'><div class='dyccm-icon'><div class='dyccm-icon-img' style='background-image:url(" + $iconStr + ")'></div><span>" + value.nickName + "</span></div><div class='dyccm-content'><p>" + value.evaluation + "</p></div></div>";
			});
			$jcourseComment.append($htmlStr);
			window.kcxqSwiper.update();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//课程详情-课程评价-提交评论
$.postComment = function(id) {
	var $jcourseComment = $("#jcoursecomment"),
		$iconStr = "",
		$nameStr = "",
		$htmlStr = "";
	$.ajax({
		type: "POST",
		url: ROUTE + "CourseEvaluation.ashx?action=evaluation",
		data: {
			memberId: $mid,
			courseId: id,
			evaluation: $("#jcomment").val()
		},
		success: function(result) {
			if(result == '会员评论成功') {
				if($mid != null && $mid != undefined && $mid != "") {
					if($mUserIcon != null && $mUserIcon != undefined && $mUserIcon != "") {
						$iconStr = $mUserIcon;
					} else {
						$iconStr = "images/sz01.jpg";
					}
					$htmlStr = "<div class='dycmli-box'><div class='dyccm-icon'><div class='dyccm-icon-img' style='background-image:url(" + ROUTEFILE + $iconStr + ")'></div><span>" + $mNickName + "</span></div><div class='dyccm-content'><p>" + $("#jcomment").val() + "</p></div></div>";

					alert('评论成功~');
					$jcourseComment.prepend($htmlStr);
					window.kcxqSwiper.update();
					$("#jcomment").val(' ');
				} else {
					//未登入时
					layer.msg("Sorry ╮(╯_╰)╭ 您还未登入哦！");
					return false;
				}

			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//课程详情-其他课程
$.courseOther = function(id) {
	var $jcadBox = $("#jcadbox"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			if(result.rows.length >= 2) {
				for(var i = 0; i < 2; i++) {
					$htmlStr += "<a class='dycadbox-wrap' href='coursedetail.html?courseId=" + result.rows[i].courseId + "'><img src='" + ROUTEFILE + result.rows[i].iconPath + "' alt='课程' /></a>";
				}
			} else {
				for(var i = 0; i < result.rows.length; i++) {
					$htmlStr += "<a class='dycadbox-wrap' href='coursedetail.html?courseId=" + result.rows[i].courseId + "'><img src='" + ROUTEFILE + result.rows[i].iconPath + "' alt='课程' /></a>";
				}
			}
			$jcadBox.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师专题-名师列表类别tab
function ftSwiper() {
	var ftswiper = new Swiper('.dycmsexpert-list', {
		mousewheelControl: false,
		noSwiping: true,
		autoHeight: true,
		slidesPerView: 4,
		spaceBetween: 0
	});
}

//名师专题-名师类别
$.teachertopicTab = function(id) {
	var $jfteacherTab = $("#jfteachertab"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseType.ashx?action=getTeacherCourseType",
		dataType: "json",
		data: {

		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide' ><a class='dycmsexpert-keys' href='#this' data-id=" + value.courseTypeId + ">" + value.name + "</a></div>";
			});

			$jfteacherTab.html($htmlStr);
			ftSwiper();
			fteacherTab();
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师专题-名师列表
$.fteacherList = function(id, pageIndex) {
	var $jteacherList = $("#jteacherlist"),
		$jteacherpage = $("#jteacherpage"),
		$htmlPage = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseTypeNew",
		dataType: "json",
		data: {
			"courseTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 9
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				var $htmlHref = "",
					$htmlLeft = "";
				if(value.isstack) {
					$htmlLeft = "<div class='span4'><a href='ycedu/guestindex.html?teacherId=" + value.teacherId + "' class='dycst-images'><img src='" + ROUTEFILE + value.iconPath + "' alt=" + value.name + " /><div class='dycteacher-title'>" + value.teacherGradeName + "</div></a></div>";
					$htmlHref = "<a class='dycstlist-name' href='ycedu/guestindex.html?teacherId=" + value.teacherId + "'>" + value.name + "</a>";
				} else {
					$htmlLeft = "<div class='span4'><a href='ycedu/guestindex.html?teacherId=" + value.teacherId + "' class='dycst-images'><img src='" + ROUTEFILE + value.iconPath + "' alt=" + value.name + " /><div class='dycteacher-title'>" + value.teacherGradeName + "</div></a></div>";
					$htmlHref = "<a class='dycstlist-name' href='ycedu/guestindex.html?teacherId=" + value.teacherId + "'>" + value.name + "</a>";
				}
				$htmlStr += "<div class='dycst-wrap clearfix'>" + $htmlLeft + "<div class='span8'><div class='dycstlist-box'>" + $htmlHref + "<p class='dycstlist-interest'>" + value.specialty + "</p><p class='dycstlist-brief'>" + value.note + "</p><div class='dycstcourse' ><a class='dycstcourse-list' href='ycedu/coursedetail.html?courseId=" + value.courseId + "'> 课程：<span class='dycstcourse-name'>" + value.courseName + "</span><span class='dycstcourse-num'>已报" + value.orderedCount + "人</span><span class='dycstcourse-vedio'></span></a><a class='dycstcourse-list' href='ycedu/liveplay.html?channelId=" + value.channelId + "'>直播：<span class='dycstcourse-name'>" + value.liveProgramName + "</span><span class='dycstcourse-num'>已报" + value.liveOrderedCount + "人</span></a></div></div></div></div>";
			});

			$jteacherList.html($htmlStr);
			for(var i = 0; i < result.totalPageCount; i++) {
				$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
			}

			$jteacherpage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
			var $jteacherPage = $('#jteacherpage li a');

			if(result.totalPageCount == '0') {
				$jsubPage.css('display', 'none');
			} else if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
				$jteacherPage.eq(0).css('display', 'none');
				$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
			} else if(pageIndex == '1') {
				$jteacherPage.eq(0).css('display', 'none');
			} else if(pageIndex == (result.totalPageCount)) {
				$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
			}
			$jteacherPage.eq(pageIndex).parent().addClass('active');

			$jteacherPage.click(function() {
				var num = $jteacherPage.index(this);
				if(num && (num < $jteacherPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jteacherPage.length - 1)) && (pageIndex < $jteacherPage.length - 2)) {
					pageIndex += 1;
				}
				$.fteacherList(id, pageIndex);

				$.scrollTo(1800, 0);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}
//名师专题名师类别切换
function fteacherTab() {
	var oTab = $('#jfteachertab .swiper-slide');
	//热门直播
	oTab.each(function(index) {
		$(this).click(function() {
			var dataId = $(this).find("a").attr("data-id");
			oTab.removeClass('active');
			$(this).addClass('active');
			$.fteacherList(dataId, 1);
		})
	});
}
//外汇专题-课程列表
$.fxCourse = function(id) {
	var $jfxCourse = $("#jfxcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dycfxcourse-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dycfxcourse-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='dycfxcourse-title'>" + value.name + "</p><p class='dycfxcourse-brief'>" + value.note + "</p></a>";
			});
			$jfxCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//外汇专题-名师
$.fxTeacher = function(id) {
	var $jfxTeacher = $("#jfxteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if((index >= 0) && (index < 3)) {
					$htmlStr += "<div class='dycstotea-box'><a href='guestindex.html?teacherId=" + value.teacherId + "' class='dycstotea-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /><div class='dycfxteacher-title'>" + value.teacherGradeName + "</div></a><p class='dycstotea-box-title'>" + value.name + "</p><p class='dycstotea-box-brief'>" + value.note + "</p></div>";
				} else {
					return false;
				}
			});
			$jfxTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//大宗专题-课程列表
$.bulkCourse = function(id) {
	var $jbulkCourse = $("#jbulkcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dycdzcourse-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dycdzcourse-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='dycdzcourse-title'>" + value.name + "</p><p class='dycdzcourse-brief'>" + value.note + "</p></a>";
			});
			$jbulkCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//大宗专题-名师
$.bulkTeacher = function(id) {
	var $jbulkTeacher = $("#jbulkteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {

			result.rows.forEach(function(value, index) {
				if((index >= 0) && (index < 3)) {
					$htmlStr += "<div class='dycstotea-box'><a href='guestindex.html?teacherId=" + value.teacherId + "' class='dycstotea-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /><div class='dycdzteacher-title'>" + value.teacherGradeName + "</div></a><p class='dycstotea-box-title'>" + value.name + "</p><p class='dycstotea-box-brief'>" + value.note + "</p></div>";
				} else {
					return false;
				}
			});

			$jbulkTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//股票专题-课程列表
$.stockCourse = function(id) {
	var $jstockCourse = $("#jstockcourse"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dyccoursewrap-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dyccourse-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='dyccourse-title'>" + value.name + "</p><p class='dyccourse-brief'>" + value.note + "</p></a>";
			});
			$jstockCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//股票专题-相关老师
$.stockTeacher = function(id) {
	var $stockTeacher = $("#jstockteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if((index >= 0) && (index < 3)) {
					$htmlStr += "<div class='dycstotea-box'><a href='guestindex.html?teacherId=" + value.teacherId + "' class='dycstotea-box-img'><img src='" + ROUTEFILE + value.iconPath + "' /></a><p class='dycstotea-box-title'>" + value.teacherGradeName + "：<br/>" + value.name + " 嘉宾</p><p class='dycstotea-box-brief'>" + value.note + "</p></div>";
				} else {
					return false;
				}
			});
			$stockTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//从业（证券）专题-课程列表
$.securityCourse = function(id) {
	var $jsecurityCourse = $("#jseccheats"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseTopicByType",
		dataType: "json",
		data: {
			"courseTypeId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<a class='dycseccheats-box' href='coursedetail.html?courseId=" + value.courseId + "'><div class='dycseccheats-image'><img src='" + ROUTEFILE + value.iconPath + " '/></div><div class='dycseccheats-brief'><div class='dycseccheats-box-title'>" + value.name + "</div><p class='dycseccheats-box-brief'>" + value.note + "</p></div></a>";
			});
			$jsecurityCourse.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//从业（证券）专题-名师
$.secTeacher = function(id) {
	var $jsecTeacher = $("#jsecteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByCourseType",
		dataType: "json",
		data: {
			"courseTypeId": 1
		},
		success: function(result) {
			$htmlStr = "<div class='span4'><a class='dycsecteacher-image' href='guestindex.html?teacherId=" + result.rows[0].teacherId + "'><image src='" + ROUTEFILE + result.rows[0].iconPath + "' /><div class='dycsecteacher-name'><span>" + result.rows[0].name + "</span>嘉宾</div></a></div><div class='span8'><div class='dycsecteacher-brief'>" + result.rows[0].teacherGradeName + "：" + result.rows[0].name + " 嘉宾<br/>" + result.rows[0].note + "</div></div>";
			$jsecTeacher.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//录制播放player-课程播放列表
$.playerList = function(id, ccId) {
	var $jplayerlist = $("#jplayerlist"),
		$htmlStr = "",
		$status = "";
	var arr = new Array();
	var arrow = 1;

	$.ajax({
		type: "GET",
		url: ROUTE + "CourseCatalog.ashx?action=getCourseCatalogByCourseId",
		dataType: "json",
		data: {
			"memberId": $mid,
			"courseId": id
		},
		async: false,
		success: function(result) {
			arr[2] = result[0][0].isSold; //是否购买
			/*返回第一个免费试听的videoId和名称*/
			for(var i = 0; i < result[1].length; i++) {
				if(arrow) {
					if(result[1][i].children == undefined) {
						if(result[1][i].allowListen == 1) {
							arr[0] = result[1][i].videoId;
							arr[1] = result[1][i].courseCatalogId; //章节名称

							arrow = 0;
						}
					} else {
						for(var j = 0; j < result[1][i].children.length; j++) {
							if((arrow) && (result[1][i].children[j].allowListen == 1)) {
								arr[0] = result[1][i].children[j].videoId;
								arr[1] = result[1][i].children[j].courseCatalogId; //章节名称

								arrow = 0;
							}
						}
					}
				}
			}

			result[1].forEach(function(value, index) {
				var $nodeStr = "";

				if(value.children == undefined) {
					$nodeStr = "";
					if(value.courseCatalogId == ccId) {
						$htmlStr += "<ul><h4 class='active'><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='#this'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					} else {
						$htmlStr += "<ul><h4><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='player.html?courseId=" + value.courseId + "&videoId=" + value.videoId + "&courseCatalogId=" + value.courseCatalogId + "'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					}
				} else {
					value.children.forEach(function(children, num) {
						if(children.courseCatalogId == ccId) {
							$nodeStr += "<li><a class='active' href='#this'><span class='dycpltext'>" + 0 + (num + 1) + "- " + children.name + "</span><span class='dyclearnlogo nolearn'><i class='uk-icon-circle-o'></i></span></a></li>";
						} else {
							$nodeStr += "<li><a href='player.html?courseId=" + children.courseId + "&videoId=" + children.videoId + "&courseCatalogId=" + children.courseCatalogId + "'><span class='dycpltext'>" + 0 + (num + 1) + "- " + children.name + "</span><span class='dyclearnlogo nolearn'><i class='uk-icon-circle-o'></i></span></a></li>";
						}

					});

					if(value.courseCatalogId == ccId) {
						$htmlStr += "<ul><h4 class='active'><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='#this'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					} else {
						$htmlStr += "<ul><h4><span class='dycz'>第 <span>" + (index + 1) + "</span>章</span><a href='player.html?courseId=" + value.courseId + "&videoId=" + value.videoId + "&courseCatalogId=" + value.courseCatalogId + "'>" + value.name + "</a></h4>" + $nodeStr + "</ul>";
					}

				}

			});

			$jplayerlist.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
	return arr;
}

//录制播放player-视频播放头部
$.playerHead = function(id) {
	var $jplayerHead = $("#jplayerhead .dycgo-left"),
		$jycptitleName = $("#jplayertitle span"),
		$jycpondeName = $("#jplayertitle em");
	var sold = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "CourseCatalog.ashx?action=getCourseCatalogById",
		dataType: "json",
		data: {
			"courseCatalogId": id
		},
		async: false,
		success: function(result) {

			$jplayerHead.html("<a href='javascript:history.back();'><i class='uk-icon-arrow-left'></i></a>");
			$jycptitleName.html(result[0].name);
			sold = result[0].allowListen;
		},
		error: function(err) {
			console.log(err);
		}
	});
	return sold;
}
//名师详情-广告直播间
$.teacherLeftAdv = function() {
	var datee = new Date();
	var week = datee.getDay() - 1;
	var xinqi = new Array();
	xinqi[0] = '周一';
	xinqi[1] = '周二';
	xinqi[2] = '周三';
	xinqi[3] = '周四';
	xinqi[4] = '周五';

	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		data: {},
		async: false,
		success: function(result) {
			result.forEach(function(value, index) {
				if(index < 5) {
					if(value.weekDay == xinqi[week]) { //当天才可以点击
						$('#jteacherLeftAdv').attr('href', 'bmliveroom.html?channelId=' + value.channelId + '&channelProgramId=' + value.channelProgramId);

						$('#jcostLivePlay a').attr('href', 'ycedu/bmliveroom.html?channelId=' + value.channelId + '&channelProgramId=' + value.channelProgramId);
						$('#jteacherLeftAdv').attr('target', '_blank');
						$('#jcostLivePlay a').attr('target', '_blank');
					}

				}

			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师详情
$.teacherDetail = function(id) {
	var $jteacherDetail = $("#jteacherdetail"),
		$jteacherPerson = $("#jteacherperson"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherDetailById",
		dataType: "json",
		data: {
			"teacherId": id
		},
		success: function(result) {
			$htmlStr = "<div class='dycdetailes-image'><img src='" + ROUTEFILE + result[0].iconPath + "'></div><div class='dycdetailes-box'><div class='dycdetailes-name'>" + result[0].name + "</div><a class='dycdetailes-jobs' href='guestindex.html?teacherId=" + result[0].teacherId + "'>" + result[0].teacherTypeName + "</a><div class='dycdetailes-brief'><div class='ycpanel-para'><span class='dycpoint'>教龄：</span>" + result[0].ofSchoolAge + "</div><div class='ycpanel-para'><p>" + result[0].introduce + "</p></div></div></div></div>";
			$jteacherDetail.html($htmlStr);
			$jteacherPerson.html(result[0].encyclopedia);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//名师详情-相关老师
$.teacherSwiper = function(id) {
	var $jteacherSwiper = $("#jteacherswiper"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getOtherTeacher",
		dataType: "json",
		data: {
			"teacherId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide'><a class='ycpanel-box' href='guestindex.html?teacherId=" + value.teacherId + "'><div class='ycpanel-image'><img src='" + ROUTEFILE + value.iconPath + "' /></div><div class='ycpanel-title'>" + value.name + "</div></a></div>";
			});
			$jteacherSwiper.html($htmlStr);
			var msswiper = new Swiper('.dycot-container', {
				autoplay: 3000,
				loop: true,
				spaceBetween: 30,
				slidesPerView: 2,
				effect: 'slide',
				direction: 'vertical',
			});

			/*$('#swiper-button-prev').click(function() {
				msswiper.slidePrev();
			});
			$('#swiper-button-next').click(function() {
				msswiper.slideNext();
			});*/

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//新闻详情-播米名师
$.newsTeacher = function(id) {
	var $jnewsTeacher = $("#jnewsteacher"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTopTeacherOneCourse",
		dataType: "json",
		data: {
			"newsId": id
		},
		success: function(result) {
			result.forEach(function(value, index) {
				$htmlStr += "<div class='swiper-slide'><a class='dycms-slide' href='guestindex.html?teacherId=" + value.teacherId + "'><p class='yctitle'>" + value.courseName + "</p><div class='dyccontent clearfix'><div class='ycimage'><img src='" + ROUTEFILE + value.iconPath + "' alt='名师' /><p>" + value.teacherName + "</p></div><p class='ycbrief'>" + value.note + "</p></div></a></div>"
			})

			$jnewsTeacher.html($htmlStr);
			newsdetailSwiper();

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//搜索页面-课程搜索
$.searchCourse = function(id, pageIndex) {
	var $jsearchCourse = $("#jsearchcourse"),
		$jscoursePage = $("#jscoursepage"),
		$htmlPage = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getCourseByName",
		dataType: "json",
		data: {
			"name": id,
			"pageIndex": pageIndex,
			"pageSize": 9
		},
		success: function(result) {
			if(result.totalPageCount) {
				result.rows.forEach(function(value, index) {
					var $htmlImg = "",
						$htmlCon = "";
					$htmlImg += "<a href='coursedetail.html?courseId=" + value.courseId + "' class='dycsearchlist-image' target='_blank'><img src=" + ROUTEFILE + value.iconPath + " alt='课程列表' /></a>";
					$htmlCon += "<a class='dycsearchlist-title' href='coursedetail.html?courseId=" + value.courseId + "'>" + value.name + "</a><p class='dycsearchlist-brief'>" + value.note + "</p><span class='dyccurrentPrice'>￥" + value.preferentialPrice + "</span> <span class='dycoldPrice'>￥" + value.price + "</span>";
					$htmlStr += "<div class='dycsearchlist-wrap'><div class='span3'>" + $htmlImg + "</div><div class='span9'><div class='dycsearchlist-box'>" + $htmlCon + "<a class='dycdetail' href='coursedetail.html?courseId=" + value.courseId + "' target='_blank'>查看详情</a>" +
						"<p>嘉宾：" + value.teacherName + "</p></div></div></div>"
				});

				$jsearchCourse.html("<div class='dycsearchlist clearfix'>" + $htmlStr + "</div>");

				for(var i = 0; i < result.totalPageCount; i++) {
					$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
				}
				$jscoursePage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
				setTimeout(function() {
					var $jsearchPage = $('#jscoursepage li a');

					if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
						$jsearchPage.eq(0).css('display', 'none');
						$jsearchPage.eq(result.totalPageCount + 1).css('display', 'none');
					} else if(pageIndex == '1') {
						$jsearchPage.eq(0).css('display', 'none');
					} else if(pageIndex == (result.totalPageCount)) {
						$jsearchPage.eq(result.totalPageCount + 1).css('display', 'none');
					}
					$jsearchPage.eq(pageIndex).parent().addClass('active');
					$jsearchPage.click(function() {
						var num = $jsearchPage.index(this);
						if(num && (num < $jsearchPage.length - 1)) {
							pageIndex = num;
						} else if((num == "0") && (pageIndex > 1)) {
							pageIndex -= 1;
						} else if((num == ($jsearchPage.length - 1)) && (pageIndex < $jsearchPage.length - 2)) {
							pageIndex += 1;
						}
						$.searchCourse(id, pageIndex);
						$.scrollTo(0, 0);
					});
				}, 2);
			} else {
				$jsearchCourse.html("<div style='height:600px;font-size:30px;line-height:100px;text-align:center'>没有相关结果，请换个关键字试试~</div>");
				$jscoursePage.html("");
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//搜索页面-老师搜索
$.searchTeacher = function(id, pageIndex) {
	var $jsearchTeacher = $("#jsearchteacher"),
		$jsteacherPage = $("#jsteacherpage"),
		$htmlPage = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherByName",
		dataType: "json",
		data: {
			"name": id,
			"pageIndex": pageIndex,
			"pageSize": 9
		},
		success: function(result) {
			if(result.totalPageCount) {

				result.rows.forEach(function(value, index) {

					var $htmlImg = "",
						$htmlHref = "",
						$htmlCon = "";
					if(value.isstack) { //叠报老师，跳转到叠报页面
						$htmlImg = "<a href='guestindex.html?teacherId=" + value.teacherId + "' class='dycst-images span9' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' alt='课程列表' /></a>";
						$htmlHref = "<a class='dycstlist-name' href='guestindex.html?teacherId=" + value.teacherId + "'  target='_blank'>" + value.name + "</a>";
					} else {
						$htmlImg = "<a href='guestindex.html?teacherId=" + value.teacherId + "' class='dycst-images span9' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' alt='课程列表' /></a>";
						$htmlHref = "<a class='dycstlist-name' href='guestindex.html?teacherId=" + value.teacherId + "'  target='_blank'>" + value.name + "</a>";
					}

					$htmlCon = $htmlHref + "<p class='dycstlist-interest'>" + value.specialty + "</p><p class='dycstlist-brief'>" + value.note + "</p><div class='dycstcourse'><p class='dycstcourse-list'>课程：<a class='dycstcourse-name' href='coursedetail.html?courseId=" + value.courseId + "' target='_blank'>" + value.courseName + "</a></p><p class='dycstcourse-list'>直播：<a class='dycstcourse-name' href='liveplay.html?channelId=" + value.channelId + "'>" + value.liveProgramName + "</a></p></div>";

					$htmlStr += "<div class='dycst-wrap clearfix'><div class='span3'>" + $htmlImg + "</div><div class='span9'><div class='dycstlist-box'>" + $htmlCon + "</div></div></div>"
				});

				$jsearchTeacher.html("<div class='dycsearch-teacher'>" + $htmlStr + "</div>");

				for(var i = 0; i < result.totalPageCount; i++) {
					$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>";
				}
				$jsteacherPage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");

				setTimeout(function() {
					var $jsteacherPage = $('#jsteacherpage li a');

					if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
						$jsteacherPage.eq(0).css('display', 'none');
						$jsteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					} else if(pageIndex == '1') {
						$jsteacherPage.eq(0).css('display', 'none');
					} else if(pageIndex == (result.totalPageCount)) {
						$jsteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					}
					$jsteacherPage.eq(pageIndex).parent().addClass('active');
					$jsteacherPage.click(function() {
						var num = $jsteacherPage.index(this);
						if(num && (num < $jsteacherPage.length - 1)) {
							pageIndex = num;
						} else if((num == "0") && (pageIndex > 1)) {
							pageIndex -= 1;
						} else if((num == ($jsteacherPage.length - 1)) && (pageIndex < $jsteacherPage.length - 2)) {
							pageIndex += 1;
						}
						$.searchTeacher(id, pageIndex);
						$.scrollTo(0, 0);
					});
				}, 2);
			} else {
				$jsearchTeacher.html("<div style='height:600px;font-size:30px;line-height:100px;text-align:center'>没有相关结果，请换个关键字试试~</div>");
				$jsteacherPage.html("");
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//名师详情-相关课程
$.pcourseList = function(id) {
	var $jpcourselist = $("#jpcourselist"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getTeacherRelativeCourse",
		dataType: "json",
		data: {
			"teacherId": id
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				$htmlStr += "<li class='ycpanel-box'><a href='coursedetail.html?courseId=" + value.courseId + "'><div class='ycpanel-image'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='ycpanel-title'>" + value.name + "</p></a><p class='ycpanel-price'>￥" + value.preferentialPrice + "</p><p class='ycpanel-para'>" + value.note + "</p></li>";
			});
			$jpcourselist.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
}
//首页-首页直播
$.newsLive = function(id) {
	var $jindexleft = $("#jindexleft"),
		$jindexmiddle = $("#jindexmiddle"),
		$jindexright = $("#jindexright"),
		$htmlLeftStr = "",
		$htmlRightStr = "",
		$htmlMiddleStr = "",
		$htmlStr = "";
	var channelId, channelProgramId;
	var datee = new Date();
	var week = datee.getDay() - 1;
	var xinqi = new Array();
	xinqi[0] = '周一';
	xinqi[1] = '周二';
	xinqi[2] = '周三';
	xinqi[3] = '周四';
	xinqi[4] = '周五';
	$.ajax({
		type: "GET",
		url: ROUTE + "ChannelProgram.ashx?action=getCurrLiveChannelProgram",
		dataType: "json",
		success: function(result) {
			result.forEach(function(value, index) {
				if(value.weekDay == xinqi[week]) {
					channelId = value.channelId;
					channelProgramId = value.channelProgramId;
				}
			});
			$.ajax({
				type: "GET",
				url: ROUTE + "Banner.ashx?action=getBanner&bannerType=FamousTeacher",
				dataType: "json",
				success: function(result) {
					result.forEach(function(value, index) {
						if(index < '2') {
							$htmlLeftStr += "<div class='dyclink-box'><a href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' alt='投资' /></a></div>";
						} else if(index == '2') {
							$htmlMiddleStr = "<div class='dyclink-box'><a href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' alt='投资' /></a></div>";
						} else if(index < '5') {
							$htmlRightStr += "<div class='dyclink-box'><a href='ycedu/bmliveroom.html?channelId=" + channelId + "&channelProgramId=" + channelProgramId + "' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' alt='投资' /></a></div>";
						}
					});
					$jindexleft.html($htmlLeftStr);
					$jindexmiddle.html($htmlMiddleStr);
					$jindexright.html($htmlRightStr);
				},
				error: function(err) {
					console.log(err);
				}
			});

		},
		error: function(err) {
			console.log(err);
		}
	});

};

//首页-专家观点
$.NewsTop = function(id) {
	var $jNewsTop = $("#jNewsTop"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "News.ashx?action=getFirstExpert",
		dataType: "json",
		success: function(result) {
			/*$htmlStr = "<a href='ycedu/newsdetail.html?newsId=" + result + "' target='_blank'></a>";
			$jNewsTop.html($htmlStr);*/
			$htmlStr = "<a href='#this'></a>";
			$jNewsTop.html($htmlStr);
			$("#jNewsTop").click(function() {
				if(($mid == undefined) || ($mid == null) || ($mid == "")) {
					layer.confirm('登录后才可查看观点，是否立即前往登录', {
						btn: ['是', '否']
					}, function(index, layero) {
						window.location.href = '../login.html';
					});
				} else {
					$(this).find('a').attr('href', 'ycedu/newsdetail.html?newsId=' + result + '&charge=1');
					$(this).find('a').attr('target', '_blank');
				}
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//首页-投资理财与考试Tab
$.tzksSwiper = function() {
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
			return '<li class="' + className + '" data-id="' + (index + 1) + '">' + name + '</li>';
		}
	});
}
//首页-理财投资
$.jtzcourse = function(id) {
	var $jtzCourse = $("#jtzcourse"),
		$jtzCoursebox = "",
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Course.ashx?action=getHottestCourse",
		dataType: "json",
		data: {

		},
		success: function(result) {
			result.forEach(function(value, index) {
				$jtzCoursebox += "<div class='span4 col-xm-6 col-xs-12'><div class='dyctzks-box'><a href='ycedu/coursedetail.html?courseId=" + value.courseId + "'><img src='" + ROUTEFILE + value.iconPath + "' alt='投资考试' /></a></div></div>";
			});
			$htmlStr = "<div class='swiper-slide'><div class='ycwrap clearfix'><div class='span4 col-xm-6 col-xs-12'><div class='dyctzks-box'><a href='#'><img src='ycedu/images/tzlc01.jpg' alt='投资考试' /></a></div></div>" + $jtzCoursebox + "</div></div>";
			$jtzCourse.html($htmlStr);
			//tzksSwiper.updatse();
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//会员充值规则-个人信息
$.jruleMember = function(id) {
	var $jruleMember = $('#jrulemember'),
		$htmlStr = "";

	$.ajax({
		type: "get",
		url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {

			if(result[0].iconPath == '') {
				$htmlStr += "<div class='dycimg span5'><img src='" + ROUTEROOT + "ycedu/images/mbheadIcon.png' /></div><div class='span7'><p class='dycmembername'>" + result[0].nickName + "</p><div class='dycmembergrade'>" + result[0].memberlevel + "</div></div>";
			} else {
				$htmlStr += "<div class='dycimg span5'><img src='" + ROUTEFILE + result[0].iconPath + "' /></div><div class='span7'><p class='dycmembername'>" + result[0].nickName + "</p><div class='dycmembergrade'>" + result[0].memberlevel + "</div></div>";
			}

			$jruleMember.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-个人信息
$.jPersonal = function(id) {
	var $jPersonal = $('#jpersonal'),
		$jRest = $('#jrest'),
		$htmlStr = "";

	$.ajax({
		type: "get",
		url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {
			if(result[0].iconPath == '') {
				$htmlStr += "<div class='span5'><div class='dycrecharge-person-img'><img src='" + ROUTEROOT + "ycedu/images/mbheadIcon.png' /></div></div><div class='span7'  style='padding: 10px 5px;box-sizing: border-box;' >" + result[0].nickName + "</div>";
			} else {
				$htmlStr += "<div class='span5'><div class='dycrecharge-person-img'><img src='" + ROUTEFILE + result[0].iconPath + "' /></div></div><div class='span7'  style='padding: 10px 5px;box-sizing: border-box;' >" + result[0].nickName + "</div>";
			}

			$jPersonal.html($htmlStr);
			$jRest.html(result[0].sowingCoin);
			localStorage.setItem('lever', result[0].level);

			$('#jgrade').html(result[0].memberlevel);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-tab
$.jmemberRecordselect = function() {

	//会员充值-切换选择
	selectt($('#jselect p'), $('.dycrecharge-right-box'));
	selectt($('#jrecordselect span'), $('.dycrecharge-crecord-box'));
	selectt($('#jrechargeselect span'), $('.recharge-style-box'));

	//会员等级、充值金额选择
	graderChange($('#jmoneynums .dycrecharge-grade'));

	//选择充值金额
	$('#jmoneynums .dycrecharge-grade').click(function() {
		var textnum = $('#jtext').val();
		$("#jtext").off('blur');
		$("#jtext").on('blur', function() {
			textnum = parseFloat($(this).val());
			if(textnum == 0) {
				alert('请输入大于0的整数或两位小数点的有效数字')
			} else {
				reg = /^[0-9]*\.{0,1}[0-9]{0,2}$/;
				if(reg.test(textnum)) {
					//活动分支
					if(textnum >= 2000) {
						$('#jcorrect').html('请确认：充值<span id="jcorrectrmb">' + textnum + '</span>元，您将获得<span class="dyccorectnums">' + textnum + ' 播米币</span>,额外获得200播米币');
					} else {
						$('#jcorrect').html('请确认：充值<span id="jcorrectrmb">' + textnum + '</span>元，您将获得<span class="dyccorectnums">' + textnum + ' 播米币</span>');
					}
				} else {
					$(this).val('');
					alert('请输入整数或两位小数点的有效数字');

				}
			}
		});

		$('.dycrecharge-own .dycrecharge-bominum').attr('data-id', textnum);
		var num = $(this).attr('data-id');

		$('#jcorrect').html('请确认：充值<span id="jcorrectrmb">' + num + '</span>元，您将获得<span class="dyccorectnums">' + num + ' 播米币</span>');

	});
}

function selectt(obj, ocon) {
	obj.click(function() {
		obj.removeClass('active');
		$(this).addClass('active');
		var num = $(this).attr('data-id');
		ocon.css('display', 'none');
		ocon.eq(num).css('display', 'block')
	});
}

function graderChange(obj) { //会员等级、充值金额选择
	obj.click(function() {
		obj.removeClass('active');
		$(this).addClass('active');
		obj.find('i').removeClass('uk-icon-check-circle').addClass('uk-icon-circle-thin');
		$(this).find('i').removeClass('uk-icon-circle-thin').addClass('uk-icon-check-circle');
	});
}

//获取会员等级
jmemberNums = function(id) {
	var jmembernums = $('#jmembernums'),
		jmembercorrect = $('#jmembercorrect'),
		htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "MemberGrade.ashx?action=getMemberGrade",
		dataType: "json",
		success: function(result) {
			var grade = localStorage.getItem('lever') - 1;
			result.forEach(function(value, index) { //grade[1]等级
				if(index > 5) {
					htmlStr += "";
				} else {
					if(index < grade) { //如果已经是这个等级以上，则不能点击
						htmlStr += "<div class='span4'><div class='dycrecharge-grade dycrecharge-member clearfix disabled' data-id=" + value.amount + " data-gift=" + value.note + " data-name=" + value.name + " data-membergrade=" + value.memberGradeId + "><div class='span2'><i class='uk-icon-circle-thin'></i></div><div class='span10'>" + value.name + "</div></div></div>";
					} else {
						if(index == grade) {
							htmlStr += "<div class='span4'><div class='dycrecharge-grade dycrecharge-member active clearfix' data-id=" + value.amount + " data-gift=" + value.note + " data-name=" + value.name + " data-membergrade=" + value.memberGradeId + "><div class='span2'><i class='uk-icon-check-circle'></i></div><div class='span10'>" + value.name + "</div></div></div>";
							jmembercorrect.html("备注：<span style='margin-right:5%;'>当月课程购买达会员等级即可享受相应服务</span>" + value.note + "");
						} else if(index < 6) {
							htmlStr += "<div class='span4'><div class='dycrecharge-grade dycrecharge-member clearfix' data-id=" + value.amount + " data-gift=" + value.note + " data-name=" + value.name + " data-membergrade=" + value.memberGradeId + "><div class='span2'><i class='uk-icon-circle-thin'></i></div><div class='span10'>" + value.name + "</div></div></div>";
						}
					}
				}
			});
			jmembernums.html(htmlStr);
			graderChange($('#jmembernums .dycrecharge-grade')); //会员等级选择
			$('#jmembernums .dycrecharge-grade').click(function() {
				var num = $(this).attr('data-gift');
				jmembercorrect.html("备注：<span style='margin-right:5%;'>当月课程购买达会员等级即可享受相应服务</span>" + num + "");
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}
//充值-时间查询
function timeselect(obj) {
	obj.ECalendar({
		type: "time", //模式，time: 带时间选择; date: 不带时间选择;
		stamp: false, //是否转成时间戳，默认true;
		offset: [0, 2], //弹框手动偏移量;
		format: "yyyy-mm-dd", //时间格式 默认 yyyy-mm-dd hh:ii;
		//skin: 3, //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
		step: 10, //选择时间分钟的精确度;
		callback: function(v, e) {} //回调函数
	});
}

//会员充值-交易记录查询
$.rechargeRecord = function() {
	var numfrom = new Array();
	var numto = new Array();
	var d = new Date();
	var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

	$('#recharge_date_from').val(str);
	$('#recharge_date_to').val(str);
	$('#cost_date_from').val(str);
	$('#cost_date_to').val(str);

	timeselect($('#cost_date_from'));
	timeselect($('#cost_date_to'));
	timeselect($('#recharge_date_from'));
	timeselect($('#recharge_date_to'));

	$('#jrechargeresult').click(function() {
		numfrom = $('#recharge_date_from').val().split("-");
		numto = $('#recharge_date_to').val().split("-");
		var numFrom = "",
			numTo = "";

		for(var i = 0; i < numfrom.length; i++) {

			if(numfrom[i] < 10) {
				numfrom[i] = '0' + numfrom[i];
			}
			if(numto[i] < 10) {
				numto[i] = '0' + numto[i];
			}
			numFrom += String(numfrom[i]);
			numTo += String(numto[i]);
		}
		var timefrom = numfrom[0] + "-" + numfrom[1] + "-" + numfrom[2];
		var timeto = numto[0] + "-" + numto[1] + "-" + numto[2];

		var num = parseInt(numTo) - parseInt(numFrom);
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			if(num >= 0) {
				jrechargeList(timefrom, timeto, 1); //充值记录
			} else {
				alert('请选择正确的时间');
			}
		} else {
			alert('您还未登录~');
		}

	});

	$('#jcostresult').click(function() {
		numfrom = $('#cost_date_from').val().split("-");
		numto = $('#cost_date_to').val().split("-");
		var numFrom = "",
			numTo = "";

		for(var i = 0; i < numfrom.length; i++) {
			if(numfrom[i] < 10) {
				numfrom[i] = '0' + numfrom[i];
			}
			if(numto[i] < 10) {
				numto[i] = '0' + numto[i];
			}
			numFrom += String(numfrom[i]);
			numTo += String(numto[i]);
		}

		var timefrom = numfrom[0] + "-" + numfrom[1] + "-" + numfrom[2];
		var timeto = numto[0] + "-" + numto[1] + "-" + numto[2];

		var num = parseInt(numTo) - parseInt(numFrom);
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			if(num >= 0) {
				jcostList(timefrom, timeto, 1); //消费记录
			} else {
				alert('请选择正确的时间');
			}
		} else {
			alert('您还未登录~');
		}

	});
}

//会员充值-充值播米币
recordBomi = function(paytype, obj, id) {
	if(paytype == 0) {
		var newWindow = window.open('about:blank');
	}
	$.ajax({
		type: "post",
		url: ROUTE + "MemberRecharge.ashx?action=memberRecharge",
		data: {
			"memberId": $mid,
			"rechargeAmount": obj,
			"payTypeId": paytype,
			"rechargeList": id
		},
		success: function(res) {
			if(paytype == 0) {
				newWindow.location.href = "turnpaybomi.html?rechargeAmount=" + obj + '&rechargeList=' + id + '&memberId=' + $mid;
				setTimeout(function() {
					layer.confirm("是否支付完成", {
						btn: ['重新选择支付方式', '支付完成'],
					}, function() {
						layer.closeAll('dialog')
						console.log("心选");
					}, function() { //二次校验
						$.ajax({
							type: "POST",
							url: ROUTE + "MemberRecharge.ashx?action=checkPaySuccess",
							dataType: "json",
							data: {
								"memberId": $mid,
								"rechargeList": id
							},
							success: function(res) {
								if(res == '812') {
									$(".dyc-success-bg").show().delay(3000).fadeOut();
									console.log("ok");
									if($(this).getUrlParam("from") == "yhlive"){
										parent.reloadWin();
									}
								}
								if(res == '814') {
									console.log("未完成")
								} else {
									return false;
								}
							}
						});
					});
				}, 3000);
			} else if(paytype == 1) {
				setTimeout(function() {
					var json = eval('(' + res + ')')
					layer.open({
						type: 1,
						title: '微信支付',
						area: ['420px', '420px'], //宽高
						content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + json.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + obj + "</span></p>",
						success: function() {

							var xunhuan = setInterval(function() {
								$.ajax({
									type: "POST",
									url: ROUTE + "MemberRecharge.ashx?action=checkPaySuccess",
									dataType: "json",
									data: {
										"memberId": $mid,
										"rechargeList": id
									},
									success: function(res) {
										if(res == '812') {
											clearInterval(xunhuan);
											layer.closeAll();
											$(".dyc-success-bg").show().delay(3000).fadeOut();
											if($(this).getUrlParam("from") == "yhlive"){
												parent.reloadWin();
											}
										}
										if(res == '814') {
											setTimeout(function() {
												clearInterval(xunhuan);
											}, 60000);
											console.log("未完成01")
											
										} else {
											return false;
										}
									}
								});
							}, 3000)
						},
						cancel: function() {
							//右上角关闭回调
							// clearInterval(xunhuan);
						}
					});
				}, 500);
			} else {
				alert('使用播米币充值');
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

var imgVCKey = "";

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

//会员充值-充值会员等级
RecordGrade = function(paytype, id, obj, gradename, type, membergrade) {
	if(paytype == '2') { //播米币支付
		layer.open({
			type: 1,
			title: '播米币支付',
			area: ['360px', '360px'], //宽高
			content: "<div class='dycweixin-img' style='text-align:center;width:350px;height:200px;margin:50px auto 0;color:#606060;'><p style='text-align:center'>应付播米币：<span style='color: #df5e3f;font-size: 20px;'>￥" + obj + "</span></p>" +
				"<div style='margin-top:30px'><input id='jimage' name='name' type='text' placeholder='输入图片验证码' /><a  class='jchange'><img class='imageVC' style='height:100%;' src='../ycedu/images/vcode.png' /></a></div>" +
				"<div style='margin-top:30px'><input id='jvalue' name='name' type='text' placeholder='输入验证码确认支付' /><a id='jvalid'>获取短信验证码</a></div></div>",
			success: function() {
				getImgVC();
				$(".imageVC").on("click", function() {
					getImgVC();
				})

				$('#jvalid').click(function() { //点击获取验证码
					if($("#jimage").val() == null || $("#jimage").val() == "") {
						layer.msg('请先输入图形验证码');
					}

					if($('#jvalid').text() == '获取短信验证码') {
						$.ajax({
							type: "post",
							url: ROUTE + "Member.ashx?action=getMemberMobById",
							data: {
								"memberId": $mid
							},
							dataType: "json",
							success: function(result) {
								$.ajax({
									type: "post",
									url: ROUTE + "Member.ashx?action=getConfirmCoinValidCode",
									data: {
										"name": result[0].mobile,
										codeKey: imgVCKey,
										codeValue: $("#jimage").val()

									},
									dataType: "json",
									success: function(result) {
										if(result == 810 || result == "810") {
											layer.msg("图形验证码错误！");
											return false;
										}

										if(result == 815 || result == "815") {
											layer.msg("请勿重复请求短信验证码！");
											return false;
										}
										changeVCShow($('#jvalid')); //获取验证码
									},
									error: function(err) {
										console.log(err);
									}
								});

							},
							error: function(err) {
								console.log(err);
							}
						});
					}
				});

			},
			btn: ['确认支付', '取消'],
			yes: function(index, layero) { //确认支付

				$.ajax({
					type: "post",
					url: ROUTE + "MemberGrade.ashx?action=purchaseMemberGrade",
					data: {
						"memberId": $mid,
						"memberGradeId": membergrade,
						"purchaseAmount": obj,
						"payTypeId": paytype, //支付方式：0-支付宝，1-微信，2-播米币
						"purchaseList": id, //订单号
						"validateCode": $('#jvalue').val() //校验验证码是否正确
					},
					success: function(result) {
						if(result == '812') {
							layer.closeAll();
							layer.msg('支付成功,恭喜升级为' + gradename);
							localStorage.setItem("mlever", gradename);
							$mMoney = localStorage.setItem("mMoney", $('#jrest').html() - obj);
							console.log($mMoney)
							$('#jgrade').html(gradename);
							$('#jrest').html($('#jrest').html() - obj);
							if(type == '1') {
								setTimeout(function() {
									window.close();
								}, 3000);
							}

						} else if(result == '814') {
							layer.msg("支付失败，请重新支付");
						} else if(result == '819') {
							layer.closeAll();
							layer.msg("播米币余额不足，请换一种支付方式或充值播米币~");
						} else if(result == '805') {
							layer.msg("验证码输入错误，请重新输入");
						} else if(result == '818') {
							layer.closeAll();
							layer.msg('你已购买,无需在购买');
						} else {
							return false;
						}
					},
					error: function(err) {
						console.log(err);
					}
				});

			}
		});

	} else { //支付宝、微信支付

		if(paytype == 0) {
			var newWindow = window.open('about:blank');
		}
		$.ajax({
			type: "post",
			url: ROUTE + "MemberGrade.ashx?action=purchaseMemberGrade",
			data: {
				"memberId": $mid,
				"memberGradeId": membergrade,
				"purchaseAmount": obj,
				"payTypeId": paytype, //支付方式：0-支付宝，1-微信，2-播米币
				"purchaseList": id, //订单号
			},
			success: function(res) {
				if(paytype == 0) {
					newWindow.location.href = "turnpaymember.html?rechargeAmount=" + obj + '&rechargeList=' + id + '&memberId=' + $mid + "&memberGradeId=" + membergrade;
					setTimeout(function() {
						layer.confirm("是否支付完成", {
							btn: ['重新选择支付方式', '支付完成'],
						}, function() {
							layer.closeAll('dialog')
							console.log("心选");
						}, function() { //二次校验
							$.ajax({
								type: "POST",
								url: ROUTE + "MemberRecharge.ashx?action=checkPaySuccess",
								dataType: "json",
								data: {
									"memberId": $mid,
									"rechargeList": id
								},
								success: function(res) {
									if(res == '812') {
										layer.closeAll();
										layer.msg('支付成功');
										localStorage.setItem("mlever", gradename);
										$('#jgrade').html(gradename);
									}
									if(res == '814') {
										layer.msg('支付失败，请重新支付');

									} else {
										return false;
									}
								}
							});
						});
					}, 3000);
				} else if(paytype == '1') {
					setTimeout(function() {
						var json = eval('(' + res + ')')
						layer.open({
							type: 1,
							title: '微信支付',
							area: ['420px', '420px'], //宽高
							content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + json.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + obj + "</span></p>",
							success: function() {

								var xunhuan = setInterval(function() {
									$.ajax({
										type: "POST",
										url: ROUTE + "MemberGrade.ashx?action=checkPaySuccess",
										dataType: "json",
										data: {
											"memberId": $mid,
											"purchaseList": id
										},
										success: function(res) {
											if(res == '812') {
												clearInterval(xunhuan);
												layer.closeAll();
												layer.msg('支付成功');
												localStorage.setItem("mlever", gradename);
												$('#jgrade').html(gradename);
												
												if($(this).getUrlParam("from") == "yhlive"){
													parent.reloadWin();
												}
											}
											if(res == '814') {

												setTimeout(function() {
													clearInterval(xunhuan);
												}, 60000);
												console.log("未完成");
												
											} else {
												return false;
											}
										}
									});
								}, 3000)
							},
							cancel: function() {
								//右上角关闭回调
								// clearInterval(xunhuan);
							}
						});
					}, 500);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});

	}
}

//会员充值-充值
$.bomiRecharge = function(id, type) {
	if(type == 1) {
		console.log(type);
		$('#jrechargeselect span').removeClass('active');
		$($('#jrechargeselect span')[type]).addClass('active');
		$('.recharge-style-box').css("display", "none");
		$($('.recharge-style-box')[type]).css("display", "block");

	}
	jmemberNums(); //会员等级
	//会员充值-充值播米币
	var paytype = 0,
		memberpaytype = 0;
	$('#jpayselect span').click(function() {
		$('#jpayselect span').removeClass('active');
		$(this).addClass('active');
		paytype = $(this).attr('data-id');
	});
	$('#jmemberpayselect span').click(function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		memberpaytype = $(this).attr('data-id');
	});

	//会员充值-点击充值播米币
	$('#jrecord').click(function() {
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			var date = new Date();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var seconds = date.getSeconds();
			var randnum = "";
			for(var i = 0; i < 5; i++) {
				randnum += Math.floor(Math.random() * 10);
			}

			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			if(seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}
			var currentdate = String(date.getFullYear()) + String(month) + String(strDate) + String(date.getHours()) + String(date.getMinutes()) + String(seconds) + String(randnum);

			if($('#jcorrectrmb').html() == '' || $('#jcorrectrmb').html() == 0) {
				alert('请选择充值的金额~');
			} else {

				recordBomi(paytype, $('#jcorrectrmb').html(), currentdate);
			}
		} else {
			layer.confirm('您还未登录，是否立即前往登录或注册', {
				btn: ['登录', '注册', '取消']
			}, function(index, layero) {
				layer.msg('正在为您跳转到登录页面...');
				setTimeout(function() {
					window.location.href = '../login.html';
				}, 2000);
			}, function(index) {
				layer.msg('正在为您跳转到注册页面...');
				setTimeout(function() {
					window.location.href = '../login.html?login=2';
				}, 2000);
			});
		}
	});

	//会员充值-点击充值会员
	$('#jmemberrecord').click(function() {
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			var date = new Date();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var seconds = date.getSeconds();
			var randnum = "";
			for(var i = 0; i < 5; i++) {
				randnum += Math.floor(Math.random() * 10);
			}

			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			if(seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}

			var currentdate = String(date.getFullYear()) + String(month) + String(strDate) + String(date.getHours()) + String(date.getMinutes()) + String(seconds) + String(randnum);
			console.log()
			if($('#jmembernums .active').length == 0) {
				layer.msg('您已是最高等级，无需购买会员！');
			} else {
				RecordGrade(memberpaytype, currentdate, $('#jmembernums .active').attr('data-id'), $('#jmembernums .active').attr('data-name'), id, $('#jmembernums .active').attr('data-membergrade'));
			}

		} else {
			layer.confirm('您还未登录，是否立即前往登录或注册', {
				btn: ['登录', '注册', '取消']
			}, function(index, layero) {
				layer.msg('正在为您跳转到登录页面...');
				setTimeout(function() {
					window.location.href = '../login.html';
				}, 2000);
			}, function(index) {
				layer.msg('正在为您跳转到注册页面...');
				setTimeout(function() {
					window.location.href = '../login.html?login=2';
				}, 2000);
			});
		}
	});

}

//会员充值-消费记录
jcostList = function(timefrom, timeto, pageIndex) {
	var $jcostList = $('#jcostlist'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "MemberGrade.ashx?action=getMemberPurchase",
		dataType: "json",
		data: {
			"memberId": $mid,
			"pageIndex": pageIndex,
			"pageSize": 15,
			"beginDate": timefrom,
			"endDate": timeto
		},
		success: function(result) {
			if(result.totalPageCount != 0) {
				result.rows.forEach(function(value, index) {
					if(value.moneys == '') {
						value.moneys = '0';
					} else if(value.coin == '') {
						value.coin = '0';
					}
					$htmlStr += "<li class='clearfix'><div class='span3'>" + value.payTime + "</div><div class='span3'>" + value.moneys + "</div><div class='span3'>" + value.coin + "</div><div class='span3'>" + value.used + "</div></li>";
				});
			} else {
				$htmlStr = "没有相关记录，换个时间段试试呗~";
			}
			$jcostList.html($htmlStr);

			//页码
			pages(pageIndex, result.totalPageCount, $('#jcostlistpage'));
			var $jsubPage = $('#jcostlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jcostList(timefrom, timeto, pageIndex);

			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//会员充值-充值记录
jrechargeList = function(timefrom, timeto, pageIndex) {
	var $jrechargeList = $('#jrechargelist'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "MemberRecharge.ashx?action=getMemberRecharge",
		dataType: "json",
		data: {
			"memberId": $mid,
			"pageIndex": pageIndex,
			"pageSize": 15,
			"beginDate": timefrom,
			"endDate": timeto
		},
		success: function(result) {
			if(result.totalPageCount != 0) {
				result.rows.forEach(function(value, index) {
					$htmlStr += "<li class='clearfix'><div class='span3'>" + value.rechargeDate + "</div><div class='span3'>" + value.rechargeList + "</div><div class='span3'>" + value.rechargeAmount + "</div><div class='span3'>" + value.payTypeName + "</div></li>"
				});
			} else {
				$htmlStr = "没有相关记录，换个时间段试试呗~";
			}
			$jrechargeList.html($htmlStr);
			//页码
			pages(pageIndex, result.totalPageCount, $('#jrechargelistpage'));
			var $jsubPage = $('#jrechargelistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jrechargeList(timefrom, timeto, pageIndex);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//题库
$.jSubject = function(id) {
	var $jSubject = $("#jsubject"),
		$paperStrtop = "",
		$paperStrdown = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "PaperType.ashx?action=getPaperType",
		dataType: "json",
		data: {},
		success: function(result) {
			result.forEach(function(value, index) {
				var tagNames = new Array();
				var $briefStr = "",
					tagNames = value.tagName.split(' ');
				$paperStr = "<li class='span4'><div class='dycsubject-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><div class='dycsubject-title'><p class='dycsystem dyctest'>" + value.name + "</p><p>" + value.title + "</p></div><div class='subject-brief clearfix'>";
				for(var i = 0; i < tagNames.length; i++) {
					$briefStr += "<p class='span4'>" + tagNames[i] + "</p>";
				}
				if(value.randType == 0) {
					$paperStrdown = "</div><div class='dycsubjectbtn'><a class='dycsubject-btn' href='ycedu/subjectselect.html?paperTypeId=" + value.paperTypeId + "' target='_blank'>" + value.btnName + "</a></div></li>";
				} else {
					$paperStrdown = "</div><div class='dycsubjectbtn'><a class='dycsubject-btn' href='ycedu/subjecttest.html?paperTypeId=" + value.paperTypeId + "' target='_blank' >" + value.btnName + "</a></div></li>";
				}
				$htmlStr += $paperStr　 + $briefStr + $paperStrdown;
			});
			$jSubject.html($htmlStr);
		},
		error: function(err) {
			console.log(err);
		}
	});
};
//题库-题库类型
$.jcourseType = function(pId) {
	var $jcourseType = $('#jcourseTypeId'),
		$htmlStr = "";
	$.ajax({
		type: "get",
		url: ROUTE + "ExamPaper.ashx?action=getSecondLevelCourseType",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		success: function(result) {
			result.forEach(function(value, index) {
				if(index == '0') {
					$htmlStr += "<p class='span2'><label>" + value.name + "</label><input type='radio' name='subselect' value=" + value.courseTypeId + " checked='checked' data-isbuy=" + value.isbuy + " /></p>";
				} else {
					$htmlStr += "<p class='span2'><label>" + value.name + "</label><input type='radio' name='subselect' value=" + value.courseTypeId + " data-isbuy=" + value.isbuy + " /></p>";
				}

			});
			$jcourseType.html($htmlStr);
			$('#jcourseTypeId input').click(function() {
				var type = $(this).attr('value');
				var isbuy = $(this).attr('data-isbuy');
				$.jsubjectList(pId, 1, type, isbuy);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库-题目列表
$.jsubjectList = function(id, pageIndex, courseTypeId, isbuy) {
	var $jsubjectList = $("#jsubjectlist"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10,
			"courseTypeId": courseTypeId
		},
		success: function(result) {
			result.rows.forEach(function(value, index) {
				if(($mid == undefined) || ($mid == '') || ($mid == null) || (isbuy == '0')) {
					$htmlStr += "<li><a href='#this'>" + value.name + "</a></li>";
				} else {
					$htmlStr += "<li><a href='subjecttest.html?paperTypeId=" + id + "&examPaperId=" + value.examPaperId + "' target='_blank'>" + value.name + "</a></li>";
				}

			});

			$jsubjectList.html($htmlStr);

			//页码
			pages(pageIndex, result.totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jsubjectList(id, pageIndex, courseTypeId, isbuy);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//题库测试题-机考类型
$.jmachineTest = function(id, pageIndex, answer) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$jtestHead = $('#jtesthead'),
		$headStr = "",
		$num = 0,
		$numsStr = "",
		$titleStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		asynch: false,
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：0题<br/> " + "未答题：" + result[0].totalCount + "题<br/>" + "总 分：" + result[0].totalScore + "分");

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) {
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) {
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

				} else {
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}
				$headStr = value.name;
				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis'></div></div>";
			});
			$jtestHead.html($headStr);
			$jtestBox.html($htmlStr);

			$('.dyctestsystem-box-select').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				//保存当前页答案
				var xuhao = $(this).siblings('.dyctestsystem-box-title').children('.dyctestsystem-num').html();
				var ans = new Array();
				ans[0] = $(this).attr('data-id');
				ans[1] = $(this).parent().attr("data-eid");
				ans[2] = $(this).parent().attr("data-qid");
				var score = $(this).parent().attr("data-score");
				var rightanswer = $(this).parent().attr("data-answer");
				if(ans[0] == rightanswer) {
					ans[3] = score;
				} else {
					ans[3] = 0;
				}
				answer[xuhao] = ans;
			});

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jmachineTest(id, pageIndex, answer);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
	return answer;
};

//题库测试题-机考类型-实时
$.jmachineTesttime = function(id, pageIndex) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$janswer = $("#jtestsystembox").children().find('.active'),
		$num = 0,
		$numsStr = "",
		$titleStr = "",
		$score = 0,
		$rightnum = 0,
		$htmlStrana = "",
		$htmlanswer = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：0题<br/> " + "未答题：" + result[0].totalCount + "题<br/>" + "总 分：" + result[0].totalScore + "分");

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-answer = " + value.rightAnswer + " data-score = " + value.point + " data-isclick='true'><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				value.questionOptions.forEach(function(valueoption, indexs) {
					$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
				});
				$htmlStrana = "<div class='dycanswer'></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis' style='display:none'>" + $htmlStrana + "</div></div>";
			});

			$jtestBox.html($htmlStr);

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			var $jtestnums = $(".dyctestnums li");

			$('.dyctestsystem-box-select').click(function() {
				if($(this).parent().attr('data-isclick') == 'true') {
					$(this).parent().attr('data-isclick', 'false');
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					$(this).parent().find('.dycanasysis').css("display", "block");

					var index = $(this).siblings('.dyctestsystem-box-title').children('.dyctestsystem-num').html() - 1;
					if($(this).attr("data-id") == $(this).parent().attr("data-answer")) {
						$htmlanswer = "您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span>";
						$($jtestnums[index]).removeClass().addClass('dyccorect');
						$score += parseFloat($(this).parent().attr("data-score"));
					} else {
						$htmlanswer = "<div>您的答案：<span class='dycanswerwrong'>x</span>";
						$($jtestnums[index]).removeClass().addClass('dycerror');
						$rightnum += 1;
					}
					$(this).parent().find('.dycanswer').html($htmlanswer);
					$num = $('#jtestsystembox').children().find('.active').length;
					$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>错答题：" + $rightnum + "题<br/>未答题: " + (result[0].totalCount - $num) + "题<br/>总 分：" + result[0].totalScore + "分<br/>总得分: " + $score + "分");
				} else {
					return false;
				}

			});

			//页码

			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');

			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jmachineTesttime(id, pageIndex);

				/*$.scrollTo(1950, 0);*/
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--全真模拟
$.jtestBox = function(id, pageIndex, answer) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$jtestHead = $('#jtesthead'),
		$headStr = "",
		$numsStr = "",
		$titleStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionByPaperId",
		dataType: "json",
		asynch: false,
		data: {
			"memberId": $mid,
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：0题<br/> " + "未答题：" + result[0].totalCount + "题<br/>" + "总 分：" + result[0].totalScore + "分");

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) {
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) {
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

				} else {
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}
				$headStr = value.name;
				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis'></div></div>";
			});
			$jtestHead.html($headStr);
			$jtestBox.html($htmlStr);
			$('.dyctestsystem-box-select').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				//保存当前页答案

				var xuhao = $(this).siblings('.dyctestsystem-box-title').children('.dyctestsystem-num').html();
				var ans = new Array();
				ans[0] = $(this).attr('data-id');
				ans[1] = $(this).parent().attr("data-eid");
				ans[2] = $(this).parent().attr("data-qid");
				var score = $(this).parent().attr("data-score");
				var rightanswer = $(this).parent().attr("data-answer");
				if(ans[0] == rightanswer) {
					ans[3] = score;
				} else {
					ans[3] = 0;
				}
				answer[xuhao] = ans;

			});

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));

			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jtestBox(id, pageIndex, answer);

			});

		},
		error: function(err) {
			console.log(err);
		}
	});

	return answer;
};

//题库测试题-错题
$.jquestionTest = function(id, pageIndex, answer) {
	var $jtestBox = $("#jtestsystembox"),
		$jtestNums = $("#jtestnums"),
		$jtestHead = $('#jtesthead'),
		$headStr = "",
		$numsStr = "",
		$titleStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionBymemberId",
		dataType: "json",
		asynch: false,
		data: {
			"memberId": 12,
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			$(".dyctestcard").css('display', 'none');

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + "  data-num = " + value.questionNo + "  data-answer = " + value.rightAnswer + " ><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + (index + 1) + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) {
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) {
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";

						}
					});

				} else {
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}
				$headStr = value.name;
				$htmlStr += $titleStr + $optionStr + "<div class='dycanasysis'></div></div>";
			});
			$jtestHead.html($headStr);
			$jtestBox.html($htmlStr);
			$('.dyctestsystem-box-select').click(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				//保存当前页答案

				var xuhao = $(this).parent().attr("data-num");
				var ans = new Array();
				ans[0] = $(this).attr('data-id');
				ans[1] = $(this).parent().attr("data-eid");
				ans[2] = $(this).parent().attr("data-qid");
				var score = $(this).parent().attr("data-score");
				var rightanswer = $(this).parent().attr("data-answer");
				if(ans[0] == rightanswer) {
					ans[3] = score;
				} else {
					ans[3] = 0;
				}
				answer[xuhao] = ans;

			});

			for(var i = 0; i < result[0].totalCount; i++) {
				$numsStr += "<li class='dycnoanswer'>" + (i + 1) + "</li>";
			}
			$jtestNums.html($numsStr);

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));

			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				$.jquestionTest(id, pageIndex, answer);

			});

		},
		error: function(err) {
			console.log(err);
		}
	});

	return answer;
};

//题库-交卷
$.clickTestpost = function(pId, eId, ac) {
	$('#jtestpost').click(function() {
		if(($mid != undefined) && ($mid != "") && ($mid != null)) {
			var examQuestions = "",
				score = 0,
				totalscore = 0;

			for(var i = 1; i < ac.length; i++) {
				var epId = $($('#jtestsystembox').children().find('.active')).parent().attr("data-pid");
				if(ac[i] != null) {
					var answer = ac[i][0];
					var examQuestionId = ac[i][1];
					var questionBankId = ac[i][2];
					score = ac[i][3];
					totalscore += parseFloat(score);

					if(i < ac.length - 1) {
						examQuestions += '{"examQuestionId":' + '"' + examQuestionId + '",' + '"answer":' + '"' + answer + '",' + '"questionBankId":' + '"' + questionBankId + '",' + '"score":' + '"' + score + '"},';
					} else if(i == ac.length - 1) {
						examQuestions += '{"examQuestionId":' + '"' + examQuestionId + '",' + '"answer":' + '"' + answer + '",' + '"questionBankId":' + '"' + questionBankId + '",' + '"score":' + '"' + score + '"}';
					}
				}
			}

			examQuestions = "[" + examQuestions + "]";
			if(ac.length == '0') {
				layer.confirm("您还未答题，确定提交？", {
					btn: ['确定', '取消'],
				}, function() {
					if(eId == undefined) {
						$.jtestPost(0, pId, epId, totalscore, examQuestions, ac); //机考、每日一练
					} else {
						if(qbId == undefined) {
							$.jtestPost(1, pId, eId, totalscore, examQuestions, ac); //全真模拟
						} else {
							$.jtestPost(1, pId, eId, totalscore, examQuestions, ac, qbId); //全真模拟
						}
					}
				});
			} else {
				if(eId == undefined) {
					$.jtestPost(0, pId, epId, totalscore, examQuestions, ac); //机考、每日一练
				} else {
					if(qbId == undefined) {
						$.jtestPost(1, pId, eId, totalscore, examQuestions, ac); //全真模拟
					} else {
						$.jtestPost(1, pId, eId, totalscore, examQuestions, ac, qbId); //全真模拟
					}

				}
			}

		} else {
			alert('您还未登录~')
		}
	});
}

//题库-提交测试题
$.jtestPost = function(testtype, id, eid, totalScore, examQuestions, ans, qbid) {
	var $jtestPost = $("#jtestpost"),
		$htmlStr = "";

	$.ajax({
		type: "POST",
		url: ROUTE + "MemberExam.ashx?action=examPaperCommit",
		dataType: "json",
		data: {
			"memberId": $mid,
			"paperTypeId": id,
			"examPaperId": eid,
			"totalScore": totalScore,
			"examQuestions": examQuestions
		},
		success: function(result) {
			if(result == '200') {
				layer.msg("提交成功,即将出答案结果~");
				setTimeout(function() {
					if(qbid == '1') {
						jquestionAnalysis(eid, 1, ans);
					} else {
						if(testtype == '0') {
							jmachineAnalysis(id, 1, ans, totalScore);
						} else {
							jtestAnalysis(eid, 1, ans, totalScore);
						}
					}
				}, 2000)

			} else {
				layer.msg("提交失败");
				return false;
			}

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--错题-解析
jquestionAnalysis = function(id, pageIndex, answer, totalScore) {
	var $jtestAnalysis = $(".dycanasysis"),
		$jtestBox = $("#jtestsystembox"),
		$jtestnums = $("#jtestnums li"),
		$rightnum = 0,
		$totalStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionBymemberId",
		dataType: "json",
		data: {
			"memberId": 12,
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {

			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + (index + 1) + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";

				if(answer[value.questionNo] != null) { //判断是否有答题
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) { //判断所选答案
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

					if((answer[value.questionNo][0] != '') && (answer[value.questionNo][0] == value.rightAnswer)) { //判断答案是否正确
						$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

					} else {
						$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					}

				} else { //未答题错误
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}

				$totalStr += $titleStr + $optionStr + "<div class='dycanasysis'>" + $htmlStr + "</div></div>";
			});
			$jtestBox.html($totalStr);
			for(var i = 0; i < result[0].totalCount; i++) {
				$($jtestnums[i]).removeClass().addClass('dycerror');
				if(answer[(i + 1)] != undefined) {
					if(answer[(i + 1)][3] != '0') {
						$($jtestnums[i]).removeClass().addClass('dyccorect');
						$rightnum += 1;
					} else {
						$($jtestnums[i]).removeClass().addClass('dycerror');
					}
				}

			}

			$('#jtestpost').css("display", "none");

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jquestionAnalysis(id, pageIndex, answer);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--机考系统-解析
jmachineAnalysis = function(id, pageIndex, answer, totalScore) {
	var $jtestAnalysis = $(".dycanasysis"),
		$jtestBox = $("#jtestsystembox"),
		$jtestnums = $("#jtestnums li"),
		$rightnum = 0,
		$htmlStr = "",
		$totalStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamPaper.ashx?action=getExamPaperByTypeId",
		dataType: "json",
		data: {
			"paperTypeId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";
				if(answer[value.questionNo] != null) { //判断是否有答题
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) { //判断所选答案
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

					if((answer[value.questionNo][0] != '') && (answer[value.questionNo][0] == value.rightAnswer)) { //判断答案是否正确
						$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

					} else {
						$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					}

				} else { //未答题错误
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}

				$totalStr += $titleStr + $optionStr + "<div class='dycanasysis'>" + $htmlStr + "</div></div>";
			});
			$jtestBox.html($totalStr);
			for(var i = 0; i < result[0].totalCount; i++) {
				$($jtestnums[i]).removeClass().addClass('dycerror');
				if(answer[(i + 1)] != undefined) {
					if(answer[(i + 1)][3] != '0') {
						$($jtestnums[i]).removeClass().addClass('dyccorect');
						$rightnum += 1;
					} else {
						$($jtestnums[i]).removeClass().addClass('dycerror');
					}
				}

			}

			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：" + (result[0].totalCount - $rightnum) + "题<br/> " + "答对题：" + $rightnum + "题<br/>" + "总 分：" + result[0].totalScore + "分<br/>" + "总得分:" + totalScore + "分");
			$('#jtestpost').css("display", "none");

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));

			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jmachineAnalysis(id, pageIndex, answer, totalScore);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
};

//题库测试题--全真模拟-解析
jtestAnalysis = function(id, pageIndex, answer, totalScore) {
	var $jtestAnalysis = $(".dycanasysis"),
		$jtestBox = $("#jtestsystembox"),
		$jtestnums = $("#jtestnums li"),
		$rightnum = 0,
		$totalStr = "",
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "ExamQuestion.ashx?action=getExamQuestionByPaperId",
		dataType: "json",
		data: {
			"examPaperId": id,
			"pageIndex": pageIndex,
			"pageSize": 10
		},
		success: function(result) {
			/*result[0].rows.forEach(function(value, index) {
				if((answer[index] != '') && (answer[index] == value.rightAnswer)) {
					$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					$($jtestnums[index]).removeClass().addClass('dyccorect');
					$score += parseFloat(value.point);
				} else {
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					$($jtestnums[index]).removeClass().addClass('dycerror');
					$rightnum += 1;
				}

				$($jtestAnalysis[index]).html($htmlStr);
			});*/
			result[0].rows.forEach(function(value, index) {
				var $optionStr = "";
				$titleStr = "<div class='dyctestsystem-box' data-pId=" + value.examPaperId + " data-eId=" + value.examQuestionId + " data-qId=" + value.questionBankId + " data-score = " + value.point + " data-answer = " + value.rightAnswer + "><div class='dyctestsystem-box-title'><span class='dyctestsystem-num'>" + value.questionNo + "</span>[<span class='input' contenteditable='true'></span>]" + value.title + "</div>";

				if(answer[value.questionNo] != null) { //判断是否有答题
					value.questionOptions.forEach(function(valueoption, indexs) {
						if(valueoption.optionNo == answer[value.questionNo][0]) { //判断所选答案
							$optionStr += "<p class='dyctestsystem-box-select active' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						} else {
							$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
						}
					});

					if((answer[value.questionNo][0] != '') && (answer[value.questionNo][0] == value.rightAnswer)) { //判断答案是否正确
						$htmlStr = "<div>您的答案：<span class='dycanswerright'><i class='uk-icon-check'></i></span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";

					} else {
						$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					}

				} else { //未答题错误
					$htmlStr = "<div>您的答案：<span class='dycanswerwrong'>x</span></div><p>正确答案：" + value.rightAnswer + "</p><div class='dycansweranasysis'><p>试题解析：</p>" + value.analysis + "</div>";
					value.questionOptions.forEach(function(valueoption, indexs) {
						$optionStr += "<p class='dyctestsystem-box-select' data-id=" + valueoption.optionNo + ">[ " + valueoption.optionNo + " ] " + valueoption.questionOption + "</p>";
					});
				}

				$totalStr += $titleStr + $optionStr + "<div class='dycanasysis'>" + $htmlStr + "</div></div>";
			});
			$jtestBox.html($totalStr);
			for(var i = 0; i < result[0].totalCount; i++) {
				$($jtestnums[i]).removeClass().addClass('dycerror');
				if(answer[(i + 1)] != undefined) {
					if(answer[(i + 1)][3] != '0') {
						$($jtestnums[i]).removeClass().addClass('dyccorect');
						$rightnum += 1;
					} else {
						$($jtestnums[i]).removeClass().addClass('dycerror');
					}
				}

			}

			$("#jtestcard").html("试题数：" + result[0].totalCount + "题<br/>" + "错答题：" + (result[0].totalCount - $rightnum) + "题<br/> " + "答对题：" + $rightnum + "题<br/>" + "总 分：" + result[0].totalScore + "分<br/>" + "总得分:" + totalScore + "分");
			$('#jtestpost').css("display", "none");

			//页码
			pages(pageIndex, result[0].totalPageCount, $("#jsubjectlistpage"));
			var $jsubPage = $('#jsubjectlistpage li a');
			$jsubPage.click(function() {
				var num = $jsubPage.index(this);
				if(num && (num < $jsubPage.length - 1)) {
					pageIndex = num;
				} else if((num == "0") && (pageIndex > 1)) {
					pageIndex -= 1;
				} else if((num == ($jsubPage.length - 1)) && (pageIndex < $jsubPage.length - 2)) {
					pageIndex += 1;
				}
				jtestAnalysis(id, pageIndex, answer, totalScore);
			});

		},
		error: function(err) {
			console.log(err);
		}
	});
};

//页码
function pages(pageIndex, totalPageCount, obj) {
	var $htmlPage = "",
		$jsubjectListpage = obj;

	for(var i = 0; i < totalPageCount; i++) {
		$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
	}

	$jsubjectListpage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
	var $jsubPage = obj.find('a');

	if(totalPageCount == '0') {
		$jsubPage.css('display', 'none');
	} else if((pageIndex == '1') && (pageIndex == totalPageCount)) {
		$jsubPage.eq(0).css('display', 'none');
		$jsubPage.eq(parseInt(totalPageCount) + 1).css('display', 'none');
	} else if(pageIndex == '1') {
		$jsubPage.eq(0).css('display', 'none');
	} else if(pageIndex == (totalPageCount)) {
		$jsubPage.eq(parseInt(totalPageCount) + 1).css('display', 'none');
	}
	$jsubPage.eq(pageIndex).parent().addClass('active');

}

//观点支付页面
$.viewPay = function(id, bayType) {
	var $jMoney = $("#jmoney"),
		$jviewList = $("#jviewlist"),
		$htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "OrderDetail.ashx?action=getOrderListByOrderId",
		dataType: "json",
		data: {
			"memberId": $mid,
			"orderId": id,
			"orderTypeId": 1,
			"bayType": bayType //0是购买单条--1专辑的包月
		},
		success: function(result) {
			result[0].list.forEach(function(value, index) {
				$htmlStr = "<div class='dycsubmitorder-li'><a href='#this' class='ycimage'><img src='" + ROUTEFILE + value.iconPath + "' alt='课程' /></a><div class='dycsbcontent'><a class='yctitle' href='#this'>" + value.newsName + "</a><p class='ycbrief'>" + value.note + "</p></div><span class='dycsbprice'>" + value.preferentialPrice + "</span><span class='dycsbnumber'>1</span><span class='dycsbsubtotal'>" + value.totalPrice + "</span></div>"
			});
			$jviewList.html($htmlStr);
			$jMoney.html(result[0].preferentialTotalPrice);

		},
		error: function(err) {
			console.log(err);
		}
	});

};

//观点支付-立即支付
$.imPayment = function(payTypeId, orderId, goodsId, typeId, newsTypeId) { //订单类型typeId  0是购买单条--1专辑的包月
	if(payTypeId == '2') { //播米币支付
		layer.open({
			type: 1,
			title: '播米币支付',
			area: ['360px', '360px'], //宽高
			content: "<div class='dycweixin-img' style='text-align:center;width:300px;height:200px;margin:50px auto 0;color:#606060;'><p style='text-align:center'>应付播米币：<span style='color: #df5e3f;font-size: 20px;'>￥" + $("#jmoney").html() + "</span></p>" +
				"<div style='margin-top:30px'><input id='jimage' name='name' type='text' placeholder='输入图片验证码' /><a  class='jchange'><img class='imageVC' style='height:100%;' src='../ycedu/images/vcode.png' /></a></div>" +
				"<div style='margin-top:30px'><input id='jvalue' name='name' type='text' placeholder='输入验证码确认支付' /><a id='jvalid' style='margin-left:10px;background-color:#df5e3f;color:#fff;padding:4px 5px;'>获取短信验证码</a></div></div>",
			success: function() {
				getImgVC();
				$(".imageVC").on("click", function() {
					getImgVC();
				})

				$('#jvalid').click(function() { //点击获取验证码
					if($('#jvalid').text() == '获取短信验证码') {
						$.ajax({
							type: "post",
							url: ROUTE + "Member.ashx?action=getMemberMobById",
							data: {
								"memberId": $mid
							},
							dataType: "json",
							success: function(result) {
								$.ajax({
									type: "post",
									url: ROUTE + "Member.ashx?action=getConfirmCoinValidCode",
									data: {
										"name": result[0].mobile,
										codeKey: imgVCKey,
										codeValue: $("#jimage").val()

									},
									dataType: "json",
									success: function(result) {
										if(result == 810 || result == "810") {
											layer.msg("图形验证码错误！");
											return false;
										}

										if(result == 815 || result == "815") {
											layer.msg("请勿重复请求短信验证码！");
											return false;
										}

										changeVCShow($('#jvalid'));
									},
									error: function(err) {
										console.log(err);
									}
								});

							},
							error: function(err) {
								console.log(err);
							}
						});
					}
				});

			},
			btn: ['确认支付', '取消'],
			yes: function(index, layero) { //确认支付

				$.ajax({
					type: "post",
					url: ROUTE + "Pay.ashx?action=directPay",
					data: {
						"memberId": $mid,
						"amount": $("#jmoney").html(),
						"discount": 0,
						"orderId": orderId,
						"payTypeId": payTypeId,
						"couponReceiveId": 0,
						"orderTypeId": 1,
						"validateCode": $('#jvalue').val() //校验验证码是否正确
					},
					success: function(result) {
						if(result == '812') {
							layer.closeAll();
							$(".dyc-success-bg").show().delay(3000).fadeOut();
							setTimeout(function() {
								if(typeId == '1') { //购买专辑返回到订单]
									var returnhref = localStorage.getItem('viewhref');
									window.location.href = returnhref;
									localStorage.removeItem('viewhref');
								} else {
									window.location.href = "strategynewsdetail.html?newsId=" + goodsId + "&newsTypeId=" + newsTypeId;
								}

							}, 3000);
						} else if(result == '814') {
							layer.msg("支付失败，请重新支付");
						} else if(result == '819') {
							layer.closeAll();
							layer.msg("播米币余额不足，请换一种支付方式或充值播米币~");
						} else if(result == '805') {
							layer.msg("验证码输入错误，请重新输入");
						} else if(result == '818') {
							layer.closeAll();
							layer.msg('你已购买,无需在购买');
						} else {
							return false;
						}
					},
					error: function(err) {
						console.log(err);
					}
				});

			}
		});
	} else {
		if(payTypeId == '0') {
			var newWindow = window.open('about:blank');
		}
		$.ajax({
			type: "post",
			url: ROUTE + "Pay.ashx?action=directPay",
			data: {
				"memberId": $mid,
				"amount": $("#jmoney").html(),
				"discount": 0,
				"orderId": orderId,
				"payTypeId": payTypeId,
				"couponReceiveId": 0,
				"orderTypeId": 1
			},
			success: function(result) {
				if(result == '818') {
					layer.msg('你已购买,无需在购买')
				} else {
					if(payTypeId == '0') {
						newWindow.location.href = "turnpay.html?amount=" + $("#jmoney").html() + '&orderId=' + orderId + "&memberId=" + $mid + "&discount=0&couponReceiveId=0&orderTypeId=1";
						setTimeout(function() {
							layer.confirm("是否支付完成", {
								btn: ['重新选择支付方式', '支付完成'],
							}, function() {
								layer.closeAll('dialog');
								console.log("心选");
							}, function() {
								$.ajax({ //二次校验
									type: "post",
									url: ROUTE + "Pay.ashx?action=checkPaySuccess",
									dataType: "json",
									data: {
										"memberId": $mid,
										"orderId": orderId,
										"orderTypeId": 1
									},
									success: function(result) {
										if(result == '812') {
											$(".dyc-success-bg").show().delay(3000).fadeOut();
											setTimeout(function() {
												if(typeId == '1') { //购买专辑返回到订单
													var returnhref = localStorage.getItem('viewhref');
													window.location.href = returnhref;
													localStorage.removeItem('viewhref');
												} else {
													window.location.href = "strategynewsdetail.html?newsId=" + goodsId + "&newsTypeId=" + newsTypeId;
												}

											}, 3000);
										}
										if(result == '814') {
											alert("未完成支付");
										} else {
											return false;
										}
									},
									error: function(err) {
										console.log(err);
									}
								});

							});
						}, 3000);
					} else if(payTypeId == '1') {
						var json = eval('(' + result + ')')
						setTimeout(function() {
							layer.open({
								type: 1,
								title: '微信支付',
								area: ['420px', '420px'], //宽高
								content: "<div class='dycweixin-img' style='text-align:center;width:200px;height:200px;line-height:200px;margin:50px auto 0'><img src=" + ROUTEFILE + json.iconPath + " /></div><p style='text-align:center'>应付金额：<span style='color: #df5e3f;font-size: 20px;'>￥" + $("#jmoney").html() + "</span></p>",
								success: function() {
									var t = 0;
									var xunhuan = setInterval(function() {
										$.ajax({ //二次校验
											type: "post",
											url: ROUTE + "Pay.ashx?action=checkPaySuccess",
											dataType: "json",
											data: {
												"memberId": $mid,
												"orderId": orderId
											},
											success: function(result) {
												if(result == '812') {
													clearInterval(xunhuan);
													layer.closeAll();
													$(".dyc-success-bg").show().delay(3000).fadeOut();
													setTimeout(function() {
														if(typeId == '1') { //购买专辑返回到订单
															var returnhref = localStorage.getItem('viewhref');
															window.location.href = returnhref;
															localStorage.removeItem('viewhref');
														} else {
															window.location.href = "strategynewsdetail.html?newsId=" + goodsId + "&newsTypeId=" + newsTypeId;
														}

													}, 3000);

												}
												/*else if(result == '814'){
													t++;
													if(t>3){
														clearInterval(xunhuan);
														layer.closeAll();
														alert("支付超时,请重新打开~");
													}
												}*/

											},
											error: function(err) {
												console.log(err);
											}
										});
									}, 3000);
								}
							});
						}, 500);
					}

				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
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

//活动公告页面
$.jTutorial = function(id) {
	var $jtutrial = $("#jtutrial");
	$.ajax({
		type: "GET",
		url: ROUTE + "Notice.ashx?action=getNoticeContentById",
		dataType: "json",
		data: {
			"noticeId": id
		},
		success: function(result) {
			$jtutrial.html(result[0].content);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//登录enter事件
$.enterKey = function() {
	//新增enter账号登录验证
	document.getElementById("jloginForm").onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			$.pwdsubmit();

		}
	};
	//新增enter手机登录
	document.getElementById('jphoneLoginForm').onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			$.phonesubmit();
		}
	};

	//新增enter手机登录
	document.getElementById('jregPwd').onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			$.subRegForm();
		}
	};
}

//策略解读
$.strategyTwo = function(id) {
	var $jstrategy = $("#jstrategy"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getGuestOpinion",
		dataType: "json",
		data: {
			"pageIndex": 1,
			"pageSize": 2
		},
		success: function(result) {
			if(result.totalPageCount == 0) {
				return false;
			}
			result.rows.forEach(function(value, index) {
				$htmlStr += "<div class='span6'><a class='dycstrategy-second-box' href='strategydetail.html?newsTypeId=" + value.newsTypeId + "&teacherId=" + value.teacherId + "' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' /><div class='dycstrategy-second-con'><h3><span>" + value.name + "</span></h3><p>" + value.note + "</p></div></a></div>"
			});
			$jstrategy.html($htmlStr)
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略解读-销量排行
$.strategyHot = function(id) {
	var $jstrategyswiper = $("#jstrategyswiper"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getHotGuestOpinion",
		dataType: "json",
		data: {
			"pageIndex": 1,
			"pageSize": 100
		},
		success: function(result) {
			if(result.totalPageCount == 0) {
				return false;
			}
			result.rows.forEach(function(value, index) {
				if(index > 1) { //排除头两个
					$htmlStr += "<div class='swiper-slide'><a class='dycstrategy-top-box' href='strategydetail.html?newsTypeId=" + value.newsTypeId + "&teacherId=" + value.teacherId + "' target='_blank'><img src='" + ROUTEFILE + value.iconPath + "' /><div class='dycstrategy-top-con'><h3>" + value.name + "</h3><p>" + value.note + "</p></div></a></div>";
				}

			});
			$jstrategyswiper.html($htmlStr);
			var swiper = new Swiper('.dycstrategy-top-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				speed: 30000,
				loop: true,
				freeMode: true,
				autoplayDisableOnInteraction: false,
				autoplay: 1,
				slidesPerView: 4,
				slidesPerGroup: 4,
				spaceBetween: 20
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function strategyList(){//策略解读-最新列表
	new Vue({
		el: '#jstrategylist',
		data: {
			showItem: 8,
			current: 1,
			allpage: 0,
			newStrageArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			});
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
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "News.ashx?action=getUpToDateNews", {
					pageIndex: 0,
					pageSize: _this.showItem,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.newStrageArr = res.body.rows;
					_this.newStrageArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});

			},
			getListData: function(id) {
				var _this = this;
				this.$http.post(ROUTE + "News.ashx?action=getUpToDateNews", {
					pageIndex: _this.current,
					pageSize: _this.showItem,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.newStrageArr = res.body.rows;
					_this.newStrageArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
					})
				});
			},
			goto: function(index) { //枫叶处理
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getListData();;
				//$.scrollTo($(".bmencyclopediaType").height() - 100, 0);
			}
		}
	});
}


//策略专栏-banner
$.strategyDetailbanner = function(id, tId) {
	var $jsgydetailbanner = $("#jsgydetailbanner"),
		$htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Banner.ashx?action=getBanner&bannerType=teacher",
		dataType: "json",
		data: {
			"teacherId": tId
		},
		success: function(result) {
			if(result.length < 1) {
				return false;
			}
			$htmlStr = "<h1>" + result[0].note + "</h1><h2>-" + result[0].name + "-</h2><p>阅读也能增加财富</p>";
			$jsgydetailbanner.html($htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略专栏-价格及简介
$.strategyBrief = function(id) {
	var name = $("#jstrategydetailday h3"),
		jpayselect = $('#jpayselect'),
		note = $('#jstrategydetailday .strategydetail-day-brief'),
		brief = $('#jstrategydetailbrief'),
		img = $('#jstrategydetaildayimg'),
		jpaystrategy = $('#jpaystrategy'),
		datamoon = "",
		dataprice = "",
		htmlStr = "";
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherColumn",
		dataType: "json",
		data: {
			"newsTypeId": id
		},
		success: function(result) {
			if(result.length < 1) {
				return false;
			}
			if((result[0].teacherColumn == undefined) || (result[0].validDate == undefined)) {
				return false;
			}
			var res = result[0].teacherColumn;
			var price = result[0].validDate;

			price.forEach(function(value, index) {
				if(index == 0) {
					htmlStr = "<a class='dycstrategy-day-list checked' data-id=" + value.validType + " data-price=" + value.price + ">" + value.validMonth + "<span>￥" + value.price + "</span><i></i></a>";
				} else {
					htmlStr += "<a class='dycstrategy-day-list' data-id=" + value.validType + " data-price=" + value.price + ">" + value.validMonth + "<span>￥" + value.price + "</span><i></i></a>";
				}

			});
			jpayselect.html(htmlStr);
			name.html(res[0].name);
			img.html("<img src='" + ROUTEFILE + res[0].iconPath + "' />");
			note.html(res[0].note);
			brief.html(res[0].introduce);

			datamoon = $(jpayselect).find('.checked').attr('data-id'); //月份
			dataprice = $(jpayselect).find('.checked').attr('data-price'); //价格
			$(jpayselect).find('a').click(function() {
				$(this).addClass('checked');
				$(this).siblings().removeClass('checked');
				datamoon = $(this).attr('data-id'); //月份
				dataprice = $(this).attr('data-price'); //价格
			});

			jpaystrategy.click(function() {
				if(($mid != undefined) && ($mid != "") && ($mid != null)) {
					$.ajax({
						type: "POST",
						dataType: 'json',
						url: ROUTE + "Order.ashx?action=directBuyMoonGoods",
						async: false, //同步请求
						data: {
							"memberId": $mid,
							"goodsId": id,
							"moonNum": datamoon,
							"price": dataprice,
							"orderType": 1
						},
						success: function(data) {
							if(data == 818 || data == "818") {
								layer.msg("您已购买过该课程！");
								return false;
							} else {
								if(data[0].orderId != undefined) {
									var dataobj = data[0];
									if(dataobj) {
										var nowhref = new Array();
										nowhref = window.location.href.split('#');
										localStorage.setItem('viewhref', nowhref[0]);
										window.open("viewpay.html?orderId=" + dataobj.orderId + "&type=1" + '&goodsId=' + id);
									}
								}
							}
						},
						error: function(data) {
							layer.msg("服务器出差了！");
						}
					});

				} else {
					layer.alert("非会员暂不支持购买哦！");
				}

			});

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略专栏-作者
$.strategyAuthor = function(tId) {
	var $jstrategyauthor = $("#jstrategyauthor"),
		name = $("#jstrategyauthor .dycstrategydetail-author-name"),
		brief = $('#jstrategyauthor .dycstrategydetail-author-brief');
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherIntroduce",
		dataType: "json",
		data: {
			"teacherId": tId
		},
		success: function(result) {
			if(result.length < 1) {
				return false;
			}
			name.html("-" + result[0].name + "-");
			brief.html(result[0].introduce);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略专栏-全部文章
$.strategydetailList = function(id) {
	new Vue({
		el: '#jdycstrategydetaillist',
		data: {
			showItem: 8,
			current: 1,
			allpage: 0,
			newStrageArr: []
		},
		mounted: function() { //1.0ready --> 2.0
			this.$nextTick(function() {
				this.loadData();
			});
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
			loadData: function() {
				var _this = this;
				this.$http.post(ROUTE + "News.ashx?action=getTeacherOpinion", {
					newsTypeId: id,
					pageIndex: 0,
					pageSize: _this.showItem,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.newStrageArr = res.body.rows;
					_this.newStrageArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
						Vue.set(item, "newsId", 'strategynewsdetail.html?newsId=' + item.newsId+'&newsTypeId='+item.newsTypeId); //注册变量
					})
				});

			},
			getListData: function(id) {
				var _this = this;
				this.$http.post(ROUTE + "News.ashx?action=getTeacherOpinion", {
					newsTypeId: id,
					pageIndex: _this.current,
					pageSize: _this.showItem,
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.allpage = res.body.totalPageCount;
					_this.newStrageArr = res.body.rows;
					_this.newStrageArr.forEach(function(item, index) {
						Vue.set(item, "iconPath", ROUTEFILE + item.iconPath); //注册变量
						Vue.set(item, "newsId", 'strategynewsdetail.html?newsId=' + item.newsId+'&newsTypeId='+item.newsTypeId); //注册变量
					})
				});
			},
			goto: function(index) { //枫叶处理
				if(index == this.current) return;
				if(index > this.allpage) {
					this.current = this.current - 2;
					layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
					return false;
				}
				this.current = index;
				this.getListData();;
				//$.scrollTo($(".bmencyclopediaType").height() - 100, 0);
			}
		}
	});
}

//策略文章页-内容
$.strategyndCons = function(id, newsTypeId) {
	var $jstrategynewsdetail = $("#jstrategynewsdetail"),
		$jnewsPrevPage = $('#jnewsPrevPage'),
		$jnewsNextPage = $('#jnewsNextPage'),
		title = $('#jstrategyndbanner h1'),
		name = $("#jstrategyndbanner h2"),
		day = $('#jstrategyndbanner .date'), //专辑时间
		yesterday = "",
		market = "",
		focus = "",
		plan = "",
		reminder = "",
		htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "News.ashx?action=getCurrentNews",
		dataType: "json",
		data: {
			"memberId": localStorage.getItem('mid'),
			"newsId": id,
			"newsTypeId": newsTypeId
		},
		success: function(result) {
			if(result.length < 1) {
				return false;
			}
			var res = result[0];
			var days = new Array();
			title.html(result[0][0].newsTypeName); //专辑标题
			name.html("-" + result[0][0].title + "-"); //文章标题
			days = res[0].reportDate.split(" ");
			day.html(days[0]); //文章日期

			if(result[0][0].isFree == 1) { //已购买
				if(result[0][0].yesterday_news != "") { //昨日行情简述
					yesterday = '<h2 class="title">昨日行情简述</h2>' + result[0][0].yesterday_news;
				} else {
					yesterday = "";
				}
				if(result[0][0].market_hot != "") { //市场热点
					market = '<h2 class="title">市场热点追踪</h2>' + result[0][0].market_hot;
				} else {
					market = "";
				}
				if(result[0][0].focus != "") { //今日重点
					focus = '<h2 class="title">今日重点关注</h2>' + result[0][0].focus;
				} else {
					focus = "";
				}
				if(result[0][0].trading_plan != "") { //今日交易
					plan = '<h2 class="title">今日交易计划</h2>' + result[0][0].trading_plan;
				} else {
					plan = "";
				}
				if(result[0][0].reminder != "") { //温馨提示
					reminder = '<h2 class="title">温馨提示</h2>' + result[0][0].reminder;
				} else {
					reminder = "";
				}
				htmlStr = yesterday + market + focus + plan + reminder;
				$('#jstrategydetailpaymore').css('display', 'none');
			} else { //未购买
				if(result[0][0].yesterday_news != "") {
					htmlStr = '<h2 class="title">昨日行情简述</h2>' + result[0][0].yesterday_news;
				} else {
					htmlStr = "";
				}

			}
			$jstrategynewsdetail.html(htmlStr);

			if(result[1][0] == null || result[1][0] == "" || result[1][0] == undefined) {
				$jnewsPrevPage.html("");
			} else {
				$jnewsPrevPage.html("<a class='strategynewsdetail-bottom-prev' href='strategynewsdetail.html?newsId=" + result[1][0].newsId + "&newsTypeId=" + result[1][0].newsTypeId + "'>上一篇:<p class='dycprev-title'>" + result[1][0].title + "</p></a>");

			}

			if(result[2][0] == null || result[2][0] == "" || result[2][0] == undefined) {
				$jnewsNextPage.html("");
			} else {
				$jnewsNextPage.html("<a class='strategynewsdetail-bottom-next' href='strategynewsdetail.html?newsId=" + result[2][0].newsId + "&newsTypeId=" + result[2][0].newsTypeId + "'>下一篇:<p class='dycnext-title'>" + result[2][0].title + "</p></a>");
			}

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略文章页-专辑
$.strategyndAlbum = function(id) {
	var $jstrategydetailimg = $("#jstrategydetailimg"), //图片
		$jstrategydetailname = $('#jstrategydetailname'), //名字
		$jstrategydetailbrief = $('#jstrategydetailbrief'), //note
		$jstrategydetailmore = $('#jstrategydetailmore'); //了解更多
	$.ajax({
		type: "GET",
		url: ROUTE + "Teacher.ashx?action=getTeacherColumn",
		dataType: "json",
		data: {
			"newsTypeId": id
		},
		success: function(result) {

			if(result.length < 1) {
				return false;
			}
			if(result[0].teacherColumn == undefined) {
				return false;
			}
			var res = result[0].teacherColumn;
			$jstrategydetailimg.html("<img src='" + ROUTEFILE + res[0].iconPath + "' />");
			$jstrategydetailname.html("<span>" + res[0].name + "</span>");
			$jstrategydetailbrief.html(res[0].note);
			$jstrategydetailmore.html("<a href='strategydetail.html?newsTypeId=" + res[0].newsTypeId + "&teacherId=" + res[0].teacherId + "' target='_blank'>了解更多</a>");

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略文章页-更多 
$.strategyndMore = function(id, ntId) {
	var $jstrategynewsdetailmore = $("#jstrategynewsdetailmore"),
		htmlStr = "";

	$.ajax({
		type: "GET",
		url: ROUTE + "News.ashx?action=getOtherNews",
		dataType: "json",
		data: {
			"newsId": id,
			"newsTypeId": ntId,
			"pageIndex": 1,
			"pageSize": 2
		},
		success: function(result) {
			if(result.length < 1) {
				return false;
			}
			result.rows.forEach(function(value, index) {
				htmlStr += "<a class='strategynewsdetail-morearticles-wrap' href='strategynewsdetail.html?newsId=" + value.newsId + "&newsTypeId=" + value.newsTypeId + "' target='_blank'><div class='strategynewsdetail-morearticles-img'><img src='" + ROUTEFILE + value.iconPath + "' /></div><p class='strategynewsdetail-morearticles-brief'>" + value.title + "</p></a>";
			});

			$jstrategynewsdetailmore.html(htmlStr);

		},
		error: function(err) {
			console.log(err);
		}
	});
}

//策略文章页-购买
$.strategyndBuy = function(nId, ntId) {
	paythisView($('#jstrategynewsdetailprice'), nId, $('#jstrategynewsdetailprice').attr('data-price'), ntId); //购买本条	
	paythisView($('#jpaymore'), nId, $('#jstrategynewsdetailprice').attr('data-price'), ntId); //解锁更多--暂时价格写固定
	$('#jpayspecial').click(function() { //左上角专辑购买

		layer.open({
			type: 1,
			skin: 'layui-layer-rim', //加上边框
			area: ['420px', '420px'], //宽高
			content: '<div class="strategynewsdetail-pay-content"><h3>请选择购买方式：</h3><ul id="jstrategynewsdetailpay"></ul><div class="paycorrect"><a class="articlepay_btn" id="jarticlepay">确认购买</a></div></div>'
		});
		var $jstrategynewsdetailpay = $('#jstrategynewsdetailpay'), //包月价格
			$jarticlepay = $('#jarticlepay'),
			htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "Teacher.ashx?action=getTeacherColumn",
			dataType: "json",
			data: {
				"newsTypeId": 15
			},
			success: function(result) {

				if((result.length < 1) || (result[0].validDate == undefined)) {
					return false;
				}
				var price = result[0].validDate;
				price.forEach(function(value, index) {
					if(index == 0) {
						htmlStr = "<li><a class='checked' data-price=" + value.price + " data-moon=" + value.validType + ">购买本专辑" + value.validMonth + "<span>" + value.price + "</span>元</li>";
					} else {
						htmlStr += "<li><a data-price=" + value.price + " data-moon=" + value.validType + ">购买本专辑" + value.validMonth + "<span>" + value.price + "</span>元</li>";
					}
				});
				$jstrategynewsdetailpay.html(htmlStr);
				$('.strategynewsdetail-pay-content a').click(function() {
					$(this).addClass('checked');
					$(this).parents().siblings().children('a').removeClass('checked');
				});
			},
			error: function(err) {
				console.log(err);
			}
		});
		payAlbum($jarticlepay, ntId);
	});

}

function paythisView(obj, nId, price, ntId) { //购买本条
	$(obj).click(function() {
		if(($mid != undefined) && ($mid != "") && ($mid != null)) {
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: ROUTE + "Order.ashx?action=directBuyGoods",
				async: false, //同步请求
				data: {
					"memberId": $mid,
					"goodsId": nId, //新闻id
					"price": price,
					"orderType": 1
				},
				success: function(data) {
					if(data == 818 || data == "818") {
						layer.msg("您已购买过该课程！");
						return false;
					} else {
						if(data[0].orderId != undefined) {
							var dataobj = data[0];
							if(dataobj) {
								window.open("viewpay.html?orderId=" + dataobj.orderId + "&type=0" + '&goodsId=' + nId + "&newsTypeId=" + ntId);
							}

						}

					}
				},
				error: function(data) {
					layer.msg("服务器出差了！");
				}
			});
		} else {
			layer.alert("非会员暂不支持购买哦！");
		}

	});
}

function payAlbum(obj, id) { //购买专辑
	$(obj).click(function() {
		if(($mid != undefined) && ($mid != "") && ($mid != null)) {
			var datamoon = $('#jstrategynewsdetailpay .checked').attr('data-moon');
			var dataprice = $('#jstrategynewsdetailpay .checked').attr('data-price');

			$.ajax({
				type: "POST",
				dataType: 'json',
				url: ROUTE + "Order.ashx?action=directBuyMoonGoods",
				async: false, //同步请求
				data: {
					"memberId": $mid,
					"goodsId": id,
					"moonNum": datamoon,
					"price": dataprice,
					"orderType": 1
				},
				success: function(data) {
					if(data == 818 || data == "818") {
						layer.msg("您已购买过该课程！");
						return false;
					} else {
						if(data[0].orderId != undefined) {
							var dataobj = data[0];
							if(dataobj) {
								var nowhref = new Array();
								nowhref = window.location.href.split('#');
								localStorage.setItem('viewhref', nowhref[0]);
								window.open("viewpay.html?orderId=" + dataobj.orderId + "&type=1" + '&goodsId=' + id);
							}

						}

					}
				},
				error: function(data) {
					layer.msg("服务器出差了！");
				}
			});
		} else {
			layer.alert("非会员暂不支持购买哦！");
		}
	});
}

//中长线报告
function mediumLongLine() {
	var swiper = new Swiper('.dycEiaBannerContainer', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 3000,
		loop: true
	});

	function customerService() { //联系客服
		BizQQWPA.addCustom({
			aty: '0',
			a: '1005',
			nameAccount: 4006430618,
			selector: 'jdbAssistant'
		});
	}
	customerService();

	$('#jEiaheadBtn li').on('click', function() { //头部切换点击
		var cons = $(this).attr('data-id');
		if(cons != '4') {
			$(this).addClass('active');
			$(this).siblings('li').removeClass('active');
			$('.dycEiaDateCons').css('display', 'none');
			$('.dycEiaDateCons').eq(cons).css('display', 'block');
		}

	});
	/*$('#jEiaThemeTab a').on('click', function() { //切换上下篇
		var cons = $(this).attr('data-id');
		$('.dycLongThemeWrap').css('display', 'none');
		$('.dycLongThemeWrap').eq(cons).css('display', 'block');
		$(this).css('display', 'none');
		$(this).siblings('a').css('display', 'block');
		$.scrollTo(0,0);
	});

	var i = $('.dycLongThemeWrap').length - 1;
	$('#jprev').on('click', function() { //点击上一篇
		if(i <= 1) {
			$(this).css('display', 'none');
		}
		i--;
		$('.dycLongThemeWrap').css('display', 'none');
		$('.dycLongThemeWrap').eq(i).css('display', 'block');
		$(this).siblings('a').css('display', 'block');
		$.scrollTo(0, 0);
	});
	$('#jnext').on('click', function() { //点击下一篇
		if(i >= ($('.dycLongThemeWrap').length - 2)) {
			$(this).css('display', 'none');
		}
		i++;
		$('.dycLongThemeWrap').css('display', 'none');
		$('.dycLongThemeWrap').eq(i).css('display', 'block');
		$(this).siblings('a').css('display', 'block');
		$.scrollTo(0, 0);
	});*/

	function getMemberInfo() { //获取会员信息
		var memberImg = $('#jEiamember .dycEiamember-img'),
			memberName = $('#jEiamember .dycEiamember-name'),
			memberLever = $('#jEiamember .dycEiamember-lever'),
			memberGrade = $('#jEiamemberList .grade span');

		$.ajax({
			type: "GET",
			url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
			dataType: "json",
			data: {
				"memberId": $mid
			},
			async: false,
			success: function(result) {
				if(result.length < 1) {
					return false;
				} else {
					var images = "";
					if(result[0].iconPath == "") {
						images = 'images/Eia-member-avar.jpg';
					} else {
						images = ROUTEFILE + result[0].iconPath;
					}
					memberImg.html("<img src='" + images + "'>");
					memberName.html(result[0].nickName + "<span>[在线]</span>");
					memberLever.html("<img src='" + ROUTEFILE + result[0].gradeIconPath + "'>");
					memberGrade.html(result[0].memberlevel);
				}

			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	getMemberInfo();

	function getTechnologyPrivilege() { //获取特权
		var technologyPrivilege = $('#jEiamemberList .special span');
		$.ajax({
			type: "GET",
			url: ROUTE + "Technology.ashx?action=getTechnologyPrivilege",
			dataType: "json",
			data: {
				"memberId": $mid
			},
			async: false,
			success: function(result) {
				if(result.length < 1) {
					return false;
				} else {
					technologyPrivilege.html(result + '大技术分析');
				}

			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	getTechnologyPrivilege();

	var tId = $(this).getUrlParam("technologyTypeId");

	function getCurrentDate(id) { //获取当前数据
		var jcurrentCon = $('#jcurrentCon'),
			jcurrentTitle = $('#jcurrentConTitle'),
			htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "Technology.ashx?action=getCurrentTechnology",
			dataType: "json",
			data: {
				"technologyTypeId": id,
				"memberId": $mid
			},
			async: false,
			success: function(result) {
				if((result.length < 1) || (result[0].length < 1)) {
					return false;
				} else {

					/*
					if(result[0][0].isFree == '1') {
						if(id == 3) { //如果是日内短线
							htmlStr = "<div class='dycEiaTheme-con'><p class='title'>本期基本面分析</p>" + result[0][0].yesterday_technology + "</div><div class='dycEiaTheme-con'><p class='title'>本期技术面分析</p>" + result[0][0].focus + "</div>";
							jcurrentTitle.html("[ " + result[0][0].title + " ]")
							$('#jcurrentCon').html(htmlStr);
						} else {
							$('#jcurrentCon').html(result[0][0].focus);
						}
					} else {
						if(id == '3') {
							layer.confirm('黄金会员才可以查看,确定前往升级会员？', {
								btn: ['确定', '取消'] //按钮
							}, function() {
								location.href = "recharge.html";
							});
						} else if(id == '4') {
							layer.confirm('铂金会员才可以查看,确定前往升级会员？', {
								btn: ['确定', '取消'] //按钮
							}, function() {
								location.href = "recharge.html";
							});
						} else {
							layer.confirm('白银会员才可以查看,确定前往升级会员？', {
								btn: ['确定', '取消'] //按钮
							}, function() {
								location.href = "recharge.html";
							});
						}

					}
					*/
					
					if($mid != -1 && $mid != "" && $mid != undefined && $mid != null) {
						if(id == 3) { //如果是日内短线
							htmlStr = "<div class='dycEiaTheme-con'><p class='title'>本期基本面分析</p>" + result[0][0].yesterday_technology + "</div><div class='dycEiaTheme-con'><p class='title'>本期技术面分析</p>" + result[0][0].focus + "</div>";
							jcurrentTitle.html("[ " + result[0][0].title + " ]")
							$('#jcurrentCon').html(htmlStr);
						} else {
							$('#jcurrentCon').html(result[0][0].focus);
						}
					} else {
						if(id == '3') {
							layer.confirm('黄金会员才可以查看,确定前往升级会员？', {
								btn: ['确定', '取消'] //按钮
							}, function() {
								location.href = "recharge.html";
							});
						} else if(id == '4') {
							layer.confirm('铂金会员才可以查看,确定前往升级会员？', {
								btn: ['确定', '取消'] //按钮
							}, function() {
								location.href = "recharge.html";
							});
						} else {
							layer.confirm('白银会员才可以查看,确定前往升级会员？', {
								btn: ['确定', '取消'] //按钮
							}, function() {
								location.href = "recharge.html";
							});
						}

					}

				}

			},
			error: function(err) {
				console.log(err);
			}
		});

	}
	getCurrentDate(tId);

	function getPastList(id, pageIndex) { //获取往期列表
		var jPastList = $('#jPastList'),
			$jteacherpage = $("#jteacherpage"),
			$htmlPage = "",
			htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "Technology.ashx?action=getOtherTechnology",
			dataType: "json",
			data: {
				"technologyTypeId": id,
				"pageIndex": pageIndex,
				"pageSize": 10,
				"memberId": $mid
			},
			async: false,
			success: function(result) {
				if(result.rows.length < 1) {
					return false;
				} else {
					result.rows.forEach(function(value, index) {
						htmlStr += "<li><a target='_blank' data-isfree=" + value.isFree + " data-tid=" + value.technologyTypeId + " data-id=" + value.technologyId + " >" + value.title + "</a></li>";
					});
					jPastList.html(htmlStr);
					$('#jPastList li').on('click', 'a', function() {
						var isFree = $(this).attr('data-isfree');
						var sid = $(this).data('id');
						var stid = $(this).data('tid');

						
						//if(isFree == '1') {
						if($mid != -1 && $mid != "" && $mid != undefined && $mid != null) {
							layer.open({
								type: 2,
								title: '往期报告',
								//closeBtn: 0, //不显示关闭按钮
								shadeClose: true,
								shade: [0.5, '#000'],
								area: ['900px', '600px'],
								//offset: 'rb', //右下角弹出
								//time: 2000, //2秒后自动关闭
								anim: 2,
								maxmin: true, //开启最大化最小化按钮
								content: 'reportpast.html?technologyId=' + sid + '&technologyTypeId=' + stid
							});
						} else {
							if(id == '3') {
								layer.confirm('黄金会员才可以查看,确定前往升级会员？', {
									btn: ['确定', '取消'] //按钮
								}, function() {
									location.href = "recharge.html";
								});
							} else if(id == '4') {
								layer.confirm('铂金会员才可以查看,确定前往升级会员？', {
									btn: ['确定', '取消'] //按钮
								}, function() {
									location.href = "recharge.html";
								});
							} else {
								layer.confirm('白银会员才可以查看,确定前往升级会员？', {
									btn: ['确定', '取消'] //按钮
								}, function() {
									location.href = "recharge.html";
								});
							}

						}

					});
					
					for(var i = 0; i < result.totalPageCount; i++) {
						$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
					}
					$jteacherpage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
					var $jteacherPage = $('#jteacherpage li a');
					if(result.totalPageCount == '0') {
						$jsubPage.css('display', 'none');
					} else if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
						$jteacherPage.eq(0).css('display', 'none');
						$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					} else if(pageIndex == '1') {
						$jteacherPage.eq(0).css('display', 'none');
					} else if(pageIndex == (result.totalPageCount)) {
						$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					}
					$jteacherPage.eq(pageIndex).parent().addClass('active');


					$jteacherPage.click(function() {
						var num = $jteacherPage.index(this);
						if(num && (num < $jteacherPage.length - 1)) {
							pageIndex = num;
						} else if((num == "0") && (pageIndex > 1)) {
							pageIndex -= 1;
						} else if((num == ($jteacherPage.length - 1)) && (pageIndex < $jteacherPage.length - 2)) {
							pageIndex += 1;
						}
						getPastList(id, pageIndex);
								});
			
							}

			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	getPastList(tId, 1);
}



//股海汇市
function iterPretation() {
	var swiper = new Swiper('.dycEiaBannerContainer', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		autoplay: 3000,
		loop: true
	});

	function customerService() { //联系客服
		BizQQWPA.addCustom({
			aty: '0',
			a: '1005',
			nameAccount: 4006430618,
			selector: 'jdbAssistant'
		});
	}
	customerService();

	$('#jEiaheadBtn li').on('click', function() { //头部切换点击
		var cons = $(this).attr('data-id');
		if(cons != '4') {
			$(this).addClass('active');
			$(this).siblings('li').removeClass('active');
			$('.dycEiaDateCons').css('display', 'none');
			$('.dycEiaDateCons').eq(cons).css('display', 'block');
		}

	});

	var tId = $(this).getUrlParam("technologyTypeId");

	function getCurrentDate(id) { //获取当前数据
		var jcurrentCon = $('#jcurrentCon');
		$.ajax({
			type: "GET",
			url: ROUTE + "Technology.ashx?action=getCurrentTechnology",
			dataType: "json",
			data: {
				"technologyTypeId": id,
				"memberId": $mid
			},
			async: false,
			success: function(result) {
				if((result.length < 1) || (result[0].length < 1)) {
					return false;
				} else {
					$('#jcurrentCon').html(result[0][0].focus);
				}

			},
			error: function(err) {
				console.log(err);
			}
		});

	}
	getCurrentDate(tId);

	function getPastList(id, pageIndex) { //获取往期列表
		var jPastList = $('#jPastList'),
			$jteacherpage = $("#jteacherpage"),
			$htmlPage = "",
			htmlStr = "";
		$.ajax({
			type: "GET",
			url: ROUTE + "Technology.ashx?action=getOtherTechnology",
			dataType: "json",
			data: {
				"technologyTypeId": id,
				"pageIndex": pageIndex,
				"pageSize": 10,
				"memberId": $mid
			},
			async: false,
			success: function(result) {
				if(result.rows.length < 1) {
					return false;
				} else {
					result.rows.forEach(function(value, index) {
						htmlStr += "<li><a target='_blank'  data-tid=" + value.technologyTypeId + " data-id=" + value.technologyId + " >" + value.title + "</a></li>";
					});
					jPastList.html(htmlStr);
					$('#jPastList li').on('click', 'a', function() {

						var id = $(this).data('id');
						var tid = $(this).data('tid');
						layer.open({
							type: 2,
							title: '往期报告',
							//closeBtn: 0, //不显示关闭按钮
							shadeClose: true,
							shade: [0.5, '#000'],
							area: ['900px', '600px'],
							//offset: 'rb', //右下角弹出
							//time: 2000, //2秒后自动关闭
							anim: 2,
							maxmin: true, //开启最大化最小化按钮
							content: 'reportpast.html?technologyId=' + id + '&technologyTypeId=' + tid
						});

					});
					for(var i = 0; i < result.totalPageCount; i++) {
						$htmlPage += "<li><a href='#this'>" + (i + 1) + "</a></li>"
					}
					$jteacherpage.html("<li><a href='#this'>上一页</a></li>" + $htmlPage + "<li><a href='#this'>下一页</a></li>");
					var $jteacherPage = $('#jteacherpage li a');

					if(result.totalPageCount == '0') {
						$jsubPage.css('display', 'none');
					} else if((pageIndex == '1') && (pageIndex == result.totalPageCount)) {
						$jteacherPage.eq(0).css('display', 'none');
						$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					} else if(pageIndex == '1') {
						$jteacherPage.eq(0).css('display', 'none');
					} else if(pageIndex == (result.totalPageCount)) {
						$jteacherPage.eq(result.totalPageCount + 1).css('display', 'none');
					}
					$jteacherPage.eq(pageIndex).parent().addClass('active');

					$jteacherPage.click(function() {
						var num = $jteacherPage.index(this);
						if(num && (num < $jteacherPage.length - 1)) {
							pageIndex = num;
						} else if((num == "0") && (pageIndex > 1)) {
							pageIndex -= 1;
						} else if((num == ($jteacherPage.length - 1)) && (pageIndex < $jteacherPage.length - 2)) {
							pageIndex += 1;
						}
						getPastList(id, pageIndex);

						$.scrollTo(0, 0);
					});

				}

			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	getPastList(tId, 1);
}
//检测是否安装了flash 
function flashChecker() {
	var hasFlash = 0;　

	if(document.all) {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if(swf) {
			hasFlash = 1;
		}
	}
	if((navigator.userAgent.indexOf("MSIE") > 0)) {
		if(navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if(swf) {
				hasFlash = 1;
			}
		}

	} else {
		if(navigator.userAgent.indexOf("Firefox") > 0 || navigator.userAgent.indexOf("Chrome")) {
			var swf = navigator.plugins["Shockwave Flash"];
			if(swf) {
				hasFlash = 1;
			}
		}
	}
	return {
		f: hasFlash
	};
}

var fls = flashChecker();
var s = "";
var oPlay = $('.video');
if(!fls.f) {
	oPlay.html("<p style='width:100%;height:500px;line-height:500px;text-align:center;font-size:24px;background-color:#232323;color:#fff'>您的浏览器未安装Flash插件，<a target='_blank' href='http://get.adobe.com/cn/flashplayer/' >现在安装？</a></p>");

}

function coursework() { //获取会员信息
	var memberImg = $('.dycpersoncenter .dycimage'),
		memberName = $('.dycpersoncenter .dycbox h4');
	$.ajax({
		type: "GET",
		url: ROUTE + "Member.ashx?action=getSowingCoinByMemberId",
		dataType: "json",
		data: {
			"memberId": $mid
		},
		async: false,
		success: function(result) {
			if(result.length < 1) {
				return false;
			} else {
				console.log(result)
				memberImg.html("<img src='" + ROUTEFILE + result[0].iconPath + "'>");
				memberName.html(result[0].nickName);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
	new Vue({
		el: "#dyccoursework",
		data: {
			primary: [], //初级,
			middle: [], //中级
			senior: [] //高级
		},
		filters: {
			addRoute: function(img) {
				return ROUTEFILE + img;
			},
			addVideoRoute: function addVideoRoute(cid, vid) {
				return "player.html?courseId=" + cid + "&videoId=" + vid;
			}
		},
		mounted: function() { //1.0ready --> 2.0
			var _this = this;
			this.$nextTick(function() {
				_this.getPrimary();
				_this.getMiddle();
				_this.getSenior();
			})
		},
		methods: {
			getPrimary: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getCourseByCourseLeverId", {
					courseLeverId: '1',
					pageIndex: 1,
					pageSize: 8
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.primary = res.body.rows;
				}).then(function() {
					_this.primary.forEach(function(item, index) {
						Vue.set(item, "serviceId", 'jsvtn_phone_primary' + (index + 1)); //注册变量
						_this.initQQ(item.serviceId);
					})
				})
			},
			getMiddle: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getCourseByCourseLeverId", {
					courseLeverId: '2',
					pageIndex: 1,
					pageSize: 8
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.middle = res.body.rows;
				}).then(function() {
					_this.middle.forEach(function(item, index) {
						Vue.set(item, "serviceId", 'jsvtn_phone_middle' + (index + 1)); //注册变量
						_this.initQQ(item.serviceId);
					})
				})
			},
			getSenior: function() {
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getCourseByCourseLeverId", {
					courseLeverId: '3',
					pageIndex: 1,
					pageSize: 8
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.senior = res.body.rows;
				}).then(function() {
					_this.senior.forEach(function(item, index) {
						Vue.set(item, "serviceId", 'jsvtn_phone_senior' + (index + 1)); //注册变量
						_this.initQQ(item.serviceId);
					})
				})

			},
			initQQ: function(id) {

				BizQQWPA.addCustom({
					aty: '0',
					a: '1005',
					nameAccount: 800185768,
					selector: id
				});

			}
		}
	})
}

function newZone() { //叠报新手空间
	new Vue({
		el: "#jnewZone",
		data: {
			indexCognition: [], //基础指标认知,
			dateLearn: [], //基础数据学习
			metaRrader: [] //MT4软件学习
		},
		filters: {
			addRoute: function(img) {
				return ROUTEFILE + img;
			}
		},
		mounted: function() { //1.0ready --> 2.0
			var _this = this;
			this.$nextTick(function() {

				_this.getCognition();
				_this.getLearn();
				_this.getRrader();
			})
		},
		methods: {
			getCognition: function() { //基础指标认知

				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getNoviceKnowledge", {
					pageIndex: 1,
					pageSize: 3,
					type: "asc"
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.indexCognition = res.body.rows;
				}).then(function(res) {
					_this.indexCognition.forEach(function(item, index) {
						Vue.set(item, "videoLength", item.video.length);
						Vue.set(item, "serviceId", 'jsvtn_phone_' + index); //注册变量
						_this.initQQ(item.serviceId);
					})
				})
			},
			getLearn: function() { //基础数据学习
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getNoviceKnowledge", {
					pageIndex: 1,
					pageSize: 3,
					type: "desc"
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.dateLearn = res.body.rows;
				}).then(function(res) {
					_this.dateLearn.forEach(function(item, index) {
						Vue.set(item, "videoLength", item.video.length);
						Vue.set(item, "serviceId", 'jsvtn_phone_' + (index + 3)); //注册变量
						_this.initQQ(item.serviceId);
					})
				})
			},
			getRrader: function() { //MT4软件学习
				var _this = this;
				this.$http.post(ROUTE + "Course.ashx?action=getNoviceKnowledgeone", {
					pageIndex: 1,
					pageSize: 1,
					type: "asc"
				}, {
					emulateJSON: true
				}).then(function(res) {
					_this.metaRrader = res.body.rows;
				})

			},
			initQQ: function(id) {
				/*$('.dycnewzone-content').on('click', 'button:first-child', function() {
				var id = $(this).attr('id');
				console.log(id)*/
				BizQQWPA.addCustom({
					aty: '0',
					a: '1005',
					nameAccount: 800185768,
					selector: id
				});
				/*})*/

			}
		}
	})
}

//叠报活动页面
function dbRecharge() {
	$('#jrecharge').on('click', function() {
		if(($mid != undefined) && ($mid != '') && ($mid != null)) {
			$(this).attr('href', 'recharge.html');
			$(this).attr('target', '_blank');
		} else {
			/*layer.alert("非会员暂不支持充值哦！");*/
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1, //不显示关闭按钮
				shade: [0],
				shadeClose: true,
				maxmin: true, //开启最大化最小化按钮
				area: ['400px', '540px'],
				content: '../login.html?pageType=live'
			});
		}
	});
}

function gotoReport() { //技术分析报告查看
	var reportDate = ["Eiareport.html?technologyTypeId=1", "nonfarmReport.html?technologyTypeId=2", "dayShortReport.html?technologyTypeId=3", "mediumlonglineReport.html?technologyTypeId=4"];
	$('#jreport a').on('click', function() {
		if(($mid != null) && ($mid != undefined) && ($mid != "")) {
			var num = $(this).attr('data-id');
			if(reportDate[num] != "") {
				$(this).attr('target', '_blank');
				$(this).attr('href', reportDate[num]);
			} else {
				layer.alert("该部分暂无数据哦~");
			}
		} else {
			//layer.alert("非会员不能查看哦！");
			layer.open({
				type: 2,
				title: false,
				closeBtn: 1, //不显示关闭按钮
				shade: [0],
				shadeClose: true,
				maxmin: true, //开启最大化最小化按钮
				area: ['400px', '540px'],
				content: '../login.html?pageType=live'
			});
		}

	});
}